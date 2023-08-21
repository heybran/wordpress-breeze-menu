import"./assets/alert-cfa4a60b.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector('[name="breeze-menu-admin-form"]'),r=t.querySelector("footer");class i{addMenuItem(){const n=t==null?void 0:t.querySelectorAll(".breeze-menu-item").length,e=document.createElement("div");e.className="breeze-menu-item",e.innerHTML=`
        <breeze-select label="Menu icon" style="width: 10em;" name="icon-${n+1}">
          <breeze-option selected value="phone" text="Phone"></breeze-option>
          <breeze-option value="telephone" text="Telephone"></breeze-option>
          <breeze-option value="email" text="Email"></breeze-option>
          <breeze-option value="whatsapp" text="Whatsapp"></breeze-option>
        </breeze-select>
        <breeze-text-field label="Menu Text" name="text-${n+1}"></breeze-text-field>
        <breeze-button theme="icon">
          <breeze-icon icon="cross" style="--size: 2.3em;"></breeze-icon>
        </breeze-button>
      `,t.insertBefore(e,r)}}window.BreezeMenuAdmin=new i,document.querySelector("form[name=breeze-menu-admin-form]").addEventListener("submit",function(o){o.preventDefault();const n=new FormData(this);fetch("/wp-json/breeze-menu/v1/menu-items",{method:"POST",body:n}).then(e=>e.ok?e.text():Promise.reject(new Error("Form submission failed"))).catch(e=>{console.error(e)})})});
