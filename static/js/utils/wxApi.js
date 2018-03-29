/**
 * Created by jiangyukun on 2015/1/14.
 */

+function (window, $, wx) {
    var isDebug = false;
    var weixin = {}, init = false;
    var userAgent = navigator.userAgent.toLowerCase();
    var x = userAgent.match(/micromessenger\/(\d+\.\d+\.\d+)/) || userAgent.match(/micromessenger\/(\d+\.\d+)/);
    var v = x ? x[1] : "", lessThan6_0_2 = "6.0.2" > v;

    var jsBridgeReady, ready;

    var debugState = function () {
        var href = window.location.href;
        return isDebug || href.indexOf('debug=true') !== -1;
    };

    weixin.jsBridgeReady = jsBridgeReady = function (callback) {
        if (!window.WeixinJSBridge) {
            setTimeout(function () {
                jsBridgeReady.call(this, callback);
            }, 20);
        } else {
            callback.apply(this, arguments);
        }
    };

    weixin.error = wx.error;

    weixin.config = function (_config) {

        //loading
        var loading = weui.loading('loading', {
    		className: 'custom-classname'
		});

        if (!init) {
            init = true;
            if (debugState()) {
                weixin.ready = function (callback) {
                    jsBridgeReady(callback);
                }
            } else {
                if (!wx) {
                    throw new Error('wx don\'t exist');
                }
                weixin.ready = wx.ready;
                console.log(location.href.split('#')[0]);
                $.ajax({
                    type: 'get',
                    url:'http://wx.hongyancloud.com/wxDev/jsApiTicket/getSign',
                    data: {
                        url: location.href.split('#')[0]
                        // url: encodeURIComponent(location.href.split('#')[0])
                    },
                    dataType: 'json',
                    success: function (result) {
                        loading.hide();
                        weixin.configMessage = result;
                        var config = {};
                        config.debug = _config.debug;
                        config.jsApiList = _config.jsApiList;
                        config.appId = result.data.appId;
                        config.timestamp = result.data.timestamp;
                        config.nonceStr = result.data.nonceStr;
                        config.signature = result.data.signature;
                        console.log(JSON.stringify(config));
                        wx.config(config);
                    }
                });
            }
        }
    };

    //获取经纬度
    weixin.getLocation = function (successCallback, errorCallback) {
        wx.getLocation({
            success: function (res) {
                var lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var data = {
                    lat: lat,
                    lng: lng
                };
                if (typeof successCallback == "function") {
                    successCallback(data);
                }
            },
            cancel: function () {
                //这个地方是用户拒绝获取地理位置
                if (typeof errorCallback == "function") {
                    errorCallback(-1);
                }
            },
            fail: function () {
                if (typeof errorCallback == "function") {
                    errorCallback(-1);
                }
            }
        });
    };

    //打开腾讯内置地图
    weixin.openLocation = function (location) {
        //经纬度必须转float，否则ios无法打开内置地图
        wx.openLocation({
            latitude: parseFloat(location.lat), // 纬度，浮点数，范围为90 ~ -90
            longitude: parseFloat(location.lng), // 经度，浮点数，范围为180 ~ -180。
            name: location.name, // 位置名
            address: location.address, // 地址详情说明
            scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    };

    //调起微信扫一扫接口
    weixin.scanQRCode = function (callback) {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                if (typeof callback == "function") {
                    callback(res);
                }
            }
        });
    };

    // 分享到朋友圈
    weixin.onShareTimeline = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            opt = {
                appid: options.appid,
                img_width: options.imgWidth,
                img_height: options.imgHeight,
                img_url: options.imgUrl,
                link: options.link,
                desc: options.desc,
                title: options.title
            };
            dispatchResult = {
                trigger: options.trigger || $.noop,
                success: options.success || $.noop,
                cancel: options.cancel || $.noop,
                fail: options.fail || $.noop
            };
            window.WeixinJSBridge.on('menu:share:timeline', function () {
                if (options.is_share) {
                    window.WeixinJSBridge.invoke('shareTimeline', opt, function (result) {
                        if (result.err_msg == "share_timeline:ok" || result.err_msg == "share_timeline:confirm") {
                            dispatchResult.success.apply(this, arguments);
                        } else if (result.err_msg === 'share_timeline:cancel') {
                            dispatchResult.cancel.apply(this, arguments);
                        } else if (result.err_msg === 'share_timeline:fail') {
                            dispatchResult.fail.apply(this, arguments);
                        }
                    });
                } else {
                    alert("不能分享到朋友圈!");

                }

            });
        } else {
            wx.onMenuShareTimeline(options);
            if (!options.is_share) {
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:timeline'
                    ]
                })
            }
        }

    };
    //发送给朋友
    weixin.onShareAppMessage = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            opt = {
                appid: options.appid,
                img_width: options.imgWidth,
                img_height: options.imgHeight,
                img_url: options.imgUrl,
                link: options.link,
                desc: options.desc,
                title: options.title
            };
            dispatchResult = {
                trigger: options.trigger || $.noop,
                success: options.success || $.noop,
                cancel: options.cancel || $.noop,
                fail: options.fail || $.noop
            };
            window.WeixinJSBridge.on('menu:share:appmessage', function () {
                if (options.is_share) {
                    window.WeixinJSBridge.invoke('sendAppMessage', opt, function (result) {
                        // 返回res.err_msg,取值
                        // send_app_msg:cancel 用户取消
                        // send_app_msg:fail　发送失败
                        // send_app_msg:ok 发送成功 android
                        // send_app_msg:confirm 发送成功  ios
                        if (result.err_msg == "send_app_msg:ok" || result.err_msg == "send_app_msg:confirm") {
                            dispatchResult.success.apply(this, arguments);
                        } else if (result.err_msg === 'send_app_msg:cancel') {
                            dispatchResult.cancel.apply(this, arguments);
                        } else if (result.err_msg === 'send_app_msg:fail') {
                            dispatchResult.fail.apply(this, arguments);
                        }
                    });
                } else {
                    alert("不能发送给朋友!");

                }
            });
        } else {
            wx.onMenuShareAppMessage(options);
            if (!options.is_share) {
                wx.hideMenuItems({
                    menuList: [
                        'menu:share:appmessage'
                    ]
                })
            }
        }
    };
    //分享到微博
    weixin.onShareWeibo = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            //暂不开方
            if (options.is_share) {
                alert("禁止分享微博!");
            }

        } else {
            wx.onMenuShareWeibo(options);
            if (!options.is_share) {
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:weiboApp',
                    ]
                })
            }
        }
    };
    weixin.hideOptionMenu = function () {
        if (lessThan6_0_2) {
            jsBridgeReady(function () {
                window.WeixinJSBridge.call('hideOptionMenu');
            });
        } else {
            wx.hideOptionMenu();
        }
    };

    weixin.showOptionMenu = function () {
        if (lessThan6_0_2) {
            jsBridgeReady(function () {
                window.WeixinJSBridge.call('showOptionMenu');
            });
        } else {
            wx.showOptionMenu();
        }
    };

    weixin.closeWindow = function () {
        if (lessThan6_0_2) {
            jsBridgeReady(function () {
                window.WeixinJSBridge.call('closeWindow');
            });
        } else {
            wx.closeWindow();
        }
    };
    weixin.getNetworkType = function (options) {
        var opt, dispatchResult;
        if (lessThan6_0_2) {
            opt = {};
            dispatchResult = {
                trigger: options.trigger || $.noop,
                success: options.success || $.noop,
                cancel: options.cancel || $.noop,
                fail: options.fail || $.noop
            };
            jsBridgeReady(function () {
                window.WeixinJSBridge.invoke('getNetworkType', opt, function (result) {
                    if (result.err_msg === 'network_type:fail') {
                        dispatchResult.fail.apply(this, arguments);
                    } else {
                        dispatchResult.success.apply(this, arguments);
                    }
                });
            });
        } else {
            wx.getNetworkType(options);
        }
    };
    window.weixin = weixin;
}(window, $, window.wx);