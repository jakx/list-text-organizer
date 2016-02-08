function deleteComment(e){

jQuery(".delete-comment-div").click(function(e) {
 var commentId = $(this).children(0).attr('id');
 $.ajax({
    url:'/ajax',
    type: 'post',
    contentType: "application/x-www-form-urlencoded",
    data: 'action=deleteOneComment&commentid=' + commentId+'&writingid='+writing ,
    success: function(data) {
            window.location.reload();
     }
    });
});
}
