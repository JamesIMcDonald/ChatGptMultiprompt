import CSVToArray from "./csvToArray.js"

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
