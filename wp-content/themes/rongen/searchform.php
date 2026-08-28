<?php
/**
 * 搜尋表單。
 *
 * @package rongen
 */

?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="search-field-<?php echo esc_attr( wp_unique_id() ); ?>"><?php esc_html_e( '搜尋網站內容', 'rongen' ); ?></label>
	<input type="search" name="s" placeholder="<?php esc_attr_e( '搜尋講道、消息……', 'rongen' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>">
	<button type="submit"><?php esc_html_e( '搜尋', 'rongen' ); ?></button>
</form>
