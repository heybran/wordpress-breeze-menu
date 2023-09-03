import"./assets/icon-08e44739.js";document.addEventListener("DOMContentLoaded",()=>{fetch("/wp-json/breeze-menu/v1/menu-items").then(n=>n.json()).then(n=>{if(n.breeze_menu_show==="off")return;const e=document.createElement("div");e.className="breeze-menu-wrapper hidden",e.setAttribute("data-position",n.breeze_menu_position),e.style.setProperty("--background-color",n.breeze_menu_background_color),e.style.setProperty("--text-color",n.breeze_menu_text_color),document.body.appendChild(e),n.breeze_menu_items.forEach(t=>{const r=document.createElement("div");r.className="breeze-menu",r.innerHTML=`
					<span class="breeze-menu__icon"
						onclick="this.closest('.breeze-menu-wrapper').classList.add('show-texts')"
					>
						<breeze-icon icon="${t.menu_icon}" style="--size: 1.5em;"></breeze-icon>
					</span>
          <span class="breeze-menu__text">${t.menu_text}</span>
        `,e.appendChild(r)});const s=document.createElement("div");s.className="breeze-menu",s.innerHTML=`
				<span class="breeze-menu__icon breeze-menu__close" onclick="this.closest('.breeze-menu-wrapper').classList.remove('show-texts')">
					<breeze-icon icon="cross" style="--size: 1.5em;"></breeze-icon>
				</span>
			`,e.appendChild(s),customElements.whenDefined("breeze-icon").then(()=>{e.classList.remove("hidden"),document.addEventListener("click",t=>{t.target.closest(" .breeze-menu-wrapper ")||e.classList.remove("show-texts")})})})});
