$(document).ready(function() {
    var openID = 'owoh4jtbf16-9nmh35uvOsvdc0eM';
    //  var openID ='oZIooxHvjmiadIhZXf_40nVrHgd4';
    //  var openID=$.getCookie('open_id');
    loadList("getDropowerAndDetails", openID);
	$("#souBtn").on("click",function () {

    });

});
//刷新加载页面
function loadList(action, openid, keyword) {
	$.ajax({
		type: 'get',
        url: genAPI('wxDev/file/'+ action),
		data: {
			//openId: openid,
			openId:'owoh4jtbf16-9nmh35uvOsvdc0eM',
			content: keyword
		},
		success: function(res) {
			if(res.code == "00000") {
                var data = res.data;
			    var str = '';
			    if(data.length > 0){
                    $.each(data,function (i,o) {
                        str+='<dl class="clear">'
                        str+='<dt class="address"><p openId="'+data[i].openId+'">'+data[i].address+'</p></dt>';
                        for(var j=0;j<o.children.length;j++){
                            str+='<dd picId="'+o.children[j].id+'">\n' +
                                '   <a  href="'+o.children[j].fileRealPath+'" data-gallery="">\n' +
                                '         <img src="'+o.children[j].fileRealPath+'?x-oss-process=image/resize,m_fill,h_100,w_100">\n' +
                                '   </a>\n' +
                                ' </dd>';
                            }
							str+='<div class="blueimp-gallery">' +
								'    <div class="slides"></div>' +
								'    <h3 class="title"></h3>' +
								'    <a class="prev">‹</a>' +
								'    <a class="next">›</a>' +
								'    <a class="close">×</a>' +
								'    <a class="deletePic"></a>' +
								'    <ol class="indicator"></ol>' +
								'</div>';
                        str+='</dl>'
                    });
					$(".ibox-content").html(str);

                    $(document).on("click",".deletePic",function () {
                        var openID = $(this).parents(".blueimp-gallery").siblings("dt").children('p').attr("openId");
                        var detaId = $(this).parents(".blueimp-gallery").siblings("dd").attr("picId");
                        console.info(detaId);
                        return false;
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
                }



		/*		$gallery = $("#gallery")
				$galleryImg = $("#galleryImg");
				$galleryDel = $("#galleryDel");
				var details = $('#details');
                details.html('');
				var str='';
                //console.info(returnData.length>0);
                if(returnData.length > 0){
                    $.each(returnData,function (i,o) {
                        var clickBT = '<a href="sddown_pic.html?mainid=' + o.id + '" class="addPic"></a>';
                        var deleteBT = '<a href="javascript:void(0)" class="deletePic"></a>';
                        var getBT = '<a href="javascript:void(0)" class="getPic"></a>';
                        str+="<div class='detaId'>";
                        str+="<div class='deta_h'><h1>"+ o.address +"</h1></div><div class='deta_ul' openid="+o.openId+">";
                        str+="<ul class='clear detaPic' id="+o.id+">";
                        $.each(o.children,function (j,obj) {
                            //str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='background-image:url("+obj.fileRealPath+")' style='background-image:url("+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100)'></li>"
                            str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='"+obj.fileRealPath+"'>" +
                                "<img src='"+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100'/>"+
                                "</li>"

                        });
                        str+="</ul>";
                        if(o.openId == openid){
                            str+='<ol value="'+o.id+'" class="operatBtn clear"><li>'+clickBT+'</li><li class="delpic">'+deleteBT+'</li></ol></div>'
                        }else{
                            $(".weui-gallery__opr").hide();
                           // str+='<div tel="'+o.userTel+'" value="'+o.id+'" class="opBtn">'+getBT+'<br>认领水电图</div>';

                        }
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
                //认领水电图
                $(document).on("click",".opBtn",function(){
                    var tel=$(this).attr('tel');
                    $(".telInput").val(tel);
                    weui.dialog({
                        content:
                        '<div class="weui-cell">\n' +
                        '                <div class="weui-cell__bd weuiInput">\n' +
                        '                    <input class="weui-input telInput" type="number" pattern="[0-9]*" disabled="disabled"">\n' +
                        '                </div>\n' +
                        '            </div>'+
                        '<div class="weui-cell weui-cell_vcode">\n' +
                        '                <div class="weui-cell__bd weuiInput">\n' +
                        '                    <input class="weui-input" type="tel" placeholder="请输入验证码">\n' +
                        '                </div>\n' +
                        '                <div class="weui-cell__ft">\n' +
                        '                    <button class="weui-vcode-btn weui-code-btn-g">获取验证码</button>\n' +
                        '                </div>\n' +
                        '            </div>',
                        className: 'custom-classname',
                        buttons: [{
                            label: '取消',
                            type: 'default',
                            onClick: function () {

                            }
                        }, {
                            label: '确定',
                            type: 'primary',
                            onClick: function () { alert('确定') }
                        }]
                    });
                });
                */
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

