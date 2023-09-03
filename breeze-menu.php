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
	die;
}

// If this file is called directly, abort.
if ( ! defined('WPINC') ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 */
define( 'BREEZE_MENU_VERSION', '1.0.0' );

// Plugin Folder Path
define( 'BREEZE_MENU_PLUGIN_DIR', plugin_dir_path(__FILE__) );

// Plugin Folder URL
define( 'BREEZE_MENU_PLUGIN_URL', plugin_dir_url(__FILE__) );

// Plugin Root File
define( 'BREEZE_MENU_PLUGIN_FILE', __FILE__ );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-breeze-menu-activator.php
 */
function activate_breeze_menu() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-breeze-menu-activator.php';
	Breeze_Menu_Activator::activate();
}

register_activation_hook( __FILE__, 'activate_breeze_menu' );

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-breeze-menu-deactivator.php
 */
function deactivate_breeze_menu() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-breeze-menu-deactivator.php';
	Breeze_Menu_Deactivator::deactivate();
}

register_deactivation_hook( __FILE__, 'deactivate_breeze_menu' );


/**
 * Previously, when visiting /wp-json/ it returned 404,
 * the reason is that permalink is plain type when wordpress is initially installed,
 * changing to other pretty permalink fixes that.
 */
add_action( 'rest_api_init', 'register_breeze_menu_api_routes' );

function register_breeze_menu_api_routes() {
	register_rest_route(
		'breeze-menu/v1',
		'/menu-items',
		array(
			'methods' => WP_REST_Server::CREATABLE,
			'callback' => 'create_breeze_menu_items',
			'permission_callback' => function () {
				return current_user_can('edit_others_posts');
			},
		)
	);

	register_rest_route(
		'breeze-menu/v1',
		'/menu-items',
		array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => 'get_breeze_menu_items',
			'permission_callback' => '__return_true'
		)
	);
}

function get_breeze_menu_items() {
	$breeze_menu_settings = get_option('breeze-menu-settings');
	return $breeze_menu_settings;
}

function create_breeze_menu_items($request) {
	// for posting with FormData()
	// $body = $request->get_body_params();

	/**
	 * If you are trying to retrieve the JSON data from a POST request in WordPress PHP, 
	 * you can use the `file_get_contents()` function along with `json_decode()` 
	 * to parse the JSON data. Here's an example:
	 * In this code, we use `file_get_contents('php://input')` to 
	 * read the raw POST data from the request. 
	 * Then, we use `json_decode()` to decode the JSON data into an 
	 * associative array by passing `true` as the second argument. 
	 */
	$json_data = file_get_contents('php://input');
	$body = json_decode($json_data, true);

	$breeze_menu_settings = [
		'breeze_menu_show' => 'on',
		'breeze_menu_items' => [],
		'breeze_menu_background_color' => '#191936',
		'breeze_menu_text_color' => '#ffffff',
		'breeze_menu_position' => 'left:center',
	];

	if (!array_key_exists('breeze-menu-show', $body)) {
		$breeze_menu_settings['breeze_menu_show'] = 'off';
	} 

	$breeze_menu_settings['breeze_menu_background_color'] = sanitize_text_field($body['breeze-menu-background-color']);
	$breeze_menu_settings['breeze_menu_text_color'] = sanitize_text_field($body['breeze-menu-text-color']);
	$breeze_menu_settings['breeze_menu_position'] = sanitize_text_field($body['breeze-menu-position']);

	$menu_items = [];

	if (count($body['menus']) > 0) {
		foreach($body['menus'] as $menu) {
			$menu_items[] = array(
				"menu_icon" => sanitize_text_field($menu['icon']),
				"menu_text" => sanitize_text_field($menu['text'])
			);
		}
	}

	$breeze_menu_settings['breeze_menu_items'] = $menu_items;

	// if (isset($body['breeze-menu-show'])) {
	// 	$breeze_menu_settings['breeze_menu_show'] = 'on';
	// 	$menu_items = array_filter($body, function ($key) {
	// 		return $key !== 'breeze-menu-show';
	// 	}, ARRAY_FILTER_USE_KEY);
	// } else {
	// 	$breeze_menu_settings['breeze_menu_show'] = 'off';
	// 	$menu_items = $body;
	// }

	// for ($i = 1; $i <= count($menu_items) / 2; $i++) {
	// 	$icon_key = "icon-" . $i;
	// 	$text_key = "text-" . $i;
	// 	$menu_item = array(
	// 		"menu_icon" => $body[$icon_key],
	// 		"menu_text" => $body[$text_key]
	// 	);

	// 	$breeze_menu_settings['breeze_menu_items'][] = $menu_item;
	// }

	$result = update_option('breeze-menu-settings', $breeze_menu_settings);

	// Drop existing rows from the table
	/**
	 * This will cause unexpected bug as if $wpdb->insert() fails,
	 * database table will be cleared out with no rows left.
	 */
	// $wpdb->query("TRUNCATE TABLE $table_name");

	// foreach($menu_items as $item) {
	// 	$wpdb->insert(
	// 		$table_name,
	// 		array(
	// 			'menu_icon' => $item['icon'],
	// 			'menu_text' => $item['text']
	// 		)
	// 		);
	// }

	if (!$result) {
		$response = array(
			'status' => 'error',
			'message' => 'Fail to add breeze-menu-settings',
		);
		wp_send_json($response, 500);
	} else {
		$response = array(
			'status' => 'success',
			'message' => 'Menu items created/updated successfully',
			'data' => $breeze_menu_settings
		);
		wp_send_json($response, 200);
	}
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-breeze-menu.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_breeze_menu() {
	$plugin = new Breeze_Menu();
	$plugin->run();
}
run_breeze_menu();