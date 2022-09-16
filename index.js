//jshint esversion:6

const express = require("express");
let _ =require('lodash')
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Start your journey of writing here.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam exercitationem necessitatibus dolorem. Necessitatibus, perferendis voluptatum? Quam neque consequuntur omnis cupiditate qui iste nemo et, nostrum expedita eligendi sit accusamus molestias labore iure excepturi quo amet accusantium iusto commodi explicabo quisquam quos? Neque, tenetur quia esse iusto reprehenderit dolorem praesentium reiciendis magni nam ducimus quam ratione veritatis odit dolorum, iste rem beatae velit repellendus fuga eveniet mollitia iure ipsum rerum. Consequatur voluptatem impedit eaque, suscipit nihil excepturi reiciendis neque alias laborum eveniet odio minus voluptatum ratione quam tempora natus minima ad odit quisquam molestias molestiae. Asperiores, dolor. Vel aliquid unde quisquam.";
const aboutContent = " Keep an account of your days, months and years with the daily journal. Do spend 10 minutes, to maintain your daily journal.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam exercitationem necessitatibus dolorem. Necessitatibus, perferendis voluptatum? Quam neque consequuntur omnis cupiditate qui iste nemo et, nostrum expedita eligendi sit accusamus molestias labore iure excepturi quo amet accusantium iusto commodi explicabo quisquam quos? Neque, tenetur quia esse iusto reprehenderit dolorem praesentium reiciendis magni nam ducimus quam ratione veritatis odit dolorum, iste rem beatae velit repellendus fuga eveniet mollitia iure ipsum rerum. Consequatur voluptatem impedit eaque, suscipit nihil excepturi reiciendis neque alias laborum eveniet odio minus voluptatum ratione quam tempora natus minima ad odit quisquam molestias molestiae. Asperiores, dolor. Vel aliquid unde quisquam.  " ;
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts=[]

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function(req,res)
{
   res.render('home',{pHome:homeStartingContent,posts:posts})
   
})
app.get('/posts/:id', (req, res, next) => {
  let item=req.params.id;
  item=_.lowerCase(item)
   
  posts.forEach(function(post)
  {
     let temp=post.postTitle;
    //  temp=_.trim(temp,"-");
    if(_.lowerCase(temp)==item)
     res.render('post',{message:post.postMessage});
  })
  
 
})
app.get('/about',function(req,res)
{
  res.render('about',{pAbout:aboutContent})
})

app.get('/contact',function(req,res)
{
  res.render('contact',{pcontact:contactContent})
})


app.get('/compose',function(req,res)
{
  res.render('compose')
})


app.post('/compose',function(req,res)
{
  const post=
  {
     postTitle:req.body.title ,
     postMessage:req.body.message

  };
  posts.push(post);
  // console.log(post)
  res.redirect('/');
  
   
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
