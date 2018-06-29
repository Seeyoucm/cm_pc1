require(["config"],function(){
    require(["jquery"],function($){
        //加载元素
        $(document).ready(function($){
            //绑定搜索建议提示事件
            $("#search").on("keyup",function(){
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
            
        });
        

    });
});
