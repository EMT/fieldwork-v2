$(function(){
	var map;
	var markers = [];
	var locations = [
		{
			title: "",
			desc: "Planet Fieldwork",
			lat: 53.482035,
			lng: -2.234324
		},
		{
			title: "Soup Kitchen",
			desc: "Soup, soup, a tasty soup, soup.",
			lat: 53.482752,
			lng: -2.234573
		},
		{
			title: "",
			desc: "Mozza's",
			lat: 53.481548, 
			lng: -2.236630
		},
		{
			title: "",
			desc: "Pie 'n' mash",
			lat: 53.482845,
			lng: -2.236148
		},
		{
			title: "",
			desc: "Chip barms",
			lat: 53.484083,
			lng: -2.234382
		}
	];

	// Google Map
	function initializeMap() {
		var latlng = new google.maps.LatLng(53.482035,-2.234324);
		var settings = {
			zoom: 16,
			center: latlng,
			scrollwheel: true,
			navigationControl: false,
			scaleControl: false,
			streetViewControl: false,
			draggable: true,
			scrollwheel: false, 
			mapTypeControl: false,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: false,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById('js-map'), settings);

		// var image = new google.maps.MarkerImage('image path');
		
		var marker = new google.maps.Marker({
		  // icon: image,
		  map: map,
		  position: latlng,
		  title: "Planet Fieldwork"
		});
		
		
		var map_styles = [
		  {
		    featureType: "all",
		    stylers: [
		      { saturation: -100 }
		    ]
		  }
		];
		
		map.setOptions({styles: map_styles});
		
	}

	function setupListener(infoWindow,marker){
		google.maps.event.addListener(marker, 'click', function() {
		  infoWindow.open(map,marker);
		});
	}


	initializeMap();

	for (var i = 0 ; i < locations.length ; i++){
		markers.push(new google.maps.Marker({
		  // icon: image,
			map: map,
			position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
			title: locations[i].desc
		}));

		var infoWindow = new google.maps.InfoWindow({
		     content: locations[i].desc
		 });

		setupListener(infoWindow,markers[i])

	}
})