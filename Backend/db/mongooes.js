const mongoose=require('mongoose');
const mongourl = 'mongodb+srv://naveen_166:naveen123@resumeshortlist.nh03e.mongodb.net/kumaransteels?retryWrites=true&w=majority&appName=resumeshortlist';
mongoose.connect(mongourl).then(()=>console.log("Database Connected")).catch(err=>{console.log(err)});