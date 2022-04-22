const fs= require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let posts = [];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const homeStartingContent = "75 years of Tradition of excellence in Engineering & Technology Education, Research and Innovations Delhi College of Engineering, (initially established with the name – Delhi Polytechnic) came into existence in the year 1941 to cater the needs of Indian industries for trained technical manpower with practical experience and sound theoretical knowledge. The institution was set up at historic Kashmere Gate campus as a follow up of the Wood and Abott Committee of 1938. It comprised of a multi disciplinary and multi level institution offering wide ranging programmes in engineering, technology, arts and sculpture, architecture, pharmacy and commerce. The national diploma awarded by the institution was recognized as equivalent to degree level for the purposes of employment. In 1952 the college was affiliated with University of Delhi and started formal Degree level Programmes.  ";

const aboutContent = "Newsletter and Media Platform of Delhi Technological University, formerly known as Delhi College of Engineering.Founded as DCE Times in 2009 by Abhishek Bindal and Anand Meena, DTU Times was among the first college newspapers to be published across all engineering colleges in India. We have since transitioned into its current form as a quarterly newsletter, published with the aim of providing essential correspondence, news updates and palatable articles to the students of the University. DTU Times is also chartered to chronicle the events and developments of DTU.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.use(express.static("public"));


app.get("/", function (req, res) {

    res.render("home", {
      homeContent: homeStartingContent,
      posts: posts
    });
  
    // console.log(posts);
  })

app.get("/compose", function (req, res) {

    res.render("compose");
  
  })

app.get("/contact", function (req, res) {

    res.render("contact", { ContactUsPage: contactContent });
  })

app.get("/about", function (req, res) {

    res.render("about", {
      AboutUsPage: aboutContent,
      posts: posts
    });
  })

  app.get("/post/:topic", function (req, res) {
    let requiredTitle = _.lowerCase(req.params.topic);
  
    // let storedTitle=_.lowerCase(posts[0].title);
  
    posts.forEach(function(post){
      let storedTitle=_.lowerCase(post.title);
  
      if(storedTitle==requiredTitle) res.render("post", { post: post});
    })
  
     
  })

  app.post("/compose", function (req, res) {
    const post = {
      title: req.body.txt,
      content: req.body.description
    };
    posts.push(post);
  
    res.redirect("/");
  
  })

app.listen(3000,function(){
    console.log("Server started on port 3000");
})