function Bt_submit() {
	alert('oZIooxJ_MT0M1ApB_4caa_gvXgWc');
	alert($.getCookie('open_id'));
	
	var openID=$.getCookie('open_id');
	var itmType = $('#selType').val();
	var describe = $('#inputName').val();
	var telephone = $('#inputTelphone').val();
	var address = $('#inputAddress').val();
	
	//创建json格式
	var submitJson = new Object();
	submitJson.openId = openID;
	submitJson.itmType = itmType;
	submitJson.describe = describe;
	submitJson.telephone = telephone;
	submitJson.address = address;
	console.log(submitJson)

	if(describe == ""){
		weui.topTips('为方便查询，请输入备注！',3000);
		return;
	}

	if(isPhoneNo(telephone) == false) {
		weui.topTips('请输入正确的手机号码！',3000);
		return;
	}

	$.ajax({
		type:"post",
		url:"http://wx.hongyancloud.com/wxDev/file/saveBill",
		data : {
			openId : openID,
			itmType : $('#selType').val(),
			telephone : $('#inputTelphone').val(),
			address : $('#inputAddress').val(),
			describe : $('#inputName').val()
		},
		success:function(data){
			if (data.code == "00000") {
				weui.toast('新建成功', {
				    duration: 3000,
				    className: 'custom-classname',
				    callback: function(){ 
				    	window.location.href = "history.html"; 
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

$(document).ready(function(){
	$.ajax({
		type:'get',
		url:'http://wx.hongyancloud.com/wxDev/file/getItmType',
		success:function(data){
			if (data.code == "00000") {
				var selType = $('#selType');
				$(data.data).each(function(i,o){
					selType.append("<option value='"+o.itmType+"'>"+o.itmTypeDesc+"</option>");
				});
			}else{
				weui.topTips(data.msg);
			}
		},
		error:function(data){
			weui.topTips('网络异常,请检查您的网络');
		}
	});
});