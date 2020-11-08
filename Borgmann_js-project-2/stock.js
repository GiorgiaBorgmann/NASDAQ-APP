let searchButton = document.getElementById('search-button');
let listSearch = document.getElementById('search-input');
let loading = document.getElementById('loading')



async function doFetch(http) {
    listSearch.innerHTML = ""
    let response = await fetch(http)
    let data = await response.json()
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let symbol = data[i].symbol
        listSearch.innerHTML += `<a href="./company.html?symbol=${symbol}" class="list-group-item"> ${name} ${symbol}</a>`
        loading.classList.add('d-none')
    }
}


function searchFunc(event) {
    event.preventDefault()
    let searchInput = document.getElementById('search');
    let http = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`
    console.log(searchInput.value)
    loading.classList.remove('d-none')
    doFetch(http)
}
searchButton && searchButton.addEventListener('click', searchFunc)