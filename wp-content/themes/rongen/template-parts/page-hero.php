<?php
/**
 * 內頁頁首橫幅。
 *
 * @package rongen
 *
 * @var array $args {
 *     @type string $title       主標題。
 *     @type string $kicker      上方小標。
 *     @type string $text        說明文字。
 *     @type bool   $breadcrumb  是否顯示返回首頁的路徑。
 * }
 */

$title      = isset( $args['title'] ) ? $args['title'] : get_the_title();
$kicker     = isset( $args['kicker'] ) ? $args['kicker'] : '';
$text       = isset( $args['text'] ) ? $args['text'] : '';
$breadcrumb = ! isset( $args['breadcrumb'] ) || $args['breadcrumb'];
?>
<section class="page-hero">
	<div class="wrap page-hero__inner">
		<?php if ( $breadcrumb ) : ?>
			<p class="breadcrumb">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo esc_html( rongen_info( 'rongen_church_short' ) ); ?></a>
				<span aria-hidden="true">／</span>
				<span><?php echo esc_html( wp_strip_all_tags( $title ) ); ?></span>
			</p>
		<?php endif; ?>

		<?php if ( $kicker ) : ?>
			<p class="kicker"><?php echo esc_html( $kicker ); ?></p>
		<?php endif; ?>

		<h1 class="page-hero__title"><?php echo wp_kses_post( $title ); ?></h1>
		<span class="rule" aria-hidden="true"></span>

		<?php if ( $text ) : ?>
			<p class="page-hero__text"><?php echo esc_html( $text ); ?></p>
		<?php endif; ?>
	</div>
</section>
