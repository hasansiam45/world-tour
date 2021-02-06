
async function loadData(){
    const myData = await fetch('https://restcountries.eu/rest/v2/all')
    const updatedData = await myData.json();
    return updatedData;
}

loadData().then(data => {
    const countriesName = data.forEach(country => {    
        const countryName = country.name;
        const countries = document.getElementById('list');
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country';
        const countryInfo = `
        <h3 id="h3">${countryName}</h3>
        <button onclick = "displayCountryDetails('${countryName}')" id="btn">details</button>
        `   
        countryDiv.innerHTML = countryInfo;
        countries.appendChild(countryDiv);
    });           
})

const displayCountryDetails = name => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderCountryInfo(data[0]));
}

const renderCountryInfo = country => {
    const capital = country.capital;
    const area = country.area;
    const population = country.population;
    const flag = country.flag;

    const countryDiv = document.getElementById('country_details');
    countryDiv.innerHTML = `
    <p>Capital city: ${capital} </p>
    <p>Area: ${area} Km<sup>2</sup> </p>
    <p>Population: ${population} </p>
    <img src = "${flag}">  
    `   
}