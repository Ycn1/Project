;(function($){
	function DropDown($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.activeClass = this.$elem.data('active') + 'active';
		this.$layer = this.$elem.find('.dropdown-layer');
		this.$layer.showHide(this.options);
		this.$elem.hover(this.show.bind(this),this.hide.bind(this));
	};
	DropDown.prototype = {
		constructor:DropDown,
		show:function(){
			this.$layer.showHide('show');
			this.$elem.addClass(this.activeClass);
		},
		hide:function(){
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}

	};
	DropDown.DEFAULTS = {
		css3 : false,

		js : true,
		mode : 'slideUpDown' 
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
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
				options = $.extend(DropDown.DEFAULTS,options);
				new DropDown($(this),options)
				
			});
		}
	})
})(jQuery);