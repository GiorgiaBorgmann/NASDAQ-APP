let searchButton = document.getElementById('search-button');
let listSearch = document.getElementById('search-input');

async function doFetch(http) {
    listSearch.innerHTML = ""
    let response = await fetch(http)
    let data = await response.json()
    console.table(data)
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let symbol = data[i].symbol
        listSearch.innerHTML += `<a href ="/company.html?symbol=${symbol}" class="list-group-item list-group-item-action"> ${name} ${symbol}</a>`
    }
}

function searchFunc(event) {
    event.preventDefault()
    let searchInput = document.getElementById('search');
    let http = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`
    console.log(searchInput.value)
    doFetch(http)
}
searchButton.addEventListener('click', searchFunc)