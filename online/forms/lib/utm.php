<?
class Utm{

	private $classes = array(
	);

	private static $objects = array();
	
	private $cookieName = "para_utm_params";
	private $cookieDays = 90; // days;
	
	public function __construct(){
		
	}

	public function getUtm(){
		if( isset($_COOKIE[$this->cookieName]) ){
			$utmData = json_decode($_COOKIE[$this->cookieName], true);
		}
		if(empty($utmData)){
			$utmData = array();
			if(isset($_GET) && !empty($_GET)){
				foreach($_GET AS $k=>$v){
					if(preg_match("/^utm_[a-z0-9]+/i",$k)){
						$utmData[$k] = $v;
					}
				}
				/*
				if(is_array($utmData)){
					$utmData['referer']	= $_SERVER['HTTP_REFERER'];
					date_default_timezone_set("UTC");
					$time = gmmktime();
					echo date("Y-m-d H:i:s", $time); 
					
				}
				*/
			}
			setcookie($this->cookieName, json_encode($utmData), time()+(86400*$this->cookieDays), '/');
		}
		return $utmData;
	}
	
	public function makeUtmFields($utmData){
		if(is_array($utmData)){
			$utmFieldsStr = '';
			foreach($utmData as $k=>$v){
				$utmFieldsStr.= '<input type="hidden" name="fd['.$k.']" class="'.$k.'" value="'.$v.'">';
			}
			return $utmFieldsStr;
		}
	}
			
	
}
?>