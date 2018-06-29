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
        //点击立即购买，跳转并保存cookie
        $(function(){
            $("#u_lpul").delegate("a","click",function(){
                //获取当前点击商品的信息
                let prod = {
                    pid : $(this).find(".id").text(),
                    title : $(this).find("p").text(),
                    price : $(this).find(".btn5").text().slice(1),
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
            });
        });
   
   
   
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

