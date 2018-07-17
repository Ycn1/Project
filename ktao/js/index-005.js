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
	//获取数据一次
	function getDataOnce($elem,url,callBack){
		var data = $elem.data(url);
		if(!data){
			$.getJSON(url,function(resData){
				$elem.data(url,resData);
				callBack(resData);
			})
		}else{
			callBack(data);
		}

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
				// console.log($imgs);
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					setTimeout(function(){
						$img.attr('src',url);
					},1000)
					
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
	carouselLazyLoad($focusCarousel);
	/*中心轮播图按需加载结束*/

	/*调用轮播图插件*/
	$focusCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:0
		,

	});
	var $todaysCarousel = $('.todays .carouselContent'); 
	/*中心轮播图结束*/
	/*todays划动轮播图*/
	carouselLazyLoad($todaysCarousel);


	$todaysCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:0
	});
	/*todays划动轮播图*/
	/*floor开始*/
	/*var $floor = $('.floor');
	function floorlLazyLoad($elem){
	var
		item = {},
		totalItemNum = $elem.find('.carousel-img').length,
		loadedItemNum = 0 ;
	var loadFn = null;
		$elem.on('carousel-show',loadFn = function(ev,index,elem){
			if(item[index] != 'loaded'){
				$elem.trigger('carousel-loadItem',[index,elem]);
				
			}
		});
		$elem.on('carousel-loadItem',function(ev,index,elem){
			var $imgs = $(elem).find('.carousel-img');
			$imgs.each(function(){
				// console.log($imgs);
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					setTimeout(function(){
						$img.attr('src',url);
					},1000)
					
				},function(url){
					$img.attr('src','../images/placeholder.png');
				});
				item[index] = 'loaded';
				loadedItemNum++;
				if(loadedItemNum == totalItemNum){
					$elem.trigger('carousel-loadedItems');
				}
			})
		});
		$elem.on('carousel-loadedItems',function(){
			$elem.off('carousel-show',loadFn)
		});

	}
	$floor.each(function(){
		floorlLazyLoad($(this));
	})*/
	// floorlLazyLoad($floor);
	// carouselLazyLoad($floor);
	/*$floor.tab({
		css3:false,
		js:true,
		eventName:'click',
		activeIndex:1,
		delay:400,
		interval:0,
		mode:'fade'

	})*/
	/*floor结束*/
	/*按需加载floor开始*/
	var $floors = $('.floor');
	function floorImgLazyLoad($elem){
		var item = {},
		totalItemNum = $elem.find('.carousel-img').length,
		loadedItemNum = 0,
		loadFn = null;
		$elem.on('floor-show',loadFn = function(ev,index,elem){
			if(item[index] != 'loaded'){
				$elem.trigger('tab-loadItem',[index,elem])
			}
		});
		$elem.on('tab-loadItem',function(ec,indexmelem){
			var $imgs = $(elem).find('.carousel-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){
					setTimeout(function(){
						$img.attr('src',url);
					},1000)
					 
			},function(url){
					$img.attr('src','../images/placeholder.png');

				});
				item[index] = 'loaded';
				loadedItemNum++;
				if(loadedItemNum == totalItemNum){
					$elem.trigger('tab-loadedItems')
				}
		})

	});
		$elem.on('tab-loadItems',function(){
			$elem.off('floor-show',loadFn)
		});
}
	var $win = $(window);

	var $doc = $(document);
	 function isVisible($elem){
	 	return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top + $elem.height())
	 }
	 function timeToShow(){
	 	$floors.each(function(index){
	 		if(isVisible($(this))){
	 			$doc.trigger('floor-show',[index,this])
	 		}
	 	})
	 }
	 

	 function buildFloorHtml(oneFloorData){
	 	var html ='';
	 	console.log("6666");
	 	html += '<ul class ="floor-item">';
	 	html  += buildFloorHeadHtml(oneFloorData);
	 	html += buildFloorBodyHtml(oneFloorData);
	 	html +='</ul>';
	 	return html;
	 	console.log(html);
	 }
	 function buildFloorHeadHtml(oneFloorData){
	 	var html = '';

	 	html += '<div class="floor-item-hd fl">';
		html +='		<ul>';
		html +='			<li class="floor-num fl">';
		html +='				<span class="one-f">'+oneFloorData.num+'F</span>';
		html +='				<span>'+oneFloorData.text+'</span>';
		html +='			</li>';
		html +='			<li class="floor-con fr">';
		html +='				<ul class="floor-item">';
		for(var i =o;i<oneFloorData.tabs.length;i++){
			html += '<li><a href="javascript:;" class="floor-item-con">'+oneFloorData.tabs[i]+'</a></li>';
							if(i != oneFloorData.tabs.length-1){
								html += '<li class="floor-wrap-line"></li>';
							}
		}
		html +='				</ul>';
		html +='			</li>';
		html +='		</ul>';								
		html +='	</div>';
		return html;
	 }
	 function buildFloorBodyHtml(oneFloorData){
	 	var html ='';
	 	html += '<div class="floor-item-bd fr">';
	 	html +='<ul>';
	 	for(var i=0; i<oneFloorData.items.length;i++){
	 		html += '<li class="floor-item-bd-item">';
	 		for(var j=0;j<oneFloorData.items[i].length;j++){
	 			html +='			<ul>';
				html +=			'<li class="floor-bd-items fl">';
				html +='				<p><a href="#"><img data-src="images/floor/1/1.png" src="images/loading (1).gif" alt="" class="floor-bd-pic carousel-img"></a></p>';
				html +=				'<P class="floor-bd-con">'+oneFloorData.items[i][j].name+'</P>';
				html +=				'<p class="floor-bd-pri">￥'+oneFloorData.items[i][j].price+'</p>';
				html +='			</li>';
							
				html +='		</ul>';
				html +='	</li>';
	 		}
			html += '</li>';
	 	}
	 	html += '</ul></div>';
	 	return html;
	 }
function floorHtmlLazyLoad(){
	var item = {},
		totalItemNum = $floors.length,
		loadedItemNum = 0,
		loadFn = null;

		$doc.on('floor-show',function(ev,index,elem){
			 	// console.log(index,elem);
			 	if(item[index] != 'loaded'){
			 		$doc.trigger('floor-loadItem',[index,elem]);

			 	}
			 });
		$doc.on('floor-loadItem',function(ev,index,elem){
			getDataOnce($doc,'../data/floor/floorData.json',function(floorData){
				var html = buildFloorHtml(floorData[index]);
				setTimeout(function(){
					$(elem).html(html);
					console.log($(elem));
					floorImgLazyLoad($(elem));
					$(elem).tab({
						css3:false,
						js:false,
						mode:'fade',
						eventName:'mouseenter',
						activeIndex:0,
						delay:200,
						interval:0
					})
				},1000)
				
				console.log($doc.src);
			});
			item[index] = 'loaded';
						loadedItemNum++;
						if(loadedItemNum == totalItemNum){
							$doc.trigger('floor-loadedItems')
						}			
					});
		$doc.on('floor-loadedItems',function(){
					$doc.off('floor-show',loadFn)
				});
}

$win.on('scroll resize',$floors.toShowFn = function(){
	clearTimeout($floors.floorTimer);
	$floors.floorTimer = setTimeout(function(){
		timeToShow();
	},200)
});
floorHtmlLazyLoad();

	/*按需加载floor结束*/


})(jQuery);