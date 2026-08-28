<?php
/**
 * 一鍵建立網站架構：頁面、選單、首頁設定與示範內容。
 * 位置：後台 → 外觀 → 榮恩堂網站設定精靈。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function rongen_setup_page_menu() {
	add_theme_page(
		__( '榮恩堂網站設定精靈', 'rongen' ),
		__( '網站設定精靈', 'rongen' ),
		'edit_theme_options',
		'rongen-setup',
		'rongen_render_setup_page'
	);
}
add_action( 'admin_menu', 'rongen_setup_page_menu' );

/**
 * 網站預設頁面結構。
 *
 * @return array<string, array{title:string, template:string, excerpt:string}>
 */
function rongen_default_pages() {
	return array(
		'home'     => array( 'title' => '首頁', 'template' => '', 'excerpt' => '' ),
		'about'    => array( 'title' => '關於榮恩堂', 'template' => 'page-templates/template-about.php', 'excerpt' => '' ),
		'worship'  => array( 'title' => '崇拜與聚會', 'template' => 'page-templates/template-worship.php', 'excerpt' => '' ),
		'beliefs'  => array( 'title' => '信仰告白', 'template' => 'page-templates/template-beliefs.php', 'excerpt' => '' ),
		'news'     => array( 'title' => '教會消息', 'template' => '', 'excerpt' => '' ),
		'giving'   => array( 'title' => '奉獻', 'template' => 'page-templates/template-giving.php', 'excerpt' => '' ),
		'celc'     => array( 'title' => '總會與各堂會', 'template' => 'page-templates/template-celc.php', 'excerpt' => '' ),
		'contact'  => array( 'title' => '聯絡與交通', 'template' => 'page-templates/template-contact.php', 'excerpt' => '' ),
	);
}

/**
 * 依標題尋找既有文章／頁面。
 * 取代 WordPress 6.2 起已棄用的 get_page_by_title()。
 *
 * @param string $title     標題。
 * @param string $post_type 內容類型。
 * @return int 找到的文章 ID，找不到時回傳 0。
 */
function rongen_find_post_by_title( $title, $post_type = 'page' ) {
	$query = new WP_Query(
		array(
			'post_type'              => $post_type,
			'title'                  => $title,
			'post_status'            => array( 'publish', 'draft', 'pending', 'private' ),
			'posts_per_page'         => 1,
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
			'update_post_meta_cache' => false,
			'fields'                 => 'ids',
		)
	);

	return $query->posts ? (int) $query->posts[0] : 0;
}

function rongen_render_setup_page() {
	$done = isset( $_GET['rongen_done'] ) ? sanitize_key( wp_unslash( $_GET['rongen_done'] ) ) : '';
	?>
	<div class="wrap">
		<h1><?php esc_html_e( '榮恩堂網站設定精靈', 'rongen' ); ?></h1>

		<?php if ( 'structure' === $done ) : ?>
			<div class="notice notice-success"><p><?php esc_html_e( '網站架構已建立：頁面、主選單與首頁設定都完成了。', 'rongen' ); ?></p></div>
		<?php elseif ( 'samples' === $done ) : ?>
			<div class="notice notice-success"><p><?php esc_html_e( '示範內容已匯入。請記得日後改為教會的實際資料。', 'rongen' ); ?></p></div>
		<?php endif; ?>

		<p style="max-width:46em"><?php esc_html_e( '這個工具會替你把網站的基本骨架一次建好，省去手動新增頁面與設定選單的工夫。建議依序執行下方兩個步驟，之後再到「外觀 → 自訂 → 榮恩堂設定」調整教會資料。', 'rongen' ); ?></p>

		<hr>

		<h2><?php esc_html_e( '步驟一：建立網站架構', 'rongen' ); ?></h2>
		<p style="max-width:46em"><?php esc_html_e( '建立首頁、關於榮恩堂、崇拜與聚會、信仰告白、教會消息、奉獻、總會與各堂會、聯絡與交通共八個頁面，指定對應的頁面範本，設定首頁與消息頁，並建立主選單與頁尾選單。重複執行不會產生重複頁面。', 'rongen' ); ?></p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="rongen_build_structure">
			<?php wp_nonce_field( 'rongen_build_structure' ); ?>
			<?php submit_button( __( '建立網站架構', 'rongen' ), 'primary', 'submit', false ); ?>
		</form>

		<hr>

		<h2><?php esc_html_e( '步驟二：匯入示範內容（選用）', 'rongen' ); ?></h2>
		<p style="max-width:46em"><?php esc_html_e( '匯入數則示範講道、主日週報與教會活動，讓你先看到列表頁與詳細頁的實際樣子。這些是範例文字，正式上線前請刪除或改寫。', 'rongen' ); ?></p>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<input type="hidden" name="action" value="rongen_import_samples">
			<?php wp_nonce_field( 'rongen_import_samples' ); ?>
			<?php submit_button( __( '匯入示範內容', 'rongen' ), 'secondary', 'submit', false ); ?>
		</form>

		<hr>

		<h2><?php esc_html_e( '接下來', 'rongen' ); ?></h2>
		<ol style="max-width:46em">
			<li><?php esc_html_e( '到「外觀 → 自訂 → 榮恩堂設定」核對教會地址、電話、崇拜時間與牧養同工。', 'rongen' ); ?></li>
			<li><?php esc_html_e( '到「外觀 → 自訂 → 網站識別」上傳教會標誌（Logo）與網站圖示。', 'rongen' ); ?></li>
			<li><?php esc_html_e( '到「設定 → 固定網址」選擇「文章名稱」，讓網址更易讀。', 'rongen' ); ?></li>
			<li><?php esc_html_e( '編輯「奉獻」頁面，補上教會實際的帳戶資料。', 'rongen' ); ?></li>
		</ol>
	</div>
	<?php
}

/**
 * 建立頁面、選單與首頁設定。
 */
function rongen_build_structure() {
	if ( ! current_user_can( 'edit_theme_options' ) ) {
		wp_die( esc_html__( '權限不足。', 'rongen' ) );
	}
	check_admin_referer( 'rongen_build_structure' );

	$ids = array();

	foreach ( rongen_default_pages() as $key => $page ) {
		$page_id = rongen_find_post_by_title( $page['title'], 'page' );

		if ( ! $page_id ) {
			$page_id = wp_insert_post(
				array(
					'post_title'   => $page['title'],
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_content' => '',
					'post_excerpt' => $page['excerpt'],
				)
			);
		}

		if ( is_wp_error( $page_id ) || ! $page_id ) {
			continue;
		}

		if ( $page['template'] ) {
			update_post_meta( $page_id, '_wp_page_template', $page['template'] );
		}

		$ids[ $key ] = $page_id;
	}

	if ( ! empty( $ids['home'] ) && ! empty( $ids['news'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
		update_option( 'page_for_posts', $ids['news'] );
	}

	rongen_build_menus( $ids );

	flush_rewrite_rules();

	wp_safe_redirect( admin_url( 'themes.php?page=rongen-setup&rongen_done=structure' ) );
	exit;
}
add_action( 'admin_post_rongen_build_structure', 'rongen_build_structure' );

/**
 * 建立主選單與頁尾選單。
 *
 * @param array<string, int> $ids 頁面 ID 對照表。
 */
function rongen_build_menus( $ids ) {
	$menus = array(
		'primary' => array(
			'name'  => '主選單',
			'items' => array(
				array( 'type' => 'page', 'key' => 'about', 'label' => '關於榮恩堂' ),
				array( 'type' => 'page', 'key' => 'worship', 'label' => '崇拜與聚會' ),
				array( 'type' => 'page', 'key' => 'beliefs', 'label' => '信仰告白' ),
				array( 'type' => 'archive', 'post_type' => 'rongen_sermon', 'label' => '講道' ),
				array( 'type' => 'archive', 'post_type' => 'rongen_bulletin', 'label' => '主日週報' ),
				array( 'type' => 'page', 'key' => 'news', 'label' => '教會消息' ),
				array( 'type' => 'page', 'key' => 'contact', 'label' => '聯絡與交通' ),
			),
		),
		'footer'  => array(
			'name'  => '頁尾選單',
			'items' => array(
				array( 'type' => 'page', 'key' => 'worship', 'label' => '崇拜與聚會' ),
				array( 'type' => 'archive', 'post_type' => 'rongen_sermon', 'label' => '講道存檔' ),
				array( 'type' => 'archive', 'post_type' => 'rongen_bulletin', 'label' => '主日週報' ),
				array( 'type' => 'archive', 'post_type' => 'rongen_event', 'label' => '教會活動' ),
				array( 'type' => 'page', 'key' => 'giving', 'label' => '奉獻' ),
				array( 'type' => 'page', 'key' => 'celc', 'label' => '總會與各堂會' ),
			),
		),
	);

	$locations = get_theme_mod( 'nav_menu_locations', array() );

	foreach ( $menus as $location => $menu ) {
		$menu_object = wp_get_nav_menu_object( $menu['name'] );
		$menu_id     = $menu_object ? $menu_object->term_id : wp_create_nav_menu( $menu['name'] );

		if ( is_wp_error( $menu_id ) ) {
			continue;
		}

		// 清空後重建，避免重複執行時產生重複項目。
		foreach ( (array) wp_get_nav_menu_items( $menu_id ) as $item ) {
			wp_delete_post( $item->ID, true );
		}

		foreach ( $menu['items'] as $item ) {
			if ( 'page' === $item['type'] ) {
				if ( empty( $ids[ $item['key'] ] ) ) {
					continue;
				}
				wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'     => $item['label'],
						'menu-item-object'    => 'page',
						'menu-item-object-id' => $ids[ $item['key'] ],
						'menu-item-type'      => 'post_type',
						'menu-item-status'    => 'publish',
					)
				);
			} else {
				wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'  => $item['label'],
						'menu-item-url'    => get_post_type_archive_link( $item['post_type'] ),
						'menu-item-type'   => 'custom',
						'menu-item-status' => 'publish',
					)
				);
			}
		}

		$locations[ $location ] = $menu_id;
	}

	set_theme_mod( 'nav_menu_locations', $locations );
}

/**
 * 匯入示範講道、週報、活動與消息。
 */
function rongen_import_samples() {
	if ( ! current_user_can( 'edit_theme_options' ) ) {
		wp_die( esc_html__( '權限不足。', 'rongen' ) );
	}
	check_admin_referer( 'rongen_import_samples' );

	$samples = rongen_sample_content();

	foreach ( $samples as $sample ) {
		if ( rongen_find_post_by_title( $sample['title'], $sample['post_type'] ) ) {
			continue;
		}

		$post_id = wp_insert_post(
			array(
				'post_title'   => $sample['title'],
				'post_type'    => $sample['post_type'],
				'post_status'  => 'publish',
				'post_content' => $sample['content'],
				'post_excerpt' => isset( $sample['excerpt'] ) ? $sample['excerpt'] : '',
			)
		);

		if ( is_wp_error( $post_id ) || ! $post_id ) {
			continue;
		}

		foreach ( ( isset( $sample['meta'] ) ? $sample['meta'] : array() ) as $key => $value ) {
			update_post_meta( $post_id, '_rongen_' . $key, $value );
		}

		if ( ! empty( $sample['season'] ) ) {
			wp_set_object_terms( $post_id, $sample['season'], 'rongen_season' );
		}
	}

	wp_safe_redirect( admin_url( 'themes.php?page=rongen-setup&rongen_done=samples' ) );
	exit;
}
add_action( 'admin_post_rongen_import_samples', 'rongen_import_samples' );

/**
 * 示範內容資料。
 *
 * @return array<int, array<string, mixed>>
 */
/**
 * 本堂實際發佈過的週報清單。
 *
 * 標題與日期抄錄自本堂 Facebook 專頁上的貼文。設有聖餐的主日發的是「程序本」
 * 而非「週報」，標題照原樣保留。週報以掃描圖片形式發佈於 Facebook，
 * 故有核對過的貼文會寫入該週 permalink；尚未核對者不以專頁首頁冒充。
 *
 * 註：週報內頁含具名的代禱事項與奉獻徵信，屬個人資料，
 * 匯入的內容僅連向 Facebook 原貼文，不轉載這些內容。
 *
 * @return array<int, array<string, mixed>>
 */
function rongen_sample_bulletins() {
	$page = 'https://www.facebook.com/people/%E4%B8%AD%E8%8F%AF%E7%A6%8F%E9%9F%B3%E9%81%93-%E8%B7%AF%E5%BE%B7%E6%9C%83-%E6%A6%AE%E6%81%A9%E5%A0%82/61569452264190/';

	// 第四欄為該週貼文 permalink；沒有則不寫 link，避免按鈕開到專頁首頁。
	$list = array(
		array( '2026-08-02', '聖靈降臨後第十主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02Sm3KKNcnbw6VTjsCQK7t5uggaw9tw13UU9P4JZ6qxURnJhZXZLagAZSoTfR68RuJl&id=61569452264190' ),
		array( '2026-07-26', '聖靈降臨後第九主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid034bxupbPgtFbh7ZkxYQeXRqb7fCS5PGfptn5TW578EiACsMfDNc9GbMrzqai37obil&id=61569452264190' ),
		array( '2026-07-19', '聖靈降臨後第八主日程序本（包含聖餐禮）', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02FkNzgAvmVuwJ5JJhejprDH6xNqWHRYiDtjzvBspmARzFBQy34R8iJTdj6shV4VEml&id=61569452264190' ),
		array( '2026-07-12', '聖靈降臨後第七主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0ea7j7vyBhQPyjXBo8Aie1KuWYWUkBNBCzsa9ZGQmTnCC8oqEsE1J6woBjPNw8wU6l&id=61569452264190' ),
		array( '2026-07-05', '聖靈降臨後第六主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02sdbcDeYwGstjqoVdF7CrYeb1cb2VwNvynNWdZNxKSsv17jsuJh2cy5pjLv3DofdWl&id=61569452264190' ),
		array( '2026-06-28', '聖靈降臨後第五主日程序本（包含聖餐禮）', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02MT4uorGLbqNCcRiZ1mVrMbypmUzTKs6KuUMPAhGzpVjcj8bz4GyHU9jV5b3my2cYl&id=61569452264190' ),
		array( '2026-06-21', '聖靈降臨後第四主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02KZe4En2ANZ1wESmPoVfj6PoF1Fpfkqu5UX6pQrbP71pRfqKdMMXr2Wpqjk1TDfjFl&id=61569452264190' ),
		array( '2026-06-14', '聖靈降臨後第三主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0C4158nvSP3Eics1s2p8Ht9zeDffZzNUD9pMs57jEXrAu5cGNc89Q1CY4cdGZGxmGl&id=61569452264190' ),
		array( '2026-06-07', '聖靈降臨後第二主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0hd38hVHBVf9JdwtCGFtZEqcRbrwgB75CLe2bPVncTvFXdLfURbGrDDPo4Hb4vcQNl&id=61569452264190' ),
		array( '2026-05-31', '聖三一主日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02Ratot9JX964frjpwujtALT6yjPBALSmkjpsf8Hqz3CxcUgKEb4LgrsJwcpjU2wUKl&id=61569452264190' ),
		array( '2026-05-24', '聖靈降臨日週報', '聖靈降臨期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02pvSgvmr9WjWxQEVUFXXzEeMAfEbkcyMzdSzfy6dz2XGYGH4X6KPgERz3FjqDdoJQl&id=61569452264190' ),
		array( '2026-05-17', '復活期第七主日週報', '復活期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02bVLbzwZxXSy7v7EVcoLcgarbuyJUSakkhRegYx9GLAd6viFTM8WCev97YnAjxn43l&id=61569452264190' ),
		array( '2026-05-10', '復活期第六主日程序本（本主日有堅振禮、聖餐禮）', '復活期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid05EfKP8nHgTmJq3ux6qGMHC2R4qsLbEEyCdm8NdVkZ4gvKXA8NPwK67rAf7sVEQrhl&id=61569452264190' ),
		array( '2026-04-26', '復活期第四主日週報', '復活期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid08XtUg1KfFudF4TF8HS3mAGXx43poAp1np98VADxrc8e3VUAgBG68LUyqxWHmMk5Nl&id=61569452264190' ),
		array( '2026-04-12', '復活期第二主日週報', '復活期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0UpQfdM5iaoA3K4Mt7o6vGXc2BWYKiwNNoKGHin26NTexZnhwmtKcUfvVrTk9bD3Zl&id=61569452264190' ),
		array( '2026-03-22', '預苦期第五主日週報', '預苦期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02ihWECC676Ge6m9a54SWAubhmDzqiKKzHXScQyqZ75PDvYeNcZGSqF8Ko7wRykM7Ql&id=61569452264190' ),
		array( '2026-03-08', '週報 010 期', '預苦期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02geaJKVBY6TLnHT7v56xGpHHV6oH2jTPCjnUSNv2MoBtnfgKd2nUYwdKxpar4CdJyl&id=61569452264190' ),
		array( '2026-03-01', '週報 009 期', '預苦期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02zpZXmS8TnkX1NU1TvNHrXKZ5D9BsoXAEGUdSAuS9aFMMH5Xi77hqeQSMUbEcBMgQl&id=61569452264190' ),
		array( '2026-02-15', '週報 007 期', '顯現期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02rM7fiCBYHkctdiPxnTKre8NLSHeBQWbffv2y9VojHtnfL6FJVeS3CRfLsMBqG46yl&id=61569452264190' ),
		array( '2026-02-08', '週報 006 期', '顯現期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02JUQb2ffkgx2yqAjTcGuQ9uxQzqsHfBTx2dNmSTj9BB8Dg2TYELiq975YYWJW1E9El&id=61569452264190' ),
		array( '2026-02-01', '週報 005 期', '顯現期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02fntDi38yrELD81wM1vprLi7WoSkPsC699G2uWJgrPBR4sAeHmXYB4rdURNPzNcF3l&id=61569452264190' ),
		array( '2026-01-25', '週報 004 期', '顯現期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid02AQmbrqtoQbKT7xEnAnaVoqNzgMJZbh4YW1GpTugXUj77vt7u8VGChfFtn8Vo3KCil&id=61569452264190' ),
		array( '2026-01-11', '週報 002 期', '顯現期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid0318yNmfadqm8UvLbzNH2bEtfJJmnzxAzGmf4tXvWjm6ppBL5aUHBLLoqUswRA1Vrl&id=61569452264190' ),
		array( '2026-01-04', '週報 001 期', '聖誕期', 'https://www.facebook.com/permalink.php?story_fbid=pfbid031fNut2VimhLDRKkn16KazVyqwiLULvtp1aEu2WoQ4qA6AsWaTAGMtsfUyREEQc7Nl&id=61569452264190' ),
	);

	$items = array();
	foreach ( $list as $row ) {
		$has_post = ! empty( $row[3] );
		$title    = $row[1];
		$meta     = array( 'date' => $row[0] );
		if ( $has_post ) {
			$meta['link'] = $row[3];
		}

		$content = $has_post
			? "<p>本主日的週報已發佈於本堂 Facebook 專頁，內含崇拜程序、本週經課、報告事項與代禱事項。</p>\n<p>週報以圖片形式發佈，請點選上方按鈕開啟<strong>本週</strong>貼文查看完整內容。</p>"
			: '<p>本主日的週報以圖片形式發佈於本堂 Facebook 專頁。此筆尚未登錄該週貼文的直接連結，請至專頁依日期或標題「' . esc_html( $title ) . '」查找。</p>' .
				"\n<p><a href=\"" . esc_url( $page ) . "\" target=\"_blank\" rel=\"noopener\">開啟榮恩堂 Facebook 專頁 →</a></p>";

		$items[] = array(
			'post_type' => 'rongen_bulletin',
			'title'     => $title,
			'season'    => $row[2],
			'meta'      => $meta,
			'content'   => $content,
		);
	}

	return $items;
}

/**
 * 示範內容資料。
 *
 * 講道、活動與消息中標註來源者，取自本堂週報或 Facebook 專頁的實際內容；
 * 其餘為版位示範，待教會提供後替換。
 *
 * @return array<int, array<string, mixed>>
 */
function rongen_sample_content() {
	$items = array(
		array(
			// 講題、經文與講員抄錄自 2026-07-26（030 期）週報。
			'post_type' => 'rongen_sermon',
			'title'     => '使你歡喜丟棄一切的寶貝',
			'season'    => '聖靈降臨期',
			'meta'      => array(
				'date'      => '2026-07-26',
				'preacher'  => '巫奇真 教師',
				'scripture' => '馬太福音 13:44-46',
			),
			'excerpt'   => '天國好像寶貝藏在地裡，人遇見了就變賣一切買這塊地。不是勉強割捨，而是因為看見了更寶貴的，就歡歡喜喜地放手。',
			'content'   => "<p>耶穌用兩個很短的比喻講天國：一個人在地裡發現寶貝，就去變賣他一切所有的，買了那塊地；一個買賣人尋見一顆重價的珠子，也去變賣他一切所有的，買了這顆珠子。</p>\n<p>這兩個人都「變賣一切」，但經文特別提到的是他的心情——「歡喜」。他不是咬著牙犧牲，而是因為看見了更寶貴的東西，於是放手變得理所當然。</p>\n<h2>我們常把福音當成損失</h2>\n<p>我們談信仰時，常常在算自己要付出什麼、要放棄什麼。若心裡是這樣算的，信仰就成了一種負擔，而不是喜樂。</p>\n<h2>真正的順序是：先看見寶貝</h2>\n<p>比喻裡的順序很清楚：先遇見寶貝，然後才變賣一切。不是先努力捨棄，才配得到基督；而是因為基督已經是你的，其餘的才顯得可以放下。</p>\n<p class=\"footnote\">本篇講題、經文與講員抄錄自本堂 2026 年 7 月 26 日週報；內文為配合版面呈現所寫的摘要，實際講稿請由教會提供。</p>",
		),
		array(
			'post_type' => 'rongen_sermon',
			'title'     => '不要為自己積財，要在上帝面前富足',
			'season'    => '聖靈降臨期',
			'meta'      => array(
				'date'      => '2026-07-19',
				'preacher'  => '巫奇真 教師',
				'scripture' => '路加福音 12:13-21',
			),
			'excerpt'   => '無知的財主以為自己還有許多年日，卻不知當夜就要交出靈魂。真正的富足不在倉房裡，而在上帝面前。',
			'content'   => "<p>耶穌講這個比喻的時候，起因是一個人請祂主持分家產。耶穌沒有處理那樁糾紛，反而對眾人說：「你們要謹慎自守，免去一切的貪心。因為人的生命不在乎家道豐富。」</p>\n<p>比喻中的財主並不邪惡。他勤奮、有遠見、懂得規劃，甚至可以說是我們社會所讚許的那種人。他的問題只有一個：在他所有的盤算裡，沒有上帝，也沒有鄰舍。</p>\n<h2>律法：這也是我們的樣子</h2>\n<p>我們也常常這樣計算——再多存一點就安心了，再穩定一點就可以開始服事了。但上帝對財主說：「無知的人哪，今夜必要你的靈魂。」我們所倚靠的，隨時可能被取走。</p>\n<h2>福音：基督使我們富足</h2>\n<p>然而好消息是：使我們在上帝面前富足的，從來不是我們積攢了什麼，而是基督為我們捨了什麼。祂本來富足，卻為我們成了貧窮，叫我們因祂的貧窮可以成為富足。</p>\n<p>今天你在這裡領受祂的身體與血，就是領受這份富足。你什麼都不必先預備好，只要空著手來。</p>",
		),
		array(
			'post_type' => 'rongen_sermon',
			'title'     => '你們要休息，要知道我是上帝',
			'season'    => '聖靈降臨期',
			'meta'      => array(
				'date'      => '2026-07-12',
				'preacher'  => '巫奇真 教師',
				'scripture' => '詩篇 46',
			),
			'excerpt'   => '地雖改變，山雖搖動到海心，我們也不害怕。因為有一道河的分汊使上帝的城歡喜。',
			'content'   => "<p>詩篇四十六篇寫在一個看似天崩地裂的處境裡。地在改變，山在搖動，海水匉訇翻騰。詩人沒有說這些不會發生，他說的是：即使發生，我們也不害怕。</p>\n<h2>上帝是我們的避難所</h2>\n<p>「上帝是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。」這句話不是安慰性的說詞，而是事實的陳述。避難所不是讓風浪停止，而是讓你在風浪中有地方可躲。</p>\n<h2>你們要休息</h2>\n<p>「你們要休息，要知道我是上帝。」原文帶著「停手」的意思——停下你想靠自己解決一切的手。這正是主日崇拜在做的事：你停下來，讓上帝作工。</p>",
		),
		array(
			'post_type' => 'rongen_sermon',
			'title'     => '因信稱義：宗教改革主日',
			'season'    => '教會改革紀念',
			'meta'      => array(
				'date'      => '2026-06-21',
				'preacher'  => '白霈德 牧師',
				'scripture' => '羅馬書 3:19-28',
			),
			'excerpt'   => '如今上帝的義在律法以外已經顯明出來。人稱義是因著信，不在乎遵行律法。',
			'content'   => "<p>1517 年，馬丁路德把九十五條論綱釘在威登堡教堂的門上。他要處理的不是政治，而是一個牧養上的問題：一個被罪困擾的良心，要怎樣才能得著平安？</p>\n<p>他在羅馬書裡找到答案：「人稱義是因著信，不在乎遵行律法。」這不是路德的發明，而是保羅的話，是聖經本身的教導。</p>\n<h2>我們今天仍需要這個答案</h2>\n<p>宗教改革不是一件過去的事。只要人心仍然想靠自己的表現站立在上帝面前，這個福音就仍然是每天都需要聽見的消息。</p>",
		),
		array(
			// 詳細資訊取自 2026-07 專頁貼文與 030 期週報報告事項。
			'post_type' => 'rongen_event',
			'title'     => '信徒神學線上講座：以領受聖餐之情感恩祈禱・凡事謝恩',
			'meta'      => array(
				'date'     => '2026-08-08',
				'time'     => '上午 9:00－12:00',
				'location' => '線上直播（總會主辦）',
			),
			'excerpt'   => '總會舉辦的信徒神學線上講座，由賴彼得牧師（Rev. Larry A. Peters）主講、白霈德牧師／博士中譯。請於 8/6 前報名。',
			'content'   => "<p>中華福音道路德會總會舉辦「信徒神學線上講座」，本堂弟兄姊妹歡迎一同報名參加。</p>\n<ul>\n<li><strong>主題</strong>：以領受聖餐之情感恩祈禱：凡事謝恩</li>\n<li><strong>時間</strong>：2026 年 8 月 8 日（六）上午 9:00－12:00</li>\n<li><strong>講員</strong>：賴彼得牧師 Rev. Larry A. Peters</li>\n<li><strong>中譯</strong>：白霈德牧師／博士</li>\n<li><strong>方式</strong>：線上直播</li>\n</ul>\n<p>本講座將從主的晚餐（聖餐）出發，深入探討感恩祈禱的信仰意義。結合舊約（特別是詩篇）、早期猶太群體、基督教會傳統，以及主禱文的祈禱實踐，幫助我們學習在基督裡「凡事謝恩」。</p>\n<p>請於 8 月 6 日前完成報名，主辦方將於 8 月 7 日寄發講座連結。報名方式與最新訊息請見本堂 Facebook 專頁或教會 LINE 群組。</p>",
		),
		array(
			// 取自 030 期週報「教會＆肢體」代禱事項。
			'post_type' => 'rongen_event',
			'title'     => '九月社區兒童工作',
			'meta'      => array(
				'date'     => '2026-09-01',
				'time'     => '詳細時間另行公告',
				'location' => '榮恩堂',
			),
			'excerpt'   => '教會將於九月開始社區兒童工作，目前正在籌備階段，也請弟兄姊妹一同為此禱告。',
			'content'   => "<p>教會將於九月開始新一階段的社區兒童工作。這延續了榮恩堂長年以來以兒童與家庭為重心的服事——從主日學、課輔班，到陪伴社區的孩子與他們的父母。</p>\n<p>目前仍在籌備階段，確切的時間與內容會在週報與 Facebook 專頁公告。也請弟兄姊妹為這項工作、以及參與服事的同工一同禱告。</p>",
		),
		array(
			// 取自 2026-05-29 專頁貼文與 030 期週報「總會」代禱事項。
			'post_type' => 'rongen_event',
			'title'     => '總會暑期營會（兒童／成人）',
			'meta'      => array(
				'date'     => '2026-08-02',
				'time'     => '詳見總會公告',
				'location' => '聖道教會等地',
			),
			'excerpt'   => '總會暑期舉辦兩場營會，分別適合兒童與成人參加。有興趣者可洽巫奇真教師。',
			'content'   => "<p>總會於暑期舉辦兩場營會，一場適合兒童、一場適合成人參加。</p>\n<p>其中兒童聯合英語夏令營於 8 月 2 日至 5 日在聖道教會舉行，由 Frank 牧師擔任講員。</p>\n<p>有興趣參加的弟兄姊妹，請洽駐堂教師巫奇真教師（0986-375-031）。</p>",
		),
		array(
			// 取自 2026-01-20 專頁貼文（主日證道錄影，YouTube）。
			'post_type' => 'post',
			'title'     => '主日證道錄影陸續發佈於 YouTube',
			'excerpt'   => '無法到場的弟兄姊妹，可以在 YouTube 上收看主日證道錄影。',
			'content'   => "<p>本堂已開始將主日證道錄影上傳至 YouTube，方便因身體、工作或距離而無法到場的弟兄姊妹在家收看。</p>\n<p>影片連結會隨著每週的週報一同發佈於本堂 Facebook 專頁。若你想收看較早的證道，也歡迎直接聯繫駐堂教師。</p>",
		),
		array(
			// 取自 2025-12-19 專頁貼文。
			'post_type' => 'post',
			'title'     => '平安夜晚禱：敬邀弟兄姊妹前來參加',
			'excerpt'   => '平安夜舉行「晚禱」禮儀崇拜，一同聆聽上帝的話，並頌唱聖誕節期的詩歌。',
			'content'   => "<p>本堂於平安夜舉行「平安夜晚禱」禮儀崇拜，敬邀弟兄姊妹前來參加。</p>\n<p>當晚除了有上帝寶貴的話語可以聆聽，更會一起唱很多美妙的聖誕節期詩歌，享受基督所要賜給我們的屬天的寧靜。</p>\n<p>歡迎邀請家人與鄰舍一同前來。</p>",
		),
		array(
			// 取自 2025-11-29 專頁貼文（將臨期第一主日）。
			'post_type' => 'post',
			'title'     => '新的教會年開始了',
			'excerpt'   => '今天是新的教會年開始，四週之後，讓我們一起歡慶救主基督耶穌的降生。',
			'content'   => "<p>今天是新的教會年開始。教會年不從一月起算，而是從將臨期的第一主日開始——我們以等候基督降臨作為一年的起點。</p>\n<p>四週之後，讓我們一起歡慶救主基督耶穌的降生。</p>",
		),
		array(
			'post_type' => 'post',
			'title'     => '關於初次來訪：你不需要事先準備什麼',
			'excerpt'   => '常有人問，第一次來教會要注意什麼。答案是：不需要準備，坐下來就好。',
			'content'   => "<p>不少朋友第一次要走進教會時會有點緊張——擔心不會唱詩、不知道什麼時候該站起來、怕被問問題。</p>\n<p>其實完全不必擔心。入口備有崇拜手冊，程序都印在裡面；跟不上時坐著看也沒關係；我們也不會請訪客上台自我介紹。</p>\n<p>崇拜大約一小時。結束後如果你願意留下來喝杯茶、聊幾句，我們很歡迎；如果你想安靜地離開，那也完全沒有問題。</p>",
		),
	);

	return array_merge( $items, rongen_sample_bulletins() );
}
