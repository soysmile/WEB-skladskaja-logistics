<?
	require_once("../lib/utm.php");
	$utm = new Utm;
	$utmData = $utm->getUtm();
	
	$form_id = "call1";
	
?>
<div class="modal_form">
	<div class="vpform type2 small">
		<form method="post" id="<?=$form_id?>">
			<h2>Заказать звонок</h2>
			<div class="fcon">
				<div class="inl">
					<div class="fblock">
						<label>Имя</label>
						<input type="text" name="fd[name]">
					</div>
				</div>
				<div class="inl" field="phone">
					<div class="fblock">
						<label>Телефон*</label>
						<input type="text" placeholder="+7 (495) 000-00-00" name="fd[phone]" required>
					</div>
				</div>
			</div>	
			<div class="fblock">
				<input type="hidden" name="fd[form_id]" class="form_id" value="<?=$form_id?>">
				<input type="hidden" name="fd[user_origin]" class="user_origin" value="">
				<? echo $utm->makeUtmFields($utmData); ?>
				<button type="submit">Отправить</button>
			</div>
			<div class="close_btn"></div>
		</form>
	</div>
</div>