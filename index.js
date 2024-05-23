const express = require('express');
const app = express();
    
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 8000;

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.post('/', (request, response) => {

    const mockData = [
        {
          name: "Rouky",
          date: "2023-09-01",
          percentage: 0.4,
          quoted: '"Pickles"',
        },
        {
          name: "Keiko",
          date: "2023-09-01",
          percentage: 0.9,
          quoted: '"Cactus"',
        },
      ];
      
    //this statement tells the browser what type of data is supposed to download and force it to download
    response.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=*custom_name*.csv'
    });
    console.log(request,'request.body')
// whereas this part is in charge of telling what data should be parsed and be downloaded
    response.end(dataToCSV(request.body.data,["name","age","city","date","question","answer"]),"binary");
    // response.send(`
    //     <h1>Status Code: ${response.statusCode}</h1>
    //     <h2>Hello World</h2>
    // `)
});

function dataToCSV(dataList,headers){
    var allObjects = [];
    // Pushing the headers, as the first arr in the 2-dimensional array 'allObjects' would be the first row
    allObjects.push(headers);

    //Now iterating through the list and build up an array that contains the data of every object in the list, in the same order of the headers
    dataList.forEach(function(object){
        var arr = [];
        arr.push(object.attributes.customer.data.attributes.name);
        arr.push(object.attributes.customer.data.attributes.age);
        arr.push(object.attributes.customer.data.attributes.city);
        arr.push(object.attributes.customer.data.attributes.createdAt);
        arr.push(object.attributes.question.data.attributes.question);
        arr.push(object.attributes.option.data.attributes.value);

        // Adding the array as additional element to the 2-dimensional array. It will evantually be converted to a single row
        allObjects.push(arr)
    });

   // Initializing the output in a new variable 'csvContent'
    var csvContent = "";

    // The code below takes two-dimensional array and converts it to be strctured as CSV
    // *** It can be taken apart from the function, if all you need is to convert an array to CSV
    allObjects.forEach(function(infoArray, index){
      var dataString = infoArray.join(",");
      csvContent += index < allObjects.length ? dataString+ "\n" : dataString;
    }); 

    // Returning the CSV output
    return csvContent;
}

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;