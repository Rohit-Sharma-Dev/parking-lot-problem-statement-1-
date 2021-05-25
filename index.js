const fs=require('fs')
var data=[]
n=5
for (var i=0;i<n;i++){
    data[i]=''
}

fs.writeFileSync('cardata.json', JSON.stringify(data, null))