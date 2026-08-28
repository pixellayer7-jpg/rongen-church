<?php
/**
 * 主日週報列表。以條列形式呈現，方便弟兄姊妹取得每週的週報。
 * 週報可為 PDF 檔，也可為發佈於 Facebook 專頁的圖片貼文。
 *
 * @package rongen
 */

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'title'  => __( '主日週報', 'rongen' ),
		'kicker' => __( '每週發佈', 'rongen' ),
		'text'   => __( '每主日的崇拜程序、經課、消息與奉獻報告。本堂週報同步發佈於 Facebook 專頁。', 'rongen' ),
	)
);
?>

<div class="section">
	<div class="wrap wrap--narrow">
		<?php if ( have_posts() ) : ?>
			<ul class="file-list">
				<?php
				while ( have_posts() ) :
					the_post();
					$pdf  = rongen_field( 'pdf' );
					$link = rongen_field( 'link' );
					?>
					<li class="file-list__item">
						<div>
							<h2 class="file-list__title"><a href="<?php the_permalink(); ?>" style="text-decoration:none"><?php the_title(); ?></a></h2>
							<p class="file-list__date" style="margin:.3rem 0 0"><?php echo esc_html( rongen_display_date() ); ?></p>
						</div>
						<?php if ( $pdf ) : ?>
							<a class="file-list__link" href="<?php echo esc_url( $pdf ); ?>" target="_blank" rel="noopener"><?php esc_html_e( '下載 PDF', 'rongen' ); ?></a>
						<?php elseif ( $link ) : ?>
							<a class="file-list__link" href="<?php echo esc_url( $link ); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Facebook', 'rongen' ); ?></a>
						<?php else : ?>
							<a class="file-list__link" href="<?php the_permalink(); ?>"><?php esc_html_e( '閱讀', 'rongen' ); ?></a>
						<?php endif; ?>
					</li>
				<?php endwhile; ?>
			</ul>
			<?php rongen_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( '尚未上傳週報。', 'rongen' ); ?></p>
		<?php endif; ?>

		<div class="notice" style="margin-top:3rem">
			<p><?php esc_html_e( '同工發佈方式：週報可用兩種形式上傳——若有 PDF 檔，於「媒體 → 新增媒體檔案」上傳後複製檔案網址；若如目前作法是掃描成圖片發佈於 Facebook，則直接貼上該篇貼文的連結。兩者都填在「主日週報 → 新增週報」的欄位中。', 'rongen' ); ?></p>
		</div>
	</div>
</div>

<?php get_footer(); ?>
