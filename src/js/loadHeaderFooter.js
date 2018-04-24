/*加载头部尾部模块*/
define(["jquery"],function($){
    $.ajax("/CM_project/src/html/include/header.html").done(function(data){
        $(".header").html(data);
    }).done(function(){
        
    });
});
