(function ($) {
	$('#layout').on('click',function(){
			$.ajax({
			url:"/admin/layout",
			dataType:'json',
			type:'get'
		}).done(function(result){
			if(result.code == 0){
				// window.location.reload();
				 window.location.href = '/';

			}
		})
		.fail(function(err){
			console.log(err)
		})		
	})
})(jQuery)