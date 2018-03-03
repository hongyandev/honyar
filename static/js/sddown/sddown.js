//刷新加载页面
function loadList(action, openid, keyword){
	
	$.ajax({
		type: 'get',
		url: 'http://wx.hongyancloud.com/wxDev/file/'+action,
		data: {
			openId: openid, //$.getCookie('open_id')
			content: keyword,
		},
		success: function(returnDatas) {
			console.log(returnDatas)

			if(returnDatas.code == "00000") {
				var returnData = returnDatas.data;
				$gallery = $("#gallery");
				$galleryImg = $("#galleryImg");
				var details = $('#details');
				details.empty();
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
					var clickBT = '<a href="sddown_pic.html?mainid=' + o.id + '" class="weui-uploader__file" style="background-image:url(#url#)"></a>'
					uploaderFiles.append($(clickBT.replace('#url#', "../../static/img/sddown/add.png")));
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

}
$(document).ready(function() {
	loadList('getDropowerAndDetails',$.getCookie('open_id'))
});

//检索后加载列表
$(function() {
	var $searchBar = $('#searchBar'),
		$searchResult = $('#searchResult'),
		$searchText = $('#searchText'),
		$searchInput = $('#searchInput'),
		$searchClear = $('#searchClear'),
		$searchCancel = $('#searchCancel');

	function hideSearchResult() {
		$searchResult.hide();
		$searchInput.val('');
	}

	function cancelSearch() {
		hideSearchResult();
		$searchBar.removeClass('weui-search-bar_focusing');
		$searchText.show();
	}

	$searchText.on('click', function() {
		$searchBar.addClass('weui-search-bar_focusing');
		$searchInput.focus();
	});
	$searchInput
		.on('blur', function() {
			if(!this.value.length) cancelSearch();
		})
		.on('change', function() {
			if(this.value.length) {
				//alert(this.value)

				loadList('searchDropower','oZIooxJ_MT0M1ApB_4caa_gvXgWc',this.value);

				$searchResult.show();
			} else {
				$searchResult.hide();
			}
		});
	$searchClear.on('click', function() {
		hideSearchResult();
		$searchInput.focus();
	});
	$searchCancel.on('click', function() {
		cancelSearch();
		$searchInput.blur();
	});
});