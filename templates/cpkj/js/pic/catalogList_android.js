
var wbjsBridge = wbjsBridge || {};
setupWebViewJavascriptBridge (function(bridge){
    wbjsBridge.method.bridge = bridge;
}
wbjsBridge.method.showLoad = function ( funcCallback) {
    wbjsBridge.method.bridge.callHandler("showLoading", "", function (response) {
        console.info("showLoading got response: ", response);
        alert('12345');
        if (typeof funcCallback == "function") {
            funcCallback(response);
        }
    })
}
$(function () {
    wbjsBridge.method.showLoad(catalogData());
    var catalogIds = [];
    setupWebViewJavascriptBridge (function(bridge){
        bridge.registerHandler('openCheckPanel',function(data, responseCallback){
            checkInfo(data["select"]);
            responseCallback({'id':'123'});
        });
        bridge.registerHandler('sharePanel',function(data, responseCallback){
            if (catalogIds.length < 1) {
                responseCallback({'code':'500', 'message':'请先选择需要分享的样本集','data':''});
            }else{
                responseCallback({'code':'200', 'message':'成功','data' : catalogIds});
            }
        });
        bridge.callHandler('showLoading', {}, function responseCallback(responseData) {
            $("#uid").val(responseData.uid);
            //渲染产品列表
            catalogData(bridge);
        });
    });



  $(".ranking").on("click",function () {
        if($(".rankingInfo").is(":hidden")){
            $(".rankingInfo").show();
            ranking();
        }
    });
    $("#muiIcon").on("click",function () {
        $(".rankingInfo").hide()
    })
});
function catalogData(bridge) {
    $.ajax({
        type: "post",
        url: "https://wxdev.hongyancloud.com/hy/unauth/getCatalogList",
        async:false,
        success: function(res){
            if(res.code=="200"){
                mui.hideLoading();
                var arr = res.data;
                var html = '';
                for(var i=0;i<arr.length;i++){
                        html += '<li class="col-xs-6 col-sm-4 col-md-2" picSrc="'+arr[i].images[0].filePath+'?x-oss-process=image/resize,m_fill,h_200,w_200" catalogId="'+arr[i].catalogId+'">' +
                                '    <div style="height:180px;overflow: hidden;border:1px solid #e5e5e5">'+
                                '       <a id="imgSrc" href="picList.html">' +
                                '          <img src='+arr[i].images[0].filePath+'?x-oss-process=image/resize,m_fill,h_300,w_200>' +
                                '       </a>' +
                                '    </div>'+
                                '       <p>'+arr[i].name+'</p>'+
                                '       <input class="inpCheck" type="checkbox" name="checkbox" style="display: none"/>' +
                                '       <div class="mui-backdrop" style="display: none"></div>'+
                                '</li>';

                }
                $('#catalogLists').html(html);
            }
            $(".inpCheck").on("click",function () {
                var cataIds = [];
                var imgIds = [];
                var names = [];
                var ids = $(this).parents('li').attr("catalogId");
                var imgs = $(this).parents('li').attr("picSrc");
                var name = $(this).siblings('p').text();
                if ($(this).prop("checked")){
                    cataIds.push(ids);
                    imgIds.push(imgs);
                    names.push(name);
                    for(var i=0;i<cataIds.length;i++){
                        var idImgs={};
                        idImgs.id = cataIds[i];
                        idImgs.img = imgIds[i];
                        idImgs.name = names[i];
                    }
                    catalogIds.push(idImgs);
                }else{
                    catalogIds.splice(catalogIds.indexOf(ids),1);

                }
            });
            $("#catalogLists li").on("click",function () {
                var catalogId = $(this).attr("catalogId");
                var temp = {
                    catalogId:catalogId,
                    uid: $("#uid").val()
                };
                localStorage.setItem("temp",JSON.stringify(temp));
            });
            $("#screening").on("click",function () {
                if($(this).hasClass("mui-icon-arrowdown")){
                    $(this).removeClass("mui-icon-arrowdown").addClass("mui-icon-arrowup");
                    $(".muiBackdrop").show();
                }else{
                    $(this).removeClass("mui-icon-arrowup").addClass("mui-icon-arrowdown");
                    $(".muiBackdrop").hide();
                }

            })
            bridge.callHandler('hideLoading', {}, function responseCallback(responseData){});
        },
        error:function () {
            bridge.callHandler('hideLoading', {}, function responseCallback(responseData){});
        }
    });
}

function checkInfo(val) {
     val = true;
    if(val){
        $(".inpCheck").show();
        $(".mui-backdrop").show();
    }else{
        $(".inpCheck").hide();
        $(".mui-backdrop").hide();
        $(".inpCheck").attr("checked", false);
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
        url: "https://wxdev.hongyancloud.com/hy/unauth/getRankList",
        async:false,
        success: function(res){
            if(res.code=='200'){
                var item2 = document.getElementById('item2mobile');
                var html1 = '';
                for(var i=0;i<res.data.dayRank.length;i++){
                    html1 += '   <li class="mui-table-view-cell">\n' +
                                '     <div class="clearfix text-center">' +
                                '         <div class="mui-col-xs-4 pull-left">'+res.data.dayRank[i].uid+'</div>'+
                                '         <div class="mui-col-xs-4 pull-left">'+res.data.dayRank[i].users+'</div>'+
                                '         <div class="mui-col-xs-4 pull-left">'+res.data.dayRank[i].clicks+'</div>'+
                                '     </div>' +
                                '   </li>\n'
                }
                $("#item1Con").html(html1);
                var html2 ='';
                for(var i=0;i<res.data.totalRank.length;i++){
                    html2 += '   <li class="mui-table-view-cell">\n' +
                        '     <div class="clearfix text-center">' +
                        '         <div class="mui-col-xs-4 pull-left">'+res.data.totalRank[i].uid+'</div>'+
                        '         <div class="mui-col-xs-4 pull-left">'+res.data.totalRank[i].users+'</div>'+
                        '         <div class="mui-col-xs-4 pull-left">'+res.data.totalRank[i].clicks+'</div>'+
                        '     </div>' +
                        '   </li>'
                }
                document.getElementById('slider').addEventListener('slide', function(e) {
                    if (e.detail.slideNumber === 1) {
                        if (item2.querySelector('.mui-loading')) {
                            setTimeout(function() {
                                item2.querySelector('.mui-scroll').innerHTML = html2;
                            }, 500);
                        }
                    }
                });

            }


        }
    });



}



