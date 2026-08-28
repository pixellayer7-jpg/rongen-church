<?php
/**
 * 單篇講道。
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
			'kicker' => __( '講道', 'rongen' ),
			'text'   => rongen_field( 'scripture' ),
		)
	);

	$video = rongen_field( 'video' );
	$audio = rongen_field( 'audio' );
	?>

	<article class="section">
		<div class="wrap wrap--narrow">
			<dl class="sermon-meta">
				<div>
					<dt><?php esc_html_e( '日期', 'rongen' ); ?></dt>
					<dd><?php echo esc_html( rongen_display_date() ); ?></dd>
				</div>
				<?php if ( rongen_field( 'preacher' ) ) : ?>
					<div>
						<dt><?php esc_html_e( '講員', 'rongen' ); ?></dt>
						<dd><?php echo esc_html( rongen_field( 'preacher' ) ); ?></dd>
					</div>
				<?php endif; ?>
				<?php if ( rongen_field( 'scripture' ) ) : ?>
					<div>
						<dt><?php esc_html_e( '經文', 'rongen' ); ?></dt>
						<dd><?php echo esc_html( rongen_field( 'scripture' ) ); ?></dd>
					</div>
				<?php endif; ?>
				<?php
				$seasons = get_the_term_list( get_the_ID(), 'rongen_season', '', '、' );
				if ( $seasons && ! is_wp_error( $seasons ) ) :
					?>
					<div>
						<dt><?php esc_html_e( '節期', 'rongen' ); ?></dt>
						<dd><?php echo wp_kses_post( $seasons ); ?></dd>
					</div>
				<?php endif; ?>
			</dl>

			<?php if ( $video ) : ?>
				<div class="video-frame">
					<?php
					// 使用 WordPress 內建 oEmbed，支援 YouTube／Facebook 影片。
					echo wp_kses_post( wp_oembed_get( $video ) ?: sprintf( '<p><a href="%1$s" target="_blank" rel="noopener">%2$s</a></p>', esc_url( $video ), esc_html__( '在新視窗觀看講道影片', 'rongen' ) ) );
					?>
				</div>
			<?php endif; ?>

			<?php if ( $audio ) : ?>
				<audio controls preload="none" src="<?php echo esc_url( $audio ); ?>"></audio>
			<?php endif; ?>

			<div class="prose">
				<?php the_content(); ?>
			</div>

			<nav class="btn-row" style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--line)">
				<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_sermon' ) ); ?>"><?php esc_html_e( '回到講道存檔', 'rongen' ); ?></a>
			</nav>
		</div>
	</article>

	<?php
endwhile;

get_footer();
