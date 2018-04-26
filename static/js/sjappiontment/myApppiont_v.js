$(function() {
    function getQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null) return unescape(r[2]);return null;
    }
    var uid = (getQueryString('uid')!=null ? getQueryString('uid') : null);
	var vm = new Vue({
		el: "#modal-content",
		data: {
			uid: "",
			pageNum: "",
			pageSize: "",
			workersItem: []
		},
		methods: {
			postuser: function(item){
                $.confirm("", "您确定要删除文件这条记录吗?", function() {
                    $.ajax({
                        type:"post",
                        url:genAPI('/wxDev/reserve/deleteReserve'),
                        dataType:"json",
                        data: {
                            "uid":this.uid,
                            "id":item.id
                        }, success: function(res) {
                            if(res.code==00000){
                                $.toast("文件已经删除!", 2000,function() {
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
						uid: this.uid,
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
            this.uid = uid;
			this.pageNum = 1;
			this.pageSize = 10000;
			this.doSearch();
            //console.info(this.uid);
		}
	});

});