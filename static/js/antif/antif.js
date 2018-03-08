function validateAll() {
	if($("#fwm").val().length != 20) {
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

			var infoFalse = queryResult
			var infoTure = queryResult + ", 已被查询" + queryCount + "次！"

			if(queryCount == 0) {
				weui.topTips(infoFalse);
			} else {
				weui.topTips(infoTure);
			}
		},
		error: function(data) {
			weui.topTips('访问出错！');
		}
	});
}