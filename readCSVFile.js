import CSVToArray from "./csvToArray.js"

// This function is only called on CSV's, it is used to take a filepath leading to a csv and returns a 2d array with the same contents
async function readCSVFile(path){
    try {
        const response = await fetch(path)
        if (!response.ok){
            throw new Error(`HTTP error, status: ${response.status}`)
        }
        const csvData = await response.text()
        const data = await CSVToArray(csvData, ',')
        return(data)
    }
    catch (error) {
        console.error('error: ', error)
    }
}

export default readCSVFile
