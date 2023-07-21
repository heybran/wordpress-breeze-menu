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
 * @author     Brandon Zhang <contact@heybran.cn>
 */
// class Breeze_Menu_Activator
// {
// 	public static function activate()
// 	{

// 		add_action('admin_menu', array(__CLASS__, 'breeze_menu_options_page'));
// 		add_action('admin_notices', function () {
// 			echo 'test message';
// 		});
// 	}

// 	private static function breeze_menu_options_page()
// 	{
// 		// add_menu_page(
// 		// 	'Breeze Menu',
// 		// 	'Breeze Menu',
// 		// 	'manage_options',
// 		// 	'breeze_menu',
// 		// 	array(__CLASS__, 'breeze_menu_options_page_html'),
// 		// 	BREEZE_MENU_PLUGIN_URL . 'images/breeze_menu_icon.png',
// 		// 	20
// 		// );
// 		echo 'test message';
// 	}

/*
// 	private static function breeze_menu_options_page_html()
// 	{
// ?>
// 		<div class="wrap">
// 			<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
// 			<form action="options.php" method="post">
// 				<?php
// 				?>
// 			</form>
// 		</div>
// <?php
// 	}
// }
*/

function activate()
{

	// add_action('admin_menu', 'breeze_menu_options_page');
	add_action('admin_notices', function () {
		echo 'test message';
	});
}

function breeze_menu_options_page()
{
	add_submenu_page(
		'tools.php',
		'Breeze Menu',
		'Breeze Menu',
		'manage_options',
		'breeze-menu',
		// BREEZE_MENU_PLUGIN_URL . 'images/breeze_menu_icon.png',
	);
}

// function breeze_menu_options_page()
// {
// 	add_menu_page(
// 		'Breeze Menu',
// 		'Breeze Menu',
// 		'manage_options',
// 		'breeze_menu',
// 		'breeze_menu_options_page_html',
// 		BREEZE_MENU_PLUGIN_URL . 'images/breeze_menu_icon.png',
// 		12
// 	);
// }

function breeze_menu_options_page_html()
{
?>
	<div class="wrap">
		<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
		<form action="options.php" method="post">
			<?php
			?>
		</form>
	</div>
<?php
}
