<?php
/**
 * 一般彙整頁（分類、標籤、節期、日期）。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title' => wp_strip_all_tags( get_the_archive_title() ),
		'text'  => wp_strip_all_tags( get_the_archive_description() ),
	)
);
?>

<div class="section">
	<div class="wrap">
		<div class="content-layout">
			<div>
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
					<p><?php esc_html_e( '此分類目前沒有內容。', 'rongen' ); ?></p>
				<?php endif; ?>
			</div>
			<?php get_sidebar(); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
