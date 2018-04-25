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
    $("#removeCookie").on("click",function () {
        $.ajax({
            type: "get",
            url:genAPI('/wxDev/removeCookieOpenId'),
            dataType: "json",
            success: function(res) {
                if(res.code == "00000") {
                    window.location.href=window.location.href;
                }
            }, error: function(XMLHttpRequest, textStatus, errorThrown) {

            }

        });
    });

    if (!$.isNull(decodeURIComponent($.getCookie('head_url')))) {
        $('#headImg').attr('src',decodeURIComponent($.getCookie('head_url')));
    }
    if (!$.isNull(decodeURIComponent($.getCookie('nick_name')))) {
        $('#nickName').html(decodeURIComponent($.getCookie('nick_name')));
    }
});



