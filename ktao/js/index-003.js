;(function($){
	function loadHtmlOnce($elem,callback){
		var loadUrl = $elem.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $elem.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		$.getJSON(loadUrl,function(data){
			callback($elem,data);
		});
	};
	function loadImage(url,success,error){
		var image = new Image();
		image.onload = function(){
			if(typeof success == 'function') success(url);
		}
		image.onerror = function(){
			if(typeof error == 'function') error(url);
		}
		image.src = url;

	}

	/*顶部下拉菜单开始*/
	var $menu = $('.nav-site .dropdown');
	
	$menu.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),createMenuItem);
	});
	
	function createMenuItem($elem,data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>';
			}
			//模拟网络延时
			setTimeout(function(){
				$elem.find('.dropdown-layer').html(html);
				$elem.data('isLoaded',true);
			},1000);

	}
	$menu.dropdown({
		css3:false,
		js:true,
		mode:'slideUpDown'
	});

	/*顶部下拉菜单结束*/
	
	/*搜索框开始*/

	var $search = $('.search');
	
	//search插件初始化
	$search.search({
		autocomplete:true,
		getDataInterval:0
	});
	
	$search
	.on('getData',function(ev,data){
			var $this = $(this);
			var html = createSearchLayer(data,10);	
			$this.search('appendLayer',html);
			if(html){
				$this.search('showLayer');
			}else{
				$this.search('hideLayer');
			}
	})
	.on('getNoData',function(){
		$search.search('appendLayer','').search('hideLayer');
	})
	.on('click','.search-item',function(){
		$search.search('setInputVal',$(this).html());
		$search.search('submit');

	});

	function createSearchLayer(data,maxNum){
		if(data.result.length == 0){
			return '';
		}		
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i>=maxNum) break;
			html += '<li class="search-item">'+data.result[i][0]+'</li>'
		}
		return html;
	}
	/*搜索框结束*/	

	/*分类导航开始*/
	var $category = $('.category .category-list .dropdown');

	$category.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),createCategoryOnce);

	});
	function createCategoryOnce($elem,data){
		var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<dl class="category-details clearfix"><dt class="category-details-tittle fl link"><a href="#" class="category-details-title-link link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
				for(var j = 0;j<data[i].items.length;j++){
					html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
				}
				html += '</dd></dl>';
			}
			//模拟网络延时
			setTimeout(function(){
				$elem.find('.dropdown-layer').html(html);
				$elem.data('isLoaded',true);
			},1000);
	}
	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});

	/*分类导航结束*/


	/*轮播图开始*/
	var $focusCarousel = $('.focus .carouselContent');
	/*console.log($focusCarousel);
	
	$focusCarousel.on('carousel-show',function(ev,index,elem){
		var $img = $(elem).find('img');
		var imgUrl = $img.data('src');

		// $img.attr('src',imgUrl);

		var image = new Image();

		image.onload = function(){
			$img.attr('src',imgUrl);
			console.log("123")
		}

		image.src = imgUrl;
	})
	*/
	
	/*var item = {};
	var totalItemNum = $focusCarousel.find('img').length;
	console.log(totalItemNum);
	var loadedItemNum = 0;
	var loadFn = null;
	$focusCarousel.on('carousel-show',loadFn = function(ev,index,elem){
		console.log('carousel-show loading');
		if(item[index] != 'loaded'){
			 console.log(index,'loading...');
			 var $img = $(elem).find('img');
			 var imgUrl = $img.data('src');
			 loadImage(imgUrl,function(url){
			 	$img.attr('src',url);
			 },function(url){
			 	$img.attr('src','images/placeholder.png');
			 });
			 item[index] = 'loaded';
			 loadedItemNum++;
			 if(loadedItemNum == totalItemNum){
			 	$focusCarousel.off('carousel-show',loadFn)
			 }
			 
		}
		
	})*/
	
	/*轮播图按需加载功能分离开始*/

	$focusCarousel.item = {};
	$focusCarousel.totalItemNum =  $focusCarousel.find('img').length;
	$focusCarousel.loadedItemNum = 0;
	
	$focusCarousel.on('carousel-show',$focusCarousel.loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');
		if($focusCarousel.item[index] != 'loaded'){
			$focusCarousel.trigger('carousel-loadItem',[index,elem])
		}
	});

	$focusCarousel.on('carousel-loadItem',function(ev,index,elem){
		console.log(index,'loading...');
		var $img = $(elem).find('img');
		var imgUrl = $img.data('src');
		loadImage(imgUrl,function(url){
			$img.attr('src',url);
		},function(url){
			$img.attr('src','images/focus-carousel/placeholder.png');
		});
		$focusCarousel.item[index] = 'loaded';
		$focusCarousel.loadedItemNum++;
		if($focusCarousel.loadedItemNum == $focusCarousel.totalItemNum){
			$focusCarousel.trigger('carousel-loadedItems')
		}
	});
	
	$focusCarousel.on('carousel-loadedItems',function(){
		$focusCarousel.off('carousel-show',$focusCarousel.loadFn)
	});
	/*轮播图按需加载功能分离结束*/
var $focusCarousel = $('.focus .carouselContent');

	$focusCarousel.carousel({
		activeIndex:0,
		mode:'fade',
		interval:2000
	})
	/*轮播图结束*/
	/*todays划动轮播图开始*/
	var $todaysCarousel = $('.todays .carouselContent');
	var $todaysCarousel = $('.todays .carouselContent');
	var item = {};
	var totalItemNum = $todaysCarousel.find('img').length;
	var loadedItemNum = 0;
	var loadFn = null;
	$todaysCarousel.on('carousel-show',loadFn = function(ev,index,elem){
		console.log('carousel-show loading');
		if(item[index] != 'loaded'){
			 console.log(index,'loading...');
			 var $img = $(elem).find('img');
			 var imgUrl = $img.data('src');
			 loadImage(imgUrl,function(url){
			 	$img.attr('src',url);
			 },function(url){
			 	$img.attr('src','images/placeholder.png');
			 });
			 item[index] = 'loaded';
			 loadedItemNum++;
			 if(loadedItemNum == totalItemNum){
			 	$todaysCarousel.off('carousel-show',loadFn)
			 }
			 
		}

	})
	
	

	$todaysCarousel.carousel({
		activeIndex:1,
		mode:'fade',
		interval:0
	})	
	/*todays划动轮播图结束*/

	})(jQuery);
