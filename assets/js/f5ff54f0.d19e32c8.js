(window.webpackJsonp=window.webpackJsonp||[]).push([[172],{241:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(7),i=(n(0),n(253)),a={title:"Collaboration with Spotify",author:"Jules Villard"},s={permalink:"/blog/2016/03/17/collaboration-with-spotify",source:"@site/blog/2016-03-17-collaboration-with-spotify.md",description:"Infer/Spotify collaboration",date:"2016-03-17T00:00:00.000Z",formattedDate:"March 17, 2016",tags:[],title:"Collaboration with Spotify",readingTime:2.675,truncated:!1,prevItem:{title:"Talk at Mobile@Scale London",permalink:"/blog/2016/04/07/mobileatscale-london-talk"},nextItem:{title:"Infer on Open Source Android Apps",permalink:"/blog/2015/05/22/Infer-on-open-source-android-apps"}},l=[],c={toc:l};function p(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,Object(i.b)("img",{alt:"Infer/Spotify collaboration",src:n(286).default})),Object(i.b)("p",null,"Working on deploying Infer inside Facebook has taught us how important it is to\nhave the analysis tool deeply embedded into the developers' workflow; see our\n",Object(i.b)("a",{parentName:"p",href:"https://research.facebook.com/publications/moving-fast-with-software-verification/"},"\u201cMoving Fast with Software Verification\u201d paper"),"."),Object(i.b)("p",null,"Infer runs as part of our continuous integration (CI) system, where it reports\nissues on code modifications submitted for review by our engineers. We think\nit's great when someone can hook up Infer to their workflow, and we're working\nwith several other companies to help integrate Infer into their own CI systems.\nWe've come far enough in a collaboration with Spotify to talk about it now!"),Object(i.b)("p",null,"Last July, shortly after Infer was open-sourced, we started talking with the\nMarvin (Android Infrastructure) team at Spotify. They were interested in using\nInfer on their Android app, but it did not work with their build system. They\nwere using the ",Object(i.b)("a",{parentName:"p",href:"http://gradle.org/"},"Gradle")," build system, but Infer's deployment\nwithin Facebook is done using a different build system, Facebook's\n",Object(i.b)("a",{parentName:"p",href:"https://buckbuild.com/"},"Buck"),"; we had only an initial, basic integration with\nGradle, which did not work with Spotify's app. A Spotify engineer, Deniz\nT\xfcrkoglu, made improvements to our Gradle integration, which he submitted as a\n",Object(i.b)("a",{parentName:"p",href:"https://github.com/facebook/infer/pull/131"},"pull request")," to Infer's codebase,\nwhich is hosted on ",Object(i.b)("a",{parentName:"p",href:"https://github.com/facebook/infer/"},"GitHub"),"."),Object(i.b)("p",null,"Then, in November 2015, two of our engineers, Dulma Churchill and Jules Villard,\ntraveled to the Spotify office in Stockholm to attend a Hack Week there. After\nrunning Infer on the Spotify app, we discussed the analyzer reports with Spotify\nengineers, and we agreed that they identified potential problems in the code.\nInfer is now running as part of Spotify's CI system, and here is a quote from\nDeniz on Spotify's perspective on Infer, which we include with his kind\npermission."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"\u201cAt Spotify we are continuously working on making our codebase better, and in\nthe Android infrastructure team we use a lot of tools: static analyzers,\nlinters, thread/address sanitizers, etc. In our quest to make our code even\nbetter, we started using Infer. Infer found several legitimate issues that\nother tools had missed. The Infer team was also very helpful in following a\nfew false positives that we encountered, and we now have it running on our\nbuild servers."),Object(i.b)("p",{parentName:"blockquote"},"Infer is a great add-on to a company's toolbox. It's not intrusive \u2014 you can\nsimply add it to your flow and it will tell you where you forgot to close that\ncursor or leaked that context. If you find a false positive, just report it\nor, even better, make a PR. With more users, it will just keep getting\nbetter.\u201d")),Object(i.b)("p",null,"This collaboration was truly a two-way street: Not only does Infer find issues\nin Spotify, which helps improve its Android app, but feedback from Spotify led\nto several improvements in Infer, including resolution of false positives and\nimprovements of Infer's UI and integration with Gradle. The better Gradle\nintegration will make it easier for other people to run Infer on lots of other\napps around the world."),Object(i.b)("p",null,"We're excited to collaborate with other companies and individuals to help make\nthe world's software better. If you are interested in integrating Infer into CI\nor otherwise hearing about our experience, ",Object(i.b)("a",{parentName:"p",href:"/docs/support"},"drop us a line"),"!"))}p.isMDXComponent=!0},253:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),p=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,b=u["".concat(a,".").concat(d)]||u[d]||f[d]||i;return n?o.a.createElement(b,s(s({ref:t},c),{},{components:n})):o.a.createElement(b,s({ref:t},c))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},286:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/Infer-Spotify-2ebcc6d44625d01149765676f1190b22.png"}}]);