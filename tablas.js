//------------------------------------------------------------------------------
// Definición de valores por defecto
//------------------------------------------------------------------------------
var lenguajeDataTable = 
{
    "sEmptyTable" : "No existen registros para mostrar", 
    "sInfo" : "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros", 
    "sInfoEmpty" : "Mostrando desde 0 hasta 0 de 0 registros", 
    "sInfoFiltered" : "(filtrado de _MAX_ registros en total)", 
    "sInfoPostFix" : "", 
    "sInfoThousands" : ",", 
    "sLengthMenu" : "Mostrar _MENU_ registros", 
    "sLoadingRecords" : "Cargando...", 
    "sProcessing" : "Procesando...", 
    "sSearch" : "Buscar",
    "sZeroRecords" : "No existen registros que coincidan con los criterios de b&uacutesqueda", 
    "oPaginate" : 
    {
        "sFirst" : "", 
        "sLast" : "", 
        "sNext" : "", 
        "sPrevious" : ""
    },
    "oAria" : 
    {
        "sSortAscending" : ": activar para Ordenar Ascendentemente", 
        "sSortDescending" : ": activar para Ordendar Descendentemente"
    }
};//lenguajeDataTable
//------------------------------------------------------------------------------
// Funciones
//------------------------------------------------------------------------------
var Tablas = 
{
    DataTable : 
    {
        /**
         * Crea un datatable
         * @param nombreTabla nombre de la tabla a inicializar
         * @param opciones Opciones adicionales para incluir en el datatable
         * @throws si los parámetros de entrada son inválidos
         */
        crearDataTable : function (nombreTabla, opciones)
        {
            if (Generales.esVacio(nombreTabla))
            {
                throw "El nombre de la tabla no puede ser nulo ni vac\u00edo (Tablas.DataTable.crearDataTable)";
            }
            try 
            {
                opciones == null ? $("#" + nombreTabla).dataTable($.extend(
                {
                    "oLanguage" : lenguajeDataTable
                })) : $("#" + nombreTabla).dataTable($.extend(
                {
                    "bFilter" : true, "bSort" : true, "sPaginationType" : "two_button", "oLanguage" : lenguajeDataTable
                },
                opciones));
            }
            catch (error)
            {
                throw "Error en las opciones enviadas (Tablas.crearDataTable)";
            }
        },
        //crearDataTable
        crearDataTableBasica : function (nombreTabla, opciones)
        {
            if (Generales.esVacio(nombreTabla))
            {
                throw "El nombre de la tabla no puede ser nulo ni vac\u00edo (Tablas.DataTable.crearDataTable)";
            }
            try 
            {
                opciones == null ? $("#" + nombreTabla).dataTable($.extend(
                {
                    "oLanguage" : lenguajeDataTable
                })) : $("#" + nombreTabla).dataTable($.extend(
                {
                    "bPaginate" : false, "bLengthChange" : false, "bSort" : false, "bInfo" : false, "bAutoWidth" : false, "bFilter" : false, "bSort" : false, "sPaginationType" : "two_button", "oLanguage" : lenguajeDataTable
                },
                opciones));
            }
            catch (error)
            {
                throw "Error en las opciones enviadas (Tablas.crearDataTable)";
            }
        },
        //crearDataTable
        /**
         * Crea los filtros para el data table que se va a construir
         * @param nombreTabla nombre de la tabla a a la cual se le van a gregar los filtros
         * @param nombreFiltro nombre del filtro existente en la tabla a aplicar los filtros
         * @param numeroFiltrosOcultosAlPrincipio Número de filtros ocultos al principio del tr
         * @param numeroFiltrosVisibles Número de filtros visibles en el medio del tr
         * @param numeroFiltrosOcultosAlFinal Número de filtros ocultos al final del tr
         * @throws si los parámetros de entrada son inválidos
         */
        crearFiltros : function (nombreTabla, nombreFiltro, numeroFiltrosOcultosAlPrincipio, numeroFiltrosVisibles, numeroFiltrosOcultosAlFinal)
        {
            if (Generales.esVacio(nombreFiltro))
                throw "El nombre del filtro no puede ser nulo ni vac\u00edo (Tablas.DataTable.crearFiltros)";
            else if (Generales.esVacio(nombreFiltro))
                throw "El nombre de la tabla no puede ser nulo ni vac\u00edo (Tablas.DataTable.crearFiltros)";
            else if (isNaN(numeroFiltrosOcultosAlPrincipio))
                throw "El n\u00famero de filtros ocultos al principio no es un n\u00famero (Tablas.DataTable.crearFiltros)";
            else if (isNaN(numeroFiltrosVisibles))
                throw "El n\u00famero de filtros visibles no es un n\u00famero (Tablas.DataTable.crearFiltros)";
            else if (isNaN(numeroFiltrosOcultosAlFinal))
                throw "El n\u00famero de filtros ocultos al final no es un n\u00famero (Tablas.DataTable.crearFiltros)";
            var filtros = "";
            for (var i = 0;i < numeroFiltrosOcultosAlPrincipio;i++)
            {
                filtros += "<th align='center' style='background-color:transparent'>" + "<input align='middle' type='hidden' class='search_init'/>" + "<\/th>";
            }
            for (i = 0;i < numeroFiltrosVisibles;i++)
            {
                filtros += "<th align='center' style='background-color:transparent'>" + "<input align='middle' type='text' class='search_init'/>" + "<\/th>";
            }
            for (i = 0;i < numeroFiltrosOcultosAlFinal;i++)
            {
                filtros += "<th align='center' style='background-color:transparent'>" + "<input align='middle' type='hidden' class='search_init'/>" + "<\/th>";
            }
            $("#" + nombreFiltro).html(filtros);
            var inputs = $("#" + nombreTabla + " thead:last").find("tr th input");
            $(inputs).keyup(function ()
            {
                $('#' + nombreTabla).dataTable().fnFilter(this.value, $(inputs).index(this));
            });
        },
        //crearFiltros
        /**
         * Agrega una fila a un datatable
         * @param nombreTabla nombre de la tabla donde se insertara la nueva fila
         * @param fila Arreglo con todos los campos de una fila
         * @throws si los parámetros de entrada son inválidos
         */
        agregarFila : function (nombreTabla, fila)
        {
            $('#' + nombreTabla).dataTable().fnAddData(fila);
        },
        //agregarFilas
        /**
         * Elimina una fila de un datatable
         * @param fila elemento perteneciente a la fila a eliminar
         * @param nombreTabla nombre de la tabla donde se eliminara la fila
         * @throws si los parámetros de entrada son inválidos
         */
        eliminarFila : function (fila, nombreTabla)
        {
            var row = fila.closest('tr');
            var nRow = row[0];
            $('#' + nombreTabla).dataTable().fnDeleteRow(nRow);
        },
        //eliminarFila
        /**
         * Limpia todos los registros que se encuentran en el datatable
         * @param nombreTabla nombre de la tabla que se limpiara
         * @throws si los parámetros de entrada son inválidos
         */
        limpiarTabla : function (nombreTabla)
        {
            $('#' + nombreTabla).dataTable().fnClearTable();
        }
        //limpiarTabla
    }
    //DataTable
}
//Tablas