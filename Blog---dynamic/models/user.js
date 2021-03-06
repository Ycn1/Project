const mongoose = require('mongoose');


const newSchema = new mongoose.Schema({
		  	
		  	username:{
		  		type:String,
		  	},
		  	password:{
		  		type:String,
		  	},
		  	isAdmin:{
		  		type:Boolean,
		  		default:false
		  	}

		}); 


const UserModel = mongoose.model('Wish', newSchema);


module.exports = UserModel;