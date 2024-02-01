import CSVToArray from "./csvToArray.js";
import constructEntryHtml from "./testingEntryConstruction.js";
import generateHTMLTable from "./generateHTMLTable.js";
import openAiApi from "./openAiAPI.js";


const interaction = (async function(){
    const tableContainer = document.querySelector('.container')
    const csvInput = document.getElementById('file')
    const csvLoadButton = document.querySelector('.load')
    const csvDisplayNumInput = document.getElementById('number')
    // CSV data goes in here
    let csv = null
    let fileName = null
    let apiKey = null

    // Handles the loading of the csv and the displaying of it
    csvLoadButton.addEventListener('click', async function(){
        const file = csvInput.files[0]
        if (file) {
            csv = null
            fileName = file.name
            if (!fileName.includes('.csv')) {
                return alert('Please load a CSV file')
            }
            const workingFile = await readFileAsync(file)
            const loadedCSV = CSVToArray(workingFile)
            let rowsNum = loadedCSV.length
            if (loadedCSV[rowsNum-1].length !== loadedCSV[rowsNum-2].length) {
               loadedCSV.pop() 
            }
            // setting this to be the new length
            rowsNum = loadedCSV.length
            if (csvDisplayNumInput.value > 0) {
                rowsNum = csvDisplayNumInput.value
            }
            const newTable = generateHTMLTable(loadedCSV, rowsNum)
            tableContainer.innerHTML = ''
            tableContainer.appendChild(newTable)
            csv = loadedCSV
            for (let i = 0; i < loadedCSV.length; i++) {
                let rowHasContent = false
                loadedCSV[i].forEach(function(element){
                    // if the element isn't falsy set row has content to true
                    if (element) {
                        rowHasContent = true
                    }
                })
                // if the row has no content then we dont want it and any of the rows below it - deals with excel giving 1m+ empty rows.
                if (!rowHasContent) {
                    csv.length = i
                    break
                }
            } 
        }
    })

    // function to read files from file inputs, used above.
    function readFileAsync(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = function(e) {
                resolve(e.target.result);
            };
    
            reader.onerror = function(error) {
                reject(error);
            };
    
            reader.readAsText(file);
        });
    }

    // The actual useful part of this whole thing.
    function constructModularPrompt(string, array){
        // this function will take in a string and an array and return a string which adds the selected values from the array
        // Use a regular expression to match placeholders {{index}}
        const placeholderRegex = /\{\{(\d+)\}\}/g;
        // Replace each matched placeholder with the corresponding value from the array
        const replacedString = string.replace(placeholderRegex, (match, index) => {
            const arrayIndex = parseInt(index, 10); // No need to adjust for zero-based indexing
            return array[arrayIndex] !== undefined ? array[arrayIndex] : match;
        });
        return replacedString;
    }

    // all required for the functions below
    const promptTextArea = document.getElementById('chatGptInput')
    const testPromptBtn = document.querySelector('.test')
    const testRowSelectInput = document.getElementById('testRow')
    const testRowSelectNumInput = document.getElementById('testNum')
    const testSubmitBtn = document.querySelector('.testSubmit')
    const entryContainer = document.querySelector('.entryContainer')

    testPromptBtn.addEventListener('click', function(){
        // this function needs to take in the working row num and the num of rows to test and then spit out the generated prompt from each row one after the other
        if (!csv) {
            alert('Please load a CSV')
            return
        }
        const testRowQuantNum = parseInt(testRowSelectNumInput.value)
        const workingRowBeginning = parseInt(testRowSelectInput.value)
        entryContainer.innerHTML = ''
        const finalLoopNum = testRowQuantNum > 0 ? testRowQuantNum + workingRowBeginning : workingRowBeginning + 1;
        for (let i = testRowSelectInput.value; i < finalLoopNum; i++) {
            const prompt = constructModularPrompt(promptTextArea.value, csv[i])
            const entry = constructEntryHtml(`CSV entry ${i}`, prompt)
            entryContainer.appendChild(entry)
        }
    })

    testSubmitBtn.addEventListener('click', async function(){
        // this function needs to take in the same working row num and num of rows and return cells which have both the prompt and the chatgpt response
        if (!csv) {
            alert('Please load a CSV')
            return
        }
        if (!apiKey) {
            apiPrompt()
            return
        }
        entryContainer.innerHTML = ''
        // gets the row num and num of rows
        const testRowQuantNum = parseInt(testRowSelectNumInput.value)
        const workingRowBeginning = parseInt(testRowSelectInput.value)

        // the actual loop that does the work
        const finalLoopNum = testRowQuantNum > 0 ? testRowQuantNum + workingRowBeginning : workingRowBeginning + 1;
        let totalTokensUsed = 0
        let requestsNum = 0
        const startTime = performance.now()
        for (let i = workingRowBeginning; i < finalLoopNum; i++) {
            const prompt = constructModularPrompt(promptTextArea.value, csv[i])
            const data = openAiApi.createReqData(prompt, apiKey)
            const request = await openAiApi.chatGptRequest(data)
            const response = request.choices[0].message.content
            const importantAnalytics = `Prompt tokens: ${request.usage.prompt_tokens}, Completion Tokens: ${request.usage.completion_tokens}, Total tokens: ${request.usage.total_tokens}, elapsedTime: ${request.usage.time.elapsedTime.toFixed(2)}s`
            totalTokensUsed = totalTokensUsed + request.usage.total_tokens
            requestsNum++
            const entry = constructEntryHtml(`CSV entry ${i}:`, prompt, response, importantAnalytics)
            entryContainer.appendChild(entry)
        }
        const endTime = performance.now()
        console.log(`Operation finished it used ${totalTokensUsed} tokens in total, made ${requestsNum} requests and took ${(endTime - startTime)/1000}s to complete.`)
    })

    // this function starts on array[1] to account for the column names and runs through every entry adding an array entry with the chatGPT message. Once its done it creates a new file with
    const submitBtn = document.querySelector('.submit')
    submitBtn.addEventListener('click', async function(){
        if (!csv) {
            alert('Please load a CSV')
            return
        }
        if (!apiKey) {
            apiPrompt()
            return
        }
        entryContainer.innerHTML = ''
        const workingRowBeginning = 1
        // this is one higher than what we need for the for loop
        const finalLoopNum = csv.length
        let totalTokensUsed = 0
        let requestsNum = 0
        const startTime = performance.now()
        csv[0].push('chatGPTReturn')
        for (let i = workingRowBeginning; i < finalLoopNum; i++) {
            const prompt = constructModularPrompt(promptTextArea.value, csv[i])
            const data = openAiApi.createReqData(prompt, apiKey)
            const request = await openAiApi.chatGptRequest(data)
            const response = request.choices[0].message.content
            const importantAnalytics = `Prompt tokens: ${request.usage.prompt_tokens}, Completion Tokens: ${request.usage.completion_tokens}, Total tokens: ${request.usage.total_tokens}, elapsedTime: ${request.usage.time.elapsedTime.toFixed(2)}s`
            totalTokensUsed = totalTokensUsed + request.usage.total_tokens
            requestsNum++
            csv[i].push(`${response}`)
            // const elapsedTime = request.
            const entry = constructEntryHtml(`CSV entry ${i}:`, prompt, response, importantAnalytics)
            entryContainer.appendChild(entry)
        }
        const CSVData = convertArrayToCSV(csv)
        // this will split a string into an array so that when we grab the needed section of its old filename
        const oldName = fileName.split('.')
        const workingName = oldName[0]
        const newName = `${workingName} + chatGPT addition.csv`
        // this link also auto downloads when initialised
        const downloadLink = download(CSVData, newName)
        entryContainer.appendChild(downloadLink)
        const endTime = performance.now()
        alert(`Operation finished it used ${totalTokensUsed} tokens in total, made ${requestsNum} requests and took ${(endTime - startTime)/1000}s to complete.`)
    })

    function convertArrayToCSV(array) {
        const csvContent = array.map(row =>
            row.map(cell =>
                // If the cell contains a comma, enclose it in double quotes
                cell.includes(',') ? `"${cell}"` : cell
            ).join(',')
        ).join('\n');
    
        return csvContent;
    }

    function download(data, filename){
        const blob = new Blob([data], { type: 'text/csv'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        link.click()
        link.textContent = 'Download here!'
        return link
    }

    const apiKeyButton = document.querySelector('.apiPrompt')
    apiKeyButton.addEventListener('click', function(){
        apiPrompt()
    })

    function apiPrompt(){
        apiKey = prompt('Please enter a valid API key', 'e.g. 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')
    }
})()