<?php
/**
 * 自訂欄位：講道 / 週報 / 活動的額外資料。
 * 不依賴 ACF 等外掛，直接使用 WordPress 內建 meta box。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 各內容類型的欄位定義。
 *
 * @return array<string, array<string, array{label:string, type:string, help?:string}>>
 */
function rongen_meta_fields() {
	return array(
		'rongen_sermon'   => array(
			'_rongen_date'      => array( 'label' => __( '主日／聚會日期', 'rongen' ), 'type' => 'date' ),
			'_rongen_preacher'  => array( 'label' => __( '講員', 'rongen' ), 'type' => 'text', 'help' => __( '例：魯思豪 牧師、巫奇真 教師', 'rongen' ) ),
			'_rongen_scripture' => array( 'label' => __( '講道經文', 'rongen' ), 'type' => 'text', 'help' => __( '例：路加福音 12:13-21', 'rongen' ) ),
			'_rongen_video'     => array( 'label' => __( '影音連結', 'rongen' ), 'type' => 'url', 'help' => __( 'YouTube 或 Facebook 影片網址，留空則不顯示播放區。', 'rongen' ) ),
			'_rongen_audio'     => array( 'label' => __( '錄音檔連結', 'rongen' ), 'type' => 'url', 'help' => __( 'MP3 檔案網址，可先上傳至媒體庫再貼上。', 'rongen' ) ),
		),
		'rongen_bulletin' => array(
			'_rongen_date' => array( 'label' => __( '主日日期', 'rongen' ), 'type' => 'date' ),
			'_rongen_pdf'  => array( 'label' => __( '週報 PDF 連結', 'rongen' ), 'type' => 'url', 'help' => __( '請先於「媒體 → 新增媒體檔案」上傳 PDF，再將網址貼於此處。若週報是發佈在 Facebook，請改填下一欄。', 'rongen' ) ),
			'_rongen_link' => array( 'label' => __( 'Facebook 貼文連結', 'rongen' ), 'type' => 'url', 'help' => __( '若週報是掃描成圖片發佈於 Facebook 專頁，請貼上該篇貼文的網址。PDF 與此欄填其一即可。', 'rongen' ) ),
		),
		'rongen_event'    => array(
			'_rongen_date'     => array( 'label' => __( '活動日期', 'rongen' ), 'type' => 'date' ),
			'_rongen_time'     => array( 'label' => __( '活動時間', 'rongen' ), 'type' => 'text', 'help' => __( '例：上午 10:00－11:30', 'rongen' ) ),
			'_rongen_location' => array( 'label' => __( '活動地點', 'rongen' ), 'type' => 'text', 'help' => __( '留空則預設為榮恩堂會堂。', 'rongen' ) ),
		),
	);
}

function rongen_add_meta_boxes() {
	foreach ( array_keys( rongen_meta_fields() ) as $post_type ) {
		add_meta_box(
			'rongen_details',
			__( '榮恩堂資料欄位', 'rongen' ),
			'rongen_render_meta_box',
			$post_type,
			'normal',
			'high'
		);
	}
}
add_action( 'add_meta_boxes', 'rongen_add_meta_boxes' );

function rongen_render_meta_box( $post ) {
	$fields = rongen_meta_fields();
	if ( empty( $fields[ $post->post_type ] ) ) {
		return;
	}

	wp_nonce_field( 'rongen_save_meta', 'rongen_meta_nonce' );

	echo '<div class="rongen-meta-grid" style="display:grid;gap:16px;max-width:640px;">';
	foreach ( $fields[ $post->post_type ] as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p style="margin:0;"><label for="%1$s" style="display:block;font-weight:600;margin-bottom:4px;">%2$s</label>'
				. '<input type="%3$s" id="%1$s" name="%1$s" value="%4$s" class="widefat" />%5$s</p>',
			esc_attr( $key ),
			esc_html( $field['label'] ),
			esc_attr( $field['type'] ),
			esc_attr( $value ),
			isset( $field['help'] ) ? '<span class="description" style="display:block;margin-top:4px;">' . esc_html( $field['help'] ) . '</span>' : ''
		);
	}
	echo '</div>';
}

function rongen_save_meta( $post_id ) {
	if ( ! isset( $_POST['rongen_meta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['rongen_meta_nonce'] ), 'rongen_save_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$fields    = rongen_meta_fields();
	$post_type = get_post_type( $post_id );
	if ( empty( $fields[ $post_type ] ) ) {
		return;
	}

	foreach ( $fields[ $post_type ] as $key => $field ) {
		if ( ! isset( $_POST[ $key ] ) ) {
			continue;
		}
		$raw = wp_unslash( $_POST[ $key ] );
		$value = 'url' === $field['type'] ? esc_url_raw( $raw ) : sanitize_text_field( $raw );

		if ( '' === $value ) {
			delete_post_meta( $post_id, $key );
		} else {
			update_post_meta( $post_id, $key, $value );
		}
	}
}
add_action( 'save_post', 'rongen_save_meta' );

/**
 * 在後台列表顯示日期與講員，方便同工核對。
 */
function rongen_admin_columns( $columns ) {
	$new = array();
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['rongen_date']     = __( '日期', 'rongen' );
			$new['rongen_preacher'] = __( '講員', 'rongen' );
		}
	}
	return $new;
}
add_filter( 'manage_rongen_sermon_posts_columns', 'rongen_admin_columns' );
add_filter( 'manage_rongen_bulletin_posts_columns', 'rongen_admin_columns' );
add_filter( 'manage_rongen_event_posts_columns', 'rongen_admin_columns' );

function rongen_admin_column_content( $column, $post_id ) {
	if ( 'rongen_date' === $column ) {
		echo esc_html( get_post_meta( $post_id, '_rongen_date', true ) ?: '—' );
	}
	if ( 'rongen_preacher' === $column ) {
		echo esc_html( get_post_meta( $post_id, '_rongen_preacher', true ) ?: '—' );
	}
}
add_action( 'manage_rongen_sermon_posts_custom_column', 'rongen_admin_column_content', 10, 2 );
add_action( 'manage_rongen_bulletin_posts_custom_column', 'rongen_admin_column_content', 10, 2 );
add_action( 'manage_rongen_event_posts_custom_column', 'rongen_admin_column_content', 10, 2 );
