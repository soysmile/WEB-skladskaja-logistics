<?
	require_once("../lib/utm.php");
	$utm = new Utm;
	$utmData = $utm->getUtm();
	
	$form_id = "s1";
	
?>
<div class="modal_form">
	<div class="vpform type2 small">
		<form method="post" id="<?=$form_id?>">
			<h2>Заявка</h2>
<?
			if($_POST['service']){
?>
				<p class="service_name">на "<?=$_POST['service']?>"</p>
<?
			}
?>
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
						<label>Email</label>
						<input type="text" placeholder="mail@example.com" name="fd[email]">
					</div>
				</div>
				<div class="inl">
					<div class="fblock">
						<label>Комментарий</label>
						<textarea name="fd[message]"></textarea>
					</div>
				</div>
			</div>	
			<div class="fblock">
				<input type="hidden" name="fd[form_id]" class="form_id" value="<?=$form_id?>">
				<input type="hidden" name="fd[user_origin]" class="user_origin" value="">
				<input type="hidden" name="fd[services]" class="services" value="<?=$_POST['service']?>">
				<input type="hidden" name="fd[price]" class="services" value="<?=$_POST['price']?>">
				<? echo $utm->makeUtmFields($utmData); ?>
				<button type="submit">Отправить</button>
			</div>
			<div class="close_btn"></div>
		</form>
	</div>
</div>