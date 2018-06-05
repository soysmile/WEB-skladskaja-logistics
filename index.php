<?
	$base_url = "http://localhost/logistics/final/";
	$base_url = "http://www.ils1.biz/logistics/";
	$base_url = "http://".$_SERVER['SERVER_NAME']."/logistics/";
	$base_url = "http://".$_SERVER['SERVER_NAME']."/gurtovenko/logistics/";
	
	$baseUrlArray = explode("/", str_replace("http://localhost", "", $base_url));
	foreach($baseUrlArray as $key=>$basePar){
		if(empty($baseUrlArray[$key])){
			unset($baseUrlArray[$key]);
		}
	}
	//echo "baseUrlArray: <pre>".var_export($baseUrlArray, true)."</pre>";
	
	$uriParts = explode("?",$_SERVER['REQUEST_URI']);
	$uriParts = explode("&",$uriParts[0]);
	
	//echo "uriParts: ".$uriParts."<br>";
	
	$urlArray = explode("/", $uriParts[0]);
	foreach($urlArray as $key=>$par){
		if(empty($urlArray[$key]) or in_array($urlArray[$key], $baseUrlArray)){
			unset($urlArray[$key]);
		}
	}
//	echo "urlArray: <pre>".var_export($urlArray, true)."</pre>";
	$urlArray = array_values($urlArray);
	
	
	$fileName = "";
	
	$pageUrl = $base_url;
	foreach($urlArray as $key=>$par){
		if($key > 0){
			$fileName.="-";
		}
		$fileName.=$par;
		$pageUrl.= $par."/";
		//echo "key ".$key.", par: ".$par."<br>";
	}

	if(in_array("thankyou", $urlArray)){
		$fileName = "thankyou";
	}
	
	$file = "templates/".$fileName.".php";
	//echo "file: ".$file;
	if(file_exists($file)){
		include($file);
	}
	else{
		$file = "templates/start.php";
		include($file);
	}
?>
