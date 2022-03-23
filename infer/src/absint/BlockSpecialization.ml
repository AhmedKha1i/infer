(*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *)

open! IStd
module IRAttributes = Attributes

type arg = ProcAttributes.passed_block option

(* name for the specialized method instantiated with closure arguments *)
let pname_with_closure_args callee_pname args =
  let rec get_pnames pnames = function
    | ProcAttributes.Block (pname, _) when Procname.is_objc_block pname ->
        Procname.block_of_procname pname :: pnames
    | ProcAttributes.Fields passed_blocks ->
        Fieldname.Map.fold
          (fun _ passed_block pnames -> get_pnames pnames passed_block)
          passed_blocks pnames
    | _ ->
        pnames
  in
  let block_args =
    List.fold_right args ~init:[] ~f:(fun arg pnames ->
        Option.value_map arg ~default:pnames ~f:(fun arg -> get_pnames pnames arg) )
  in
  Procname.with_block_parameters callee_pname block_args


let make_formals_to_blocks formals args =
  match
    List.fold2 formals args ~init:Mangled.Map.empty ~f:(fun map (mangled, _, _) arg ->
        Option.value_map arg ~default:map ~f:(fun arg -> Mangled.Map.add mangled arg map) )
  with
  | Ok map ->
      Some map
  | Unequal_lengths ->
      None


let get_captured args =
  let rec get_captured captured_vars_acc = function
    | ProcAttributes.Block (_, captured_vars) ->
        captured_vars :: captured_vars_acc
    | ProcAttributes.Fields passed_blocks ->
        Fieldname.Map.fold
          (fun _ arg captured_vars_acc -> get_captured captured_vars_acc arg)
          passed_blocks captured_vars_acc
  in
  List.fold_right ~init:[] args ~f:(fun arg captured_vars ->
      Option.value_map arg ~default:captured_vars ~f:(fun arg -> get_captured captured_vars arg) )
  |> List.concat


let should_specialize args = List.exists args ~f:Option.is_some

let is_objc_setter proc_desc =
  let attributes = Procdesc.get_attributes proc_desc in
  match attributes.ProcAttributes.objc_accessor with Some (Objc_setter _) -> true | _ -> false


let is_initializer proc_desc =
  let proc_name = Procdesc.get_proc_name proc_desc in
  Procname.is_constructor proc_name


let is_dispatch_model proc_desc =
  let proc_name = Procdesc.get_proc_name proc_desc in
  ObjCDispatchModels.is_model proc_name


let create_specialized_procdesc callee_pname args =
  if should_specialize args then
    match Procdesc.load callee_pname with
    | Some proc_desc
      when (not (is_objc_setter proc_desc))
           && (not (is_initializer proc_desc))
           && not (is_dispatch_model proc_desc) -> (
        (* The specialization is always a full specialization:
             given a function and its known block arguments:
             1. if the function is unspecialized then specialize it with the given blocks
             2. if the function is already specialized then get its unspecialized version
                (available as [orig_proc] in the attributes) and apply case 1 with it
           Rather than adding the mechanism to do partial specialization:
             2'. if the function is already specialized then filter-out the arguments that
                 have already been used for its specialization and specialize it with the
                 remaining arguments

           It is easier (and less error-prone) to always do a full specialization (1 and 2)

           Note:
             Always applying the full specialization is only valid as long as the new
             specialization work is given at least as much information as the previous one.
             Anything triggering a re-specialization has access to the previous
             specialization information and, therefore, should be able to ensure the above
             property holds if there were any doubt
        *)
        let callee_attributes =
          let callee_attributes = Procdesc.get_attributes proc_desc in
          let orig_attributes =
            let open IOption.Let_syntax in
            let* {ProcAttributes.orig_proc} = callee_attributes.specialized_with_blocks_info in
            let+ orig_pdesc = Procdesc.load orig_proc in
            Procdesc.get_attributes orig_pdesc
          in
          Option.value ~default:callee_attributes orig_attributes
        in
        let callee_pname = callee_attributes.proc_name in
        match make_formals_to_blocks callee_attributes.formals args with
        | Some formals_to_blocks -> (
            let specialized_pname = pname_with_closure_args callee_pname args in
            (* To avoid duplicated additions on a specialized procname, it does a
               membership check. This may happen when there are multiple function calls
               with the same callees and the same closure parameters.  For the following
               additions, we can simply ignore them, because the function bodies of the
               same procname must be the same.

               Here, it creates an empty procdesc temporarily.  The function body will be
               filled later by [ClosureSubstSpecializedMethod]. *)
            match Procdesc.load specialized_pname with
            | Some _ ->
                Some specialized_pname (* already exists*)
            | None ->
                if (Procdesc.get_attributes proc_desc).is_defined then (
                  let new_attributes =
                    { callee_attributes with
                      specialized_with_blocks_info= Some {orig_proc= callee_pname; formals_to_blocks}
                    ; captured= get_captured args @ callee_attributes.captured
                    ; proc_name= specialized_pname }
                  in
                  let specialized_pdesc = Procdesc.from_proc_attributes new_attributes in
                  IRAttributes.store ~proc_desc:(Some specialized_pdesc) new_attributes ;
                  Some specialized_pname )
                else (* No procdesc to specialize: not defined *)
                  None )
        | None ->
            (* Current call is ill defined: args' length doesn't match function parameters' *)
            None )
    | Some _ ->
        None (* No need for specialization*)
    | None ->
        None (* No procdesc to specialize: non-existant *)
  else (* No need for specialization*)
    None