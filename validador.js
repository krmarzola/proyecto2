var contador = 0;
var Validador = 
{
    validar : function (expresionRegular,contenedor){
    var discriminador ="";
    var control = true;
    if(contenedor==null){
    $(".required:visible").each(function (i) {
        if (($(this).val() == "") && ($(this).attr("disabled") != "disabled")) {
            if ($(this).attr("valid") != "errorForm") {
                var idElemento = $(this).attr("id");
                var posicion = $(this).position();
                var tamano = $(this).css("width");
                var totalMargenIzq =  posicion.left + parseInt(tamano) -120;
                $(this).parent().append("<div id='form"+i+"-"+idElemento+"' class='reqformError parentFormformID formError' style='position: absolute; top: "+posicion.top+"px; left: "+totalMargenIzq+"px; margin-top: -33px;'>" +
                "<div id='single_form_element" + i + "' class='formErrorContent'>Este campo es requerido<\/div>" +
                "<div id='error" + i + "' class='formErrorArrow' style='float:left;'>" +
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
                $(this).attr("valid","errorForm");
            }
            control = false;
        }
    });
    if (control) {
        $("input:visible, textarea:visible, select:visible").each(function (k) {
            if ($(this).attr("class") != null && $(this).attr("disabled") != "disabled" && $(this).attr("id")!="" && $(this).attr("id")!=null) {
                var mensaje;
                var clases = $(this).attr("class");
                var idElemento = $(this).attr("id");
                var mi_clase = clases.split(" ");
                for (i = 0;i < mi_clase.length;i++) {
                 $.each(expresionRegular, function (j, data) {
                        if (mi_clase[i] == data.clase && $("#" + idElemento).val().match(data.expresion) == null) {
                            if ($("#" + idElemento).attr("valid") != "errorForm") {
                            if($("#" + idElemento).attr("rel")!=null)
                              mensaje = $("#" + idElemento).attr("rel");
                            else if (data.mensaje!=null)
                              mensaje = data.mensaje;
                            else
                             mensaje = "Dato no Valido";
                            var posicion = $("#" + idElemento).position();
                            var tamano = $("#" + idElemento).css("width");
                            var totalMargenIzq =  posicion.left + parseInt(tamano) -120;
                            $("#" + idElemento).parent().append("<div id='form"+i+"-"+idElemento+"' class='reqformError parentFormformID formError' style='position: absolute; top: "+posicion.top+"px; left: "+totalMargenIzq+"px; margin-top: -33px; filter: alpha(opacity=60); opacity: .6'>" +
                            "<div id='single_form_element" + i + "' class='formErrorContent'>"+mensaje+"<\/div>" +
                            "<div id='error" + i + "' class='formErrorArrow' style='float:left;'>" +
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
                            discriminador = idElemento;
                            var alto = $("#single_form_element" + i).height();
                            $("#form"+i+"-"+idElemento).css("top",posicion.top-(alto-10)+"px");
                            $("#" + idElemento).attr("valid","errorForm");
                            }
                            control = false;
                        }
                  });
                }
            }
        });
    }
    }
    else{
      $('#'+contenedor).find($(".required:visible")).each(function (i) {
        if (($(this).val() == "") && ($(this).attr("disabled") != "disabled")) {
            if ($(this).attr("valid") != "errorForm") {
                var idElemento = $(this).attr("id");
                var posicion = $(this).position();
                var tamano = $(this).css("width");
                var totalMargenIzq =  posicion.left + parseInt(tamano) -120;
                $(this).parent().append("<div id='form"+i+"-"+idElemento+"' class='reqformError parentFormformID formError' style='position: absolute; top: "+posicion.top+"px; left: "+totalMargenIzq+"px; margin-top: -33px; filter: alpha(opacity=60); opacity: .6'>" +
                "<div id='single_form_element" + i + "' class='formErrorContent'>Este campo es requerido<\/div>" +
                "<div id='error" + i + "' class='formErrorArrow' style='float:left;'>" +
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
                $(this).attr("valid","errorForm");
            }
            control = false;
        }
    });
    if (control) {
    $('#'+contenedor).find($("input:visible, textarea:visible, select:visible")).each(function (k) {
            if ($(this).attr("class") != null && $(this).attr("disabled") != "disabled" && $(this).attr("id")!="" && $(this).attr("id")!=null) {
                var mensaje;
                var clases = $(this).attr("class");
                var idElemento = $(this).attr("id");
                var mi_clase = clases.split(" ");
                for (i = 0;i < mi_clase.length;i++) {
                 $.each(expresionRegular, function (j, data) {
                        if (mi_clase[i] == data.clase && $("#" + idElemento).val().match(data.expresion) == null) {
                            if ($("#" + idElemento).attr("valid") != "errorForm") {
                            if($("#" + idElemento).attr("rel")!=null)
                              mensaje = $("#" + idElemento).attr("rel");
                            else if (data.mensaje!=null)
                              mensaje = data.mensaje;
                            else
                             mensaje = "Dato no Valido";
                            var posicion = $("#" + idElemento).position();
                            var tamano = $("#" + idElemento).css("width");
                            var totalMargenIzq =  posicion.left + parseInt(tamano) -120;
                            $("#" + idElemento).parent().append("<div id='form"+i+"-"+idElemento+"' class='reqformError parentFormformID formError' style='position:absolute; top: "+posicion.top+"px; left: "+totalMargenIzq+"px; margin-top: -33px; filter: alpha(opacity=60); opacity: .6'>" +
                            "<div id='single_form_element" + i + "' class='formErrorContent'>"+mensaje+"<\/div>" +
                            "<div id='error" + i + "' class='formErrorArrow' style='float:left;'>" +
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
                            discriminador = idElemento;
                            var alto = $("#single_form_element" + i).height();
                            $("#form"+i+"-"+idElemento).css("top",posicion.top-(alto-10)+"px");
                            $("#" + idElemento).attr("valid","errorForm");
                            }
                            control = false;
                        }
                  });
                }
            }
        });
    }
    }
    contador++;
    return control;
}}
$(document).ready(function(){
  $(".formError").live("click",function(){
    $(this).remove();
    //  $("#"+$(this).attr("id").split("-")[1]).removeAttr("valid");
  });
  $("select, input, textarea").live("change",function(){
        var elemento = $(this);
        var idPadre = $(this).parent();
        var divs = $(idPadre).find("div");
        for(j=0;j<divs.length;j++){
        var clases = $(divs[j]).attr("class");
        var mi_clase = clases.split(" ");
          for (i = 0;i < mi_clase.length;i++) {
            if(mi_clase[i]=="formError"){
              $(divs[j]).remove();
              $(elemento).removeAttr("valid");
            }
          }
        }
    });
});