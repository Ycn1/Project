;(function($){
	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$floorItems = this.$elem.find('.floor-item-con');
		this.itemNum = this.$floorItems.length;
		this.$tabPanels = this.$elem.find('.floor-item-bd-item');
		this.now = this._getCorrectIndex(options.activeIndex);
		this._init();
	}
	Tab.prototype  = {
		constructor:Tab,
		_init:function(){
			var self = this;
			var timer = null;
			this.$tabPanels.showHide(this.optionds);

			this.$floorItems.eq(this.now).addClass('floor-Item-active');
			// console.log(this.$floorItems);
			this.$tabPanels.eq(this.now).showHide('show');
			// this.$elem.trigger('tab-show',[this.$tabPanels[this.now](this),this]);
			this.$elem.trigger('tab-show',[this.now,this.$tabPanels[this.now]]);
			this.$tabPanels.on('show shown hide hidden',function(ev){
				self.$elem.trigger('tab-'+ev.type,[self.$tabPanels.index(this),this]);
			});
			//绑定事件
			var eventName = this.options.eventName == 'click' ? 'click': 'mouseenter';

			//初始化showhide
			this.$elem.on(eventName,'.floor-item-con',function(){
				var index = self.$floorItems.index(this);
				if(self.options.delay){
					clearTimeout(timer);
					timer = setTimeout(function(){
						self.toggle(index);
					},self.options.delay)
				}else{
					self.toggle(index);
				}

			});
			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));
			}
		},
		toggle:function(index){
			if(this.now == index) return;
			//隐藏当前的
			
			this.$floorItems.eq(this.now).removeClass('floor-Item-active');
			this.$tabPanels.eq(this.now).showHide('hide');
			//显示index对应的
			this.$floorItems.eq(index).addClass('floor-Item-active');
			this.$tabPanels.eq(index).showHide('show');
			this.now = index;
		},
		auto(){
			var self = this;
			this.autotimer = null;
			this.autotimer = setInterval(function(){
				self.toggle(self._getCorrectIndex(self.now+1));
			},this.options.interval)
		},
		pause(){
			clearInterval(this.autotimer);
		},
		_getCorrectIndex(index){
			if(index >= this.itemNum) return 0;
			if(index <0) return (this.itemNum -1);
			return index;
		}
	}
	Tab.DEFAULTS = {
		css3:true,
		js:false,
		mode:'fade',
		activeIndex:1,
		interval:4000,
		delay:200,
		eventName:'mouseenter'
	}
	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				var $this = $(this);
				var tab = $this.data('tab');
				if(!tab){//单例模式
					options  = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($(this),options);
					$this.data('tab',tab);
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}
			});
		}
	})

})(jQuery);