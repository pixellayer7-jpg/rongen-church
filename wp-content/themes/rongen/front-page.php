<?php
/**
 * 首頁。
 *
 * @package rongen
 */

get_header();

$hero_image = get_theme_mod( 'rongen_hero_image' );
?>

<section class="hero<?php echo $hero_image ? ' hero--has-image' : ''; ?>"
	<?php if ( $hero_image ) : ?>style="background-image:linear-gradient(180deg,rgba(18,22,29,.55),rgba(18,22,29,.86)),url('<?php echo esc_url( $hero_image ); ?>')"<?php endif; ?>>
	<div class="wrap hero__inner">
		<p class="kicker"><?php echo esc_html( rongen_info( 'rongen_hero_kicker' ) ); ?></p>
		<h1 class="hero__title"><?php echo wp_kses_post( rongen_info( 'rongen_hero_title' ) ); ?></h1>
		<p class="hero__text"><?php echo esc_html( rongen_info( 'rongen_hero_text' ) ); ?></p>

		<dl class="hero__times">
			<div>
				<dt><?php esc_html_e( '主日崇拜', 'rongen' ); ?></dt>
				<dd><?php echo esc_html( rongen_info( 'rongen_service_time' ) ); ?></dd>
			</div>
			<div>
				<dt><?php esc_html_e( '聚會地點', 'rongen' ); ?></dt>
				<dd><?php echo esc_html( rongen_info( 'rongen_tagline' ) ); ?></dd>
			</div>
			<div>
				<dt><?php esc_html_e( '駐堂教師', 'rongen' ); ?></dt>
				<dd><?php echo esc_html( rongen_info( 'rongen_teacher' ) ); ?></dd>
			</div>
		</dl>

		<div class="btn-row">
			<a class="btn" href="<?php echo esc_url( rongen_page_url( 'template-worship.php' ) ); ?>"><?php esc_html_e( '崇拜與聚會', 'rongen' ); ?></a>
			<a class="btn btn--light" href="<?php echo esc_url( rongen_page_url( 'template-contact.php' ) ); ?>"><?php esc_html_e( '初次來訪', 'rongen' ); ?></a>
		</div>
	</div>
</section>

<?php
$entries = array(
	array(
		'title'    => __( '我們如何崇拜', 'rongen' ),
		'text'     => __( '禮儀崇拜不是表演，而是上帝親自在聖道與聖禮中服事我們。認識主日崇拜的次序與意義。', 'rongen' ),
		'url'      => rongen_page_url( 'template-worship.php' ),
		'more'     => __( '崇拜與聚會', 'rongen' ),
	),
	array(
		'title'    => __( '我們所信的', 'rongen' ),
		'text'     => __( '本堂完全認同《協同書》的信仰立場，以聖經為惟一準則，傳講律法與福音。', 'rongen' ),
		'url'      => rongen_page_url( 'template-beliefs.php' ),
		'more'     => __( '信仰告白', 'rongen' ),
	),
	array(
		'title'    => __( '如何找到我們', 'rongen' ),
		'text'     => __( '教會位於台南白河仙草里，交通方式、停車資訊與聯絡電話都在這裡。', 'rongen' ),
		'url'      => rongen_page_url( 'template-contact.php' ),
		'more'     => __( '聯絡與交通', 'rongen' ),
	),
);
?>
<section class="section section--tight">
	<div class="wrap">
		<div class="entry-grid">
			<?php foreach ( $entries as $entry ) : ?>
				<a class="entry-item" href="<?php echo esc_url( $entry['url'] ); ?>">
					<span class="entry-item__icon"><?php rongen_cross_mark(); ?></span>
					<h2 class="entry-item__title"><?php echo esc_html( $entry['title'] ); ?></h2>
					<p class="entry-item__text"><?php echo esc_html( $entry['text'] ); ?></p>
					<span class="entry-item__more"><?php echo esc_html( $entry['more'] ); ?> →</span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="verse">
	<div class="wrap wrap--narrow verse__inner">
		<p class="verse__text">「<?php echo esc_html( rongen_info( 'rongen_verse_text' ) ); ?>」</p>
		<p class="verse__ref"><?php echo esc_html( rongen_info( 'rongen_verse_ref' ) ); ?></p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__media">
				<?php
				$worship_image = get_theme_mod( 'rongen_worship_image' );
				if ( $worship_image ) :
					?>
					<img src="<?php echo esc_url( $worship_image ); ?>" alt="<?php esc_attr_e( '榮恩堂主日崇拜', 'rongen' ); ?>" loading="lazy">
				<?php else : ?>
					<?php rongen_cross_mark(); ?>
				<?php endif; ?>
			</div>
			<div class="split__body">
				<p class="kicker"><?php esc_html_e( '禮儀・莊重・以聖道為中心', 'rongen' ); ?></p>
				<h2><?php esc_html_e( '崇拜是這間教會最核心的事', 'rongen' ); ?></h2>
				<p><?php esc_html_e( '我們的崇拜是刻意安排的，不是即興的。從認罪與赦罪開始，經過入壇詞、求主憐憫文、榮歸主頌，到三段讀經、證道與祝福，整個次序都在傳達同一件事：上帝在此，祂要親自把祂的恩賜交在你手中。', 'rongen' ); ?></p>
				<p><?php esc_html_e( '這樣的次序不是新的發明。它承接了歷代教會近兩千年的傳統，也承接了 1517 年馬丁路德改革之後、路德宗教會一貫的實踐。', 'rongen' ); ?></p>
				<ul class="split__list">
					<li><?php esc_html_e( '講道按著律法與福音傳講，指出人的罪，也宣告基督的赦免。', 'rongen' ); ?></li>
					<li><?php esc_html_e( '聖禮（洗禮與聖餐）被視為上帝真實施恩的憑據，不只是象徵。', 'rongen' ); ?></li>
					<li><?php esc_html_e( '會眾同聲頌唱聖詩與信仰告白，一同回應上帝的話。', 'rongen' ); ?></li>
					<li><?php esc_html_e( '穿著不拘，無論正式或輕便都歡迎；莊重的是崇拜本身。', 'rongen' ); ?></li>
				</ul>
				<div class="btn-row">
					<a class="btn btn--ghost" href="<?php echo esc_url( rongen_page_url( 'template-worship.php' ) ); ?>"><?php esc_html_e( '了解主日崇拜次序', 'rongen' ); ?></a>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section section--ink section--watermark">
	<span class="watermark" aria-hidden="true">sola gratia</span>
	<div class="wrap">
		<?php rongen_section_heading( __( '路德宗的信仰', 'rongen' ), __( '我們所信、所教、所告白的', 'rongen' ) ); ?>
		<?php echo do_shortcode( '[rongen_pillars]' ); ?>
		<div class="btn-row" style="justify-content:center">
			<a class="btn btn--light" href="<?php echo esc_url( rongen_page_url( 'template-beliefs.php' ) ); ?>"><?php esc_html_e( '完整信仰告白', 'rongen' ); ?></a>
		</div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		<?php rongen_section_heading( __( '每週聚會', 'rongen' ), __( '一週的節奏', 'rongen' ), 'center' ); ?>
		<?php echo do_shortcode( '[rongen_schedule]' ); ?>
		<div class="notice" style="margin-top:2.5rem">
			<p><?php esc_html_e( '聚會時間偶有調整，最新公告請見教會消息或榮恩堂 Facebook 專頁；若不確定，也歡迎直接電話詢問。', 'rongen' ); ?></p>
		</div>
	</div>
</section>

<?php
$news = new WP_Query(
	array(
		'post_type'           => array( 'post', 'rongen_event' ),
		'posts_per_page'      => 3,
		'ignore_sticky_posts' => true,
	)
);
if ( $news->have_posts() ) :
	?>
	<section class="section">
		<div class="wrap">
			<?php rongen_section_heading( __( '教會消息', 'rongen' ), __( '最新公告與活動', 'rongen' ), 'center' ); ?>
			<div class="card-grid">
				<?php
				while ( $news->have_posts() ) :
					$news->the_post();
					rongen_card();
				endwhile;
				wp_reset_postdata();
				?>
			</div>
			<div class="btn-row" style="justify-content:center">
				<a class="btn btn--ghost" href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ?: home_url( '/' ) ); ?>"><?php esc_html_e( '所有消息', 'rongen' ); ?></a>
				<?php if ( rongen_info( 'rongen_facebook' ) ) : ?>
					<a class="btn btn--ghost" href="<?php echo esc_url( rongen_info( 'rongen_facebook' ) ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Facebook 專頁', 'rongen' ); ?></a>
				<?php endif; ?>
			</div>
		</div>
	</section>
<?php endif; ?>

<?php
$sermons = new WP_Query(
	array(
		'post_type'      => 'rongen_sermon',
		'posts_per_page' => 3,
		'meta_key'       => '_rongen_date',
		'orderby'        => array( 'meta_value' => 'DESC', 'date' => 'DESC' ),
	)
);
if ( $sermons->have_posts() ) :
	?>
	<section class="section section--paper">
		<div class="wrap">
			<?php rongen_section_heading( __( '聖道', 'rongen' ), __( '近期講道', 'rongen' ), 'center' ); ?>
			<div class="card-grid">
				<?php
				while ( $sermons->have_posts() ) :
					$sermons->the_post();
					rongen_card();
				endwhile;
				wp_reset_postdata();
				?>
			</div>
			<div class="btn-row" style="justify-content:center">
				<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_sermon' ) ); ?>"><?php esc_html_e( '講道存檔', 'rongen' ); ?></a>
				<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_bulletin' ) ); ?>"><?php esc_html_e( '主日週報下載', 'rongen' ); ?></a>
			</div>
		</div>
	</section>
<?php endif; ?>

<?php get_footer(); ?>
