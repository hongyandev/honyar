
//刷新加载页面
function loadList(action, openid, keyword) {

	$.ajax({
		type: 'get',
        url: genAPI('wxDev/file/'+ action) ,
		//url: 'http://wx.hongyancloud.com/wxDev/file/' + action,
		data: {
			openId: openid,
			//openId:'oZIooxJ_MT0M1ApB_4caa_gvXgWc',
			content: keyword
		},
		success: function(returnDatas) {
			//console.log(returnDatas)
			if(returnDatas.code == "00000") {
				var returnData = returnDatas.data;
				$gallery = $("#gallery");
				$galleryImg = $("#galleryImg");
				$galleryDel = $("#galleryDel");
				var details = $('#details');
				details.empty();
				//var uploaderFiles = $('#uploaderFiles');
				var tmpl = '<li class="weui-uploader__file" imgid="#imgid#" style="background-image:url(#url#)"></li>';
				//var img = '<img src="#urlc#">';

				//var uploaderSlider = $('#uploaderSlider');
				//var gallerySlider = $('#gallerySlider');
                    var str='';
				$(returnData).each(function(i, o) {
                    var clickBT = '<a href="sddown_pic.html?mainid=' + o.id + '" class="addPic"></a>'
                    var deleteBT = '<a href="javascript:void(0)" class="deletePic"></a>';
					details.append('<div class="detaId"><div class="deta_h"><h1>' + o.address + '<h1/></div><div class="deta_ul"><ul class="clear" id=' + o.id + '></ul>');
                    details.append('<ol value="'+o.id+'" class="operatBtn clear"><li>'+clickBT+'</li><li class="delpic">'+deleteBT+'</li></ol>');
                    details.append('</div></div>');
                    //gallerySlider.append('<div class="placeholder" id="placeholder_' + o.id + '"></div>');

					var children = o.children;
					var uploaderFiles = $('#' + o.id);
					//var placeholder = $('#placeholder_' + o.id);

					$(children).each(function(j, obj) {
						var imgtmpl = tmpl.replace('#url#', obj.fileRealPath);
						imgtmpl = imgtmpl.replace('#imgid#', obj.id);
						uploaderFiles.append($(imgtmpl));

						console.log(obj.fileRealPath)
						console.log(obj.id)
						uploaderFiles.on("click", "li", function() {
							$galleryImg.attr("style", this.getAttribute("style"));
							$galleryDel.attr("imgid", this.getAttribute("imgid"));
							$gallery.fadeIn(100);
						});

						//placeholder.append($(img.replace('#urlc#', obj.fileRealPath)));
					});

                    //details.append($(clickBT.replace('#url#', "../../static/img/sddown/add.png")));

				});
                //删除水电图和明细
                $(document).on("click",".delpic",function () {
                   //var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
                    var openID = $.getCookie('open_id');
                    var detaId = $(this).parents("ol").attr("value");
                    weui.confirm('您确定要删除文件这条记录吗?', {
                        buttons: [{
                            label: '取消',
                            type: 'default',
                            onClick: function(){
                            }
                        }, {
                            label: '确定',
                            type: 'primary',
                            onClick: function(){
                                $.ajax({
                                    type: "post",
                                    url: "http://wx.hongyancloud.com/wxDev/file/deleteDropowerAndDetails",
                                    data: {
                                        openId: openID,
                                        id: detaId
                                    },
                                    success: function(data) {
                                        if(data.code == "00000") {
                                            weui.toast('删除成功', {
                                                duration: 3000,
                                                callback: function(){
                                                    window.location.href = window.location.href;
                                                }
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
                        }]
                    });

                });

				$galleryImg.on("click", function() {
					//console.log(this);
					$gallery.fadeOut(100);
				});
				$galleryDel.on("click", function() {
					//console.log(this.getAttribute("imgid"));
					//var imgId = this.getAttribute("imgid");
					galleryDel(this);
					//alert(imgId);
				})
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
	//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
	var openID=$.getCookie('open_id');
	loadList('getDropowerAndDetails', openID)
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
		$(document).ready(function() {
			//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
			var openID=$.getCookie('open_id');
			loadList('getDropowerAndDetails', openID)
		});
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
				//var openID=$.getCookie('open_id');

                var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
                alert(this.openID);
				loadList('searchDropower', openID, this.value);

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



//删除图片明细方法
function galleryDel(obj) {
	//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
	//console.log(obj.getAttribute("imgid"))
	var openID = $.getCookie('open_id');
	$.ajax({
		type: "post",
        url:genAPI('wxDev/file/deleteDropowerDetail')
		//url: "http://wx.hongyancloud.com/wxDev/file/deleteDropowerDetail",
		data: {
			openId: openID,
			id: obj.getAttribute("imgid")
		},
		success: function(data) {
			if(data.code == "00000") {
                /*$.toast("删除成功",3000,function() {
                   window.location.href = window.location.href;
                });*/
                weui.toast('删除成功', {
                    duration: 3000,
                    callback: function(){
                        window.location.href = window.location.href;
                    }
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
//function reLoad() {
//	var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc'; //'oZIooxJ_MT0M1ApB_4caa_gvXgWc'
//	//var openID=$.getCookie('open_id');//'oZIooxJ_MT0M1ApB_4caa_gvXgWc'
//	loadList('getDropowerAndDetails', openID)
//};
