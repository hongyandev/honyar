$(function() {
	var vm = new Vue({
		el: "#modal-content",
		data: {
			openId: "",
			pageNum: "",
			pageSize: "",
			workersItem: []
		},
		methods: {
			postuser: function(item){
                $.confirm("", "您确定要删除这条预约吗?", function() {
                    $.ajax({
                        type:"post",
                        url:genAPI('/wxDev/reserve/deleteReserve'),
                        dataType:"json",
                        data: {
                            "openId":this.openId,
                            "id":item.id
                        }, success: function(res) {
                            if(res.code==00000){
                                //console.info(this.id);
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
            },
			doSearch: function(e) {
				console.log(e)
				var telephone = e ? e.target.value : '';
//				$.showLoading();
				$.ajax({
                    url:genAPI('wxDev/reserve/getReserveFenye'),
					//url: "http://wxdev.hongyancloud.com/wxDev/reserve/getReserveFenye",
					async: false,
					type: 'GET',
					data: {
						openId: this.openId,
						telephone: telephone,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					dataType: 'json',
					success: function(data) {
						var datas = data.data.list;
						console.log(datas);
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
			this.openId = $.getCookie('open_id');
			this.pageNum = 1;
			this.pageSize = 10000;
			this.doSearch();

		}
	});

});