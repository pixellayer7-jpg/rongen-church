<?php
/**
 * 頁首。
 *
 * @package rongen
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#content"><?php esc_html_e( '跳至主要內容', 'rongen' ); ?></a>

<header class="site-header" id="site-header">
	<div class="header-top">
		<div class="wrap header-top__inner">
			<p class="header-top__meta">
				<span><?php echo esc_html( rongen_info( 'rongen_service_time' ) ); ?></span>
				<span><?php echo esc_html( rongen_info( 'rongen_address' ) ); ?></span>
			</p>
			<p class="header-top__meta">
				<a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9+]/', '', rongen_info( 'rongen_phone' ) ) ); ?>"><?php echo esc_html( rongen_info( 'rongen_phone' ) ); ?></a>
				<?php if ( rongen_info( 'rongen_facebook' ) ) : ?>
					<a href="<?php echo esc_url( rongen_info( 'rongen_facebook' ) ); ?>" target="_blank" rel="noopener">Facebook</a>
				<?php endif; ?>
				<a href="<?php echo esc_url( rongen_info( 'rongen_celc_url' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '總會', 'rongen' ); ?></a>
			</p>
		</div>
	</div>

	<div class="wrap header-main">
		<?php if ( has_custom_logo() ) : ?>
			<div class="brand"><?php the_custom_logo(); ?></div>
		<?php else : ?>
			<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
				<span class="brand__mark"><?php rongen_cross_mark(); ?></span>
				<span class="brand__text">
					<span class="brand__name"><?php echo esc_html( rongen_info( 'rongen_church_name' ) ); ?></span>
					<span class="brand__sub"><?php echo esc_html( rongen_info( 'rongen_church_latin' ) ); ?></span>
				</span>
			</a>
		<?php endif; ?>

		<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-primary">
			<span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
			<span><?php esc_html_e( '選單', 'rongen' ); ?></span>
		</button>

		<nav class="nav-primary" id="nav-primary" aria-label="<?php esc_attr_e( '主選單', 'rongen' ); ?>">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'depth'          => 2,
					)
				);
			} else {
				// 尚未指定選單時的備援連結，確保網站一啟用就可瀏覽。
				echo '<ul>';
				wp_list_pages( array( 'title_li' => '', 'depth' => 1, 'number' => 7 ) );
				echo '</ul>';
			}
			?>
		</nav>
	</div>
</header>

<main id="content" class="site-content">
