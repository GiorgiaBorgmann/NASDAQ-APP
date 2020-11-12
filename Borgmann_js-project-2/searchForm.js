class SearchForm extends SearchResults {
    constructor(element) {
        this.element = element;
        this.inputElement = ""
    }
    searchInputs() {
        let executeFunction = displayResultsSearch()
        this.element.addEventListener('click', executeFunction)
    }
}