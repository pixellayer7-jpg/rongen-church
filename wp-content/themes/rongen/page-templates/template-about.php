<?php
/**
 * Template Name: 關於榮恩堂
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
			'kicker' => __( '台南白河・仙草', 'rongen' ),
			'text'   => __( '榮恩堂是中華福音道路德會在台南白河的教會，也是本會的經濟自立教會之一。', 'rongen' ),
		)
	);
	?>

	<section class="section">
		<div class="wrap">
			<div class="split">
				<div class="split__media"><?php rongen_cross_mark(); ?></div>
				<div class="split__body">
					<p class="kicker"><?php esc_html_e( '關於我們', 'rongen' ); ?></p>
					<h2><?php esc_html_e( '在鄉間，安靜地傳講不變的道', 'rongen' ); ?></h2>
					<p><?php esc_html_e( '榮恩堂坐落於台南白河區仙草里，鄰近關子嶺山區。這是一間規模不大的鄉村教會，目前約有五十多位會友，聚會人口多以家庭為單位，其中兒少約二十位。', 'rongen' ); ?></p>
					<p><?php esc_html_e( '我們不追求熱鬧的形式，也不以人數衡量教會。我們每個主日所做的，就是聚集在一起，領受上帝在聖道與聖禮中所賜的恩典，然後回到各自的家庭與工作中。', 'rongen' ); ?></p>
					<p><?php esc_html_e( '若你住在白河、東山、後壁、關子嶺一帶，或是路過此地，都歡迎在主日早晨走進來坐坐。', 'rongen' ); ?></p>
				</div>
			</div>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap wrap--narrow prose">
			<h2><?php esc_html_e( '教會的來歷', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '1981 年 12 月 20 日，時年二十五歲的萬德樹牧師受總會差派，來到台南白河仙草里的榮恩堂牧會。當時教會約有八成五的信徒是榮民——教會前方的榮民之家住著約兩千六百位老兵，鄰近民宅也還有數百人。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '隨著歲月流逝，這群會友逐漸凋零，教會於是轉型。萬牧師從仙草國小開始兒童事工，又為社區的孩子開辦課輔班，與家長約定以品格教育為核心、主日也要來主日學。最早一批主日學的孩子，多半來自非信徒的家庭。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '後來教會發現，孩子長大離鄉之後常常就不再進教會。於是牧養的重點轉向一件更根本的事：讓每個人能自己讀聖經。教會推動「靈修本」，在崇拜之外設有靈修分享班，讓識字不多的弟兄姊妹也能一同聽、一同分享。如今五十多位會友中，有四十多人穩定寫靈修本。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '今日榮恩堂的福音策略仍以「家庭」為單位——從媽媽讀書會、查經班，到父母與孩子一同參與的聚會，都是為了讓一家人能一起留在教會裡。榮恩堂也是中華福音道路德會的經濟自立教會之一。', 'rongen' ); ?></p>
			<p class="footnote"><?php esc_html_e( '教會歷史部分整理自 2023 年 11 月《基督教今日報》對萬德樹牧師的專訪報導；細節與現況請由教會確認後調整。', 'rongen' ); ?></p>
		</div>
	</section>

	<section class="section section--paper">
		<div class="wrap">
			<?php rongen_section_heading( __( '牧養同工', 'rongen' ), __( '服事這間教會的人', 'rongen' ), 'center' ); ?>
			<div class="give-grid">
				<div class="give-card">
					<p class="kicker"><?php esc_html_e( '主責牧師', 'rongen' ); ?></p>
					<h3><?php echo esc_html( rongen_info( 'rongen_overseer' ) ); ?></h3>
					<p><?php esc_html_e( '總會宣教部主任，同時牧養本會轄下的多間教會與佈道所。', 'rongen' ); ?></p>
				</div>
				<div class="give-card">
					<p class="kicker"><?php esc_html_e( '聖禮牧師', 'rongen' ); ?></p>
					<h3><?php echo esc_html( rongen_info( 'rongen_pastor' ) ); ?></h3>
					<p><?php esc_html_e( '負責本堂聖禮的施行與講道。', 'rongen' ); ?></p>
					<p><?php echo esc_html( rongen_info( 'rongen_pastor_phone' ) ); ?></p>
				</div>
				<div class="give-card">
					<p class="kicker"><?php esc_html_e( '駐堂教師', 'rongen' ); ?></p>
					<h3><?php echo esc_html( rongen_info( 'rongen_teacher' ) ); ?></h3>
					<p><?php esc_html_e( '駐堂服事，負責日常的教導、講道、關懷探訪與各項聚會安排。', 'rongen' ); ?></p>
					<p><?php echo esc_html( rongen_info( 'rongen_mobile' ) ); ?>　LINE：<?php echo esc_html( rongen_info( 'rongen_teacher_line' ) ); ?></p>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="wrap wrap--narrow prose">
			<h2><?php esc_html_e( '我們與中華福音道路德會', 'rongen' ); ?></h2>
			<p><?php esc_html_e( '1949 年國共戰爭後，第一個從中國大陸撤退、轉至台灣的信義／路德宗教會，在台灣落地生根。1952 年，美國密蘇里路德會海外宣教部差派施樂福宣教士來台創立基督教路德會。民國 54 年於嘉義縣成立財團法人，名稱為「財團法人台灣省嘉義縣基督教中華福音道路德會」，後於民國 75 年更名為「財團法人中華福音道路德會」。', 'rongen' ); ?></p>
			<p><?php esc_html_e( '本會本於聖道與聖禮，致力於發展合乎聖經的教會拓殖與宣教事工，並積極從事文字宣教事工與神學教育。榮恩堂為本會的經濟自立教會之一。', 'rongen' ); ?></p>

			<?php if ( trim( get_the_content() ) ) : ?>
				<?php the_content(); ?>
			<?php endif; ?>
		</div>
	</section>

	<section class="section section--ink">
		<div class="wrap wrap--narrow" style="text-align:center">
			<p class="kicker"><?php esc_html_e( '歡迎前來', 'rongen' ); ?></p>
			<h2><?php esc_html_e( '主日早晨，我們在這裡', 'rongen' ); ?></h2>
			<p><?php echo esc_html( rongen_info( 'rongen_service_time' ) ); ?>　／　<?php echo esc_html( rongen_info( 'rongen_address' ) ); ?></p>
			<div class="btn-row" style="justify-content:center">
				<a class="btn btn--light" href="<?php echo esc_url( rongen_page_url( 'template-contact.php' ) ); ?>"><?php esc_html_e( '交通方式', 'rongen' ); ?></a>
			</div>
		</div>
	</section>

	<?php
endwhile;

get_footer();
