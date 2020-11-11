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

function displayResults(data, dataPrice) {
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let symbol = data[i].symbol
        let price = dataPrice[i].change
        let color = ""
        listSearch.innerHTML += `<li><img src="https://financialmodelingprep.com/images-New-jpg/${symbol}.jpg"><a href="./company.html?symbol=${symbol}"> ${name} &nbsp (${symbol}) &nbsp <span class="text-white p-1 border rounded ${price >=0 ? color = 'bg-success border-success': color = 'bg-danger border-danger'}">${price}%<span></a></li>`
        loading.classList.add('d-none')
    }
}
let arrDataLive = []
async function liveData() {
    httpData = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index"
    let data = await fetchHttp(httpData)
    console.log(data)
    let printResult = document.getElementById('result-prices-live')
    for (let i = 0; i < data.length; i++) {
        let symbol = data[i].symbol[0] == "^" ? data[i].symbol.slice(1) : data[i].symbol
        let changePer = data[i].changesPercentage
        let color = ""
        printResult.innerHTML += `<li class="text-white"> ${symbol} <span width = "28px" class="text-white p-1 border rounded ${changePer >=0 ? color = 'bg-success border-success': color = 'bg-danger border-danger'}">${changePer}%</span></li>`
    }
}
liveData()
console.log(arrDataLive)
searchButton && searchButton.addEventListener('click', searchFunc)