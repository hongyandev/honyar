function loadList(openid, keyword) {
$.ajax({
	url:genAPI('wxDev/reserve/getReserveList'),
	//url: "http://wx.hongyancloud.com/wxDev/reserve/getReserveList" ,
	async: false,
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		var datas = data.data
		this.workersItem = datas
	},
	error: function(data) {
		console.log(data)
	},
	complete: function() {
		$.hideLoading();
	},
	context: this
});
}

// 获取预约列表
$(document).ready(function() {
	//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc'; //'oZIooxJ_MT0M1ApB_4caa_gvXgWc'
	var openID=$.getCookie('open_id');//'oZIooxJ_MT0M1ApB_4caa_gvXgWc'
	loadList(openID)
});

//检索后加载列表
$(function() {
	var $searchBar = $('#searchBar'),
		$searchResult = $('#searchResult'),
		$searchText = $('#searchText'),
		$searchInput = $('#searchInput'),
		$searchClear = $('#searchClear'),
		$searchCancel = $('#searchCancel');

	function hideSearchResult() {
		$searchResult.hide();
		$searchInput.val('');
	}

	function cancelSearch() {
		hideSearchResult();
		$searchBar.removeClass('weui-search-bar_focusing');
		$searchText.show();
		$(document).ready(function() {
			//var openID = 'oZIooxJ_MT0M1ApB_4caa_gvXgWc'; //'oZIooxJ_MT0M1ApB_4caa_gvXgWc'
			var openID = $.getCookie('open_id'); //'oZIooxJ_MT0M1ApB_4caa_gvXgWc'
			loadList(openID)
		});
	}

	$searchText.on('click', function() {
		$searchBar.addClass('weui-search-bar_focusing');
		$searchInput.focus();
		//alert('$searchText');
	});
	$searchInput
		.on('blur', function() {
			if(!this.value.length) cancelSearch();
		})
		.on('change', function() {
			if(this.value.length) {
				//alert(this.value)
				var openID = $.getCookie('open_id');
				loadList('searchDropower', openID, this.value);

				$searchResult.show();
			} else {
				$searchResult.hide();
			}
		});
	$searchClear.on('click', function() {
		hideSearchResult();
		$searchInput.focus();
	});
	$searchCancel.on('click', function() {
		cancelSearch();
		$searchInput.blur();
	});

});