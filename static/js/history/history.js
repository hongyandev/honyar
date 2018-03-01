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
				$gallery = $("#gallery");
				$galleryImg = $("#galleryImg");
				var details = $('#details');
				//var uploaderFiles = $('#uploaderFiles');
				var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';
				//var img = '<img src="#urlc#">';

				//var uploaderSlider = $('#uploaderSlider');
				//var gallerySlider = $('#gallerySlider');

				$(returnData).each(function(i, o) {
					details.append('<div class="deta_h"><h1>' + o.address + '</></div>');
					details.append('<div class="deta_ul"><ul id=' + o.id + '></div>');
					//gallerySlider.append('<div class="placeholder" id="placeholder_' + o.id + '"></div>');

					var children = o.children;
					var uploaderFiles = $('#' + o.id);
					//var placeholder = $('#placeholder_' + o.id);

					$(children).each(function(j, obj) {
						uploaderFiles.append($(tmpl.replace('#url#', obj.fileRealPath)));
						console.log(obj.fileRealPath)
						
						uploaderFiles.on("click", "li", function() {
							$galleryImg.attr("style", this.getAttribute("style"));
							$gallery.fadeIn(100);
						});
						
						
						//placeholder.append($(img.replace('#urlc#', obj.fileRealPath)));
					});
					var clickBT='<a href="history_pic.html?mainid='+o.id+'" class="weui-uploader__file" style="background-image:url(#url#)"></a>'
					uploaderFiles.append($(clickBT.replace('#url#', "../../static/img/history/add.png")));
					details.append('<div style="clear:both;"></div> ');
				});
				$gallery.on("click", function() {
					//alert(7)
					$gallery.fadeOut(100);
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