<?
class amoFormGetaway{

	private $classes = array(
	);

	private static $objects = array();
	
//	private $siteUrl = "http://localhost/para-crim";
//	private $getawayUrl = "http://localhost/amocrm/handlers/forms.php";
	private $siteUrl = "http://para-crim.com/";
	private $getawayUrl = "http://amocrm.podgornov.com/handlers/forms.php";

	
	public function __construct(){
		
	}

	public function sendAmoFormToGetaway(){
		if(substr($_SERVER['HTTP_REFERER'], 0, strlen($this->siteUrl)) == $this->siteUrl){
			$formData = $_POST;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_HEADER, 0);
			curl_setopt($ch, CURLOPT_VERBOSE, 0);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, $this->getawayUrl);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, array('formData'=>serialize($formData)));
			$result = curl_exec($ch);       
			curl_close($ch);
		}
		else{
			$result = "<result>
						<errors>
							<error id='wrong_source'>Wrong data source</error>
						</errors>
					   </result>";
		}
		return $result;
	}


}
?>