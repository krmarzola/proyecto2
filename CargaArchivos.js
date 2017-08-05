$(document).ready(function ()
{
    $('#hdnSolicitudUsuarioIdExterno').val($('#solicitudUsuario').val());
    $('#hdnSolicitudIdExterno').val($('#solicitud').val());
    
    var param = new Array();
    param.push({ name : "accion", value : "1"});
    param.push({ name : "codigoTarea", value : $('#codigoTareaMaf').val()});
    $.ajax(
    {
        type : "POST", 
        dataType : "json", 
        url : 'cargararchivoonbase', 
        data : param, 
        cache : false, 
        contentType : "application/x-www-form-urlencoded; charset=UTF-8", 
        success : function (data)
        {
            if (data.error == "0")
            {
                var html = "<option value='0'></option>"
                $('#tipoDocumental').html(html);
                $('#tipoDocumental').append(data.tipos);
                $('#cargando').hide();
                $('#form').show();
            }
            else 
            {
                alert(data.msj);
            }
        },
        error : function ()
        {
            alert("error no contemplado, consulte con su administrador");
        }
    })
    $('#form').ajaxForm({ dataType : 'json', beforeSubmit : ShowRequest, success : SubmitSuccesful, error : AjaxError });
    $("#tipoDocumental").live("change", function (){$('#hdnIdTipoDocumental').val($("#tipoDocumental option:selected").attr("name"));});
});

function ShowRequest(formData, jqForm, options)
{
    $('#estado_upload').html('<img height="16" width="16" src="images/22_small.gif" alt=""/>&nbsp;subiendo archivo ...');
    return true;
}

function AjaxError()
{
    $('#estado_upload').html("se ha generado un error subiendo el archivo");
}

function SubmitSuccesful(responseText, statusText)
{
    if (responseText.error == 0)
    {
        $('#estado_upload').html(responseText.contenido);
        repintarDocumentosOnbase();
        $("#dialogImportar").dialog('close');
        if ($("#hdnControlNotificacionCargue").size() > 0)
        {
            var funcion = $("#hdnControlNotificacionCargue").val() + "('" + responseText.fileName + "')";
            setTimeout(funcion, 1000);
        }
    }
    else 
    {
        habilitarCamposCarga(1);
        $('#estado_upload').html(responseText.mensaje);
    }
}

function format_url(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0;i < vars.length;i++)
    {
        var pair = vars[i].split("=");
        if (pair[0] == variable)
        {
            return pair[1]
        }
    }
}

function cargarArchivo()
{   
    
    habilitarCamposCarga(0);
    if ($('#tipoDocumental').val() != '' && $("#fileToUpload").val() != '') {
        var param = new Array();
        param.push({ name : "accion", value : "2" });
        param.push({ name : "tipoDocumental", value : $('#tipoDocumental').val() });
        param.push({ name : "hdnMafTareaId", value : $('#codigoTareaMaf').val() });
        //param.push({ name : "hdnUsuario", value : queryObj["usuario"] });
        $.ajax(
        {
            type : "POST", 
            dataType : "json", 
            url : 'cargararchivoonbase', 
            data : param, 
            cache : false, 
            contentType : "application/x-www-form-urlencoded; charset=UTF-8", 
            success : function (data)
            {
                //console.log(data);
                if (data.error == "0")
                {   
                    $.each(data.llaves, function (key, value){ value.valorElementoHtml = $("#" + value.elementoHtml).val(); });
                    $('#hdnLlavesOnbase').val($.toJSON(data));
                    $('#form').submit();
                }
                else 
                {
                    habilitarCamposCarga(1);
                    alert(data.msj);
                }
            },
            error : function ()
            {
                alert("error no contemplado, consulte con su administrador");
            }
        })        
    }else{
        $("#tipoDocumental").removeClass("cajaTextoNoEditable");
        $("#fileToUpload").removeClass("cajaTextoNoEditable");
        $('#linkCargaArchivo').show();
        $('#linkLimpiar').show();
        $('#estado_upload').html("Los campos son Obligatorios");
    }
}

function habilitarCamposCarga(habilitar) {
    if (habilitar == 0) {
        $("#tipoDocumental").addClass("cajaTextoNoEditable");
        $("#fileToUpload").addClass("cajaTextoNoEditable");
        //TODO ajustar tamaño (height) campo text box
        $('#linkCargaArchivo').hide();
        $('#linkLimpiar').hide();
    } else {
        $("#tipoDocumental").removeClass("cajaTextoNoEditable");
        $("#fileToUpload").removeClass("cajaTextoNoEditable");
        $('#linkCargaArchivo').show();
        $('#linkLimpiar').show();
    }
}