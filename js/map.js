---
---

// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZWRmaWVsZHdvcmsiLCJhIjoicTMwZTkydyJ9.PReYJSCAJ4cFTBOsINez8A';

var map = L.mapbox.map('map', 'edfieldwork.kb21lg3g', {
	zoomControl: false ,
	attributionControl: false
	})
  .setView([53.482035, -2.234324], 16);

new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);


var locations = [
	{
		title: "Planet Fieldwork",
		desc: "",
		lat: 53.482035,
		lng: -2.234324,
		type: "fieldwork"
	},
	{
		title: "Soup Kitchen",
		desc: "Hearty, veggie friendly grub",
		lat: 53.482752,
		lng: -2.234573,
		type: "eating"
	},
	{
		title: "Oi Polloi",
		desc: "The clothing mecca of the north",
		lat: 53.483688,
		lng: -2.235963,
	},
	{
		title: "Richard Goodall Gallery",
		desc: "Awesome collection of screen prints and vinyl toys",
		lat: 53.483844,
		lng: -2.236191,
	},
	{
		title: "Takk",
		desc: "Great sandwiches and coffee",
		lat: 53.481108,
		lng: -2.232768,
	},
	{
		title: "Port St",
		desc: "Game changing beer selection",
		lat: 53.482050,
		lng: -2.231968,
	},

	// {
	// 	title: "",
	// 	desc: "Mozza's",
	// 	lat: 53.481548, 
	// 	lng: -2.236630
	// },
	// {
	// 	title: "",
	// 	desc: "Pie 'n' mash",
	// 	lat: 53.482845,
	// 	lng: -2.236148,
	// 	type: "eating"
	// },
	// {
	// 	title: "",
	// 	desc: "Chip barms",
	// 	lat: 53.484083,
	// 	lng: -2.234382,
	// 	type: "eating"
	// },
	// {
	// 	title: "",
	// 	desc: "Drinks on the Terrace",
	// 	lat: 53.484181,
	// 	lng: -2.236759,
	// 	type: "drinking"
	// },
	// {
	// 	title: "",
	// 	desc: "Kosmonaut",
	// 	lat: 53.481226,
	// 	lng: -2.232364,
	// 	type: "drinking"
	// },
	// {
	// 	title: "",
	// 	desc: "Posh Sandwiches",
	// 	lat: 53.480078,
	// 	lng: -2.238798,
	// 	type: "eating"
	// },
	// {	
	// 	title: "",
	// 	desc: "South of Little Italy",
	// 	lat: 53.483575,
	// 	lng: -2.237054,
	// 	type: "eating"
	// },
	// {	
	// 	title: "",
	// 	desc: "Burgers 'n' gherkins",
	// 	lat: 53.480581,
	// 	lng: -2.248030,
	// 	type: "eating"
	// }
];

var myLayer = L.mapbox.featureLayer().addTo(map);
var geoJson = [];

for (var i = 0 ; i < locations.length ; i++){

	geoJson.push({
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        coordinates: [locations[i].lng, locations[i].lat]
	    },
	    content: locations[i].desc,
	    properties: {
	    	'title': i == 0 ? locations[i].title : locations[i].title + '<div style="opacity:0.7">'+locations[i].desc+'</div>',
            icon: {
	            // "iconUrl": i == 0 ? "../images/map/marker-red.svg" : "../images/map/marker-turquoise.svg",
	            "iconUrl": i == 0 ? "{{site.asseturl}}/images/map/marker-red.svg" : "{{site.asseturl}}/images/map/marker-turquoise.svg",
	            "iconSize": [24, 33], // size of the icon
	            "iconAnchor": [12, 33], // point of the icon which will correspond to marker's location
	            "popupAnchor": [0, -45], // point from which the popup should open relative to the iconA
	        }
	    }
	});

}

myLayer.on('layeradd', function(e) {
    var marker = e.layer,
    feature = marker.feature;
    marker.setIcon(L.icon(feature.properties.icon));
});


myLayer.setGeoJSON({
	features: geoJson
});

myLayer.on('click', function(e) {
	map.panTo(e.layer.getLatLng());
	if (e.layer.feature.properties.title == "Planet Fieldwork"){
		$(".leaflet-popup-content-wrapper").css("background", "#F7323F");
		$(".leaflet-popup-tip").css("border-top-color", "#F7323F");
	} else {
		$(".leaflet-popup-content-wrapper").css("background", "#00C4B3");
		$(".leaflet-popup-tip").css("border-top-color", "#00C4B3");
	}
	$(".js-map-info").html()
});


map.scrollWheelZoom.disable();