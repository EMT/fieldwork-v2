// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZWRmaWVsZHdvcmsiLCJhIjoicTMwZTkydyJ9.PReYJSCAJ4cFTBOsINez8A';

var map = L.mapbox.map('map', 'edfieldwork.kb21lg3g', { zoomControl: false })
  .setView([53.482, -2.235], 16);

new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);


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
	    	'title': locations[i].desc,
            'marker-color': i == 0 ? '#e83944' : '#00c4b3'
	    }
	});

}


myLayer.setGeoJSON({
  features: geoJson
});
myLayer.on('click', function(e) {
      map.panTo(e.layer.getLatLng());
      $(".js-map-info").html()
  });

// myLayer.eachLayer(function(marker) {
// 	marker.on('click', function(e){
// 		$(".js-map-info h2").html(marker.feature.content);
// 	})
// })

map.scrollWheelZoom.disable();

// function resetColors() {
//     for (var i = 0; i < geoJson.length; i++) {
//         geoJson[i].properties['marker-color'] = geoJson[i].properties['old-color'] ||
//             geoJson[i].properties['marker-color'];
//     }
//     // myLayer.setGeoJSON(geoJson);
// }

// myLayer.on('click', function(e) {
//     resetColors();
//     e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
//     e.layer.feature.properties['marker-color'] = '#ff8888';
//     myLayer.setGeoJSON(geoJson);
// });

// map.on('click', resetColors);

