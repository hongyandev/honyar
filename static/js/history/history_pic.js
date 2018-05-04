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

//保存上传图片信息的全局变量
var uploadFiles = [];
//var openID = 'oZlooxHvjmiadlhZXf_40nVrHgd4';
var openID=$.getCookie('open_id');
var theRequest = GetRequest();
var formdata = new FormData();
$(function() {
    // 允许上传的图片类型
    var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    // 最大上传图片数量
    var maxCount = 2;
    //var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',

    $gallery = $("#gallery"),
    $galleryImg = $("#galleryImg"),
    $uploaderInput = $("#uploaderInput"),
    $uploaderFiles = $("#uploaderFiles");

    $uploaderInput.on("change", function(e) {
        var src, url = window.URL || window.webkitURL || window.mozURL,
            files = e.target.files;
        var _this = $(this);
        uploadFiles.push(files);
        for(var i = 0, len = files.length; i < len; ++i) {
            var file = files[i];
            // 如果类型不在允许的类型范围内
            if (allowTypes.indexOf(file.type) === -1) {
                weui.topTips("该类型不允许上传！", "警告！");
                continue;
            }
            if ($('.weui-uploader__file').length >= maxCount) {
                weui.topTips( '最多只能上传' + maxCount + '张图片');
                return;
            }
            if(url) {
                src = url.createObjectURL(file);
            } else {
                src = e.target.result;
            }

            //创建一个文件读取的工具类
            var reader = new FileReader();
            //这里利用了闭包的特性，来保留文件名
            (function(x){
                reader.onload = function (e) {
                    //调用压缩文件的方法，具体实现逻辑见下面
                   // render(this.result,x);
                    // 调用函数处理图片 　
                    if (1025 <= file.size /1024 <5120){
                        console.info(file.size);
                        dealImage(this.result, {quality: 0.1},function (base) {
                            var bl = convertBase64UrlToBlob(base);
                            formdata.append("files",bl,"file_"+Date.parse(new Date())+".jpg");
                            formdata.append('openId', openID);
                            formdata.append('id', theRequest.mainid); //theRequest.mainid
                            //提交上传的功能
                            $("#uploadPic").click(function() {
                                Bt_submit(uploadFiles);
                            });
                        });
                    }else if(file.size /1024 >= 5120){
                        dealImage(this.result, {quality: 0.05},function (base) {
                            var bl = convertBase64UrlToBlob(base);
                            formdata.append("files",bl,"file_"+Date.parse(new Date())+".jpg");
                            formdata.append('openId', openID);
                            formdata.append('id', theRequest.mainid); //theRequest.mainid
                            //提交上传的功能
                            $("#uploadPic").click(function() {
                                Bt_submit(uploadFiles);
                            });
                        });
                    }else if(file.size /1024 < 1025){
                        dealImage(this.result, {quality: 0.2},function (base) {
                            var bl = convertBase64UrlToBlob(base);
                            formdata.append("files",bl,"file_"+Date.parse(new Date())+".jpg");
                            formdata.append('openId', openID);
                            formdata.append('id', theRequest.mainid); //theRequest.mainid
                            //提交上传的功能
                            $("#uploadPic").click(function() {
                                Bt_submit(uploadFiles);
                            });
                        });
                    }　　　　　　　　　　　　　　　

                    //将读取到图片流直接拼接起来
                    var tmpl = '<li class="weui-uploader__file"><img style="width:100%;" src="#url#"/></li>'                    //塞到页面节点里
                    $uploaderFiles.append($(tmpl.replace('#url#', this.result)));
                }

            })(file.name);

            //告诉文件读取工具类读取那个文件
            reader.readAsDataURL(file);

        }

    });
    var index; //第几张图片
    //点击查看大图
    $uploaderFiles.on("click", "li", function() {
        index = $(this).index();
        var pic = $(this).children("img");
        $galleryImg.attr("src", pic[0].getAttribute("src"));
        $gallery.fadeIn(100);
        $galleryImg.get(0).onload = function (){
            var picH=$("#galleryImg").height();
            var picW=$("#galleryImg").width();
            $galleryImg.css({"margin-top":-parseFloat(picH)/2+"px","margin-left":-parseFloat(picW)/2+"px"})
        };

    });
    //点击关闭，大图浮层关闭
    $(".weui-closed").on("click", function() {
        $gallery.fadeOut(100);
    });

    //删除图片
    $(".weui-gallery__del").click(function() {
        //alert(1);
        $uploaderFiles.find("li").eq(index).remove();
        $gallery.hide();
    });

    function dealImage(path, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.2;  // 默认图片质量为0.7
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality );
            // 回调函数返回base64的值
            callback(base64);
            //将转换结果放在要上传的图片数组里
            //uploadFiles.push({"files":base64});

        }
    }

    function convertBase64UrlToBlob(urlData){
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    function Bt_submit(uploadFiles) {


        //var files = uploadFiles[0];

        var loading = weui.loading('正在提交...', {
            className: 'custom-classname'
        });
        $.ajax({
            type: "post",
            url:genAPI('wxDev/file/saveBillDetails'),
            //url: "http://wx.hongyancloud.com/wxDev/file/saveBillDetails",
            //data: formdata,
            data:formdata,
            //timeout: 5000,
            //必须false才会避开jQuery对 formdata 的默认处理
            // XMLHttpRequest会对 formdata 进行正确的处理
            processData: false,
            //必须false才会自动加上正确的Content-Type
            contentType: false,
            xhrFields: {
                withCredentials: false
            },
            success: function(data) {
                loading.hide();
                if(data.code == "00000") {
                    weui.toast('图片上传成功！', {
                        //var d = data;
                        duration: 3000,
                        callback: function() {
                            window.location.href = "history.html";
                        }
                    });
                } else {
                    loading.hide();
                    weui.topTips(data.msg);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        })
    }


});

