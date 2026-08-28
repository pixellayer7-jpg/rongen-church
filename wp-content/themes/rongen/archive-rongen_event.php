<?php
/**
 * 教會活動列表。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title'  => __( '教會活動', 'rongen' ),
		'kicker' => __( '一同參與', 'rongen' ),
		'text'   => __( '節期崇拜、查經、社區關懷與各樣聚會。歡迎邀請家人朋友一同前來。', 'rongen' ),
	)
);
?>

<div class="section">
	<div class="wrap">
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
			<p><?php esc_html_e( '目前尚無排定的活動。', 'rongen' ); ?></p>
		<?php endif; ?>
	</div>
</div>

<?php get_footer(); ?>
