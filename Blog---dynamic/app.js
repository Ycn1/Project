const express = require('express');

const swig = require('swig');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const Cookies = require('cookies');

const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

//连接数据库

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true});


const db = mongoose.connection;

db.on('err',()=>{
    throw err;
});

db.once('open',()=>{

    console.log("mongodb connected...");
});

const app = new express();

swig.setDefaults({
    cache:false
});


app.engine ('html',swig.renderFile);

app.set('views', './views');

app.set('view engine' , 'html');

app.use(express.static('public'));
//设置cookie的中间件

/*app.use((req,res,next)=>{

	req.cookies = new Cookies(req,res);

	req.userInfo = {};

	let userInfo = req.cookies.get('userInfo');

	if(userInfo){
		try{
			req.userInfo = JSON.parse(userInfo);
		}catch(err){

		}
	}
	next();

})*/
app.use(session({
  name:'blid',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  rolling:true,
    //cookie过期时间 1天
 cookie:{maxAge:1000*60*60*24},    
    //设置session存储在数据库中
 store:new MongoStore({ mongooseConnection: mongoose.connection })   
}));

app.use((req,res,next)=>{
	// req.userInfo = {};

	req.userInfo =  req.session.userInfo || {};
	
	next();
})


//当是一般的字符串的时候
app.use(bodyParser.urlencoded({ extended: false }));
 
//当是json的时候
app.use(bodyParser.json());

app.use('',require('./routes/index.js'));

app.use('/admin',require('./routes/admin.js'));

app.use('/user',require('./routes/user.js'));

app.use('/category',require('./routes/category.js'));

app.use('/article',require('./routes/article.js'));

app.use('/comment',require('./routes/comment.js'));

app.use('/resource',require('./routes/resource.js'));

app.use('/home',require('./routes/home.js'));




app.listen(3000,()=>{
	console.log('server is running 127.0.0.1:3000');
})


