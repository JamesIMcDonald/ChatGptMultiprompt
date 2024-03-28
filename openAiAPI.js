
const openAiApi = (function(){

    const baseUrl = 'https://api.openai.com/v1/chat/completions'

    // Constructs the complete header, this one is called inside of createReqData because these functions were not always structure like this its weird to look at but it works.
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

    // constructs the body of the API request
    // edited this prompt so that it will hopefully output text without linebreaks
    function createReqData(prompt, apiKey) {
        const requestData = {
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a bot that takes in a prompt and gives the output in a format which fits into a CSV file. NO "/n" or "" EVER as I want your return to only be in one cell and am sanitisng the input with code.'
                },
                {
                    role: 'user',
                    content: `${prompt}`
                },
            ],
        }
        const fullData = createHeader(apiKey, requestData)
        return fullData
    }

    // This is the actual function that sends off the api request and returns the object that is recieve with some added analytics.
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

    // this is the function that gets everything done, you call this with a prompt and it returns ChatGPT api's response
    async function askChatGPT(promptString, apiKey){
        // const apiKeys = await getApiKeys()
        // const apiKey = apiKeys.openAiAPI2
        const requestData = createReqData(promptString, apiKey)
        const chatGptResponse = await chatGptRequest(requestData)
        return chatGptResponse
    }

return {askChatGPT, createReqData, chatGptRequest}
})()

export default openAiApi