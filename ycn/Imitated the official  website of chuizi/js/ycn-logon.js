handleLogon();
function handleLogon(){
	var bPwd1=false;
	var bPhone = false;
	var ophone = document.querySelector(".content .main  .phone");
	console.log(ophone);
	var opassword = document.querySelector('.content .main .password');
	var ophoneli = document.querySelector('.content .main .phoneli');
	var opassli = document.querySelector('.content .main  .passli');
	var empty = document.querySelector('.content .main .empty');
	var error = document.querySelector('.content .main .error');
	var submit = document.querySelector('.content .main .submit');
	var form = document.getElementById('formid');
	console.log(error);
	ophone.onfocus = function(){
		ophoneli.style.borderColor='#739af3';
		console.log('ycn');
	}
	ophone.onblur = function(){
		ophoneli.style.borderColor='#ccc';

                    var sVal = ophone.value;
                    //合法手机号 11位数字
                    //13213368101
                    var reg1 = /^\s+$/;
                    var reg2 = /^1[35789]\d{9}$/;
                    if(sVal == ''){
						ophoneli.style.borderColor='#fb7777';
                    	animation(empty,{opacity:100});
                        // empty.style.opacity=1;
                        console.log('111');
                        sVal='';
                        bPhone = false;
                    }
                    else if(reg1.test(sVal)){
						ophoneli.style.borderColor='#fb7777';
                       animation(empty,{opacity:100});
                        bPhone = false;
                        sVal='';
                    }
                    else if(!reg2.test(sVal)){
						ophoneli.style.borderColor='#fb7777';
                        animation(empty,{opacity:100}); 
                        bPhone = false;
                        sVal='';
                    }else{
						ophoneli.style.borderColor='#ccc';
						bPhone = true;
                    }     
                }
	opassword.onfocus = function(){
		opassli.style.borderColor='#739af3';
	}
	opassword.onblur = function(){
		opassli.style.borderColor='#ccc';
		var sVal1 = opassword.value;
		 var reg1 = /^.{0,6}$/;
		 if(reg1.test(sVal1)){
			opassli.style.borderColor='#ccc';              
            bPwd1 = true;
         }else{
			opassli.style.borderColor='#fb7777';
              animation(error,{opacity:100});
              bPwd1 = false;
          }
		if(sVal1 == ''){
			opassli.style.borderColor='#fb7777';
				animation(error,{opacity:100});              
             	animation(opassli,{marginLeft:10},true,function(){
              	animation(opassli,{marginLeft:60},false,function(){
              		animation(opassli,{marginLeft:37})
              	});
              });
             bPwd1 = false;
              // error.style.opacity=1;
              console.log('111');
            }
         
	}
	submit.onclick= function(){
		if(!bPwd1 || !bPhone){
			return false;
		}
		else{
			submit.submit();
		}
	}
}