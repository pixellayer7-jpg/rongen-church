<?php
/**
 * 單篇文章（教會消息）。
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
			'kicker' => rongen_display_date(),
		)
	);
	?>

	<div class="section">
		<div class="wrap">
			<div class="content-layout">
				<article <?php post_class(); ?>>
					<?php if ( has_post_thumbnail() ) : ?>
						<figure style="margin:0 0 2.5rem">
							<?php the_post_thumbnail( 'rongen-hero', array( 'loading' => 'eager' ) ); ?>
						</figure>
					<?php endif; ?>

					<div class="prose">
						<?php the_content(); ?>
					</div>

					<?php
					$categories = get_the_category_list( '、' );
					if ( $categories ) :
						?>
						<p style="margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid var(--line);font-size:.9rem">
							<?php esc_html_e( '分類：', 'rongen' ); ?><?php echo wp_kses_post( $categories ); ?>
						</p>
					<?php endif; ?>

					<?php
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
					?>
				</article>
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>

	<?php
endwhile;

get_footer();
