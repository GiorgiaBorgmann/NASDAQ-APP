const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const symbol = urlParams.get('symbol')
const companyName = document.getElementById('companyName');
const imgSrc = document.getElementById('img-src')
const description = document.getElementById('description')
const website = document.getElementById('website')
const price = document.getElementById('price')
const changesPercentage = document.getElementById('changes-percentage')
let dateGraphic = [];
let dataGraphic = [];

function changeColor(value, obj) {

    if (value > 0) {
        obj.classList.add('text-success')
    } else {
        obj.classList.add('text-danger')
    }
}
async function FetchHttp(http, symbol) {
    let httpCompany = `${http}${symbol}`
    let response = await fetch(httpCompany)
    let newData = await response.json()
    return newData
}
async function FetchCompanyInformation() {
    let httpCompany = `http://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/`
    let newData = await FetchHttp(httpCompany, symbol)
    companyName.innerHTML = `${newData.profile.companyName}`
    imgSrc.src = `${newData.profile.image}`
    description.innerHTML = `${newData.profile.description}`
    website.innerHTML = `<a href="${newData.profile.website}"  target="_blank"> ${newData.profile.companyName}</a>`
    price.innerHTML = `Stock price: <b>$${newData.profile.price}</b>`
    changesPercentage.innerHTML = `<b>${parseFloat(newData.profile.changesPercentage.slice(1, -1))}</b>`
    changeColor(parseFloat(newData.profile.changesPercentage.slice(1, -1)), changesPercentage)
}
async function graphic() {
    let httpGraphic = "http://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/"
    let newData = await FetchHttp(httpGraphic, symbol)

    let dataGraphicLoop = newData.historical;
    for (let i = 0; i < dataGraphicLoop.length; i++) {
        dateGraphic.push(newData.historical[i].date)
        dataGraphic.push(newData.historical[i].close)
    }
    console.table(dateGraphic)
    console.table(dataGraphic)


}
graphic()

let ctx = document.getElementById('myChart').getContext('2d');

let myChart = new Chart(ctx, {
    type: 'bar',
    responsive: true,
    data: {
        labels: dateGraphic,
        datasets: [{
            label: 'stock price',
            data: dataGraphic,
            borderColor: ['rgb(255, 14, 198)']
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


FetchCompanyInformation()