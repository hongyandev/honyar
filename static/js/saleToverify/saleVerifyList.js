$(function () {
    //var openID=$.getCookie('open_id');
    var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    var page = 1;
    $.ajax({
        type: "get",
        url: "http://wx.hongyancloud.com/wxDev/verificate/getVerificateFenye?page=1",
        dataType:"json",
        data: {
            "openId":'oZIooxJ_MT0M1ApB_4caa_gvXgWc',
            "pageNum":1,
            "pageSize":"10"
        },
        success: function(res) {
            if(res.code == "00000") {
                var str="<ul>";
                $.each(res.data.list,function (index,val){
                    str+= "<li class=\"weui-cell weui-cell_swiped\">"+
                        " <div class=\"weui-cell__bd\" style=\"transform: translate3d(0px, 0px, 0px);\">\n" +
                        "                <div class=\"weui-cell__bd\">\n" +
                        "                    <p class=\"cInfo\">\n" +
                        "                        <span class=\"font14\">"+val.customer+"</span>\n" +
                        "                        <span class=\"font12\">共计:<b class=\"font14\">￥"+val.totalMoney+"</b></span>\n" +
                        "                        <span class=\"font12\">优惠:<b class=\"font14\">￥"+val.discountAmount+"</b></span>\n" +
                        "                    </p>\n" +
                        "                    <div class=\"binfo clear\">\n" +
                        "                        <span class=\"fle\">"+val.name+"</span>\n" +
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
                str+="</ul>";
                $('.infoList').html(str);
                $('.weui-cell_swiped').swipeout();
            }
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
                            "openId":'oZIooxJ_MT0M1ApB_4caa_gvXgWc',
                            "pageNum":page++,
                            "pageSize":"10"
                        },success: function(res) {
                            if(res.code == "00000") {
                                var str="<ul>";
                                $.each(res.data.list,function (index,val){
                                    str+= "<li class=\"weui-cell weui-cell_swiped\">"+
                                        " <div class=\"weui-cell__bd\" style=\"transform: translate3d(0px, 0px, 0px);\">\n" +
                                        "                <div class=\"weui-cell__bd\">\n" +
                                        "                    <p class=\"cInfo\">\n" +
                                        "                        <span class=\"font14\">"+val.customer+"</span>\n" +
                                        "                        <span class=\"font12\">共计:<b class=\"font14\">￥"+val.totalMoney+"</b></span>\n" +
                                        "                        <span class=\"font12\">优惠:<b class=\"font14\">￥"+val.discountAmount+"</b></span>\n" +
                                        "                    </p>\n" +
                                        "                    <div class=\"binfo clear\">\n" +
                                        "                        <span class=\"fle\">"+val.name+"</span>\n" +
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
                                str+="</ul>";
                                $('.infoList').append(str);
                                $('.weui-cell_swiped').swipeout();
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

});

