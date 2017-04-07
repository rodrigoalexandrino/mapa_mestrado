var map;
var infoBox = [];
var markers = [];

/**
 * @author Rodrigo Alexandrino
 * Inicia o mapa na posição 0,0
 */
function initialize() {
    var latlng = new google.maps.LatLng(0, 0);

    var options = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
}

initialize();

/**
 * * @author Rodrigo Alexandrino
 * Ler o arquivo json e cria os pontos no mapa
 */
function carregarPontos() {

    $.getJSON('js/pontos.json', function (pontos) {

        var latlngbounds = new google.maps.LatLngBounds();

        //equivalente ao for
        $.each(pontos, function (index, ponto) {

            //criação do marcador
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                title: "Programa de Mestrado!",
                icon: 'img/marcador.png'
            });

            var myOptions = {
                content: "<p>" + ponto.Universidade + "</p>",
                pixelOffset: new google.maps.Size(-150, 0)
            };

            infoBox[ponto.Codigo] = new InfoBox(myOptions);
            infoBox[ponto.Codigo].marker = marker;

            //listener do clique no marcador
            infoBox[ponto.Codigo].listener = google.maps.event.addListener(marker, 'click', function (e) {
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