$(function () {
    var paramsObj=GetRequest();

    //图片后缀，不等于空，并且是一张图片，才渲染
    var arrData = JSON.parse(localStorage.getItem("arrs"));
       // console.info(arrData)
   // return false;
    var html='';
    for(var i=0;i<arrData.length;i++){
        if(paramsObj.i == i){
            html += "<div class=\"mui-slider-item mui-active\">" +
                    "       <a href=\"#\"><img class='imgH' src='"+arrData[i].filePath+"'/></a>" +
                    "</div>";
        }else{
            html += "<div class=\"mui-slider-item\"><a href=\"#\"><img src='"+arrData[i].filePath+"'/></a></div>";
        }

    }

    $(".mui-slider-group").html(html);

    var wHeight = $(window).height();
    $(".imgH").attr("src", $(".imgH").attr("src")).load(function () {
        var height = $(this).height();
        var margin_top=(wHeight-height)/2;
        $(".mui-slider-item").css("margin-top",margin_top+"px")
    });

    document.querySelector('.mui-slider').addEventListener('slide', function(event) {
        //注意slideNumber是从0开始的；
       // document.getElementById("info").innerText = "你正在看第"+(event.detail.slideNumber+1)+"张图片";
        console.info(event.detail.slideNumber+1)
    });
});


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if(url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
