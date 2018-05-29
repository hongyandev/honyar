//function ListLoad() { // 水电工选取方法
//	//$("#workers").blur(); // 选中工人栏
//	//this.workersCompoment = null; // 水电工人组件
//	//$("#sel_popup1").popup();
//	//$.showLoading(); // 显示加载等待?
//	$.ajax({ // 获取当前经纬度 省 市 的水电工列表
//		url: "http://wx.hongyancloud.com/wxDev/reserve/getDealerList?province=浙江省&city=杭州市&longitude=120.037467&latitude=30.24546",
//		async: false,
//		type: 'GET',
//		dataType: 'json',
//		success: function(data) {
//			var datas = data.data
//			this.workersItem = datas
//			this.title = '请选择服务商'
//			console.log(datas);
//			alert(JSON.stringify(datas));
//		},
//		error: function(data) {
//			console.log(data)
//		},
//		complete: function() {
//			$.hideLoading();
//		},
//		context: this
//	});
//};
//
//$(document).ready(function() {
//	ListLoad();
//});

$(function() {
var vmInfo=new Vue;
	$.ajax({ // 获取当前经纬度 省 市 的水电工列表
		url:genAPI('wxDev/reserve/getDealerList?province=浙江省&city=杭州市&longitude=120.037467&latitude=30.24546'),
		//url: "http://wx.hongyancloud.com/wxDev/reserve/getDealerList?province=浙江省&city=杭州市&longitude=120.037467&latitude=30.24546",
		async: false,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var datas = data.data;
			this.workersItem = datas;
			this.title = '请选择服务商';
			vmInfo.data.message;
	
		},
		error: function(data) {
			console.log(data)
		},
		complete: function() {
			$.hideLoading();
		},
		context: this
	});
//
	vmInfo = new Vue({
		el: '#page',
		data: {
			workersItem: [], // 水电工数据 item
			message: 'Hello World!'
		},
		methods: {
//
			closeDistrict: function() { // 省级返回到地图 上一页方法
				
				$.closePopup();
			},
////
////			workersSelButClick: function() { // 水电工选取方法
//				$("#workers").blur(); // 选中工人栏
//				this.workersCompoment = null; // 水电工人组件
//				$("#sel_popup1").popup();
//				$.showLoading(); // 显示加载等待?
//				$.ajax({ // 获取当前经纬度 省 市 的水电工列表
//					url: "http://wx.hongyancloud.com/wxDev/reserve/getDealerList?province=浙江省&city=杭州市&longitude=120.037467&latitude=30.24546",
//					async: false,
//					type: 'GET',
//					dataType: 'json',
//					success: function(data) {
//						var datas = data.data
//						this.workersItem = datas
//						this.title = '请选择服务商'
//					},
//					error: function(data) {
//						console.log(data)
//					},
//					complete: function() {
//						$.hideLoading();
//					},
//					context: this
//				});
//			},
		}
	});

});

//		var vm = new Vue({
//				data: {
//					workersItem: [] // 水电工数据 item
//				},
//				methods: {
//					workersSelButClick: function() { // 水电工选取方法
////						$("#workers").blur(); // 选中工人栏
////						this.workersCompoment = null; // 水电工人组件
////						$("#sel_popup1").popup();
////						$.showLoading(); // 显示加载等待?
//						$.ajax({ // 获取当前经纬度 省 市 的水电工列表
//							url: "http://wx.hongyancloud.com/wxDev/reserve/getDealerList?province=浙江省&city=杭州市&longitude=120.037467&latitude=30.24546",
//							async: false,
//							type: 'GET',
//							dataType: 'json',
//							success: function(data) {
//								var datas = data.data
//								this.workersItem = datas
//								this.title = '请选择服务商'
//							},
//							error: function(data) {
//								console.log(data)
//							},
//							complete: function() {
//								$.hideLoading();
//							},
//							context: this
//						});
//					},
//				},
//			}
//		});
//}