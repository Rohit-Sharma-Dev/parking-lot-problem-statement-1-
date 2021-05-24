const express =require('express')
const app =express()
const fs=require('fs')
const prompt = require('prompt-sync')();
app.use(express.json())
let data=JSON.parse(fs.readFileSync('cardata.json'))
n=5   // no. of parkin lot we gave
for (var i=1;i<=n;i++){
    if (!data[i]){
        data[i]=""
    }
}

app.get('/current',(req,res)=>{
    res.send(data)
})

const cardata=prompt('enter your car no.')
const option=prompt('do want to leave or park(leave/park)')
const today=new Date()

if (option==='park'){
    for (let i=1;i<=n;i++){
        if (data[i]===""){
            data[i]={
                carNumber:cardata,
                time:`${today.getHours()}:${today.getMinutes()} `
            }
            // console.log(`sorry but we are unable to serve you our services`);
        break
        }
    }
    console.log(data);
    fs.writeFileSync('cardata.json',JSON.stringify(data,null))
}
else if (option=='leave') {
    for (let i=1;i<=n;i++){
        // let carnumber=prompt('enter yoiu car number please')
        if(cardata === data[i].carNumber){
            delete data[i]
            data[i]=""
            console.log(data[i]);
            console.log(data);

            fs.writeFileSync('cardata.json',JSON.stringify(data,null))

        }
        else{
            console.log(`please enter the correct this carnumber ${cardata} is not correct`);
        }
        break
        
    }
}







