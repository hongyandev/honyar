
var catalogIds = [];
var pageSize = 1;//当前页码
var limit = 6;//每页显示条数
var isOver = true;//是否加载完
var offset = (pageSize - 1) * limit;
var typeArr = [];
var key = "";
var sign = false;
var jsonstr;
var data = {
    key: key,
    arr: typeArr,
    limit: limit,
    offset: offset
};

$(function () {
    $("#pullrefresh").height($(window).height());
    $(".navTabs").height($(window).height()-140+"px");
    //筛选
    catalogType();
    navTabs();
    //渲染产品列表
    $($(".navTabs ul li").get(1)).on("click",function () {
        //console.info(111);
        typeArr = [];
        $(".active").each(function (i, obj) {
            if ($(obj).attr('itemValue') != '') {
                typeArr.push({classId: $(obj).attr("fieldid"), classValue: $(obj).attr("itemValue")})
            }
        });
        data.arr = typeArr;
        pageSize = 0;
        offset = pageSize * limit;//每次传入后台的数据条数，比如0  10  20
        data.offset = offset;
        jsonstr = JSON.stringify(data);
        catalogData(jsonstr);
    });
    jsonstr = JSON.stringify(data);
    catalogData(jsonstr);

    $($(".navTabs ul li").get(1)).click();
    //全文检索
    $("#search").on("focus", function () {
        $("#muiClear").show();
        $(".searchIcon").hide()
    });
    $("#search").on("blur", function () {
        $("#muiClear").hide();
        $(".searchIcon").show();
    });
    $(".muiSearch").on('tap', '#muiClear', function () {
        key = $("#search").val();
        data.key = key;
        jsonstr = JSON.stringify(data);
        catalogData(jsonstr);
    });
    $("#search").on("keydown", function (event) {
        if (event.keyCode == "13") {
            document.activeElement.blur();//收起虚拟键盘
            key = $("#search").val();
            data.key = key;
            pageSize = 1;
            offset = (pageSize - 1) * limit;//每次传入后台的数据条数，比如0  10  20
            data.offset = offset;
            jsonstr = JSON.stringify(data);
            catalogData(jsonstr);
            event.preventDefault(); // 阻止默认事件---阻止页面刷新
        }
    })
    $("#muiClear").on("tap", function () {
        $("#search").val("");
        data.key = "";
        pageSize = 1;
        offset = (pageSize - 1) * limit;//每次传入后台的数据条数，比如0  10  20
        data.offset = offset;
        jsonstr = JSON.stringify(data);
        catalogData(jsonstr);
    });
    //排行
    $(".ranking").on("tap", function () {
        if ($(".rankingInfo").is(":hidden")) {
            $(".rankingInfo").show();
            ranking();
        }
    });
    $("#muiIcon").on("click", function (e) {
        e.preventDefault();
        $(".rankingInfo").hide()
    });
    //生成二维码
    $(".qrcode").on("tap", function () {
        $(".qrcodeInfo").show();
        var catalogids = '';
        for (var i = 0; i < catalogIds.length; i++) {
            catalogids += catalogIds[i].id + ",";
            // console.info(catalogids.substring(0,catalogids.length-1));
        }
        $('#qrcode').qrcode({
            width: 200,
            height: 200,
            correctLevel: 0,
            text: "https://wx.hongyancloud.com/hy/unauth/societyShare/" + catalogids.substring(0, catalogids.length - 1) + "/" + $("#uid").val()
        });

    });
    $("#closeIcon").on("tap", function () {
        $(".qrcodeInfo").hide();
        $('#qrcode').html('');
    });
    //高级筛选
    //筛选模块显示隐藏
    $(document).on("click", "#screening", function () {
        if ($(this).hasClass("mui-icon-arrowdown")) {
            $(this).removeClass("mui-icon-arrowdown").addClass("mui-icon-arrowup");
            $(".muiBackdrop").show();
        } else {
            $(this).removeClass("mui-icon-arrowup").addClass("mui-icon-arrowdown");
            $(".muiBackdrop").hide();
        }

    });
    $(document).on("tap", ".catalogType .itemsName", function () {
        $(this).addClass("active").siblings().removeClass('active');
        typeArr = [];
        $(".active").each(function (i, obj) {
            if ($(obj).attr('itemValue') != '') {
                typeArr.push({classId: $(obj).attr("fieldid"), classValue: $(obj).attr("itemValue")})
            }
        });
        //console.info(typeArr);
        data.arr = typeArr;
        pageSize = 0;
        offset = pageSize * limit;//每次传入后台的数据条数，比如0  10  20
        data.offset = offset;
        jsonstr = JSON.stringify(data);
        catalogData(jsonstr);
    });
    //navtabs 产业选择
    $(document).on("tap", ".navTabs ul li", function () {
        $(this).addClass("active").siblings().removeClass('active');
        typeArr = [];
        $(".active").each(function (i, obj) {
            if ($(obj).attr('itemValue') != '') {
                typeArr.push({classId: $(obj).attr("fieldid"), classValue: $(obj).attr("itemValue")})
            }
        });
        console.info(typeArr);
        data.arr = typeArr;
        pageSize = 0;
        offset = pageSize * limit;//每次传入后台的数据条数，比如0  10  20
        data.offset = offset;
        jsonstr = JSON.stringify(data);
        catalogData(jsonstr);
    });
    //checkInfo(true);
    $(document).on("click", '.inpCheck', function () {
        var cataIds = [];
        var imgIds = [];
        var names = [];
        var ids = $(this).parents('li').attr("catalogId");
        var imgs = $(this).parents('li').attr("picSrc");
        var name = $(this).siblings('p').text();
        if ($(this).prop("checked")) {
            cataIds.push(ids);
            imgIds.push(imgs);
            names.push(name);
            for (var i = 0; i < cataIds.length; i++) {
                var idImgs = {};
                idImgs.id = cataIds[i];
                idImgs.img = imgIds[i];
                idImgs.name = names[i];
            }
            catalogIds.push(idImgs);
        } else {
            catalogIds.splice(catalogIds.indexOf(ids), 1);
        }
        if (catalogIds.length > 0) {
            $(".qrcode").show();
        } else {
            $(".qrcode").hide();
        }
    });
    //上拉加载下拉刷新
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新…", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '正在加载...',
                /*contentnomore:'我是有底线的',*/
                callback: pullupRefresh
            }
        }
    });
    //下拉刷新
    function pulldownRefresh() {
        setTimeout(function () {
            pageSize = 1;
            offset = (pageSize-1)*limit;//每次传入后台的数据条数，比如0  10  20
            data.offset = offset;
            jsonstr = JSON.stringify(data);
            catalogData(jsonstr);//实现更新页面的操作
            $(".navTabs ul li").eq(1).click();
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            mui('#pullrefresh').pullRefresh().refresh(false);
        }, 50);

    }
    //上拉加载
    function pullupRefresh() {
        setTimeout(function () {
            //每次加载结束之后，如果还有数据则++
            if(!isOver){
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
                mui.toast("我是有底线的");
                return;
            }
            pageSize++;
            offset = (pageSize-1)*limit;//每次传入后台的数据条数，比如0  10  20
            data.offset = offset;
            jsonstr = JSON.stringify(data);
            catalogData(jsonstr);
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
        },50);
    }


});
function catalogData(jsonstr) {
    $.ajax({
        type: "post",
        url: "https://wx.hongyancloud.com/hy/unauth/getCatalogListByCondition",
        data: {
            'jsonStr': jsonstr
        },
        async: false,
        success: function (res) {
            if (res.code == '200') {
                mui.hideLoading();
                var arr = res.data.records;
                var html = '';
                for (var i = 0; i < arr.length; i++) {
                    html += '<li class="col-xs-6 col-sm-4 col-md-2" picSrc="' + arr[i].images[0].filePath + '?x-oss-process=image/resize,m_fill,h_200,w_200" catalogId="' + arr[i].catalogId + '">' +
                        '    <div class="boxShadow" style="">' +
                        '       <a title="' + arr[i].name + '" href="picList_new.html">' +
                        '          <img src=' + arr[i].images[0].filePath + '?x-oss-process=image/resize,m_fill,h_300,w_200>' +
                        '       </a>' +
                        '    </div>' +
                        '       <p>' + arr[i].name + '</p>' +
                        '       <input class="inpCheck" type="checkbox" name="checkbox" style="display: none"/>' +
                        '       <div class="mui-backdrop" style="display: none"></div>' +
                        '</li>';
                }
                if (offset) {
                    $('#catalogLists li:last').after(html);
                    // $(html).prependTo($('#catalogLists'))
                    // $(html).append($('#catalogLists'))
                }
                if (offset == '0') {
                    $("#catalogLists").html(html);
                }
                $("#catalogLists li").on("tap", function () {
                    var catalogId = $(this).attr("catalogId");
                    var title = $(this).children("p").text();
                    var temp = {
                        catalogId: catalogId,
                        uid: $("#uid").val(),
                        title:title
                    };
                    localStorage.setItem("temp", JSON.stringify(temp));
                });
                $('#catalogLists li').on('tap', 'a', function () {
                    document.location.href = 'picList_new.html';
                });
                //判断是否还有数据,若小于每次加载条数,结束
                /*if (res.data.pages < pageSize) {
                    console.info(pageSize);
                    isOver = true;
                }*/
                isOver = res.data.pages >= pageSize;
            }

        },
        error: function () {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            isOver = false;

        }
    });
}

function checkInfo(val) {
    if (val) {
        $(".inpCheck").show();
        $(".mui-backdrop").show();
        // mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
    } else {
        $(".inpCheck").hide();
        $(".mui-backdrop").hide();
        $(".inpCheck").attr("checked", false);
        catalogIds = [];
        $(".qrcode").hide();
    }

}

function ranking() {
    mui.init({
        swipeBack: false
    });

    $('.mui-scroll-wrapper').scroll({
        indicators: true //是否显示滚动条
    });
    <!--根据选择获取各个面板-->
    $.ajax({
        type: "post",
        url: "https://wx.hongyancloud.com/hy/unauth/getRankList",
        async: false,
        success: function (res) {
            if (res.code == '200') {
                var item2 = document.getElementById('item2mobile');
                var html1 = '';
                for (var i = 0; i < res.data.dayRank.length; i++) {
                    html1 += '   <li class="mui-table-view-cell">\n' +
                        '     <div class="clearfix text-center">' +
                        '         <div class="mui-col-xs-4 pull-left">' + res.data.dayRank[i].name + '</div>' +
                        '         <div class="mui-col-xs-4 pull-left">' + res.data.dayRank[i].users + '</div>' +
                        '         <div class="mui-col-xs-4 pull-left">' + res.data.dayRank[i].clicks + '</div>' +
                        '     </div>' +
                        '   </li>\n'
                }
                $("#item1Con").html(html1);
                var html2 = '';
                for (var i = 0; i < res.data.totalRank.length; i++) {
                    html2 += '   <li class="mui-table-view-cell">\n' +
                        '     <div class="clearfix text-center">' +
                        '         <div class="mui-col-xs-4 pull-left">' + res.data.totalRank[i].name + '</div>' +
                        '         <div class="mui-col-xs-4 pull-left">' + res.data.totalRank[i].users + '</div>' +
                        '         <div class="mui-col-xs-4 pull-left">' + res.data.totalRank[i].clicks + '</div>' +
                        '     </div>' +
                        '   </li>'
                }
                document.getElementById('slider').addEventListener('slide', function (e) {
                    if (e.detail.slideNumber === 1) {
                        if (item2.querySelector('.mui-loading')) {
                            setTimeout(function () {
                                item2.querySelector('.mui-scroll').innerHTML = html2;
                            }, 500);
                        }
                    }
                });

            }


        }
    });


}

function catalogType() {
    $.ajax({
        type: "post",
        url: "https://wx.hongyancloud.com/hy/unauth/getCatalogType",
        async: false,
        success: function (res) {
            if (res.code == '200') {
                var str = '';
                for (var i = 0; i < res.data.length; i++) {
                    if(res.data[i].id != 3) {
                        str += '<li>\n' +
                            '       <div classid="' + res.data[i].id + '" class="className">' + res.data[i].fieldname + '</div>\n' +
                            '    <dl>\n' +
                            '    <dd fieldid="' + res.data[i].id + '" itemValue="" class="itemsName active"><span>全部</span></dd>';
                        for (var j = 0; j < res.data[i].items.length; j++) {
                            str += '<dd fieldid="' + res.data[i].id + '" itemValue="' + res.data[i].items[j].itemValue + '" class="itemsName"><span>' + res.data[i].items[j].itemName + '</span></dd>\n';
                        }
                        str += '</dl>\n' +
                            '</li>\n';
                    }
                }
                $(".catalogType").html(str);

            }
        }
    });
}
function navTabs() {
    $.ajax({
        type: "post",
        url: "https://wx.hongyancloud.com/hy/unauth/getCatalogType",
        async: false,
        success: function (res) {
            if (res.code == '200') {
                var str = '';
                for (var i = 0; i < res.data.length; i++) {
                    if(res.data[i].id == 3) {
                        str +='<li itemValue=""><a href="javascript:void(0)">全部</a></li>';
                        for(var j = 0;j<res.data[i].items.length;j++){
                            if(j == 0){
                                str +='<li class="active" fieldid="' + res.data[i].id + '" itemValue="'+res.data[i].items[j].itemValue+'"><a href="javascript:void(0)">'+res.data[i].items[j].itemName+'</a></li>'
                            }else{
                                str +='<li fieldid="' + res.data[i].id + '" itemValue="'+res.data[i].items[j].itemValue+'"><a href="javascript:void(0)">'+res.data[i].items[j].itemName+'</a></li>'
                            }
                        }
                    }
                }
                $(".navTabs ul").html(str);
            }
        }
    });
}