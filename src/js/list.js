 require(["config"], function(){
    require(["jquery", "template","cookie"], function($,template,cookie){    
        //加载元素
    $(document).ready(function($) {
             //加载头部
        $.ajax("/html/include/header.html").done(function(data){
                $("#list_header").html(data);
             }).done(function(){
            // 加载完毕后，绑定搜索建议提示事件
            $("#search").on("keyup", function(){
                let val = $(this).val(), // 当前文本框中的值
                    url = `https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`; // jsonp URL
                // 使用 $.getJSON 来实现 jsonp 跨域
                $.getJSON(url, function(data){
                    let html = "";
                       data.result.forEach(function(curr){
                           html += `<div>${curr[0]}<div>`;
                    });
                    $(".suggest").html(html);
                });
             });
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

