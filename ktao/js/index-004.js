;(function($){

	function loadHtmlOnce($elem,callBack){
		//获取需要请求的地址
		var loadUrl = $elem.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $elem.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			console.log('get data ...',data);
			callBack($elem,data);
		});		
	}

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
		loadHtmlOnce($(this),buildMenuItem)
	});
	//构建菜单并加重
	function buildMenuItem($elem,data){
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
	var $category = $('.category .dropdown');

	$category.on('dropdown-show',function(ev){

		loadHtmlOnce($(this),buildCategorItem);

	});
	function buildCategorItem($elem,data){
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
	/*轮播图按需加载总函数开始*/
	function carouselLazyLoad($elem){
		$elem.item = {};
		$elem.totalItemNum = $elem.find('.carousel-img').length;
		$elem.loadedItemNum = 0 ;
		$elem.on('carousel-show',$elem.loadFn = function(ev,index,elem){
			if($elem.item[index] != 'loaded'){
				$elem.trigger('carousel-loadItem',[index,elem]);
				
			}
		});
		$elem.on('carousel-loadItem',function(ev,index,elem){
			var $imgs = $(elem).find('.carousel-img');
			$imgs.each(function(){

				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					$img.attr('src',url);
				},function(url){
					$img.attr('src','../images/placeholder.png');
				});
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum++;
				if($elem.loadedItemNum == $elem.totalItemNum){
					$elem.trigger('carousel-loadedItems');
				}
			})
		});
		$elem.on('carousel-loadedItems',function(){
			$elem.off('carousel-show',$elem.loadFn)
		});

	}



	/*轮播图按需加载总函数结束*/


	/*中心轮播图开始*/
	var $focusCarousel = $('.focus .carouselContent');
	/*
	$focusCarousel.on('carousel-show carousel-shown carousel-hide carousel-hidden',function(ev,index,elem){
		console.log(index,ev.type);
	})
	*/
	/*var item = {};
	var totalItemNum =  $focusCarousel.find('img').length;
	var loadedItemNum = 0;
	var loadFn = null;
	$focusCarousel.on('carousel-show',loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');
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
	/*中心轮播图按需加载开始*/
	/*$focusCarousel.item = {};
	$focusCarousel.totalItemNum =  $focusCarousel.find('img').length;
	$focusCarousel.loadedItemNum = 0;
	
	$focusCarousel.on('carousel-show',$focusCarousel.loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');
		if($focusCarousel.item[index] != 'loaded'){
			$focusCarousel.trigger('carousel-loadItem',[index,elem])
		}
	});

	$focusCarousel.on('carousel-loadItem',function(ev,index,elem){
		var $imgs = $(elem).find('.carousel-img');
		console.log(index,'loading...');
		$imgs.each(function(){
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
		})
		
	});
	
	$focusCarousel.on('carousel-loadedItems',function(){
		$focusCarousel.off('carousel-show',$focusCarousel.loadFn)
	});*/
	carouselLazyLoad($focusCarousel);
	/*中心轮播图按需加载结束*/

	/*调用轮播图插件*/
	$focusCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:0
	});
	var $todaysCarousel = $('.todays .carouselContent'); 
	/*中心轮播图结束*/
	/*todays划动轮播图*/
	
	/*var item = {};
	var totalItemNum =  $todaysCarousel.find('img').length;
	var loadedItemNum = 0;
	var loadFn = null;
	$todaysCarousel.on('carousel-show',loadFn = function(ev,index,elem){
		var $imgs = $(elem).find('.carousel-img');
		console.log('carousel-show loading...');
		if(item[index] != 'loaded'){
			console.log(index,'loading...');
			var $img = $(elem).find('img');
			var imgUrl = $img.data('src');
			console.log('1::',imgUrl);
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
	})*/
	/*$todaysCarousel.item = {};
	$todaysCarousel.totalItemNum =  $todaysCarousel.find('.carousel-img').length;
	$todaysCarousel.loadedItemNum = 0;
	
	$todaysCarousel.on('carousel-show',$todaysCarousel.loadFn = function(ev,index,elem){
		console.log('carousel-show loading...');
		if($todaysCarousel.item[index] != 'loaded'){
			$todaysCarousel.trigger('carousel-loadItem',[index,elem])
		}
	});

	$todaysCarousel.on('carousel-loadItem',function(ev,index,elem){
		var $imgs = $(elem).find('.carousel-img');
		console.log('123',$imgs);
		console.log(index,'loading...');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(url){
				$img.attr('src',url);
			},function(url){
				$img.attr('src','../images/placeholder.png');
			});
			$todaysCarousel.item[index] = 'loaded';
			$todaysCarousel.loadedItemNum++;
			if($todaysCarousel.loadedItemNum == $todaysCarousel.totalItemNum){
				$todaysCarousel.trigger('carousel-loadedItems')
			}
		})
		
	});
	
	$todaysCarousel.on('carousel-loadedItems',function(){

		$todaysCarousel.off('carousel-show',$todaysCarousel.loadFn)
	});*/
	carouselLazyLoad($todaysCarousel);


	$todaysCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:0
	});
	/*todays划动轮播图*/
	/*floor开始*/
	var $floor = $('.floor');

	$floor.item = {};
	$floor.totalItemNum =  $floor.find('img').length;
	$floor.loadedItemNum = 0;
	
	$floor.on('tab-show',$floor.loadFn = function(ev,index,elem){
		console.log('tab-show loading...');
		if($floor.item[index] != 'loaded'){
			$floor.trigger('tab-loadItem',[index,elem])
		}
	});

	$floor.on('tab-loadItem',function(ev,index,elem){
		var $imgs = $(elem).find('.carousel-img');
		console.log(index,'loading...');
		$imgs.each(function(){
			var $img = $(elem).find('img');
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(url){
				$img.attr('src',url);
			},function(url){
				$img.attr('src','images/focus-carousel/placeholder.png');
			});
			$floor.item[index] = 'loaded';
			$floor.loadedItemNum++;
			if($floor.loadedItemNum == $floor.totalItemNum){
				$floor.trigger('tab-loadedItems')
			}
		})
		
	});
	
	$floor.on('tab-loadedItems',function(){
		$floor.off('tab-show',$floor.loadFn)
	});
	$floor.tab({
		css3:true,
		js:true,
		eventName:'click',
		activeIndex:0,
		delay:200,
		interval:0,
		mode:'fade'

	})
	/*floor结束*/

})(jQuery);