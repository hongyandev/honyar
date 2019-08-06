$(document).ready(function() {
    //$("form").submit(function(){
    //var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    //var openID ='owoh4joptj9sj3fU7ULmA0NQiVvI';
    var openID=$.getCookie('open_id');
    loadList('getDropowerAndDetails', openID);
    //检索后加载列表
        var $searchBar = $('#searchBar'),
            $searchResult = $('#searchResult'),
            $searchText = $('#searchText'),
            $searchInput = $('#searchInput'),
            $searchClear = $('#searchClear'),
            $searchCancel = $('#searchCancel');

        $searchText.on('click', function() {
            $searchBar.addClass('weui-search-bar_focusing');
            $searchInput.focus();
        });

        function hideSearchResult() {
            $searchResult.hide();
            $searchInput.val('');
        }
        //取消按钮
        function cancelSearch() {
            hideSearchResult();
            $searchBar.removeClass('weui-search-bar_focusing');
            $searchText.show();
            loadList('getDropowerAndDetails', openID);
        }

        $searchInput.on('blur', function() {
            if(!this.value.length) cancelSearch();
        });
        /*.on('change', function() {
            var telephone = $('#searchInput').val();
            if(telephone == ""){
                weui.topTips("请输入手机号码");
                return;
            };
            if(isPhoneNo(telephone) == true) {
                //console.info(telephone);
                loadList('searchDropower', openID, telephone);
                $searchResult.show();
                return;

            } else {
                weui.topTips("请填写正确的手机号码",3000);
            }
        })*/

        $("#souBtn").on('click', function() {
            var telephone = $('#searchInput').val();
                if(telephone == ""){
                    weui.topTips("请输入手机号码");
                    return;
                };
                if(isPhoneNo(telephone) == true) {
                        //console.info(telephone);
                        location.href='sddown_recevice.html?tel='+telephone;
                        //loadList('searchDropower', openID, telephone);
                        $searchResult.show();
                        return;

                } else {
                    weui.topTips("请填写正确的手机号码",3000);
                }
            });
        $searchClear.on('click', function() {
            hideSearchResult();
            cancelSearch();
            $searchInput.focus();
        });
        $searchCancel.on('click', function() {
            cancelSearch();
            $searchInput.blur();
        });

  //  });
});
//刷新加载页面
function loadList(action, openid, keyword) {
	$.ajax({
		type: 'get',
        url: genAPI('wxDev/file/'+ action) ,
		data: {
			openId: openid,
			//openId:'oZIooxJ_MT0M1ApB_4caa_gvXgWc',
			content: keyword
		},
		success: function(returnDatas) {
			if(returnDatas.code == "00000") {
				var returnData = returnDatas.data;
				$gallery = $("#gallery")
				$galleryImg = $("#galleryImg");
				$galleryDel = $("#galleryDel");
				var details = $('#details');
                details.html('');
				var str='';
                //console.info(returnData.length>0);
                if(returnData.length > 0){
                    $.each(returnData,function (i,o) {
                        var clickBT = '<a href="sddown_pic.html?mainid=' + o.id + '" class="addPic"></a>';
                        var deleteBT = '<a href="javascript:void(0)" status="'+o.status+'" validate="'+o.validate+'" class="deletePic"></a>';
                        var getBT = '<a href="javascript:void(0)" class="getPic"></a>';
                        str+="<div class='detaId'>";
                        str+="<div class='deta_h'>" +
                            "<div class=\"weui-form-preview__bd\">\n" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">详细地址</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+ o.address +"</span>\n" +
                            "                </div>" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">试压时间</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+o.sysj +"</span>\n" +
                            "                </div>" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">保压时间</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+o.bysj+"</span>\n" +
                            "                </div>" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">起始压力</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+o.ksyl+"</span>\n" +
                            "                </div>" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">结束压力</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+o.jsyl+"</span>\n" +
                            "                </div>" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">过程压降</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+o.yj+"</span>\n" +
                            "                </div>" +
                            "                <div class=\"weui-form-preview__item\">" +
                            "                    <label class=\"weui-form-preview__label\">判断结果</label>\n" +
                            "                    <span class=\"weui-form-preview__value\">"+o.jg+"</span>\n" +
                            "                </div>" +
                            "            </div>"+
                            "</div><div class='deta_ul' openid="+o.openId+">";
                        str+="<ul class='clear detaPic' id="+o.id+">";
                        $.each(o.children,function (j,obj) {
                            //str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='background-image:url("+obj.fileRealPath+")' style='background-image:url("+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100)'></li>"
                            str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='"+obj.fileRealPath+"'>" +
                                "<img src='"+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100'/>"+
                                "</li>"

                        });
                        str+="</ul>";
                        str+='<ol value="'+o.id+'" class="operatBtn clear">' +
                                '<li>'+clickBT+'</li>' +
                                '<li class="delpic">'+deleteBT+'</li>' +
                                '</ol></div>'
                        str+='</div>';
                    });
                    details.html(str);
                }else{
                   str+="<div class='empty align_center'><span>此手机号码还没有上传水电图！</span></div>";
                   //$(".content").html(str);
                    details.html(str);
               }

                //明细图片fadeIn
                $(".detaPic").on("click", "li", function() {
                    $(this).toggleClass("current").siblings().removeClass("current");
                    $galleryImg.attr("src", this.getAttribute("realPath"));
                    $galleryDel.attr("imgid", this.getAttribute("imgid"));
                    $gallery.show();

                    $galleryImg.get(0).onload = function (){
                        var picH=$("#galleryImg").height();
                        var picW=$("#galleryImg").width();
                        console.log(picH);
                        console.log(picW);
                        $galleryImg.css({"margin-top":-parseFloat(picH)/2+"px","margin-left":-parseFloat(picW)/2+"px"})
                    };
                });
                //删除水电图和明细
                $(document).on("click",".deletePic",function () {
                    var openID = $(this).parents("ol").parents(".deta_ul").attr("openid");
                    var detaId = $(this).parents("ol").attr("value");
                    var status = $(this).attr('status');
                    var validate = $(this).attr('validate');
                    if(status=='1' || validate=='1' ){
                        weui.topTips('此水电图不能删除！');
                        return false;
                    }
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
                $(".weui-closed").on("click", function() {
                    $gallery.fadeOut(100);
                });
				$galleryDel.on("click", function() {
					galleryDel(this);
				});

			} else {
				weui.topTips(returnDatas.msg);
			}
		},
		error: function(data) {
			weui.topTips('网络异常,请检查您的网络');
		}
	});

}






//删除图片明细方法
function galleryDel(obj) {
	//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    //var openID ='oZIooxHvjmiadIhZXf_40nVrHgd4';
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

