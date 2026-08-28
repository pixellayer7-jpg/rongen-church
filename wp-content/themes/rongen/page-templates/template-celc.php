<?php
/**
 * Template Name: 總會與各堂會
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
			'kicker' => __( '中華福音道路德會', 'rongen' ),
			'text'   => __( '榮恩堂是財團法人中華福音道路德會所屬的教會之一。以下為本會在台灣的各教會、佈道所與伙伴教會。', 'rongen' ),
		)
	);
	?>

	<section class="section">
		<div class="wrap wrap--narrow prose">
			<h2><?php esc_html_e( '關於總會', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '中華福音道路德會本於聖道與聖禮，致力於發展合乎聖經的教會拓殖與宣教事工，並積極從事文字宣教事工與神學教育領域。所屬的協同出版社以文字事工回應上帝的聖道。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '總會行政部辦公室設於台北市中山區松江路 38 巷 15-5 號，辦公時間為週一至週五 9:00－18:00。', 'rongen' ); ?></p>
			<p>
				<a href="<?php echo esc_url( rongen_info( 'rongen_celc_url' ) ); ?>" target="_blank" rel="noopener"><?php echo esc_html( rongen_info( 'rongen_celc_url' ) ); ?></a>
			</p>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap">
			<?php rongen_section_heading( __( '教會一覽', 'rongen' ), __( '本會在台灣的教會與佈道所', 'rongen' ), 'center' ); ?>
			<?php echo do_shortcode( '[rongen_churches]' ); ?>
			<div class="notice" style="margin-top:2.5rem">
				<p><?php esc_html_e( '各堂會的聚會時間與聯絡方式可能調整，最新資訊請以總會網站公告為準。', 'rongen' ); ?></p>
			</div>
			<div class="btn-row" style="justify-content:center">
				<a class="btn" href="https://celc.org.tw/lutheran-church/" target="_blank" rel="noopener"><?php esc_html_e( '總會教會一覽頁', 'rongen' ); ?></a>
			</div>
		</div>
	</section>

	<?php if ( trim( get_the_content() ) ) : ?>
		<section class="section">
			<div class="wrap wrap--narrow prose"><?php the_content(); ?></div>
		</section>
	<?php endif; ?>

	<?php
endwhile;

get_footer();
