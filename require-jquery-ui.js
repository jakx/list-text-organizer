function defer(method) {
    if (window.jQuery)
        $(document).ready(function(){
               $.getScript(method);
        });
    else
        setTimeout(function() { defer(method) }, 50);
}
defer('jquery-ui-1.8.16.custom.js');
