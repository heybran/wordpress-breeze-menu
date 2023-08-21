var v=Object.defineProperty;var w=(r,t,e)=>t in r?v(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var l=(r,t,e)=>(w(r,typeof t!="symbol"?t+"":t,e),e);const c=`:host{--_outline-color-focus: var(--breeze-outline-color-focus, hsl(252, 100%, 65%));--_box-shadow-color-focus: var(--breeze-box-shadow-color-focus, rgba(109, 74, 255, .2));--_primary-color: var(--breeze-primary-color, #6d4aff);--_box-shadow-shadow: var(--breeze-box-shadow-shadow, 0 0 0 .1875rem);--_box-shadow: var(--_box-shadow-shadow) var(--_box-shadow-color-focus);--_border-radius-base: var(--breeze-border-radius-base, 8px);--_border-radius-sm: calc(var(--_border-radius-base) * .5);--_border-radius-md: calc(var(--_border-radius-base) * 1);--_border-radius-lg: calc(var(--_border-radius-base) * 1.5);--_border-radius-xl: calc(var(--_border-radius-base) * 2);--_border-radius-full: 9999em;--_border-color-normal: var(--breeze-border-color-normal, #adaba8);--_background-color-normal: var(--breeze-background-color-normal, #adaba8);--_backdrop-normal: rgba(38, 42, 51, .48);--_hover-color: rgba(194, 193, 192, .2);--_button-border-color: var(--breeze-button-border-color, #dedbd9)}*{box-sizing:border-box}.sr-only{clip:rect(0 0 0 0);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;top:0;width:1px}
`,x=`*{box-sizing:border-box}:host{position:relative;display:inline-block}button{background-color:var(--_button-background-color, transparent);border:1px solid var(--_button-border-color, transparent);color:var(--button-text-color, inherit);cursor:pointer;font:inherit;margin:0;padding:.5em 1em;border-radius:var(--_border-radius-md);display:inline-flex;align-items:center;justify-content:center;flex-wrap:nowrap;gap:var(--_button-gap, .2em);transition:.15s cubic-bezier(.22,1,.36,1)}button:hover{background-color:#c2c1c033}button:focus-visible{outline:1px auto var(--_outline-color-focus);box-shadow:var(--_box-shadow)}[part=prefix],[part=suffix],[part=label]{display:inline-flex;align-items:center}:host([theme~="icon"]) button{gap:0;padding:.25ch}:host([no-border]) button{border-color:transparent}
`,y='<button type="button"><span part="prefix" aria-hidden="true"><slot name="prefix"></slot></span><span part="label"><slot></slot></span><span part="suffix" aria-hidden="true"><slot name="suffix"></slot></span></button><slot name="tooltip"></slot>';class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}render(t,e){const o=document.createElement("template");o.innerHTML=`<style>${e}</style>`+t,this.shadowRoot.appendChild(o.content.cloneNode(!0))}get container(){return this.shadowRoot.querySelector('[part="container"]')}}class m extends g{constructor(){super()}getForm(){let t=this.closest("form");for(;t;){if(t instanceof HTMLFormElement)return t;t=t.getRootNode().host}return null}static get observedAttributes(){return["name"]}attributeChangedCallback(t,e,o){switch(t){case"name":this.name=o}}}const f=document.createElement("template");f.innerHTML=`<style>${c}${x}</style>${y}`;class z extends m{constructor(){super()}get type(){return this.getAttribute("type")}connectedCallback(){this.render(),this.syncAttributes(),this.getReadyForFormSubmit()}syncAttributes(){this.hasAttribute("type")&&this.button.setAttribute("type",this.type)}getReadyForFormSubmit(){if(this.type==="submit"){const t=this.getForm();this.button.setAttribute("form",t.id||t.name),this.button.addEventListener("click",e=>{const o=new Event("submit",{bubbles:!0,cancelable:!0});t==null||t.dispatchEvent(o)})}}get button(){return this.shadowRoot.querySelector("button")}render(){this.shadowRoot.appendChild(f.content.cloneNode(!0))}static get observedAttributes(){return["type"]}attributeChangedCallback(t,e,o){e!==null&&t==="type"&&this.button.setAttribute(t,o)}}customElements.get("breeze-button")||customElements.define("breeze-button",z);const k=`*{box-sizing:border-box}:host{display:inline-flex;--tooltip-arrow-size: 12px;position:fixed;left:var(--tooltip-left);top:var(--tooltip-top);transition:opacity .3s ease;will-change:opacity;z-index:99999;opacity:0;pointer-events:none;visibility:hidden;font-size:.9em}:host(.visible){opacity:1;visibility:visible;pointer-events:initial}.content{background-color:var(--tooltip-background-color, #0c0c14);color:var(--TODO, #fff);border-radius:var(--_border-radius-md);padding:1em 1.2em;display:grid;gap:.75em}.content *{color:inherit;margin:0}.content:before{content:"";position:absolute;border-width:8px 8px 0;border-top-color:initial;width:var(--tooltip-arrow-size);height:var(--tooltip-arrow-size);background:var(--tooltip-background-color, #0c0c14);transform:rotate(45deg)}:host([arrow-position="bottom"]) .content:before{bottom:calc(var(--tooltip-arrow-size) * -.5);left:calc(50% - var(--tooltip-arrow-size) / 2)}:host([arrow-position="top"]) .content:before{left:calc(50% - var(--tooltip-arrow-size) / 2);bottom:calc(100% + var(--tooltip-arrow-size) * -.5)}:host([arrow-position="left"]) .content:before{top:calc(50% - var(--tooltip-arrow-size) / 2);right:calc(100% + var(--tooltip-arrow-size) * -.5)}:host([arrow-position="right"]) .content:before{top:calc(50% - var(--tooltip-arrow-size) / 2);left:calc(100% + var(--tooltip-arrow-size) * -.5)}
`;function p({element:r,target:t,position:e,offset:o}){const{left:i,top:s}=t.getBoundingClientRect();let a,n;const{width:d,height:h}=r.getBoundingClientRect(),{width:b,height:u}=t.getBoundingClientRect();if(e==="top"){if(n=s-h-o,a=i+b/2-d/2,r.hasArrow&&r.setAttribute("arrow-position","bottom"),n<2)return p({element:r,target:t,position:"bottom",offset:o})}else if(e==="bottom"){if(n=s+u+o,a=i+b/2-d/2,r.hasArrow&&r.setAttribute("arrow-position","top"),n+h+2>window.innerHeight)return p({element:r,target:t,position:"top",offset:o})}else e==="left"?(n=s+u/2-h/2,a=i-o-d,r.hasArrow&&r.setAttribute("arrow-position","right")):e==="right"&&(n=s+u/2-h/2,a=i+b+o,r.hasArrow&&r.setAttribute("arrow-position","left"));return{x:a,y:n}}class A extends HTMLElement{constructor(){super();l(this,"onKeydown",e=>{this.opened&&e.key==="Escape"&&this.closeTooltip()});l(this,"closeTooltip",()=>{this.classList.remove("visible"),document.removeEventListener("keydown",this.onKeydown),document.removeEventListener("wheel",this.onScroll)});l(this,"openTooltip",()=>{this.setPosition(),this.classList.add("visible"),document.addEventListener("keydown",this.onKeydown),document.addEventListener("wheel",this.onScroll)});l(this,"onScroll",()=>{this.setPosition()});this.attachShadow({mode:"open"})}get target(){var e;if(this.hasAttribute("slot"))return(e=this.assignedSlot)==null?void 0:e.getRootNode().host;this.hasAttribute("for")}connectedCallback(){var e,o,i,s;this.shadowRoot.innerHTML=`
      <style>${c}${k}</style>
      <div part="content" class="content">
        ${this.getAttribute("text")??this.innerHTML}
      </div>
    `,this.target&&((e=this.target)==null||e.addEventListener("focusin",this.openTooltip),(o=this.target)==null||o.addEventListener("focusout",this.closeTooltip),(i=this.target)==null||i.addEventListener("mouseenter",this.openTooltip),(s=this.target)==null||s.addEventListener("mouseleave",this.closeTooltip))}get opened(){return this.classList.contains("visible")}get hasArrow(){return!0}get position(){var e;return this.hasAttribute("position")?(e=this.getAttribute("position"))==null?void 0:e.trim():"top"}get content(){return this.shadowRoot.querySelector(".content")}get arrowSize(){return+window.getComputedStyle(this).getPropertyValue("--tooltip-arrow-size").replace("px","")}setPosition(){const{x:e,y:o}=p({element:this,target:this.target,position:this.position,offset:2+this.arrowSize});this.style.setProperty("--tooltip-left",`${e}px`),this.style.setProperty("--tooltip-top",`${o}px`)}}customElements.get("breeze-tooltip")||customElements.define("breeze-tooltip",A);const _=`:host{display:inline-flex;--size: 1em;width:var(--size);height:var(--size);align-items:center;justify-content:center}:host([size="medium"]){--size: 3ch}svg{width:100%}
`,E='<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>',L='<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>',$='<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>',C=`<path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
<path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>`,T='<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>',S='<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>',R='<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>',M={"chevron-down":E,"chevron-right":L,telephone:$,phone:C,email:T,check:S,cross:R};class H extends HTMLElement{static get is(){return"breeze-icon"}constructor(){super(),this.attachShadow({mode:"open"}),this.root=this.shadowRoot}get icon(){return this.getAttribute("icon")}connectedCallback(){this.render()}render(){this.root.innerHTML=`
      <style>${_}</style>
      <svg viewBox="0 0 16 16" role="img" focusable="false" aria-hidden="true" fill="currentColor">
        ${M[this.icon]}
      </svg>
    `}}customElements.get("breeze-icon")||customElements.define("breeze-icon",H);const D=`:host{--border-radius: 8px;--border-color-normal: #adaba8;--border-color-focus: hsl(252, 100%, 65%);--box-shadow-color: rgba(109, 74, 255, .2);--helper-text-color: #5c5958;--label-font-weight: 600}input{width:100%;height:auto;background:none;border-radius:var(--border-radius);min-height:0;min-width:0;color:inherit;outline:none;padding:1ch 1.5ch;-webkit-appearance:none;font:inherit;margin:0;border:0}label{font-weight:var(--label-font-weight)}[part=input-container]{margin-top:.25em;border:1px solid var(--border-color-normal);border-radius:var(--border-radius);display:flex;position:relative;transition:.15s cubic-bezier(.22,1,.36,1),visibility 0s}[part=input-container]:focus-within{border-color:var(--border-color-focus);box-shadow:0 0 0 .1875rem var(--box-shadow-color)}[part=helper-text]:not(:empty){color:var(--helper-text-color);font-size:.9em;margin-top:.25em}
`;class B extends m{get label(){return this.getAttribute("label")??""}get placeholder(){return this.getAttribute("placeholder")??""}get helperText(){return this.getAttribute("helper-text")??""}get value(){return this.getAttribute("value")??""}set value(t){this.setAttribute("value",t)}constructor(){super()}connectedCallback(){var t;this.render(),(t=this.getForm())==null||t.addEventListener("formdata",e=>{e.formData.set(this.name,this.value)})}static get observedAttributes(){return[...super.observedAttributes]}attributeChangedCallback(t,e,o){super.attributeChangedCallback(t,e,o)}get input(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("input")}handleKeyup(t){const e=t.target;e.setAttribute("value",e.value),this.setAttribute("value",e.value)}render(){this.shadowRoot.innerHTML=`
      <style>${D}</style>
      <div part="container">
        <label part="label">
          <span>${this.label}</span>
        </label>
        <div part="input-container">
          <input 
            part="input"
            type="text" 
            autocomplete="off" 
            autocapitalize="off" 
            autocorrect="off"
            spellcheck="false"
            aria-invalid="false"
            aria-describedby=""
            placeholder="${this.placeholder}"
            value="${this.value}"
            onkeyup="this.getRootNode().host.handleKeyup(event);"
          >
        </div>
        <div part="helper-text">${this.helperText}</div>
        <!-- TODO: implemented as slot or getter/setter? -->
        <div part="error-message"></div>
      </div>
    `}}customElements.get("breeze-text-field")||customElements.define("breeze-text-field",B);const O=`:host{display:inline-block}button{cursor:pointer;-webkit-appearance:none;background:transparent;font:inherit;margin:0;display:flex;flex-wrap:nowrap;align-items:center;justify-content:space-between;border:1px solid var(--_border-color-normal);transition:.15s cubic-bezier(.22,1,.36,1),visibility 0s;border-radius:var(--_border-radius-md);padding:1ch 1ch 1ch 1.5ch;width:100%;gap:.5em}button:is(:focus-visible,:focus),:host(:focus-within) button{outline:1px auto var(--_outline-color-focus);box-shadow:var(--_box-shadow)}button[part=close]{display:none}[part=dropdown]{background-color:#fff;border-radius:var(--_border-radius-md);max-height:calc(min(var(--available-height, var(--max-height)),var(--max-height)) - 2px);max-width:calc(min(var(--available-width, var(--max-width)),var(--max-width)) - 2px);min-height:min(var(--min-height,1em),100vh);min-width:min(var(--min-width,1.5em),100vw);overflow:auto;width:var(--width);box-shadow:#23233433 0 7px 29px;position:fixed;z-index:999;visibility:hidden;pointer-events:none;display:gird;top:0;right:0;bottom:0;left:0;margin:0;border:0;padding:0}[part=dropdown]::backdrop{background-color:transparent;pointer-events:none}[part=dropdown][open]{left:var(--left);top:var(--top);visibility:visible;pointer-events:initial;transition:.15s cubic-bezier(.22,1,.36,1),visibility 0s;animation:scale .15s cubic-bezier(.33,1,.68,1) both}[part=dropdown-content]{display:flex;flex-direction:column;gap:2px;padding-block:4px}[part=suffix],[part=prefix]{line-height:0}@keyframes scale{0%{opacity:0;transform:scale(.75)}to{opacity:1;transform:scale(1)}}::slotted([slot="suffix"]){flex:none;width:1em;height:1em;line-height:1;transition:.2s color;pointer-events:none}button[aria-expanded=true] ::slotted([slot="suffix"]),button[aria-expanded=true] [part=suffix]{transform:rotate(180deg)}label{font-weight:var(--label-font-weight, 600)}label:not(:empty)+button{margin-top:.25em}
`;class P extends m{constructor(){super();l(this,"onKeyDown",e=>{this.isSelfFocused&&(e.key==="ArrowDown"&&this.openDropdown(),e.key==="ArrowUp"&&this.openDropdown(),e.key==="Home"&&this.openDropdown(),e.key==="End"&&this.openDropdown())});l(this,"selectOptionWhenTyping",e=>{console.log(this);var o=e.key.toLowerCase();Array.from(this.options).forEach(i=>{i.text.toLowerCase().startsWith(o)&&i.focus()})})}get label(){return this.getAttribute("label")??""}get placeholder(){return this.getAttribute("placeholder")??""}get helperText(){return this.getAttribute("helper-text")??""}get value(){return this.selectedOption.value}get text(){return this.selectedOption.text}get selectedOption(){const e=this.querySelector("breeze-option");if(!e)throw new Error("Missing 'breeze-option' inside 'breeze-select'");const o=this.querySelector("breeze-option[selected]");return o||(console.info(`
        No 'selected' attribute found on 'breeze-option',
        default to first 'breeze-option'.
      `),e)}get options(){return this.querySelectorAll("breeze-option")}static get observedAttributes(){return[...super.observedAttributes]}attributeChangedCallback(e,o,i){super.attributeChangedCallback(e,o,i)}render(){this.shadowRoot.innerHTML=`
      <style>${c}${O}</style>
      <div part="container">
        <label>${this.label}</label>
        <button 
          type="button"
          aria-expanded="false"
          aria-live="assertive"
          aria-label=""
          aria-describedby=""
          onclick="this.getRootNode().host.openDropdown(event);"
        >
          <slot name="prefix"></slot>
          <span class="text">${this.text}</span>
          <span part="suffix">
            <slot name="suffix">
              <breeze-icon icon="chevron-down"></breeze-icon>
            </slot>
          </span>
        </button>
        <dialog role="listbox" tabindex="-1" part="dropdown">
          <button part="close">
            <span class="sr-only">Close</span>
          </button>
          <div part="dropdown-content">
            <slot></slot>
          </div>
        </dialog>
      </div>
    `}async connectedCallback(){var e,o;await customElements.whenDefined(this.selectedOption.localName),this.render(),document.addEventListener("click",this.closeDropdownWhenClickOutside.bind(this)),window.addEventListener("scroll",this.updatePosition.bind(this)),this.addEventListener("breeze-option-selected",this.handleSelect.bind(this)),this.addEventListener("keydown",this.onKeyDown),(e=this.dropdown)==null||e.addEventListener("close",this.onDropdownClose.bind(this)),(o=this.getForm())==null||o.addEventListener("formdata",i=>{i.formData.set(this.name,this.value)})}onDropdownClose(e){var o,i;console.log(this.dropdown.returnValue),(o=this.trigger)==null||o.setAttribute("aria-expanded","false"),(i=this.dropdown)==null||i.removeEventListener("keydown",this.selectOptionWhenTyping)}handleSelect(e){const{value:o}=e.detail;if(this.value===o){this.dropdown.close();return}this.selectedOption.removeAttribute("selected"),e.target.setAttribute("selected",""),this.shadowRoot.querySelector(".text").textContent=e.target.text,this.dropdown.close(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,cancelable:!0,detail:{value:o}}))}handleUpAndDownArrows(e){var n,d;if(!["ArrowDown","ArrowUp"].includes(e.key))return;const o=Array.from(this.options);let i=o.indexOf(document.activeElement),s=i+1===o.length?0:i+1,a=i===0?o.length-1:i-1;e.key==="ArrowDown"?(n=o[s])==null||n.focus():e.key==="ArrowUp"&&((d=o[a])==null||d.focus())}updatePosition(){const{left:e,top:o,width:i,height:s}=this.getBoundingClientRect(),a=window.innerHeight-s-o;this.style.setProperty("--left",`${e}px`);let n;a+10>this.dropdown.clientHeight?(this.dropdown.style.setProperty("transform-origin","top center"),n=o+s+6):(this.dropdown.style.setProperty("transform-origin","bottom center"),n=o-this.dropdown.clientHeight-6),this.style.setProperty("--top",`${n}px`),this.style.setProperty("--width",`${i}px`)}openDropdown(e){var o,i,s;this.updatePosition(),(o=this.selectedOption)==null||o.focus(),this.dropdown.showModal(),this.dropdown.addEventListener("keydown",this.handleUpAndDownArrows.bind(this)),(i=this.dropdown)==null||i.addEventListener("animationend",()=>{this.trigger.setAttribute("aria-expanded","true")}),(s=this.dropdown)==null||s.addEventListener("keydown",this.selectOptionWhenTyping)}get dropdown(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector('[part="dropdown"]')}get trigger(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector('button[type="button"]')}get isSelfFocused(){return document.activeElement===this}closeDropdownWhenClickOutside(e){var o;!e.composedPath().includes(this.dropdown)&&((o=this.trigger)==null?void 0:o.getAttribute("aria-expanded"))==="true"&&this.dropdown.close("Click outside")}}customElements.get("breeze-select")||customElements.define("breeze-select",P);const q=`*{box-sizing:border-box}:host{--_background-color: #fff;--_text-color: inherit}:host([selected]){--_background-color: var(--_primary-color);--_text-color: #fff}li{list-style:none}button{cursor:pointer;display:block;border:0;outline:1px solid transparent;background-color:var(--_background-color);color:var(--_text-color);font:inherit;padding:.5rem 1rem;width:100%;position:relative;text-align:left}:host([selected]) button:focus-visible{background-color:unset}button:after{border:1px solid transparent;border-radius:var(--_border-radius-sm);content:"";pointer-events:none;position:absolute;transition:.15s cubic-bezier(.5,1,.89,1);z-index:1;bottom:.1875rem;left:.1875rem;right:.1875rem;top:.1875rem}button:focus-visible:after{border-color:var(--_outline-color-focus);box-shadow:var(--_box-shadow)}:host(:not([selected])) button:hover{background-color:var(--_hover-color)}:host([selected]) button:focus-visible:after{background-color:var(--_primary-color);z-index:-1}
`;class F extends HTMLElement{get value(){return this.getAttribute("value")??""}get text(){return this.getAttribute("text")??""}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
      <style>${c}${q}</style>
      <li>
        <button type="button" title="${this.text}" onclick="this.getRootNode().host.handleClick()">
          ${this.text}
        </button>
      </li>
    `}focus(){this.shadowRoot.querySelector("button").focus()}handleClick(){this.dispatchEvent(new CustomEvent("breeze-option-selected",{bubbles:!0,composed:!0,cancelable:!0,detail:{value:this.value}}))}}customElements.get("breeze-option")||customElements.define("breeze-option",F);const N=`:host{--_outline-color-focus: var(--breeze-outline-color-focus, hsl(252, 100%, 65%));--_box-shadow-color-focus: var(--breeze-box-shadow-color-focus, rgba(109, 74, 255, .2));--_primary-color: var(--breeze-primary-color, #6d4aff);--_box-shadow-shadow: var(--breeze-box-shadow-shadow, 0 0 0 .1875rem);--_box-shadow: var(--_box-shadow-shadow) var(--_box-shadow-color-focus);--_border-radius-base: var(--breeze-border-radius-base, 8px);--_border-radius-sm: calc(var(--_border-radius-base) * .5);--_border-radius-md: calc(var(--_border-radius-base) * 1);--_border-radius-lg: calc(var(--_border-radius-base) * 1.5);--_border-radius-xl: calc(var(--_border-radius-base) * 2);--_border-radius-full: 9999em;--_border-color-normal: var(--breeze-border-color-normal, #adaba8);--_background-color-normal: var(--breeze-background-color-normal, #adaba8);--_backdrop-normal: rgba(38, 42, 51, .48);--_hover-color: rgba(194, 193, 192, .2);--_button-border-color: var(--breeze-button-border-color, #dedbd9)}*{box-sizing:border-box}.sr-only{clip:rect(0 0 0 0);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;top:0;width:1px}
`,V=`label{cursor:pointer;display:inline-flex;align-items:center;gap:.5em}:host([disabled]) label{opacity:.5;cursor:not-allowed}:host([layout="reverse"]) [part=control]{order:2}[part=control]{position:relative;display:inline-flex;align-items:center;justify-content:space-between;border:1px solid var(--_border-color-normal);border-radius:1.5em;width:3em}[part=control]:before{bottom:1px;content:"";left:1px;position:absolute;top:1px;background-color:var(--_background-color-normal);border-radius:1.7142857143em;transform:translate(0);transition:transform .25s cubic-bezier(.34,1.56,.64,1),background-color .25s cubic-bezier(.33,1,.68,1);width:calc(1.5em - 2px);height:calc(1.5em - 2px)}:host([checked]) [part=control]:before{transform:translate(calc(1.5em - 2px));background-color:var(--_primary-color)}[part=thumb]{width:1.5em;height:1.5em;border-radius:100%;display:inline-flex;align-items:center;justify-content:center;opacity:0;transition:none}:host([checked]) [part=thumb]:last-of-type{opacity:1;z-index:1;transition:opacity .25s ease;color:#fff}
`;class W extends HTMLElement{get checked(){return this.hasAttribute("checked")}set checked(t){this.toggleAttribute("checked",!!t),this.shadowRoot.querySelector("input").checked=!!t}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",!!t),this.shadowRoot.querySelector("input").toggleAttribute("disabled",!!t)}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}static get observedAttributes(){return["checked","disabled"]}attributeChangedCallback(t,e,o){e!==null&&(t==="checked"?this.checked=this.hasAttribute("checked"):t==="disabled"&&(this.disabled=this.hasAttribute("disabled")))}render(){this.shadowRoot.innerHTML=`
      <style>${N}${V}</style>
      <label part="base">
        <input 
          class="sr-only"
          type="checkbox" 
          role="switch" 
          aria-checked="${this.checked?"true":"false"}" 
          ${this.checked?"checked":""}
          ${this.disabled?"disabled":""}
          aria-busy="false"
          onchange="this.getRootNode().host.onInputChange(event)"
        >
        <span part="control">
          <span part="thumb" aria-hidden="true">
            <breeze-icon icon="cross"></breeze-icon>
          </span>
          <span part="thumb" aria-hidden="true">
            <breeze-icon icon="check"></breeze-icon>
          </span>
        </span>
        <slot part="label"></slot>
      </label>
    `}onInputChange(t){this.checked=t.target.checked}}customElements.get("breeze-switch")||customElements.define("breeze-switch",W);const K=`textarea{width:100%;border-radius:var(--_border-radius-md);border:1px solid var(--_border-color-normal);padding:1em;margin-top:.25rem;resize:vertical;font-family:inherit;font-size:inherit;font-weight:inherit}textarea:focus-visible{outline-color:var(--_primary-color);box-shadow:var(--_box-shadow)}textarea[disabled]{cursor:not-allowed;opacity:.5}[part=helper-text]{color:#5c5958;font-size:80%}
`;class j extends HTMLElement{get helperText(){return this.getAttribute("helper-text")??""}get placeholder(){return this.getAttribute("placeholder")??""}get label(){return this.getAttribute("label")??""}get rows(){return Number(this.getAttribute("rows"))}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",!!t),this.shadowRoot.querySelector("input").toggleAttribute("disabled",!!t)}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}static get observedAttributes(){return["checked","disabled"]}attributeChangedCallback(t,e,o){e!==null&&(t==="checked"?this.checked=this.hasAttribute("checked"):t==="disabled"&&(this.disabled=this.hasAttribute("disabled")))}render(){this.shadowRoot.innerHTML=`
      <style>${c}${K}</style>
      <div class="container">
        <label for="" aria-hidden="false">
          <slot name="label">${this.label}</slot>
        </label>
        <textarea 
          part="textarea" 
          spellcheck="true"
          aria-describedby=""
          placeholder="${this.placeholder}"
          rows="${this.rows||4}"
          name="${this.name??""}"
          ${this.hasAttribute("disabled")?"disabled":""}
        ></textarea>
        <div
          part="helper-text" 
          id="TODO"
          aria-hidden="${this.helperText||this.querySelector('[slot="helper-text"]')?"false":"true"}"
        >
          <slot name="helper-text">${this.helperText}</slot>
        </div>
      </div>
    `}}customElements.get("breeze-textarea")||customElements.define("breeze-textarea",j);const I=`:host{--track-width: 2px;--track-color: #adaba8;--indicator-color: #6d4aff;--speed: 1s;--size: 1em;display:inline-block}[part=spinner]{height:var(--size);width:var(--size);border-width:var(--track-width);border-style:solid;border-color:var(--indicator-color) var(--track-color) var(--track-color) var(--track-color);border-radius:50%;animation:spin var(--speed) linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`;class U extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
      <style>${I}</style>
      <div part="spinner" role="progressbar" aria-label="Loading"></div>
    `}}customElements.get("breeze-spinner")||customElements.define("breeze-spinner",U);const Z=`*{box-sizing:border-box}:host{position:fixed;bottom:2rem;left:50%;transform:translate(-50%)}[part=container]{display:inline-flex;align-items:center;gap:.5em;border-radius:1ch;background-color:#000;color:#fff;padding:.5ch;transform:translateY(50%);opacity:0;pointer-events:none;transition:transform .2s ease-in,opacity .2s}:host([open]) [part=container]{pointer-events:initial;opacity:1;transform:translateY(0)}
`,Y=`<div part="container" role="alert" aria-hidden="true">
  <div part="icon">
    <slot name="icon"></slot>
  </div>
  <div part="message" aria-live="polite">
    <slot></slot>
  </div>
  <div part="close">
    <breeze-button theme="icon" no-border onclick="this.getRootNode().host.hide();">
      <breeze-icon icon="cross" size="medium"></breeze-icon>
    </breeze-button>
  </div>
</div>
`;class G extends g{constructor(){super(),this.alertsShown=[]}connectedCallback(){super.render(Y,Z)}show(){this.setAttribute("open",""),this.container.removeAttribute("hidden"),this.container.setAttribute("aria-hidden","false"),this.alertsShown.push(this);const t=setTimeout(()=>{this.hide(),this.alertsShown.pop(),clearTimeout(t)},5e3)}hide(){this.removeAttribute("open"),this.container.setAttribute("hidden",""),this.container.setAttribute("aria-hidden","true")}}customElements.define("breeze-alert",G);
