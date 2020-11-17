class SearchForm extends SearchResults {
    constructor(element) {
        super(element)
        this.searchInputs()
    }
    searchInputs() {
        this.element.addEventListener('click', async(event) => {
            let results = document.getElementById('search-input')
            results.innerHTML = ""
            event.preventDefault();
            await super.fetchUrl()
            await super.fetchUrlPrices()
            super.displayResultsSearch()
        })
    }
}