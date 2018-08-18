(function($){
	//用户退出
	$('#btn-sub').on('click',function(){
		// alert('aaa');
		var catename = $('[name = "name"]').val();
		// alert(catename);
		if(catename.trim() == ''){
			$('.err').html ('分类名称不能为空');
			return false;
		}else{
			$('.err').html();
		}


	});
	
})(jQuery);