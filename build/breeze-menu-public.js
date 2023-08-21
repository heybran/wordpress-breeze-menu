import"./assets/alert-cfa4a60b.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("div");e.className="breeze-menu-wrapper hidden",document.body.appendChild(e),fetch("/wp-json/breeze-menu/v1/menu-items").then(n=>n.json()).then(n=>{n.forEach(c=>{const t=document.createElement("div");t.className="breeze-menu",t.innerHTML=`
					<span class="breeze-menu__icon"
						onclick="this.closest('.breeze-menu-wrapper').classList.add('show-texts')"
					>
						<breeze-icon icon="${c.menu_icon}" style="--size: 1.5em;"></breeze-icon>
					</span>
          <span class="breeze-menu__text">${c.menu_text}</span>
        `,e.appendChild(t)});const s=document.createElement("div");s.className="breeze-menu",s.innerHTML=`
				<span class="breeze-menu__icon breeze-menu__close" onclick="this.closest('.breeze-menu-wrapper').classList.remove('show-texts')">
					<breeze-icon icon="cross" style="--size: 1.5em;"></breeze-icon>
				</span>
			`,e.appendChild(s),customElements.whenDefined("breeze-icon").then(()=>{e.classList.remove("hidden")})}),document.addEventListener("click",n=>{n.composedPath().includes(e)||e.classList.remove("show-texts")})});
