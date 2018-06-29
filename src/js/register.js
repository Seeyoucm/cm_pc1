require(["config"], function(){
	require(["jquery", "cookie"],function($){
		$(function(){
			var phone_key = 0, password_key = 0, repassword_key = 0;
			$("#phone").blur(function(){
				var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				var _phone = $(this).val();
				$.post("http://localhost/php/check.php", {phone:_phone},  function(data){
					if (data.res_code == 0) { // 未出错
						if(data.res_body.status == 0){// 用户不存在
							if(reg.test(_phone)){
								$("#phone").next(".info").html("用户名可用").css("color", "green");
								phone_key = 1;
							}else{
								$("#phone").next(".info").html("格式有误").css("color", "red");
								phone_key = -1;
							}
						}
						else{
							$("#phone").next("b").html("用户名已存在").css("color", "red");
							phone_key = -1;
						}
					} else {
						console.log(data);
					}
				}, "json");
				
			});
			$("#set_pswd").blur(function(){
				var _password = $(this).val();
				var reg = /[a-zA-Z]\w{5,19}$/;
				if(reg.test(_password)){
					$("#set_pswd").next("b").html("格式正确").css("color", "green");
					password_key = 1;
				}else{
					$("#set_pswd").next("b").html("格式有误").css("color", "red");
					password_key = -1;
				};
			});
			$("#con_pswd").blur(function(){
				var _password = $("#set_pswd").val();
				var _repassword = $(this).val();
				if(_password === _repassword){
					$("#repassword").next("b").html("密码一致").css("color", "green");
					repassword_key = 1;
				}
				else{
					$("#repassword").next("b").html("密码不一致").css("color", "red");
					repassword_key = -1;
				}
			});
			$("#vcode").blur(function(){
				var _vcode = $(this).val();
				if(_vcode){
					$("#yqkey").next("b").html("可用").css("color", "green");
				}
				else{
					$("#yqkey").next("b").html("未填写").css("color", "red");
				}
			});
			$("#phoneReg").click(function(){
				var _phone = $('#phone').val();
				var _password = $("#set_pswd").val();
				var _repassword = $("#con_pswd").val();
				if(phone_key == 1 && password_key == 1 && repassword_key == 1){
					$.post("http://localhost/php/register.php", {phone:_phone, password:_password, yqkey:_yqkey}, function(data){
						console.log(data);
						console.log(data.res_body.status);
						console.log("111");
						if(data.res_code == 0){
							if(data.res_body.status == 1){
//								$("#welcome").text("欢迎：" + data.res_body.loginname).css("display","block");
//								$("#login_btn").css("display", "none");
//								$("#reg_btn").css("display", "none");
//								$("#del_user").css("display", "none");
								$("#regErr").html("注册成功").css("color", "green");
								$.cookie('username', _phone, { expires: 7, path: '/' });
								setTimeout(function(){
									location.href="/index.html";
								},10000)
								
//								location = "regSuccess.html";
							}
						}
					},"json")
				}else{
					$("#regErr").html("注册失败").css("color", "red");
				}
			});
		})
	})
})
