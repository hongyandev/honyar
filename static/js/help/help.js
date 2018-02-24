$(function(){
	$("table[id^='list'] tr:even:gt(0)").addClass("tr_even");
	$("table[id^='list'] tr:odd").addClass("tr_odd");
	//$("#list tr:gt(0)").mouseover(function(){$(this).addClass("tr_hover");}).mouseout(function(){$(this).removeClass("tr_hover");});
});

function JsEncode(str)
{
	str = str.replace(/\+/g, "%2B");
	str = str.replace(/\&/g, "%26");
	return str;
}

function GetUserSign()
{
	$("#UserSign_String").html("<img alt=\"loading...\" src=\"/Images/ajax.gif\" />");

	var AppId = $("#AppId").val();
	var UserToken = $("#UserToken").val();
	var Timestamp = $("#Timestamp").val();
	var AjaxData = "AppId=" + AppId + "&UserToken=" + UserToken + "&Timestamp=" + Timestamp;

	$.ajax({
		type: "Post",
		url: "/d/ajax.html?oper=GetUserSign&m=" + Math.random(),
		data: AjaxData,
		dataType: "html",
		success: function(html){
			$("#UserSign_String").html(html);
		},
		error: function(){$("#UserSign_String").html("<div class=\"error\">数据加载失败</div>");}
	});
}