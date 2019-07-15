
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.hash.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var arr;
$(function () {

    var temp = JSON.parse(localStorage.getItem("temp"));
    $("#uid").val(temp.uid);
    $("title").html(temp.title);
    var catalogId = temp.catalogId;
    $.ajax({
        type: "post",
        url: "https://wx.hongyancloud.com/hy/unauth/getCatalogImageList",
        data:{
            catalogId:catalogId
        },
        async:false,
        success: function(res){
            if(res.code=="200"){
                arr = res.data;
                var html = '';
                for(var i=0;i<arr.length;i++){
                    html += ' <figure  class="col-xs-4 col-sm-2 col-md-1">\n' +
                        '                <div class="img-dv" data-size="">' +
                        '                   <a href="'+arr[i].filePath+'" data-size="1920x1080">' +
                        '                         <img src="" data-src='+arr[i].filePath+'>'+
                        '                   </a>'+
                        '                 </div>' +
                        '                <figcaption style="display:none;"></figcaption>\n' +
                        '      </figure>';
                };
                $('.my-gallery').html(html);
                /*localStorage.setItem("arrs",JSON.stringify(arr));*/
                localStorage.setItem("arrs",JSON.stringify(arr));
                var index = parseFloat(GetQueryString("pid"));
                if(index){
                    if(arr[index-1].content==""){
                        $(".pswp_btn").hide();
                    }else{
                        $(".pswp_btn").show();
                    }
                }

                $("#conBtn").on("click",function (e) {
                   // e.preventDefault();
                    var index = parseFloat(GetQueryString("pid"));
                   console.info(index);
                   debugger;
                    window.location.href = 'detailExtended.html?index='+index;
                   //$(".pswp_content").show();
                  // $(".pswp_content .content").html(arr[index-1].content);
                });
                $(".gbIcon").on("click",function (e) {
                    e.preventDefault();
                    $(".pswp_content").hide();
                    $(".pswp_content .content").html("")
                });
                lazyRender();
                //为了不在滚轮滚动过程中就一直判定，设置个setTimeout,等停止滚动后再去判定是否出现在视野中。
                var clock; //这里的clock为timeID，
                $(window).on('scroll',function () {
                    if (clock) { // 如果在300毫秒内进行scroll的话，都会被clearTimeout掉，setTimeout不会执行。
                        //如果有300毫秒外的操作，会得到一个新的timeID即clock，会执行一次setTimeout,然后保存这次setTimeout的ID，
                        //对于300毫秒内的scroll事件，不会生成新的timeID值，所以会一直被clearTimeout掉，不会执行setTimeout.
                        clearTimeout(clock);
                    }
                    clock = setTimeout(function () {
                        console.log('运行了一次');
                        lazyRender();
                    },300)
                });


            }

        }
    });

    auto_data_size();
    initPhotoSwipeFromDOM('.my-gallery');

});
var initPhotoSwipeFromDOM = function(gallerySelector) {
    // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item,
            divEl;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            // 仅包括元素节点
            if(figureEl.nodeType !== 1) {
                continue;
            }
            divEl = figureEl.children[0];
            linkEl = divEl.children[0]; // <a> element
            //size = linkEl.getAttribute('data-size').split('x');
            if(divEl.getAttribute('data-size')) {
                size = divEl.getAttribute('data-size').split('x');
            }else {
                size = linkEl.getAttribute('data-size').split('x');
            }

            // 创建幻灯片对象
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if(linkEl.children.length > 0) {
                // <img> 缩略图节点, 检索缩略图网址
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };

    // 查找最近的父节点
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // 当用户点击缩略图触发
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }

            if(arr[index].content==""){
                $(".pswp_btn").hide();
            }else{
                $(".pswp_btn").show();
            }

        return false;
    };

    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        // 这里可以定义参数
        options = {
            barsSize: {
                top: 100,
                bottom: 100
            },
            fullscreenEl : false,
            loop:false,
            shareButtons: [
                {id:'wechat', label:'分享微信', url:'#'},
                {id:'weibo', label:'新浪微博', url:'#'},
                {id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}
            ],
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                if(items.length>0){
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }


            }
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

        gallery.listen('imageLoadComplete', function(index, item) {
            var linkEl = item.el.children[0];
            var img = item.container.children[0];
            //var img = linkEl.children[0].children;
            if (!linkEl.getAttribute('data-size')) {
                linkEl.setAttribute('data-size', img.naturalWidth + 'x' + img.naturalHeight);
                item.w = img.naturalWidth;
                item.h = img.naturalHeight;
                gallery.invalidateCurrItems();
                gallery.updateSize(true);
            }
        });
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
   // console.info(hashData.pid);
};

function auto_data_size(){
    var imgss= $("figure img");
    $("figure img").each(function() {
        var imgs = new Image();
        imgs.src=$(this).attr("src");
        var w = imgs.width,
            h =imgs.height;
        $(this).parent("a").attr("data-size","").attr("data-size",w+"x"+h);
    })
};

function checkShow($img) { // 传入一个img的jq对象
    var scrollTop = $(window).scrollTop();  //即页面向上滚动的距离
    var windowHeight = $(window).height(); // 浏览器自身的高度
    var offsetTop = $img.offset().top;  //目标标签img相对于document顶部的位置
    //console.info(scrollTop);
    //console.info(windowHeight);
    if (offsetTop < (scrollTop + windowHeight) && offsetTop > scrollTop) { //在2个临界状态之间的就为出现在视野中的
        return true;
    }
    return false;
}
function isLoaded ($img) {
    return $img.attr('data-src') === $img.attr('src'); //如果data-src和src相等那么就是已经加载过了
}
function loadImg ($img) {
    $img.attr('src',$img.attr('data-src')); // 加载就是把自定义属性中存放的真实的src地址赋给src属性
}
function lazyRender () {
    $('.my-gallery img').each(function () {
        if (checkShow($(this)) && !isLoaded($(this)) ){
            loadImg($(this));
        }
    })
}