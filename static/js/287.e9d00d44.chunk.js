"use strict";(self.webpackChunkairbnb=self.webpackChunkairbnb||[]).push([[287],{7192:function(n,r,t){t.d(r,{Z:function(){return l}});var e,i=t(6594),c=t(6599),s=t(9071).ZP.div(e||(e=(0,c.Z)(["\n    position: relative;\n    display: flex;\n    transition: all 300ms ease;\n    > * {\n      flex-shrink: 0\n    };\n"]))),a=t(5787),l=(0,i.memo)((function(n){var r=n.children,t=n.curIndex,e=(0,i.useRef)(null);return(0,i.useEffect)((function(){var n=e.current.children[t],r=n.clientWidth,i=n.offsetLeft,c=e.current.clientWidth,s=i+.5*r-.5*c,a=e.current.scrollWidth-c;s<0&&(s=0),s>=a&&(s=a),e.current.style.transform="translateX(".concat(-s,"px)")}),[t]),(0,a.jsx)(s,{ref:e,children:r})}))},1287:function(n,r,t){t.r(r),t.d(r,{default:function(){return o}});var e,i=t(2398),c=t(6594),s=t(7192),a=t(6599),l=t(9071).ZP.div(e||(e=(0,a.Z)(["\n  padding: 20px;\n\n  .tools {\n    padding: 12px;\n    margin: 20px;\n  }\n  .indicator-list {\n    width: 400px;\n    background: tan;\n    overflow: hidden;\n    .indicator-item {\n      padding: 4px 8px;\n      border: 1px solid #222;\n      margin-right: 8px;\n      cursor: pointer;\n    }\n  }\n"]))),d=t(5787),o=(0,c.memo)((function(){var n=["\u6d4b\u8bd5111","\u6d4b\u8bd52222","\u6d4b\u8bd5333","\u6d4b\u8bd54444","\u6d4b\u8bd55555","\u6d4b\u8bd56666","\u6d4b\u8bd5777"],r=(0,c.useState)(0),t=(0,i.Z)(r,2),e=t[0],a=t[1];function o(r){var t="next"===r?e+1:e-1;t<0&&(t=n.length-1),t>n.length-1&&(t=0),a(t)}return(0,d.jsxs)(l,{children:[(0,d.jsxs)("div",{className:"tools",children:[(0,d.jsx)("button",{onClick:function(){return o("prev")},children:"prev"})," | ",(0,d.jsx)("button",{onClick:function(){return o("next")},children:"next"})]}),(0,d.jsx)("div",{className:"indicator-list",children:(0,d.jsx)(s.Z,{curIndex:e,children:n.map((function(n,r){return(0,d.jsx)("span",{className:"indicator-item",children:n},r)}))})})]})}))}}]);
//# sourceMappingURL=287.e9d00d44.chunk.js.map