/**
 * At the moment, this script will be rendered on frontend,
 * so it's not Node environment.
 * Uncaught TypeError: Failed to resolve module specifier "breeze-components". 
 * Relative references must start with either "/", "./", or "../".
 */
import { 
  BreezeTextField, 
  BreezeButton,
  BreezeSwitch,
  BreezeOption,
  BreezeSelect,
  BreezeIcon,
} from "breeze-components";

document.addEventListener( 'DOMContentLoaded', () => {
  const BreezeMenuAdminForm = document.querySelector('[name="breeze-menu-admin-form"]');
  const BreezeMenuAdminFormFooter = BreezeMenuAdminForm.querySelector('footer');
  const submitButton = BreezeMenuAdminForm?.querySelector('breeze-button[type="submit"]');

  class BreezeMenuAdmin {
    addMenuItem() {
      const itemsCount = BreezeMenuAdminForm?.querySelectorAll('.breeze-menu-item').length;
      const div = document.createElement('div');
      div.className = 'breeze-menu-item';
      div.innerHTML = `
        <breeze-select 
          label="Menu icon" 
          style="width: 10em;" 
          name="icon-${itemsCount+1}"
          onchange="BreezeMenuAdmin.enableSubmit();"
          >
          <breeze-option selected value="phone" text="Phone"></breeze-option>
          <breeze-option value="telephone" text="Telephone"></breeze-option>
          <breeze-option value="email" text="Email"></breeze-option>
          <breeze-option value="whatsapp" text="Whatsapp"></breeze-option>
        </breeze-select>
        <breeze-text-field label="Menu Text" name="text-${itemsCount+1}"></breeze-text-field>
        <breeze-button theme="icon">
          <breeze-icon icon="cross" style="--size: 2.3em;"></breeze-icon>
        </breeze-button>
      `;
      BreezeMenuAdminForm.insertBefore(div, BreezeMenuAdminFormFooter);
    }

    enableSubmit() {
      submitButton.removeAttribute('disabled');
    }
  }
  
  window.BreezeMenuAdmin = new BreezeMenuAdmin();
  
  // @ts-ignore
  document.querySelector( 'form[name=breeze-menu-admin-form]' ).addEventListener( 'submit', function( event ) {
    event.preventDefault();
    submitButton.setAttribute('loading', '');
    const formData = new FormData( this );
    fetch( '/wp-json/breeze-menu/v1/menu-items', {
      method: 'POST',
      body: formData,
    } )
      .then( ( response ) => {
        if ( response.ok ) {
          submitButton?.setAttribute('disabled', '');
          return response.text();
        }
        return Promise.reject( new Error( 'Form submission failed' ) );
      } )
      .catch( ( error ) => {
        console.error( error );
      } )
      .finally( () => {
        submitButton.removeAttribute('loading');
      } );
  } );

  BreezeMenuAdminForm?.addEventListener('click', (e) => {
    if (e.target.closest('.breeze-menu-item breeze-button')) {
      e.target.closest('.breeze-menu-item').remove();
      window.BreezeMenuAdmin.enableSubmit();
    }
  });
} );
