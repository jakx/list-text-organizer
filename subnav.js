var mySubnavSearch = function (){
 $("#subnav-search").click(function(e) {
  e.preventDefault();
  var searchBar = $("#search-bar");
  searchBar.html('Search:<form id="search-form" method="post" action="/search"><input type="text" name="search-value" id="search-value"/></form>');

 if(searchBar.css('display') == 'none'){
    
    searchBar.slideDown('slow');
  }
  else{
    searchBar.hide();
  }
}
);
};

function defer(method) {
    if (window.jQuery)
        method();
    else
        setTimeout(function() { defer(method) }, 50);
}
defer(mySubnavSearch);
