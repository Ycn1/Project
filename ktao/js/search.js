;(function($){
	/*
	function Search($elem,options){
		this.$elem = $elem;
		this.$searchFrom = this.$elem.find('#search-form');
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.options = options;

		this._init();
	}
	Search.prototype = {
		constructor:Search,
		_init:function(){
			//绑定提交事件
			this.$searchBtn.on('click',$.proxy(this.submit,this));
		},
		submit:function(){
			if(this.getInputVal() == ''){
				return false;
			}
			this.$searchFrom.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		}
	}
	Search.DEFAULTS = {
		autocomplete:false,
		css3:false,
		js:false,
		mode:'fade'
	}

	$.fn.extend({
		search:function(options){
			return this.each(function(){
				var $this = $(this);
				var search = $this.data('search');
				if(!search){//单例模式
					options  = $.extend(Search.DEFAULTS,options);
					search = new Search($(this),options);
					$this.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options]();
				}
			});
		}
	})
*/
	var $searchFrom = $('#search-form'),
		$searchInput = $('.search-input'),
		$searchLayer = $('.search-layer');

	//提交表单的验证
	$searchFrom.on('submit',function(){
		if(getInputVal() == ''){
			return false;
		}
		console.log('submit...');
	});

	var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1528889766600_556&callback=jsonp557&k=1&area=c2c&bucketid=17&q=';
	//当用户输入时动态获取提示数据
	$searchInput.on('input',function(){
		console.log('ycn')
		//获取服务器数据
		$.ajax({
			url:url+getInputVal(),
			dataType:'jsonp',
			jsonp:'callback'

		})
		.done(function(data){
			// console.log(data);
			if(data.result.length == 0){
				$searchLayer.html('').hide();
				return;
			}

			var html = '';

			var dataNum = 10;

			for(var i = 0;i<data.result.length;i++){
				if(i>=dataNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>'
			}

			$searchLayer.html(html).show();
		})
		.fail(function(err){
			$searchLayer.html('').hide();
		})
		.always(function(){
			// console.log('always me');
		});
		/*
		$('.search-item').on('click',function(){
			console.log(this);
		})
		*/
	});

	//通过事件代理完成搜索下拉提示的提交
	$searchLayer.on('click','.search-item',function(){
		// console.log(this);
		$searchInput.val(removeHTMLTag($(this).html()));
		$searchFrom.trigger('submit');
	});

	$(document).on('click',function(){
		$searchLayer.hide();
	});

	$searchInput
	.on('focus',function(){
		if($.trim($searchLayer.html()) == ''){
			$searchLayer.hide();
		}else{
			$searchLayer.show();
		}
		
	})
	.on('click',function(ev){
		ev.stopPropagation();
	});	


	function getInputVal(){
		return $.trim($searchInput.val());
	}
	function removeHTMLTag(str){
		return str.replace(/<[^<|>]+>/g,'');
	}

})(jQuery);