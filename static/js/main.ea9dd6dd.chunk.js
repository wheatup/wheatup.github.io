(this.webpackJsonphomepage=this.webpackJsonphomepage||[]).push([[0],{40:function(e,t,a){e.exports=a(77)},76:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(38),o=a.n(r),l=a(3),u=a(19),i=function(e){var t=e.children,a=e.onClick,n=Object(u.a)(e,["children","onClick"]);return c.a.createElement("a",Object.assign({onClick:function(){return a&&a.apply(void 0,arguments)},className:"Button",href:"javascript: void(0)"},n),t)},s=a(16),m=a(1),f=function(e){Object(n.useEffect)((function(){document.title=e}),[e])},d=function(e){var t,a=e.location;f("\u548c\u8c10\u52a0\u5bc6\u5668");var r=Object(n.useState)(""),o=Object(l.a)(r,2),u=o[0],d=o[1],h=Object(n.useState)(""),p=Object(l.a)(h,2),b=p[0],v=p[1],E=Object(n.useState)(""),g=Object(l.a)(E,2),j=g[0],O=g[1],w=Object(n.useState)(!1),k=Object(l.a)(w,2),y=k[0],N=k[1],x=Object(m.f)(),C=Object(n.useRef)(null),S=Object(n.useRef)(null),R=new URLSearchParams(null!==(t=null===a||void 0===a?void 0:a.search)&&void 0!==t?t:""),_=R.get("act")||"decode",I=decodeURI(R.get("dict")||""),P=decodeURI(R.get("txt")||""),M=Object(n.useMemo)((function(){var e=b||I;if(e)return e.split(/[,\uff0c]/).map((function(e){return e.trim()}))}),[b,I]),U=Object(n.useCallback)((function(){x.replace(a.pathname+"?act=encode"+(b?"&dict=".concat(encodeURI(b)):"")+(u?"&txt=".concat(encodeURI(u)):""))}),[u,b,x,a]),D=Object(n.useCallback)((function(){x.replace(a.pathname+"?act=decode"+(b?"&dict=".concat(encodeURI(b)):"")+(u?"&txt=".concat(encodeURI(u)):""))}),[u,b,x,a]),T=Object(n.useCallback)((function(e,t){try{var a=t&&t.length>2?Object(s.encode)(e,t):Object(s.encode)(e);O(a)}catch(n){O("")}}),[O]),B=Object(n.useCallback)((function(e,t){try{var a=t&&t.length>2?Object(s.decode)(e,t):Object(s.decode)(e);O(a)}catch(n){O("")}}),[O]);Object(n.useEffect)((function(){P&&d(P),I&&v(I),_&&("decode"===_?B(P,M):T(P,M))}),[_,P,I]);var F=Object(n.useCallback)((function(){C.current.select(),C.current.setSelectionRange(0,999999),document.execCommand("copy"),N(!0),setTimeout((function(){return N(!1)}),700)}),[j,C]),H=Object(n.useCallback)((function(){S.current.select(),S.current.setSelectionRange(0,999999)}),[S]);return c.a.createElement("div",{className:"HexieEncoder"},c.a.createElement("h1",null,"\u548c\u8c10\u52a0\u5bc6\u5668"),c.a.createElement("textarea",{onChange:function(e){var t=e.target.value;O(""),d(t)},value:u,ref:S,onFocus:H}),c.a.createElement("div",{className:"button-area"},c.a.createElement(i,{onClick:U},"\u52a0\u5bc6"),c.a.createElement(i,{onClick:D},"\u89e3\u5bc6")),c.a.createElement("textarea",{value:y?"\u5df2\u590d\u5236":j,readOnly:!0,onClick:F,ref:C}),c.a.createElement("h2",null,"\u81ea\u5b9a\u4e49\u5b57\u5178"),c.a.createElement("input",{type:"text",placeholder:"\u5bcc\u5f3a,\u6c11\u4e3b,\u6587\u660e,\u548c\u8c10,\u81ea\u7531,\u5e73\u7b49,\u516c\u6b63,\u6cd5\u6cbb,\u7231\u56fd,\u656c\u4e1a,\u8bda\u4fe1,\u53cb\u5584",onChange:function(e){var t=e.target.value;O(""),v(t)},value:b}))},h=a(8),p=function(e){return f("wheatup"),c.a.createElement("div",{className:"Home"},c.a.createElement("h2",null,"\u65bd\u5de5\u4e2d\uff0c\u8bf7\u7a0d\u540e\u518d\u6765"))},b=a(9),v=a.n(b),E=a(17),g=a(18),j=a.n(g),O=j.a.create({baseURL:"https://api.github.com/repos/wheatup/wheatup.github.io"}),w=!1,k=function(){if(!w){var e=window.localStorage.getItem("token");e&&(O.defaults.headers.common.Authorization="Bearer "+e,w=!0)}return O},y=function(){var e;return(e=k()).get.apply(e,arguments)},N=function(){var e;return(e=k()).post.apply(e,arguments)},x=function(){var e=Object(E.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/issues");case 2:if(!(t=e.sent)||!t.data){e.next=8;break}return console.log(t.data),e.abrupt("return",t.data);case 8:throw new Error(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(E.a)(v.a.mark((function e(t){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/issues/".concat(t));case 2:if(!(a=e.sent)||!a.data){e.next=7;break}return e.abrupt("return",a.data);case 7:throw new Error(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(E.a)(v.a.mark((function e(t){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y("/issues/".concat(t,"/comments"));case 2:if(!(a=e.sent)||!a.data){e.next=7;break}return e.abrupt("return",a.data);case 7:throw new Error(a);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(E.a)(v.a.mark((function e(t,a){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N("/issues",{title:t,body:a},{headers:{"Content-Type":"application/json",Accept:"application/vnd.github.v3+json"}});case 2:if(!(n=e.sent)||!n.data){e.next=7;break}return e.abrupt("return",n.data);case 7:throw new Error(n);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),_=a(11),I=a.n(_),P=a(13),M=a.n(P),U=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Date;"string"===typeof e&&(e=new Date(e)),"string"===typeof t&&(t=new Date(t));var a=Math.abs(t.getTime()-e.getTime()),n=t.getTime()-e.getTime()>0;return a<1e3?"\u521a\u521a":a<6e4?Math.floor(a/1e3)+"\u79d2".concat(n?"\u524d":"\u540e"):a<36e5?Math.floor(a/6e4)+"\u5206\u949f".concat(n?"\u524d":"\u540e"):a<864e5?Math.floor(a/36e5)+"\u5c0f\u65f6".concat(n?"\u524d":"\u540e"):a<6048e5?Math.floor(a/864e5)+"\u5929".concat(n?"\u524d":"\u540e"):a<2592e6?Math.floor(a/6048e5)+"\u5468".concat(n?"\u524d":"\u540e"):a<94608e7?Math.floor(a/2592e6)+"\u4e2a\u6708".concat(n?"\u524d":"\u540e"):Math.floor(a/31536e6)+"\u5e74".concat(n?"\u524d":"\u540e")},D=function(e){var t=e.user,a=Object(n.useCallback)((function(e){window.open(t.html_url),e.stopPropagation(),e.preventDefault()}),[]);return c.a.createElement("div",{onClick:a,className:"UserAvatar"},t?c.a.createElement(c.a.Fragment,null,c.a.createElement("img",{src:t.avatar_url,alt:t.login}),c.a.createElement("h2",null,t.login)):c.a.createElement("i",{className:"icon-user"}))},T=function(e){var t=e.post;console.log(t);var a=t.title,n=t.user,r=t.created_at,o=t.comments,l=(t.updated_at,t.number);return c.a.createElement(h.b,{to:"/forum/post/".concat(l),className:"PostEntry"},c.a.createElement(D,{user:n}),c.a.createElement("div",{className:"summary"},c.a.createElement("h2",null,a),c.a.createElement("time",{className:"create"},U(r))),c.a.createElement("span",{className:"details"},c.a.createElement("span",{className:"comments"},o)))},B=a(10),F=a(15),H=Symbol(),A=Symbol(),z=function(e){var t=e.children,a=Object(u.a)(e,["children"]);return c.a.createElement("a",Object.assign({className:"Button",href:"javascript: void(0)"},a),t)},L=function(e){var t=e.hasBody,a=e.onPost,r=Object(B.useData)(A),o=Object(n.useState)(""),u=Object(l.a)(o,2),i=u[0],s=u[1],m=Object(n.useState)(""),f=Object(l.a)(m,2),d=f[0],h=f[1],p=Object(n.useCallback)((function(){a&&(a(i,d),s(""),h(""))}),[i,d,a]);return c.a.createElement("div",{className:"ChatInput".concat(r?"":" locked")},c.a.createElement("div",{className:"title-area"},c.a.createElement(z,null,c.a.createElement("i",{className:"icon-grin"})),c.a.createElement(z,null,c.a.createElement("i",{className:"icon-images"})),t?c.a.createElement("input",{type:"text",value:i,onChange:function(e){return s(e.target.value)}}):c.a.createElement("textarea",{rows:"1",value:i,onChange:function(e){return s(e.target.value)}}),c.a.createElement(z,{onClick:p},c.a.createElement("i",{className:"icon-paper-plane"}))),t&&c.a.createElement("div",{className:"body-area"},c.a.createElement("textarea",{rows:"4",value:d,onChange:function(e){return h(e.target.value)}})))},J=function(e){var t=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],c=t[1],r=Object(n.useCallback)((function(){console.log("reload"),x().then((function(e){c(e)}))}),[c]);return Object(n.useEffect)((function(){r()}),[]),[a,r]}(),a=Object(l.a)(t,2),r=a[0],o=a[1],u=Object(n.useCallback)((function(e,t){e||I()("\u9519\u8bef","\u8bf7\u8f93\u5165\u6807\u9898\uff01","error"),R(e,t).then((function(e){console.log(e),M.a.emit("REFRESH_POSTS")})).catch((function(e){I()("\u53d1\u5e03\u5931\u8d25","\u4e3b\u9898\u53d1\u5e03\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01","error"),console.error(e)}))}),[]);return Object(n.useEffect)((function(){return M.a.on("REFRESH_POSTS",o),function(){return M.a.off("REFRESH_POSTS",o)}}),[]),c.a.createElement("div",{className:"PostList"},c.a.createElement("div",{className:"list-wrapper"},c.a.createElement("div",{className:"list"},r&&r.map((function(e){return c.a.createElement(T,{key:e.node_id,post:e})})))),c.a.createElement(L,{hasBody:!0,onPost:u}))},W=function(e){var t=e.post;console.log(t);var a=t||{},n=a.user,r=a.title,o=a.body,l=a.created_at;return c.a.createElement("div",{className:"PostBody"},t&&c.a.createElement("div",{className:"wrapper"},c.a.createElement("div",{className:"title-area"},c.a.createElement(D,{user:n}),c.a.createElement("div",{className:"info-area"},c.a.createElement("h2",null,r),c.a.createElement("time",{title:new Date(l).toLocaleString("zh-CN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1})},U(l)))),c.a.createElement("div",{className:"body-area"},c.a.createElement("p",null,o))))},Y=function(e){e.comments;return c.a.createElement("div",{className:"Comments"})},$=function(e){var t=function(e){var t=Object(n.useState)(null),a=Object(l.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)([]),u=Object(l.a)(o,2),i=u[0],s=u[1];return Object(n.useEffect)((function(){e&&C(e).then((function(e){r(e)})),e&&S(e).then((function(e){s(e)}))}),[e]),[c,i]}(Object(m.g)().id),a=Object(l.a)(t,2),r=a[0],o=a[1];return c.a.createElement("div",{className:"Post"},c.a.createElement(W,{post:r}),c.a.createElement(Y,{comments:o}),c.a.createElement(L,null))},q=function(e){return c.a.createElement("div",{className:"Forum"},c.a.createElement(m.c,null,c.a.createElement(m.a,{path:"/forum/post/:id",component:$}),c.a.createElement(m.a,{path:"/forum/",component:J,exact:!0})))},G=j.a.create(),K={http:G,get:G.get,post:G.post,put:G.put,del:G.delete},Q=function(e){var t=function(){var e=Object(B.useData)(A),t=Object(n.useCallback)((function(){window.location.href="https://github.com/login/oauth/authorize?client_id=".concat("9a7b4e01285d97e29469","&scope=repo")}),[]);return Object(n.useEffect)((function(){var t=/code=(\w+)/[Symbol.match](window.location.href);if(t&&t[1])K.post("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",{client_id:"9a7b4e01285d97e29469",client_secret:"340d6e3e650e8d915562cab6eb1ae2b295abc7c9",code:t[1]}).then((function(e){if(e.data){var t=/access_token=(\w+)/[Symbol.match](e.data);t&&t[1]&&(window.localStorage.setItem("token",t[1]),window.location.href=window.location.href.replace(/[&?]code=\w+/,""))}console.log(e)})).catch((function(e){I()("\u6388\u6743\u5931\u8d25","\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01","error"),console.error(e)}));else if(!e){var a=window.localStorage.getItem("token");a&&K.get("https://api.github.com/user",{headers:{Authorization:"token "+a}}).then((function(e){e&&e.data&&Object(B.setData)(A,e.data)})).catch((function(e){I()("\u6388\u6743\u5931\u8d25","\u767b\u5f55\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01","error"),console.error(e),window.localStorage.removeItem("token")}))}}),[window.location.href,e]),[e,t]}(),a=Object(l.a)(t,2),r=a[0],o=a[1],u=Object(n.useCallback)((function(){console.log(r),window.open(r.html_url)}),[r]);return c.a.createElement("a",{className:"User".concat(r?" login":""),href:"javascript: void(0)",onClick:r?u:o},r?c.a.createElement("img",{src:r.avatar_url,alt:r.login,title:r.login}):c.a.createElement("i",{className:"icon-user"}))};!function(){var e;Object(B.init)((e={},Object(F.a)(e,H,""),Object(F.a)(e,A,null),e))}();var V=function(){return function(){var e=Object(n.useCallback)((function(){document.body.style.maxHeight=window.innerHeight+"px"}),[]);Object(n.useEffect)((function(){window.addEventListener("resize",e),e()}),[e])}(),c.a.createElement(h.a,null,c.a.createElement("div",{className:"App"},c.a.createElement("nav",null,c.a.createElement(h.c,{exact:!0,to:"/",className:"logo"}),c.a.createElement(h.c,{exact:!0,to:"/"},"\u9996\u9875"),c.a.createElement(h.c,{to:"/forum"},"\u7559\u8a00\u677f"),c.a.createElement(h.c,{to:"/hexie"},"\u548c\u8c10\u52a0\u5bc6\u5668"),c.a.createElement(Q,null)),c.a.createElement("main",null,c.a.createElement(m.c,null,c.a.createElement(m.a,{path:"/hexie",component:d}),c.a.createElement(m.a,{path:"/forum",component:q}),c.a.createElement(m.a,{path:"/",component:p,exact:!0}))),c.a.createElement("footer",null,"\xa9\xa0",c.a.createElement("a",{href:"https://github.com/wheatup/",target:"_blank",rel:"noopener noreferrer"},"wheatup"),"\xa0@",(new Date).getFullYear()," All rights reserved.")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(76);var X=Symbol();Object(B.init)(Object(F.a)({},X,"1.0")),o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[40,1,2]]]);
//# sourceMappingURL=main.ea9dd6dd.chunk.js.map