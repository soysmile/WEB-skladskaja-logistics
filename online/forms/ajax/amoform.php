<?
header("HTTP/1.0 200 OK");
header("Content-type: text/xml; charset=UTF-8;");
header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0'); 
header("Pragma: no-cache");

require_once("../lib/amoFormGetaway.php");

$amoFormGetaway = new amoFormGetaway;
$xmlResult = $amoFormGetaway->sendAmoFormToGetaway();
echo $xmlResult;

?>