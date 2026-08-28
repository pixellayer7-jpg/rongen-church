<?php
/**
 * 講道存檔。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title'  => __( '講道存檔', 'rongen' ),
		'kicker' => __( '聖道', 'rongen' ),
		'text'   => __( '歷次主日崇拜與節期崇拜的講道。講道按著律法與福音傳講：先指出人的罪，再宣告基督為我們成就的赦免。', 'rongen' ),
	)
);
?>

<div class="section">
	<div class="wrap">
		<?php
		$seasons = get_terms( array( 'taxonomy' => 'rongen_season', 'hide_empty' => true ) );
		if ( $seasons && ! is_wp_error( $seasons ) ) :
			?>
			<p style="margin-bottom:2.5rem;display:flex;flex-wrap:wrap;gap:.6rem">
				<?php foreach ( $seasons as $season ) : ?>
					<a class="tag" href="<?php echo esc_url( get_term_link( $season ) ); ?>" style="text-decoration:none"><?php echo esc_html( $season->name ); ?></a>
				<?php endforeach; ?>
			</p>
		<?php endif; ?>

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
			<p><?php esc_html_e( '尚未上傳講道紀錄。', 'rongen' ); ?></p>
		<?php endif; ?>
	</div>
</div>

<?php get_footer(); ?>
