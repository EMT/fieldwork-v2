$(function(){
	var map;
	var markers = [];
	var locations = [
		{
			title: "",
			desc: "Planet Fieldwork",
			lat: 53.482035,
			lng: -2.234324,
			type: "fieldwork"
		},
		{
			title: "Soup Kitchen",
			desc: "Soup, soup, a tasty soup, soup.",
			lat: 53.482752,
			lng: -2.234573,
			type: "eating"
		},
		// {
		// 	title: "",
		// 	desc: "Mozza's",
		// 	lat: 53.481548, 
		// 	lng: -2.236630
		// },
		{
			title: "",
			desc: "Pie 'n' mash",
			lat: 53.482845,
			lng: -2.236148,
			type: "eating"
		},
		{
			title: "",
			desc: "Chip barms",
			lat: 53.484083,
			lng: -2.234382,
			type: "eating"
		},
		{
			title: "",
			desc: "Drinks on the Terrace",
			lat: 53.484181,
			lng: -2.236759,
			type: "drinking"
		},
		{
			title: "",
			desc: "Kosmonaut",
			lat: 53.481226,
			lng: -2.232364,
			type: "drinking"
		},
		{
			title: "",
			desc: "Posh Sandwiches",
			lat: 53.480078,
			lng: -2.238798,
			type: "eating"
		},
		{	
			title: "",
			desc: "South of Little Italy",
			lat: 53.483575,
			lng: -2.237054,
			type: "eating"
		},
		{	
			title: "",
			desc: "Burgers 'n' gherkins",
			lat: 53.480581,
			lng: -2.248030,
			type: "eating"
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

		
		// var marker = new google.maps.Marker({
		//   // icon: image,
		//   map: map,
		//   position: latlng,
		//   title: "Planet Fieldwork"
		// });
		
		
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
		if (locations[i].type == "drinking"){
			imagePath = "/fieldwork-v2/images/map/marker-orange.svg";
		} else if (locations[i].type == "eating"){
			imagePath = "/fieldwork-v2/images/map/marker-turquoise.svg";
		} else {
			imagePath = "/fieldwork-v2/images/map/marker-red.svg";
		}
		var image = new google.maps.MarkerImage(imagePath);

		markers.push(new google.maps.Marker({
			icon: image,
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