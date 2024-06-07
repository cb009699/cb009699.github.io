



function initMap() {
    // The location of the company
    const companyLocation = [41.8781, -87.6298]; // Chicago, Illinois

    // Create a map centered on the company location
    const map = L.map('map').setView(companyLocation, 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker at the company location
    L.marker(companyLocation).addTo(map)
        .bindPopup('City Gourmet Catering and Culinary Solutions')
        .openPopup();

    // Try HTML5 geolocation to find the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = [position.coords.latitude, position.coords.longitude];

                // Add a marker at the user's location
                L.marker(userLocation, { icon: L.icon({ iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) })
                    .addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();

                // Adjust map bounds to include both markers
                const bounds = L.latLngBounds([companyLocation, userLocation]);
                map.fitBounds(bounds);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    const infoPopup = L.popup()
        .setLatLng(pos)
        .setContent(browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : 'Error: Your browser doesn\'t support geolocation.')
        .openOn(map);
}

// Load the map once the window has finished loading
window.addEventListener('load', initMap);