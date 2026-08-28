<?php
/**
 * 搜尋結果。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title'  => __( '搜尋結果', 'rongen' ),
		'kicker' => get_search_query(),
		/* translators: %d: 搜尋結果篇數 */
		'text'   => sprintf( __( '共找到 %d 筆內容。', 'rongen' ), (int) $wp_query->found_posts ),
	)
);
?>

<div class="section">
	<div class="wrap">
		<div class="content-layout">
			<div>
				<div style="margin-bottom:2.5rem;max-width:28rem"><?php get_search_form(); ?></div>

				<?php if ( have_posts() ) : ?>
					<div class="card-grid">
						<?php
						while ( have_posts() ) :
							the_post();
							rongen_card();
						endwhile;
						?>
					</div>
					<?php rongen_pagination(); ?>
				<?php else : ?>
					<p><?php esc_html_e( '找不到符合的內容，請換個關鍵字再試一次。', 'rongen' ); ?></p>
				<?php endif; ?>
			</div>
			<?php get_sidebar(); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
