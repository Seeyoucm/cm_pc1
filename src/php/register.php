<?php
	header("Access-Control-Allow-Origin:*");	
	session_id();
	@session_start();	
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	$yqkey = $_POST["yqkey"];
	$conn = mysql_connect("localhost:3306", "root", "");
	mysql_select_db("yiguo");
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	$sql = "INSERT INTO users (phone, password, yqkey) VALUES ('$phone', '$password', '$yqkey')";
	$result = mysql_query($sql);
	if ($result) {
		$_SESSION["username"] = $phone;
		echo '{"res_code":0, "res_error":"", "res_body":{"status":1, "message":"success", "loginname":'.$_SESSION["username"].'}}';
	}else{
		echo '{"res_code":-1, "res_error":"", "res_body":{"status":0, "message":"用户注册失败：'. mysql_error() .'"}}';
	};
	mysql_close();
?>