$(function () {
    //var openID=$.getCookie('open_id');
    var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc';
    $.ajax({
        type: "get",
        url: "http://wx.hongyancloud.com/wxDev/verificate/authority?openId="+openID,
        dataType:"json",
        success: function(data) {
        if(data.code != "00000") {
            window.location.href="error.html?error="+data.msg;
        }else {
            if(data.code == "00000") {
                jQuery("#khdm").val(data.data.khdm);
                jQuery(".khmc").html(data.data.khmc);
                jQuery("#telephone").val(data.data.telephone);
                jQuery("#name").val(data.data.name);
            }
        }
    }, error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    });

    $("#submit").click(function () {
        var openID=$.getCookie('open_id');
        var customer = $('#customer').val();
        var totalMoney =$('#totalMoney').val();
        var discountAmount=$('#discountAmount').val();
        var formdata = new FormData();
        for(var index in uploadFiles) {
            formdata.append("files", uploadFiles[index][0]);
        }
        formdata.append('openId', openID);
        formdata.append('uid',$(".sCodeInput").val());
        formdata.append('khdm',$("#khdm").val());
        formdata.append('khmc',$(".khmc").html());
        formdata.append('name',$("#name").val());
        formdata.append('telephone',$("#telephone").val());
        formdata.append('customer',$("#customer").val());
        formdata.append('totalMoney',$("#totalMoney").val());
        formdata.append('discountAmount',$("#discountAmount").val());
        var regChinese = new RegExp("[\\u4E00-\\u9FFF]+", "g"); //汉语
        var specialSymbol =/[`~!@#$%^&*_+<>{}\/'[\]]/im; //特殊符号
        if(customer == "") {
            weui.topTips('请输入顾客姓名',3000);
            return;
        }else if(specialSymbol.test(customer)){
            weui.topTips('姓名不能为特殊字符，请重新输入',3000);
            return;
        };
        if(totalMoney == "") {
            weui.topTips('请输入订单总金额',3000);
            return;
        }else if(regChinese.test(totalMoney)){
            weui.topTips('订单金额不能输入汉字，请重新输入',3000);
            return;
        }else if(parseInt(totalMoney) == 0){
            weui.topTips('订单金额不能为0，请重新输入',3000);
            return;
        }else if(specialSymbol.test(totalMoney)){
            weui.topTips('订单金额不能输入特殊字符，请重新输入',3000);
            return;
        };
        if(discountAmount == "") {
            weui.topTips('请输入优惠金额',3000);
            return;
        }else if(regChinese.test(discountAmount)){
            weui.topTips('优惠金额不能输入汉字，请重新输入',3000);
            return;
        }else if(parseInt(discountAmount) == 0){
            weui.topTips('优惠金额不能为0，请重新输入',3000);
            return;
        }else if(specialSymbol.test(discountAmount)){
            weui.topTips('优惠金额不能输入特殊字符，请重新输入',3000);
            return;
        };

        /* var formData={};
         var arr=[];
         for(var i = 0;i<uploadFiles.length;i++){
             arr.push(uploadFiles[i][0]);
         }
         formData.files=arr;
        formData.openId=openID;
        formData.uid=$('.sCodeInput').val();
        formData.khdm=$('#khdm').val();
        formData.khmc=$('.khmc').html();
        formData.telephone=$('#telephone').val();
        formData.name=$('#name').val();
        formData.customer=$('#customer').val();
        formData.totalMoney=$('#totalMoney').val();
        formData.discountAmount=$('#discountAmount').val();*/
        //console.log(formData);
        //return;
        console.info(formdata);
        var loading = weui.loading('正在提交...', {
            className: 'custom-classname'
        });
        $.ajax({
            type: "post",
            url: "http://wx.hongyancloud.com/wxDev/verificate/saveVerificateAndDetails",
            data: formdata,
            //timeout: 5000,
            //必须false才会避开jQuery对 formdata 的默认处理
            // XMLHttpRequest会对 formdata 进行正确的处理
            processData: false,
            //必须false才会自动加上正确的Content-Type
            contentType: false,
            success: function(data){
                loading.hide();
                if(data.code == "00000") {
                    weui.toast('提交成功', {
                        duration: 3000,
                        callback: function(){
                            window.location.href = window.location.href;
                        }
                    });
                }else{
                    weui.topTips(data.msg);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                loading.hide();
                weui.topTips(errorThrown);
            }
        })
    });
});

