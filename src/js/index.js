require(["config"],function(){
    require(["jquery","template"],function($,template){
        //加载元素
        $(document).ready(function($){
            //加载头部
            $.ajax("/html/include/header.html").done(function(data){
                $("#index_header").html(data);
            }).done(function(){
                //加载尾部资源
                $.ajax("/html/include/footer.html").done(function(data){
                    $("#index_footer").html(data);
                })
            });
           
        });
    });
});
