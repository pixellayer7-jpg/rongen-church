<?php
/**
 * 單篇主日週報。
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
			'kicker' => __( '主日週報', 'rongen' ),
			'text'   => rongen_display_date(),
		)
	);

	$pdf  = rongen_field( 'pdf' );
	$link = rongen_field( 'link' );
	?>

	<article class="section">
		<div class="wrap wrap--narrow">
			<?php if ( $pdf || $link ) : ?>
				<div class="btn-row" style="margin-top:0;margin-bottom:2.5rem">
					<?php if ( $pdf ) : ?>
						<a class="btn" href="<?php echo esc_url( $pdf ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '下載週報 PDF', 'rongen' ); ?></a>
					<?php endif; ?>
					<?php if ( $link ) : ?>
						<a class="btn<?php echo $pdf ? ' btn--ghost' : ''; ?>" href="<?php echo esc_url( $link ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '在 Facebook 查看本週週報', 'rongen' ); ?></a>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<div class="prose">
				<?php the_content(); ?>
			</div>

			<nav class="btn-row" style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--line)">
				<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_bulletin' ) ); ?>"><?php esc_html_e( '回到週報列表', 'rongen' ); ?></a>
			</nav>
		</div>
	</article>

	<?php
endwhile;

get_footer();
