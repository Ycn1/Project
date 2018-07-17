// $(function(){
// 	$('.dropdown').hover(function(){
// 		var $this = jQuery(this);
// 		$('.dropdown').addClass('dropdown-active');
// 		console.log($this.data('active'));

// 	},function(){
// 		$('.dropdown').removeClass('dropdown-active');
// 	})
// })
;(function($){
	$.fn.extend({
		var $this = $(this);
		return $this.each(function(){
		var $layer = $this.find('.dropdown-layer')		
			$('.dropdown-layer').showHide({
					css3:true,
					js:false,
					mode:'slideUpDown'		
				});
			
			$('.dropdown').hover(function(){
				$('.dropdown-layer').show();
				$('.dropdown').addClass('dropdown-active');
			},function(){
				$('.dropdown').removeClass('dropdown-active');
				$('.dropdown-layer').hide();
			})
		})
	})
})(jQuery)
;(function($){
	function DropDown($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.activeClass = this.$elem.data('active') +'-active';
		this.$layer = this.$elem.find('.dropdown-layer');
		// if(this.options.eventName)		
		// this.$elem.hover(this.show.bind(this),this.hide.bind(this));
		this._init();
	}
	DropDown.prototype = {
		constructor:DropDown,
		_init:function(){
			this.$elem.showHide(this.options);
			this.$layer.on('show shown hide hiden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);
			}.bind(this));
			if(this.options.eventName == 'click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				}.bind(this));
				$(document).on('click',$.proxy(this.hide,this));
			}else{
				this.$elem.hover($.proxy(this.show,this),$proxy(this.hide,this));
			}
			
		},
		show:function(){
			if(this.options.delay){
				this.timer=setTimeout(function(){
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);
					}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);
			}
			
		}
		hide:function(){
			if(this.options.delay){
				clearTimeout(this.timer);
			}
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	};
	DropDrown.DEFAULT = {
		css3:false,
		js:true,
		mode:'slideUpDown',
		eventName:'click',
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				options = $.extend(DropDown.DEFAULT,options);
				new DropDown($(this),options);
			})
		}
	})
})(jQuery)