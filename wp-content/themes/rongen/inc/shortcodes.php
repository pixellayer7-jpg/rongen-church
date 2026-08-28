<?php
/**
 * 簡碼：讓同工在任何頁面內嵌入聚會表、地圖、聯絡資訊與各堂會清單。
 *
 * @package rongen
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * [rongen_schedule] 每週聚會表。
 */
function rongen_shortcode_schedule() {
	ob_start();
	?>
	<div class="schedule">
		<?php foreach ( rongen_schedule() as $item ) : ?>
			<div class="schedule__row">
				<div class="schedule__name"><?php echo esc_html( $item['name'] ); ?></div>
				<div class="schedule__when"><?php echo esc_html( $item['when'] ); ?></div>
				<div class="schedule__note"><?php echo esc_html( $item['note'] ); ?></div>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'rongen_schedule', 'rongen_shortcode_schedule' );

/**
 * [rongen_map] Google 地圖。
 */
function rongen_shortcode_map( $atts ) {
	$atts = shortcode_atts( array( 'height' => '420' ), $atts, 'rongen_map' );
	ob_start();
	?>
	<div class="map-frame" style="--map-h:<?php echo esc_attr( absint( $atts['height'] ) ); ?>px">
		<?php rongen_map_fallback(); ?>
		<iframe
			src="<?php echo esc_url( rongen_map_embed_url() ); ?>"
			title="<?php echo esc_attr( rongen_info( 'rongen_church_name' ) . '位置地圖' ); ?>"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			allowfullscreen></iframe>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'rongen_map', 'rongen_shortcode_map' );

/**
 * [rongen_contact] 聯絡資訊卡。
 */
function rongen_shortcode_contact() {
	$rows = array(
		array( '地址', rongen_info( 'rongen_address' ) ),
		array( '電話', rongen_info( 'rongen_phone' ) ),
		array( '駐堂教師', rongen_info( 'rongen_teacher' ) . '　' . rongen_info( 'rongen_mobile' ) ),
		array( '聖禮牧師', rongen_info( 'rongen_pastor' ) . '　' . rongen_info( 'rongen_pastor_phone' ) ),
		array( '電子郵件', rongen_info( 'rongen_email' ) ),
		array( '主日崇拜', rongen_info( 'rongen_service_time' ) ),
	);

	ob_start();
	echo '<dl class="info-list">';
	foreach ( $rows as $row ) {
		printf( '<div class="info-list__row"><dt>%s</dt><dd>%s</dd></div>', esc_html( $row[0] ), esc_html( $row[1] ) );
	}
	echo '</dl>';
	return ob_get_clean();
}
add_shortcode( 'rongen_contact', 'rongen_shortcode_contact' );

/**
 * [rongen_churches] 總會各堂會一覽。
 */
function rongen_shortcode_churches() {
	ob_start();
	?>
	<div class="church-grid">
		<?php foreach ( rongen_celc_churches() as $church ) : ?>
			<?php $is_home = false !== strpos( $church['note'], '本堂' ); ?>
			<div class="church-card<?php echo $is_home ? ' church-card--home' : ''; ?>">
				<p class="church-card__city"><?php echo esc_html( $church['city'] ); ?></p>
				<h3 class="church-card__name"><?php echo esc_html( $church['name'] ); ?></h3>
				<p class="church-card__note"><?php echo esc_html( $church['note'] ); ?></p>
				<p class="church-card__address"><?php echo esc_html( $church['address'] ); ?></p>
				<p class="church-card__phone"><?php echo esc_html( $church['phone'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'rongen_churches', 'rongen_shortcode_churches' );

/**
 * [rongen_pillars] 路德宗信仰四重點。
 */
function rongen_shortcode_pillars() {
	ob_start();
	?>
	<div class="pillars">
		<?php foreach ( rongen_pillars() as $pillar ) : ?>
			<div class="pillar">
				<p class="pillar__latin"><?php echo esc_html( $pillar['latin'] ); ?></p>
				<h3 class="pillar__title"><?php echo esc_html( $pillar['title'] ); ?></h3>
				<p class="pillar__text"><?php echo esc_html( $pillar['text'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'rongen_pillars', 'rongen_shortcode_pillars' );
