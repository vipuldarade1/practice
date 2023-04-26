(function(){"use strict";var t={8063:function(t,e,s){var n=s(6597),i=function(){var t=this,e=t._self._c;return e("div",{style:t.cssProps,attrs:{id:"app"}},[e("div",{staticClass:"vue-container"},[e("messages-section",{attrs:{messages:t.messages,users:t.users}}),e("form-section",{ref:"formSection",attrs:{localize:t.localize,window:t.window,users:t.users,atMentions:t.atMentions,status:t.statusText}}),e("div",{class:t.setInfoBoxStyle},[t.window.infoMessage?e("markdown-element",{attrs:{text:t.window.infoMessage,inline:!1}}):t._e()],1)],1)])},a=[],o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"messages-section"},t._l(t.messages,(function(t){return e("messages-date-group",{key:t.date,attrs:{groups:t.groups,date:t.date}})})),1)},r=[],u=function(){var t=this,e=t._self._c;return e("div",{staticClass:"messages-date-section"},[e("h3",{staticClass:"date-heading",attrs:{tabindex:"0"}},[t._v(t._s(t.dateString))]),t._l(t.groups,(function(t){return e("message-group",{key:t.key,attrs:{messages:t.messages,userId:t.userId,user:t.user,timestamp:t.minTimestamp,tabindex:"0"}})}))],2)},l=[],c=function(){var t=this,e=t._self._c;return e("div",{staticClass:"message-group"},[e("div",{staticClass:"message-group-image"},[e("img",{attrs:{src:t.user?t.user.avatarUri:null}})]),e("div",{staticClass:"message-group-content"},[e("div",[e("strong",{staticClass:"username",on:{click:t.followUserFunc}},[t._v(t._s(t.userName))]),t._v("   "),e("span",{staticClass:"timestamp"},[t._v(t._s(t.readableTimestamp))])]),e("ul",{staticClass:"message-list"},t._l(t.messages,(function(t){return e("message-item",{key:t.timestamp,attrs:{message:t}})})),1)])])},d=[],p=function(){var t=this,e=t._self._c;return e("li",{class:{unread:t.message.isUnread}},[e("markdown-element",{attrs:{inline:!1,text:t.message.text}})],1)},m=[],f=function(){var t=this,e=t._self._c;return t.html?e("div",{style:t.inlineStyleObject,domProps:{innerHTML:t._s(t.html)}}):t._e()},h=[],g=s(8591),v=s(5037),b={name:"markdown-element",props:["text","inline"],computed:{html:function(){const t=new g({breaks:!0}).use(v);return this.inline?t.renderInline(this.text):t.render(this.text)},inlineStyleObject:function(){return{display:this.inline?"inline":"block"}}}},w=b,y=s(7942),_=(0,y.Z)(w,f,h,!1,null,null,null),x=_.exports,T={name:"message-item",props:["message"],components:{MarkdownElement:x}},S=T,k=(0,y.Z)(S,p,m,!1,null,null,null),C=k.exports;const O=acquireVsCodeApi();function M(t,e){O.postMessage({type:t,body:e})}function I(t){const e=new Date(1e3*+t);return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}function j(t){return M("follow",t)}var Z={name:"message-group",props:["messages","userId","user","timestamp"],computed:{readableTimestamp:function(){return I(this.timestamp)},userName:function(){return this.user?this.user.displayName:this.userId}},components:{MessageItem:C},methods:{followUserFunc:function(){j(this.userId)}}},E=Z,z=(0,y.Z)(E,c,d,!1,null,null,null),L=z.exports,F={props:["groups","date"],components:{MessageGroup:L},computed:{dateString:function(){const t={weekday:"long",month:"long",day:"numeric",timeZone:"UTC"};return new Date(this.date).toLocaleDateString("en-US",t)}}},P=F,D=(0,y.Z)(P,u,l,!1,null,null,null),K=D.exports,$={name:"messages-section",props:["messages"],components:{MessagesDateGroup:K},data:function(){return{messagesLength:0}},updated(){const t=this.messages.map((t=>t.groups)),e=[].concat.apply([],t),s=e.reduce(((t,e)=>t+e.messages.length),0);s!==this.messagesLength&&(this.messagesLength=s,this.$el.scrollTop=this.$el.scrollHeight)}},N=$,U=(0,y.Z)(N,o,r,!1,null,null,null),B=U.exports,H=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-section"},[e("div",{class:t.isDisabled},[e("message-input",{attrs:{onSubmit:t.onSubmit,users:t.users,placeholderText:t.placeholder}}),e("div",{staticClass:"status-text"},[t._v(t._s(t.status))])],1)])},A=[],G=function(){var t=this,e=t._self._c;return e("vue-tribute",{attrs:{options:t.tributeOptions}},[e("p",{directives:[{name:"focus",rawName:"v-focus"}],ref:"messageInput",staticClass:"editable",attrs:{id:"input",contenteditable:"","data-ph":t.placeholderText},on:{keydown:function(e){return e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.onKeydown.apply(null,arguments)},focus:t.onFocus,input:t.onInput,"tribute-replaced":t.onTributeReplaced}})])},R=[],V=s(4681),q={name:"message-input",props:["placeholderText","users","onSubmit"],components:{VueTribute:V.Z},watch:{users:function(t,e){Object.keys(t).length!==Object.keys(e).length&&setTimeout((()=>{this.tributeOptions.values=Object.values(t).map((t=>({key:t.displayName,value:t.displayName})))}),200)}},data:function(){return{text:"",inComposition:!1,sendTypingEvents:!0,tributeOptions:{values:[],selectTemplate:function(t){return`<span class="at-mention" contenteditable="false">@${t.original.value}</span>`}}}},mounted(){this.$refs.messageInput.addEventListener("compositionstart",(t=>{this.inComposition=!0})),this.$refs.messageInput.addEventListener("compositionend",(t=>{this.inComposition=!1}))},methods:{onSubmitFunc:function(t){this.onSubmit(this.text),this.clearInput()},onFocus:function(t){return M("is_focused")},onKeydown:function(t){"Enter"!==t.code||t.shiftKey||this.inComposition?this.sendTypingEvents&&(this.sendTypingEvents=!1,M("typing"),setTimeout((()=>{this.sendTypingEvents=!0}),300)):(t.preventDefault(),this.text&&this.onSubmitFunc())},clearInput:function(){this.text="",this.$refs.messageInput.innerHTML=""},onInput:function(t){this.text=t.target.innerText},onTributeReplaced:function(t){console.log("replaced",t.detail)}}};n.ZP.directive("focus",{inserted:function(t){t.focus()}});var W=q,J=(0,y.Z)(W,G,R,!1,null,null,null),Q=J.exports,X={name:"form-section",props:["window","users","localize","status"],components:{MessageInput:Q},computed:{placeholder:function(){return this.localize("Type a new message")},isDisabled:function(){return this.window&&this.window.isDisabled?"disabled":""}},methods:{onSubmit:function(t){const e=t.startsWith("/")?"command":"text";M(e,t)}},mounted(){return M("is_ready")}},Y=X,tt=(0,y.Z)(Y,H,A,!1,null,null,null),et=tt.exports,st={name:"app",props:["data"],components:{MessagesSection:B,FormSection:et,MarkdownElement:x},computed:{messages:function(){return this.data?this.data.messages:[]},users:function(){return this.data?this.data.users:{}},window:function(){return this.data?this.data.window:{}},statusText:function(){return this.data?this.data.statusText:""},atMentions:function(){return this.data?this.data.atMentions:[]},localizedStrings(){return this.data?this.data.localizedStrings:{}},setInfoBoxStyle:function(){return this.data&&this.data.window&&this.data.window.infoMessage?"infoBox":"disabled"},cssProps(){return{"--chat-code-font-family":this.data?this.data.fontFamily:"monospace","--chat-font-size":this.data?`${this.data.fontSize}px`:"12px"}}},methods:{localize(t){return this.localizedStrings[t]||t}}},nt=st,it=(0,y.Z)(nt,i,a,!1,null,null,null),at=it.exports,ot=new n.ZP({template:'<app :data="data"> </app>',props:["data"],components:{App:at},el:"#app"});window.addEventListener("message",(t=>{ot.data=t.data}))}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var a=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(a.exports,a,a.exports,s),a.loaded=!0,a.exports}s.m=t,function(){var t=[];s.O=function(e,n,i,a){if(!n){var o=1/0;for(c=0;c<t.length;c++){n=t[c][0],i=t[c][1],a=t[c][2];for(var r=!0,u=0;u<n.length;u++)(!1&a||o>=a)&&Object.keys(s.O).every((function(t){return s.O[t](n[u])}))?n.splice(u--,1):(r=!1,a<o&&(o=a));if(r){t.splice(c--,1);var l=i();void 0!==l&&(e=l)}}return e}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[n,i,a]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,n){var i,a,o=n[0],r=n[1],u=n[2],l=0;if(o.some((function(e){return 0!==t[e]}))){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);if(u)var c=u(s)}for(e&&e(n);l<o.length;l++)a=o[l],s.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return s.O(c)},n=self["webpackChunk_vs_liveshare_chat_webview"]=self["webpackChunk_vs_liveshare_chat_webview"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(8063)}));n=s.O(n)})();