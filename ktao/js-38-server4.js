


var http= require('http');
var fs = require('fs');
var url =require('url');
var querystring = require('querystring');
var server = http.createServer(function(req,res){
	//res.end("hello onde.js");
	res.setHeader('Content-Type','text/html;charset=UTF-8');
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers",'test');
	res.setHeader("Access-Control-Expose-Headers",'Date');
	var urlStr = req.url;
	console.log(req.url);
	var filePath='./'+req.url;
	//如果请求的是favicon.ico，直接返回
	if(urlStr =='/favicon.ico'){
		res.statusCode=404;
		res.end();
	}
	//如果请求中有参数，把参数返回给前端页面
	//如果没有参数，打开文件读取并且返回
	if(req.method =='POST'){
		var body ='';
		req.on('data',function(chunk){
			body +=chunk;
		});
		req.on('end',function(){
			console.log(body);
			//querystring.parse把字符串解析成对象
			var bodyObj = querystring.parse(body);
			var strBody = JSON.stringify(bodyObj);
			res.statusCode =200;
			res.end(strBody);
		});
	}else{
		if(urlStr.search(/\?/) !=-1){
		console.log(url);
		var prams =url.parse(urlStr,true).query;
		var pramesStr = JSON.stringify(prams);
		res.statusCode=200;
		res.end(pramesStr);
	}
	fs.readFile(filePath,function(err,date){
		if(err){
			res.statusCode=404;
			res.end("file is not fount");
			}
			else{
				res.statusCode=200;
				res.end(date);
			}
	})
	}// res.end("'http://127.0.0.1:3000'");
});

server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})