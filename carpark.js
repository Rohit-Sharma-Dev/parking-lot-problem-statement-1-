const express =require('express')
const app =express()
const fs=require('fs')
const prompt = require('prompt-sync')();
app.use(express.json())
var data=JSON.parse(fs.readFileSync('cardata.json'))

n=10     // no. of parkin lot we gave

const action = prompt('what do you want do you want to park your car or leave => (park/leave)');

// get all the list of car parked

app.get('/current',(req,res)=>{
    res.send(data)
})

if (action=="park"){
    app.post('/park-this-car',(req,res)=>{
        var carNumber=prompt('Enter your can number :')
        
    })

}
// want to park your car 
