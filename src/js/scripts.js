//= jquery-1.11.1.min.js
if ($('#map').length>0) {
  google.maps.event.addDomListener(window, 'load', init_map);
}     
function init_map() {
  var mapOptions = {
      zoom: 16,
      center: new google.maps.LatLng(54.179666, 45.163358), 
      disableDefaultUI: true,
      zoomControl: true,
      streetViewControl: true,
      styles: [
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#c0a7a7"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#958e8e"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "0"
                },
                {
                    "lightness": "65"
                },
                {
                    "gamma": "0.95"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": "0"
                },
                {
                    "weight": "2.21"
                },
                {
                    "color": "#1c1818"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffe111"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "saturation": "0"
                },
                {
                    "lightness": "0"
                },
                {
                    "weight": "0.5"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#898282"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eff1f2"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        }
    ]
  };

  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, mapOptions);
  var image = {
    url: '/img/template/map.svg',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(48, 45),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(25, 45)
  };
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(54.179656, 45.170482),
      icon: image,
      map: map,
  });
}