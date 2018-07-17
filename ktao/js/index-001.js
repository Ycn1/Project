;(function($){
	var $menu = $('.nav-site .dropdown');
	$menu.on('dropdown-show',function(ev){
		// console.log(ev.type);
		var $this=  $(this);
		//当需要从服务器请求时
		var loadUrl = $this.data('load');
		if(!loadUrl) return;
		var isLoaded =$this.data('isLoaded');
		if(isLoaded) return;
		//如果有请求地址，发送获取请求
		$.getJSON(loadUrl,function(data){
			// console.log(data);
			var html ='';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href = "'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
				// console.log("123");
			}
			//模拟网络延迟
			setTimeout(function(){
				$this.find('.dropdown-layer').html(html);
				$this.data('isLoaded',true);
			},1000);
		})
	});

	$menu.dropdown({
		css3 : false,
		js : true,
		mode : 'slideUpDown'
	});
	//暴露出去接口
	// $('button').eq(0).click(function(){
	// 	$dropdown.dropdown('show');
	// })
	// $('button').eq(1).click(function(){
	// 	$dropdown.dropdown('hide');
	// })
	/*搜索框开始*/
	// var $search = $('.search');

	// $search.search({
	// 	autocomplete:true,
	// 	getDataInterval :0
	// });
	// $search
	// .on('getData',function(ev,data){
	// 	var $this = $(this);
	// 	var html = createSearchLayer(data,10);
	// 	$this.search('appendLayer',html);
	// 	if(html){
	// 		$this.search('showLayer');
	// 	}else{
	// 		$this.search('hideLayer');
	// 	}
	// })
	// .on('getNoData',function(){
	// 	$search.search('appendLayer','').search('hideLayer');
	// })
	// .on('click','.search-item',function(){
	// 	$search.search('setInputVal',$(this).html());
	// 	$search.search('submit');
	// });
	// function createSearchLayer (data,maxNum){
	// 	if(data.result.length == 0){
	// 		return '';
	// 	}
	// 	var html = '';
	// 	for(var i =0;i<data.result.length;i++){
	// 		if(i>=maxNum) break;
	// 		html += '<li class="search-item">'+data.result[i][0]+'</li>'
	// 	}
	// 	return html;
	// }





	/*搜索框结束*/
	/*分类导航开始*/
	var $category = $('.category  .dropdown');

	$category.on('dropdown-show',function(ev){
		// console.log(this);
		var $this = $(this);
		//当需要显示时从服务器获取数据并且加载

		//获取需要请求的地址
		var loadUrl = $this.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;
		
		var isLoaded = $this.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){

			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<dl class="category-details clearfix"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
				for(var j = 0;j<data[i].items.length;j++){
					html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
				}
				html += '</dd></dl>';
			}
			//模拟网络延时
			setTimeout(function(){
				$this.find('.dropdown-layer').html(html);
				console.log(this);
				$this.data('isLoaded',true);
			},1000);
		});

	});
	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});


	/*分类导航结束*/

})(jQuery);