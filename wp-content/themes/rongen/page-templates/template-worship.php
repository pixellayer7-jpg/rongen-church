<?php
/**
 * Template Name: 崇拜與聚會
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
			'kicker' => __( '禮儀・莊重・以聖道為中心', 'rongen' ),
			'text'   => __( '崇拜是榮恩堂最核心的事。上帝的愛最清楚地顯明在祂於崇拜中，藉聖道與聖禮把恩賜交給祂百姓的那一刻。', 'rongen' ),
		)
	);
	?>

	<section class="section">
		<div class="wrap">
			<div class="split">
				<div class="split__body">
					<p class="kicker"><?php esc_html_e( '主日崇拜', 'rongen' ); ?></p>
					<h2><?php echo esc_html( rongen_info( 'rongen_service_time' ) ); ?></h2>
					<p><?php esc_html_e( '我們的崇拜是「禮儀崇拜」。這代表崇拜的每一部分都經過安排，不是即興發揮；語氣是莊重的，而不是閒談式的，因為所談論的是關乎永恆的事。', 'rongen' ); ?></p>
					<p><?php esc_html_e( '你不需要事先準備什麼。入口備有崇拜手冊，程序與所唱的詩歌都印在其中；若一時跟不上，坐著觀看也完全沒有關係。', 'rongen' ); ?></p>
					<div class="btn-row">
						<a class="btn" href="<?php echo esc_url( rongen_page_url( 'template-contact.php' ) ); ?>"><?php esc_html_e( '交通與位置', 'rongen' ); ?></a>
						<a class="btn btn--ghost" href="<?php echo esc_url( get_post_type_archive_link( 'rongen_bulletin' ) ); ?>"><?php esc_html_e( '本週週報', 'rongen' ); ?></a>
					</div>
				</div>
				<div class="split__media"><?php rongen_cross_mark(); ?></div>
			</div>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap">
			<?php rongen_section_heading( __( '崇拜次序', 'rongen' ), __( '主日崇拜的流程與意義', 'rongen' ) ); ?>
			<?php
			/*
			 * 此次序抄錄自本堂 2026 年 7 月 26 日（聖靈降臨後第九主日，030 期）的實際週報。
			 * 設有聖餐的主日另發「程序本」，會在此次序中加入聖餐禮。
			 */
			$liturgy = array(
				array( '聖詩', '以聖詩開始崇拜。本堂使用《頌主聖詩》，週報上會註明詩號。' ),
				array( '宣召', '奉父、子、聖靈的名宣告崇拜開始（如馬太福音 28:19）。' ),
				array( '認罪與赦罪', '會眾一同承認自己的罪，並聽見奉基督的名所宣告的赦免（如約翰壹書 1:8-9、腓立比書 1:6）。這是整場崇拜的起點：我們一無所有地來。' ),
				array( '入壇詞', '以詩篇經文進入聖所，會眾與主領者應答誦讀（如詩篇 105 篇）。' ),
				array( '求主憐憫文', '同聲呼求「主啊，憐憫我」（如馬可福音 10:47）。' ),
				array( '榮歸主頌', '將榮耀歸給在高天的上帝（如路加福音 2:14、約翰福音 1:29）。' ),
				array( '問安', '主領者與會眾互相問安（如提摩太後書 4:22）。' ),
				array( '本日共禱文', '按教會年的節期，為當週的主題與需要一同禱告。' ),
				array( '宣讀聖經：舊約', '誦讀當日的舊約經課。' ),
				array( '回應經文', '以經文回應所聽見的話。' ),
				array( '宣讀聖經：書信', '誦讀當日的書信經課。' ),
				array( '備福音詞', '在福音書誦讀之前預備人心（如約翰福音 6:68）。' ),
				array( '宣讀聖經：聖福音', '誦讀當日的福音書經課。這是基督親自對我們說話。' ),
				array( '聖詩', '以聖詩回應聖道。' ),
				array( '證道', '按律法與福音傳講當日經文：律法指出我們的罪，福音宣告基督的赦免。' ),
				array( '奉獻', '獻上財物，作為感恩的回應。' ),
				array( '聖詩', '再以聖詩頌讚。' ),
				array( '主禱文', '同誦主耶穌所教導的禱文。' ),
				array( '祝福', '奉上帝的名祝福會眾，差遣我們回到日常生活中。' ),
				array( '報告', '報告教會消息與代禱事項。' ),
			);
			?>
			<div class="schedule">
				<?php foreach ( $liturgy as $index => $step ) : ?>
					<div class="schedule__row">
						<div class="schedule__name"><?php echo esc_html( $step[0] ); ?></div>
						<div class="schedule__when"><?php printf( esc_html__( '第 %d 段', 'rongen' ), (int) $index + 1 ); ?></div>
						<div class="schedule__note"><?php echo esc_html( $step[1] ); ?></div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="wrap">
			<?php rongen_section_heading( __( '每週聚會', 'rongen' ), __( '除了主日，我們也這樣聚集', 'rongen' ), 'center' ); ?>
			<?php echo do_shortcode( '[rongen_schedule]' ); ?>
		</div>
	</section>

	<section class="section section--ink section--watermark">
		<span class="watermark" aria-hidden="true">gottesdienst</span>
		<div class="wrap wrap--narrow">
			<?php rongen_section_heading( __( '常見問題', 'rongen' ), __( '初次來訪，你可能想問', 'rongen' ) ); ?>
			<?php
			$faq = array(
				array( '我需要穿正式服裝嗎？', '不需要。有人西裝領帶，也有人輕便前來，兩者我們都歡迎。莊重的是崇拜本身，而不是衣著。' ),
				array( '我不是基督徒，可以參加嗎？', '非常歡迎。你可以只是坐著聆聽與觀看。崇拜結束後若有問題，歡迎找駐堂教師聊聊。' ),
				array( '可以領聖餐嗎？', '路德會實行「同信聖餐」。若你尚未在路德宗教會受洗或接受過相關教導，請先與牧者談談；在此之前你仍可上前接受祝福。' ),
				array( '我可以帶孩子來嗎？', '當然可以。孩子在崇拜中發出聲音是很自然的事，不必緊張。崇拜後另有兒童主日學時間。' ),
				array( '需要奉獻嗎？', '奉獻是出於感恩的自願回應，來訪者完全沒有任何壓力。' ),
			);
			?>
			<div class="schedule">
				<?php foreach ( $faq as $item ) : ?>
					<div class="schedule__row" style="grid-template-columns:minmax(12rem,1fr) minmax(0,2fr)">
						<div class="schedule__name" style="color:#fff"><?php echo esc_html( $item[0] ); ?></div>
						<div class="schedule__note" style="color:rgba(255,255,255,.72)"><?php echo esc_html( $item[1] ); ?></div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<?php if ( trim( get_the_content() ) ) : ?>
		<section class="section">
			<div class="wrap wrap--narrow prose"><?php the_content(); ?></div>
		</section>
	<?php endif; ?>

	<?php
endwhile;

get_footer();
