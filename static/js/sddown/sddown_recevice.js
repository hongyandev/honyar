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
//刷新加载页面
function loadList(action, openid, keyword) {
    var theRequest = GetRequest();
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
				$gallery = $("#gallery");
				$galleryImg = $("#galleryImg");
				$galleryDel = $("#galleryDel");
				var details = $('#details');
                details.empty();
				var str='';
				$.each(returnData,function (i,o) {
                    var clickBT = '<a href="sddown_pic.html?mainid=' + o.id + '" class="addPic"></a>';
                    var getBT = '<a href="javascript:void(0)" class="getPic"></a>';
                    str+="<div class='detaId'>";
                    str+="<div class='deta_h'>"+
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
                       // str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='background-image:url("+obj.fileRealPath+")' style='background-image:url("+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100)'></li>"
                        str+="<li class='weui-uploader__file' imgid="+obj.id+" realPath='"+obj.fileRealPath+"'>" +
                            "<img src='"+obj.fileRealPath+"?x-oss-process=image/resize,m_fill,h_100,w_100'/>"+
                            "</li>"
                    });
                    str+="</ul>";
                    if(o.validate!='1'){
                        str+='<div value="'+o.id+'" class="opBtn">'+getBT+'<br>认领水电图</div>';
					}
                    str+='</div>';
                });
                details.html(str);
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
                //认领水电图
                $(document).on("click",".opBtn",function(){
                	var rlId = $(this).attr('value');
                    weui.dialog({
                        title: '认领水电图',
                        content: '<div class="weui-cell">\n' +
                        '    <div class="weui-cell__hd"><label class="weui-label1">手机号</label></div>\n' +
                        '    <div class="weui-cell__bd">\n' +
                        '      <input id="wuiTel" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号" value="'+theRequest.tel+'" readonly>\n' +
                        '    </div>\n' +
                        '  </div>' +
						'<div class="weui-cell weui-cell_vcode">\n' +
                        '    <div class="weui-cell__hd">\n' +
                        '      <label class="weui-label1">验证码</label>\n' +
                        '    </div>\n' +
                        '    <div class="weui-cell__bd">\n' +
                        '      <input id="icode" class="weui-input" type="text" placeholder="请输入验证码">\n' +
                        '    </div>\n' +
                        '    <div class="weui-cell__ft">\n' +
                        '      <button id="getcode" class="weui-vcode-btn" onclick="getCode('+theRequest.tel+')">获取验证码</button>\n' +
                        '    </div>\n' +
                        '  </div>',
                        className: 'custom-classname',
                        buttons: [{
                            label: '取消',
                            type: 'default',
                            onClick: function () {
                            	console.info('取消');
                            }
                        }, {
                            label: '确定',
                            type: 'primary',
                            onClick: function () {
                            	console.info('确定');
                            	if($("#icode").val()==""){
                                    weui.topTips('验证码不能为空');
                                    return false;
								};
								$.ajax({
									type:'post',
									url:genAPI('wxDev/dropower/validate'),//'http://172.30.8.95:9999/wxDev/dropower/validate',
									data:{
										id:rlId,
										openId:openid,
										telephone:$("#wuiTel").val(),
										icode:$("#icode").val(),
									},
									success:function (res) {
										if(res.code=='00000'){
                                            setInterval(function () {
												weui.topTips("认领成功！")
                                            },3000);
                                            $(".opBtn").hide();
                                            location.href='sddown.html';

										}

                                    }
								})
                            }
                        }]
                    });
                });
				$("#getcode").on("click",function () {
					var tel = $("#wuiTel").val();
                    getCode(tel)
                });
                $(".weui-closed").on("click", function() {
                    $gallery.fadeOut(100);
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
var theRequest = GetRequest();
var telephone = theRequest.tel;
$(document).ready(function() {
    //var openID = 'owoh4joptj9sj3fU7ULmA0NQiVvI';
    var openID=$.getCookie('open_id');
    loadList('searchDropower', openID, telephone);
});
function getCode(tel) {
        var that = $("#getcode");
        var timeo = 60;
        var timeStop = setInterval(function(){
            timeo--;
            if (timeo>0) {
                that.text('重新发送' + timeo +'s');
                that.attr('disabled','disabled');//禁止点击
            }else{
                timeo = 60;//当减到0时赋值为60
                that.text('获取验证码');
                clearInterval(timeStop);//清除定时器
                that.removeAttr('disabled');//移除属性，可点击
            }
        },1000);
	$.ajax({
		type:'get',
		url:genAPI("wxDev/dropower/sendIcode?telephone="+tel),//"http://172.30.8.95:9999/wxDev/dropower/sendIcode?telephone="+tel,
		success:function (res) {
			if(res.code!='00000'){
				weui.topTips(res.msg);
			}
        }
	})
}
