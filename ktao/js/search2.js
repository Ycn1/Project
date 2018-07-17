;(function($){
	//缓存
	var cache = {
		data: {},
		count:0,
		addData : function(key,val){
			this.data[key] = val;
			this.count++;
		},
		readData:function(key){
			return this.data[key];
		}
	};

	function Search($elem,options){
		this.$elem = $elem;
		this.$searchForm = this.$elem.find('#search-form');
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.options = options;
		this.isLoad = false;
		this._init();
		//是否启用补全
		if(this.options.autocomplete){
			this.autocomplete();
		}
	}
	Search.prototype = {
		constructor : Search,
		_init:function(){
			//绑定事件
			this.$searchBtn.on('click',$.proxy(this.submit,this));

		},
		submit:function(){
			if(this.getInputVal() == ''){
				return false;			
			}
			this.$searchForm.trigger('submit');
		},
		autocomplete:function(){
			//获取数据
			this.$searchInput
			.on('input',function(){
				if(this.options.getDataInterval){
					clearTimeout(this.timer);
					this.timer = setTimerout(function(){
						this.getData();
					}.bind(this),this.options.getDataInterval)
				}else{
					this.getData();
				}
			}.bind(this))
			.on('focus',$.proxy(this.showLayer,this))
			.on('click',function(ev){
				ev.stopPropagation();
			});
			$(document).on('click',$.proxy(this.hideLayer,this));
			this.$searchLayer.showHide(this.options);
		},
		getData:function(){
			var inputVal = this.getInputVal();
			if(inputVal == ''){
				return false;
			}
			if(cache.readData(inputVal)){
				this.$elem.trigger('getData',[cache.readData(inputVal)]);
				return;
			}
			//终止上一次发送未完成的请求
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			//获取服务器数据
			this.jqXHR = $.ajax({
				url:this.options.url+inputVal,
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				cache.addData(inputVal.data);
				this.$elem.trigger('getData',[data]);
			}.bind(this))
			.fail(function(err){
				this.$elem.trigger('getNoData');
			}.bind(this))
			.always(function(){
				//清空jqXHR防止执行abort方法
				this.jqXHR = null;
			}.bind(this));
		},
		showLayer:function(){
			if(!this.isLoaded) return;
			this.$searchLayer.showHide('show');
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		appendLayer:function(html){
			this.$searchLayer.html(html);
			this.isLoaded = !!html;
		},
		setInputVal:function(val){
			this.$searchInput.val(removeHTMLTag(val));
			function removeHTMLTag(str){
				return str.replace(/<[^<|>]+>/g,'');
			}
		}
		
	};
	Search.DEFAULTS = {
		autocomplete:false,
		css3:false,
		js:false,
		mode:'slideUpDown',
		getDataInterval:200,
		url:'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1528889766600_556&k=1&area=c2c&bucketid=17&q='
	}

	$.fn.extend({
		search:function(options,val){
			return this.each(function(){
				var $this = $(this);
				var search = $this.data('search');
				if(!search){
					options = $.extend(Search.DEFAULTS,options);
					search = new Search($(this),options);
					$this.data('search',search);
				}
				if(dataType search[options] == 'function'){
					search[options](val);
				}
			});
		}
	})

})(jQuery);