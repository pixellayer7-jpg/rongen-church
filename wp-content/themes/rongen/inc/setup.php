<?php
/**
 * 主題基本設定。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function rongen_setup() {
	load_theme_textdomain( 'rongen', RONGEN_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor.css' );

	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' )
	);

	add_theme_support(
		'custom-logo',
		array(
			'height'      => 96,
			'width'       => 96,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	register_nav_menus(
		array(
			'primary' => __( '主選單', 'rongen' ),
			'footer'  => __( '頁尾選單', 'rongen' ),
		)
	);

	add_image_size( 'rongen-hero', 2000, 1100, true );
	add_image_size( 'rongen-card', 800, 560, true );
}
add_action( 'after_setup_theme', 'rongen_setup' );

function rongen_content_width() {
	$GLOBALS['content_width'] = 820;
}
add_action( 'after_setup_theme', 'rongen_content_width', 0 );

function rongen_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( '側邊欄', 'rongen' ),
			'id'            => 'sidebar-1',
			'description'   => __( '顯示於文章與消息列表右側。', 'rongen' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget__title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( '頁尾區塊', 'rongen' ),
			'id'            => 'footer-1',
			'description'   => __( '顯示於頁尾左側的自由區塊。', 'rongen' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget__title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'rongen_widgets_init' );

/**
 * 讓「消息」文章摘要維持中文閱讀習慣的長度與結尾符號。
 */
function rongen_excerpt_length() {
	return 70;
}
add_filter( 'excerpt_length', 'rongen_excerpt_length' );

function rongen_excerpt_more() {
	return '……';
}
add_filter( 'excerpt_more', 'rongen_excerpt_more' );

function rongen_body_classes( $classes ) {
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}
	if ( is_front_page() ) {
		$classes[] = 'is-front';
	}
	return $classes;
}
add_filter( 'body_class', 'rongen_body_classes' );
