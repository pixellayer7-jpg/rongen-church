<?php
/**
 * 樣板輔助函式與共用資料。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 取得單一自訂欄位。
 */
function rongen_field( $key, $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	return (string) get_post_meta( $post_id, '_rongen_' . $key, true );
}

/**
 * 將 YYYY-MM-DD 轉為「2026 年 7 月 26 日（主日）」樣式。
 */
function rongen_format_date( $raw, $with_weekday = true ) {
	if ( ! $raw ) {
		return '';
	}
	$time = strtotime( $raw );
	if ( ! $time ) {
		return $raw;
	}

	$weekdays = array( '主日', '週一', '週二', '週三', '週四', '週五', '週六' );
	$text     = wp_date( 'Y 年 n 月 j 日', $time );

	if ( $with_weekday ) {
		$text .= '（' . $weekdays[ (int) wp_date( 'w', $time ) ] . '）';
	}

	return $text;
}

/**
 * 取得文章日期（優先使用自訂的聚會日期）。
 */
function rongen_display_date( $post_id = null ) {
	$custom = rongen_field( 'date', $post_id );
	return $custom ? rongen_format_date( $custom ) : get_the_date( 'Y 年 n 月 j 日', $post_id );
}

/**
 * 每週聚會表。
 *
 * @return array<int, array{name:string, when:string, note:string}>
 */
function rongen_schedule() {
	return array(
		array(
			'name' => '主日崇拜',
			'when' => rongen_info( 'rongen_service_time' ),
			'note' => '禮儀崇拜程序，內含認罪與赦罪、入壇詞、三段讀經、證道與祝福；設有聖餐的主日另發程序本。',
		),
		array(
			'name' => '主日學／兒童時間',
			'when' => '主日崇拜後',
			'note' => '以小要理問答與聖經故事教導孩子，歡迎家長帶孩子一同前來。',
		),
		array(
			'name' => '查經與禱告會',
			'when' => '平日晚間（依當期公告）',
			'note' => '按書卷逐段查考聖經，並為教會、社區與宣教事工禱告。',
		),
		array(
			'name' => '關懷探訪',
			'when' => '平日，事先聯繫',
			'note' => '駐堂教師與同工前往社區、家庭與長者關懷探訪，歡迎預約。',
		),
	);
}

/**
 * 路德宗信仰的四個重點（首頁與信仰告白頁共用）。
 *
 * @return array<int, array{title:string, latin:string, text:string}>
 */
function rongen_pillars() {
	return array(
		array(
			'title' => '惟獨聖經',
			'latin' => 'Sola Scriptura',
			'text'  => '新舊約聖經是上帝所默示的話，是教會信仰與生活惟一的準則。凡教導必須以聖經為根據。',
		),
		array(
			'title' => '惟獨恩典',
			'latin' => 'Sola Gratia',
			'text'  => '人得救不憑自己的努力或功德，全然出於上帝白白賜下的恩典。',
		),
		array(
			'title' => '惟獨信心',
			'latin' => 'Sola Fide',
			'text'  => '我們因信基督而被稱為義。這信心也是聖靈藉著聖道與聖禮在人心中所做的工。',
		),
		array(
			'title' => '惟獨基督',
			'latin' => 'Solus Christus',
			'text'  => '耶穌基督是上帝與人之間惟一的中保，祂的十字架與復活是我們一切安慰的根基。',
		),
	);
}

/**
 * 中華福音道路德會在台灣的教會與佈道所。
 * 資料來源：celc.org.tw／路德會教會一覽。
 *
 * @return array<int, array{name:string, city:string, address:string, phone:string, note:string}>
 */
function rongen_celc_churches() {
	return array(
		array( 'name' => '松山教會', 'city' => '台北', 'address' => '台北市信義區松德路 25 巷 58 號 B1', 'phone' => '0921-262-106', 'note' => '佈道所' ),
		array( 'name' => '聖道教會', 'city' => '新竹', 'address' => '新竹市東區東大路一段 132 號 12 樓', 'phone' => '03-533-1215', 'note' => '佈道所・附設越南語團契' ),
		array( 'name' => '聖三一堂', 'city' => '南投', 'address' => '南投縣南投市虎山路 104 號', 'phone' => '0972-104-524', 'note' => '佈道所' ),
		array( 'name' => '救恩堂', 'city' => '嘉義', 'address' => '嘉義市西區建成街 19 號', 'phone' => '05-285-2382', 'note' => '經濟自立教會' ),
		array( 'name' => '靈恩堂', 'city' => '斗六', 'address' => '雲林縣斗六市城頂街 98 號', 'phone' => '05-532-1370', 'note' => '經濟自立教會' ),
		array( 'name' => '榮恩堂', 'city' => '台南白河', 'address' => '台南市白河區仙草里仙草 21 之 4 號', 'phone' => '06-685-7444', 'note' => '經濟自立教會・本堂' ),
		array( 'name' => '永生堂', 'city' => '台北', 'address' => '台北市中正區潮州街 16 號', 'phone' => '02-2351-4093', 'note' => '伙伴教會' ),
		array( 'name' => '板橋和平堂', 'city' => '新北', 'address' => '新北市板橋區民權路 202 巷 17 弄 70 號 2 樓', 'phone' => '02-2968-8148', 'note' => '伙伴教會' ),
		array( 'name' => '頌恩堂', 'city' => '台南', 'address' => '台南市北區實踐街 39 巷 57 號', 'phone' => '06-251-6108', 'note' => '伙伴教會' ),
		array( 'name' => '施恩堂／南部神學教育中心', 'city' => '嘉義', 'address' => '嘉義市東區延平街 140 號', 'phone' => '0972-104-524', 'note' => '籌備中' ),
		array( 'name' => '北部神學教育中心／宣道廳', 'city' => '台北', 'address' => '台北市中山區松江路 38 巷 15-5 號', 'phone' => '02-2775-4145', 'note' => '總會所在地' ),
	);
}

/**
 * 區塊標題（小標 + 主標 + 金色分隔線）。
 */
function rongen_section_heading( $kicker, $title, $align = 'center' ) {
	printf(
		'<header class="section-head section-head--%1$s">%2$s<h2 class="section-head__title">%3$s</h2><span class="rule" aria-hidden="true"></span></header>',
		esc_attr( $align ),
		$kicker ? '<p class="kicker">' . esc_html( $kicker ) . '</p>' : '',
		wp_kses_post( $title )
	);
}

/**
 * 卡片式文章／講道／活動摘要。
 */
function rongen_card( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$type    = get_post_type( $post_id );
	$labels  = array(
		'rongen_sermon'   => '講道',
		'rongen_bulletin' => '主日週報',
		'rongen_event'    => '教會活動',
		'post'            => '教會消息',
	);
	$label = isset( $labels[ $type ] ) ? $labels[ $type ] : '';
	?>
	<article class="card">
		<a class="card__media" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" tabindex="-1" aria-hidden="true">
			<?php if ( has_post_thumbnail( $post_id ) ) : ?>
				<?php echo get_the_post_thumbnail( $post_id, 'rongen-card', array( 'loading' => 'lazy', 'alt' => '' ) ); ?>
			<?php else : ?>
				<span class="card__placeholder"><?php rongen_cross_mark(); ?></span>
			<?php endif; ?>
		</a>
		<div class="card__body">
			<p class="card__meta">
				<?php if ( $label ) : ?><span class="tag"><?php echo esc_html( $label ); ?></span><?php endif; ?>
				<time><?php echo esc_html( rongen_display_date( $post_id ) ); ?></time>
			</p>
			<h3 class="card__title">
				<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php echo esc_html( get_the_title( $post_id ) ); ?></a>
			</h3>
			<?php if ( 'rongen_sermon' === $type && rongen_field( 'scripture', $post_id ) ) : ?>
				<p class="card__scripture"><?php echo esc_html( rongen_field( 'scripture', $post_id ) ); ?></p>
			<?php endif; ?>
			<p class="card__excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt( $post_id ), 55, '……' ) ); ?></p>
		</div>
	</article>
	<?php
}

/**
 * 十字架裝飾圖示。
 */
function rongen_cross_mark() {
	echo '<svg class="cross-mark" viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path d="M10.6 0h2.8v9.4H24v2.8H13.4V36h-2.8V12.2H0V9.4h10.6z"/></svg>';
}

/**
 * 分頁導覽。
 */
function rongen_pagination() {
	the_posts_pagination(
		array(
			'mid_size'  => 1,
			'prev_text' => '← 上一頁',
			'next_text' => '下一頁 →',
			'class'     => 'pagination',
		)
	);
}

/**
 * 取得 Google 地圖嵌入網址（不需 API 金鑰）。
 */
function rongen_map_embed_url() {
	$lat = rongen_info( 'rongen_map_lat' );
	$lng = rongen_info( 'rongen_map_lng' );
	return sprintf( 'https://maps.google.com/maps?q=%s,%s&z=16&output=embed', rawurlencode( $lat ), rawurlencode( $lng ) );
}

/**
 * 地圖底層備援內容。當 Google 地圖無法載入時（離線、企業網路封鎖、
 * 瀏覽器阻擋第三方框架），訪客仍能看到地址並開啟地圖連結。
 */
function rongen_map_fallback() {
	?>
	<div class="map-fallback">
		<p class="map-fallback__label"><?php esc_html_e( '聚會地點', 'rongen' ); ?></p>
		<p class="map-fallback__address"><?php echo esc_html( rongen_info( 'rongen_address' ) ); ?></p>
		<a class="map-fallback__link" href="<?php echo esc_url( rongen_info( 'rongen_map_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '在 Google 地圖開啟 →', 'rongen' ); ?></a>
	</div>
	<?php
}

/**
 * 依模板檔名尋找對應頁面連結，找不到時退回首頁。
 */
function rongen_page_url( $template ) {
	$pages = get_pages(
		array(
			'meta_key'   => '_wp_page_template',
			'meta_value' => 'page-templates/' . $template,
			'number'     => 1,
		)
	);
	return $pages ? get_permalink( $pages[0]->ID ) : home_url( '/' );
}
