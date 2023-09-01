<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/admin
 * @author     Brandon Zhang <gwonzhang@gmail.com>
 */
class Breeze_Menu_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $Breeze_Menu    The ID of this plugin.
	 */
	private $Breeze_Menu;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $Breeze_Menu       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($Breeze_Menu, $version) {
		$this->Breeze_Menu = $Breeze_Menu;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Breeze_Menu_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Breeze_Menu_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_style($this->Breeze_Menu, plugin_dir_url(__FILE__) . 'css/breeze-menu-admin.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		$current_screen = get_current_screen();
		if (strpos($current_screen->base, 'breeze-menu') === false) {
			return;
		}
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Breeze_Menu_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Breeze_Menu_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_script($this->Breeze_Menu, plugin_dir_url(__FILE__) . '../build/breeze-menu-admin.js', array(), $this->version, false, 'module');
		// https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#cookie-authentication
		wp_localize_script($this->Breeze_Menu, 'breezeMenuApiSettings', array(
			'root' => esc_url_raw(rest_url()),
			'nonce' => wp_create_nonce('wp_rest')
		));
	}

	/**
	 * Register <script type="module"> for the admin JavaScript.
	 *
	 * @since    1.0.0
	 */
	public function add_type_module($tag, $handle, $src) {
		if ($handle === 'breeze-menu') {
				$tag = str_replace('<script', '<script type="module"', $tag);
		}
		return $tag;
	}

	/**
	 * Register the Breeze Menu for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function load_menu() {
		$page_title = esc_html__('Breeze Menu', 'breeze-menu');
		$menu_title = esc_html__('Breeze Menu', 'breeze-menu');
		$capability = 'manage_options';
		$slug = 'breeze-menu';
		$callback = array($this, 'create_settings_page_content');
		$icon = BREEZE_MENU_PLUGIN_URL . 'images/breeze_menu_icon.png';
		$position = 100;

		add_menu_page($page_title, $menu_title, $capability, $slug, $callback, $icon, $position);
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function create_settings_page_content() {
		?>
		<div class="wrap">
			<div class="breeze-menu-header">
				<h3><?php echo esc_html__('Breeze Menu Settings', 'breeze-menu') ?></h3>
				<form action="POST" action="options.php" name="breeze-menu-admin-form" id="breeze-menu-admin-form">
					<?php 
						global $wpdb;
						/**
						 * if setting the wrong table prefix,
						 * $table_name = $wpdb->prefix . "breeze-menu-items";
						 * and without adding these at top of wp-config.php
						 * define('WP_DEBUG', true);
						 * define('WP_DEBUG_LOG', true);
						 * define('WP_DEBUG_DISPLAY', false);
						 * no error displaying on frontend, so it's hard to debug
						 */
						$table_name = $wpdb->prefix . "breeze_menu_items";
						$results = $wpdb->get_results("SELECT * FROM $table_name");
						if ($results) {
							$index = 0;
							foreach($results as $row) {
								$icon = $row->menu_icon;
								$text = $row->menu_text;
								// echo "Icon: $icon, Text: $text\n";
							}
						} else {
							// echo "No data found in this table.\n";
						}
						?>
					<footer style="margin-top: 1em">
						<breeze-button type="submit" disabled><?php echo esc_html__('Save', 'save') ?></breeze-button>
						<breeze-button
							onclick="BreezeMenuAdmin.addMenuItem()"
							><?php echo esc_html__('Add menu item', 'add-menu-item') ?></breeze-button>
					</footer>
					<script>
						fetch('/wp-json/breeze-menu/v1/menu-items')
						.then((res) => {
							if (res.ok) {
								return res.json();
							} else {
								throw new Error(`There's an error getting menu items.`);
							}
						})
						.then((settings) => {
							const BreezeMenuAdminForm = document.querySelector('[name="breeze-menu-admin-form"]');
							const BreezeMenuAdminFormFooter = BreezeMenuAdminForm.querySelector('footer');

							settings.breeze_menu_items.forEach((menu, index) => {
								const div = document.createElement('div');
								div.className = 'breeze-menu-item';
								div.innerHTML = `
									<breeze-select 
										label="Menu icon" 
										style="width: 10em;" 
										name="icon-${index+1}"
										onchange="BreezeMenuAdmin.enableSubmit();"
									>
										<breeze-option ${menu.menu_icon === 'phone' ? 'selected' : ''} value="phone" text="Phone"></breeze-option>
										<breeze-option ${menu.menu_icon === 'telephone' ? 'selected' : ''} value="telephone" text="Telephone"></breeze-option>
										<breeze-option ${menu.menu_icon === 'email' ? 'selected' : ''} value="email" text="Email"></breeze-option>
										<breeze-option ${menu.menu_icon === 'whatsapp' ? 'selected' : ''} value="whatsapp" text="Whatsapp"></breeze-option>
									</breeze-select>
									<breeze-text-field 
										label="Menu Text" 
										name="text-${index+1}" 
										value="${menu.menu_text}"
										oninput="BreezeMenuAdmin.enableSubmit()"
										></breeze-text-field>
									<breeze-button theme="icon">
										<breeze-icon icon="cross" style="--size: 2.3em;"></breeze-icon>
									</breeze-button>
								`;
								BreezeMenuAdminForm.insertBefore(div, BreezeMenuAdminFormFooter);
							});

							const checkbox = document.createElement('cc-checkbox');
							checkbox.setAttribute('name', 'breeze-menu-show');
							checkbox.setAttribute('onchange', 'BreezeMenuAdmin.enableSubmit();');
							if (settings.breeze_menu_show === 'on') {
								checkbox.setAttribute('checked', '');
							}
							checkbox.textContent = 'Show Floating Menu';
							checkbox.style.marginTop = '1em';
							// fixes for not setting this up in original components.
							checkbox.style.display = 'inline-block';
							BreezeMenuAdminForm.insertBefore(checkbox, BreezeMenuAdminFormFooter);
						})
					</script>
				</form>
			</div>
		</div>
		<?php
	}
}
