let searchButton = document.getElementById('search-button');
let listSearch = document.getElementById('search-input');
let loading = document.getElementById('loading');

async function fetchHttp(http) {
    let response = await fetch(http)
    let newData = await response.json()
    return newData
}

async function searchFunc(event) {
    listSearch.innerHTML = ""
    event.preventDefault()
    let searchInput = document.getElementById('search');
    let http = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`
    loading.classList.remove('d-none')
    let data = await fetchHttp(http)
    const symbols = data.map((element) => element.symbol).join(',')
    let http2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${symbols}`
    let dataPrice = await fetchHttp(http2)
    displayResults(data, dataPrice)
}

const displayResults = (data, dataPrice) => {
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let symbol = data[i].symbol
        listSearch.innerHTML += `<li><img src="https://financialmodelingprep.com/images-New-jpg/${symbol}.jpg"><a href="./company.html?symbol=${symbol}" class="list-group-item"> ${name} &nbsp (${symbol}) &nbsp ${dataPrice[i].change}%</a></li>`
        loading.classList.add('d-none')
    }
}
searchButton && searchButton.addEventListener('click', searchFunc)