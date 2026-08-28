<?php
/**
 * 自訂器：教會基本資料、崇拜時間、首頁區塊文案。
 * 同工可在「外觀 → 自訂」直接修改，無須改動程式碼。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 教會資料預設值。資料來源：中華福音道路德會官網教會一覽與榮恩堂 Facebook 專頁。
 *
 * @return array<string, string>
 */
function rongen_defaults() {
	return array(
		'rongen_church_name'    => '中華福音道路德會 榮恩堂',
		'rongen_church_short'   => '榮恩堂',
		'rongen_church_latin'   => 'China Evangelical Lutheran Church',
		'rongen_tagline'        => '台南白河・仙草',
		// 地址、電話與牧職人員依本堂 2026-07-26 週報頁尾所載。
		'rongen_address'        => '732010 台南市白河區仙草里仙草 21 之 4 號',
		'rongen_phone'          => '06-685-7444',
		'rongen_mobile'         => '0986-375-031',
		'rongen_email'          => 'service@celc.org.tw',
		'rongen_overseer'       => '魯思豪 牧師',
		'rongen_pastor'         => '白霈德 牧師',
		'rongen_pastor_phone'   => '0975-959-112',
		'rongen_teacher'        => '巫奇真 教師',
		'rongen_teacher_line'   => 'marigold1301',
		'rongen_service_time'   => '每主日 上午 10:00－11:00',
		'rongen_facebook'       => 'https://www.facebook.com/people/%E4%B8%AD%E8%8F%AF%E7%A6%8F%E9%9F%B3%E9%81%93-%E8%B7%AF%E5%BE%B7%E6%9C%83-%E6%A6%AE%E6%81%A9%E5%A0%82/61569452264190/',
		'rongen_celc_url'       => 'https://celc.org.tw/',
		'rongen_map_url'        => 'https://maps.google.com/?q=23.3453317,120.474678',
		'rongen_map_lat'        => '23.3453317',
		'rongen_map_lng'        => '120.474678',
		'rongen_hero_kicker'    => '以聖道與聖禮為中心',
		'rongen_hero_title'     => '主的道<br>永遠常存',
		'rongen_hero_text'      => '榮恩堂是中華福音道路德會在台南白河的教會。我們照著歷代教會所傳承的禮儀崇拜聚集，聆聽上帝的話，領受基督的身體與血。無論你是初次來訪或久未回到教會，這裡都為你留了位子。',
		'rongen_verse_text'     => '凡有血氣的，盡都如草；他的美榮都像草上的花。草必枯乾，花必凋謝；惟有主的道永遠常存。',
		'rongen_verse_ref'      => '彼得前書 1:24-25',
		'rongen_webfonts'       => true,
	);
}

/**
 * 取得教會資料欄位（自訂器設定值優先，其次為預設值）。
 *
 * @param string $key 欄位名稱。
 * @return string
 */
function rongen_info( $key ) {
	$defaults = rongen_defaults();
	$default  = isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';
	return (string) get_theme_mod( $key, $default );
}

function rongen_customize_register( $wp_customize ) {
	$defaults = rongen_defaults();

	$wp_customize->add_panel(
		'rongen_panel',
		array(
			'title'       => __( '榮恩堂設定', 'rongen' ),
			'description' => __( '教會基本資料、崇拜時間與首頁文案。', 'rongen' ),
			'priority'    => 20,
		)
	);

	$sections = array(
		'rongen_identity' => array(
			'title'  => __( '教會名稱與識別', 'rongen' ),
			'fields' => array(
				'rongen_church_name'  => array( 'label' => __( '教會全名', 'rongen' ) ),
				'rongen_church_short' => array( 'label' => __( '教會簡稱', 'rongen' ) ),
				'rongen_church_latin' => array( 'label' => __( '英文名稱（頁首小字）', 'rongen' ) ),
				'rongen_tagline'      => array( 'label' => __( '地區標語', 'rongen' ) ),
			),
		),
		'rongen_contact'  => array(
			'title'  => __( '聯絡資訊', 'rongen' ),
			'fields' => array(
				'rongen_address'  => array( 'label' => __( '地址', 'rongen' ) ),
				'rongen_phone'    => array( 'label' => __( '教會電話', 'rongen' ) ),
				'rongen_mobile'   => array( 'label' => __( '駐堂教師手機', 'rongen' ) ),
				'rongen_email'    => array( 'label' => __( '電子郵件', 'rongen' ), 'sanitize' => 'sanitize_email' ),
				'rongen_facebook' => array( 'label' => __( 'Facebook 專頁網址', 'rongen' ), 'sanitize' => 'esc_url_raw' ),
				'rongen_celc_url' => array( 'label' => __( '總會網址', 'rongen' ), 'sanitize' => 'esc_url_raw' ),
				'rongen_map_url'  => array( 'label' => __( 'Google 地圖網址', 'rongen' ), 'sanitize' => 'esc_url_raw' ),
				'rongen_map_lat'  => array( 'label' => __( '地圖緯度', 'rongen' ) ),
				'rongen_map_lng'  => array( 'label' => __( '地圖經度', 'rongen' ) ),
			),
		),
		'rongen_worship'  => array(
			'title'  => __( '牧養與崇拜', 'rongen' ),
			'fields' => array(
				'rongen_overseer'     => array( 'label' => __( '主責牧師', 'rongen' ) ),
				'rongen_pastor'       => array( 'label' => __( '聖禮牧師', 'rongen' ) ),
				'rongen_pastor_phone' => array( 'label' => __( '聖禮牧師手機', 'rongen' ) ),
				'rongen_teacher'      => array( 'label' => __( '駐堂教師', 'rongen' ) ),
				'rongen_teacher_line' => array( 'label' => __( '駐堂教師 LINE ID', 'rongen' ) ),
				'rongen_service_time' => array( 'label' => __( '主日崇拜時間', 'rongen' ) ),
			),
		),
		'rongen_home'     => array(
			'title'  => __( '首頁文案', 'rongen' ),
			'fields' => array(
				'rongen_hero_kicker' => array( 'label' => __( '首頁上方小標', 'rongen' ) ),
				'rongen_hero_title'  => array( 'label' => __( '首頁大標（可用 <br> 換行）', 'rongen' ), 'sanitize' => 'wp_kses_post' ),
				'rongen_hero_text'   => array( 'label' => __( '首頁介紹文字', 'rongen' ), 'type' => 'textarea' ),
				'rongen_verse_text'  => array( 'label' => __( '經句區—經文', 'rongen' ), 'type' => 'textarea' ),
				'rongen_verse_ref'   => array( 'label' => __( '經句區—出處', 'rongen' ) ),
			),
		),
	);

	foreach ( $sections as $section_id => $section ) {
		$wp_customize->add_section(
			$section_id,
			array(
				'title' => $section['title'],
				'panel' => 'rongen_panel',
			)
		);

		foreach ( $section['fields'] as $key => $field ) {
			$wp_customize->add_setting(
				$key,
				array(
					'default'           => isset( $defaults[ $key ] ) ? $defaults[ $key ] : '',
					'sanitize_callback' => isset( $field['sanitize'] ) ? $field['sanitize'] : 'sanitize_text_field',
					'transport'         => 'refresh',
				)
			);

			$wp_customize->add_control(
				$key,
				array(
					'label'   => $field['label'],
					'section' => $section_id,
					'type'    => isset( $field['type'] ) ? $field['type'] : 'text',
				)
			);
		}
	}

	// 首頁圖片。未上傳時自動採用深色底紋，網站在沒有照片的情況下依然完整。
	$images = array(
		'rongen_hero_image'    => array(
			'label'       => __( '首頁主視覺背景照片', 'rongen' ),
			'description' => __( '建議尺寸 2000×1100 以上的橫向照片，例如會堂內部或教會外觀。留空則使用深色底紋。', 'rongen' ),
		),
		'rongen_worship_image' => array(
			'label'       => __( '首頁「崇拜」段落照片', 'rongen' ),
			'description' => __( '建議 4:3 橫向照片。留空則使用十字架圖樣。', 'rongen' ),
		),
	);

	foreach ( $images as $key => $image ) {
		$wp_customize->add_setting(
			$key,
			array(
				'default'           => '',
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				$key,
				array(
					'label'       => $image['label'],
					'description' => $image['description'],
					'section'     => 'rongen_home',
				)
			)
		);
	}

	// 進階：字體來源。
	$wp_customize->add_section(
		'rongen_advanced',
		array(
			'title'       => __( '進階', 'rongen' ),
			'panel'       => 'rongen_panel',
			'description' => __( '若主機無法連線 Google Fonts，請關閉線上字體。', 'rongen' ),
		)
	);
	$wp_customize->add_setting(
		'rongen_webfonts',
		array(
			'default'           => true,
			'sanitize_callback' => 'rongen_sanitize_checkbox',
		)
	);
	$wp_customize->add_control(
		'rongen_webfonts',
		array(
			'label'   => __( '載入 Google Fonts 線上字體', 'rongen' ),
			'section' => 'rongen_advanced',
			'type'    => 'checkbox',
		)
	);
}
add_action( 'customize_register', 'rongen_customize_register' );

function rongen_sanitize_checkbox( $value ) {
	return (bool) $value;
}
