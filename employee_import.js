const fs = require('fs');
const csvPath = process.argv[2]
const detectionStrategyArgs = process.argv[3]

let detectionStrategy = []

// Parse terminal input
switch (detectionStrategyArgs) {
    case 'email':
        detectionStrategy.push('Email')
        break
    case 'phone':
        detectionStrategy.push('Phone')
        break
    case 'email_or_phone':
        detectionStrategy.push('Email')
        detectionStrategy.push('Phone')
        break
    default:
        throw new Error('Please provide a valid detection strategy.')

}


// will allow for file to be read in the terminal
const file = fs.readFileSync(csvPath, 'utf8')

// splitting file data either or carriage split or new line
const splitFile = file.split(/\r?\n/)

// variable where list of objects will be stored
let jsonObj = []

// allows for every piece of data to have a header in each object
const key = splitFile[0].split(',')
// console.log(key)

// iterating through the file to split on comma
for (let i = 1; i < splitFile.length; i++) {
    const value = splitFile[i].split(',')

    // creating each object
    let data = {};
    for (let j = 0; j < value.length; j++) {
        // trim() removes white space from either end of a string
        data[key[j].trim()] = value[j].trim()
    }
    // each previously created object is being added to the list declared on line 35
    jsonObj.push(data)
}


let uniqueValues = new Set()

function labelDuplicates(rowObj) {

    // True or False values will be stored here, depending on the criteria on Line 63
    let validData = []

    detectionStrategy.forEach(element => {

        // The rowObj must have the detection strategy, must not be an empty string, and must not already exist in the uniqueValues set on line 52 in order to evaluate to true.
        if (!rowObj[element] || rowObj[element] === '' || uniqueValues.has(rowObj[element])) {
            validData.push(false)
        } else {
            validData.push(true)
        }
    })

    // If each detection value is unique, it will be stored in the uniqueValues set and returned 'true', in order to be kept when line 82 is executed.
    if (validData.reduce((previousValue, currentValue) => previousValue + currentValue, 0) === validData.length) {
        detectionStrategy.forEach(element => {
            uniqueValues.add(rowObj[element])
        })
        return true
    } else {
        return false
    }
}

// The objects are filtered by the labelDuplicated callback function
const clean = jsonObj.filter(labelDuplicates)


// OUTPUT
// output new csv file w/ no duplicate rows 
let writeStream = fs.createWriteStream('output.csv')

// Write out the headers by grabbing the first object of the cleaned objects and grabbing the keys
writeStream.write(Object.keys(clean[0]).join(',') + "\n")

// Iterate through the objects, grabbing the values for the keys and joining them into CSV format
clean.forEach((rowObject) => {
    writeStream.write(Object.values(rowObject).join(',') + "\n")
})

// Close off write stream so nothing more can be written to it accidentally
writeStream.end()
