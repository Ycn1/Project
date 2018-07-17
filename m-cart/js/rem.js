
(function(win,doc){
	//获取根元素
	var oRoot = doc.getElementsByTagName('html')[0];
	
	function refreshFontSize(){
		//获取设备的宽
		var iWidth = doc.body.clientWidth || doc.documentElement.clientWidth;
		//根据设备的宽计算出根元素的fontSize
		var iFontSize = iWidth / 10;
		oRoot.style.fontSize = iFontSize + 'px';			
	}


	win.addEventListener('resize',refreshFontSize,false);
	doc.addEventListener('DOMContentLoaded',refreshFontSize,false);

})(window,document);