(this.webpackJsonphomepage=this.webpackJsonphomepage||[]).push([[0],{173:function(e,t,a){},174:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(55),o=a.n(r),l=a(3),u=a(25),i=function(e){var t=e.children,a=e.onClick,n=Object(u.a)(e,["children","onClick"]);return c.a.createElement("a",Object.assign({onClick:function(){return a&&a.apply(void 0,arguments)},className:"Button",href:"javascript: void(0)"},n),t)},s=a(20),m=a(1),f=function(e){Object(n.useEffect)((function(){document.title=e}),[e])},d=function(e){var t,a=e.location;f("\u548c\u8c10\u52a0\u5bc6\u5668");var r=Object(n.useState)(""),o=Object(l.a)(r,2),u=o[0],d=o[1],p=Object(n.useState)(""),h=Object(l.a)(p,2),b=h[0],E=h[1],v=Object(n.useState)(""),j=Object(l.a)(v,2),O=j[0],g=j[1],w=Object(n.useState)(!1),k=Object(l.a)(w,2),y=k[0],N=k[1],C=Object(m.f)(),S=Object(n.useRef)(null),x=Object(n.useRef)(null),R=new URLSearchParams(null!==(t=null===a||void 0===a?void 0:a.search)&&void 0!==t?t:""),_=R.get("act")||"decode",M=decodeURI(R.get("dict")||""),T=decodeURI(R.get("txt")||""),D=Object(n.useMemo)((function(){var e=b||M;if(e)return e.split(/[,\uff0c]/).map((function(e){return e.trim()}))}),[b,M]),I=Object(n.useCallback)((function(){C.replace(a.pathname+"?act=encode"+(b?"&dict=".concat(encodeURI(b)):"")+(u?"&txt=".concat(encodeURI(u)):""))}),[u,b,C,a]),P=Object(n.useCallback)((function(){C.replace(a.pathname+"?act=decode"+(b?"&dict=".concat(encodeURI(b)):"")+(u?"&txt=".concat(encodeURI(u)):""))}),[u,b,C,a]),U=Object(n.useCallback)((function(e,t){try{var a=t&&t.length>2?Object(s.encode)(e,t):Object(s.encode)(e);g(a)}catch(n){g("")}}),[g]),F=Object(n.useCallback)((function(e,t){try{var a=t&&t.length>2?Object(s.decode)(e,t):Object(s.decode)(e);g(a)}catch(n){g("")}}),[g]);Object(n.useEffect)((function(){T&&d(T),M&&E(M),_&&("decode"===_?F(T,D):U(T,D))}),[_,T,M]);var H=Object(n.useCallback)((function(){S.current.select(),S.current.setSelectionRange(0,999999),document.execCommand("copy"),N(!0),setTimeout((function(){return N(!1)}),700)}),[O,S]),B=Object(n.useCallback)((function(){x.current.select(),x.current.setSelectionRange(0,999999)}),[x]);return c.a.createElement("div",{className:"HexieEncoder"},c.a.createElement("h1",null,"\u548c\u8c10\u52a0\u5bc6\u5668"),c.a.createElement("textarea",{onChange:function(e){var t=e.target.value;g(""),d(t)},value:u,ref:x,onFocus:B}),c.a.createElement("div",{className:"button-area"},c.a.createElement(i,{onClick:I},"\u52a0\u5bc6"),c.a.createElement(i,{onClick:P},"\u89e3\u5bc6")),c.a.createElement("textarea",{value:y?"\u5df2\u590d\u5236":O,readOnly:!0,onClick:H,ref:S}),c.a.createElement("h2",null,"\u81ea\u5b9a\u4e49\u5b57\u5178"),c.a.createElement("input",{type:"text",placeholder:"\u5bcc\u5f3a,\u6c11\u4e3b,\u6587\u660e,\u548c\u8c10,\u81ea\u7531,\u5e73\u7b49,\u516c\u6b63,\u6cd5\u6cbb,\u7231\u56fd,\u656c\u4e1a,\u8bda\u4fe1,\u53cb\u5584",onChange:function(e){var t=e.target.value;g(""),E(t)},value:b}))},p=a(10),h=function(e){return f("wheatup"),c.a.createElement("div",{className:"Home"},c.a.createElement("h2",null,"\u65bd\u5de5\u4e2d\uff0c\u8bf7\u7a0d\u540e\u518d\u6765"))},b=a(8),E=a.n(b),v=a(18),j=a(24),O=a.n(j),g=O.a.create({baseURL:"https://api.github.com/repos/wheatup/forum-threads"}),w=!1,k=function(){if(!w){var e=window.localStorage.getItem("token");e&&(g.defaults.headers.common.Authorization="Bearer "+e,w=!0)}return g},y=function(){var e;return(e=k()).get.apply(e,arguments)},N=function(){var e;return(e=k()).post.apply(e,arguments)},C=function(){var e=Object(v.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/issues");case 2:if(!(t=e.sent)||!t.data){e.next=7;break}return e.abrupt("return",t.data);case 7:throw new Error(t);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(v.a)(E.a.mark((function e(t){var a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/issues/".concat(t));case 2:if(!(a=e.sent)||!a.data){e.next=7;break}return e.abrupt("return",a.data);case 7:throw new Error(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(v.a)(E.a.mark((function e(t){var a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/issues/".concat(t,"/comments"));case 2:if(!(a=e.sent)||!a.data){e.next=7;break}return e.abrupt("return",a.data);case 7:throw new Error(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(v.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("/issues",{title:t,body:a},{headers:{"Content-Type":"application/json",Accept:"application/vnd.github.v3+json"}});case 2:if(!(n=e.sent)||!n.data){e.next=7;break}return e.abrupt("return",n.data);case 7:throw new Error(n);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),_=function(){var e=Object(v.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("/issues/".concat(t,"/comments"),{body:a},{headers:{"Content-Type":"application/json",Accept:"application/vnd.github.v3+json"}});case 2:if(!(n=e.sent)||!n.data){e.next=7;break}return e.abrupt("return",n.data);case 7:throw new Error(n);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),M=a(14),T=a.n(M),D=a(12),I=a.n(D),P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Date;"string"===typeof e&&(e=new Date(e)),"string"===typeof t&&(t=new Date(t));var a=Math.abs(t.getTime()-e.getTime()),n=t.getTime()-e.getTime()>0;return a<1e3?"\u521a\u521a":a<6e4?Math.floor(a/1e3)+"\u79d2".concat(n?"\u524d":"\u540e"):a<36e5?Math.floor(a/6e4)+"\u5206\u949f".concat(n?"\u524d":"\u540e"):a<864e5?Math.floor(a/36e5)+"\u5c0f\u65f6".concat(n?"\u524d":"\u540e"):a<6048e5?Math.floor(a/864e5)+"\u5929".concat(n?"\u524d":"\u540e"):a<2592e6?Math.floor(a/6048e5)+"\u5468".concat(n?"\u524d":"\u540e"):a<94608e7?Math.floor(a/2592e6)+"\u4e2a\u6708".concat(n?"\u524d":"\u540e"):Math.floor(a/31536e6)+"\u5e74".concat(n?"\u524d":"\u540e")},U=function(e){var t=e.user,a=Object(n.useCallback)((function(e){window.open(t.html_url),e.stopPropagation(),e.preventDefault()}),[]);return c.a.createElement("div",{onClick:a,className:"UserAvatar"},t?c.a.createElement(c.a.Fragment,null,c.a.createElement("img",{src:t.avatar_url,alt:t.login}),c.a.createElement("h2",null,t.login)):c.a.createElement("i",{className:"icon-user"}))},F=function(e){var t=e.post,a=t.title,n=t.user,r=t.created_at,o=t.comments,l=(t.updated_at,t.number);return c.a.createElement(p.b,{to:"/forum/post/".concat(l),className:"PostEntry"},c.a.createElement(U,{user:n}),c.a.createElement("div",{className:"summary"},c.a.createElement("h2",null,a),c.a.createElement("time",{className:"create"},P(r))),c.a.createElement("span",{className:"details"},c.a.createElement("span",{className:"comments"},o)))},H=a(11),B=a(19),A=Symbol(),z=Symbol(),L=function(e){var t=e.children,a=Object(u.a)(e,["children"]);return c.a.createElement("a",Object.assign({className:"Button",href:"javascript: void(0)"},a),t)},J=function(e){var t=e.hasBody,a=e.onPost,r=Object(H.useData)(z),o=Object(n.useState)(""),u=Object(l.a)(o,2),i=u[0],s=u[1],m=Object(n.useState)(""),f=Object(l.a)(m,2),d=f[0],p=f[1],h=Object(n.useCallback)((function(){a&&(a(i,d),s(""),p(""))}),[i,d,a]);return c.a.createElement("div",{className:"ChatInput".concat(r?"":" locked")},c.a.createElement("div",{className:"title-area"},c.a.createElement(L,null,c.a.createElement("i",{className:"icon-grin"})),c.a.createElement(L,null,c.a.createElement("i",{className:"icon-images"})),t?c.a.createElement("input",{type:"text",value:i,onChange:function(e){return s(e.target.value)}}):c.a.createElement("textarea",{rows:"1",value:i,onChange:function(e){return s(e.target.value)}}),c.a.createElement(L,{onClick:h},c.a.createElement("i",{className:"icon-paper-plane"}))),t&&c.a.createElement("div",{className:"body-area"},c.a.createElement("textarea",{rows:"4",value:d,onChange:function(e){return p(e.target.value)}})))},W=function(e){var t=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],c=t[1],r=Object(n.useCallback)((function(){C().then((function(e){c(e)}))}),[c]);return Object(n.useEffect)((function(){r()}),[]),[a,r]}(),a=Object(l.a)(t,2),r=a[0],o=a[1],u=Object(n.useCallback)((function(e,t){e?R(e,t).then((function(e){I.a.emit("REFRESH_POSTS")})).catch((function(e){T()("\u53d1\u5e03\u5931\u8d25","\u4e3b\u9898\u53d1\u5e03\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01","error"),console.error(e)})):T()("\u9519\u8bef","\u8bf7\u8f93\u5165\u6807\u9898\uff01","error")}),[]);return Object(n.useEffect)((function(){return I.a.on("REFRESH_POSTS",o),function(){return I.a.off("REFRESH_POSTS",o)}}),[]),c.a.createElement("div",{className:"PostList"},c.a.createElement("div",{className:"list-wrapper"},c.a.createElement("div",{className:"list"},r&&r.map((function(e){return c.a.createElement(F,{key:e.node_id,post:e})})))),c.a.createElement(J,{hasBody:!0,onPost:u}))},Y=a(57),$=a.n(Y),q=function(e){var t=Object.assign({},e);return c.a.createElement("div",{className:"Markdown"},c.a.createElement($.a,t))},G=function(e){var t=e.post,a=t||{},n=a.user,r=a.title,o=a.body,l=a.created_at;return c.a.createElement("div",{className:"PostBody"},t&&c.a.createElement("div",{className:"wrapper"},c.a.createElement("div",{className:"title-area"},c.a.createElement(U,{user:n}),c.a.createElement("div",{className:"info-area"},c.a.createElement("h2",null,r),c.a.createElement("time",{title:new Date(l).toLocaleString("zh-CN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1})},P(l)))),c.a.createElement("div",{className:"body-area"},c.a.createElement(q,{source:o}))))},K=function(e){var t=e.comment,a=e.isMe,n=t.body,r=t.user;return c.a.createElement("div",{className:"Comment".concat(a?" me":"")},c.a.createElement(U,{user:r}),c.a.createElement("div",{className:"content"},c.a.createElement(q,{source:n})))},Q=function(e){var t=e.comments,a=0,r=Object(H.useData)(z),o=Object(n.useCallback)((function(e){return r&&r.id===e.id}));return c.a.createElement("div",{className:"Comments"},t.map((function(e){return c.a.createElement("div",{key:e.id.toString(),className:"comment-wrapper"},function(e){if(e-a>6e4)return a=e,!0}(new Date(e.created_at).getTime())&&c.a.createElement("time",{className:o(e.user)?"me":"",title:new Date(e.created_at).toLocaleString("zh-CN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1})},P(e.created_at)),c.a.createElement(K,{comment:e,isMe:o(e.user)}))})))},V=function(e){var t=Object(m.g)().id,a=function(e){var t=Object(n.useState)(null),a=Object(l.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)([]),u=Object(l.a)(o,2),i=u[0],s=u[1],m=Object(n.useCallback)((function(){e&&S(e).then((function(e){r(e)}))}),[e,r]),f=Object(n.useCallback)((function(){e&&x(e).then((function(e){s(e)}))}),[e,s]);return Object(n.useEffect)((function(){m(),f()}),[e]),[c,i,m,f]}(t),r=Object(l.a)(a,4),o=r[0],u=r[1],i=(r[2],r[3]),s=function(e){return Object(n.useCallback)((function(t){t&&t.trim()?_(e,t).then((function(e){I.a.emit("REFRESH_COMMENTS")})).catch((function(e){T()("\u53d1\u5e03\u5931\u8d25","\u4e3b\u9898\u53d1\u5e03\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01","error"),console.error(e)})):T()("\u9519\u8bef","\u8bf7\u8f93\u5165\u56de\u590d\u5185\u5bb9\uff01","error")}),[e])}(t);return Object(n.useEffect)((function(){return I.a.on("REFRESH_COMMENTS",i),function(){return I.a.off("COMMENTS",i)}}),[]),c.a.createElement("div",{className:"Post"},c.a.createElement("div",{className:"post-area"},c.a.createElement("div",{className:"post-wrapper"},c.a.createElement(G,{post:o}),c.a.createElement(Q,{comments:u}))),c.a.createElement(J,{onPost:s}))},X=function(e){return c.a.createElement("div",{className:"Forum"},c.a.createElement(m.c,null,c.a.createElement(m.a,{path:"/forum/post/:id",component:V}),c.a.createElement(m.a,{path:"/forum/",component:W,exact:!0})))},Z=O.a.create(),ee={http:Z,get:Z.get,post:Z.post,put:Z.put,del:Z.delete},te=function(e){var t=function(){var e=Object(H.useData)(z),t=Object(n.useCallback)((function(){window.location.href="https://github.com/login/oauth/authorize?client_id=".concat("9a7b4e01285d97e29469","&scope=repo")}),[]);return Object(n.useEffect)((function(){var t=/code=(\w+)/[Symbol.match](window.location.href);if(t&&t[1])ee.post("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",{client_id:"9a7b4e01285d97e29469",client_secret:"340d6e3e650e8d915562cab6eb1ae2b295abc7c9",code:t[1]}).then((function(e){if(e.data){var t=/access_token=(\w+)/[Symbol.match](e.data);t&&t[1]&&(window.localStorage.setItem("token",t[1]),window.location.href=window.location.href.replace(/[&?]code=\w+/,""))}})).catch((function(e){T()("\u6388\u6743\u5931\u8d25","\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01","error"),console.error(e)}));else if(!e){var a=window.localStorage.getItem("token");a&&ee.get("https://api.github.com/user",{headers:{Authorization:"token "+a}}).then((function(e){e&&e.data&&Object(H.setData)(z,e.data)})).catch((function(e){T()("\u6388\u6743\u5931\u8d25","\u767b\u5f55\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01","error"),console.error(e),window.localStorage.removeItem("token")}))}}),[window.location.href,e]),[e,t]}(),a=Object(l.a)(t,2),r=a[0],o=a[1],u=Object(n.useCallback)((function(){window.open(r.html_url)}),[r]);return c.a.createElement("a",{className:"User".concat(r?" login":""),href:"javascript: void(0)",onClick:r?u:o},r?c.a.createElement("img",{src:r.avatar_url,alt:r.login,title:r.login}):c.a.createElement("i",{className:"icon-user"}))};!function(){var e;Object(H.init)((e={},Object(B.a)(e,A,""),Object(B.a)(e,z,null),e))}();var ae=function(){return function(){var e=Object(n.useCallback)((function(){document.body.style.maxHeight=window.innerHeight+"px"}),[]);Object(n.useEffect)((function(){window.addEventListener("resize",e),e()}),[e])}(),c.a.createElement(p.a,null,c.a.createElement("div",{className:"App"},c.a.createElement("nav",null,c.a.createElement(p.c,{exact:!0,to:"/",className:"logo"}),c.a.createElement(p.c,{exact:!0,to:"/"},"\u9996\u9875"),c.a.createElement(p.c,{to:"/forum"},"\u7559\u8a00\u677f"),c.a.createElement(p.c,{to:"/hexie"},"\u548c\u8c10\u52a0\u5bc6\u5668"),c.a.createElement(te,null)),c.a.createElement("main",null,c.a.createElement(m.c,null,c.a.createElement(m.a,{path:"/hexie",component:d}),c.a.createElement(m.a,{path:"/forum",component:X}),c.a.createElement(m.a,{path:"/",component:h,exact:!0}))),c.a.createElement("footer",null,"\xa9\xa0",c.a.createElement("a",{href:"https://github.com/wheatup/",target:"_blank",rel:"noopener noreferrer"},"wheatup"),"\xa0@",(new Date).getFullYear()," All rights reserved.")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(173);var ne=Symbol();Object(H.init)(Object(B.a)({},ne,"1.0")),o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},58:function(e,t,a){e.exports=a(174)}},[[58,1,2]]]);
//# sourceMappingURL=main.bddbd6e9.chunk.js.map