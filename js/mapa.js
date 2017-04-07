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

/**
 * Ler o arquivo json e cria os pontos no mapa
 */
function carregarPontos() {

    $.getJSON('js/pontos.json', function (pontos) {

        var latlngbounds = new google.maps.LatLngBounds();

        $.each(pontos, function (index, ponto) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                title: "Meu ponto personalizado!",
                icon: 'img/marcador.png'
            });

            var myOptions = {
                content: "<p>" + ponto.Universidade + "</p>",
                pixelOffset: new google.maps.Size(-150, 0)
            };

            infoBox[ponto.Codigo] = new InfoBox(myOptions);
            infoBox[ponto.Codigo].marker = marker;

            infoBox[ponto.Codigo].listener = google.maps.event.addListener(marker, 'click', function (e) {
                // programa
                // cidade
                // docentes
                // ano
                // qtde_mestrado
                // qtde_doutorado
                // bolsistas
                $("#universidade").html(ponto.Universidade + " - " + ponto.Sigla);
                $("#programa").html('<b>Curso:</b> '+ ponto.Curso);
                $("#codigo_programa").html("<b>Código:</b> "+ ponto.Codigo);
                $("#pagina").html("<b>Página:</b> "+ ponto.Pagina);
                $("#linhas_pesquisa").html("<b>Linhas de Pesquisa:</b> "+ ponto.Linhas_de_Pesquisa);
                $("#cidade").html("<b>Cidade/UF:</b> "+ ponto.Cidade + " / " + ponto.UF);
                $("#docentes").html("<b>Docentes:</b> "+ ponto.Docentes_Permanentes);
                $("#ano").html("<b>Ano:</b> "+ ponto.Ano_Criacao);
                $("#qtde_mestrado").html("<b>Egressos Mestrado:</b> "+ ponto.Qtd_egresso_Mestrado);
                $("#qtde_doutorado").html("<b>Egressos Doutorado:</b> "+ ponto.Qtd_egresso_Doutorado);
                $("#bolsistas").html("<b>Bolsistas:</b> "+ ponto.Bolsistas);
                $('#myModal').modal('show');
            });

            //adicionar no mapa
            markers.push(marker);

            //fixar no mapa
            marker.setMap(map);
            latlngbounds.extend(marker.position);
        });

        map.fitBounds(latlngbounds);

    });

}

carregarPontos();