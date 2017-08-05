//------------------------------------------------------------------------------
// Definición de valores por defecto
//------------------------------------------------------------------------------

var ConstantesFecha = 
{
    DatePiker:
    {
        dias: ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado"],
        diasCorto: ["Dom", "Lun", "Mar", "Mi&eacute;", "Juv", "Vie", "S&aacute;b"],
        diasMinimo: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "S&aacute;"],
        formatoDiaMesAno: "dd/mm/yy",
        formatoHoraMinutosSegundos: "hh:mm:ss",
        formatoFechaEnTexto: "DD, d MM, yy",
        meses: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        mesesCorto: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], 
        semanaAbreviacion: "Sem"
    }//DatePiker
    
}//ConstantesFecha

$.datepicker.regional["es"] = 
{
    changeYear: true,
    changeMonth: true,
    closeText: "Cerrar",
    prevText: "Anterior",
    nextText: "Siguiente",
    currentText: "Hoy",
    monthNames: ConstantesFecha.DatePiker.meses,
    monthNamesShort: ConstantesFecha.DatePiker.mesesCorto,
    dayNames: ConstantesFecha.DatePiker.dias,
    dayNamesShort: ConstantesFecha.DatePiker.diasCorto,
    dayNamesMin: ConstantesFecha.DatePiker.diasMinimo,
    dateFormat: ConstantesFecha.DatePiker.formatoDiaMesAno,
    weekHeader: ConstantesFecha.DatePiker.semanaAbreviacion,
    altFormat: ConstantesFecha.DatePiker.formatoFechaEnTexto 
}

$.datepicker.setDefaults($.datepicker.regional["es"]);

//------------------------------------------------------------------------------
// Funciones
//------------------------------------------------------------------------------

var Fechas = 
{
    /**
     * Crea una fecha para un input de tipo texto
     * @param selector Selector sobre el cual se creará la fecha
     * @param opciones Opciones a aplicar al datepicker (puede ser nulo)
     * @throws si los parámetros de entrada son inválidos
     */
    crearFecha: function(selector, opciones)
    {        
        if (Generales.esVacio(selector))
            throw "El selector de la fecha no puede ser nulo ni vac\u00edo (Fechas.crearFecha)";
        else if (opciones != null) 
        {
            try
            {
                Generales.convertirObjetoACadena(opciones);
            }
            catch(error) 
            {
                throw "Si las ocpiones no son nulas, deben ser un objeto v\u00e1lido (Fechas.crearFecha)\n"+error;
            }
        }
        
        opciones = opciones == null ? {} : opciones;
        $(selector).datepicker(opciones);
    },//crearFecha
    
    /**
     * Crea un rango de fecha para dos inputs de tipo texto
     * @param selectorDesde Selector sobre el cual se creará fecha 'Desde'
     * @param opcionesFechaDesde Objeto con las opciones a aplicar al campo de la fecha 'Desde' (puede ser nulo)
     * @param selectorHasta Selector sobre el cual se creará fecha 'Hasta'
     * @param opcionesFechaHasta Objeto con las opciones a aplicar al campo de la fecha 'Hatsa' (puede ser nulo)
     * @throws si los parámetros de entrada son inválidos
     */
    crearRangoFecha: function(selectorDesde, opcionesFechaDesde, selectorHasta, opcionesFechaHasta)
    {
        if (Generales.esVacio(selectorDesde))
            throw "El selector del campo 'desde' no puede ser nulo ni vac\u00edo (Fechas.crearRangoFecha)";
        else if (Generales.esVacio(selectorHasta))
            throw "El selector del campo 'hasta' no puede ser nulo ni vac\u00edo (Fechas.crearRangoFecha)";
        else if (opcionesFechaDesde != null) 
        {
            try
            {
                Generales.convertirObjetoACadena(opcionesFechaDesde);
            }
            catch(error) 
            {
                throw "Si las opciones de la fecha 'desde' no son nulas, deben ser un objeto v\u00e1lido (Fechas.crearRangoFecha)\n"+error;
            }
        }
        else if (opcionesFechaHasta != null) 
        {
            try
            {
                Generales.convertirObjetoACadena(opcionesFechaHasta);
            }
            catch(error) 
            {
                throw "Si las opciones de la fecha 'hasta' no son nulas, deben ser un objeto v\u00e1lido (Fechas.crearRangoFecha)\n"+error;
            }
        }
        
        //TODO mirar cómo se inicializa el datepicker (cuando vienen opciones) antes de que el usuario de click
        $(selectorDesde).datepicker(
        {
            onSelect: function(fechaSeleccionada) 
            {
                opcionesFechaHasta = opcionesFechaHasta == null ? {} : opcionesFechaHasta;
                $(selectorHasta).datepicker("option", $.extend(opcionesFechaHasta, {minDate: fechaSeleccionada}));
            }
        });
        
        $(selectorHasta).datepicker(
        {
            onSelect: function(fechaSeleccionada) 
            {
                opcionesFechaDesde = opcionesFechaDesde == null ? {} : opcionesFechaDesde;
                $(selectorDesde).datepicker("option", $.extend(opcionesFechaDesde, {maxDate: fechaSeleccionada}));
            }
        });
    }//crearRangoFecha
    
}//Fechas
