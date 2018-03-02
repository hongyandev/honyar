function Bt_submit() {

	var itmType = $('#selType').val();
	var describe = $('#inputName').val();
	var telephone = $('#inputTelphone').val();
	var address = $('#inputAddress').val();
	var openId = '123';
	
	//创建json格式
	var submitJson = new Object();
	submitJson.openId = openId;
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
	
	
	

	/*var datalist=[];
	datalist.push(submitJson);
	datalist.push(submitJson);
	for (var i=0;i<datalist.length;i++) {
		console.log(i+datalist[i].name)
	}*/

	//ajx请求，成功后将页面转向至指定界面
	/*$.ajax({
		type: "get",//http://114.55.73.4:8080/wxDev/file/saveBill
		url: "http://wx.hongyancloud.com/wxDev/user/saveHyUserJsonp?telephone=" + submitJson.telphone + "&iCode=1234",
		dataType: "jsonp", //数据类型为jsonp
		jsonp: "callback", //服务端用于接收callback调用的function名的参数
		success: function(data) {
			alert("success");
		},
		error: function(data) {
			alert("重定向");
			window.location.href = "history.html";
		}
	});*/
	
	$.ajax({
		type:"post",
		url:"http://wx.hongyancloud.com/wxDev/file/saveBill",
		data : {
			openId : 'oZIooxJ_MT0M1ApB_4caa_gvXgWc',//$.getCookie('open_id'),
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