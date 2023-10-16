/**
 * At the moment, this script will be rendered on frontend,
 * so it's not Node environment.
 * Uncaught TypeError: Failed to resolve module specifier "breeze-components". 
 * Relative references must start with either "/", "./", or "../".
 */

import 'cucumber-components/dist/components/text-field/text-field.js';
import 'cucumber-components/dist/components/checkbox/checkbox.js';
import 'cucumber-components/dist/components/option/option.js';
import 'cucumber-components/dist/components/select/select.js';
import 'cucumber-components/dist/components/icon/icon.js';
import 'cucumber-components/dist/components/button/button.js';
import 'cucumber-components/dist/components/radio/radio.js';
import 'cucumber-components/dist/components/radio-group/radio-group.js';

document.addEventListener( 'DOMContentLoaded', () => {
  const BreezeMenuAdminForm = document.querySelector('[name="breeze-menu-admin-form"]');
  const BreezeMenuAdminItemWrapper = BreezeMenuAdminForm.querySelector('.breeze-menu-item-wrapper');
  const submitButton = BreezeMenuAdminForm?.querySelector('cc-button[type="submit"]');

  class BreezeMenuAdmin {
    addMenuItem() {
      const itemsCount = BreezeMenuAdminForm?.querySelectorAll('.breeze-menu-item').length;
      const div = document.createElement('div');
      div.className = 'breeze-menu-item';
      div.innerHTML = `
        <cc-select 
          label="Menu icon" 
          style="width: 10em;" 
          name="icon-${itemsCount+1}"
          onchange="BreezeMenuAdmin.enableSubmit();"
          >
          <cc-option selected value="phone" text="Phone"></cc-option>
          <cc-option value="telephone" text="Telephone"></cc-option>
          <cc-option value="email" text="Email"></cc-option>
        </cc-select>
        <cc-text-field 
          label="Menu Text" 
          name="text-${itemsCount+1}"
          oninput="BreezeMenuAdmin.enableSubmit()"
        ></cc-text-field>
        <cc-button theme="icon" onclick="this.closest('.breeze-menu-item').remove();BreezeMenuAdmin.enableSubmit();">
          <cc-icon icon="cross" style="--size: 2.3em;"></cc-icon>
        </cc-button>
      `;
      BreezeMenuAdminItemWrapper.appendChild(div);
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
    const formDataObject = Array.from(formData.entries()).reduce((basket, [key, value]) => {
      basket[key] = value;
      return basket;
    }, {});
    const menuItems = Object.entries(formDataObject).filter(item => item[0].startsWith('text') || item[0].startsWith('icon'));
    const menuItemsFormatted = menuItems.reduce((basket, [key, value]) => {
      const index = Number(key.split('-')[1]) - 1;
      const obj = basket[index] || {};
      if (key.startsWith('icon')) {
        obj.icon = value;
      } else if (key.startsWith('text')) {
        obj.text = value;
      }
      basket[index] = obj;
      return basket
    }, []);
    const otherData = Object.entries(formDataObject).filter(item => !item[0].startsWith('text') && !item[0].startsWith('icon'));
    const finalData = {
      menus: menuItemsFormatted, 
      ...Object.fromEntries(otherData)
    };
    
    fetch( '/wp-json/breeze-menu/v1/menu-items', {
      method: 'POST',
      headers: {
        'X-WP-Nonce': breezeMenuApiSettings.nonce,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalData),
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
