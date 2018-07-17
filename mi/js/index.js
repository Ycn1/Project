	handleCart();
	handleNav();
	handleSearch();
	handleCarousel();
	handleCate();
	handleTimer();
	handleFlash();
	handleElec();
	//购物车的动态处理效果
function handleCart(){
	var oCartBox = document.querySelector('.Cart');
	console.log(oCartBox);
	var oCart = document.querySelector('.cart');
	var oCartA= oCart.getElementsByTagName('a')[0];
	var oCartContent = document.querySelector('.cart-content');
	var oLoading = document.querySelector('.loader');
	var oEmptyContent = document.querySelector('.empty-content');
	oCartBox.onmouseenter = function(){
		//改变购物车背景和字体颜色
		oCart.style.background='#fff';
		oCartContent.style.background='#fff';
		oCartA.style.color='#ff6700';
		oCartContent.style.display='block';
		oLoading.style.display='block';
		oEmptyContent.style.display='block';
		animation(oCartContent,{height:100},false,function(){
			oLoading.style.display='none';
		});
	}
	oCartBox.onmouseleave = function(){
		oCartContent.style.display='none';
		oCart.style.background=' #424242';
		oCartA.style.color='#fff';
	}
}
function handleNav (){
	var oNavContent = document.querySelector('.nav-content');
	var oNavA = document.querySelectorAll('.header .nav a');
	var oNavUl= oNavContent.getElementsByTagName('ul')[0];
	var oLoader = document.querySelector('.nav-content .loader')
	// console.log(oNavA)
	for(var i=0;i<oNavA.length-2;i++){
		var timer = null;
		oNavA[i].index =i;
		oNavA[i].onmouseenter= function(){
			oNavUl.innerHTML='';
			console.log(oNavContent)
			oNavContent.style.borderTop='1px solid #ccc';
			animation(oNavContent,{height:220});
			oLoader.style.display='block';
			var index = this.index;
			setTimeout(function(){
				loadData(index);
				oLoader.style.display='none';
			},1000)
		}
		oNavA[i].onmouseleave = function(){
			timer =setTimeout(function(){
				oNavContent.style.borderTop='none';
				animation(oNavContent,{height:0});
			},500);
			oLoader.style.display='none';
		}
		oNavContent.onmouseenter = function(){
			clearTimeout(timer);
			oLoader.style.display='none';
		}
		oNavContent.onmouseleave = function(){
			timer =setTimeout(function(){
				oNavContent.style.borderTop='none';
				animation(oNavContent,{height:0});
			},500);
			oLoader.style.display='none';
		}
	}
	/*
	<div class="img-box"> <img src="images/小图片.png" alt=""></div>
						<p class="product-name">小米手机MIX</p>
						<p class="product-price">3299元起</p>
						<span class="tag">热门</span>
*/
function loadData (index){
		var aDatas =aNavItems[index];
		oNavUl.innerHTML='';
		for(var i=0;i<aDatas.length;i++){
			var oLi = document.createElement('li');
			var oDiv = document.createElement('div');
			oDiv.className='img-box';
			var oImg = document.createElement('img');
			oImg.src = aDatas[i].img;
			var oP1 = document.createElement('p');
			var oP2 = document.createElement('p');
			oP1.className='product-name';
			oP1.innerHTML=aDatas[i].name;
			oP2.className='product-price';
			oP2.innerHTML=aDatas[i].price +'元起';
			if(aDatas[i].tag){
				var oSpan = document.createElement('span');
				oSpan.className='tag';
				oSpan.innerHTML=aDatas[i].tag;
				oLi.appendChild(oSpan);
			}
			oLi.appendChild(oDiv);
			oDiv.appendChild(oImg);
			oLi.appendChild(oP1);
			oLi.appendChild(oP2);
			oP1.innerHTML=aDatas[i].price;
			oNavUl.appendChild(oLi);
		}
	}
}
function handleSearch(){
	var oInputer = document.querySelector('.search .inputer input');
	var oSearchBtn = document.querySelector('.search-btn');
	var oList  = document.querySelector('.list');
	var oInputerA = document.querySelectorAll('.search .inputer a');
	oInputer.onfocus = function(){
		console.log(oInputer);
		oInputer.style.borderColor='#ff6700';
		oList.style.display='block';
		oSearchBtn.style.borderColor='#ff6700';
		for(var i=0;i<oInputerA.length;i++){
			oInputerA[i].style.display='none';
		}
	}
	oInputer.onblur = function(){
		console.log(oInputer);
		oInputer.style.borderColor='#e0e0e0';
		oList.style.display='none';
		oSearchBtn.style.borderColor='#e0e0e0';
		for(var i=0;i<oInputerA.length;i++){
			oInputerA[i].style.display='block';
		}
	}
}
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:[
			'images/b1.jpg',
			'images/b2.jpg',
			'images/b3.jpg',
			'images/b1.jpg',
			'images/b2.jpg'
		],
		width:1226,
		height:460,
		playDuration:3000		
	})
}
function handleCate(){
	var oCate = document.querySelector('.hot .cate');
	var oCateA = document.querySelectorAll('.hot .cate  li a'); 
	var oCateContent = document.querySelector('.hot  .cate-content');
	var oCateUl = oCateContent.getElementsByTagName('ul')[0];
	var timer =null;

	for(var i=0;i<oCateA.length;i++){
		oCateA[i].index =i;
		oCateA[i].onmouseenter = function(){
			for (var j=0;j<oCateA.length;j++){
				oCateA[j].className='';
			}
			oCateContent.style.display='block';
			loadData(this.index);
			this.className='active';
		}
	}
	oCate.onmouseleave = function(){
		timer = setTimeout(function(){
			for(var i =0;i<oCateA.length;i++){
				oCateA[i].className='';
			}
			oCateContent.style.display='none';
		},500)
		
		
	}
	oCateContent.onmouseenter = function(){
			clearTimeout(timer);
	}
	oCateContent.onmouseleave = function(){
		timer = setTimeout(function(){
			for(var i =0;i<oCateA.length;i++){
				oCateA[i].className='';
			}
			oCateContent.style.display='none';
		},500)
	}
	function loadData(index){
			console.log(oCateUl);
				oCateUl.innerHTML='';
				var datas = aCateItems[index];
				if(!datas){
					return;
				}
				for(var i=0;i<datas.length;i++){
					var oLi= document.createElement('li');
					var oImg = document.createElement('img');
					var oA =document.createElement('a');
					oImg.src=datas[i].img;
					oA.innerHTML=datas[i].name;
					oLi.appendChild(oImg);
					oLi.appendChild(oA);
					oCateUl.appendChild(oLi);
				}
		}
}
function handleTimer(){
	var timer =null;
	var oBox = document.querySelectorAll('.hot .flash .box-bd .timer-box .timer .box');
	//获取未来时间
	var nextDate =new Date('2018/05/20 12:00:00');
	//获取当时时间
	function toStr(num){
		if(num<10){
			return num = '0' + num;
		}
		else{
			return num =''+num;
		}
	}
	timer =setInterval(time,500)
	function time(){
			
			var now =new Date();
			var allTime =parseInt((nextDate.getTime()-now.getTime())/1000);
			if(allTime<0){
				clearInterval(timer);
			}
			var h =parseInt(allTime/3600)
			var m = parseInt((allTime%3600)/60);
			var s = (allTime%3600)%60;
			oBox[0].innerHTML=toStr(h);
			oBox[1].innerHTML=toStr(m);
			oBox[2].innerHTML=toStr(s);
		
	}
	time();
}
function handleFlash(){
	var aSpan =document.querySelectorAll('.hot .flash .box-hd .more span');
	var oUl =document.querySelector('.hot .flash .box-bd .product-list ul');
	aSpan[1].onclick = function(){
		//animation(oUl,{marginLeft:-978});
		oUl.style.marginLeft='-978px';
		this.className='';
		aSpan[0].className='class1';
	}
	aSpan[0].onclick=function(){
		oUl.style.marginLeft='0px';
		this.className='';
		aSpan[1].className='class1';
	}

}
/*
function handleElec(){
	var aA= document.querySelectorAll('.main .elec .more ul li a');
	var oUl=document.querySelector('.main .elec .box-bd ul');
	loadData(1);
	for(var i=0;i<aA.length;i++){
		aA[i].index =i;
		aA[i].onmouseenter = function(){
			for(var j=0;j<aA.length;j++){
				aA[j].className='';
			}
			loadData(this.index)
			aA[this.index].className='active';
		}
	}
	function loadData(index){
		console.log(oUl);
		var datas = aElecItems[index];
		if(!datas){
			return;
		}
		var sHtml='';
		for(var i=0;i<datas.length;i++){
			sHtml +=  '<li class="col1';
			if(datas[i].tag){
				sHtml += ' flag '+datas[i].tag+'">';
			}else{
				sHtml += '">';
			}
			sHtml += '<a href="#"><div class="img-box"><img src="'+datas[i].img+'" alt=""></div>';
			sHtml += '<p class="intro">' + datas[i].intro + '</p><p class="desc">';
			sHtml += 'Unibody 全陶瓷</p><p class="price"><span>'+datas[i].price+'元</span></p>';
			
			if(datas[i].recomm){
				sHtml += '	<div class="view"><p class="recomm">'+datas[i].recomm+'</p>';
				if(datas[i].author){
					sHtml += '<p class="author">来自于'+ datas[i].author+' 的评论</p>';
				}
				sHtml += '</div>'
			}
			sHtml += '</a></li>'
		}
		var lastData = datas[datas.length-1];
		sHtml += '<li class="col1"><div class="top"><div class="top-left"><p class="desc">';
		sHtml += lastData.top.desc+'</p><p class="price">'+lastData.top.price+'元</p>';
		sHtml += '</div><div class="top-right"><img src="'+lastData.top.img+'" alt=""></div></div>';
		sHtml += '<div class="bottom"><div class="bottom-left"><p class="desc">'+lastData.bottom.desc+'</p>';
		sHtml += '<p class="more">'+lastData.bottom.more+'</p></div><div class="bottom-right"><i class="iconfont">';
		sHtml += lastData.bottom.iconfont + '</i></div></div></li>	'

		oUl.innerHTML = sHtml;
	}
	loadData(1);
}*/
function handleElec(){
	var aA = document.querySelectorAll('.elec .box-hd li a');
	var oUl = document.querySelector('.elec .box-bd .list');
	loadData(0);
	for(var i = 0;i<aA.length;i++){
		aA[i].index = i;
		aA[i].onmouseenter = function(){
			for(var j = 0;j<aA.length;j++){
				aA[j].className = '';
			}
			this.className = 'active';
			loadData(this.index);
		}
	}

	function loadData(index){
		oUl.innerHTML = '';
		var datas = aElecItems[index];
		if(!datas){
			return;
		}
		var sHtml = '';
		for(var i=0;i<datas.length-1;i++){
			sHtml +=  '<li class="col1';
			if(datas[i].tag){
				sHtml += ' flag '+datas[i].tag+'">';
			}else{
				sHtml += '">';
			}
			sHtml += '<a href="#"><div class="img-box"><img src="'+datas[i].img+'" alt=""></div>';
			sHtml += '<p class="intro">' + datas[i].intro + '</p><p class="desc">';
			sHtml += 'Unibody 全陶瓷</p><p class="price"><span>'+datas[i].price+'元</span></p>';
			
			if(datas[i].recomm){
				sHtml += '	<div class="view"><p class="recomm">'+datas[i].recomm+'</p>';
				if(datas[i].author){
					sHtml += '<p class="author">来自于'+ datas[i].author+' 的评论</p>';
				}
				sHtml += '</div>'
			}
			sHtml += '</a></li>'
		}
		var lastData = datas[datas.length-1];
		sHtml += '<li class="col1"><div class="top"><div class="top-left"><p class="desc">';
		sHtml += lastData.top.desc+'</p><p class="price">'+lastData.top.price+'元</p>';
		sHtml += '</div><div class="top-right"><img src="'+lastData.top.img+'" alt=""></div></div>';
		sHtml += '<div class="bottom"><div class="bottom-left"><p class="desc">'+lastData.bottom.desc+'</p>';
		sHtml += '<p class="more">'+lastData.bottom.more+'</p></div><div class="bottom-right"><i class="iconfont">';
		sHtml += lastData.bottom.iconfont + '</i></div></div></li>	'

		oUl.innerHTML = sHtml;
	}
}