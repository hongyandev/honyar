$.ajax({
    url: "test.ashx",
    data: {
        name: "GetWxJsApi",
        curUrl: url
    },
    type: 'post',
    dataType: "json",
    success: function (data) {
        if (data.success == "1") {

            var timestamp = data.timestamp;
            var noncestr = data.noncestr;
            var signature = data.signature;
            //通过config接口注入权限验证配置
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: timestamp.toString(),
                nonceStr: noncestr,   //生成签名的随机串
                signature: signature,  //签名
                jsApiList: ['chooseImage', 'uploadImage', 'downloadImage']
            });

        } else {
            alert(data.error);
        }
    }
});

//拍照或从手机相册中选图接口
function wxChooseImage() {
    wx.chooseImage({
        count: 1,
        needResult: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (data) {
            localIds = data.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if (rh.tostr(localIds)) {
                wxuploadImage(localIds);
            }
        },
        fail: function (res) {
            alterShowMessage("操作提示", JSON.stringify(res), "1", "确定", "", "", "");
        }

    });
}

//上传图片接口
function wxuploadImage(e) {

    wx.uploadImage({
        localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            mediaId = res.serverId; // 返回图片的服务器端ID
            if (rh.tostr(mediaId)) {
                $(".myimg").attr("src", localIds);
            }

        },
        fail: function (error) {
            picPath = '';
            localIds = '';
            alert(Json.stringify(error));

        }

    });
}


$.ajax({
    url: "test.ashx",
    data: {
        name: "getPicInfo",
        media: $.trim(mediaId)
    },
    type: "Get",
    dataType: "text",
    success: function (data) {
        picPath = data;  //picPath 取得图片的路径

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("提交失败" + textStatus);
    }

});






