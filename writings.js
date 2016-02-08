
var startWritingFunction = function(){
$("#most-commented-writing").click(function(){
      $("#most-recent-writing").removeClass('slider-active');
      $("#most-commented-writing").addClass('slider-active');
     jQuery("#top-10-writings").html("");
      initWritingsPage(1, 'commented');
     });

     $("#most-recent-writing").click(function(){
      $("#most-commented-writing").removeClass('slider-active');
      $("#most-recent-writing").addClass('slider-active');
      jQuery("#top-10-writings").html("");
      initWritingsPage(1, 'recent');
     });
     $("#most-recent-authors").click(function(){
      jQuery("#top-10-writings").html("");
      initAuthorsBox(1, 'recent');
     });
};


function initAuthorsBox(page,type){
 var myDiv = "";
 $.ajax({
 url:'/ajax',
 type: 'post',
 contentType: "application/x-www-form-urlencoded",
 data: 'action=getAuthors&page='+page+ '&type='+type ,
 success: function(data) {
                data = $.parseJSON(data);
                if(data.success){
                  var loggedIn = data.loggedin;
                  myDiv += '<div class="authorBoxTitle">';
                  myDiv += 'View new authors who have signed up (limit 25)';
                  myDiv += '</div>';
                  myDiv += '<div class="justWriters">';
                  for(var author in data.authors){
                      author = data.authors[author]; 
                      myDiv += '<div class="recent-author">';
                      myDiv += '<div class="username" class="writing-title">';
                      myDiv += '<a href="/view-author?author=' + author.userid + '">'+ author.username+'</a>';
                      myDiv += '</div>';
                      myDiv += '</div>';
                 }
            page = parseInt(page);
            if(page < 5){
              page += 1;
              myDiv += '<div class="page-authors-button">';
              myDiv += '<input class="pager" type="button" name="next" value="next" id="next" val="' + page + '">';
              myDiv += '</div>';
            }
        myDiv += '</div>';

  jQuery("#top-10-writings").html(myDiv);
  //jQuery("#authorsBox").html(myDiv);
}
}
});
}

var startPageFunction = function(){
    initWritingsPage(1, 'recent', author);
    $('.add-friend').click(function(e){
    var id = this.id;

    e.preventDefault();

    $.ajax({
        url:'/ajax',
        type: 'post',
        contentType: "application/x-www-form-urlencoded",
        data: 'action=addFriend&friendid=' + id,
        success: function(data) {
             data = $.parseJSON(data);
             showFlash(data.message);       
     }
    });

  });
};

function defer(method) {
    if (window.jQuery)
       $(document).ready(function(){
        method();
       });
    else
        setTimeout(function() { defer(method) }, 50);
}
defer(startPageFunction);
defer(startWritingFunction);
function initWritingsPage(page,type, authorid){
 var myDiv = "";
 
 var myData = '';



 $.ajax({
 url:'/ajax',
 type: 'post',
 contentType: "application/x-www-form-urlencoded",
 data: 'action=getWritings&page='+page+ '&type='+type+'&authorid='+authorid,
 success: function(data) {
                data = $.parseJSON(data);
                if(data.success){
                  var loggedIn = data.loggedin;
                  var i = 1;
                  for(var writing in data.writings){
                      writing = data.writings[writing]; 
                      if(i != 1)
                         myDiv += '<div class="top-writing">';
 		      else
                         myDiv += '<div class="top-writing" id="top-writing-1">';
                      myDiv += '<div id="'+writing.writingid +'" class="writing-title">';
                      myDiv += '<a href="/view-writing?writing=' + writing.writingid + '">'+ writing.name+'</a>';
                      myDiv += '</div>';
                      myDiv += '<div id="author">';
                      myDiv += '<a href="/view-author?author=' + writing.userid+'">By ' + writing.username+'</a>';
                      myDiv += '</div>';
                      myDiv += '</div>';
                      i++;
                 }
            page = parseInt(page);
            nextPage =page + 1;
            prevPage =page - 1;
           
            if(data.rewind == 1){
              myDiv += '<div class="page-button page-button-prev">';
              myDiv += '<input class="pager" type="button" name="prev" value="prev" id="prev" val="' + prevPage + '">';
              myDiv += '</div>';
            }

            if(!data.finished){
              myDiv += '<div class="page-button page-button-next">';
              myDiv += '<input class="pager" type="button" name="next" value="next" id="next" val="' + nextPage + '">';
              myDiv += '</div>';
            }
            if(data.writings.length == 0 && data.mine && page == 1){
              myDiv += '<div class="helpful">';
              myDiv += 'Click compose to add new writings';
              myDiv += '</div>';
            }
            else if(data.writings.length == 0 && data.mine && page >= 1){
              myDiv += '<div class="helpful">';
              myDiv += 'End of writings';
              myDiv += '</div>';
            } 
            else if(data.writings.length == 0){
              myDiv += '<div class="helpful">';
              myDiv += 'No writings';
              myDiv += '</div>';
            }

            page =page + 1;
  jQuery("#recent-writings").html(myDiv);


  $('#next').click(function(){
     var selectedType = $('#most-recent-writing').hasClass('slider-active') ? "recent" : "commented";
     var page = $(this).attr("val");
     initWritingsPage(page, selectedType);
  });

  $('#prev').click(function(){
     var selectedType = $('#most-recent-writing').hasClass('slider-active') ? "recent" : "commented";
     var page = $(this).attr("val");
     initWritingsPage(page, selectedType);
  });



  $('.writing-title a').click(function(e){
     e.preventDefault();
   });

   $('.top-writing').click(function(e){
     var writingid = $(this).children()[0].id;
     loadWriting(writingid);
   });

   simulateClick();

}
}
});

}
function simulateClick(){
   $('.top-writing').first().trigger ( "click" );
}

function loadWriting(writingid){

     $.ajax({
        url:'/ajax',
        type: 'post',
        contentType: "application/x-www-form-urlencoded",
        data: 'action=getWritingComments&writingid=' + writingid,
        success: function(data) {
                data = $.parseJSON(data);
                if(data.success){
                  $('#cur-writing-title').html("<a href='/view-writing?writing=" +data.writing[0].writingid+"'>"+ data.writing[0].name + "</a>");
                  var writingHtml = "";
                  var picture = false;
                  if(!(data.writing[0].picture == undefined || data.writing[0].picture == "")){
                    picture = true; 
                    writingHtml = "<div class='picture-page'><image id='picture-item' src='/pictures/" + data.writing[0].picture + "' ></image>"  + "</div>";
                  }
                  writingHtml += data.writing[0].text + "<div id='writing-id' class='hidden'>" + writingid + "</div>";
                  $('#text').html(writingHtml);

                  var myDiv = "Comments: ";
                  var loggedIn = data.loggedin;
                  for(var comment in data.comments){
                      comment = data.comments[comment]; 
                      myDiv += "<div class='writing-comment'>";
                      myDiv += "<div class='writing-comment-text'>";
                      myDiv += comment.comment_text;
                      myDiv += "</div>";
                      if(comment.hasDeletePermission == true){
                      myDiv += '<div class="delete-comment-div">';
                      myDiv += '<input class="delete-commment-button" type="button" value="Delete" name="delete-comment" id="'+comment.commentid+ '"/>';
                      myDiv += '</div>';
                      }
                      myDiv += "<div class='writing-comment-by'>";

                      if(comment.avatar != undefined){
                      myDiv += "<img class='comment-avatar' src='";
                      myDiv += comment.avatar;
                      myDiv += "'>";
                      }
                      myDiv += "<br>";
                      myDiv += "<a href='view-author?author=";
                      myDiv += comment.userid;
                      myDiv += "'>";
                      myDiv += comment.username;
                      myDiv += "</a>";

                      myDiv += "</div>";
                      myDiv += "</div>";
                  }
                  if(loggedIn){
                    myDiv += "<br>";
                    myDiv += '<div class="add-comment-writing">';
                    myDiv += '<textarea id="writing-comment-text" cols="32" rows="10" name="writing-comment-text"> </textarea>';
                    myDiv += '<br>';
                    myDiv += 'Add a comment:';
                    myDiv += '<input type="button" id="comment" name="comment" value="comment">';
                    myDiv += '</div>';
                    myDiv += '</div>';
                    $('#recent-comments').html(myDiv);
                    initDelete();
                    initSave();
                  }
                  else{
                     $('#recent-comments').html(myDiv);

                  }

//                  alert(data.writing[0].writingid);
//                   showFlash(data.message); 
                }
         }
        });


}


 function showFlash(message) {
    jQuery('#flash-message').html('<div id="flash" style="display:none"></div>');
    jQuery('#flash').html(message +" (Remove by clicking)");
    jQuery('#flash').toggleClass('styledFlash');
    jQuery('#flash').slideDown('slow');
    jQuery('#flash').click(function () { $('#flash').toggle('highlight') });
}


