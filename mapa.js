let locationsInfo = [];
let markers;
let filtered=[];
let map;
let marker;

const getLocations = () => {
    fetch('https://cors-anywhere.herokuapp.com/api-electric-charger.herokuapp.com/electricCharger')
        .then(response => response.json())
        .then(locations => {
            // let locationsInfo = [];

            locations.forEach(location => {
                let locationData = {
                    id:location.id,
                    position:{lat:Number(location.geolocation.latitude),
                              lng:Number(location.geolocation.longitude)},
                    name:location.name,
                    cargador:location.plug_type,
                    costo:location.kw_price,
                    estatus: location.state,
                };
                locationsInfo.push(locationData)
            });

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((data)=>{
                    let currentPosition = {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    };
                    dibujarMapa(currentPosition, locationsInfo)
                })
            }
        })

};

const dibujarMapa = (obj, locationsInfo) => {
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 4,
        center: obj
    });

    marker = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    });
    marker.setMap(map);

    markers = locationsInfo.map(place => {
        return new google.maps.Marker({
            position: place.position,
            map: map,
            title: place.name,
            // title: place.cargador,
            // title: place.costo,
            // title: place.estatus
            // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        })
    })

};

let filterLocations= (criterio) => {
    let criterion= criterio;
    console.log(criterion);
    filtered=locationsInfo.filter(location => location.cargador === criterion);
    console.log(filtered);

    // if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data)=>{
            let currentPosition = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            };
            dibujarMapa(currentPosition, filtered)
        })
    // }

 /*   markers = filtered.map(place => {
        return new google.maps.Marker({
            position: place.position,
            map: map,
            title: place.name,
            // title: place.cargador,
            // title: place.costo,
            // title: place.estatus
            // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        })
    }) */

};



window.addEventListener('load',getLocations);
