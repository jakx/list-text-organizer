
function initDelete(){
jQuery(".delete-comment-div").click(function(e) {
 var commentId = $(this).children(0).attr('id');
 var writingId =$('#writing-id').text();
 $.ajax({
    url:'/ajax',
    type: 'post',
    contentType: "application/x-www-form-urlencoded",
    data: 'action=deleteOneComment&commentid=' + commentId +'&writingid='+writingId  ,
    success: function(data) {
     loadWriting(writingId);
         //   window.location.reload();
     }
    });

});
}

function initSave(){

  jQuery("#comment").click(function(e) {
// alert('hi');
 var commentText = $('#writing-comment-text').val();
 var commentType = 'writing comment';
 var writingId =$('#writing-id').text();
 $.ajax({
    url:'/ajax',
    type: 'post',
    contentType: "application/x-www-form-urlencoded",
    data: 'action=saveOneComment&commentType='+commentType+'&objectid='+writingId+'&commentText=' + commentText,
    success: function(data) {
       loadWriting(writingId);
     }
    });
});
}

function saveComment(){


 var commentText = $('#writing-comment-text').val();
 var commentType = 'writing comment';
 $.ajax({
    url:'/ajax',
    type: 'post',
    contentType: "application/x-www-form-urlencoded",
    data: 'action=saveOneComment&commentType='+commentType+'&objectid=writing&commentText=' + commentText,
    success: function(data) {
            $('#writing-comment-text').val('');
            window.location.reload()
//          alert('Message returned: ' + data);
     }
    });
}
function sendMessage(){
 var messageText = $('#message-text').val();
 var commentType = 'private message';
 $.ajax({
    url:'/ajax',
    type: 'post',
    contentType: "application/x-www-form-urlencoded",
    data: 'action=saveOneComment&commentType='+commentType+'&objectid=author&commentText=' + messageText,
    success: function(data) {
            $('#message-text').val('');
            window.location.reload()
//          alert('Message returned: ' + data);
     }
    });
}
