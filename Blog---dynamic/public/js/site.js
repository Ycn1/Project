(function($){
	
	$('.btn-remove').on('click',function(){
		// $('.btn-remove').parentNode.remove();
		$(this.parentNode).remove();
	});

	$('.btn-add').on('click',function(){
		var $this = $(this);
		var $dom = $this.siblings().eq(0).clone(true);

		// console.log($this.siblings().eq(0))
		$(this.parentNode).append($dom);
		// console.log($($dom.parentNode));
		$dom.find('[type="text"]').val('');

	}); 
	
})(jQuery);