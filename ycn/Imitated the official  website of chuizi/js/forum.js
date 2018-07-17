handleCarousel();
handleDiscuss();
handleNav();

function handleCarousel(){
	console.log("123")
	new Carousel({
		id:'carousel',
		aImg:[
			'images/image7/顶部图片.jpg',
			'images/image7/顶部图片1.png',
			'images/image7/顶部图片2.png',
			'images/image7/顶部图片3.png',
			'images/image7/顶部图片1.png'
		],
		width:1120,
		height:460,
		playDuration:3000,	

	})
};
var timer=null;
function handleNav(){
	var ltbk = document.querySelector('.nav-con .navltbk');
	console.log(ltbk);
	var ltbknr = document.querySelector('.ltbk');
	ltbk.onmouseenter= function(){
		clearTimeout(timer);
		ltbknr.style.display='block';
	}
	ltbknr.onmouseenter = function(){
		clearTimeout(timer);
		ltbknr.style.display='block';
	}
	ltbknr.onmouseleave = function(){
		timer=setTimeout(function(){
			ltbknr.style.display='none';
		},500)
	}
	ltbk.onmouseleave= function(){
		timer=setTimeout(function(){
			ltbknr.style.display='none';
		},2000)
		
	}
}

function handleDiscuss(){
	var oLi =document.querySelectorAll('.dis-foot li ');
	console.log(oLi);
	var oA = document.querySelectorAll('.dis-foot li a');
	console.log(oA);
	var oUl = document.querySelector('.discuss .dis-bd');
	loadData(1);
	for(var i=0;i<oA.length;i++){
		oA[i].index=i;
		oA[i].onclick = function(){
			for(var j=0;j<oA.length;j++){
				oLi[j].className='dis-li-2';
				oA[j].className='';
				console.log("ycn");
			}
			loadData(this.index);
			oLi[this.index].className='dis-li-2 act';
			oA[this.index].className='act2';
		}
	}
	function loadData(index){
		oUl.innerHTML='';
		var datas = disData[index];
		if(!datas){
			return;
		}
		for(var i=0;i<datas.length;i++){
			
			var oLi = document.createElement('li');
			oLi.className='dis1';
			var oDiv1 = document.createElement('div');
			var oDiv1A = document.createElement('a');
			var oDiv1AImg = document.createElement('img');
			oDiv1AImg.src=datas[i].img1;
			oDiv1A.appendChild(oDiv1AImg);
			oDiv1.appendChild(oDiv1A);
			var oDiv1Div = document.createElement('div');
			oDiv1Div.className='portrait-level';
			var oDiv1DivImg = document.createElement('img');
			oDiv1DivImg.src=datas[i].img2;
			oDiv1Div.appendChild(oDiv1DivImg);
			oDiv1.appendChild(oDiv1Div);
			
			oDiv1.className='portrait';
			var oDiv2 = document.createElement('div');
			var oDiv2A = document.createElement('a');
			var oDiv2AImg = document.createElement('img');
			oDiv2AImg.src=datas[i].img3;
			console.log(oDiv2AImg);
			oDiv2A.innerHTML ='【开箱】漂亮的不像实力派-坚果 3 开箱&nbsp;&nbsp;';
			oDiv2A.appendChild(oDiv2AImg);
			oDiv2.appendChild(oDiv2A);
			var oDiv2Ul = document.createElement('ul');
			var oDiv2UlLi1 = document.createElement('li');
			var oDiv2UlLi1A = document.createElement('a');
			oDiv2UlLi1A.innerHTML='肥皂hennan&nbsp;&nbsp;|&nbsp;&nbsp;';
			oDiv2UlLi1.appendChild(oDiv2UlLi1A);
			oDiv2Ul.appendChild(oDiv2UlLi1);
			var oDiv2UlLi2 = document.createElement('li');
			var oDiv2UlLi2Span = document.createElement('span');
			oDiv2UlLi2Span.innerHTML='发表于2018-40-10 22：25：00';
			oDiv2UlLi2.appendChild(oDiv2UlLi2Span);
			oDiv2Ul.appendChild(oDiv2UlLi2);
			oDiv2.appendChild(oDiv2Ul);
			oDiv2.className='con';
			var oDiv3 = document.createElement('div');
			var oDiv3Ul = document.createElement('ul');
			oDiv3Ul.className='dis-pw';
			var oDiv3UlLi1 = document.createElement('li');
			oDiv3UlLi1.className='p1';
			var oDiv3UlLi1Img = document.createElement('img');
			oDiv3UlLi1Img.src=datas[i].img4;
			// oDiv3UlLi1.appendChild(oDiv3UlLi1Img);
			var oDiv3UlLi1ImgSpan = document.createElement('span');
			oDiv3UlLi1ImgSpan.innerHTML='&nbsp; 133';
			// oDiv3UlLi1.innerHTML=oDiv3UlLi1Img+oDiv3UlLi1ImgSpan;
			oDiv3UlLi1.appendChild(oDiv3UlLi1Img);
			oDiv3UlLi1.appendChild(oDiv3UlLi1ImgSpan);
			oDiv3Ul.appendChild(oDiv3UlLi1);
			var oDiv3UlLi2  = document.createElement('li');
			oDiv3UlLi2.className='watch1';
			var oDiv3UlLi2Img = document.createElement('img');
			oDiv3UlLi2Img.src=datas[i].img5;
			var oDiv3UlLi2Span = document.createElement('span');
			oDiv3UlLi2Span.innerHTML='&nbsp;19634';
			// oDiv3UlLi2.innerHTML=oDiv3UlLi2Img+oDiv3UlLi2Span;
			oDiv3UlLi2.appendChild(oDiv3UlLi2Img);
			oDiv3UlLi2.appendChild(oDiv3UlLi2Span);
			oDiv3Ul.appendChild(oDiv3UlLi2);
			oDiv3.appendChild(oDiv3Ul);
			oDiv3.className='ft';
			oLi.appendChild(oDiv1);
			oLi.appendChild(oDiv2);
			oLi.appendChild(oDiv3);
			console.log('nannan');
			oUl.appendChild(oLi);
		}
	}

}
