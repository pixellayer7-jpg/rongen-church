<?php
/**
 * 文章列表（教會消息）。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title'      => is_home() && get_option( 'page_for_posts' ) ? get_the_title( get_option( 'page_for_posts' ) ) : __( '教會消息', 'rongen' ),
		'kicker'     => __( '公告・活動・紀錄', 'rongen' ),
		'text'       => __( '本堂的最新消息、聚會調整與活動紀錄。更即時的動態也會同步發佈於 Facebook 專頁。', 'rongen' ),
		'breadcrumb' => ! is_front_page(),
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
					<p><?php esc_html_e( '目前尚無消息。', 'rongen' ); ?></p>
				<?php endif; ?>
			</div>
			<?php get_sidebar(); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
