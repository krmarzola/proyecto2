var idOnbase;
var gritterListarDocs;
$(document).ready(function () {
    if ($("#hdnConsultaDocsOnbase").val() == '1') {
        $('#btnConsultarDoc').show();
        $('#tdBtnConsultarDoc').show();
    }
    habilitarCamposCarga(1);
    gritterListarDocs = Notificador.mostrarMensaje('Consultando Documentos', 'Un momento por favor....');
    var admin = "0";
    if ($("#hdnAdminDocumentosOnbase").size() > 0) {
        admin = "1";
        $('#btnImportar').show();
        $('#tdBtnImportar').show();
    }
    if ($("#hdnAdminVariableDocumentosOnbase").size() > 0) {
        if ($('#hdnAdminVariableDocumentosOnbase').val() == "1") {
            $('#btnImportar').hide();
            $('#tdBtnImportar').hide();
            admin = "0";
            $('#hdnAdminVariableDocumentosOnbase').val("0");
        }
    }
    $('#btnImportar').button( {
        icons :  {
            primary : "ui-icon-transferthick-e-w"
        }
    });
    $('#btnConsultarDoc').button( {
        icons :  {
            primary : "ui-icon-search"
        }
    });
    $("#dialogConfirmarOnbase").dialog( {
        autoOpen : false, resizable : false, height : 180, modal : true, buttons :  {
            "Aceptar" : function () {
                eliminarOnbase(idOnbase);
                $(this).dialog("close");
            },
            "Cancelar" : function () {
                $(this).dialog("close");
            }
        },
        open : function () {
            $('.ui-dialog-buttonpane').find('button:contains("Aceptar")').button( {
                icons :  {
                    primary : 'ui-icon-check'
                }
            });
            $('.ui-dialog-buttonpane').find('button:contains("Cancelar")').button( {
                icons :  {
                    primary : 'ui-icon-close'
                }
            });
        }
    });
    $("#dialogoDocumentoDiv").dialog( {
        autoOpen : false, width : "100%"
    });
    var param = new Array();
    param.push( {
        name : "accion", value : "3"
    });
    param.push( {
        name : "admin", value : admin
    });
    param.push( {
        name : "solicitudUsuarioId", value : $("#solicitudUsuario").val()
    });
    param.push( {
        name : "solicitudPadreId", value : $("#solicitud").val()
    });
    $.ajax( {
        type : "POST", dataType : "json", url : 'cargararchivoonbase', data : param, cache : false, contentType : "application/x-www-form-urlencoded; charset=UTF-8", success : function (data) {
            $('#cargandoOnbase').hide();
            $('#contenedorOnbase').show();
            if (data.error == "0") {
                $('#divTablaOnbase').html(data.contenido);
                constructorDatatables("tablaDocumentalOnbase");
                $('#tituloOnbaseListado').text($('#tituloOnbaseListado').text() + data.complementoTitulo);
                $('#tablaDocumentalOnbase tr th').attr("style", "text-align:center");
                $("#thSearchTipoDocumental").attr("style", "background-color:white");
                $("#thSearchNombreArchivo").attr("style", "background-color:white");
                $("#thSearchTemp1").attr("style", "background-color:white");
                $("#thSearchTemp2").attr("style", "background-color:white");
            }
            else {
                $('#divTablaOnbase').html(data.mensaje);
            }
            
        },
        error : function () {
            alert("Error no contemplado, por favor consulte con su administrador.");
        }
    })
    Notificador.ocultarMensaje(gritterListarDocs);
    $('#btnConsultarDoc').click(function () {
        mostrarDialogoConsultaDoc();
        return false;
    });
});

function verDialogoOnbase(p_idOnbase) {
    idOnbase = p_idOnbase;
    $("#dialogConfirmarOnbase").dialog("open");
}

function eliminarOnbase() {
    var param = new Array();
    param.push( {
        name : "accion", value : "4"
    });
    param.push( {
        name : "idOnbase", value : idOnbase
    });
    $.ajax( {
        type : "POST", dataType : "json", url : 'cargararchivoonbase', data : param, cache : false, contentType : "application/x-www-form-urlencoded; charset=UTF-8", success : function (data) {
            if (data.error == "0") {
                repintarDocumentosOnbase();
            }
            else {
                alert(data.mensaje);
            }
        },
        error : function () {
            alert("Error no contemplado, por favor consulte con su administrador.");
        }
    })
}

function mostrarDialogoDocumento(solicitudUsuarioId, solicitudId, handle, codigoTipoDocumental, nombreTipoDocumental, nombreArchivo, extension) {
    var direccion = "cargararchivoonbase?accion=5&solicitudUsuarioId=" + solicitudUsuarioId + "&solicitudId=" + solicitudId + "&handle=" + handle + "&codigoTipoDocumental=" + codigoTipoDocumental + "&nombreArchivo=" + nombreArchivo + "&extension=" + extension
    var ancho = $(window).width();
    window.open(direccion, "", 'resizable=1,width=' + ancho);
}

function descargarArchivoOnbase(solicitudUsuarioId, solicitudId, handle, codigoTipoDocumental, nombreTipoDocumental, nombreArchivo, extension) {
    window.location = "cargararchivoonbase?accion=6&solicitudUsuarioId=" + solicitudUsuarioId + "&solicitudId=" + solicitudId + "&handle=" + handle + "&codigoTipoDocumental=" + codigoTipoDocumental + "&nombreArchivo=" + nombreArchivo + "&extension=" + extension
}

function habilitarCamposCarga(habilitar) {
    if (habilitar == 0) {
        $("#tipoDocumental").addClass("cajaTextoNoEditable");
        $("#fileToUpload").addClass("cajaTextoNoEditable");
        $('#linkCargaArchivo').attr('disabled', true);
        $('#linkLimpiar').attr('disabled', true);
    }
    else {
        $("#tipoDocumental").removeClass("cajaTextoNoEditable");
        $("#fileToUpload").removeClass("cajaTextoNoEditable");
        $('#linkCargaArchivo').attr('disabled', false);
        $('#linkLimpiar').attr('disabled', false);
    }
}

function mostrarDialogoConsultaDoc() {
    $("#dialogoConsultarDoc").load("dominio/Plantilla/onBase/consultaDocumentoExterno.jsp", function () {
        $('#tipoDocumentalConsulta').bind('change', function () {
            var tipo = $('#tipoDocumentalConsulta').val();
            if (tipo == '105')
                $('#nombreLlave').text('Numero Garantia');
            else if (tipo == '343')
                $('#nombreLlave').text("Numero Pagare");
            else 
                $('#nombreLlave').text("Numero Identificacion");
        });
        $.ajax( {
            type : "POST", url : "cargararchivoonbase", data :  {
                "accion" : 7
            },
            cache : true, dataType : 'json', success : function (data) {
                if (data.error == "0") {
                    $('#tipoDocumentalConsulta').append(data.tipos);
                }
                else {
                    alert(data.msj);
                }
            },
            error : function () {
                alert("error no contemplado, consulte con su administrador");
            }
        });
    }).dialog( {
        modal : true, width : 450, position : 'center', resizable : false, buttons :  {
            "Consultar" : function () {
                if ($('#tipoDocumentalConsulta').val() == '' || $('#llaveConsulta').val() == '') {
                    var mensaje = "<center><label id='nombreLlave'>Los campos son Obligatorios<\/label><\/center>";
                    $('#dvListaDocumentosExternos').html(mensaje);
                }
                else {
                    var msgDocsExt = Notificador.mostrarMensaje('Consultando Documentos', 'Un momento por favor ...');
                    $.ajax( {
                        type : "POST", url : "cargararchivoonbase", data :  {
                            "accion" : 8, "tipoDocumentalConsulta" : $('#tipoDocumentalConsulta').val(), "llaveConsulta" : $('#llaveConsulta').val()
                        },
                        cache : false, dataType : 'json', success : function (data) {
                            var html = "";
                            if (data.error == "0") {
                                if (data.documentos.length > 0) {
                                    html += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tablaDocumentosExternos' style='width:100%'>";
                                    html += "<thead>";
                                    html += "<tr>";
                                    html += "<th style='width:70%'>Nombre Archivo<\/th>";
                                    html += "<th style='width:30%'>Visualizar<\/th>";
                                    html += "<\/tr>";
                                    html += "<\/thead>";
                                    html += "<tbody>";
                                    var cont = 0;
                                    $.each(data.documentos, function (key, documento) {
                                        var nombreArchivo = documento.nombre.substring(0, documento.nombre.lastIndexOf("."));
                                        var extension = documento.nombre.substring(documento.nombre.lastIndexOf("."));
                                        if (cont % 2 == 0) {
                                            html += "<tr class='odd'>";
                                        }
                                        else {
                                            html += "<tr class='even'>";
                                        }
                                        html += "<td align='center'>" + documento.nombre + "<\/td>";
                                        html += obtenerFormaVisualizarDocumentoExterno(documento.handle, $('#tipoDocumentalConsulta').val(), nombreArchivo, extension);
                                        html += "<\/td>";
                                        html += "<\/tr>";
                                        cont += 1;
                                    });
                                    html += "<\/tbody>";
                                    html += "<\/table>";
                                }
                                else {
                                    html += "<center><label id='nombreLlave'>No se encontraron Documentos<\/label><\/center>";
                                }
                                $('#dvListaDocumentosExternos').html(html);
                            }
                            else {
                                alert(data.msj);
                            }
                            Notificador.ocultarMensaje(msgDocsExt);
                        },
                        error : function () {
                            Notificador.ocultarMensaje(msgDocsExt);
                            alert("error no contemplado, consulte con su administrador");
                        }
                    });
                }
            },
"Regresar" : function () {
                $(this).dialog("close");
            }
        },
        open : function () {
            $('.ui-dialog-buttonpane').find('button:contains("Consultar")').button( {
                icons :  {
                    primary : 'ui-icon-search'
                }
            });
            $('.ui-dialog-buttonpane').find('button:contains("Regresar")').button( {
                icons :  {
                    primary : 'ui-icon-arrowthick-1-w'
                }
            });
        }
    });
}

function obtenerFormaVisualizarDocumentoExterno(handle, tipoDocumental, nombreArchivo, extension) {
    var salida = "";
    var imagen = "pdf.png";
    var funcion = "mostrarDialogoDocumentoExt('" + handle + "','" + tipoDocumental + "','" + nombreArchivo + "','" + extension + "')";
    if (extension == ".xls" || extension == ".xlsx") {
        imagen = "excel.png";
    }
    else if (extension == ".msg") {
        imagen = "mail.png";
    }
    if (extension != ".pdf") {
        funcion = "descargarArchivoOnbaseExt('" + handle + "','" + tipoDocumental + "','" + nombreArchivo + "','" + extension + "')";
    }
    salida += "<td align='center' width='10%'><img src=\"css/images/onbaseImg/" + imagen + "\"";
    salida += " onclick=\"javascript:" + funcion + "\">";
    salida += "<\/td>";
    return salida;
}

function mostrarDialogoDocumentoExt(handle, codigoTipoDocumental, nombreArchivo, extension) {
    var direccion = "cargararchivoonbase?accion=9&handle=" + handle + "&codigoTipoDocumental=" + codigoTipoDocumental + "&nombreArchivo=" + nombreArchivo + "&extension=" + extension
    var ancho = $(window).width();
    window.open(direccion, "", 'resizable=1,width=' + ancho);
}

function descargarArchivoOnbaseExt(handle, codigoTipoDocumental, nombreArchivo, extension) {
    window.location = "cargararchivoonbase?accion=10&handle=" + handle + "&codigoTipoDocumental=" + codigoTipoDocumental + "&nombreArchivo=" + nombreArchivo + "&extension=" + extension
}