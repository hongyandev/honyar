$(function() {
    function getQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null) return unescape(r[2]);return null;
    }
    var uid = (getQueryString('uid')!=null ? getQueryString('uid') : null);
    const time_count = 60;
	// key
	var key = 'b3f46725cfbf1073af700a708c2eb00c';
	// TODO 1.这里缺少一个 开始获取用户坐标的方法
	mapObj = new AMap.Map('iCenter');
	mapObj.plugin('AMap.Geolocation', function() {
		geolocation = new AMap.Geolocation({
			enableHighAccuracy: true, //是否使用高精度定位，默认:true
			timeout: 10000, //超过10秒后停止定位，默认：无穷大
			maximumAge: 0, //定位结果缓存0毫秒，默认：0
			convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
			showButton: true, //显示定位按钮，默认：true
			buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
			buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
			showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
			panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
			zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		});
		mapObj.addControl(geolocation);
		geolocation.getCurrentPosition();
		AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
		AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
	});

	function onError(data) {
		//alert(JSON.stringify(data));
		document.getElementById('tip').innerHTML = '定位失败';
	}

	function onComplete(data) {
		//console.log(data)
		// 得到数据后开始转
		var lng = data.position.lng // 长的
		vm.lng = lng
		var lat = data.position.lat // 短的
		vm.lat = lat
		var arr = [lng, lat]
		vm.mapoption = data
		vm.address = data.addressComponent.township + data.addressComponent.street + data.addressComponent.streetNumber // 当前位置
		vm.district = data.addressComponent.province + data.addressComponent.city + data.addressComponent.district + data.addressComponent.township // 所在地区
		/*var map = new AMap.Map("amap", {
					resizeEnable: true,
					scrollWheel: false,
					center: [vm.lng, vm.lat], // TODO 2.这里应该把获取用户的坐标 填入进去  地图就自动一开始定位到用户所在位置
					zoom: 13 // 地图显示的缩放级别
				});*/

		map.setCenter(arr);

		var marker = new AMap.Marker({
			position: [vm.lng, vm.lat]
		});
		marker.setMap(map);
	}

	var map = new AMap.Map("amap", {
		scrollWheel: false,
		center: [120.037467, 30.24546], // TODO 2.这里应该把获取用户的坐标 填入进去  地图就自动一开始定位到用户所在位置
		zoom: 13 // 地图显示的缩放级别
	});

	// 实例化点标记
	function addMarker(lnglat) {
		if(marker) {
			marker.setMap(null);
			marker = null;
		}
		marker = new AMap.Marker({
			position: lnglat
		});
		marker.setMap(map);
	}

	var vm = new Vue({
		el: '#page',
		data: {
			khdm: '',
			mapoption: [], // 获取地图定位信息的变量
			lng: 120.037467,
			lat: 30.24546,
			//openId: '', // 微信给用户分配的ID
            uid:'',
			serviceType: '1', // 服务类型的值
			serviceTypes: [], // 服务类型列表
			reserveType: '', // 预约人类型的值
			reserveTypes: [], // 预约人类型列表
			reserveName: '', // 预约人姓名
			reserveTelephone: '', // 预约人电话
			userName: '', // 业主姓名
			userTelephone: '', // 业主电话
			reserveDate: '', // 预约日期
			arrivalDate: '', // 上门日期
			province: '', // 省
			city: '', // 城市
			district: '', // 区
			town: '', // 街
			detailAddress: '', // 详细地址
			comment: '', // 备注
			longitude: '', // 经度
			latitude: '', // 纬度
			state: '', // 状态
			iCode: '', // 验证码
			workersItem: [], // 水电工数据 item
			supplier: '    请选择预约水电工',
			address: '',
            show: true,
            count: '',
            timer: null,
            disabled:true,
			districtComponent: null,
			title: '请选择',
			cells: [{
				adcode: "110000",
				center: "116.397428, 39.90923",
				citycode: "010",
				name: "北京市"
			}]
		},
        mounted: function (){
            this.showData();
            },

        watch : {
            reserveName : function (val, reserveType) {
                if(vm.reserveType=='1'){
                    vm.userName = val;
                }
            },
            reserveTelephone : function (val, reserveType) {
                if(vm.reserveType=='1'){
                    vm.userTelephone = val
                }
            },
            reserveType : function (val) {
                if(val!='1'){
                    vm.reserveName='';
                    vm.reserveTelephone='';
                    vm.userName='';
                    vm.userTelephone='';
                    vm.iCode='';
                    vm.comment='';
                    vm.detailAddress='';
                    vm.reserveDate='';
                }
            }
        },
		methods: {
		    //获取服务类型
            showData:function () {
                $.ajax({
                    url:genAPI('wxDev/reserve/getServiceType?uid=' + uid),
                    type:"GET",
                    dataType:"json",
                    success:function(res){
                        if(res.code==00000){
                            // for(var i=0;i<res.data.length;i++){
                            	// vm.serviceTypes.push(res.data[i]);
							// }
                            vm.serviceTypes=res.data;
                        }
                    },
                    error:function(){
                        $.topTips(res.msg,3000);
                    }
                });
            },
			// 获取验证码
			smsclick: function() {
				var phone = vm.reserveTelephone;
				if(isPhoneNo(phone) == false) {
					//alert('请输入正确的手机号码');
                    $.toptip('请输入正确的手机号码', 3000);
					return;
				};
                if (!this.timer) {
                    this.count = time_count;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= time_count) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    };
                }, 1000)
                };
				$.ajax({ // 获取验证码
					url:genAPI('wxDev/reserve/sendIcode?telephone='+ phone),
					//url: "http://wx.hongyancloud.com/wxDev/reserve/sendIcode?telephone=" + phone, // TODO  这里用真号码居然错误+ phone
					async: false,
					type: 'GET',
					dataType: 'json',
					success: function(data) {

					},
					error: function(data) {
						console.log(data)
					},
					complete: function() {
						$.hideLoading();
					},
					context: this
				});
			},
			// 跳转预约post提交
			postuser: function(item) {
				$("#workers").blur(); // 选中工人栏
				this.workersCompoment = null; // 水电工人组件
				$("#sel_popup2").popup();
				$.showLoading(); // 显示加载等待?
				$.ajax({ // 获取预约人+服务类型
					url:genAPI('wxDev/reserve/getReserveMessage?uid=' + uid),
					//url: "http://wx.hongyancloud.com/wxDev/reserve/getReserveMessage?openId=" + openID, // TODO 这里的openId 写死了 需要跟着接口改为$.getCookie('open_id')
					async: false,
					type: 'GET',
					dataType: 'json',
					success: function(data) {
						vm.serviceTypes = data.data.serviceType // 给服务类型赋值
						vm.reserveTypes = data.data.peopleType // 给预约人类型赋值
						console.log(vm.reserveTypes)
					},
					error: function(data) {
						console.log(data)
					},
					complete: function() {
						$.hideLoading();
					},
					context: this
				});
				vm.khdm = item.khdm;
			},
			workersSelButClick: function() { // 水电工选取方法
				$("#workers").blur(); // 选中工人栏
				this.workersCompoment = null; // 水电工人组件
				$("#sel_popup1").popup();
				$.showLoading(); // 显示加载等待?
				province = "province=" + NewProvince;
				city = "city=" + NewCity;
				longitude = "&longitude=" + NewLng;
				latitude = "&latitude=" + NewLat;
                district = "&district=" + Newdistrict;
				//				alert(district);
				//				alert("http://wx.hongyancloud.com/wxDev/reserve/getDealerList?" + province + city + longitude + latitude);
				$.ajax({ // 获取当前经纬度 省 市 的水电工列表
					url:genAPI('wxDev/reserve/getDealerList?'+city + district + longitude + latitude + '&serviceType=' + this.serviceType),
					//url: "http://wx.hongyancloud.com/wxDev/reserve/getDealerList?" + province + city + longitude + latitude, // province=浙江省&city=杭州市&longitude=120.037467&latitude=30.24546改为::1.  vm.mapoption.addressComponent.province 省 2. vm.mapoption.addressComponent.city 市 3. vm.mapoption.position.lng 长的度数 4.  vm.mapoption.position.lat  短的度数
					async: false,
					type: 'GET',
					dataType: 'json',
					success: function(data) {
						var datas = data.data;
						this.workersItem = datas;
						this.title = '请选择服务商'
					},
					error: function(data) {
						console.log(data)
					},
					complete: function() {
						$.hideLoading();
					},
					context: this
				});
			},
			selButClick: function() { // 点击所在地触发的方法
				$("#district").blur();
				this.districtComponent = null;
				$("#sel_popup").popup();
				this.getDistrict({
					adcode: '100000'
				})
			},
			closeDistrict: function() { // 省级返回到地图 上一页方法
				if(this.districtComponent)
					map.setCenter(this.districtComponent.center.split(','));
				$.closePopup();
			},
			getDistrict: function(item) { // 得到省级 城市等数据
				if(item.adcode != '100000') {
					this.districtComponent = item;
				}
				if(item.level === "street") {

					map.setCenter(item.center.split(','));
					$.closePopup();
					return;
				}
				$.showLoading(); // 显示加载等待?
				$.ajax({ // 获取全国省级等数据的请求
					url: "http://restapi.amap.com/v3/config/district?key=" + key + "&keywords=" + item.adcode + "&subdistrict=1&extensions=base",
					async: false,
					dataType: 'jsonp',
					success: function(data) {
						this.cells = data.districts[0].districts;
						this.title = data.districts[0].name;
					},
					error: function(data) {
						console.log(data)
					},
					complete: function() {
						$.hideLoading();
					},
					context: this
				});
			},
			/**
			 * 格式化时间日期
			 * @param date 时间格式
			 * @param format "yyyy-MM-dd hh:mm:ss"
			 * @returns string
			 * 另一个用法：formatDate('yyyy-MM-dd hh:mm:ss')返回当前时间格式化字符串
			 * dateFormat('yyyy-MM-dd hh:mm:ss');
			 * dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
			 */
			formatDate: function(date, format) {
				"use strict";
				if(format === undefined) {
					format = date;
					date = new Date();
				}
				if('string' === typeof(date)) {
					if(date.indexOf('.') > -1) {
						date = date.substr(0, date.indexOf('.'));
					}
					date = new Date(date.replace(/\-/g, '/'));
				}
				var map = {
					"M": date.getMonth() + 1, //月份
					"d": date.getDate(), //日
					"h": date.getHours(), //小时
					"m": date.getMinutes(), //分
					"s": date.getSeconds(), //秒
					"q": Math.floor((date.getMonth() + 3) / 3), //季度
					"S": date.getMilliseconds() //毫秒
				};
				format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
					var v = map[t];
					if(v !== undefined) {
						if(all.length > 1) {
							v = '0' + v;
							v = v.substr(v.length - 2);
						}
						return v;
					} else if(t === 'y') {
						return(date.getFullYear() + '').substr(4 - all.length);
					}
					return all;
				});
				return format;
			},
            selToDisabled:function () {
                this.selToDisabled=true;
            },
			// 预约人信息提交
			userPostSubmit: function() {
				var myData = {
                    uid:uid,
					serviceType: vm.serviceType, // 服务类型
					reserveType: vm.reserveType, // 预约人类型
					reserveName: vm.reserveName, // 预约人姓名
					reserveTelephone: vm.reserveTelephone, // 预约人电话
					userName: vm.userName, // 业主姓名
					userTelephone: vm.userTelephone, // 业主电话
					reserveDate: vm.reserveDate, //  TODO 表单提交的时间到底用在那个时间提交  预约日期  例子中:vm.formatDate(时间, 'yyyy-MM-dd hh:mm:ss')
					//arrivalDate: vm.arrivalDate, //  TODO 表单提交的时间到底用在那个时间提交 上门日期
					province: vm.mapoption.addressComponent.province, // 省
					city: vm.mapoption.addressComponent.city, // 城市
					district: vm.mapoption.addressComponent.district, // 区
					town: vm.mapoption.addressComponent.street, // 街
					detailAddress: vm.detailAddress, // 详细地址
					comment: vm.comment, // 备注
					longitude: vm.mapoption.position.lng, // 经度
					latitude: vm.mapoption.position.lat, // 纬度
					iCode: vm.iCode, // 验证码
					khdm: vm.khdm // 客户代码
				};
				if(myData.reserveType == "") {
                    $.toptip('请选择预约人类型！', 3000);
					//alert('请选择预约人类型!')
					return;
				}

				if(myData.reserveName == "") {
                    $.toptip('请输入预约人姓名！', 3000);
					//alert('请输入预约人姓名!')
					return;
				}

				if(myData.serviceType == "") {
                    $.toptip('请选择服务类型！', 3000);
					//alert('请选择服务类型!')
					return;
				}
				if(myData.userName == "") {
                    $.toptip('请输入业主姓名！', 3000);
					//alert('请输入业主姓名!')
					return;
				}
				/*if(myData.userName == "") {
                    $.toptip('请输入业主姓名！', 3000);
					//alert('请输入业主姓名!')
					return;
				}*/

				if(myData.detailAddress == "") {
                    $.toptip('请输入详细位置！', 3000);
					//alert('请输入详细位置!')
					return;
				}

				if(myData.reserveDate == "") {
                    $.toptip('请输入预约时间！', 3000);
					//alert('请输入预约时间!')
					return;
				}

				$.ajax({ // 获取全国省级等数据的请求
					url:genAPI('wxDev/reserve/saveReserve'),
					//url: "http://wx.hongyancloud.com/wxDev/reserve/saveReserve",
					async: false,
					type: 'POST',
					data: myData,
					dataType: 'json',
					success: function(data) {
						if(data.code == "00000") {
							//alert(JSON.stringify(data));
							//alert('预约申请提交成功！');
							$.toast("预约申请提交成功！",3000);
							//alert(uid);
							window.location.href = "../sjappiontment/myAppiont.html";
						} else {
                            $.toptip(data.msg);
						}
					},
					error: function(data) {
						console.log(data);
                        $.toptip('网络异常,请检查您的网络');
						//alert('网络异常,请检查您的网络');
					},
					complete: function() {
						$.hideLoading();
					},
					context: this
				});
			},
		}
	});

	AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
		var positionPicker = new PositionPicker({
			mode: 'dragMap',
			map: map
		});
		positionPicker.on('success', function(result) {
			//console.log('XXX');
			//console.log(result);
			var component = result.regeocode.addressComponent;
			NewProvince = component.province;
            NewCity = component.city || component.district;
            Newdistrict = component.district;
			NewLng = result.position.lng;
			NewLat = result.position.lat;
			vm.district = component.province + component.city + component.district + component.township; // 赋值选中后的范围
			vm.address = component.street + component.streetNumber; // 赋值选中后的位置
		});

		positionPicker.on('fail', function(result) {
			console.log(result);

		});
		positionPicker.start();

	});

});