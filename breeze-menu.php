<?php

/**
 * Plugin Name:       Breeze Menu
 * Plugin URI:        https://github.com/heybran/wordpress-breeze-menu
 * Description:       Add a sleek and modern floating menu to your site, allowing you to display social media icons, important links, or any other type of content.
 * Requires at least: 5.2
 * Requires PHP:      5.6
 * Author:            Brandon Zhang
 * Author URI:        https://github.com/heybran
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Version:           1.0.0
 * Text Domain:       breeze-menu
 * Domain Path:       /languages
 */

/**
 * This code snippet is a security measure commonly used in WordPress plugins
 * to prevent direct access to plugin files. 
 * The `ABSPATH` constant in WordPress represents the absolute path to 
 * the WordPress installation directory. 
 * By checking if `ABSPATH` is defined, the code ensures that 
 * the plugin file is being accessed through the WordPress environment and not directly.
 */
if ( ! defined('ABSPATH') ) {
	exit;
}

// If this file is called directly, abort.
if ( ! defined('WPINC') ) {
	die;
}

/**
 * Setup plugin constants
 *
 * @access private
 * @since  1.0
 * @return void
 */
function setup_constants() {
	// Plugin Folder Path
	if ( ! defined('BREEZE_MENU_PLUGIN_DIR') ) {
		define( 'BREEZE_MENU_PLUGIN_DIR', plugin_dir_path(__FILE__) );
	}

	// Plugin Folder URL
	if ( ! defined( 'BREEZE_MENU_PLUGIN_URL' ) ) {
		define('BREEZE_MENU_PLUGIN_URL', plugin_dir_url(__FILE__));
	}

	// Plugin Root File
	if ( ! defined('BREEZE_MENU_PLUGIN_FILE') ) {
		define('BREEZE_MENU_PLUGIN_FILE', __FILE__);
	}
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('BREEZE_MENU_VERSION', '1.0.0');

function create_breeze_menu_items_table() {
	/**
	 * This will print a debug error on frontend:
	 * Plugin could not be activated because it triggered a fatal error. - hook triggered
	 */
	// die('hook triggered');
	global $wpdb;
	$table_name = $wpdb->prefix . 'breeze_menu_items';

	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
			id INT NOT NULL AUTO_INCREMENT,
			menu_icon VARCHAR(255) NOT NULL,
			menu_text VARCHAR(255) NOT NULL,
			PRIMARY KEY (id)
	) $charset_collate;";
	
	/**
	 * The line `require_once(ABSPATH . 'wp-admin/includes/upgrade.php');` 
	 * is used to include the `upgrade.php` file from the WordPress core. 
	 * This file contains the `dbDelta()` function, which is used to 
	 * create or upgrade database tables in a safe and efficient manner.
	 * The `ABSPATH` constant represents the absolute path to the 
	 * WordPress installation directory. 
	 * By appending `'wp-admin/includes/upgrade.php'` to `ABSPATH`, 
	 * we get the full path to the `upgrade.php` file.
	 * Including `upgrade.php` is necessary because it provides the `dbDelta()` function, 
	 * which is used to execute SQL queries and handle the creation 
	 * or modification of database tables. 
	 * The `dbDelta()` function takes care of checking the current table structure, 
	 * comparing it with the desired structure, and making the necessary changes.
	 * By including `upgrade.php` and calling `dbDelta()`, 
	 * you ensure that the custom table is created or upgraded properly 
	 * when your plugin is activated.
	 */
	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	$result = dbDelta($sql);
	// if ($result === false) {
	// 	/**
	// 	 * Below will cause this error
	// 	 * The plugin generated 27 characters of unexpected output during activation. 
	// 	 * If you notice "headers already sent" messages, problems with syndication feeds or other issues, 
	// 	 * try deactivating or removing this plugin.
	// 	 */
	// 	echo "Error creating the table: " . $wpdb->last_error;
	// } else {
	// 	echo "Table created successfully!";
	// }
}

register_activation_hook(__FILE__, 'create_breeze_menu_items_table');

function test_callback() {
	return 'Test response';
}

function breeze_menu_register_routes() {
	// die('hook triggered');
	register_rest_route(
		'breeze-menu-api/v1',
		'/test',
		array(
			'method' => WP_REST_Server::CREATABLE,
			'callback' => 'test_callback',
			'permission_callback' => '__return_true'
		)
	);

	// die('hook triggered');
	register_rest_route(
		'breeze-menu-api/v1',
		'/menu-items',
		array(
			'method' => WP_REST_Server::READABLE,
			'callback' => 'breeze_menu_get_menu_items',
			'permission_callback' => '__return_true'
		)
	);
}

/**
 * Previously, when visiting /wp-json/ it returned 404,
 * the reason is that permalink is plain type when wordpress is installed,
 * change to other pretty permalink fixes that.
 */
add_action('rest_api_init', 'breeze_menu_register_routes');

function breeze_menu_get_menu_items() {
	global $wpdb;
	$table_name = $wpdb->prefix . 'breeze_menu_items';
	$results = $wpdb->get_results("SELECT * FROM $table_name");
	return $results;
}

function breeze_menu_create_menu_items($request) {
	die($request);
	// global $wpdb;
	// $table_name = $wpdb->prefix . 'breeze_menu_items';

  // $menu_items = array();
  // $response = array();

  // for ($i = 1; $i <= count($request) / 2; $i++) {
  //   $icon_key = "icon-" . $i;
  //   $text_key = "text-" . $i;
  //   $menu_item = array(
  //     "icon" => $request[$icon_key],
  //     "text" => $request[$text_key]
  //   );

  //   $menu_items[] = $menu_item;
  // }

  // // Split the menu items into groups
  // $groups = array_chunk($menu_items, 2);
	// die($groups);
	// // $rows = $wpdb->insert(
	// // 	$table_name,

	// // )

	// return $groups;
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-breeze-menu-deactivator.php
 */
// function deactivate_breeze_menu()
// {
// 	require_once plugin_dir_path(__FILE__) . 'includes/class-breeze-menu-deactivator.php';
// 	breeze_menu_Deactivator::deactivate();
// }

// register_deactivation_hook(__FILE__, 'deactivate_breeze_menu');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
// require plugin_dir_path(__FILE__) . 'includes/class-breeze-menu.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
// function run_breeze_menu()
// {

// 	$plugin = new breeze_menu();
// 	$plugin->run();
// }
// run_breeze_menu();

if ( ! class_exists('Breeze_Menu') ) {

	class Breeze_Menu {
		/**
		 * Instance of this class.
		 *
		 * @var object
		 */
		protected static $instance = null;

		/* Saved Settings */
		public $settings;

		/**
		 * Return an instance of this class.
		 *
		 * @return object A single instance of this class.
		 */
		public static function init() {
			if (null == self::$instance) {
				self::$instance = new self;
			}

			return self::$instance;
		}

		/**
		 * Initialize the plugin.
		 */
		private function __construct() {
			setup_constants();
			add_action('admin_menu', array($this, 'load_menu'));
		}

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

		public function create_settings_page_content() {
			?>
			<div class="wrap">
				<div class="breeze-menu-header">
					<h3><?php echo esc_html__('Breeze Menu Settings', 'breeze-menu') ?></h3>
					<breeze-switch>Show Floating Menu</breeze-switch>
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
								foreach($results as $row) {
									$icon = $row->icon;
									$text = $row->text;
									echo "Icon: $icon, Text: $text\n";
								}
							} else {
								echo "No data found in this table.\n";
							}
						?>
						<footer style="margin-top: 1em">
							<breeze-button type="submit"><?php echo esc_html__('Save', 'save') ?></breeze-button>
							<breeze-button
								onclick="BreezeMenuAdmin.addMenuItem()"
								><?php echo esc_html__('Add menu item', 'add-menu-item') ?></breeze-button>
						</footer>
					</form>
				</div>
			</div>
			<?php
		}
	}
}

Breeze_Menu::init();

if ( ! is_admin() ) {
	require BREEZE_MENU_PLUGIN_DIR . "/public/class-breeze-menu-public.php";
	/**
	 * This will render on front end like this:
	 * <script 
	 * 	type="text/javascript" 
	 * 	src="http://127.0.0.1:8000/wp-content/plugins/breeze-menu/public/js/breeze-menu-public.js?ver=1.0.0" 
	 * 	id="breeze-menu-public-js"
	 * ></script>
	 */
	new Breeze_Menu_Public('breeze-menu-public', BREEZE_MENU_VERSION);
} elseif ( is_admin() ) {
	require BREEZE_MENU_PLUGIN_DIR . "/admin/class-breeze-menu-admin.php";
	new Breeze_Menu_Admin('breeze-menu-admin', BREEZE_MENU_VERSION);
}