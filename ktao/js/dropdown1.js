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
		this.$elem.hover(this.show.bind(this),this.hide.bind(this));
	}
	DropDown.prototype = {
		constructor:DropDown,
		show:function(){
			this.$layer.showHide('show');
			this.$elem.addClass(this.activeClass);
		}
		hide:function(){
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	};
	DropDrown.DEFAULT = {
		css3:false,
		js:true,
		mode:'slideUpDown'
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