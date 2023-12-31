<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/public
 * @author     Brandon Zhang <gwonzhang@gmail.com>
 */
class Breeze_Menu_Public {

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
	 * @param      string    $Breeze_Menu       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($Breeze_Menu, $version) {
		$this->Breeze_Menu = $Breeze_Menu;
		$this->version = $version;

		/**
		 * Including files using URLs is typically disabled for security reasons.
		 * Below will throw error.
		 * require plugin_dir_url(__FILE__) . 'partials/breeze-menu-public-display.php';
		 */
		// require plugin_dir_path(__FILE__) . 'partials/breeze-menu-public-display.php';
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		wp_enqueue_style($this->Breeze_Menu, plugin_dir_url(__FILE__) . 'css/breeze-menu-public.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		/**
		 * This will render on front end like this:
		 * <script 
		 * 	type="text/javascript" 
		 * 	src="http://127.0.0.1:8000/wp-content/plugins/breeze-menu/public/js/breeze-menu-public.js?ver=1.0.0" 
		 * 	id="Breeze Menu-js"
		 * ></script>
		 */
		wp_enqueue_script($this->Breeze_Menu, plugin_dir_url(__FILE__) . '../build/breeze-menu-public.js', array(), $this->version, false, 'module');

		function add_module_type_attribute($tag, $handle, $src) {
			if ($handle === 'breeze-menu-public') {
					$tag = str_replace('<script', '<script type="module"', $tag);
			}
			return $tag;
		}
		add_filter('script_loader_tag', 'add_module_type_attribute', 10, 3);
	}
}