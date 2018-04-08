$(function () {
    var openID=$.getCookie('open_id');
    //var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    var loading = false;
    var page=1;
    record();

//向下拉
$(document.body).pullToRefresh().on("pull-to-refresh", function() {
        setTimeout(function() {
            page = 1;
            $(".infoList").html("");
            record();
            $(".weui-loadmore").html("<i class=\"weui-loading\"></i>\n" +
                "    <span class=\"weui-loadmore__tips\">上拉加载更多</span>");
            $(document.body).pullToRefreshDone();
        }, 1000);
    });

//向上拉
$(document.body).infinite().on("infinite", function() {
    page++;
    setTimeout(function(){
        $.ajax({
            type: "get",
            url: "http://wx.hongyancloud.com/wxDev/verificate/getVerificateFenye?page="+page,
            dataType: "json",
            data: {
                "openId":openID,
                "pageNum":page++,
                "pageSize":"6"
            },success: function(res) {
                if(res.code == "00000") {
                    if(res.data.pages < page){
                        $(".weui-loadmore").html(" <span class=\"weui-loadmore__tips\">我已经到底了...</span>");
                        return;
                    }
                    var str="";
                    $.each(res.data.list,function (index,val){
                            str+= "<li class=\"weui-cell weui-cell_swiped\"  value='"+val.id+"'>"+
                                " <div class=\"weui-cell__bd\" style=\"transform: translate3d(0px, 0px, 0px);\">\n" +
                                "                <div class=\"weui-cell__bd\">\n";
                            if(val.status==1){
                                str+= "<p class='binfo clear'><em class='fri red'>"+val.desc+"</em></p>";
                            }else{
                                str+= "<p class='binfo clear'><em class='fri gray'>"+val.desc+"</em></p>";
                            }
                            str+="                    <p class=\"cInfo\">\n" +
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
                                "         </div>\n" ;
                            if(val.status==1){
                                str+= "<div class=\"weui-cell__ft\" status='"+val.status+"'>\n" +
                                    "<button class=\"weui-swiped-btn weui-swiped-btn_warn delete-swipeout\" href=\"javascript:\">删除</button>\n" +
                                    "</div>";
                            }else{
                                str+= "<div class=\"weui-cell__ft\" status='"+val.status+"'>\n" +
                                    "<button class=\"weui-swiped-btn weui-swiped-btn_warn delete-swipeout btnGray\" disabled='disabled' href=\"javascript:\">删除</button>\n" +
                                    "</div>";
                            }
                            str+= "</li>"
                        });
                    $('.infoList').append(str);

                }
                $('.weui-cell_swiped').swipeout();
            }, error: function(XMLHttpRequest, textStatus, errorThrown) {

            }

        });
        loading = false;
    }, 1000);
});

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

//record()
 function record(){
        $.ajax({
            type: "get",
            url: "http://wx.hongyancloud.com/wxDev/verificate/getVerificateFenye?page="+page,
            dataType:"json",
            data: {
                "openId":openID,
                "pageNum":page,
                "pageSize":"6"
            },
            success: function(res) {

                if(res.code == "00000") {
                    if(res.data.pages <= page){
                       // $(".weui-loadmore").html(" <span class=\"weui-loadmore__tips\">已经加载完全部数据</span>")
                       $(".weui-loadmore").hide();
                    }
                    var str="";
                    $.each(res.data.list,function (index,val){
                        str+= "<li class=\"weui-cell weui-cell_swiped\"  value='"+val.id+"'>"+
                            " <div class=\"weui-cell__bd\" style=\"transform: translate3d(0px, 0px, 0px);\">\n" +
                            "                <div class=\"weui-cell__bd\">\n";
                        if(val.status==1){
                            str+= "<p class='binfo clear'><em class='fri red'>"+val.desc+"</em></p>";
                        }else{
                            str+= "<p class='binfo clear'><em class='fri gray'>"+val.desc+"</em></p>";
                        }
                        str+="                    <p class=\"cInfo\">\n" +
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
                            "         </div>\n" ;
                        if(val.status==1){
                            str+= "<div class=\"weui-cell__ft\" status='"+val.status+"'>\n" +
                                "<button class=\"weui-swiped-btn weui-swiped-btn_warn delete-swipeout\" href=\"javascript:\">删除</button>\n" +
                                "</div>";
                        }else{
                            str+= "<div class=\"weui-cell__ft\" status='"+val.status+"'>\n" +
                                "<button class=\"weui-swiped-btn weui-swiped-btn_warn delete-swipeout btnGray\" disabled='disabled' href=\"javascript:\">删除</button>\n" +
                                "</div>";
                        }

                        str+= "</li>"
                    });
                    $('.infoList').html(str);


                }else{
                    weui.topTips(res.msg);
                };
                $('.weui-cell_swiped').swipeout();



            }, error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
});













