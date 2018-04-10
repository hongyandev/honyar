$(function () {
   var openID=$.getCookie('open_id');
	//var openID='oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    $.ajax({
        type: "get",
		url:genAPI('wxDev/user/judgeRegister?openId='+openID),
        //url: "http://wx.hongyancloud.com/wxDev/user/judgeRegister?openId="+openID,
        dataType: "json",
        success: function(res) {
            if(res.code == "00000") {
                jQuery(".top_info label").html("个人中心");
                jQuery(".top_info a").attr("href","member/member.html");
            }else{
                jQuery(".top_info label").html("注册");
                jQuery(".top_info a").attr("href","login/login.html");
            }

        }, error: function(XMLHttpRequest, textStatus, errorThrown) {

        }

    });
})





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









