$(function () {
    var openID=$.getCookie('open_id');
	//var openID='oZIooxJ_MT0M1ApB_4caa_gvXgWc';
	//var openID='owoh4joV0zYw7mbFhNkyNmYaeATw';
    $.ajax({
        type: "get",
		url:genAPI('wxDev/user/judgeRegister?openId='+openID),
        //url: "http://wx.hongyancloud.com/wxDev/user/judgeRegister?openId="+openID,
        dataType: "json",
        success: function(res) {
            if(res.code == "00000") {
                jQuery(".top_info label").html("个人中心");
                jQuery(".top_info a").attr("href","../member/member.html");
                jQuery('.openId').html(openID);
            }else{
                jQuery(".top_info label").html("注册");
                jQuery(".top_info a").attr("href","../login/login.html");
            }
			/*if(openID=="oZIooxJ_MT0M1ApB_4caa_gvXgWc"){
            	$("#btn").show();
			}*/
        }, error: function(XMLHttpRequest, textStatus, errorThrown) {

        }

   });
		
			$.ajax({
				type: "get",
				url: genAPI('wxDev/qrcode/preferential?openId=' + openID),
				//url: "http://wx.hongyancloud.com/wxDev/qrcode/preferential?openId=" + openID,
				dataType: "json",
				success: function(res) {
					if(res.code == '00000') {
						jQuery(".hxAddress").html(res.data.address);
						jQuery(".Opentime time").html(res.data.openTime);
						jQuery(".jxstel").html(res.data.telephone);
						jQuery(".jxstel").attr("href", "tel:" + res.data.telephone);
					} else {
						jQuery(".hxAddress").html("浙江省杭州市余杭区138号");
						jQuery(".Opentime time").html("7:00-20:00");
						jQuery(".jxstel").html("4008267818");
						jQuery(".jxstel").attr("href", "tel:" + "4008267818");
					}
				}
			})
	
    $("#userPic").on("click",function () {
        var obj = $(this);
        obj.attr({"disable":true});
        $.ajax({
            type: "post",
            url:genAPI('/wxDev/refreshHeaderUrl'),
            data:{
                "openId":openID,
            },
            dataType: "json",
            success: function(res) {
                obj.attr({"enable":true});
                if(res.code == "00000") {
                    //window.location.href= window.location.href;
                    if (!$.isNull(decodeURIComponent($.getCookie('head_url')))) {
                         $('#headImg').attr('src',decodeURIComponent($.getCookie('head_url')));
                     }
                     if (!$.isNull(decodeURIComponent($.getCookie('nick_name')))) {
                         $('#nickName').html(decodeURIComponent($.getCookie('nick_name')));
                     }
                }
            }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                obj.enable({"enable":true});
            }

        });
    });
});

jQuery(document).ready(function($) {
	$('.fadeOut').owlCarousel({
		items: 1,
		animateOut: 'fadeOut',
		loop: true,
		margin: 10,
	});
	$('.custom1').owlCarousel({
		animateOut: 'slideOutDown',
		animateIn: 'flipInX',
		items: 1,
		margin: 30,
		stagePadding: 30,
		smartSpeed: 450
	});
	
	if (!$.isNull(decodeURIComponent($.getCookie('head_url')))) {
		$('#headImg').attr('src',decodeURIComponent($.getCookie('head_url')));
	}
	if (!$.isNull(decodeURIComponent($.getCookie('nick_name')))) {
		$('#nickName').html(decodeURIComponent($.getCookie('nick_name')));
	}
});

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);









