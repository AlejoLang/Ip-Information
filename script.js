/* Inizialize the map */
let map = L.map('map').setView([0, 0], 13);

let marker = L.marker([0, 0]).addTo(map);

let circle = L.circle([0, 0], {
        color: '#00f',
        fillColor: '#30f',
        fillOpacity: 0.25,
        radius: 1000
}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

/* Declaring some elements*/
let ipInfoDiv = document.querySelector('.ipInformation');
let searchInput = document.querySelector('.searchInput');
let searchBtn = document.querySelector('.searchBtn');
let dropdownBtn = document.querySelector('.showDrpodownBtn');

const getIpInformation = async (url) => {
    let response = await fetch(url);
    return response.json();
}

const search = async (ip='') => {
    let ipData = await getIpInformation(`https://geo.ipify.org/api/v2/country,city?apiKey=at_fvkPSVPlWIxHouVNSJaaV5ae7rZDq&ipAddress=${ip}`);
    
    if(ipData.code == 422){
        alert('Error, invalid IP');
        return;
    }

    ipInfoDiv.querySelector('.ipInformation-ipNumber')
                .innerHTML = `<span class="divTitle">IP</span> ${ipData.ip}`;

    ipInfoDiv.querySelector('.ipInformation-location-country')
                .innerHTML = `
                    <img src="https://www.countryflagsapi.com/svg/${ipData.location.country}" alt="countryFlag" widht="38" height="24" class="ipInformation-location-country-flag">
                    ${ipData.location.country}
                `;

    ipInfoDiv.querySelector('.ipInformation-location-regCity')
                .textContent = `${ipData.location.city}, ${ipData.location.region}`;
    
    ipInfoDiv.querySelector('.ipInformation-ispInfo-ispName')
                .textContent = `${ipData.isp}`;

    ipInfoDiv.querySelector('.ipInformation-ispInfo-org')
                .textContent = `${ipData.as.name}`;

    map.setView([ipData.location.lat, ipData.location.lng], 13);
    marker.setLatLng([ipData.location.lat, ipData.location.lng]);
    circle.setLatLng([ipData.location.lat, ipData.location.lng]);
}

dropdownBtn.addEventListener('click', () => {
    if(dropdownBtn.value == 0){
        dropdownBtn.value = 1;
        dropdownBtn.innerHTML = '<i class="fa fas fa-solid fa-caret-up"></i>';
        ipInfoDiv.style.height = '60%';
    } else {
        dropdownBtn.value = 0;
        dropdownBtn.innerHTML = '<i class="fa fas fa-solid fa-caret-down"></i>';
        ipInfoDiv.style.height = '4rem';
    }
});

searchBtn.addEventListener('click', () => {
    search(searchInput.value);
    searchInput.value = '';
    searchBtn.blur();
})

window.addEventListener('load', () => {
    search();
});
