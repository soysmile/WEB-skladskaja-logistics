<?
	require_once("../lib/utm.php");
	$utm = new Utm;
	$utmData = $utm->getUtm();
	
	$form_id = "cf2";
?>
<div class="vpform sky type2 small">
	<form method="post" id="<?=$form_id?>">
		<h2>Задай свой вопрос</h2>
		<div class="fcon">
			<div class="inl contact">
				<div class="fblock">
					<label>Имя</label>
					<input type="text" name="fd[name]">
				</div>
				<div class="fblock" field="phone">
					<label>Телефон*</label>
					<input type="text" placeholder="+7 (495) 000-00-00" name="fd[phone]" required>
				</div>
				<div class="fblock" field="email">
					<label>Email*</label>
					<input type="text" placeholder="mail@example.com" name="fd[email]" required>
				</div>
			</div>
			<div class="inl">
				<div class="fblock">
					<label>Вопрос</label>
					<textarea name="fd[message]"></textarea>
				</div>
			</div>
		</div>	
		<div class="fblock">
			<input type="hidden" name="fd[form_id]" class="form_id" value="<?=$form_id?>">
			<input type="hidden" name="fd[user_origin]" class="user_origin" value="">
			<? echo $utm->makeUtmFields($utmData); ?>
			<button type="submit">Отправить</button>
		</div>
	</form>
</div>