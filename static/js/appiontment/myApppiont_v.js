$(function() {
	var vm = new Vue({
		el: "#modal-content",
		data: {
			openId: "",
			pageNum: "",
			pageSize: "",
            telephone:"",
			workersItem: []
		},
        watch: {
            telephone:function(val, oldVal){
                //console.info(val+","+oldVal)
                if(val==""){
                    this.doSearch();
                }
            }
        },
        methods: {
            postuser: function(item){
                if(this.telephone == ""){
                    $.confirm("", "您确定要删除这条预约吗?", function() {
                        $.ajax({
                            type:"post",
                            url:genAPI('/wxDev/reserve/deleteReserve'),
                            dataType:"json",
                            data: {
                                "uid":this.uid,
                                "id":item.id
                            }, success: function(res) {
                                if(res.code=="00000"){
                                    $.toast("预约已删除!", 2000,function() {
                                        window.location.href=window.location.href;
                                    });
                                }
                            }
                        });
                    }, function() {
                        $('.weui-cell_swiped').swipeout('close');
                        //取消操作
                    });
                }else{
                    $.confirm("", "很抱歉，您删除不了这条预约", function() {
                        $('.weui-cell_swiped').swipeout('close');
                    })
                }

            },
            cancelSearch:function () {
                $.ajax({
                    url:genAPI('wxDev/reserve/getReserveFenye'),
                    //url: "http://wxdev.hongyancloud.com/wxDev/reserve/getReserveFenye",
                    async: false,
                    type: 'GET',
                    data: {
                        openId: this.openId,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                    success: function(data) {
                        var datas = data.data.list;
                        //console.log(datas);
                        this.workersItem = datas;
                        $('.weui-cell_swiped').swipeout();
                    },
                    error: function(data) {
                        console.log(data)
                    },
                    complete: function() {
                       // console.info(this.telephone);
                        this.telephone="";
                       // console.log('complete')
//						$.hideLoading();
                    },
                    context: this
                });
            },
			doSearch: function(e) {
				//console.log(e);
				//var telephone = e ? e.target.value : '';
                var phone = this.telephone.toUpperCase();
                //console.log(phone);

                if(isPhoneNo(phone) == false) {
                    $.toptip('请输入正确的手机号码',3000);
                    return;
                };
//				$.showLoading();
				$.ajax({
                    url:genAPI('wxDev/reserve/getReserveFenye'),
					//url: "http://wxdev.hongyancloud.com/wxDev/reserve/getReserveFenye",
					async: false,
					type: 'GET',
					data: {
						openId: this.openId,
						telephone: phone,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					dataType: 'json',
					success: function(data) {
						var datas = data.data.list;
						//console.log(datas);
						this.workersItem = datas;
                        $('.weui-cell_swiped').swipeout();
					},
					error: function(data) {
						console.log(data)
					},
					complete: function() {
						console.log('complete')
//						$.hideLoading();
					},
					context: this
				});
			}
		},
        updated:function () {
            $('.weui-cell_swiped').swipeout();
        },
		mounted: function() {
			console.log("init...")
			//this.openId = "oZIooxJ_MT0M1ApB_4caa_gvXgWc";
			//this.openId ="oZIooxC8FeMLlPp3n6fwuiT44trk";
			this.openId = $.getCookie('open_id');
			this.pageNum = 1;
			this.pageSize = 10000;
			this.doSearch();

		}
	});

});