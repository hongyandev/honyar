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
			postuser: function(item){},
			doSearch: function(e) {
				console.log(e)
				var telephone = e ? e.target.value : '';
//				$.showLoading();
				$.ajax({
					url: "http://wx.hongyancloud.com/wxDev/reserve/getReserveFenye",
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
		mounted: function() {
			console.log("init...")
			//this.openId = "oZIooxJ_MT0M1ApB_4caa_gvXgWc";
			this.openID = $.getCookie('open_id');
			this.pageNum = 1;
			this.pageSize = 10000;
			this.doSearch();
		}
	});
});