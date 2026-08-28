<?php
/**
 * 榮恩堂主題載入點。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'RONGEN_VERSION', '1.0.0' );
define( 'RONGEN_DIR', get_template_directory() );
define( 'RONGEN_URI', get_template_directory_uri() );

require_once RONGEN_DIR . '/inc/setup.php';
require_once RONGEN_DIR . '/inc/enqueue.php';
require_once RONGEN_DIR . '/inc/post-types.php';
require_once RONGEN_DIR . '/inc/meta-boxes.php';
require_once RONGEN_DIR . '/inc/customizer.php';
require_once RONGEN_DIR . '/inc/template-tags.php';
require_once RONGEN_DIR . '/inc/shortcodes.php';
require_once RONGEN_DIR . '/inc/demo-content.php';
