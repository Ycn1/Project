
var timer = null;
function animation(obj,opation,isLinear,fnEnd){
			clearInterval(timer);
				timer = setInterval(function(){
					var isStopAll = true;
					for(attr in opation){
					var iSpeed = null;
					var isStop = false;
					//var curr = parseFloat(obj[attr]);
					var curr = parseFloat(getComputedStyle(obj,false)[attr]);
					if(attr == 'opacity'){
						curr = Math.round(curr*100);
					}
					if(isLinear){
						if(curr > opation[attr]){
							iSpeed = -20;
						}
						else{
							iSpeed = 20}
						if(Math.abs(opation[attr] - curr) <= Math.abs (iSpeed)){
							isStop = true;
							}
							else{
								isStopAll = false;
							}
					}else{
					    iSpeed = (opation[attr] - curr)/5; 
			 			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
			 			if(!iSpeed){
							isStop =true;
							}
							else{
								isStopAll= false;
							}
						}
					
					if(isStop){
						clearInterval(obj.timer);
						if(isLinear){
							if(attr== 'opacity'){
								obj.style[attr] = opation[attr]/100;
							}else{
								obj.style[attr] =opation[attr]+'px';
							}
						}
						
					}
					else{
						if(attr== 'opacity'){
							obj.style[attr] = (curr +iSpeed)/100;
						}else{
							obj.style[attr] = (curr +iSpeed)+'px';
						}
					}
				  }
				  if(isStopAll){
					  	clearInterval(obj.timer);
					    if(fnEnd){
					    	fnEnd();
					    }
				    }
				  
				},30)
		};
// function Carousel(option){
// 	this.oBox = document.getElementById(option.id);
// 	this.oImgUl =null;
// 	this.aImg=option.aImg;
// 	this.width =option.width;
// 	this.height=option.height;
// 	this.oBottomBtn =null;
// 	this.playDuration =option.playDuration;
// 	this.now =0;
// 	this.init();
// 	this.bindEvent();
// 	if(this.playDuration){
// 		this.autoPlay();
// 	}

// }
// Carousel.prototype.init= function(){
// 	this.oBox.style.width = this.width + 'px';
// 	this.oBox.style.height = this.height + 'px';
// 	this.oBox.style.position = 'relative';
// 	this.oImgUl = document.createElement('ul');
// 	for(var i = 0;i<this.aImg.length;i++){
// 		var oLi = document.createElement('li');
// 		var oImg = document.createElement('img');
// 		oLi.style.position = 'absolute';
// 		oLi.style.top = 0;
// 		oLi.style.left = 0;
// 		if(i==0){
// 			oLi.style.opacity =1;
// 			oLi.style.zIndex=50;
// 		}
// 		else{
// 			oLi.style.opacity=0.5;
// 			oLi.style.zIndex=0;
// 		}
// 		oImg.style.width=this.width+'px';
// 		oImg.style.height =this.height+'px';
// 		oImg.src=this.aImg[i];
// 		oLi.appendChild(oImg);
// 		this.oImgUl.appendChild(oLi);
// 	}
// 	this.oBox.appendChild(this.oBottomBtn);
// 	this.oBottomBtn.style.marginLeft =- this.oBottomBtn.offsetWidth*0.5 +'px';
// 	this.oBox.appendChild(this.oImgUl);
// }
// Carousel.prototype.bindEvent= function(){
// 	this.right= function(){
// 		this.now++;
// 		if(this.now>= this.oImgUl.children.length){
// 			this.now =0;
// 		}
// 		this.tab();
// 	}.bind(this);
// 	var _self =this;
// 	for(var i=0;i<this.oBottomBtn.children.length;i++){
// 		this.oBottomBtn.children[i].index=i;
// 		this.oBottomBtn.children[i].onclick= function(){
// 			_self.now =this.index;
// 			_self.tab();
// 		}
// 	}
// }
// Carousel.prototype.tab = function(){
// 	for(var i=0;i<this.oImgUl.children.length;i++){
// 		this.oImgUl.children[i].style.zIndex=0;
// 		this.oImgUl.children[i].style.opacity=0.5;
// 		this.oBottomBtn.children[i].className='';
// 	}
// 	this.oImgUl.children[this.now].style.zIndex=50;
// 	this.oBottomBtn.children[this.now].className='active';
// 	animation(this.oImgUl.children[this.now],{opacity:100});
// }
// Carousel.prototype.autoPlay= function(){
// 	var timer =null;
// 	timer=setInterval(this.right,this.playDuration);
// 	this.oBox.onmouseover = function(){
// 		clearInterval(timer);
// 	}
// 	this.oBox.onmouseout = function(){
// 		timer=setInterval(this.right,this.playDuration);
// 	} .bind(this);
// }
function Carousel(option){
	//罗列属性
	//获取容器
	this.oBox = document.getElementById(option.id);
	this.oImgUl = null;
	this.aImg = option.aImg;
	this.width = option.width;
	this.height = option.height;
	this.leftBtn = null;
	this.rightBtn = null;
	this.oBottomBtn = null;
	this.playDuration = option.playDuration;
	this.now = 0;
	//初始化
	this.init();
	//绑定事件
	this.bindEvent();

	if(this.playDuration){
		this.autoPlay();
	}
}
Carousel.prototype.init = function(){
	//创建方图片的ul容器
	this.oBox.style.width = this.width + 'px';
	this.oBox.style.height = this.height + 'px';
	this.oBox.style.position = 'relative';
	this.oImgUl = document.createElement('ul');
	for(var i = 0;i<this.aImg.length;i++){
		var oLi = document.createElement('li');
		var oImg = document.createElement('img');
		oLi.style.position = 'absolute';
		oLi.style.top = 0;
		oLi.style.left = 0;

		//默认显示第一张
		if(i==0){
			oLi.style.opacity = 1;
			oLi.style.zIndex = 50;
		}else{
			oLi.style.opacity = 0.5;
			oLi.style.zIndex = 0;
		}
		oImg.style.width = this.width + 'px';
		oImg.style.height = this.height + 'px';
		oImg.src = this.aImg[i];
		oLi.appendChild(oImg);
		this.oImgUl.appendChild(oLi);
	}
	//左右按钮
	this.leftBtn = document.createElement('span');
	this.rightBtn = document.createElement('span');
	this.leftBtn.className = 'leftBtn';
	this.rightBtn.className = 'rightBtn';
	this.leftBtn.style.zIndex = 999;
	this.rightBtn.style.zIndex = 999;
	this.leftBtn.innerHTML = "";
	this.rightBtn.innerHTML = "";
	
	//底部按钮
	this.oBottomBtn = document.createElement('ul');
	this.oBottomBtn.className = 'bottomBtn';
	this.oBottomBtn.style.zIndex = 999; 
	for(var i = 0;i<this.aImg.length;i++){
		var oLi = document.createElement('li');
		if(i == 0){
			oLi.className = 'active';
		}
		this.oBottomBtn.appendChild(oLi);
	}

	//把按钮添加到到顶层父容器中
	this.oBox.appendChild(this.leftBtn);
	this.oBox.appendChild(this.rightBtn);
	
	this.oBox.appendChild(this.oBottomBtn);
	this.oBottomBtn.style.position='absolute';
	//给底部按钮容器添加ml使其水平居中
	this.oBottomBtn.style.marginLeft =  - this.oBottomBtn.offsetWidth * 0.5 + 'px';
	console.log(this.oBottomBtn.offsetWidth);
	console.log(this.oBox.offsetWidth);
	console.log(this.oBottomBtn.style.marginLeft);
	//把ul容器添加到顶层父容器中
	this.oBox.appendChild(this.oImgUl);
}
Carousel.prototype.bindEvent = function(){
	//显示下一张
	this.rightBtn.onclick = function(){
		this.now++;
		if(this.now >=  this.oImgUl.children.length){
			this.now = 0;
		}
		this.tab();
	}.bind(this);

	//显示上一张
	this.leftBtn.onclick = function(){
		this.now--;
		if(this.now < 0){
			this.now = this.oImgUl.children.length - 1;
		}
		this.tab();
	}.bind(this);	

	//底部按钮事件
	var _self = this;
	for(var i = 0;i<this.oBottomBtn.children.length;i++){
		this.oBottomBtn.children[i].index = i;
		this.oBottomBtn.children[i].onclick = function(){
			_self.now = this.index;
			_self.tab();
		}
	}	
}
Carousel.prototype.tab = function(){
	//改变所有的li
	for(var i = 0;i<this.oImgUl.children.length;i++){
		this.oImgUl.children[i].style.zIndex = 0;
		this.oImgUl.children[i].style.opacity = 0.5;
		this.oBottomBtn.children[i].className = '';
	}
	//改变当前的li
	this.oImgUl.children[this.now].style.zIndex = 50;
	// this.oImgUl.children[this.now].style.opacity = 1;
	this.oBottomBtn.children[this.now].className = 'active';
	animation(this.oImgUl.children[this.now],{opacity:100});				
}
Carousel.prototype.autoPlay = function(){
	var timer = null;
	timer = setInterval(this.rightBtn.onclick,this.playDuration);
	this.oBox.onmouseover = function(){
		clearInterval(timer);
	}
	this.oBox.onmouseout = function(){
		timer = setInterval(this.rightBtn.onclick,this.playDuration);			
	}.bind(this);
}