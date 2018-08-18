(function($){

	var $register = $('#register');
	var $Login = $('#Login');

	$('#go-login').on('click',function(){
		$Login.show();
		$register.hide();
	});
	$('#go-register').on('click',function(){
		$Login.hide();
		 $register.show();
	});	
	$('#goregister').on('click',function(){
		var username = $register.find("[name='username']").val();
		var password = $register.find("[name='password']").val();
		var repassword = $register.find("[name='repassword']").val();

		var errMag = '';
		if(!/^[a-z][a-z|0-9|_]{3,9}$/i.test(username
			)){
			errMag='用户名密码必须是字母开头包含数组下划线4-10个字符';
		}
		else if(!/^\w{3,9}$/.test(password)){
			errMag = '密码需要3-9个字符'
		}
		else if(password != repassword){
			errMag = '两次密码不一致'
		}

		if(errMag){
			$('#register .err').html(errMag);
			return;
		}else{
			$.ajax({
				url:'/user/register/',
				data:{
					username:username,
					password:password,

				},
				type:"POST",
				dataType:'json'
			})
			.done(function(result){
				// console.log(result);
				if(result.code === 10){
					$('#register .err').html(result.message);
				}else{
					$('#go-login').trigger('click');
				}
			})
			.fail((err)=>{
				console.log(err);
			})
		}
	})
	//验证登录

	$('#login').on('click',function(){
		
		var username = $Login.find("[name='username']").val();
		var password = $Login.find("[name='password']").val();
		

		var errMag = '';

		if(!/^[a-z][a-z|0-9|_]{3,9}$/i.test(username
			)){
			errMag='用户名密码必须是字母开头包含数组下划线4-10个字符';
		}
		else if(!/^\w{3,9}$/.test(password)){
			errMag = '密码需要3-9个字符';
		}

		if(errMag){
			$('#register .err').html(errMag);
			return;
		}else{
			
			$.ajax({
				url:'/user/login/',
				data:{
					username:username,
					password:password
				},
				type:"POST",
				dataType:'json'
			})
			.done(function(result){
				// console.log(result);
				if(result.code === 10){
					$('#register .err').html(result.message);
				}else{
					// 
					 // $Login.hide();
					 // $('#login-pannel').show();alert("aaa");
					window.location.reload();
				}
			})
			.fail((err)=>{
				console.log(err);
			})
		}
	});
	$('#logout').on('click',function(){
		$.ajax({
			url:"/user/logout",
			dataType:'json',
			type:'get'
		})
		.done(function(result){
			if(result.code == 0){
				window.location.reload();
			}
		})
		.fail(function(err){
			console.log(err)
		})		
	});
	

	 $('#page').on('click','a',function(){
	 	var $this = $(this);

	 	var page = 1;
	 	var currentPage = $('#page').find('.active a').html();
	 	if($this.attr('aria-label') == 'Previous'){//上一页
	 		page = currentPage - 1;
	 	}else if($this.attr('aria-label') == 'Next'){//下一页
	 		page = currentPage*1 + 1;
	 	}else{
	 		page = $(this).html();
	 	} 

	 	$.ajax({
	 		url:'/articles?page='+page,
	 		type:'get',
	 		dataType:'json'
	 	})
	 	.done(function(result){
	 		if(result.code == 0){
	 			buildArticleList(result.data.docs);
	 			// buildPage(result.data.list,result.data.page)
	 		}
	 		console.log(result)
	 	})
	 	.fail(function(){

	 	})

	 });
	  function buildArticleList(articles){
	 	var html = '';
	 	for(var i = 0;i<articles.length;i++){
	 	var data = moment(articles[i].createdAt).format('YYYY年MM月DD日 h:mm:ss ');
	 	html +=`<div class="panel panel-default content-item">
			  <div class="panel-heading">
			    <h3 class="panel-title">
			    	<a href="/view/${articles[i]._id}" class="link" target="_blank">${ articles[i].title }</a>
				</h3>
			  </div>
			  <div class="panel-body">
				${ articles[i].intro }
			  </div>
			  <div class="panel-footer">
				<span class="glyphicon glyphicon-user"></span>
				<span class="panel-footer-text text-muted">
					${ articles[i].user.username }
				</span>
				<span class="glyphicon glyphicon-th-list"></span>
				<span class="panel-footer-text text-muted">
					${ articles[i].category.name }
				</span>
				<span class="glyphicon glyphicon-time"></span>
				<span class="panel-footer-text text-muted">
					${ data }
				</span>
				<span class="glyphicon glyphicon-eye-open"></span>
				<span class="panel-footer-text text-muted">
					<em>${ articles[i].click }</em>已阅读
				</span>
			  </div>
			</div>`
		}
		$('#article-list').html(html);
	 };

	// function buildPage(list,page){
	// 	var html = '';
	// html += `<li>
 //      <a href="javascript:;" aria-label="Previous">
 //        <span aria-hidden="true">&laquo;</span>
 //      </a>
 //    </li>`;
 //    for (i in list){
 //    	if(list[i] == i){
 //    		html += `<li class="active"><a href="javascript:;">${list[i]}</a></li>`
 //    	}else{
 //    		html +=` <li><a href="javascript:;">${list[i]}</a></li>`
 //    	}
 //    }
   
 //   html += `<li>
 //      <a href="javascript:;" aria-label="Next">
 //        <span aria-hidden="true">&raquo;</span>
 //      </a>
 //    </li>`
 //    $('#page .pagination').html(html);
	// }
})(jQuery);