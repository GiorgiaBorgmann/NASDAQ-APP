const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const symbol = urlParams.get('symbol')
const companyName = document.getElementById('companyName');
const imgSrc = document.getElementById('img-src')
const description = document.getElementById('description')
const website = document.getElementById('website')

console.log(symbol)
async function doFetch() {
    let httpCompany = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
    let response = await fetch(httpCompany)
    let newData = await response.json()
    companyName.innerHTML = `${newData.profile.companyName}`
    console.log(newData.profile.image)
    imgSrc.src = `${newData.profile.image}`
    description.innerHTML = `${newData.profile.description}`
    website.innerHTML = `${newData.profile.website}`
}


doFetch()