<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Breeze_Menu
 * @subpackage Breeze_Menu/public/partials
 */

function add_breeze_menu_tag() {
  echo '<breeze-menu></breeze-menu>';
}
add_action( 'wp_footer', 'add_breeze_menu_tag' );
