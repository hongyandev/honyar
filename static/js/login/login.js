//提交注册
function Bt_submit() {
	var telephone = $('#inputTelNumber').val();
	var iCode = $('#inpu_YZM').val();
	var vipname = $('#vipname').val();

	if(vipname == "") {
		weui.topTips('姓名必填',3000);
		return;
	}

	if(isPhoneNo(telephone) == false) {
		weui.topTips('请输入正确的手机号码',3000);
		return;
	}


	$.ajax({
		type:"post",
		url:"http://wx.hongyancloud.com/wxDev/user/saveHyUser",
		data:{
			openId : $.getCookie('open_id'),
			name : vipname,
			telephone : telephone,
			iCode : iCode
		},
		success:function(data){
			if (data.code == "00000") {
				weui.toast('注册成功', {
				    duration: 3000,
				    className: 'custom-classname',
				    callback: function(){ 
				    	window.location.href = "../index.html"; 
				    }
				});
			} else{
				weui.topTips(data.msg);
			}
		},
		error:function(data){
			weui.topTips('网络异常,请检查您的网络');
		}
	});
}

//获取验证码
function getYZM() {
	var telephone = $('#inputTelNumber').val();
	if(isPhoneNo(telephone) == false) {
		weui.topTips('请填写正确的手机号',3000);
		return;
	}

	var obj = $("#YZM");
	settime(obj);

	/*$.ajax({
		type: "GET",
		//async: false,
		url: "http://wx.hongyancloud.com/wxDev/user/sendIcodeJsonp2?telephone=" + telephone,
		dataType: "jsonp", //数据类型为jsonp
		jsonp: "callback", //服务端用于接收callback调用的function名的参数
		success: function(data) {
			console.log(data)
			alert(data.code);
		},
		error: function(data) {
			alert(data.code + "b");
		}
	});*/
	
	$.ajax({
		type:'get',
		url:"http://wx.hongyancloud.com/wxDev/user/sendIcode?telephone="+telephone,
		success:function (data) {
			if (data.code == "00000") {
				weui.toast('短信已发送,请注意查收', 3000);
			} else{
				weui.topTips(data.msg);
				countdown = 0;
				obj.attr('disabled', false);
				obj.val("获取验证码");
			}
		},
		error:function(data){
			weui.topTips('网络异常,请检查您的网络');
		}
	});
}

//发送验证码倒计时
var countdown = 60;
function settime(obj) {
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("重新发送(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}

jQuery(document).ready(function() {
	if (!$.isNull($.getCookie('head_url'))) {
		$('#headImg').attr('src',$.getCookie('head_url'));
	}
	if (!$.isNull(decodeURIComponent($.getCookie('nick_name')))) {
		$('#nickName').html(decodeURIComponent($.getCookie('nick_name')));
	}
	$('#remaindMsg').on('click','.weui-dialog__btn',function(){
		$(this).parents('.js_dialog').fadeOut(200);
	});
});