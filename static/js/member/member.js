//刷新加载页面
$(function () {
    var openID=$.getCookie('open_id');
    //var openID='oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    $.ajax({
        type: "get",
        url:genAPI('/wxDev/user/getUserInfo?openId='+openID),
        dataType: "json",
        success: function(res) {
            if(res.code == "00000") {
                jQuery(".userName").html(res.data.name);
                jQuery(".userTel").html(res.data.telephone);
            }
        }, error: function(XMLHttpRequest, textStatus, errorThrown) {

        }

    });
});



