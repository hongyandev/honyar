//保存上传图片信息的全局变量
var uploadFiles = [];
var openID = "oZIooxJ_MT0M1ApB_4caa_gvXgWc";

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
		alert(uploadFiles[index][0]);
		alert(JSON.stringify(uploadFiles[index][0]));
	}
	formdata.append('openId', openID);
	formdata.append('id', theRequest.mainid);
console.log('XXXXX '+openID);
console.log(formdata);

	$.ajax({
		type: "post",
		url: "http://wx.hongyancloud.com/wxDev/file/saveBillDetails",
		data: formdata,
		timeout: 5000,
		//必须false才会避开jQuery对 formdata 的默认处理 
		processData: false,
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
			weui.topTips('网络异常......');
		}
	})
}

$(function() {
	openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';//$.getCookie('open_id');
	alert(openID);
	var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
		$gallery = $("#gallery"),
		$galleryImg = $("#galleryImg"),
		$uploaderInput = $("#uploaderInput"),
		$uploaderFiles = $("#uploaderFiles");

	$uploaderInput.on("change", function(e) {
		var src, url = window.URL || window.webkitURL || window.mozURL,
			files = e.target.files;

		uploadFiles.push(files)
		for(var i = 0, len = files.length; i < len; ++i) {
			var file = files[i];

			if(url) {
				src = url.createObjectURL(file);
			} else {
				src = e.target.result;
			}

			$uploaderFiles.append($(tmpl.replace('#url#', src)));
		}
	});
	var index; //第几张图片
	$uploaderFiles.on("click", "li", function() {
		index = $(this).index();
		$galleryImg.attr("style", this.getAttribute("style"));
		$gallery.fadeIn(100);
	});
	$gallery.on("click", function() {
		$gallery.fadeOut(100);
	});
	//删除图片 删除图片的代码也贴出来。
	$(".weui-gallery__del").click(function() {
		$uploaderFiles.find("li").eq(index).remove();
	});

	//提交上传的功能
	$("#uploadPic").click(function() {
		console.log(uploadFiles)
		Bt_submit(uploadFiles)
	});

});