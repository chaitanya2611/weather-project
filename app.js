const express = require("express");
const https = require("https");
const { send } = require("process");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"\\index.html");
});

app.post("/",function(req,res){
    
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=cd10b6e2bf84915b24f62dd970512a9d&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const place = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon
            console.log(temp);
            res.write("<p>The weather is currently "+weatherDescription+"</p>")
            res.write("<h1>The temperature in "+weatherData.name+" is "+temp+"degree Celcius </h1>");
            const iconUrl = " http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            res.write("<img src="+iconUrl+">");
            res.send();
        });
    });
    
})

    






app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});




    
// });