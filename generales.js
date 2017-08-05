//------------------------------------------------------------------------------
// Funciones
//------------------------------------------------------------------------------

var Generales = 
{
    /**
     * Determina si una cadena es vac�a o no
     * @param cadena Cadena a evaluar
     * @return true si la cadena es vac�a o no
     */
    esVacio: function (cadena) 
    {
        return cadena == null || cadena == 'undefined' || cadena.length == 0
    },//esVacio
    
    /**
     * Extrae la informaci�n de un objeto y la retorna en una cadena de texto
     * @param objeto Objeto a convertor en cadena
     * @return el objeto convertido en cadena
     * @throws si el par�metro de entrada es inv�lido o si el par�metro de entrada no es un objeto
     */
    convertirObjetoACadena: function(objeto)
    {
        if (objeto == null)
            throw "El objeto no puede ser nulo (Generales.convertirObjetoACadena)";
            
        var respuesta = []; 
        $.each(objeto, function(parametro, valor) 
        {
            respuesta.push(parametro+": "+($.isPlainObject(valor) ? this.convertirObjetoACadena(valor) : valor)); 
        }); 
        
        var objetoEnCadena = respuesta.join(", ");
        if (this.esVacio(objetoEnCadena))
            throw "El par\u00e1metro de entrada que se quiere convertir en cadena no es un objeto (Generales.convertirObjetoACadena)";
            
        return "{"+objetoEnCadena+"}"; 
    },//convertirObjetoACadena 
    
    /**
     * Obtiene el valor de un par�metro de una URL
     * @param url URL donde se ba a buscar el par�metro
     * @param nombreParametro Par�metro a buscar en la URL
     * @return el valor consultado, de lo contrario null
     */
    obtenerValorParametroURL: function(uRL, nombreParametro)
    {
        if (this.esVacio(uRL))
            throw "La URL no puede ser nula ni vac\u00eda (Generales.obtenerValorParametroURL)";
        else if (nombreParametro == null)
            throw "El nombre del par\u00e1metro no puede ser nulo ni vac\u00edo (Generales.obtenerValorParametroURL)";
            
        var resultados = new RegExp("[\\?&]"+nombreParametro+"=([^&#]*)").exec(uRL);
        return resultados != null ? resultados[1] : resultados;
    },//obtenerValorParametroURL
    

    /**
     * Permite visualizar un documento buscado por handle y c�digo de tipo documental
     * @param handle Identificador �nico del documento en OnBase
     * @param codigoTipoDocumental C�digo del tipo documental a buscar
     */
    verArchivo: function(handle, codigoTipoDocumental)
    {
        Mensajes.BlockUI.mostrar("Consultando, un momento por favor...", null);     
        
        var uRL = window.location.href;
        $.post('visualizaciondocumentoservlet',
        {"accion" : 0, "codigoTipoDocumental" : codigoTipoDocumental, "handle" : handle, "ppe": this.obtenerValorParametroURL(uRL, "ppe"), "sid": this.obtenerValorParametroURL(uRL, "sid")},
        function(data)
        {
            if (data.error == "")
            {
                var direccion = "visualizaciondocumentoservlet?accion=1&codigoTipoDocumental=" + codigoTipoDocumental + "&handle=" + handle;
                data.tipo ?  window.open(direccion, "", 'resizable=1,fullscreen=0') : window.location = direccion;
            }
            else
                Mensajes.Pnotify.mostrar("Error consultando el archivo", data.error, Mensajes.Pnotify.TiposMensaje.error, 5);
        });
        
        Mensajes.BlockUI.ocultar();  
    }//verArchivo
    
}//Generales
