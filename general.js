/* 
  - Autor(es): Maria Paula Cabra Silva
  - Fecha: 18/01/2012
  - Descripcion: General para Flujo CSC
*/
var multiploVerificacion;

$.ajaxSetup({ contentType : 'application/x-www-form-urlencoded; charset=UTF-8' });

$(document).ready(function(){ Notificador.init(); });

var Notificador = 
{
    init : function() 
    {
        $.extend($.gritter.options, 
        {
            position : 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
            fade_in_speed : 'medium', // how fast notifications fade in (string or int)
            fade_out_speed : 2000// how fast the notices fade out
        });
    },
    mostrarMensaje : function (titulo, mensaje) 
    {
        return $.gritter.add({ title : titulo, text : "<img src='js/jquery/ui/v182/theme/images/ui-anim_basic_16x16.gif' border=''/> " + mensaje, sticky : true });
    },
    ocultarMensaje : function (unique_id) 
    {
        $.gritter.remove(unique_id, 
        {
            fade : true, // optional
            speed : 'fast'// optional
        });
    }
}//Notificador

function generarNotaDebitoCredito(datalista,tarea)
{
     var temp = JSON.stringify(datalista);
     $.ajax({
        type : "POST", url : "cuentatransaccionservlet", async : true, data :  {
            "accion" : 1,
            "listaNotas":temp
        },
        cache : false, dataType : 'json', success : function (data) {
            if (data.e == "0")
            {
                if(tarea==1){
                    alert("ASIGNA V4");
                    //consumirAsignaSBO($("#CRealizoTramite").val());
                }
                return true;
            }
            if (data.e == "1")
            {
              dialogo('Nota Debito/Credito ','No fue posible Crear la nota Debito/Credito, intentar nuevamente y si el error persiste consulte con el administrador. '+ data.expNotaDebito);
              return false;
            }
        },
        error:function (response)
        {
           dialogo('Nota Debito/Credito', 'No fue posible Crear la nota Debito/Credito, intentar nuevamente y si el error persiste consulte con el administrador.' + response.responseText);
           return false;
        }
    });
}

function obtenerExpresionesRegulares(codigoFormulario)
{
    var resultado = '';
    $.ajax(
    {
        type:"POST", 
        url:"cscMlServlet", 
        async:false, 
        data:{ "accion" : 2, "codigoFormulario" : codigoFormulario },
        cache:false, 
        dataType:'json', 
        success:function(data)
        {
            if (data.codigo == 0)
                resultado = data.expresionesRegulares;
            else 
                dialogo("Expresiones Regulares", "No fue posible obtener las Expresiones Regulares para el formulario " + codigoFormulario + ". " + data.descripcion);
        },
        error:function()
        {
            dialogo('Expresiones Regulares', 'No es posible ejecutar el proceso');
        }
    });
    return resultado;
}//obtenerExpresionesRegulares

function digitoDeVerificacion(numID) 
{
    var numid1 = (numID.substring(0, 1) * 1).toString();
    var numid2 = (numID.substring(1, 2) * 2).toString();
    var numid3 = (numID.substring(2, 3) * 1).toString();
    var numid4 = (numID.substring(3, 4) * 2).toString();
    var numid5 = (numID.substring(4, 5) * 1).toString();
    var numid6 = (numID.substring(5, 6) * 2).toString();
    var numid7 = (numID.substring(6, 7) * 1).toString();
    var numid8 = (numID.substring(7, 8) * 2).toString();
    var numid9 = (numID.substring(8, 9) * 1).toString();

    var sumaid1 = "";
    var sumaid2 = "";
    var sumaid3 = "";
    var sumaid4 = "";
    var sumaid5 = "";
    var sumaid6 = "";
    var sumaid7 = "";
    var sumaid8 = "";
    var sumaid9 = "";

    if(numid1.length == 2) { sumaid1 = parseInt(numid1.substring(0, 1)) + parseInt(numid1.substring(1, 2)); }
    else { sumaid1 = numid1; }
    if(numid2.length == 2) { sumaid2 = parseInt(numid2.substring(0, 1)) + parseInt(numid2.substring(1, 2)); }
    else { sumaid2 = numid2; }
    if(numid3.length == 2) { sumaid3 = parseInt(numid3.substring(0, 1)) + parseInt(numid3.substring(1, 2)); }
    else { sumaid3 = numid3; }
    if(numid4.length == 2) { sumaid4 = parseInt(numid4.substring(0, 1)) + parseInt(numid4.substring(1, 2)); }
    else { sumaid4 = numid4; }
    if(numid5.length == 2) { sumaid5 = parseInt(numid5.substring(0, 1)) + parseInt(numid5.substring(1, 2)); }
    else { sumaid5 = numid5; }
    if(numid6.length == 2) { sumaid6 = parseInt(numid6.substring(0, 1)) + parseInt(numid6.substring(1, 2)); }
    else { sumaid6 = numid6; }
    if(numid7.length == 2) { sumaid7 = parseInt(numid7.substring(0, 1)) + parseInt(numid7.substring(1, 2)); }
    else { sumaid7 = numid7; }
    if(numid8.length == 2) { sumaid8 = parseInt(numid8.substring(0, 1)) + parseInt(numid8.substring(1, 2)); }
    else { sumaid8 = numid8; }
    if(numid9.length == 2) { sumaid9 = parseInt(numid9.substring(0, 1)) + parseInt(numid9.substring(1, 2)); }
    else { sumaid9 = numid9; }

    var sum = (parseInt(sumaid1) + parseInt(sumaid2) + parseInt(sumaid3) + parseInt(sumaid4) + parseInt(sumaid5) + parseInt(sumaid6) + parseInt(sumaid7) + parseInt(sumaid8) + parseInt(sumaid9));
    var x = round(sum);
    multiploVerificacion = x - sum;
    return multiploVerificacion;

}//digitoDeVerificacion

function round(numero) 
{
    var resultado = "";
    var res = numero.toString();
    var evaluado = "";;
    if(res.length == 1) { res = "0" + res; }
    evaluado = res.substring(1);
    if(evaluado == 0) { resultado = numero; }
    else 
    {
        var diferencia = 10 - evaluado;
        resultado = diferencia + numero;
    }
    return resultado;
}//round

function construirDialogMensaje() 
{
    $("#consultaTablaDialog").dialog(
    {
        bgiframe:true, 
        autoOpen:false, 
        resizable:true, 
        draggable:true, 
        modal:true, 
        width:"75%", 
        position:'center', 
        buttons: { "Aceptar" : function(){ $(this).dialog("close"); } },
        open : function(){ $('.ui-dialog-buttonpane').find('button:contains("Aceptar")').button({ icons : { primary : 'ui-icon-check' } }); }
    });
}//construirDialogMensaje

function crearDialogVerURLFirmasGeneral()
{
    $("#dialogVerURLFirmas").dialog(
    { 
        autoOpen: false,
        resizable: true,
        draggable: true,
        modal: true,
        width: "85%", 
        height: 600,
        position: 'center',
        buttons: { "Aceptar": function() { $(this).dialog("close"); }},
        open: function() { $('.ui-dialog-buttonpane').find('button:contains("Aceptar")').button({ icons:{primary: 'ui-icon-check'}}); }
    }); 
}//crearDialogVerURLFirmasGeneral

function mensajeDialog(titulo, sMensaje) 
{
    $("#consultaTablaDialog").html(sMensaje);
    $("#consultaTablaDialog").dialog('option', 'title', titulo);
    $("#consultaTablaDialog").dialog('open');
}//mensajeDialog

var EndPoint = 
{
    consultar : function()
    {
        var resultado;
        $.ajax(
        {
            type:"POST", 
            url:"cscMlServlet", 
            async:false, 
            data:{ "accion" : 6, "aplicacion" : "WS", "parametro" : "SEND_MAIL" },
            cache:false, 
            dataType:'json', 
            success:function(data)
            {
                if(data.codigo == 0){ resultado = data.resultado; }
                else { alert(data.descripcion); }
            },
            error : function() 
            {
                alert('No es posible ejecutar el proceso');
            }
        });
        return resultado;
    }
}//EndPoint

var GrupoEnvio = 
{
    consultar : function() 
    {
        var resultado;
        $.ajax( 
        {
            type:"POST", 
            url:"cscMlServlet", 
            async:false, 
            data:{ "accion" : 6, "aplicacion" : "WS", "parametro" : "SEND_MAIL" },
            cache:false, 
            dataType:'json', 
            success:function(data)
            {
                if(data.codigo == 0){ resultado = data.resultado; }
                else { alert(data.descripcion); }

            },
            error:function(){ alert('No es posible ejecutar el proceso'); }
        });
        return resultado;
    }
}//GrupoEnvio

function format_url(variable) 
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0;i < vars.length;i++) 
    {
        var pair = vars[i].split("=");
        if(pair[0] == variable) { return pair[1] }
    }
}//format_url

function irBandejaGeneral(tiempoEfectivo)
{
    $.post("cscMlServlet", { "accion" : 5, "ppe" : queryObj["ppe"], "sid" : queryObj["sid"], "usuario" : queryObj["usuario"], "dominio" : queryObj["dominio"], 
                             "mafTareaId" : queryObj["tareaId"], "appSolicitudUsuarioId" : queryObj["solicitudUsuarioId"], "tiempoEfectivo" : tiempoEfectivo },
    function (dataIrBandeja)
    {
        if (dataIrBandeja.codigo == 0)
        {
            $(location).attr('href', dataIrBandeja.resultado + "?ppe=" + queryObj["ppe"] + "&sid=" + queryObj["sid"] + "&solicitudUsuarioId=" + queryObj["solicitudUsuarioId"] + "&idrol=" + queryObj["idrol"] + "&idapp=" + queryObj["idapp"] + "&tareaId=" + queryObj["tareaId"] + "&credenciales=" + queryObj["credenciales"]);
        }
        else 
        {
            alert(dataIrBandeja.descripcion);
        }
        return false;
    });
}
//irBandejaGeneral
function irBandejaGeneralRatificar(tiempoEfectivo)
{          
    $.post("cscMlServlet", {  "accion":9, "ppe" : queryObj["ppe"], "sid" : queryObj["sid"], "usuario" : queryObj["usuario"], "dominio" : queryObj["dominio"], 
                              "mafTareaId" : queryObj["tareaId"], "solicitudPadreId" : queryObj["solicitudPadreId"], "tiempoEfectivo" : tiempoEfectivo },
    function(dataIrBandeja)
    {
        if (dataIrBandeja.codigo == 0)
        {
            $(location).attr('href', dataIrBandeja.resultado + "?ppe=" + queryObj["ppe"] + "&sid=" + queryObj["sid"] + "&solicitudUsuarioId=" + queryObj["solicitudUsuarioId"] + "&idrol=" + queryObj["idrol"] + "&idapp=" + queryObj["idapp"] + "&tareaId=" + queryObj["tareaId"] + "&credenciales=" + queryObj["credenciales"]);
        }
        else 
        {
            alert(dataIrBandeja.descripcion);
        }
        return false;
    });
}//irBandejaGeneral

function repintarDocumentosOnbase(idDivOnbase)
{
    $("#"+idDivOnbase).html("<fieldset id='documentosOnbase'><\/fieldset>");
    //$("#documentosOnbase").load("dominio/Plantilla/onBase/listaDocumentosOnbase.jspf");//js/util/listaDocumentosOnbase.js
    $("#documentosOnbase").load("jsp/util/onBase/listaDocumentosOnbase.jspf");
}//repintarDocumentosOnbase

function constructorOnbase()
{
    $("body").append('<div id="dialogImportar" style="display:none;" title="Cargar Documento"><\/div>');
    $("#dialogImportar").dialog({ autoOpen : false, resizable : false , width:"50%", height:180, modal : true});
    $("#btnImportar").live('click', function(e)
    {   
        document.getElementById("dialogImportar").innerHTML = "";
        $('#dialogImportar').load("jsp/util/onBase/CargarArchivos.jsp");//js/util/CargaArchivos.js
        $("#dialogImportar").dialog('open');
   });
}//constructorOnbase
 
function constructorDatatables(id)
{
    var oTable = $('#' + id).dataTable({ 'bSort': false });
    var filtros = $('#' + id + " thead:last").find("tr th input");
    $(filtros).keyup(function(){ oTable.fnFilter(this.value, $(filtros).index(this)); });
}//constructorDatatables

function calcularDigitoVerificacionNIT(nombreCampoNIT)
{
    var numeroPrimo;  
    var x, y, z, i;
    var digitoVerificacion; 
    var valorCampoNIT;
    
    var numeroIdentificacion = $('#' + nombreCampoNIT).val();
    numeroIdentificacion = numeroIdentificacion.substring(0,numeroIdentificacion.length-1);
    
    valorCampoNIT = numeroIdentificacion;

    numeroPrimo = new Array(16);
    x = 0;
    y = 0;
    z = valorCampoNIT.length;
    
    numeroPrimo[1] = 3;
    numeroPrimo[2] = 7;
    numeroPrimo[3] = 13;
    numeroPrimo[4] = 17;
    numeroPrimo[5] = 19;
    numeroPrimo[6] = 23;
    numeroPrimo[7] = 29;
    numeroPrimo[8] = 37;
    numeroPrimo[9] = 41;
    numeroPrimo[10] = 43;
    numeroPrimo[11] = 47;
    numeroPrimo[12] = 53;
    numeroPrimo[13] = 59;
    numeroPrimo[14] = 67;
    numeroPrimo[15] = 71;
    
    for (i = 0; i < z; i++)
    {
        y = (valorCampoNIT.substr(i, 1));
        x += (y * numeroPrimo[z - i]);
    }
    y = x % 11
    
    if (y > 1)
        digitoVerificacion = 11 - y;
    else 
        digitoVerificacion = y;
    
    return digitoVerificacion;
}//calcularDigitoVerificacionNIT

function textAreaNoEditableXId(idText)
{
    $("#" + idText).prop('readonly', true);
    $("#" + idText).css('background-color', '#E6E6E6');
    $("#" + idText).css('border', 'solid 1px #BDBDBD');
}

function valAutocomplete(dato, valorCampo, idCampo)
{
    control = false;
    $.each(dato, function (i, item)
    {
        if (item.value == valorCampo)
        {
            control = true;
            return control;
        }
    });
    if (control == false)
    {
        $("#" + idCampo + "").val("");
    }
    return control;
}

function reemplazarPuntosComas(source, stringToFind, stringToReplace)
{
    var temp = source;
    var index = 0;
    index = temp.indexOf(stringToFind);
    while (index !=  - 1)
    {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}//reemplazarPuntosComas

/**
 * Abre un dialogo
 * @param titulo 
 * @param contenido 
 */
function dialogo(titulo, contenido)
{
    var $dialog = $('<div align=center><\/div>').html(contenido).dialog(
    {
        autoOpen : true, 
        title : titulo, 
        modal : true, 
        resizable : false, 
        width : "40%", 
        draggable : true,
        buttons : { "Aceptar" : function (){ $(this).dialog("close"); } },
        open : function (){ $('.ui-dialog-buttonpane').find('button:contains("Aceptar")').button({ icons : { primary : 'ui-icon-check' } }); }
    });
    return $dialog;
}
// FIN Dialogo
function detalleOperacion(idXCodigo, indicadorTarea, solicitudPadreId, tareaId, codigoTarea)
{    
    var urlFormulario = idXCodigo.split(",")[1];
    $("#hdnCscSolicitudOperacionId").val(idXCodigo.split(",")[0]);
    $("#dialogDetalleOperacion").load(urlFormulario, function ()
    {
        construir_detalleOperacion(solicitudPadreId, tareaId, codigoTarea);
        Notificador.init();
    });
}

function construir_detalleOperacion(solicitudPadreId, tareaId, codigoTarea)
{
    $("#dialogDetalleOperacion").dialog(
    {
        modal : true, 
        resizable : true, 
        autoOpen: true,
        width: "97%",
        draggable: true,
        position: "top", 
        buttons:
        {             
            "Regresar" : function ()
            { 
                visacionFirmasGeneral("Detalle Operaci&oacute;n", solicitudPadreId, tareaId, 1);
                if(codigoTarea == "MLVISARCONFIRMAR2" || codigoTarea == "MLVISARCONFIRMAR3" || codigoTarea == "MLVISARCONFIRMAR")
                {
                    actualizarTablaOperacionSolicitudPorDetalleOperacion();
                }
                $(this).dialog("destroy");
            }
        },
        open : function(){ $('.ui-dialog-buttonpane').find('button:contains("Regresar")').button({ icons:{ primary: 'ui-icon-arrowthick-1-w' } }); }, 
        close: function(event, ui) { $(this).validationEngine("hideAll") }
    });
} //construir_detalleOperacion

/**
 * 
 * @param tituloMensajeDialogo 
 * @param appSolicitudId 
 * @param mafTareaId 
 * @param indicador: Mostrar boton -> 0, no mostrar -> 1
 */
function visacionFirmasGeneral(tituloMensajeDialogo,solicitudPadreId,mafTareaId,indicador)
{
    var gritterIdVF = Notificador.mostrarMensaje('Consultando TS Cuentas Relacionadas', 'Un momento por favor...');
    $.post("visacionservlet", {"accion":10, "solicitudPadreId":solicitudPadreId, "tareaId":mafTareaId, 
                               "dato1":$("#dato1").val(), "dato2":$("#dato2").val(), "dato3":$("#dato3").val(), "dato4":$("#dato4").val()},
    function(dataVisacionFirmas) 
    {   
        if (dataVisacionFirmas.e == '0')
        {
            Notificador.ocultarMensaje(gritterIdVF);
            if (dataVisacionFirmas.estadoRespuesta > 0)
            {
                if (indicador == 1)
                    $('#botonConsultaTSCuentas').show();
            }
            datosTablaCuentasRelacionadas = dataVisacionFirmas._esquemas;
            crearTablaVisacionGeneral(dataVisacionFirmas, "TS");
        }
        else  if(dataVisacionFirmas.e == '1')
        {
            Notificador.ocultarMensaje(gritterIdVF);
            mensajeDialog(tituloMensajeDialogo, dataVisacionFirmas.expVisacionFirmas );  
        }
    })
    .error(function (response)
    {
        Notificador.ocultarMensaje(gritterIdVF);
        mensajeDialog(tituloMensajeDialogo, 'No fue posible obtener la informaci&oacuten de las cuentas seleccionadas en al solicitud.' + response.responseText);
    });
}//visacionFirmasGeneral

function cuantasDebitarGeneral(tituloMensajeDialogo, solicitudUsuarioId, mafTareaId, indicador)
{
    var gritterIdVF = Notificador.mostrarMensaje('Consultando TS Cuentas Relacionadas', 'Un momento por favor...');
    $.ajax(
    {
        type : "POST", 
        url : "cuentatransaccionservlet",
        async : false, 
        data : { "accion":2, "solicitudUsuarioId":solicitudUsuarioId, "tareaId":mafTareaId, "dato1":$("#dato1").val(), "dato2":$("#dato2").val(), 
                 "dato3":$("#dato3").val(), "dato4":$("#dato4").val() },
        cache : false, 
        dataType : 'json', 
        success : function (data)
        {
            if (data.e == '0')
            {
                Notificador.ocultarMensaje(gritterIdVF);
                if (data.estadoRespuesta > 0)
                {
                    if (indicador == 1)
                        $('#botonConsultaTSCuentas').show();
                }
                datosTablaCuentasRelacionadas = data._esquemas;
                crearTablaVisacionGeneral(data, "TS");
            }
            else if (data.e == '1')
            {
                Notificador.ocultarMensaje(gritterIdVF);
                mensajeDialog(tituloMensajeDialogo, data.expVisacionFirmas);
            }
        },
        error : function (response)
        {
            Notificador.ocultarMensaje(gritterIdVF);
            mensajeDialog(tituloMensajeDialogo, 'No fue posible obtener la informaci&oacuten de las cuentas seleccionadas en al solicitud.' + response.responseText);
        }
    });
}//cuantasDebitarGeneral

function verFirmasCuentasRelacionadas(numeroCuentaSelecionada, tipoCuentaSelecionada)
{
    $("#dialogVerURLFirmas").dialog("open");
    var gritterIdvF = Notificador.mostrarMensaje('Consultando firmas', 'Un momento por favor...');
    $.post("visacionservlet", {"accion":18, "numeroCuentaSelecionada":numeroCuentaSelecionada, "tipoCuentaSelecionada":tipoCuentaSelecionada,  "tareaId":$('#tareaId').val(), 
                               "solicitudPadreId":$("#solicitudPadreId").val(), "TNumId":$("#TNumId").val(), "unidadNegocio":$("#unidadNegocio").val(), "dato1":$("#dato1").val(), "dato4":$("#dato4").val()},
    function(dataVerFirmasCuentasRelacionadas) 
    { 
      if(dataVerFirmasCuentasRelacionadas.e == '0')
      {        
            $("#dialogVerURLFirmas").html('<iframe id="iframeUpload" style="border:0px;" src="' + dataVerFirmasCuentasRelacionadas.urlFirmas + '" width="100%" height="100%"><\/iframe>');
            Notificador.ocultarMensaje(gritterIdvF);
        }
      else if(dataVerFirmasCuentasRelacionadas.e == '1')
      {
          Notificador.ocultarMensaje(gritterIdvF);
          mensajeDialog('Visaci&oacute;n y Confirmaci&oacute;n', dataVerFirmasCuentasRelacionadas.expVerFirmas);  
      }
    })
    .error(function (response)
    {
        Notificador.ocultarMensaje(gritterIdvF);
        mensajeDialog('Visaci&oacute;n y Confirmaci&oacute;n', 'No fue posible obtener la(s) firma(s) de la cuenta seleccionada en al solicitud.');
    });
}//verFirmasCuentasRelacionadas

function consultarCuentasRelacionadasGeneral(tituloMensajeDialogo,appSolicitudId,mafTareaId,indicador)
{   
    var gritterIdCR = Notificador.mostrarMensaje('Consultando Cuentas Relacionadas', 'Un momento por favor...');
    $.ajax( 
    {
        type:"POST", 
        url:"cscMlServlet", 
        async:true, 
        data : { "accion" : 4, "appSolicitudId" : appSolicitudId, "tareaId" : mafTareaId, "dato1" : $("#dato1").val(), "dato4" : $("#dato4").val() },
        cache:false, 
        dataType:'json', 
        success:function(dataConsultaCuentas)
        {
            if(dataConsultaCuentas.e == '0')
            {        
                Notificador.ocultarMensaje(gritterIdCR);
                datosTablaCuentasRelacionadas = dataConsultaCuentas._esquemas;
                $('#botonConsultaTSCuentas').hide();
                crearTablaVisacionGeneral(dataConsultaCuentas, "consulta");
                crearTablaCuentasDebitar(dataConsultaCuentas, "consulta");
                //crearTablaCuentasAcreditar();
            }
            else if(dataConsultaCuentas.e == '1')
            {
                Notificador.ocultarMensaje(gritterIdCR);
                $('#botonConsultaTSCuentas').hide();
                mensajeDialog(tituloMensajeDialogo, dataConsultaCuentas.expVisacionFirmas );  
            }
        },
        error:function(response)
        { 
            Notificador.ocultarMensaje(gritterIdCR);
            $('#botonConsultaTSCuentas').hide();
            mensajeDialog(tituloMensajeDialogo, 'No fue posible obtener la informaci&oacuten de las cuentas seleccionadas en al solicitud.' + response.responseText);
        }                   
    });
}

function crearTablaVisacionGeneral(dataVisacionFirmas, consulta)
{
    var head1 = "";
    var head2 = "";
    if (consulta == "TS")
    {
        head1 = "<th id='mith1' align='center' style='font-weight:normal;'>Ver Firmas<\/th>";
        head2 = "<th id='mith2' align='center' style='background-color:transparent'><input align='middle' type='hidden' class='search_init'/><\/th>";
    }
    var htmlTablaCuentasSeleccionadas = "";
    htmlTablaCuentasSeleccionadas = "<table id='tablaCuentasSeleccionadas'>"+
                                        "<thead>"+
                                          "<tr>"+
                                            head1+
                                            "<th align='center' style='font-weight:normal;'>No. Cuenta<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Tipo de Cuenta<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Estado de Cuenta<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Saldo Disponible<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Saldo en Canje<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Saldo Total<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Valor<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Estado del Saldo<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Cupo Sobregiro<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Valor Real Sobregiro<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Resultado Consulta<\/th>"+
                                          "<\/tr>"+
                                        "<\/thead>"+
                                        "<thead>"+
                                          "<tr>"+
                                            head2+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                          "<\/tr>"+
                                        "<\/thead>"+
                                      "<\/table>";
    $("#tablaCuentasSeleccionadasDiv").html(htmlTablaCuentasSeleccionadas);
    $('#tablaCuentasSeleccionadas').addClass('display');
    var i = 1;
    $.each(dataVisacionFirmas._esquemas, function()
    {
        var body1 = "";
        if (consulta == "TS")
        {
            body1 = "<td align='center'><span class='ui-icon ui-icon-search cursorImage' onclick='verFirmasCuentasRelacionadas(\"" + this.numeroCuentaVisacion  +"\","+
                                                                                                                              "\"" + this.tipoCuentaVisacion    +"\");'/);'/><\/td>";
        }
        var b = "";     
        b += "<tr>" +
                body1+
                "<td align ='center' id='numeroCuentaVisacion"+i+"'>"       + this.numeroCuentaVisacion       +"<\/td>"+
                "<td align ='center' id='tipoCuentaVisacion"+i+"'>"         + this.tipoCuentaVisacion         +"<\/td>"+
                "<td align ='center' id='estadoCuentaVisacion"+i+"'>"       + this.estadoCuentaVisacion       +"<\/td>"+
                "<td align ='center' id='saldoDisponibleVisacion"+i+"'>"    + this.saldoDisponibleVisacion    +"<\/td>"+
                "<td align ='center' id='saldoCanjeVisacion"+i+"'>"         + this.saldoCanjeVisacion         +"<\/td>"+
                "<td align ='center' id='saldoTotalVisacion"+i+"'>"         + this.saldoTotalVisacion         +"<\/td>"+
                "<td align ='center' id='valorTotalDebitarVisacion"+i+"'>"  + this.valorTotalDebitarVisacion  +"<\/td>"+
                "<td align ='center' id='estadoSaldoVisacion"+i+"'>"        + this.estadoSaldoVisacion        +"<\/td>"+
                "<td align ='center' id='cupoSobregiro"+i+"'>"              + this.cupoSobregiro              +"<\/td>"+
                "<td align ='center' id='valorRealSobregiro"+i+"'>"         + this.valorRealSobregiro         +"<\/td>"+
                "<td align ='center' id='resultadoConsultaVisacion"+i+"'>"  + this.resultadoConsultaVisacion  +"<\/td>"+
            "<\/tr>";
        $("#tablaCuentasSeleccionadas").append(b);
        i++;
    }); 
    var cTable;
    if (consulta == "TS")
    {
        cTable = $("#tablaCuentasSeleccionadas").dataTable(
        { 
            'aaSortingFixed': [[1,'asc']],
            'aoColumnDefs': [{ "bSortable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }]
        });
    }
    if (consulta == "consulta")
    {
        cTable = $("#tablaCuentasSeleccionadas").dataTable(
        {
            'aaSortingFixed' : [[1, 'asc']], 
            'aoColumnDefs' : [{ "bSortable" : false, "aTargets" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]
        });
    }
    var filtros = $("#tablaCuentasSeleccionadas thead:last").find("tr th input");
    $(filtros).keyup(function(){ cTable.fnFilter(this.value, $(filtros).index(this)); });

    if (consulta == "TS")
    {
        agruparColumnasCuentasGeneral(1, consulta);
    }
    else 
    {
        agruparColumnasCuentasGeneral(0, consulta);
    }
}//crearTablaVisacionGeneral

function crearTablaCuentasDebitar(dataVisacionFirmas, consulta)
{
    var head1 = "";
    var head2 = "";
    if (consulta == "TS")
    {
        head1 = "<th align='center' style='font-weight:normal;'>Ver Firmas<\/th>";
        head2 = "<th align='center' style='background-color:transparent'><input align='middle' type='hidden' class='search_init'/><\/th>";
    }
    var htmlTablaCuentasDebitar = "";
    htmlTablaCuentasDebitar = "<table id='tablaCuentasDebitar'>"+
                                        "<thead>"+
                                          "<tr>"+
                                            head1+
                                            "<th align='center' style='font-weight:normal;'>No. Cuenta<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Tipo de Cuenta<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Estado de Cuenta<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Saldo Disponible<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Saldo en Canje<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Saldo Total<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Valor a Debitar<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Estado del Saldo<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Valor Sobregiro<\/th>"+
                                            "<th align='center' style='font-weight:normal;'>Resultado Consulta<\/th>"+
                                          "<\/tr>"+
                                        "<\/thead>"+
                                        "<thead>"+
                                          "<tr>"+
                                            head2+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                            "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                          "<\/tr>"+
                                        "<\/thead>"+
                                      "<\/table>";
    $("#tablaCuentasDebitarDiv").html(htmlTablaCuentasDebitar);
    $('#tablaCuentasDebitar').addClass('display');
    var i = 1;
    $.each(dataVisacionFirmas._esquemas, function()
    {
        var body1 = "";
        if (consulta == "TS")
        {
            body1 = "<td align='center'><span class='ui-icon ui-icon-search cursorImage' onclick='verFirmasCuentasRelacionadas(\"" + this.numeroCuentaVisacion  +"\","+
                                                                                                                              "\"" + this.tipoCuentaVisacion    +"\");'/);'/><\/td>";
        }
        var b = "";     
        b += "<tr>" +
                body1+
                "<td align ='center' id='numeroCuentaVisacion"+i+"'>"       + this.numeroCuentaVisacion       +"<\/td>"+
                "<td align ='center' id='tipoCuentaVisacion"+i+"'>"         + this.tipoCuentaVisacion         +"<\/td>"+
                "<td align ='center' id='estadoCuentaVisacion"+i+"'>"       + this.estadoCuentaVisacion       +"<\/td>"+
                "<td align ='center' id='saldoDisponibleVisacion"+i+"'>"    + this.saldoDisponibleVisacion    +"<\/td>"+
                "<td align ='center' id='saldoCanjeVisacion"+i+"'>"         + this.saldoCanjeVisacion         +"<\/td>"+
                "<td align ='center' id='saldoTotalVisacion"+i+"'>"         + this.saldoTotalVisacion         +"<\/td>"+
                "<td align ='center' id='valorTotalDebitarVisacion"+i+"'>"  + this.valorTotalDebitarVisacion  +"<\/td>"+
                "<td align ='center' id='estadoSaldoVisacion"+i+"'>"        + this.estadoSaldoVisacion        +"<\/td>"+
                "<td align ='center' id='valorRealSobregiro"+i+"'>"         + this.valorRealSobregiro         +"<\/td>"+
                "<td align ='center' id='resultadoConsultaVisacion"+i+"'>"  + this.resultadoConsultaVisacion  +"<\/td>"+
            "<\/tr>";
        $("#tablaCuentasDebitar").append(b);
        i++;
    }); 
    var cTable;
    if (consulta == "TS")
    {
        cTable = $("#tablaCuentasDebitar").dataTable(
        { 
            'aaSortingFixed': [[1,'asc']],
            'aoColumnDefs': [{ "bSortable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]
        });
    }
    if (consulta == "consulta")
    {
        cTable = $("#tablaCuentasDebitar").dataTable(
        {
            'aaSortingFixed' : [[1, 'asc']], 
            'aoColumnDefs' : [{ "bSortable" : false, "aTargets" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }]
        });
    }
    var filtros = $("#tablaCuentasDebitar thead:last").find("tr th input");
    $(filtros).keyup(function(){ cTable.fnFilter(this.value, $(filtros).index(this)); });
    if (consulta == "TS")
    {
        agruparColumnasCuentasGeneral(1, consulta);
    }
    else 
    {
        agruparColumnasCuentasGeneral(0, consulta);
    }
}//crearTablaCuentasDebitar

function crearTablaCuentasAcreditarGeneral()
{
    var htmlTable="<table id='tablaCuentasAcreditar'>"+
                      "<thead>"+
                          "<tr>"+
                              "<th align='center' style='font-weight:normal;width: 51px'>Tipo de Cuenta<\/th>"+
                              "<th align='center' style='font-weight:normal;'>No. Cuenta<\/th>"+
                              "<th align='center' style='font-weight:normal;'>Estado Cuenta<\/th>" +
                              "<th align='center' style='font-weight:normal;'>Oficina Due&ntildea<\/th>" +
                              "<th align='center' style='font-weight:normal;'>Tipo Identificaci&oacuten<\/th>" +
                              "<th align='center' style='font-weight:normal;'>N&uacutemero Identificaci&oacuten<\/th>" +
                              "<th align='center' style='font-weight:normal;'>Nombre Titular<\/th>" +
                              "<th align='center' style='font-weight:normal;'>C&oacutedigo CEO Receptor<\/th>" +
                              "<th align='center' style='font-weight:normal;'>Valor Acreditar<\/th>" +
                              "<th align='center' style='font-weight:normal;'>Editar<\/th>" +
                              "<th align='center' style='font-weight:normal;'>Elimar<\/th>" +
                          "<\/tr>" +
                      "<\/thead>" +
                      "<thead>" +
                          "<tr>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                              "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>" +
                          "<\/tr>" +
                      "<\/thead>" +
                  "<\/table>";
    $("#tablaCA").html(htmlTable);
    $('#tablaCuentasAcreditar').dataTable({'bSort' : false});
    $("#tablaCuentasAcreditar").addClass("distanciaAlBorde");
    $("#tablaCuentasAcreditar").addClass("display");
    var filtros = $("#tablaCuentasAcreditar thead:last").find("tr th input");
    $(filtros).keyup(function (){  $('#tablaCuentasAcreditar').dataTable().fnFilter(this.value, $(filtros).index(this)); });
}//crearTablaCuentasAcreditarGeneral

function crearTablaTransaccionesMonetariasGeneral()
{
    var htmlTablaTransaMonetarias = "";
    htmlTablaTransaMonetarias = "<table id='tablaTransaccionesMonetarias'>"+
                                    "<thead>"+
                                      "<tr>"+
                                        "<th align='center' style='font-weight:normal;width: 51px '>No. Transacci&oacute;n<\/th>"+
                                        "<th align='center' style='font-weight:normal;'>Servicio<\/th>"+
                                        "<th align='center' style='font-weight:normal;'>Cuenta a Debitar<\/th>"+
                                        "<th align='center' style='font-weight:normal;'>Cuenta Acreditar<\/th>"+
                                        "<th align='center' style='font-weight:normal;'>Valor<\/th>"+
                                        "<th align='center' style='font-weight:normal;'>Fecha hora Transacci&oacute;n<\/th>"+
                                        "<th align='center' style='font-weight:normal;'>Resultado TS<\/th>"+
                                      "<\/tr>"+
                                    "<\/thead>"+
                                    "<thead>"+
                                      "<tr>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<th align='center' style='background-color:transparent'><input align='middle' type='text' class='search_init'/><\/th>"+
                                        "<\/tr>"+
                                    "<\/thead>"+
                                  "<\/table>";
    $("#divTablaTransMonetarias").html(htmlTablaTransaMonetarias);
    $("#tablaTransaccionesMonetarias").dataTable({'bSort' : false});
    $("#tablaTransaccionesMonetarias").addClass("distanciaAlBorde");
    $("#tablaTransaccionesMonetarias").addClass('display');
}//crearTablaTransaccionesMonetariasGeneral

function agruparColumnasCuentasGeneral(idColumna, consultaCuentas)
{
    var $rows = $('#tablaCuentasSeleccionadas tbody tr');
    var items = [], itemtext = [], currGroupStartIdx = 0, valor = 0, valorEditar = 0;
    $rows.each(function (i)
    {
        var itemCell = $(this).find('td:eq(' + idColumna + ')');
        var item;
        item = itemCell.text();
        if ($.inArray(item, itemtext) == -1)
        {
            itemtext.push(item);
            items.push([i, item]);
            if(consultaCuentas == "TS"){ valor = $(this).find('td:eq(7)').text(); }
            else{ valor = $(this).find('td:eq(6)').text(); }
            valorEditar = reemplazarPuntosComas(valor, ".", "");
            valorEditar = reemplazarPuntosComas(valorEditar, ",", "");
            valorEditar = parseInt(valorEditar);
            currGroupStartIdx = i;
        }
        else 
        {
            $(this).hide();
            if(consultaCuentas == "TS"){ valor = $(this).find('td:eq(7)').text(); }
            else{ valor = $(this).find('td:eq(6)').text(); }
            var valorEditar2 = reemplazarPuntosComas(valor, ".", "");
            valorEditar2 = reemplazarPuntosComas(valorEditar2, ",", "");
            valorEditar += parseInt(valorEditar2);
            $("#hdnValorCuenta").val(valorEditar);
            $("#hdnValorCuenta").priceFormat({ centsSeparator : ',', thousandsSeparator : '.' });
            if(consultaCuentas == "TS"){ $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(7)').text($("#hdnValorCuenta").val()); }
            else{ $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(6)').text($("#hdnValorCuenta").val()); }
            
            var saldoDisponible = "";
            var saldoCanje = "";
            var saldoTotal = "";
            var cupoSobregiro = "";
            
            if (consultaCuentas == "TS"){ saldoDisponible = reemplazarPuntosComas($(this).find('td:eq(4)').text(), ".", ""); }
            else{ saldoDisponible = reemplazarPuntosComas($(this).find('td:eq(3)').text(), ".", ""); }
            saldoDisponible = reemplazarPuntosComas(saldoDisponible, ",", "");
            
            if (consultaCuentas == "TS"){ saldoCanje = reemplazarPuntosComas($(this).find('td:eq(5)').text(), ".", ""); }
            else{ saldoCanje = reemplazarPuntosComas($(this).find('td:eq(4)').text(), ".", ""); }
            saldoCanje = reemplazarPuntosComas(saldoCanje, ",", "");
            
            if (consultaCuentas == "TS"){ saldoTotal = reemplazarPuntosComas($(this).find('td:eq(6)').text(), ".", ""); }
            else{ saldoTotal = reemplazarPuntosComas($(this).find('td:eq(5)').text(), ".", ""); }
            saldoTotal = reemplazarPuntosComas(saldoTotal, ",", "");
            
            if (consultaCuentas == "TS"){ cupoSobregiro = reemplazarPuntosComas($(this).find('td:eq(9)').text(), ".", ""); }
            else{ cupoSobregiro = reemplazarPuntosComas($(this).find('td:eq(8)').text(), ".", ""); }
            cupoSobregiro = reemplazarPuntosComas(cupoSobregiro, ",", "");
            
            var valorSgSc = (parseInt(saldoDisponible)+parseInt(cupoSobregiro)) - parseInt(valorEditar);
            if (valorSgSc > 0){valorSgSc = 0;}
            $("#hdnValorSgSc").val(valorSgSc);
            $("#hdnValorSgSc").priceFormat({ centsSeparator : ',', thousandsSeparator : '.' });
            if (valorSgSc < 0)
            {
                if (consultaCuentas == "TS")
                {
                    $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(10)').text("-" + $("#hdnValorSgSc").val());
                }
                else 
                {
                    $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(9)').text("-" + $("#hdnValorSgSc").val());
                }
            }
            else 
            {
                if (consultaCuentas == "TS")
                {
                    $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(10)').text($("#hdnValorSgSc").val());
                }
                else 
                {
                    $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(9)').text($("#hdnValorSgSc").val());
                }
            }
            
            if (valorEditar != 0)
            {
                if (consultaCuentas == "TS")
                {
                    if ((valorEditar > parseInt(saldoDisponible)) && (parseInt(saldoCanje) == 0))
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(8)').text("Sobregiro");
                    else if ((valorEditar > parseInt(saldoDisponible)) && (parseInt(saldoCanje) > 0) && (parseInt(saldoTotal) >= valorEditar))
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(8)').text("Sobrecanje");
                    else if ((valorEditar > parseInt(saldoTotal)) && (parseInt(saldoCanje) > 0))
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(8)').text("Sobregiro y Sobrecanje");
                    else 
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(8)').text("Normal");
                }
                else 
                {
                    if ((valorEditar > parseInt(saldoDisponible)) && (parseInt(saldoCanje) == 0))
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(7)').text("Sobregiro");
                    else if ((valorEditar > parseInt(saldoDisponible)) && (parseInt(saldoCanje) > 0) && (parseInt(saldoTotal) >= valorEditar))
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(7)').text("Sobrecanje");
                    else if ((valorEditar > parseInt(saldoTotal)) && (parseInt(saldoCanje) > 0))
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(7)').text("Sobregiro y Sobrecanje");
                    else 
                        $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(7)').text("Normal");
                }
            }
            else 
            {
                if (consultaCuentas == "TS")
                {
                    $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(8)').text("Normal");
                }
                else 
                {
                    $('#tablaCuentasSeleccionadas tbody').find('tr:eq(' + currGroupStartIdx + ')').find('td:eq(7)').text("Normal");
                }
            }
        }
    });
}//agruparColumnasCuentasGeneral

function actualizarTablaOperacionSolicitudPorDetalleOperacion()
{   
    var gritterActualizacion = Notificador.mostrarMensaje('Actualizando tabla Operaci&oacute;n Solicitud', 'Un momento por favor...');
    $.post("visacionservlet", { "accion" : 2, 'tareaId':$('#tareaId').val(), 'solicitudPadreId':$('#solicitudPadreId').val(), "dato1":$("#dato1").val()},
    function (dataActualizarTablaOpSol)
    {
        if (dataActualizarTablaOpSol.e == '0')
        {
            crearTablaOperacionSolicitud(dataActualizarTablaOpSol);
        }
        else if (dataActualizarTablaOpSol.e == '1')
        {
            mensajeDialog('Detalle Operaci&oacute;n', dataActualizarTablaOpSol.expActualizarTablaOpSolDetOp);
        }
    }).error(function (response)
    {
        mensajeDialog('Detalle Operaci&oacute;n', response.responseText);
    });
    Notificador.ocultarMensaje(gritterActualizacion);
}//actualizarTablaOperacionSolicitudPorDetalleOperacion

function funcionPoliDebitoCreditoGeneral(nombreRadioButtonDebito, nombreRadioButtonCredito, poliDebitoCredito, cuantasCuentas)
{
    for(var cu = 0; cu <= cuantasCuentas; cu++)
    {
        var radioDebitoCuenta = nombreRadioButtonDebito + cu;
        var radioCreditoCuenta = nombreRadioButtonCredito + cu;
        $('#' + radioDebitoCuenta).val("");
        $('#' + radioCreditoCuenta).val("");
        
        if (poliDebitoCredito == '0')//poliDebito
        {
            $('#' + radioDebitoCuenta).val("0");
            $('#' + radioDebitoCuenta).prop('checked', true);
            $('#' + radioCreditoCuenta).prop('checked', false);
            $('#' + radioDebitoCuenta).prop('disabled', true);
            $('#' + radioCreditoCuenta).prop('disabled', true);
        }
        if (poliDebitoCredito == '1')//poliCredito
        {
            $('#' + radioCreditoCuenta).val("1");
            $('#' + radioDebitoCuenta).prop('checked', false);
            $('#' + radioCreditoCuenta).prop('checked', true);
            $('#' + radioDebitoCuenta).prop('disabled', true);
            $('#' + radioCreditoCuenta).prop('disabled', true);
        }
        if (poliDebitoCredito == '2')//poliDebitoCredito
        {  
            if (!$('#' + radioDebitoCuenta).is(':checked') && !$('#' + radioCreditoCuenta).is(':checked'))
            {
                $('#' + radioDebitoCuenta).prop('checked', true);
            }
            if ($('#' + radioDebitoCuenta).is(':checked'))
            {
                $('#' + radioDebitoCuenta).val("0");
            }
            if ($('#' + radioCreditoCuenta).is(':checked'))
            {
                $('#' + radioCreditoCuenta).val("1");
            }
        }
        if (poliDebitoCredito == '3')//poliNinguna
        {
            $('#' + radioDebitoCuenta).prop('checked', false);
            $('#' + radioCreditoCuenta).prop('checked', false);
            $('#' + radioDebitoCuenta).prop('disabled', true);
            $('#' + radioCreditoCuenta).prop('disabled', true);
        }
    }
}//funcionPoliDebitoCredito

function resultMotivosAutorizacionGeneral(solicitudUsuario,MafTareaId,dato1,dato4)
{
    var  gritterIdMT = Notificador.mostrarMensaje('Consultando Motivos CEO', 'Un momento por favor...');
    $.ajax( 
    {
        type : "POST", 
        url : "completardetalleservlet", 
        async : false, 
        data : { "accion":'14', "solicitudUsuario":solicitudUsuario, "MafTareaId":MafTareaId,
                 'solicitudPadreId':queryObj["solicitudPadreId"],"dato1":dato1, "dato4":dato4,'operacionId': $("#hdnCscSolicitudOperacionId").val()},
        cache : false, 
        dataType : 'json', 
        async : true,
        success : function (data) 
        {
            if(data.e==0){
                if(data.jsonArray.length==0){
                    $("#resultadosCEO").hide();
                }else{
                    $('#tableDatosMotivos').dataTable().fnClearTable();
                    $('#tableDatosMotivos').dataTable().fnAddData(data.jsonArray);
                    $("#tableDatosMotivos thead tr th").attr({"style":"width: 340px;d","align":"center"});
                    $("#tableDatosMotivos tbody tr td").css({"color":"#666699","font-size": "14px"});
                    $("#tableDatosMotivos tbody tr td").attr("align","center");
                    $("#tableDatosMotivos").addClass('display');
                }
                Notificador.ocultarMensaje(gritterIdMT);
            }else{
                Notificador.ocultarMensaje(gritterIdMT);
                dialogo('Error', data.descripcion);
            }
        },
        error:function(data){
            mensajeDialog("Error", 'No fue posible obtener la informaci&oacuten de los motivos de las cuentas autorizadas en al solicitud.');
        }
    });
}

function consultarOpSolAutorizacion(cscSolicitudOperacionId,mafTareaId,usuario,solicitudUsuarioId,solicitudPadreId) 
{    
    $.post("detalleoperacionservlet", { "accion":24, "cscSolicitudOperacionId":cscSolicitudOperacionId, "mafTareaId":mafTareaId, "usuario":usuario, "solicitudUsuarioId":solicitudUsuarioId, "solicitudPadreId":solicitudPadreId },
    function (data)
    {
        if (data.codigo != "1")
            consultarOpSolicitudAutorizacion(data);
        else 
            dialogo('Detalle Operaci&oacute;', data.descripcion);
    })
    .error(function(response) 
    {
        dialogo('Detalle Operaci&oacute;', 'No fue posible consultar el id de la autorizaci&oacute;n, intentar nuevamente y si el error persiste consulte con el administrador. ' + response.responseText); 
    });
}//consultarOpSolAutorizacion

function consultarOpSolicitudAutorizacion(data)
{   
    if (data.idCSUAutorizacion != "")
       {                         
        idCSUAutorizacion = data.idCSUAutorizacion;
        if (data.respuestaAutorizacion == "A")
        {
            $("#CAutorizaOpDetalle option[value='S']").prop("selected", "selected");
            getAuNotificacion();
        }
        else if (data.respuestaAutorizacion == "N")
        {
            $("#CAutorizaOpDetalle option[value='N']").prop("selected", "selected");
        }
        if (data.idCSOAutorizacion != "")
        {
            idCSOAutorizacion = data.idCSOAutorizacion;
            $("#TObservacAutorizaOpDetalle").val(data.observacionAutorizacion);
        }
        else 
        {
            idCSOAutorizacion = "-1";
        }
    }
    else 
    {
        idCSUAutorizacion = "-1";
    }
}//consultarOpSolicitudAutorizacion

function actulizarTablaCuentasAcreditarGeneral(operacionId)
{
    $.ajax(
    {
        type : "POST", 
        url : "cuentatransaccionservlet", 
        async : false, 
        data : { "accion":3, "dato1":$("#dato1").val(), "dato2":$("#dato2").val(), "dato3":$("#dato3").val(), "dato4":$("#dato4").val(), 
                 "hdnCscSolicitudOperacionId":operacionId },
        cache : false, 
        dataType : 'json', 
        success : function (data)
        {
            if (data.e == "0")
            {
                $("#cantCtaAcreditar").val(data.jsonArray.length);
                $('#tablaCuentasAcreditar').dataTable().fnClearTable();
                $('#tablaCuentasAcreditar').dataTable().fnAddData(data.jsonArray);
                $("#tablaCuentasAcreditar tbody tr td").attr("align", "center");
            }
            else 
            {
                dialogo("Error", data.descripcion);
            }
        }
    });
}//actulizarTablaCuentasAcreditarGeneral

function loadAutorizaOperacionCEOGeneral()
{
    $("#autorizacionOperacionDetalle").contents().remove();
    $("#resultadosCEO").remove();
    $("#divAutorizaOperacionCEO").load("dominio/DetalleOperacion/Plantilla/autorizaOperacionCEO.jspf", function ()
    {
        $("#autorizacionOperacionDetalle").show();
        loadResultAutorizCEOGeneral();
    });
}//loadAutorizaOperacionCEOGeneral

function loadResultAutorizCEOGeneral()
{
    $("#divResultAutorizCEO").load("dominio/Plantilla/resultAutorizCEO.jspf", function (){
          $("#tableDatosMotivos").dataTable({'bSort' : false});
          $("#tableDatosMotivos").addClass("distanciaAlBorde");
          $("#tableDatosMotivos").addClass('display');
          resultMotivosAutorizacionGeneral($("#hdnSolicitudUsuarioId").val(),queryObj["tareaId"],$("#dato1").val(),$("#dato4").val());
    });
}//loadResultAutorizCEOGeneral
