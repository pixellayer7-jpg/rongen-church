<?php
/**
 * 頁尾。
 *
 * @package rongen
 */

?>
</main><!-- #content -->

<footer class="site-footer">
	<div class="footer-visit">
		<div class="footer-visit__body">
			<p class="kicker"><?php esc_html_e( '歡迎前來', 'rongen' ); ?></p>
			<h2><?php esc_html_e( '主日，我們在白河仙草等你', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '榮恩堂位於台南白河仙草，鄰近關子嶺山區。初次來訪不需要任何準備，也不必擔心不熟悉禮儀程序——會堂入口備有崇拜手冊，同工會協助你找到座位。', 'rongen' ); ?></p>
			<dl class="info-list">
				<div class="info-list__row"><dt><?php esc_html_e( '主日崇拜', 'rongen' ); ?></dt><dd><?php echo esc_html( rongen_info( 'rongen_service_time' ) ); ?></dd></div>
				<div class="info-list__row"><dt><?php esc_html_e( '地址', 'rongen' ); ?></dt><dd><?php echo esc_html( rongen_info( 'rongen_address' ) ); ?></dd></div>
				<div class="info-list__row"><dt><?php esc_html_e( '聯絡', 'rongen' ); ?></dt><dd><?php echo esc_html( rongen_info( 'rongen_teacher' ) . '　' . rongen_info( 'rongen_mobile' ) ); ?></dd></div>
			</dl>
			<div class="btn-row">
				<a class="btn btn--light" href="<?php echo esc_url( rongen_info( 'rongen_map_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '開啟 Google 地圖', 'rongen' ); ?></a>
			</div>
		</div>
		<div class="footer-visit__map">
			<?php rongen_map_fallback(); ?>
			<iframe
				src="<?php echo esc_url( rongen_map_embed_url() ); ?>"
				title="<?php echo esc_attr( rongen_info( 'rongen_church_name' ) . '位置地圖' ); ?>"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				allowfullscreen></iframe>
		</div>
	</div>

	<div class="wrap footer-main">
		<div class="footer-col footer-brand">
			<span class="brand__mark"><?php rongen_cross_mark(); ?></span>
			<h3><?php echo esc_html( rongen_info( 'rongen_church_name' ) ); ?></h3>
			<p><?php echo esc_html( rongen_info( 'rongen_address' ) ); ?></p>
			<p><?php echo esc_html( rongen_info( 'rongen_phone' ) ); ?></p>
			<p><a href="mailto:<?php echo esc_attr( rongen_info( 'rongen_email' ) ); ?>"><?php echo esc_html( rongen_info( 'rongen_email' ) ); ?></a></p>
		</div>

		<div class="footer-col">
			<h3><?php esc_html_e( '牧養同工', 'rongen' ); ?></h3>
			<p><?php esc_html_e( '聖禮牧師', 'rongen' ); ?>　<?php echo esc_html( rongen_info( 'rongen_pastor' ) ); ?></p>
			<p><?php esc_html_e( '駐堂教師', 'rongen' ); ?>　<?php echo esc_html( rongen_info( 'rongen_teacher' ) ); ?></p>
			<p><?php echo esc_html( rongen_info( 'rongen_mobile' ) ); ?></p>
		</div>

		<div class="footer-col">
			<h3><?php esc_html_e( '網站導覽', 'rongen' ); ?></h3>
			<?php
			if ( has_nav_menu( 'footer' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'footer',
						'container'      => false,
						'depth'          => 1,
					)
				);
			} else {
				echo '<ul>';
				wp_list_pages( array( 'title_li' => '', 'depth' => 1 ) );
				echo '</ul>';
			}
			?>
		</div>

		<div class="footer-col">
			<h3><?php esc_html_e( '相關連結', 'rongen' ); ?></h3>
			<ul>
				<li><a href="<?php echo esc_url( rongen_info( 'rongen_celc_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '中華福音道路德會（總會）', 'rongen' ); ?></a></li>
				<li><a href="https://celc.org.tw/lutheran-church/" target="_blank" rel="noopener"><?php esc_html_e( '各堂會與佈道所', 'rongen' ); ?></a></li>
				<?php if ( rongen_info( 'rongen_facebook' ) ) : ?>
					<li><a href="<?php echo esc_url( rongen_info( 'rongen_facebook' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '榮恩堂 Facebook 專頁', 'rongen' ); ?></a></li>
				<?php endif; ?>
			</ul>
			<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
				<?php dynamic_sidebar( 'footer-1' ); ?>
			<?php endif; ?>
		</div>
	</div>

	<div class="wrap footer-bottom">
		<p>&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php echo esc_html( rongen_info( 'rongen_church_name' ) ); ?>　<?php esc_html_e( '版權所有', 'rongen' ); ?></p>
		<p><?php esc_html_e( '隸屬於財團法人中華福音道路德會', 'rongen' ); ?></p>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
