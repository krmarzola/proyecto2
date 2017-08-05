// ***this goes on the global scope
// get querystring as an array split on "&"
var querystring = location.search.replace('?', '').split('&');
// declare object
var queryObj = {
};

$(document).ready(function () {

    // Funcion para limpar un formulario.
    $.fn.clearForm = function () {
        return this.each(function () {
            var type = this.type, tag = this.tagName.toLowerCase();
            if (tag == 'form')
                return $(':input', this).clearForm();
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = '';
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex =  - 1;
        });
    };

    // loop through each name-value pair and populate object
    for (var i = 0;i < querystring.length;i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
        
    }
    
});