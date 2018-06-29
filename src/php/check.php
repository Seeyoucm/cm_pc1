<?php
	/* 查询服务器端数据库中是否有保存某用户名 */
	// 获取待查询用户名 
	header("Access-Control-Allow-Origin:*");
	$phone = $_POST["phone"];

	/* 连接数据库 */
	mysql_connect("localhost:3306", "root", "");
	mysql_select_db("yiguo");
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	// SQL语句
	$sql = "SELECT COUNT(*) FROM users WHERE phone='$phone'";
	// 执行查询
	$result = mysql_query($sql);
	// 处理查询结果
	$row = mysql_fetch_array($result);
	if ($row) {
		if ($row[0] > 0) { // 已存在待查询用户
			echo '{"res_code":0, "res_error":"", "res_body":{"status":1, "message":"exist"}}';
		} else { // 不存在待查询用户
			echo '{"res_code":0, "res_error":"", "res_body":{"status":0, "message":"not exist"}}';
		}
	} else {
		echo '{"res_code":-1, "res_error":"error："'. mysql_error() .', "res_body":{}}';
	}
	// 关闭数据库连接
	mysql_close();
?>