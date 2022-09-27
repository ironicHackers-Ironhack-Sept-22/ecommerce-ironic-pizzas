const express = require("express");

const app = express();

app.use(express.static('public')); // Make everything inside of public/ available



app.get("/", (request, response, next) => {
    console.log("this is the homepage");    
    // response.send("hello world");
    response.sendFile(__dirname + '/views/index.html');
});


app.get("/contact", (request, response, next) => {
    console.log("this is the contact page");
    response.sendFile(__dirname + '/views/contact-page.html');
});



app.listen(3000, () => console.log('My first app listening on port 3000! '));
