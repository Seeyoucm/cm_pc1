<?php
	header("Access-Control-Allow-Origin:*");	
	@session_start();
	//phpinfo();
	echo '<meta charset = "utf-8">';
	echo session_id();
	echo "获取".$_SESSION['username'];

	
	if ($_SESSION['username']) {
		
		echo '{"res_code":0, "res_error":"", "res_body":{"status":1, "message":"success", "loginname":'.$_SESSION["username"].'}}';
	}else{
		echo '{"res_code":-1, "res_error":"", "res_body":{"status":0, "message":"用户注册失败：'. mysql_error() .'"}}';
	};
?>