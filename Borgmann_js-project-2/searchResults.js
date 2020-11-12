class SearchResults extends SearchForm {
    constructor(element) {
        this.element = element;
        this.data = []
        this.dataPrice = []
    }
    async fetchUrl() {
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchInput.value}&limit=10&exchange=NASDAQ`)
        let data = await response.json()
        this.data = data
    }
    async fetchUrlPrices() {
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${this.symbol}`)
        let dataPrice = await response.json()
        this.dataPrice = dataPrice
    }
    displayResultsSearch() {
        for (let i = 0; i < this.data.length; i++) {
            let loading = document.getElementById('loading');
            let name = this.data[i].name;
            let symbol = this.data[i].symbol
            let price = this.dataPrice[i].change
            let color = ""
            listSearch.innerHTML += `<li class="container-flex-results"><div><img src="https://financialmodelingprep.com/images-New-jpg/${symbol}.jpg"><a href="./company.html?symbol=${symbol}"> ${name} &nbsp (${symbol}) &nbsp </div><span class="data-box text-white p-1 border rounded ${price >=0 ? color = 'bg-success border-success': color = 'bg-danger border-danger'}">${price}%<span></a></li>`
            loading.classList.add('d-none')
        }
    }
}