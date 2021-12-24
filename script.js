const searchBtn = document.querySelector('.searchBtn');
const ipAddressInput = document.querySelector('#ipAddressInput');
const infos = document.querySelectorAll('.info');
let ipInfos;
let ip='';
let loc = '';
let timezone = '';
let isp = '';
let latitude = '';
let longitude = '';

let map = L.map('map').setView([47.321305, 2.378648], 3);
let mapInit = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 1,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWF0Ym9vIiwiYSI6ImNreGozcmZ4NzBvc20yeXBlaWlsOWt3bnEifQ.1M3T1nPJ80A5kn_kNmFMbw'
})

mapInit.addTo(map);

const fetchIpInfos = async(ipAdress) => {
    ipInfos = await fetch(
        'https://geo.ipify.org/api/v2/country,city?apiKey=at_SixV2qr9Hla4JVwh5iZEfmxCdSglJ&ipAddress=' + ipAdress
    ).then(res => res.json());
    ip = ipInfos.ip;
    loc = ipInfos.location.city + ', ' + ipInfos.location.country;
    timezone = 'UTC' + ipInfos.location.timezone;
    isp = ipInfos.isp;
    latitude = ipInfos.location.lat;
    longitude = ipInfos.location.lng;
    infos[0].innerText = ip;
    infos[1].innerText = loc;
    infos[2].innerText = timezone;
    infos[3].innerText = isp;
    map.remove();
    map = L.map('map').setView([latitude, longitude], 13);
    mapInit.addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
}

searchBtn.addEventListener('click', () => {
     fetchIpInfos(ipAddressInput.value);     
});

ipAddressInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchIpInfos(ipAddressInput.value); 
    };
});
