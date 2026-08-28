<?php
/**
 * 單篇教會活動。
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
			'kicker' => __( '教會活動', 'rongen' ),
		)
	);

	$location = rongen_field( 'location' );
	?>

	<article class="section">
		<div class="wrap wrap--narrow">
			<dl class="sermon-meta">
				<div>
					<dt><?php esc_html_e( '日期', 'rongen' ); ?></dt>
					<dd><?php echo esc_html( rongen_display_date() ); ?></dd>
				</div>
				<?php if ( rongen_field( 'time' ) ) : ?>
					<div>
						<dt><?php esc_html_e( '時間', 'rongen' ); ?></dt>
						<dd><?php echo esc_html( rongen_field( 'time' ) ); ?></dd>
					</div>
				<?php endif; ?>
				<div>
					<dt><?php esc_html_e( '地點', 'rongen' ); ?></dt>
					<dd><?php echo esc_html( $location ? $location : rongen_info( 'rongen_church_short' ) . '會堂' ); ?></dd>
				</div>
			</dl>

			<?php if ( has_post_thumbnail() ) : ?>
				<figure style="margin:0 0 2.5rem"><?php the_post_thumbnail( 'rongen-hero' ); ?></figure>
			<?php endif; ?>

			<div class="prose">
				<?php the_content(); ?>
			</div>

			<div class="notice" style="margin-top:2.5rem">
				<p><?php esc_html_e( '想進一步了解或報名，歡迎聯繫', 'rongen' ); ?> <?php echo esc_html( rongen_info( 'rongen_teacher' ) ); ?>　<?php echo esc_html( rongen_info( 'rongen_mobile' ) ); ?></p>
			</div>

			<nav class="btn-row">
				<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_event' ) ); ?>"><?php esc_html_e( '回到活動列表', 'rongen' ); ?></a>
			</nav>
		</div>
	</article>

	<?php
endwhile;

get_footer();
