<?php
/**
 * 側邊欄。未設定小工具時顯示教會基本資料，避免留下空白欄。
 *
 * @package rongen
 */

?>
<aside class="site-sidebar" aria-label="<?php esc_attr_e( '側邊資訊', 'rongen' ); ?>">
	<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
		<?php dynamic_sidebar( 'sidebar-1' ); ?>
	<?php else : ?>
		<section class="widget">
			<h2 class="widget__title"><?php esc_html_e( '聚會資訊', 'rongen' ); ?></h2>
			<?php echo do_shortcode( '[rongen_contact]' ); ?>
		</section>

		<section class="widget">
			<h2 class="widget__title"><?php esc_html_e( '快速連結', 'rongen' ); ?></h2>
			<ul>
				<li><a href="<?php echo esc_url( get_post_type_archive_link( 'rongen_sermon' ) ); ?>"><?php esc_html_e( '講道存檔', 'rongen' ); ?></a></li>
				<li><a href="<?php echo esc_url( get_post_type_archive_link( 'rongen_bulletin' ) ); ?>"><?php esc_html_e( '主日週報下載', 'rongen' ); ?></a></li>
				<li><a href="<?php echo esc_url( get_post_type_archive_link( 'rongen_event' ) ); ?>"><?php esc_html_e( '教會活動', 'rongen' ); ?></a></li>
				<li><a href="<?php echo esc_url( rongen_info( 'rongen_celc_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '中華福音道路德會', 'rongen' ); ?></a></li>
			</ul>
		</section>

		<section class="widget">
			<h2 class="widget__title"><?php esc_html_e( '搜尋', 'rongen' ); ?></h2>
			<?php get_search_form(); ?>
		</section>
	<?php endif; ?>
</aside>
