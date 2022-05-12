function initMap() {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    let chicago = new google.maps.LatLng(41.850033, -87.6500523);
    let mapOptions = {
      zoom:7,
      center: chicago
    }
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
  }

  function calcRoute() {
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }
