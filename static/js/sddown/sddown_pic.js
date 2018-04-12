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
	
	//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
	var openID = $.getCookie('open_id');

    var files= $("#uploaderInput").get(0).files;
	var theRequest = GetRequest();
	var formdata = new FormData();
    if(files.length>0){
        for(var i=0;i<files.length;i++){
            formdata.append('files',files[i])
        }
    };
	formdata.append('openId', openID);
	formdata.append('id', theRequest.mainid);

    var loading = weui.loading('正在提交...', {
        className: 'custom-classname'
    });
	$.ajax({
		type: "post",
        url:genAPI('wxDev/file/saveDropowerDetails'),
		data: formdata,
		//timeout: 5000,
		//必须false才会避开jQuery对 formdata 的默认处理 
		// XMLHttpRequest会对 formdata 进行正确的处理
		processData: false,
		//必须false才会自动加上正确的Content-Type 
		contentType: false,
		xhrFields: {
			withCredentials: false
		},
		success: function(data) {
            loading.hide();
			if(data.code == "00000") {
				weui.toast('图片上传成功！', {
					//var d = data;
					duration: 3000,
					callback: function() {
						window.location.href = "sddown.html";
					}
				});
			} else {
                loading.hide();
				weui.topTips(data.msg);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

		}
	})
}