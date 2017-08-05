//------------------------------------------------------------------------------
// Definición de valores por defecto
//------------------------------------------------------------------------------

$.blockUI.options = 
{
    baseZ: 2E3,
    css:  
    {
        backgroundColor: "#ffffff", 
        border: "none",
        padding: "0px",
        width: "20%",
        left: ($(window).width() - 250) / 2 + "px"
    }
};

$.pnotify.defaults = $.extend($.pnotify.defaults, 
{
    pnotify_styling: "jqueryui",
    pnotify_delay: 86400000, 
    pnotify_stack: {dir1: "down", dir2: "left", push: "bottom", spacing1: 10, spacing2: 10} 
});


//------------------------------------------------------------------------------
// Inicialización
//------------------------------------------------------------------------------

$(document).ready(function() 
{
    construirDialogoGeneral();
});

//------------------------------------------------------------------------------
// Constructores
//------------------------------------------------------------------------------

/**
 * Construye el dialogo general para cualquier jsp que invoque este javascript
 */
function construirDialogoGeneral() 
{   
    $("body").append("<div id='dialogoGenaralDiv'><span/><\/div>");
    $("#dialogoGenaralDiv").dialog(
    { 
        autoOpen:false, modal:true, width:"50%", resizable:false, draggable:false, 
        buttons: 
        {
            "Aceptar": function() 
            {
                $(this).dialog("close"); 
            }
        },
        
        open: function() 
        {
            $('.ui-dialog-buttonpane').find('button:contains("Aceptar")').button({icons: {primary: 'ui-icon-check'}});
        }
    });
}//construirDialogoGeneral

//------------------------------------------------------------------------------
// Funciones
//------------------------------------------------------------------------------

var Mensajes = 
{
    BlockUI: 
    {        
        /**
         * Muestra un blockUI
         * @param mensaje Mensaje a mostrar
         * @param tiempo El tiempo en segundos que se requiere que el blockUI esté abierto (puede ser nulo)
         * @throws si los parámetros de entrada son inválidos
         */
        mostrar: function(mensaje, tiempo)
        {            
            if (Generales.esVacio(mensaje))
                throw "El mensaje no puede ser nulo ni vac\u00edo (Mensajes.BlockUI.mostrar)";
            else if (tiempo != null && isNaN(tiempo))
                throw "El tiempo no es un n\u00famero (Mensajes.BlockUI.mostrar)";
                
            $.blockUI(
            {
                message: "<div class='cargando'>" +
                           "<table>" +
                             "<tr>" +
                               "<td>" +
                                 "<img src='css/imagenes/gif/hormigaPE.gif'/>" +
                               "<\/td>" +
                             "<\/tr>" +
                             "<tr>" +
                               "<td>" +
                                 mensaje +
                               "<\/td>" +
                             "<\/tr>" +
                           "<\/table>" +
                         "<\/div>"
            });
            
            if (tiempo != null)
                setTimeout($.unblockUI, tiempo * 1000);
        },//mostrar
        
        /**
         * Oculta un blockUI abierto
         */
        ocultar: function()
        {
            $.unblockUI();
        }//ocultar
        
    },//BlockUI
    
    Dialogo: 
    {
        /**
         * Muestra un dialogo con un título y un mensaje
         * @param titulo Título del dialogo a mostrar
         * @param mensaje Mensaje del dialogo a mostrar
         * @throws si los parámetros de entrada son inválidos
         */
        mostrar: function(titulo, mensaje)
        {
            if (Generales.esVacio(titulo))
                throw "El t\xedtulo no puede ser nulo ni vac\u00edo (Mensajes.Dialogo.mostrar)";
            else if (Generales.esVacio(mensaje))
                throw "El mensaje no puede ser nulo ni vac\u00edo (Mensajes.Dialogo.mostrar)";
          
                $("#dialogoGenaralDiv").dialog("option", {position: "center", title: titulo});
                $("#dialogoGenaralDiv").html(mensaje);
                $("#dialogoGenaralDiv").dialog("open");
        }//mostrar
        
    },//Dialogo
    
    Pnotify: 
    {
        /**
         * Muestra un pnotify con un título y un mensaje
         * @param titulo Título del pnotify a mostrar
         * @param mensaje Mensaje del pnotify a mostrar
         * @param tipoMensaje El tipo del pnotify a mostrar (mirar: Mensajes.Pnotify.TiposMensaje)
         * @param tiempo El tiempo en segundos que se requiere que el pnotify esté abierto (puede ser nulo)
         * @throws si los parámetros de entrada son inválidos
         */
        mostrar: function(titulo, mensaje, tipoMensaje, tiempo)
        {
            if (Generales.esVacio(titulo))
                throw "El t\xedtulo no puede ser nulo ni vac\u00edo (Mensajes.Pnotify.mostrar)";
            else if (Generales.esVacio(mensaje))
                throw "El mensaje no puede ser nulo ni vac\u00edo (Mensajes.Pnotify.mostrar)";
            else if (Generales.esVacio(tipoMensaje))
                throw "El tipo del mensaje debe pertenecer a uno de los definidos en: Mensajes.Pnotify.TiposMensaje (Mensajes.Pnotify.mostrar)";
            else if (tiempo != null && isNaN(tiempo))
                throw "El tiempo no es un n\u00famero (Mensajes.Pnotify.mostrar)";
                
            var opciones = {pnotify_title: titulo, pnotify_text: mensaje, pnotify_type: tipoMensaje};    
            if (tiempo != null)
                $.extend(opciones, {pnotify_delay: tiempo * 1000});
            else
                $.extend(opciones, {pnotify_sticker: false});
                
            $.pnotify(opciones);
        },//mostrar
        
        /**
         * Oculta todos los pnotify que se encuentren visibles
         */
        ocultarTodosLosMensajes: function()
        {
            $.pnotify_remove_all();
        },//ocultarTodosLosMensajes
        
        /**
         * Posibles tipos de mensajes
         */
        TiposMensaje: 
        {
            informacion: "notice",
            error: "error",
            exito: "success"
        }//TiposMensaje
        
    }//Pnotify

}//Mensajes