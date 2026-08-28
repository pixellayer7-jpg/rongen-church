<?php
/**
 * 樣式與腳本載入。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function rongen_enqueue_assets() {
	// 中文襯線／無襯線字體。若主機位於無法連線 Google Fonts 的環境，
	// 可在「外觀 → 自訂 → 榮恩堂設定」關閉此項，改用系統字體。
	if ( get_theme_mod( 'rongen_webfonts', true ) ) {
		wp_enqueue_style(
			'rongen-fonts',
			'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap',
			array(),
			null
		);
	}

	wp_enqueue_style( 'rongen-theme', RONGEN_URI . '/assets/css/theme.css', array(), RONGEN_VERSION );
	wp_style_add_data( 'rongen-theme', 'rtl', 'replace' );

	wp_enqueue_script( 'rongen-main', RONGEN_URI . '/assets/js/main.js', array(), RONGEN_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'rongen_enqueue_assets' );

/**
 * 後台編輯器沿用相同字體，讓編輯畫面與前台一致。
 */
function rongen_enqueue_editor_assets() {
	if ( get_theme_mod( 'rongen_webfonts', true ) ) {
		wp_enqueue_style(
			'rongen-fonts',
			'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap',
			array(),
			null
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'rongen_enqueue_editor_assets' );
