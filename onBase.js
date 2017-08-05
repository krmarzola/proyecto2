$(document).ready(function () {
    var icons = {
        header : "ui-icon-circle-arrow-e"
    };
    $("#tabs").tabs();
    $("#accordion").accordion( {
        header : "h3", animated : "bounceslide", collapsible : true, icons : icons, autoHeight : false, active : false
    });
});

function repintarDocumentosOnbase(divOnBase) {
    //alert('repintarDocumentosOnbase');
    $("#" + divOnBase).html("<fieldset id='documentosOnbase'><\/fieldset>");
    $("#documentosOnbase").load("jsp/util/onBase/listaDocumentosOnbase.jspf");
}

function constructorOnbase() {
    //alert('constructorOnbase');
    $("body").append('<div id="dialogImportar" style="display:none;" title="Cargar un documento"><\/div>');
    $("#dialogImportar").dialog( {
        autoOpen : false, resizable : false, width : "100px", modal : true
    });
    $("#btnImportar").live('click', function (e) {
        document.getElementById("dialogImportar").innerHTML = "";
        $('#dialogImportar').load("jsp/util/onBase/CargarArchivos.jsp");
        $("#dialogImportar").dialog('open');
    });
}