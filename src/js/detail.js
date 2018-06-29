 require(["config"], function(){
    require(["jquery", "template","zoom"], function($,template,zoom){    
        //加载元素
    $(document).ready(function($) {
             //加载头部
        $.ajax("/html/include/header.html").done(function(data){
                $("#detail_header").html(data);
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
                        $("#detail_footer").html(data);
                    }).done(function(){
                         //模板引擎加载人气单品数据
                        $.getJSON("/mock/detail1.json", function(data){
                        // 使用 artTemplate 渲染
                            let html = template("de_dan", {products : data.res_body.products});
                        // 显示
                            $(".detail_ul").prepend(html);
                        });
                    });
            }).done(function(){
                         //模板引擎加载热门推荐数据
                        $.getJSON("/mock/detail2.json", function(data){
                        // 使用 artTemplate 渲染
                            let html = template("de_ho", {products : data.res_body.products});
                        // 显示
                            $("._host").prepend(html);
                        });
                    }).done(function(){
                        //放大镜效果
                        $("#zoom").elevateZoom({
                            gallery:'detailz_01', 
                            cursor: 'pointer', 
                            galleryActiveClass: "active"
                        });
                    }).done(function(){
                        //加入购物车
                        $("#goCar").on("click",function(e){
                            //阻止默认行为
                            e.preventDefault();
                            //获取当前商品的ID信息
                            let _id = $(this).data("id");
                            console.log(_id);
                        });  
                    }).done(function(){
                        //跟随导航
                        var nav = $("#g_nav"),
                            win = $(window),
                            doc = $(document);
                        win.scroll(function(){
                            if(doc.scrollTop() >= 1171){
                                nav[0].style.display = "block";

                            }else{
                                nav[0].style.display = "none";
                            }
                        })
                    });
        });  
    });
});
 
