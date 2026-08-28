<?php
/**
 * 404 找不到頁面。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title'      => __( '找不到這個頁面', 'rongen' ),
		'kicker'     => '404',
		'text'       => __( '此頁面可能已移除或網址有誤。以下連結或許能帶你到想去的地方。', 'rongen' ),
		'breadcrumb' => false,
	)
);
?>

<div class="section">
	<div class="wrap wrap--narrow" style="text-align:center">
		<div style="margin:0 auto 2.5rem;max-width:28rem"><?php get_search_form(); ?></div>
		<div class="btn-row" style="justify-content:center">
			<a class="btn" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( '回到首頁', 'rongen' ); ?></a>
			<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_sermon' ) ); ?>"><?php esc_html_e( '講道存檔', 'rongen' ); ?></a>
			<a class="btn btn--ghost" href="<?php echo esc_url( rongen_page_url( 'template-contact.php' ) ); ?>"><?php esc_html_e( '聯絡我們', 'rongen' ); ?></a>
		</div>
	</div>
</div>

<?php get_footer(); ?>
