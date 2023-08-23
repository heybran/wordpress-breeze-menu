import"./assets/alert-5bda043d.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector('[name="breeze-menu-admin-form"]'),i=e.querySelector("footer"),n=e==null?void 0:e.querySelector('breeze-button[type="submit"]');class b{addMenuItem(){const r=e==null?void 0:e.querySelectorAll(".breeze-menu-item").length,t=document.createElement("div");t.className="breeze-menu-item",t.innerHTML=`
        <breeze-select 
          label="Menu icon" 
          style="width: 10em;" 
          name="icon-${r+1}"
          onchange="BreezeMenuAdmin.enableSubmit();"
          >
          <breeze-option selected value="phone" text="Phone"></breeze-option>
          <breeze-option value="telephone" text="Telephone"></breeze-option>
          <breeze-option value="email" text="Email"></breeze-option>
          <breeze-option value="whatsapp" text="Whatsapp"></breeze-option>
        </breeze-select>
        <breeze-text-field label="Menu Text" name="text-${r+1}"></breeze-text-field>
        <breeze-button theme="icon">
          <breeze-icon icon="cross" style="--size: 2.3em;"></breeze-icon>
        </breeze-button>
      `,e.insertBefore(t,i)}enableSubmit(){n.removeAttribute("disabled")}}window.BreezeMenuAdmin=new b,document.querySelector("form[name=breeze-menu-admin-form]").addEventListener("submit",function(o){o.preventDefault(),n.setAttribute("loading","");const r=new FormData(this);fetch("/wp-json/breeze-menu/v1/menu-items",{method:"POST",body:r}).then(t=>t.ok?(n==null||n.setAttribute("disabled",""),t.text()):Promise.reject(new Error("Form submission failed"))).catch(t=>{console.error(t)}).finally(()=>{n.removeAttribute("loading")})}),e==null||e.addEventListener("click",o=>{o.target.closest(".breeze-menu-item breeze-button")&&(o.target.closest(".breeze-menu-item").remove(),window.BreezeMenuAdmin.enableSubmit())})});
