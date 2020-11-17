class SearchResults {
    constructor(element) {
        this.element = element;
        this.data = []
        this.dataPrice = []
        this.highlightText
    }
    async fetchUrl() {
        loading.classList.remove('d-none')
        let inputElement = document.getElementById('search');
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputElement.value}&limit=10&exchange=NASDAQ`)
        let data = await response.json()
        this.data = data
    }
    async fetchUrlPrices() {
        let symbols = this.data.map(element => element.symbol).join(',')
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${symbols}`)
        let dataPrice = await response.json()
        this.dataPrice = dataPrice
    }
    creatHTML() {
        this.element.innerHTML = `<input type="search" placeholder="" id="search"><button id="searchButton">Search</button>  <span class="fa-lg"><i class="fas fa-spinner fa-pulse d-none" id="loading"></i></span>`
    }

    highlightTextYellow(text, inputText) {
        let innerHTML = inputText.innerHTML;
        let UpperInnerHTML = innerHTML.toUpperCase();
        let index = UpperInnerHTML.indexOf(text.toUpperCase());
        if (index >= 0) {
            innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
            inputText.innerHTML = innerHTML;
        }
    }

    async displayResultsSearch() {
        for (let i = 0; i < this.data.length; i++) {
            let loading = document.getElementById('loading');
            let results = document.getElementById('searchInput')
            let name = this.data[i].name;
            let symbol = this.data[i].symbol;
            let price = this.dataPrice[i].change;
            let color = ""
            results.innerHTML += `<li class="container-flex-results"><div><img src="https://financialmodelingprep.com/images-New-jpg/${symbol}.jpg"><a href="./company.html?symbol=${symbol}"><span id="name${i}">
             ${name} &nbsp </span> <span id="symbol${i}">${symbol} &nbsp </span></div><span class="data-box text-white p-1 border rounded ${price >=0 ? color = 'bg-success border-success': color = 'bg-danger border-danger'}">${price}%<span></a></li>`
            loading.classList.add('d-none')
            let searchInput = document.getElementById('search')
            this.highlightTextYellow(searchInput.value, document.getElementById(`symbol${i}`))
            this.highlightTextYellow(searchInput.value, document.getElementById(`name${i}`))


        }


    }
}