;(function($){
	var $searchForm = $('#search-form'),
		$searchInput = $('.search-inout');
	var $searchLayer = $('.search-layer');
		$searchForm.on('submit',function(){
			
			if(getInputVal() == ''){
				return false;
			}
			console.log('submit...');
		});
	var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1528889766600_556&callback=jsonp557&k=1&area=c2c&bucketid=17&q=';

		//当用户输入时动态获取同时数据
		$searchInput.on('input',function(){
			//获取服务器数据
			$.ajax({
				url:url+getInputVal(),
				dataType:'jsonp',
				jsonp:'callback',
			})
			.done(function(data){
				// console.log(data);
				if(data.result.length == 0){
					$searchLayer.html('').hide();
					return;
				}
				var html = '';
				var dataNum = 5;
				for(var i=0;i<data.result.length;i++){
					if(i>=dataNum) break;
					html += '<li class = "search-item">'+data.result[0]+'</li>'
				}
				$searchLayer.html(html).show();
			})
			.fail(function(err){
				console.log(err);
				$searchLayer.html('').hide();
			})
			.always(function(){
				console.log('always me');
			})
		})


		function getInputVal(){
			//阻止输入空格跳转页面
			return $.trim($searchInput.val());
		}
})(jQuery)