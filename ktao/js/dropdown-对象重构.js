;(function($){
	function DropDown($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.activeClass = this.$elem.data('active') + '-active';
		this.$layer = this.$elem.find('.dropdown-layer');
		this.$layer.showHide(this.options);
		this.$layer.on('show shown hide hidden',function(ev){
			// console.log(ev.type);
			this.$elem.trigger('dropdown-'+ev.type);
		}.bind(this));
		if(this.options.eventName == 'click'){
			this.$elem.on('click',function(ev){
				ev.stopPropagation();
				this.show();
			}.bind(this));
			$(document).on('click',$.proxy(this.hide,this));
		}else{
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
		}
		// this.$elem.hover(this.show.bind(this),this.hide.bind(this));
		this.timer =null;
	};
	DropDown.prototype = {
		constructor:DropDown,
		show:function(){
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);
				}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);
			}
			
		},
		hide:function(){
			if(this.options.delay){
				clearTimeout(this.timer);
			}
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}

	};
	DropDown.DEFAULTS = {
		css3 : false,

		js : true,
		mode : 'slideUpDown',
		delay:200,
		eventName : 'hover',
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				//基本实现
				// var $this =$(this);
				// var activeClass = $this.data('active')+'-active';
				// console.log("1243",activeClass);
				// var $layer =$this.find('.dropdown-layer');
				// //初始化显示隐藏模块
				// $layer.showHide({
				// 	css3:true,
				// 	js:true,
				// 	mode:'slideUpDown'
				// });
				// $this.hover(function(){
				// 	$layer.showHide('show');
				// 	$this.addClass(activeClass);
				// },function(){
				// 	//隐藏下拉层
				// 	$layer.showHide('hide');
				// 	$this.removeClass(activeClass);
				// 	console.log('bye');});
				var $this = $(this);
				var dropdown = $this.data('dropdown');
				if(!dropdown){
					options = $.extend(DropDown.DEFAULTS,options);
					dropdown = new DropDown($(this),options);
					$this.data('dropdown',dropdown);
				}
				if(typeof dropdown[options] == 'function'){
					dropdown[options]();
				}
				
			});
		}
	})
})(jQuery);