//------------------------------------------------------------------------------
// Definición de valores por defecto
//------------------------------------------------------------------------------

var Caracteres = 
{
    //En IE y Chrome no se necesitan -> keyCodeBasicos: [8 /*backspace*/, 9 /*tab*/, 35 /*fin*/, 36 /*inicio*/, 37 /*izquierda*/, 38 /*arriba*/, 39 /*derecha*/, 40 /*abajo*/, 46 /*suprimir*/],
    keyCodeBasicos: [],
    numeros: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
    letras: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], 
    especiales: ["|", "°", "¬", "!", "@", "<", ">", "\"", "#", "$", "%", "&", "/", "(", ")", "=", "'", "?", "\\", "¿", "¡", "´", "¨", "+", "*", "~", "{", "[", "^", "}", "]", "`", ",", ";", ".", ":", "-", "_"],
                            //"á", "à", "ä", "é", "è", "ë", "í", "ì", "ï", "ñ", "ó", "ò", "ö", "ú", "ù", "ü", "Á", "À", "Ä", "É", "È", "Ë", "Í", "Ì", "Ï", "Ñ", "Ó", "Ò", "Ö", "Ú", "Ù", "Ü"
    keyCodeLetrasEspeciales: [225, 224, 228, 233, 232, 235, 237, 236, 239, 241 ,243, 242, 246, 250, 249, 252, 193, 192, 196, 201, 200, 203, 205, 204, 207, 209, 211, 210, 214, 218, 217, 220]
}//Caracteres

//------------------------------------------------------------------------------
// Inicialización
//------------------------------------------------------------------------------

$(document).ready(function()
{
    $(".formError, .advertencia").live("click", function()
    {
          $(this).remove();
          $("#"+$(this).prop("id").split("-")[1]).removeAttr("valid");
    });
    
    $("select, input, textarea").live("change", function()
    {        
        var divs = $(this).parent().find("div");
        var clases;
        var clasesArray;
        for(var j = 0; j < divs.length; j++)
        {
            clases = $(divs[j]).prop("class");
            if(clases != null)
            {
                clasesArray = clases.split(" ");
                for (var i = 0; i < clasesArray.length; i++) 
                {
                    if(clasesArray[i] == "formError")
                    {
                        $(divs[j]).remove();
                        $(this).removeAttr("valid");
                    }
                }
            }
        }
    });
});

//------------------------------------------------------------------------------
// Funciones
//------------------------------------------------------------------------------

var Validador =
{
    CaracteresPermitidos:
    {
        /*
         * Posibles tipos de caracteres permitidos
         */
        Tipos: 
        { 
            numeros: "num",
            numerosYExcepciones: "num_exc",
            letras: "let",
            letrasYExcepciones: "let_exc",
            numerosYLetras: "num_let",
            numerosLetrasYExcepciones: "num_let_exc"
        },//Tipos
        
        /**
         * Inicializa la validación sobre el conjutno de caracteres permitidos del componente HTML
         * @param selector Identificador único del componente HTML sobre el cual se creará el validador
         * @param tipo Tipo de caracteres permitidos (p.e. Validador.CaracteresPermitidos.Tipos.numeros)
         * @param excepciones Objeto de excepciones que se adicionarán al conjunto de caracteres permitidos (p.e. [" ", ":", "0"])
         */
        crearValidador: function(selector, tipo, excepciones) 
        {
            //TODO si en las excepciones viene una letra especial, va a aceptar todas las letras especiales, revisar esto
            if (Generales.esVacio(selector))
                throw "El selector no puede ser nulo ni vac\u00edo (Validador.CaracteresPermitidos.crearValidador)";
            else if (Generales.esVacio(tipo))
                throw "El tipo no puede ser nulo ni vac\u00edo (Validador.CaracteresPermitidos.crearValidador)";
            else if (tipo == this.Tipos.numerosYExcepciones || tipo == this.Tipos.letrasYExcepciones || tipo == this.Tipos.numerosLetrasYExcepciones)
            {
                if (Generales.esVacio(excepciones))
                    throw "Las excepciones no pueden ser nulas si el tipo escogido las requiere (Validador.CaracteresPermitidos.crearValidador)";
                else
                {
                    try
                    {
                        Generales.convertirObjetoACadena(excepciones);
                    }
                    catch(error) 
                    {
                        throw "Las excepciones deben ser un objeto si el tipo escogido las requiere (Validador.CaracteresPermitidos.crearValidador)\n"+error;
                    }
                }
            }
            
            var caracteresPermitidos;
            switch(tipo) 
            {
              case this.Tipos.numeros:                
                caracteresPermitidos = Caracteres.numeros;
                break;
              case this.Tipos.numerosYExcepciones:
                caracteresPermitidos = $.merge(excepciones, Caracteres.numeros);
                break;
              case this.Tipos.letras:
                caracteresPermitidos = Caracteres.letras;
                break;
              case this.Tipos.letrasYExcepciones:
                caracteresPermitidos = $.merge(excepciones, Caracteres.letras);
                break;
              case this.Tipos.numerosYLetras:
                caracteresPermitidos = $.merge($.merge([], Caracteres.numeros), Caracteres.letras);
                break;
              case this.Tipos.numerosLetrasYExcepciones: 
                caracteresPermitidos = $.merge($.merge(excepciones, Caracteres.numeros), Caracteres.letras);
                break;
              default:
                throw "El tipo de validaci\xf3n no est\xe0 definido (Validador.CaracteresPermitidos.crearValidador)";
            }
            
            $(selector).keypress(function(evento)
            {
                var esLetraEspecial = false;
                if (tipo != Validador.CaracteresPermitidos.Tipos.numeros)
                    esLetraEspecial = jQuery.inArray(evento.keyCode, Caracteres.keyCodeLetrasEspeciales) != -1
                    
                return esLetraEspecial ? true : jQuery.inArray(evento.keyCode, Caracteres.keyCodeBasicos) != -1 || jQuery.inArray(String.fromCharCode(evento.charCode || evento.keyCode), caracteresPermitidos) != -1;
            });
            
            $(selector).focusout(function()
            {
                var validarLetrasEspeciales = tipo == Validador.CaracteresPermitidos.Tipos.numeros ? false : true;
            
                var texto = $(this).val();
                var esLetraEspecial;
                for (var i = 0; i < texto.length; i++)
                {
                    esLetraEspecial = false;
                    if (validarLetrasEspeciales)
                        esLetraEspecial = jQuery.inArray(texto.charCodeAt(i), Caracteres.keyCodeLetrasEspeciales) != -1;
                        
                    if(!esLetraEspecial && jQuery.inArray(texto.charAt(i), caracteresPermitidos) == -1)
                    {
                        $(this).val("");
                        break;
                    }
                }
            });
        },//validar
        
        /**
         * Inicializa la validación sobre el máximo de caracteres permitdos a partir del atributo "maxlength" del componente HTML
         * @param selectorCaptura Identificador único del componente HTML sobre el cual se contarán los caracteres
         * @param selectorCaracteresRestantes Identificador único del componente HTML donde se mostrarán los caracteres restantes (puede ser nulo)
         * @param mensaje Mensaje que se muestra seguido del número de caracteres restantes (puede ser nulo si el selectorCaracteresRestantes es nulo)
         */
        validarLongitud: function (selectorCaptura, selectorCaracteresRestantes, mensaje)
        {
            if (Generales.esVacio(selectorCaptura))
                throw "El selector de captura no puede ser nulo ni vac\u00edo (Validador.CaracteresPermitidos.validarLongitud)";
            else if (!Generales.esVacio(selectorCaracteresRestantes) && Generales.esVacio(mensaje))
                throw "Si el selector de caracteres restantes no es nulo ni vac\u00edo, el mensaje no puede ser nulo ni vac\u00edo (Validador.CaracteresPermitidos.validarLongitud)";
                
            if (!Generales.esVacio(selectorCaracteresRestantes))
                $("#"+selectorCaracteresRestantes).text($("#"+selectorCaptura).attr("maxlength")+" "+mensaje);
                
            $("#"+selectorCaptura).keyup(function()
            {
                var texto = $(this).val();
                var longitud = texto.length;
                var maximo = parseInt($(this).attr("maxlength"));
                if(longitud > maximo)
                   $(this).val(texto.substr(0, maximo));
                
                if (!Generales.esVacio(selectorCaracteresRestantes))   
                    $("#"+selectorCaracteresRestantes).text(maximo-longitud + " "+mensaje);
            });   
        }//validarLongitud
        
    },//CaracteresPermitidos
    
    ExpresionesRegulares:
    {
        /**
         * Valida una expresión regular en los campos para los que se 
         * @param selector Identificador único del componente HTML sobre el cual se harán las validaciones con las expresiones regulares (puede ser nulo y evaluar todo el body del HTML)
         * @paramc expresionRegular La expresión regular a evaluar (puede ser nulo y sólo valida campos requeridos)
         */
        validar : function(selector, expresionRegular) 
        {
            var componentesAValidar;
            if (selector == null)
                componentesAValidar = $(".required:visible");
            else
                componentesAValidar = $(selector+" .required:visible");
                
            var control = true;
            var posicion;
            componentesAValidar.each(function (i) 
            {
                if ($(this).val() == "" && !$(this).prop("disabled")) 
                {
                    if ($(this).prop("valid") != "errorForm")
                    {                        
                        posicion = $(this).position();
                        $(this).parent().append("<div id='form"+i+"-"+$(this).prop("id")+"' class='reqformError parentFormformID formError' style='position: absolute; top: "+posicion.top+"px; left: "+(posicion.left + parseInt($(this).css("width")) - 40)+"px; margin-top: -33px; filter: alpha(opacity=60); opacity: .6'>" + 
                                                    "<div id='single_form_element"+i+"' class='formErrorContent'>" +
                                                        "Este campo es requerido" +
                                                    "<\/div>" + 
                                                    "<div id='error"+i+"' class='formErrorArrow' style='float:left;'>" + 
                                                        "<div class='line10'><!-- --><\/div>" + 
                                                        "<div class='line9'><!-- --><\/div>" + 
                                                        "<div class='line8'><!-- --><\/div>" + 
                                                        "<div class='line7'><!-- --><\/div>" +
                                                        "<div class='line6'><!-- --><\/div>" + 
                                                        "<div class='line5'><!-- --><\/div>" + 
                                                        "<div class='line4'><!-- --><\/div>" + 
                                                        "<div class='line3'><!-- --><\/div>" + 
                                                        "<div class='line2'><!-- --><\/div>" + 
                                                        "<div class='line1'><!-- --><\/div>" + 
                                                    "<\/div>" + 
                                                "<\/div>");
                        $(this).prop("valid", "errorForm");
                    } 
                    
                    control = false;
                }
            });
        
            var contador = 0;
            if (control && expresionRegular != null) 
            {
                if (selector == null)
                    componentesAValidar = $("input:visible, textarea:visible, select:visible")
                else
                    componentesAValidar = $(selector+" input:visible, "+selector+" textarea:visible, "+selector+" select:visible")
            
                componentesAValidar.each(function(k) 
                {
                    if ($(this).prop("class") != null && !$(this).prop("disabled") && $(this).prop("id") != "" && $(this).prop("id") != null) 
                    {
                        var clases = $(this).prop("class").split(" ");
                        for (i = 0; i < clases.length; i++) 
                        {
                            //TODO mirar como se debe enviar las expresiones regulares
                            $.each(expresionRegular, function (j, data) 
                            {
                                if (clases[i] == data.clase && $(this).val().match(data.expresion) == null) 
                                {
                                    if ($(this).prop("valid") != "errorForm") 
                                    {
                                        if ($(this).prop("rel") != null)
                                            mensaje = $(this).prop("rel");
                                        else if (data.mensaje != null)
                                            mensaje = data.mensaje;
                                        else 
                                            mensaje = "Dato no válido";
                                            
                                        posicion = $(this).position();
                                        $(this).parent().append("<div id='form"+i+"-"+$(this).prop("id")+"' class='reqformError parentFormformID formError' style='position: absolute; top: "+posicion.top+"px; left: "+(posicion.left + parseInt($(this).css("width")) - 40)+"px; margin-top: -33px; filter: alpha(opacity=60); opacity: .6'>" + 
                                                "<div id='single_form_element"+i+"' class='formErrorContent'>" +
                                                    "Este campo es requerido" +
                                                "<\/div>" + 
                                                "<div id='error"+i+"' class='formErrorArrow' style='float:left;'>" + 
                                                    "<div class='line10'><!-- --><\/div>" + 
                                                    "<div class='line9'><!-- --><\/div>" + 
                                                    "<div class='line8'><!-- --><\/div>" + 
                                                    "<div class='line7'><!-- --><\/div>" +
                                                    "<div class='line6'><!-- --><\/div>" + 
                                                    "<div class='line5'><!-- --><\/div>" + 
                                                    "<div class='line4'><!-- --><\/div>" + 
                                                    "<div class='line3'><!-- --><\/div>" + 
                                                    "<div class='line2'><!-- --><\/div>" + 
                                                    "<div class='line1'><!-- --><\/div>" + 
                                                "<\/div>" + 
                                            "<\/div>");
                                        $("#form"+i+"-"+$(this).prop("id")).css("top", posicion.top - ($("#single_form_element"+i).height() - 10)+"px");
                                        $(this).prop("valid", "errorForm");
                                    }
                                
                                    control = false;
                                }
                          });
                        }
                    }
                });
            }
            
            contador++;
            return control;
        }//validar
        
    }//ExpresionesRegulares
    
}//Validador