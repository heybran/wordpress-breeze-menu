import 'cucumber-components/dist/components/icon/icon.js';

/* eslint-env browser */
document.addEventListener( 'DOMContentLoaded', () => {
	fetch( '/wp-json/breeze-menu/v1/menu-items' )
		.then( ( res ) => res.json() )
		.then( ( settings ) => {
			if ( settings.breeze_menu_show === 'off' ) {
				return;
			}
			const breezeMenuWrapper = document.createElement( 'div' );
			breezeMenuWrapper.className = 'breeze-menu-wrapper hidden';
			breezeMenuWrapper.setAttribute( 'data-position', settings.breeze_menu_position );
			breezeMenuWrapper.style.setProperty( '--background-color', settings.breeze_menu_background_color );
			breezeMenuWrapper.style.setProperty( '--text-color', settings.breeze_menu_text_color );
			document.body.appendChild( breezeMenuWrapper );
			settings.breeze_menu_items.forEach( ( menu ) => {
				const div = document.createElement( 'div' );
				div.className = 'breeze-menu';
				div.innerHTML = `
					<span class="breeze-menu__icon"
						onclick="this.closest('.breeze-menu-wrapper').classList.add('show-texts')"
					>
						<cc-icon icon="${ menu.menu_icon }" style="--size: 1.5em;"></cc-icon>
					</span>
          <span class="breeze-menu__text">${ menu.menu_text }</span>
        `;
				breezeMenuWrapper.appendChild( div );
			} );

			const div = document.createElement( 'div' );
			div.className = 'breeze-menu';
			div.innerHTML = `
				<span class="breeze-menu__icon breeze-menu__close" onclick="this.closest('.breeze-menu-wrapper').classList.remove('show-texts')">
					<cc-icon icon="cross" style="--size: 1.5em;"></cc-icon>
				</span>
			`;
			breezeMenuWrapper.appendChild( div );

			customElements.whenDefined( 'cc-icon' ).then( () => {
				breezeMenuWrapper.classList.remove( 'hidden' );
				document.addEventListener( 'click', ( event ) => {
					if ( ! event.target.closest(' .breeze-menu-wrapper ' ) ) {
						breezeMenuWrapper.classList.remove( 'show-texts' );
					}
				} );
			} );
		} );
} );
