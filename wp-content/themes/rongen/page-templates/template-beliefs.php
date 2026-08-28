<?php
/**
 * Template Name: 信仰告白
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
			'kicker' => __( '所信・所教・所告白', 'rongen' ),
			'text'   => __( '榮恩堂隸屬中華福音道路德會，本於聖道與聖禮，完全認同《協同書》所載的信仰立場。', 'rongen' ),
		)
	);
	?>

	<section class="section">
		<div class="wrap">
			<?php rongen_section_heading( __( '宗教改革的四個「惟獨」', 'rongen' ), __( '我們信仰的根基', 'rongen' ), 'center' ); ?>
			<?php echo do_shortcode( '[rongen_pillars]' ); ?>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap wrap--narrow prose">
			<h2><?php esc_html_e( '何謂路德宗', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '「路德宗」指的是 1517 年馬丁路德開啟教會改革運動之後，至 1580 年《協同書》正式發行，凡以路德會為名並完全認同《協同書》信仰立場的教會。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '我們不是因為保守才拒絕改變，也不是為了「一向都這麼做」而守舊。我們持守歷史的禮儀，是因為我們委身於聖經、委身於《協同書》，並以感恩的心領受路德宗的傳統，包括其中的禮儀與儀節。', 'rongen' ); ?></p>

			<h2><?php esc_html_e( '聖經', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '新舊約聖經是聖靈所默示的，是無誤、無謬的上帝之言，也是信仰與生活惟一的準則與規範。教會的一切教導都必須受聖經檢驗。', 'rongen' ); ?></p>

			<h2><?php esc_html_e( '信條', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '1580 年出版的《協同書》收錄了完整的路德宗信條文獻，其中包括《未經修改的奧斯堡信條》、《小要理問答》與《大要理問答》。我們相信這些信條正確地闡述了聖經的教導。', 'rongen' ); ?></p>

			<h2><?php esc_html_e( '聖禮', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '洗禮與聖餐不只是象徵或紀念。在洗禮中，上帝的名被加在人身上，罪得赦免；在聖餐中，基督真實地將祂的身體與血，同著餅與酒賜給領受的人。這是上帝主動施恩的方式。', 'rongen' ); ?></p>

			<h2><?php esc_html_e( '律法與福音', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '正確地分辨律法與福音，是路德宗講道的核心。律法指出人的罪與無力，福音則宣告基督已經為我們成就一切。每一篇講道都應當同時包含這兩者。', 'rongen' ); ?></p>

			<?php if ( trim( get_the_content() ) ) : ?>
				<?php the_content(); ?>
			<?php endif; ?>
		</div>
	</section>

	<section class="section">
		<div class="wrap wrap--narrow">
			<div class="notice">
				<p><?php esc_html_e( '想更深入了解路德宗的信仰背景，可參閱總會網站關於《協同書》的信仰告白與路德會禮儀崇拜的說明。', 'rongen' ); ?></p>
			</div>
			<div class="btn-row">
				<a class="btn" href="<?php echo esc_url( rongen_info( 'rongen_celc_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '前往總會網站', 'rongen' ); ?></a>
				<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_sermon' ) ); ?>"><?php esc_html_e( '聽聽我們的講道', 'rongen' ); ?></a>
			</div>
		</div>
	</section>

	<?php
endwhile;

get_footer();
