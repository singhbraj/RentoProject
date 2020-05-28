const express = require('express');
const bodyParser = require('body-Parser');
const path = require('path');
const app=express();
const methodOverride=require('method-override');
app.set('view engine','ejs');
app.set(path.join(__dirname,'../','views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


// config with mongodb

const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/Phone",{
useNewUrlParser: true,
useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology: true});
const phoneSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Phone_NO:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    }
});
let Phone=mongoose.model('phone',phoneSchema);

/// RestFull Routes

// phone.create({
//     name:"Braj",
//     DOB:"20/10/1998",
//     Phone_NO:"+918178559630",
//     email:"braj1998baghel@gmail.com"
// });
app.get('/',(req,res)=>{
     res.redirect('/phone');
});
 
   // Index Route   

app.get('/phone',(req,res)=>{
    Phone.find({},(err,phones)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('phone_index',{phones:phones});
        }
    });
    //res.render("phone_index");
});
 
 // New Route
 
app.get('/phone/new',(req,res)=>{
    res.render('phone_new');
});

// Create Route

app.post('/phone',(req,res)=>{
    Blog.create(req.body.phone,(err,newPhone)=>{
        if(err)
        {
            res.render(phone_new);
        }
        else
        {
            res.redirect('/phone');
        }

    });
});
  
//   Show Route

app.get('/phone/:id',(req,res)=>{
       Phone.findById(req.params.id,(err,referPhone)=>{
           if(err)
           {
               res.redirect('/phone');
           }
           else
           {
            res.render('phone_show',{phone:referPhone});
           }
   
      });
});

// EDIT Route

app.get('/phone/:id/edit',(req,res)=>{

    Phone.findById(req.params.id,(err,referPhone)=>{
        if(err)
        {
            res.redirect('/phone');
        }
        else
        {
         res.render('phone_edit',{phone:referPhone});
        }
    });
});

//    Update Route

app.put("/phone/:id",(req,res)=>{
    Phone.findByIdAndUpdate(req.params.id, req.body.phone, (err,updatedPhone)=>{
        if(err)
        {
            res.redirect('/phone');
        }
        else
        {
            //res.send("Hello i am update!!");
         res.redirect('/phone/' + req.params.id);
        }
});
});


//  Delete Route

app.delete('/phone/:id',(req,res)=>{
    
// res.send('You have reached the destroy route!!'); 
Phone.findByIdAndRemove(req.params.id, (err)=>{
    if(err)
    {
        res.redirect('/phone');
    }
    else
    {
        res.redirect('/phone');
    }
})
});

app.listen(3000);