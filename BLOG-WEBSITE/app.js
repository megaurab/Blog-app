

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var arr = [];

app.get("/",(req,res)=>{
  res.render("home.ejs",{
    content:arr
  });
})

app.get("/about",(req,res)=>{
  res.render("about.ejs",{
    content:aboutContent
  });
})

app.get("/contact",(req,res)=>{
  res.render("contact.ejs",{
    content:contactContent
  });
})

app.get("/compose",(req,res)=>{
  res.render("compose.ejs");
})

app.post("/compose",(req,res)=>{
  const post = {
    title: req.body.inputName,
    content: req.body.postBody
  };
  
  arr.push(post);

  res.redirect("/");

})

app.get("/posts/:target",(req,res)=>{
  var requestedTitle = _.lowerCase(req.params.target);
  for(let i=0 ; i<arr.length ; i++){
    if(_.lowerCase(arr[i].title)==requestedTitle){
      res.render("post.ejs",{
        nom1:arr[i].title,
        nom2:arr[i].content
      });
    }else{
      console.log("Match not found")
    }
  }
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
