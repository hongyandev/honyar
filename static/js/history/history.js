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

				var details = $('#details');
				var uploaderFiles = $('#uploaderFiles');
				var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';

				$(returnData).each(function(i, o) {
					details.append('<div class="deta_h">' + '<h1>' + o.id + '</>' + '</div>');
					details.append('<div class="deta_ul">' + '<ul id=' + o.id + '>' + '</div>');

					var children = o.children;
					var uploaderFiles = $('#' + o.id);

					$(children).each(function(j, obj) {

						uploaderFiles.append($(tmpl.replace('#url#', obj.fileRealPath)));
						console.log(obj.fileRealPath)
					});
					details.append('<div style="clear:both;"></div> ');

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