
//刷新加载页面
function loadList(action, openid, keyword) {

	$.ajax({
		type: 'get',
        url: genAPI('wxDev/file/'+ action) ,
		data: {
			//openId: openid,
			openId:'oZIooxJ_MT0M1ApB_4caa_gvXgWc',
			content: keyword
		},
		success: function(returnDatas) {

			if(returnDatas.code == "00000") {
				var returnData = returnDatas.data;
				$gallery = $("#gallery")
				$galleryImg = $("#galleryImg");
				$galleryDel = $("#galleryDel");
				var details = $('#details');
				details.empty();
				var str='';
				$.each(returnData,function (i,o) {
                    var clickBT = '<a href="sddown_pic.html?mainid=' + o.id + '" class="addPic"></a>';
                    var deleteBT = '<a href="javascript:void(0)" class="deletePic"></a>';
                    str="<div class='detaId'>";
                    str+="<div class='deta_h'><h1>"+ o.address +"<h1/></div><div class='deta_ul' openid="+o.openId+">";
                    str+="<ul class='clear detaPic' id="+o.id+">";
                    $.each(o.children,function (j,obj) {
                        str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='background-image:url("+obj.fileRealPath+")' style='background-image:url("+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100)'></li>"
                       //明细图片fadeIn
                        $(document).on("click", ".weui-uploader__file", function() {
                            $galleryImg.attr("style", this.getAttribute("realPath"));
                            $galleryDel.attr("imgid", this.getAttribute("imgid"));
                            $gallery.fadeIn(100);
                        });
                    });
                    str+="</ul>";
                    if(o.openId == openid){
                        str+='<ol value="'+o.id+'" class="operatBtn clear"><li>'+clickBT+'</li><li class="delpic">'+deleteBT+'</li></ol>'
                    }else{
                        $(".weui-gallery__opr").hide();
                    }
                    str+='</div><div/>';

                });
                details.html(str);
                //删除水电图和明细
                $(document).on("click",".deletePic",function () {
                    var openID = $(this).parents("ol").parents(".deta_ul").attr("openid");
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
                                    url:genAPI('wxDev/file/deleteDropowerAndDetails'),
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
					$gallery.fadeOut(100);
				});
				$galleryDel.on("click", function() {
					galleryDel(this);
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
	var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
	//var openID=$.getCookie('open_id');
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
			var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
			//var openID=$.getCookie('open_id');
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
				var openID=$.getCookie('open_id');
                //var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
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
	var openID = $.getCookie('open_id');
	$.ajax({
		type: "post",
        url:genAPI('wxDev/file/deleteDropowerDetail'),
		data: {
			openId: openID,
			id: obj.getAttribute("imgid")
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

