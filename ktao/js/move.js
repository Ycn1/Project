;(function($){
	function init($elem){
			this.$elem =$elem;
			this.currentX = parseFloat(this.$elem.css('left'));
			this.currentY = parseFloat(this.$elem.css('top'));
		}
		function to(x,y,callBack){
			x = (typeof x == 'number') ? x:this.currentX;
			y = (typeof y == 'number') ? y:this.currentY;
			if( this.currentX == x &&  this.currentY == y) return;
			this.$elem.trigger('move');
			if(typeof callBack == 'function') callBack();
			this.currentX = x;
			this.currentY = y;
		}
		function Slient($elem){
			init.call(this,$elem);
			this.$elem.removeClass('transition');
		}
		Slient.prototype = {
			constructor:Slient,
			to:function(x,y){
				var self = this;
				to.call(this,x,y,function(){
					self.$elem.css({
						top:y,
						left:x
					});
					self.$elem.trigger('moved');
				});

				},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(null,y);
			}
		}
		function Css3($elem){
			init.call(this,$elem);
			this.$elem.addClass('transition');
			this.$elem.css({
				left:this.currentX,
				top:this.currentY
			});

		}
		Css3.prototype = {
			constructor:Css3,
			to:function(x,y){
				var self = this;
				to.call(this,x,y,function(){
					self.$elem
					.off(kuazhu.transition.end)
					.one(kuazhu.transition.end,function(){
						self.$elem.trigger('moved');
					});
					self.$elem.css({
						top:y,
						left:x

					});
				})

				},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(null,y);
			}
		}
		function Js($elem){
			init.call(this,$elem);
			this.$elem.removeClass('transition');
		}
		Js.prototype = {
			constructor:Js,
			to:function(x,y){
				var self = this;
				to.call(this,x,y,function(){
					self.$elem
					.stop()
					.animate({
						left:x,
						top:y
					},function(){
						self.$elem.trigger('moved')
					})
				})
				
				},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(null,y);
			}
		}
		
		var mode = null;
		function move($elem,options){
			if(options.css3 && kuazhu.transition.isSupport){
				mode = new  Css3($elem);
			}else if(options.js){
				mode = new Js($elem);
			}
			else{
				mode = new Slient($elem);
			}
			return {
				to:$.proxy(mode.to,mode),
				x:$.proxy(mode.x,mode),
				y:$.proxy(mode.y,mode)
			}
		}
		var Default = {
			css3:false,
			js:true
		}
		$.fn.extend({
			move:function(options,x,y){
				
				this.each(function(){
				var $elem = $(this);
				var moveMode = $elem.data('moveMode');//undefined/obj
				//单例模式
				if(!moveMode){
					options = $.extend(Default,options);
					moveMode = move($elem,options);
					$elem.data('moveMode',moveMode);
				}
				if(typeof moveMode[options] == 'function'){
					//注意，此处要不执行显示隐藏的元素jquery对象传递
					moveMode[options](x,y);
				}
			});
				return this;
			},			
		})
})(jQuery);