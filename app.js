const express = require("express");
const https = require("https");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
require("dotenv").config();



app.use(bodyParser.urlencoded({extended:true}));
app.get("/" , function(req,res){
        res.sendFile(__dirname + "/index.html");
    
        });

        app.post("/" , function(req,res){
               
                let query = req.body.cityName;
const appid = process.env.API_KEY;
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?&q="+ query +"&appid=" +appid+ "&units=metric";

https.get(url,function(response){
    console.log(response);
   response.on("data" , function(data){
         const weatherData = JSON.parse(data);

        const temp = weatherData.main.temp;
        const weatherDescription  = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        query = query.toUpperCase();
        res.write("<h1>The Temperature in "+ query +" is " + temp+ " degrees Celcius</h1>");
        
        res.write("<p>The Weather is currently " +weatherDescription +"</p>");
        res.write("<img src="+imageURL+">");
        res.send();
   })
})

        });





app.listen(3000,function(){

   console.log("The server is up and running in port 3000");
});