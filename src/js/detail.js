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
                        $(function(){
                            // 绑定事件
                            $("#goCar").on("click", function(e){
                                // 阻止默认行为：默认超级链接点击跳转
                                e.preventDefault();
                                // 将当前选购商品信息获取到
                                let prod = {
                                    pid : $(this).find(".id").text(),
                                    title : $(this).find("p").text(),
                                    price : $(this).find(".rmb-price").text().slice(1),
                                    img : $(this).find("img").attr("src"),
                                    amount : 1
                         };
                         // 配置 cookie 插件，自动在JS值与JSON字符串之间转换
                         $.cookie.json = true;
                         // 获取 cookie 中已保存的 购物车
                         let products = $.cookie("products") || [];
                         // 判断原购物车中是否已存在选购商品
                         let index = exist(prod.pid, products);
                            if (index === -1) // 不存在
                             // 将当前选购商品添加到数组中保存
                                products.push(prod);
                            else // 存在
                                // 修改数量
                                products[index].amount++;
                            // 将购物车再保存回 cookie 中
                            $.cookie("products", products, {expires:7, path:"/"});
                            // 加载购物车成功：抛物线
                            let end = $(".b_a").offset(),
                                flyer = $(`<img src="${prod.img}">`);
                            flyer.fly({
                                start : {
                                    left : e.pageX,
                                    top : e.pageY
                                },
                                end : {
                                    left : end.left,
                                    top : end.top,
                                    width: 20,
                                    height:20
                                }
                            });
                        });

                            function exist(id, products) {
                                var existIndex = -1;
                                $.each(products, function(index, prod){
                                    if(prod.pid === id) {
                                        existIndex = index;
                                        return false;
                                    }
                                });
                                return existIndex;
                            }
                        });
                    }).done(function(){
                        //跟随导航
                        var nav = $("#g_nav"),
                            win = $(window),
                            doc = $(document);
                            console.log(nav);
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
 
