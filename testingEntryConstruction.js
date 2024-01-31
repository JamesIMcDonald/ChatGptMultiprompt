
function constructEntryHtml(title, prompt, response = null, analytics = null) {
    const container = document.createElement('div')
    container.classList.add('entry')

    const titleElement = document.createElement('h3')
    titleElement.textContent = title
    container.appendChild(titleElement)

    if(analytics) {
        const analyticsElement = document.createElement('p')
        analyticsElement.textContent = analytics
        container.appendChild(analyticsElement)
    }
    const promptTitle = document.createElement('h4')
    promptTitle.textContent = 'Prompt:'
    container.appendChild(promptTitle)

    const promptText = document.createElement('p')
    promptText.textContent = prompt
    container.appendChild(promptText)

    if (response) {
        const responseTitle = document.createElement('h4')
        responseTitle.textContent = 'OpenAi Response:'
        container.appendChild(responseTitle)
        const responseText = document.createElement('p')
        responseText.textContent = response
        container.appendChild(responseText)
    }

    return container
}

export default constructEntryHtml