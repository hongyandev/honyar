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
	if($("#fwm").val().length != 2) {
		weui.topTips('请输入20位防伪码！');
		$("#fwm").focus();
		return false;
	}
}
$(document).ready(function(e) {
	retrieveData();
});

function submitAntiCode() {
	
	var validResult = validateAll();
	if(validResult == false)
		return;

	var Code = $('#fwm').val();

	$.ajax({
		type: "post",
		url: "http://sge.cn:9101/api/smfw",
		data: {
			gs: "1", // 1: 鸿雁, 2: 南京鸿雁
			fwtm: "123456"
		},
		success: function(data) {
			var queryCount = data.queryCount;
			var queryResult = data.queryResult;
			var quertCode = data.quertCode;

			var info = queryResult + ", 已被查询" + queryCount + "次！"
			weui.topTips(info);

		},
		error: function(data) {
			weui.topTips('访问出错！');
		}
	});
}