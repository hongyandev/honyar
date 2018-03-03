function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串   
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function Bt_submit(uploadFiles) {
	var theRequest = GetRequest();
	var formdata = new FormData();
	for(var index in uploadFiles) {
		formdata.append("files", uploadFiles[index][0]);
	}
	formdata.append('openId', $.getCookie('open_id'));
	formdata.append('id', theRequest.mainid);

	$.ajax({
		type: "post",
		url: "http://wx.hongyancloud.com/wxDev/file/saveBillDetails",
		data: formdata,
		timeout: 5000,
		//必须false才会避开jQuery对 formdata 的默认处理 
		// XMLHttpRequest会对 formdata 进行正确的处理
		processData: false,
		//必须false才会自动加上正确的Content-Type 
		contentType: false,
		xhrFields: {
			withCredentials: false
		},
		success: function(data) {
			if(data.code == "00000") {
				weui.toast('图片上传成功！', {
					//var d = data;
					duration: 3000,
					callback: function() {
						window.location.href = "history.html";
					}
				});
			} else {
				weui.topTips(data.msg);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

		}
	})
}