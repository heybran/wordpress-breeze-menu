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

use Illuminate\Support\Arr;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/admin
 * @author     Your Name <email@example.com>
 */
class Breeze_Menu_Admin
{

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
		/**
		 * Notice: Function wp_enqueue_script was called incorrectly. 
		 * Scripts and styles should not be registered or enqueued until the wp_enqueue_scripts, 
		 * admin_enqueue_scripts, or login_enqueue_scripts hooks. 
		 * This notice was triggered by the breeze-menu-admin handle. 
		 */
		// $this->enqueue_scripts();

		// changed to below
		add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
		// $this->enqueue_styles();
		add_action('admin_enqueue_scripts', array($this, 'enqueue_styles'));
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

		// original codes, but no need to wait for jQuery
		// wp_enqueue_script($this->Breeze_Menu, plugin_dir_url(__FILE__) . 'js/breeze-menu-admin.js', array('jquery'), $this->version, false);
		wp_enqueue_script($this->Breeze_Menu, plugin_dir_url(__FILE__) . '../build/breeze-menu-admin.js', array(), $this->version, false, 'module');

		function add_module_type_attribute($tag, $handle, $src) {
			if ($handle === 'breeze-menu-admin') {
					$tag = str_replace('<script', '<script type="module"', $tag);
			}
			return $tag;
		}
		add_filter('script_loader_tag', 'add_module_type_attribute', 10, 3);
	}
}
