$(function () {
    var openID=$.getCookie('open_id');
  // var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    record();

    //删除
    $(document).on("click", ".delete-swipeout", function() {
        var recordid=$(this).parents("li").attr("value");

        $.confirm("", "您确定要删除文件这条记录吗?", function() {
            $.ajax({
                type:"post",
                url: "http://wx.hongyancloud.com/wxDev/verificate/deleteVerificateAndDetails",
                dataType:"json",
                data: {
                    "openId":openID,
                    "id":recordid
                }, success: function(res) {
                    if(res.code==00000){
                        $.toast("文件已经删除!", 2000,function() {
                            window.location.href=window.location.href;
                        });
                    }
                }
            });
        }, function() {
            $('.weui-cell_swiped').swipeout('close');
            //取消操作
        });
    });




});
function record(){
    var openID=$.getCookie('open_id');
    //var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    var page = 1;
    $.ajax({
        type: "get",
        url: "http://wx.hongyancloud.com/wxDev/verificate/getVerificateFenye?page=1",
        dataType:"json",
        data: {
            "openId":openID,
            "pageNum":1,
            "pageSize":"10"
        },
        success: function(res) {
            $('.weui-cell_swiped').swipeout();
            if(res.code == "00000") {
                var str="";
                $.each(res.data.list,function (index,val){
                    str+= "<li class=\"weui-cell weui-cell_swiped\"  value='"+val.id+"'>"+
                        " <div class=\"weui-cell__bd\" style=\"transform: translate3d(0px, 0px, 0px);\">\n" +
                        "                <div class=\"weui-cell__bd\">\n" +
                        "                    <p class=\"cInfo\">\n" +
                        "                        <span class=\"font14\">"+val.customer+"</span>\n" +
                        "                        <span class=\"font12\">共计:<b class=\"font14\">￥"+val.totalMoney+"</b></span>\n" +
                        "                        <span class=\"font12\">优惠:<b class=\"font14\">￥"+val.discountAmount+"</b></span>\n" +
                        "                    </p>\n" +
                        "                    <div class=\"binfo clear\">\n" +
                        "                        <span class=\"fle\">"+val.name+"&nbsp;&nbsp;</span>\n" +
                        "                        <span class=\"fle\">"+val.telephone+"</span>\n" +
                        "                        <time class=\"fri\">"+val.verificateDate+"</time>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "         </div>\n" +
                        "        <div class=\"weui-cell__ft\">\n" +
                        "            <a class=\"weui-swiped-btn weui-swiped-btn_warn delete-swipeout\" href=\"javascript:\">删除</a>\n" +
                        "        </div>"+
                        "      </li>"
                });

                $('.infoList').html(str);

            }else{
                weui.topTips(res.msg);
            };


                var loading = false;
                $(document.body).infinite().on("infinite", function() {
                    if(loading) return;
                    loading = true;
                    setTimeout(function(){
                        if(page > res.data.pages){
                            $(".weui-loadmore").html(" <span class=\"weui-loadmore__tips\">我已经到底了...</span>");
                            return;
                        };
                        $.ajax({
                            type: "get",
                            url: "http://wx.hongyancloud.com/wxDev/verificate/getVerificateFenye?page="+page,
                            dataType: "json",
                            data: {
                                "openId":openID,
                                "pageNum":page++,
                                "pageSize":"10"
                            },success: function(res) {
                                $('.weui-cell_swiped').swipeout();
                                if(res.code == "00000") {
                                    var str="";
                                    $.each(res.data.list,function (index,val){
                                        str+= "<li class=\"weui-cell weui-cell_swiped\" value='"+val.id+"'>"+
                                            "   <div class=\"weui-cell__bd\" style=\"transform: translate3d(0px, 0px, 0px);\">\n" +
                                            "                <div class=\"weui-cell__bd\">\n" +
                                            "                    <p class=\"cInfo\">\n" +
                                            "                        <span class=\"font14\">"+val.customer+"</span>\n" +
                                            "                        <span class=\"font12\">共计:<b class=\"font14\">￥"+val.totalMoney+"</b></span>\n" +
                                            "                        <span class=\"font12\">优惠:<b class=\"font14\">￥"+val.discountAmount+"</b></span>\n" +
                                            "                    </p>\n" +
                                            "                    <div class=\"binfo clear\">\n" +
                                            "                        <span class=\"fle\">"+val.name+"&nbsp;&nbsp;</span>\n" +
                                            "                        <span class=\"fle\">"+val.telephone+"</span>\n" +
                                            "                        <time class=\"fri\">"+val.verificateDate+"</time>\n" +
                                            "                    </div>\n" +
                                            "                </div>\n" +
                                            "         </div>\n" +
                                            "        <div class=\"weui-cell__ft\">\n" +
                                            "            <a class=\"weui-swiped-btn weui-swiped-btn_warn delete-swipeout\" href=\"javascript:\">删除</a>\n" +
                                            "        </div>"+
                                            "      </li>"
                                    });

                                    $('.infoList').append(str);
                                }

                            }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                            }
                        });
                        loading = false;
                    }, 1000);
                });

        }, error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

