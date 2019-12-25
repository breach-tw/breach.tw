	<?php $title = '重大外洩事件';
	require 'src/header.php';
	require 'src/common.php';
	?>

	<header class="jumbotron jumbotron-fluid">
		<div class="container">
			<h1><?= $title ?></h1>
			<p class="lead">目前收錄<br />
				<?= get_breach_type_count(1) ?> 筆重大外洩事件<br />
				<?= get_breach_type_count(0) ?> 筆較小外洩事件<br />
				共 <?= get_breach_type_count(0) + get_breach_type_count(1) ?> 筆外洩事件
			</p>
		</div>
	</header>

	<div class="container">
		<h1 class="breach-title">資料來源 & 聲明</h1>
		<p>本頁面僅顯示五千筆以上之外洩事件，剩餘較小（例如 Google 所得之名冊）將只會供受害者查詢。</p>
		<p>本網站資料來源皆為匿名人士提供，且本網站並不保存其原始資料，只保存雜湊值以便查詢洩漏情況。<br />攻擊本網站並無法獲得資料，若攻擊屬實者本網站將依法訴諸法律行動。</p>
		<p>若想匿名提供資源，可參考 #TODO</p>
		<h1 class="breach-title">重大外洩事件</h1>
		<div class="breaches">
			<?php foreach (get_major_breaches() as $_ => $val) { ?>
				<div class="breach">
					<div class="header">
						<div class="title"><?= $val['name'] ?></div>
						<div class="magnitude">
							<div>外洩數量級</div>
							<div><?= number_format($val['round_k'] * 1000) ?></div>
						</div>
					</div>
					<?php if (get_tags($val['id'])) { ?>
						<div class="tags">
							<?php foreach (get_tags($val['id']) as $_ => $tag) { ?>
								<button data-tag-id="<?= $tag['tag'] ?>" class="btn btn-sm <?= $tag['class'] ?>"><?= $tag['name'] ?></button>
							<?php } ?>
						</div>
					<?php } ?>
					<div class="content">
						<h4>洩漏項目</h4>
						<p><?= join('、', get_leaked_items($val['id'])) ?></p>
						<h4>敘述</h4>
						<p><?= $val['description'] ?></p>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
	<script>
		const tag_details = <?= json_encode(get_tag_details()) ?>;

		$(`[data-tag-id]`).click(function() {
			let tagId = $(this).attr(`data-tag-id`);
			let tag_detail = tag_details.filter(x => x.id == tagId)[0];
			Swal.fire({
				type: 'info',
				title: `${tag_detail.name}`,
				text: tag_detail.description,
				confirmButtonText: '了解！'
			});
		});
	</script>

	<?php require 'src/footer.php'; ?>
