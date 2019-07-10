

$(function () {
    var temp = JSON.parse(localStorage.getItem("temp"));
    $("#uid").val(temp.uid);
    $("title").html(temp.title);
    var catalogId = temp.catalogId;
    $.ajax({
        type: "post",
        url: "https://wxdev.hongyancloud.com/hy/unauth/getCatalogImageList",
        data:{
            catalogId:catalogId
        },
        async:false,
        success: function(res){
            if(res.code=="200"){
                var arr = res.data;
                var html = '';
                /*for(var i=0;i<arr.length;i++){
                    html += '<li class="col-xs-4 col-sm-2 col-md-1">\n' +
                        '              <a id="imgSrc" href="'+arr[i].filePath+'" data-gallery="">' +
                        '                   <img src='+arr[i].filePath+'?x-oss-process=image/resize,m_fill,h_100,w_100>' +
                        '               </a>' +
                        '     </li>';
                };*/
                for(var i=0;i<arr.length;i++){
                    html += '<li class="col-xs-4 col-sm-2 col-md-1">\n' +
                        '              <a id="imgSrc" href="picDetail.html?i='+arr[i].index+'&uid=' + $("#uid").val() + '">' +
                        '                   <img src='+arr[i].filePath+'?x-oss-process=image/resize,m_fill,h_100,w_100>' +
                        '               </a>' +
                        '     </li>';
                };
                $('#picLists').html(html);
                localStorage.setItem("arrs",JSON.stringify(arr));
            }

        }
    });



});

