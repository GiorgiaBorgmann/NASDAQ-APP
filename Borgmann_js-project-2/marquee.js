class Marquee {
    constructor(element) {
        this.element = element;
        this.data = []
    }
    async fetchUrl(endpoint) {
        let response = await fetch(endpoint)
        let data = await response.json()
        this.data = data
    }
    injectData() {
        for (let i = 0; i < this.data.length; i++) {
            let symbol = this.data[i].symbol[0] == "^" ? this.data[i].symbol.slice(1) : this.data[i].symbol
            let changePer = this.data[i].changesPercentage
            let color = ""
            this.element.innerHTML += `<li class="text-white"> ${symbol} <span class=" text-white p-1 border rounded ${changePer >=0 ? color = 'bg-success border-success': color = 'bg-danger border-danger'}">${changePer}%</span></li>`

        }
        this.element.classList.remove('d-none')
    }
}