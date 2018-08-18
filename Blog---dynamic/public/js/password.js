(function($){
	var $repaForm = $('#repasswordForm');
	
	$('#btn-sub').on('click',function(){
		
		var password = $repaForm.find("[name='password']").val();
		var repassword = $repaForm.find("[name='repassword']").val();

		
		if (password == '' ){
			$('.err').eq(0).html( '密码不能为空');
			return false;
		}
		else if(!/^\w{3,9}$/.test(password)){
			$('.err').eq(0).html( '密码需要3-9个字符');
			return false ;
		}
		else if(password != repassword){
			$('.err').eq(1).html( '两次密码不一致');
			return false;
			
		}
	})




})(jQuery);