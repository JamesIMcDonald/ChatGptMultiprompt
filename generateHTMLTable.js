

// this function takes in an array of arrays and spits out the html structure for the whole thing:
function generateHTMLTable(array, rowQty = array.length){
    const container = document.createElement('table')
    const tHead = document.createElement('thead')
    container.appendChild(tHead)
    const tBody = document.createElement('tbody')
    container.appendChild(tBody)
    container.classList.add('table')
    const idRow = document.createElement('tr')
    tHead.appendChild(idRow)
    for (let z = 0; z < array[0].length; z++) {
        const idCell = document.createElement('th')
        idCell.textContent = `ID: ${z}`
        idRow.appendChild(idCell)
    }
    for (let i = 0; i < rowQty; i++){
        const row = document.createElement('tr')
        i === 0 ? tHead.appendChild(row) : tBody.appendChild(row)
        for (let y = 0; y < array[i].length; y++) {
            const workingElement = array[i][y]
            // makes headers if its the first row
            const cell = i === 0 ? document.createElement('th') : document.createElement('td')
            if (i === 0) {
                cell.setAttribute("scope", "col")
            }
            cell.textContent = workingElement
            row.appendChild(cell)
        }
    }
    return container
}

export default generateHTMLTable