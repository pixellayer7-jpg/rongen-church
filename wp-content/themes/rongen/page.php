<?php
/**
 * 一般頁面。
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
			'title' => get_the_title(),
			'text'  => has_excerpt() ? get_the_excerpt() : '',
		)
	);
	?>

	<article class="section">
		<div class="wrap wrap--narrow prose">
			<?php the_content(); ?>
		</div>
	</article>

	<?php
endwhile;

get_footer();
