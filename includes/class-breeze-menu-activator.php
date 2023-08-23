<?php

/**
 * Fired during plugin activation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/includes
 * @author     Brandon Zhang <gwonzhang@gmail.com>
 */
class Breeze_Menu_Activator {
	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
    self::create_table();
	}

  private static function create_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'breeze_menu_items';

    // Check if the table already exists.
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" );

    if ($table_exists) {
      return;
    }
  
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
    /**
     * Below will cause this error
     * The plugin generated 27 characters of unexpected output during activation. 
    * If you notice "headers already sent" messages, problems with syndication feeds or other issues, 
    * try deactivating or removing this plugin.
    */
    // if ($result === false) {
    // 	echo "Error creating the table: " . $wpdb->last_error;
    // } else {
    // 	echo "Table created successfully!";
    // }
  }
}