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
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
}

// initialize();

/**
 * * @author Rodrigo Alexandrino
 * Ler o arquivo json e cria os pontos no mapa
 */
function carregarPontos(filtro) {

    initialize();

    if(filtro == 0){
        $.getJSON('js/pontos.json', function (pontos) {
            var latlngbounds = new google.maps.LatLngBounds();
            lerArray(pontos, latlngbounds);
            map.fitBounds(latlngbounds);
        });

    }else{
        var latlngbounds = new google.maps.LatLngBounds();
        lerArray(filtro, latlngbounds);
        map.fitBounds(latlngbounds);        
    }

}

function lerArray(pontos, latlngbounds){
    //equivalente ao for
        $.each(pontos, function (index, ponto) {

            //criação do marcador
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                title: ponto.Universidade + " - " + ponto.Sigla,
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
                $("#pagina").html("<b>Página:</b> <a target=\"_blank\" href=\"" + ponto.Pagina +"\"\>" + ponto.Pagina +"</a>");
                $("#cidade").html("<b>Cidade/UF:</b> "+ ponto.Cidade + " / " + ponto.UF);
                $("#docentes").html("<b>Docentes:</b> "+ ponto.Docentes_Permanentes);
                $("#ano").html("<b>Ano Criação:</b> "+ ponto.Ano_Criacao);
                $("#qtde_mestrado").html("<b>Egressos Mestrado:</b> "+ ponto.Qtd_egresso_Mestrado);
                $("#qtde_doutorado").html("<b>Egressos Doutorado:</b> "+ ponto.Qtd_egresso_Doutorado);
                $("#bolsistas").html("<b>Bolsistas:</b> "+ ponto.Bolsistas);


                var linhasHTML = "<b>Linhas de Pesquisa:</b>";
                linhasHTML += '<ul>';
                $("#linhas_pesquisa").html(+ ponto.Linhas_de_Pesquisa);
                $.each(ponto.Linhas_de_Pesquisa, function (i, linha) {
                    linhasHTML += "<li>"+ linha.descricao +"</li>";
                });

                linhasHTML += '</ul>';
                $("#linhas_pesquisa").html(linhasHTML);
                $('#myModal').modal('open');
            });

            //adicionar no mapa
            markers.push(marker);

            //fixar no mapa
            marker.setMap(map);
            latlngbounds.extend(marker.position);
        });
}

carregarPontos(0);

$(".select_li").click(function(){

    //fecha o ul
    $('#category-list').toggle();

    var uf = String($(this).text());
    if(uf == 'TODOS'){
        Materialize.toast('Listando todos os Programa de Mestrado', 4000);
        carregarPontos(0);
        return;
    }
    var pontos_uf = [];
    $.getJSON('js/pontos.json', function (pontos) {
        $.each(pontos, function (index, ponto) {
            if(uf == ponto.UF){
                pontos_uf.push(ponto);
            }
        });

        if(pontos_uf.length > 0){
        Materialize.toast('Foram encontrados '+ pontos_uf.length+' Programa(s) de Mestrado em '+uf, 4000);    
            var latlngbounds = new google.maps.LatLngBounds();
            carregarPontos(pontos_uf, latlngbounds);
    }else{
        Materialize.toast('Não foi encontrado nenhum Programa de Mestrado encontrado', 4000);
    }
    });
});