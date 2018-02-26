$(document).ready(function() {
	$.ajax({
		type: 'get',
		url: 'http://wx.hongyancloud.com/wxDev/file/getBillAndDetails',
		data: {
			openId: 'oZIooxJ_MT0M1ApB_4caa_gvXgWc', //$.getCookie('open_id')
		},
		success: function(returnDatas) {
			console.log(returnDatas)
			
			if(returnDatas.code == "00000") {
				
				var returnData = returnDatas.data;
				
				var address = $('#address');
				var uploaderFiles = $('#uploaderFiles');
				var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';
				
				$(returnData).each(function(i, o) {
					address.append("<li> 地点：" + o.address + "</li>");
					
					var children = o.children;
					$(children).each(function(j, obj) {
			
						uploaderFiles.append($(tmpl.replace('#url#', obj.fileRealPath)));
						console.log(obj.fileRealPath)
					});

				});
			} else {
				weui.topTips(data.msg);
			}
		},
		error: function(data) {
			weui.topTips('网络异常,请检查您的网络');
		}
	});
});