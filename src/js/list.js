 require(["config"], function(){
    require(["jquery", "template"], function($,template){    
        //加载元素
    $(document).ready(function($) {
             //加载头部
        $.ajax("/html/include/header.html").done(function(data){
                $("#list_header").html(data);
             }).done(function(){
            //加载尾部
            $.ajax("/html/include/footer.html").done(function(data){
                        $("#list_footer").html(data);
                    }).done(function(){
                         //模板引擎加载数据
                        $.getJSON("/mock/list.json", function(data){
                        // 使用 artTemplate 渲染
                            let html = template("listj_left", {products : data.res_body.products});
                        // 显示
                            $(".uj_1").prepend(html);
                        });
                    });
            });
        });  
    });
});



