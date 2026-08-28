<?php
/**
 * Template Name: 聯絡與交通
 *
 * @package rongen
 */

get_header();

while ( have_posts() ) :
	the_post();

	get_template_part(
		'template-parts/page-hero',
		null,
		array(
			'title'  => get_the_title(),
			'kicker' => __( '初次來訪', 'rongen' ),
			'text'   => __( '不需要事先報名或通知，主日早晨直接前來即可。若想先聯繫，以下是我們的聯絡方式。', 'rongen' ),
		)
	);
	?>

	<section class="section">
		<div class="wrap">
			<div class="split">
				<div class="split__body">
					<p class="kicker"><?php esc_html_e( '聯絡資訊', 'rongen' ); ?></p>
					<h2><?php echo esc_html( rongen_info( 'rongen_church_name' ) ); ?></h2>
					<?php echo do_shortcode( '[rongen_contact]' ); ?>
					<div class="btn-row">
						<a class="btn" href="<?php echo esc_url( rongen_info( 'rongen_map_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '在 Google 地圖開啟', 'rongen' ); ?></a>
						<?php if ( rongen_info( 'rongen_facebook' ) ) : ?>
							<a class="btn btn--ghost" href="<?php echo esc_url( rongen_info( 'rongen_facebook' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Facebook 私訊', 'rongen' ); ?></a>
						<?php endif; ?>
					</div>
				</div>
				<div>
					<?php echo do_shortcode( '[rongen_map height="520"]' ); ?>
				</div>
			</div>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap">
			<?php rongen_section_heading( __( '交通方式', 'rongen' ), __( '如何抵達白河仙草', 'rongen' ), 'center' ); ?>
			<div class="give-grid">
				<div class="give-card">
					<h3><?php esc_html_e( '自行開車', 'rongen' ); ?></h3>
					<p><?php esc_html_e( '國道 1 號新營交流道下，接台 1 線轉 172 縣道往白河、關子嶺方向，於仙草里附近依指標抵達。國道 3 號則由白河交流道下，轉 172 縣道往東行。', 'rongen' ); ?></p>
					<p><?php esc_html_e( '教會周邊可路邊停車。', 'rongen' ); ?></p>
				</div>
				<div class="give-card">
					<h3><?php esc_html_e( '大眾運輸', 'rongen' ); ?></h3>
					<p><?php esc_html_e( '搭乘台鐵至新營站，轉乘黃幹線公車至白河站，再轉乘往關子嶺方向的公車於仙草一帶下車。班次較少，建議事先查詢時刻。', 'rongen' ); ?></p>
					<p><?php esc_html_e( '若交通不便，歡迎事先來電，我們可協助安排接送。', 'rongen' ); ?></p>
				</div>
				<div class="give-card">
					<h3><?php esc_html_e( '初次來訪', 'rongen' ); ?></h3>
					<p><?php esc_html_e( '建議在崇拜開始前 10 分鐘抵達。入口有同工接待，會協助你找到座位並取得崇拜手冊。', 'rongen' ); ?></p>
					<p><?php esc_html_e( '穿著不拘，帶孩子同來也完全歡迎。', 'rongen' ); ?></p>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="wrap wrap--narrow">
			<?php rongen_section_heading( __( '想與我們聯繫', 'rongen' ), __( '寫封信或撥通電話', 'rongen' ) ); ?>
			<p><?php esc_html_e( '若你有信仰上的問題、需要代禱，或想安排洗禮、婚禮、告別禮拜等事宜，歡迎直接聯繫駐堂教師。', 'rongen' ); ?></p>

			<?php if ( trim( get_the_content() ) ) : ?>
				<div class="prose" style="margin-top:2rem"><?php the_content(); ?></div>
			<?php else : ?>
				<div class="notice" style="margin-top:2rem">
					<p><?php esc_html_e( '若要在此加入聯絡表單，可安裝 Contact Form 7 或 WPForms 外掛，建立表單後把簡碼貼進本頁編輯器即可，表單會自動套用本主題樣式。', 'rongen' ); ?></p>
				</div>
			<?php endif; ?>

			<div class="btn-row">
				<a class="btn" href="tel:<?php echo esc_attr( preg_replace( '/[^0-9+]/', '', rongen_info( 'rongen_mobile' ) ) ); ?>"><?php echo esc_html( rongen_info( 'rongen_teacher' ) . '　' . rongen_info( 'rongen_mobile' ) ); ?></a>
				<a class="btn btn--ghost" href="mailto:<?php echo esc_attr( rongen_info( 'rongen_email' ) ); ?>"><?php echo esc_html( rongen_info( 'rongen_email' ) ); ?></a>
			</div>
		</div>
	</section>

	<?php
endwhile;

get_footer();
