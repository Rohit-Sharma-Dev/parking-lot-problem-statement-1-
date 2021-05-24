const express = require('express')
const app = express()
const fs = require('fs')
const prompt = require('prompt-sync')();
app.use(express.json())
let data = JSON.parse(fs.readFileSync('cardata.json'))
var n = 5 // no. of parkin lot we gave
var numOfCars = 0

for (var i = 0; i < n; i++) {
    if (data[i] != "") {
        numOfCars++
    }
}

app.get('/current', (req, res) => {
    res.send(data)
})

const cardata = prompt('enter your car no.')
const option = prompt('do want to leave or park(leave/park)')
const today = new Date()

if (option === 'park') {
    // checking if any space is present or not
    if (numOfCars === n) {
        console.log(`space is not present`)
    } 
    // if we have space to park a car
    else {
        var isunique = false  // taking this for checking uniqueness of carnumber
        for (let i = 0; i < n; i++) {
            if (data[i].carNumber === cardata) {
                isunique = true
                console.log(`this already exist`);
                break
            }
        }
        // if the given carNumber is not unique 
        if (!isunique) {
            for (let i = 0; i < n; i++) {
                if (data[i] === "") {
                    data[i] = {
                        carNumber: cardata,
                        time: `${today.getHours()}:${today.getMinutes()}`,
                        date: `${today.getDate()}:${today.getMonth()+1}:${today.getFullYear()}`
                    }
                    numOfCars++

                    console.log(data);
                    fs.writeFileSync('cardata.json', JSON.stringify(data, null))
                    break
                }
            }
        }
    }

} 

// if the user want took his bike/car
else if (option == 'leave') {
    var find = false
    for (var i = 0; i <= n; i++) {
        // console.log(data[i])

        // checking if the carNumber exist or not
        if (data[i].carNumber === cardata) {
            numOfCars -= 1
            find = true
            let yourdata = data[i]
            yourdata.exittime = `${today.getHours()}:${today.getMinutes()}`
            data[i] = ""

            // asking the service provider for how long he parked his car
            let calc_hour = prompt('for how many hours did he parked his car')
            calc_hour = parseInt(calc_hour)
            var amount = 10
            // calculating the amount that has to be pay by the user
            if (calc_hour > 2) {
                amount += 10 * (calc_hour - 2)
            }

            // giving the recipt to the user here


            yourdata.amount = `$${amount}`
            console.log(yourdata)

            // updating the json file here
            fs.writeFileSync('cardata.json', JSON.stringify(data, null))
            break
        }

    }


    if (!find) {
        console.log(`please enter the correct carnumber ${cardata} is not correct`);
    }
}