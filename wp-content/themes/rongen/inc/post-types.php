<?php
/**
 * 自訂內容類型：講道、主日週報、教會活動。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function rongen_register_post_types() {

	register_post_type(
		'rongen_sermon',
		array(
			'labels'        => array(
				'name'               => __( '講道', 'rongen' ),
				'singular_name'      => __( '講道', 'rongen' ),
				'add_new'            => __( '新增講道', 'rongen' ),
				'add_new_item'       => __( '新增講道', 'rongen' ),
				'edit_item'          => __( '編輯講道', 'rongen' ),
				'all_items'          => __( '所有講道', 'rongen' ),
				'search_items'       => __( '搜尋講道', 'rongen' ),
				'not_found'          => __( '尚無講道紀錄。', 'rongen' ),
				'featured_image'     => __( '講道封面', 'rongen' ),
				'menu_name'          => __( '講道', 'rongen' ),
			),
			'public'        => true,
			'has_archive'   => true,
			'rewrite'       => array( 'slug' => 'sermons', 'with_front' => false ),
			'menu_icon'     => 'dashicons-microphone',
			'menu_position' => 21,
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
			'show_in_rest'  => true,
		)
	);

	register_post_type(
		'rongen_bulletin',
		array(
			'labels'        => array(
				'name'          => __( '主日週報', 'rongen' ),
				'singular_name' => __( '主日週報', 'rongen' ),
				'add_new'       => __( '新增週報', 'rongen' ),
				'add_new_item'  => __( '新增週報', 'rongen' ),
				'edit_item'     => __( '編輯週報', 'rongen' ),
				'all_items'     => __( '所有週報', 'rongen' ),
				'not_found'     => __( '尚無週報。', 'rongen' ),
				'menu_name'     => __( '主日週報', 'rongen' ),
			),
			'public'        => true,
			'has_archive'   => true,
			'rewrite'       => array( 'slug' => 'bulletins', 'with_front' => false ),
			'menu_icon'     => 'dashicons-media-document',
			'menu_position' => 22,
			'supports'      => array( 'title', 'editor', 'thumbnail', 'revisions' ),
			'show_in_rest'  => true,
		)
	);

	register_post_type(
		'rongen_event',
		array(
			'labels'        => array(
				'name'          => __( '教會活動', 'rongen' ),
				'singular_name' => __( '教會活動', 'rongen' ),
				'add_new'       => __( '新增活動', 'rongen' ),
				'add_new_item'  => __( '新增活動', 'rongen' ),
				'edit_item'     => __( '編輯活動', 'rongen' ),
				'all_items'     => __( '所有活動', 'rongen' ),
				'not_found'     => __( '尚無活動。', 'rongen' ),
				'menu_name'     => __( '教會活動', 'rongen' ),
			),
			'public'        => true,
			'has_archive'   => true,
			'rewrite'       => array( 'slug' => 'events', 'with_front' => false ),
			'menu_icon'     => 'dashicons-calendar-alt',
			'menu_position' => 23,
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
			'show_in_rest'  => true,
		)
	);

	// 教會年節期（將臨期、聖誕期、四旬期……），供講道與週報共用。
	register_taxonomy(
		'rongen_season',
		array( 'rongen_sermon', 'rongen_bulletin' ),
		array(
			'labels'            => array(
				'name'          => __( '教會年節期', 'rongen' ),
				'singular_name' => __( '教會年節期', 'rongen' ),
				'add_new_item'  => __( '新增節期', 'rongen' ),
				'menu_name'     => __( '教會年節期', 'rongen' ),
			),
			'public'            => true,
			'hierarchical'      => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'season', 'with_front' => false ),
		)
	);
}
add_action( 'init', 'rongen_register_post_types' );

/**
 * 講道與活動列表以「聚會日期」而非發佈日期排序。
 */
function rongen_archive_ordering( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}

	if ( $query->is_post_type_archive( array( 'rongen_sermon', 'rongen_bulletin' ) ) || $query->is_tax( 'rongen_season' ) ) {
		$query->set( 'meta_key', '_rongen_date' );
		$query->set( 'orderby', array( 'meta_value' => 'DESC', 'date' => 'DESC' ) );
		$query->set( 'posts_per_page', 12 );
	}

	if ( $query->is_post_type_archive( 'rongen_event' ) ) {
		$query->set( 'meta_key', '_rongen_date' );
		$query->set( 'orderby', array( 'meta_value' => 'ASC' ) );
		$query->set( 'posts_per_page', 20 );
	}
}
add_action( 'pre_get_posts', 'rongen_archive_ordering' );

/**
 * 首次啟用主題時建立預設的教會年節期，並更新永久連結規則。
 */
function rongen_after_switch_theme() {
	$seasons = array( '將臨期', '聖誕期', '顯現期', '四旬期', '復活期', '聖靈降臨期', '教會改革紀念' );
	foreach ( $seasons as $season ) {
		if ( ! term_exists( $season, 'rongen_season' ) ) {
			wp_insert_term( $season, 'rongen_season' );
		}
	}
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'rongen_after_switch_theme' );
