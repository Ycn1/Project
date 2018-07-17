;(function($){
	function Carousel($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$carouselItems = this.$elem.find('.carousel-item');
		this.itemNum = this.$carouselItems.length;
		this.$btns = $elem.find('.bottom-item');
		this.$arrowBtns = $elem.find('.arrowBtn');
		this.now = this._getCorrectIndex(options.activeIndex);
		this._init();
		/*if(options.interval){
			this.auto();
			var self = this;
			this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));
		}*/
	}
	Carousel.prototype  = {
		constructor:Carousel,
		_init:function(){
			var self = this;
			this.$elem.trigger('carousel-show',[this.now,this.$carouselItems[this.now]]);
			// this.$carouselItems.eq(this.now).show();
			// this.$btns.eq(this.now).addClass('active');
			if(this.options.mode === 'slide'){
				//划入划出
				this.$carouselItems.on('move moved',function(ev){
					var index = self.$carouselItems.index(this);
					// console.log(this);
					// console.log(ev.type)
					if(ev.type == 'move'){
						if(index == self.now){
							self.$elem.trigger('carousel-hide',[index,this]);
						}else{
							self.$elem.trigger('carousel-show',[index,this]);
						}
					}else if(ev.type == 'moved'){
						if(index == self.now){
							self.$elem.trigger('carousel-shown',[index,this]);
						}else{
							self.$elem.trigger('carousel-hidden',[index,this]);
						}
					}
				});
				this.$elem.addClass('slide');;
				this.$carouselItems.eq(this.now).css({left:0});
				this.itemsWidth = this.$carouselItems.eq(0).width();
				//初始化插件
				this.$carouselItems.move(this.options);
				this.transitionClass = this.$carouselItems.eq(this.now).hasClass('transition') ? 'transition' : '';
				this.$btns.eq(this.now).addClass('active');
				
				this.tab = this._slide;
			}else{
				//淡入淡出
				this.$carouselItems.on('show shown hide hidden',function(ev){
					self.$elem.trigger('carousel-'+ev.type,[self.$carouselItems.index(this),this]);
					console.log("carousel-"+ev.type,[self.$carouselItems.index(this),this]);
				})
				this.$elem.addClass('fade');
				this.$carouselItems.eq(this.now).show();
				console.log(this.$carouselItems);
				this.$carouselItems.showHide(this.options);
				this.$btns.eq(this.now).addClass('active');

				this.tab = this._fade;
			}
			this.$elem
			.hover(function(){
				self.$arrowBtns.show();
			},function(){
				self.$arrowBtns.hide();
			})
			.on('click','.btn-left',function(){
				self.tab(self._getCorrectIndex(self.now-1),-1);
			})
			.on('click','.btn-right',function(){
				self.tab(self._getCorrectIndex(self.now+1),1);
			});
			this.$btns.on('click',function(){
				self.tab(self.$btns.index($(this)));
			});
			if(this.options.interval){

				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));
			}
		},
		_fade(index){
			if(this.now == index) return;

			this.$carouselItems.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			this.$carouselItems.eq(index).showHide('show');
			this.$btns.eq(index).addClass('active');

			this.now = index;
		},
		_slide(index,direcion){
			if(this.now == index) return;
			//index代表将要划入的索引
			//this.now代表当前的
			//direction 左划,方向是1,右划,方向是-1

			//确定方向
			if(!direcion){
				if(index > this.now){
					direcion = 1;
				}else{
					direcion = -1;
				}				
			}

			//让将要划入的放到指定位置
			this.$carouselItems.eq(index).removeClass(this.transitionClass).css({left:direcion * this.itemsWidth});
			
			setTimeout(function(){
				//让当前的的划出
				this.$carouselItems.eq(this.now).move('x',-1 * direcion * this.itemsWidth)
				//让指定的划入
				this.$carouselItems.eq(index).addClass(this.transitionClass).move('x',0);
				this.now = index;
			}.bind(this),20);

			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');		
		},
		auto(){
			var self = this;
			this.timer = null;
			this.timer = setInterval(function(){
				self.tab(self._getCorrectIndex(self.now+1),1);
			},this.options.interval)
		},
		pause(){
			clearInterval(this.timer);
		},
		_getCorrectIndex(index){
			if(index >= this.itemNum) return 0;
			if(index <0) return (this.itemNum -1);
			return index;
		}
	}
	Carousel.DEFAULTS = {
		css3:true,
		js:false,
		mode:'fade',
		activeIndex:1,
		interval:0
	}
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $this = $(this);
				var carousel = $this.data('carousel');
				if(!carousel){
					options = $.extend(Carousel.DEFAULTS,options);
					carousel = new Carousel($(this),options);
					$this.data('carousel',Carousel);
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]();
				}
			});
		}
	})
})(jQuery)