import { BreezeIcon } from 'breeze-components';

/* eslint-env browser */
document.addEventListener( 'DOMContentLoaded', () => {
	const breezeMenuWrapper = document.createElement( 'div' );
	breezeMenuWrapper.className = 'breeze-menu-wrapper hidden';
	document.body.appendChild( breezeMenuWrapper );

	fetch( '/wp-json/breeze-menu/v1/menu-items' )
		.then( ( res ) => res.json() )
		.then( ( menus ) => {
			menus.forEach( ( menu ) => {
				const div = document.createElement( 'div' );
				div.className = 'breeze-menu';
				div.innerHTML = `
					<span class="breeze-menu__icon"
						onclick="this.closest('.breeze-menu-wrapper').classList.add('show-texts')"
					>
						<breeze-icon icon="${ menu.menu_icon }" style="--size: 1.5em;"></breeze-icon>
					</span>
          <span class="breeze-menu__text">${ menu.menu_text }</span>
        `;
				breezeMenuWrapper.appendChild( div );
			} );

			const div = document.createElement( 'div' );
			div.className = 'breeze-menu';
			div.innerHTML = `
				<span class="breeze-menu__icon breeze-menu__close" onclick="this.closest('.breeze-menu-wrapper').classList.remove('show-texts')">
					<breeze-icon icon="cross" style="--size: 1.5em;"></breeze-icon>
				</span>
			`;
			breezeMenuWrapper.appendChild( div );

			customElements.whenDefined( 'breeze-icon' ).then( () => {
				breezeMenuWrapper.classList.remove( 'hidden' );
			} );
		} );

	document.addEventListener( 'click', ( event ) => {
		if ( ! event.composedPath().includes( breezeMenuWrapper ) ) {
			breezeMenuWrapper.classList.remove( 'show-texts' );
		}
	} );
} );
