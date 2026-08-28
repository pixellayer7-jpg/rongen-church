<?php
/**
 * Template Name: 奉獻
 *
 * 注意：帳戶資料為佔位文字，請務必由教會同工於本頁編輯器中改為正確資訊後再公開。
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
			'title'  => get_the_title(),
			'kicker' => __( '出於感恩的回應', 'rongen' ),
			'text'   => __( '奉獻不是換取上帝恩典的代價。我們奉獻，是因為已經白白領受了基督為我們成就的一切。', 'rongen' ),
		)
	);
	?>

	<section class="section">
		<div class="wrap wrap--narrow prose">
			<h2><?php esc_html_e( '為什麼奉獻', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '我們得救不是靠自己的努力或功德，全然出於上帝白白的恩典。因此奉獻從來不是為了「賺取」什麼，而是感恩的自然回應——把上帝所賜的一部分，交回給祂的教會使用。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '奉獻用於教會日常運作、牧養與教導事工、社區關懷與探訪，以及本會的宣教與神學教育。初次來訪的朋友完全沒有任何奉獻的壓力，請安心參與崇拜。', 'rongen' ); ?></p>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap">
			<?php rongen_section_heading( __( '奉獻方式', 'rongen' ), __( '你可以這樣奉獻', 'rongen' ), 'center' ); ?>
			<div class="give-grid">
				<div class="give-card">
					<h3><?php esc_html_e( '主日奉獻', 'rongen' ); ?></h3>
					<p><?php esc_html_e( '主日崇拜中設有奉獻程序，可直接將奉獻投入奉獻袋或奉獻箱。若需要奉獻收據，請於信封上註明姓名與聯絡方式。', 'rongen' ); ?></p>
				</div>
				<div class="give-card">
					<h3><?php esc_html_e( '銀行轉帳', 'rongen' ); ?></h3>
					<p><?php esc_html_e( '請洽教會辦公室索取帳戶資料，或直接聯繫駐堂教師。', 'rongen' ); ?></p>
					<p><?php echo esc_html( rongen_info( 'rongen_teacher' ) . '　' . rongen_info( 'rongen_mobile' ) ); ?></p>
				</div>
				<div class="give-card">
					<h3><?php esc_html_e( '指定用途奉獻', 'rongen' ); ?></h3>
					<p><?php esc_html_e( '如宣教、建堂、關懷事工等特定用途，請於奉獻時註明，教會會依指定用途專款專用。', 'rongen' ); ?></p>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="wrap wrap--narrow">
			<?php if ( trim( get_the_content() ) ) : ?>
				<div class="prose"><?php the_content(); ?></div>
			<?php else : ?>
				<div class="notice">
					<p><strong><?php esc_html_e( '請教會同工注意：', 'rongen' ); ?></strong><?php esc_html_e( '本頁尚未填入實際的帳戶資料。請於後台編輯本頁，在編輯器中補上銀行名稱、分行、戶名、帳號與奉獻收據開立方式，本區塊即會改為顯示你所填寫的內容。', 'rongen' ); ?></p>
				</div>
			<?php endif; ?>

			<div class="notice" style="margin-top:1.5rem">
				<p><?php esc_html_e( '財團法人中華福音道路德會為立案之宗教財團法人，奉獻收據可依法作為綜合所得稅列舉扣除之憑證。相關細節請洽教會辦公室。', 'rongen' ); ?></p>
			</div>
		</div>
	</section>

	<?php
endwhile;

get_footer();
