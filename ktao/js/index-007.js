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
	//获取数据一次
	function getDataOnce($elem,url,callBack){
		var data = $elem.data(url);
		if(!data){
			$.getJSON(url,function(resData){
				$elem.data(url,resData);
				callBack(resData);
				console.log("hahaahah");
			})
		}else{
			callBack(data);
		}
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
	
	carouselLazyLoad($todaysCarousel);


	$todaysCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:0
	});
	/*todays划动轮播图*/
	/*floor开始*/
	var $floors = $('.floor');
	//楼层图片按需加载函数
	function floorImgLazyLoad($elem){
		var
			item = {},
			totalItemNum =  $elem.find('img').length,
			loadedItemNum = 0,
			loadFn = null;
			$elem.on('tab-show',loadFn = function(ev,index,elem){
				console.log('tab-show loading...');
				if(item[index] != 'loaded'){
					$elem.trigger('tab-loadItem',[index,elem])
				}
			});

		$elem.on('tab-loadItem',function(ev,index,elem){
		var $imgs = $(elem).find('.carousel-img');
		console.log(index,'loading...');
		$imgs.each(function(){
			var $img = $(elem).find('img');
			var imgUrl = $img.data('src');
			loadImage(imgUrl,function(url){
				setTimeout(function(){
					$img.attr('src',url);
				},1000)
				
				// console.log($img);
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
		$elem.on('tab-loadedItems',function(){
		$elem.off('tab-show',$elem.loadFn)
	})
}
	/*$floors.tab({
		css3:true,
		js:true,
		eventName:'click',
		activeIndex:0,
		delay:200,
		interval:0,
		mode:'fade'

	})*/
	var $win = $(window);
	var $doc = $(document);
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top+$elem.height())
	}

	function timeToShow(){
		$floors.each(function(index){
			if(isVisible($(this))){
				// console.log(index+" is show");
				$doc.trigger('floor-show',[index,this]);
				
			}
		})		
	}

	/*$doc.on('floor-show',function(ev,index,elem){
		//... HTML
		console.log(index,elem);
	})
*/
//楼层html图按需加载函数
function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeadHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>';
		return html;
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
		for(var i =0;i<oneFloorData.tabs.length;i++){
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
	 	html += '<div class="floor-item-bd fr"> <ul>';
	 	for(var i=0; i<3;i++){
	 		html += '<li class="floor-item-bd-item"> <ul>';
	 		for(var j=0;j<oneFloorData.items[i].length;j++){
	 			
				html +=			'<li class="floor-bd-items fl">';
				html +='				<p><a href="#"><img data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" src="images/loading (1).gif" alt="" class="floor-bd-pic carousel-img"></a></p>';
				html +=				'<P class="floor-bd-con">'+oneFloorData.items[i][j].name+'</P>';
				html +=				'<p class="floor-bd-pri">￥'+oneFloorData.items[i][j].price+'</p>';
				html +='			</li>';
							
				
				html +='	</li>';
	 		}
			html +=  '</ul></li> ';
	 	}
	 	html += '</ul></div>';
	 	return html;
	 }
	function floorHtmlLazyLoad(){
		var item = {},
		    totalItemNum =  $floors.length,
			loadedItemNum = 0,
			loadFn = null;
		
		$doc.on('floor-show',loadFn = function(ev,index,elem){
			console.log('floor-show loading...');
			if(item[index] != 'loaded'){
				$doc.trigger('floor-loadItem',[index,elem]);

			}
		});

		$doc.on('floor-loadItem',function(ev,index,elem){
			//HTML 加载

			console.log('will load '+index,elem);
			//请求数据
			getDataOnce($doc,'data/floor/floorData.json',function(floorData){
				var html = buildFloorHtml(floorData[index]);
				console.log("111","hahah.....");
				//模拟网络延时
				setTimeout(function(){
					$(elem).html(html);
					//加载图片
					floorImgLazyLoad($(elem));
					$(elem).tab({
						css3:false,
						js:false,
						mode:'fade',
						eventName:'mouseenter',
						activeIndex:0,
						delay:200,
						interval:0
					});					
				},1000)
			});
			
			item[index] = 'loaded';
				loadedItemNum++;
				if(loadedItemNum == totalItemNum){
					$doc.trigger('floor-loadedItems')
				}			
			});

		$doc.on('floor-loadedItems',function(){
			$doc.off('floor-show',loadFn)
			$win.off('scroll resize',$floors.toShowFn);
		});
	}
	// timeToShow();
	$win.on('scroll resize',$floors.ToShowFn = function(){
		clearTimeout($floors.floorTimer);
		$floors.floorTimer = setTimeout(function(){
			timeToShow();
			
		},200)
	});
floorHtmlLazyLoad();

	/*floor结束*/



})(jQuery);