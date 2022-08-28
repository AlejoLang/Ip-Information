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

dropdownBtn.addEventListener('click', () => {
    if(dropdownBtn.value == 0){
        dropdownBtn.value = 1;
        dropdownBtn.innerHTML = '<i class="fa fas fa-solid fa-caret-up"></i>';
        ipInfoDiv.style.height = '60%';
    } else {
        dropdownBtn.value = 0;
        dropdownBtn.innerHTML = '<i class="fa fas fa-solid fa-caret-down"></i>';
        ipInfoDiv.style.height = '4.5rem';
    }
});

window.addEventListener('load', async () => {
    let ipData = await getIpInformation('http://ip-api.com/json/?fields=59099');
    console.log(ipData);
    ipInfoDiv.querySelector('.ipInformation-ipNumber')
                .innerHTML = `<span class="divTitle">IP</span> ${ipData.query}`;

    ipInfoDiv.querySelector('.ipInformation-location-country')
                .innerHTML = `
                    <img src="https://www.countryflagsapi.com/svg/${ipData.countryCode}" alt="countryFlag" widht="38" height="24" class="ipInformation-location-country-flag">
                    Argentina
                `;

    ipInfoDiv.querySelector('.ipInformation-location-regCity')
                .textContent = `${ipData.city}, ${ipData.regionName}`;
    
    ipInfoDiv.querySelector('.ipInformation-ispInfo-ispName')
                .textContent = `${ipData.isp}`;

    ipInfoDiv.querySelector('.ipInformation-ispInfo-org')
                .textContent = `${ipData.org}`;

    map.setView([ipData.lat, ipData.lon], 13);
    marker.setLatLng([ipData.lat, ipData.lon]);
    circle.setLatLng([ipData.lat, ipData.lon]);
});
