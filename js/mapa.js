var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];

function initialize() {	
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
}

initialize();

function carregarPontos() {
	
	$.getJSON('js/pontos.json', function(pontos) {
		
		var latlngbounds = new google.maps.LatLngBounds();
		
		$.each(pontos, function(index, ponto) {
			console.log(ponto.Latitude + " - "+ ponto.Longitude);
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
				title: "Meu ponto personalizado!"
			});
			
			var myOptions = {
				content: "<p>" + ponto.Universidade + "</p>",
				pixelOffset: new google.maps.Size(-150, 0)
        	};

			infoBox[ponto.Codigo] = new InfoBox(myOptions);
			infoBox[ponto.Codigo].marker = marker;
			
			infoBox[ponto.Codigo].listener = google.maps.event.addListener(marker, 'click', function (e) {
				$('#myModal').modal('show');
			});
			
			markers.push(marker);
			
			latlngbounds.extend(marker.position);
			
		});
		
		
		map.fitBounds(latlngbounds);
		
	});
	
}

carregarPontos();