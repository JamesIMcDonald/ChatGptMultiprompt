
const openAiApi = (function(){

    const baseUrl = 'https://api.openai.com/v1/chat/completions'
    
    // This was used but because I wanted to allow others to use this whole program I've disabled it and added the prompt in interaction
    // async function getApiKeys(){
    //     try {
    //         const response = await fetch('./apiKeys.json')
    //         if (!response.ok){
    //             throw new Error(`HTTP error, status: ${response.status}`)
    //         }
    //         const data = await response.json()
    //         return data.apiKeys
    //     }
    //     catch (error) {
    //         console.error('Error: ', error)
    //     }
    // }

    function createHeader(apiKey, body) {
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        }
        return options
    }

    function createReqData(prompt, apiKey) {
        const requestData = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `${prompt}`
                },
            ],
        }
        const fullData = createHeader(apiKey, requestData)
        return fullData
    }


    async function chatGptRequest(requestData) {
        try {
            const startTime = performance.now()/1000
            const openAiResponse = await fetch(baseUrl, requestData)
            if (!openAiResponse.ok){
                throw new Error(`HTTP error, status: ${openAiResponse.status}`)
            }
            const data = await openAiResponse.json()
            const endTime = performance.now()/1000
            data.usage.time = {startTime: startTime, endTime: endTime, elapsedTime: endTime - startTime}
            return(data)
        }
        catch (error) {
            console.error('error: ', error)
        }
    }

    async function askChatGPT(promptString, apiKey){
        // const apiKeys = await getApiKeys()
        // const apiKey = apiKeys.openAiAPI2
        const requestData = createReqData(promptString, apiKey)
        const chatGptResponse = await chatGptRequest(requestData)
        return chatGptResponse
    }

    // function not needed, changed implementation of the mass submit.
    // async function askChatGPTBulk(promptStringArray){
    //     const apiKeys = await getApiKeys()
    //     const apiKey = apiKeys.openAiAPI2
    //     // so this will be an array of prompts that can be generated
    //     const startTime = performance.now()
    //     const responseArray = []
    //     for (let i = 0; i < promptStringArray.length; i++) {
    //         const requestData = createReqData(promptStringArray[i], apiKey)
    //         console.log(`Sending request ${i+1}, the prompt is: ${requestData.body}`)
    //         const chatGptResponse = await chatGptRequest(requestData)
    //         responseArray.push({id: i, return: chatGptResponse})
    //     }
    //     const endTime = performance.now()
    //     const elapsedTimeS = (endTime - startTime)/1000
    //     console.log(`this function took ${elapsedTimeS}s or ~${elapsedTimeS / promptStringArray.length}s per cell on avg`)
    //     return await responseArray
    // }

return {askChatGPT, createReqData, chatGptRequest}
})()

export default openAiApi


// const chatgptrequestsbulk = ['tell me about 1','tell me about 2','tell me about 3','tell me about 4']
// const bulkResponse = await openAiApi.askChatGPTBulk(chatgptrequestsbulk)
// await console.log(bulkResponse)