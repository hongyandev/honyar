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
	if (!$.isNull($.getCookie('head_url'))) {
		$('#headImg').attr('src',$.getCookie('head_url'));
	}
	if (!$.isNull(decodeURIComponent($.getCookie('nick_name')))) {
		$('#nickName').html(decodeURIComponent($.getCookie('nick_name')));
	}
});

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);