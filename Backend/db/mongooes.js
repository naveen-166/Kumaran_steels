const mongoose=require('mongoose');
const mongourl = '';
mongoose.connect(mongourl).then(()=>console.log("Database Connected")).catch(err=>{console.log(err)});
