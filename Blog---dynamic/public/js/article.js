(function($){
	 ClassicEditor
        .create( document.querySelector( '#editor' ),{
        	language:'zh-cn',
        	ckfinder:{
        		uploadUrl:'/admin/uploadImages'
        	}
        	
        })
        .catch( error => {
            console.error( error );
        } );

       
	//用户退出
	$('#btn-sub').on('click',function(){
		// alert('aaa');
		var title = $('[name = "title"]').val();
		var intro = $('[name="intro"]').val();
		var content = $('[name="content"]').val();

		// alert(catename);
		if(title.trim() == ''){
			$('.err0').html ('标题不能为空');
			return false;
		}else{
			$('.err0').html();
		};
		if(intro.trim() == ''){
			$('.err1').html ('简介不能为空');
			return false;
		}else{
			$('.err1').html();
		};
		if(content.trim() == '<p>&nbsp;</p>'){
			$('.err2').html ('内容不能为空');
			return false;
		}else{
			$('.err2').html();
		}


	});
	
})
 (jQuery)
	
