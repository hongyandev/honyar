function retrieveData() {
				if("<%=strCxjg%>" != "GOOD") {
					if("<%=strTmh%>" != "null") {
						$("#fwm").val("");
					}
					if("<%=strCxjg%>" == "YZMERROR") {
						alert("验证码错误！");
						$("#yzm").focus();
					}
				}
			}

			function validateAll() {
				if($("#fwm").val().length != 20) {
					alert("请输入20位防伪码！");
					$("#fwm").focus();
					return false;
				}
				if($("#yzm").val().length != 4) {
					alert("请输入4位验证码！");
					$("#yzm").focus();
					return false;
				}
			}
			$(document).ready(function(e) {
				retrieveData();
			});