<?
	header('Content-Type: application/json charset=utf-8');
	
	function changeSpaces($value){
		return preg_replace("/\s+/i", "+", $value);
	}
	
	$values = array();
	
	foreach( $_POST as $key => $value ){
		$values[$key] = $value;
	}
	
	$url = $values["postURL"] ? $values["postURL"] : null;
	$accessToken = $values["access_token"] ? $values["access_token"] : null;
	$type = $values["requestType"] ? $values["requestType"] : null;
	
	if( $url ){
		unset($values["postURL"]);
	}
	
	if( $url ){
		unset($values["requestType"]);
	}
	
	$postData = "";
	
	foreach( $values as $key => $value ){
		$postData .= $key . "=" . changeSpaces($value) . "&";
	}
	
	$postData = substr($postData, 0, -1);
	
	$curl = curl_init();
	
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	if( $type == "DELETE" ){
		curl_setopt($curl, CURLOPT_URL, $url . "?$postData" );
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $type);
	}
	else
	{
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POST, count($values));
		curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
	}
	
	$response = curl_exec($curl);
	
	curl_close($curl);
	
	echo $response;
?>