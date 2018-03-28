jQuery(document).ready(function($) {
	//这个是调用微信的jssdk将需要用到的功能进行注入
	weixin.config({
		debug: false,
		jsApiList: ['hideOptionMenu']
	});
	weixin.ready(function () {
		weixin.hideOptionMenu();
	});
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