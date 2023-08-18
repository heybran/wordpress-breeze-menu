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

const BreezeMenuAdminForm = document.querySelector('[name="breeze-menu-admin-form"]');
const BreezeMenuAdminFormFooter = BreezeMenuAdminForm.querySelector('footer');

class BreezeMenuAdmin {
  addMenuItem() {
    const div = document.createElement('div');
    div.className = 'breeze-menu-item';
    div.innerHTML = `
      <breeze-select label="Menu icon" style="width: 10em;">
        <breeze-option selected value="phone" text="Phone"></breeze-option>
        <breeze-option value="telephone" text="Telephone"></breeze-option>
        <breeze-option value="email" text="Email"></breeze-option>
        <breeze-option value="whatsapp" text="Whatsapp"></breeze-option>
      </breeze-select>
      <breeze-text-field label="Menu Text"></breeze-text-field>
      <breeze-button theme="icon">
        <breeze-icon icon="cross" style="--size: 2.3em;"></breeze-icon>
      </breeze-button>
    `;
    BreezeMenuAdminForm.insertBefore(div, BreezeMenuAdminFormFooter);
  }
}

window.BreezeMenuAdmin = new BreezeMenuAdmin();