var i=Object.defineProperty;var s=(r,e,t)=>e in r?i(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var a=(r,e,t)=>(s(r,typeof e!="symbol"?e+"":e,t),t);class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
      <style>:host{--track-width: 2px;--track-color: #adaba8;--indicator-color: #6d4aff;--speed: 1s;--size: 1em;display:inline-block}[part=spinner]{height:var(--size);width:var(--size);border-width:var(--track-width);border-style:solid;border-color:var(--indicator-color) var(--track-color) var(--track-color) var(--track-color);border-radius:50%;animation:spin var(--speed) linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
</style>
      <div part="spinner" role="progressbar" aria-label="Loading"></div>
    `}}a(o,"is","breeze-spinner");customElements.get("breeze-spinner")||customElements.define("breeze-spinner",o);export{o as default};
