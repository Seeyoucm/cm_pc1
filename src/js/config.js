require.config({   
    paths : {
        jquery : "/CM_project/src/lib/jquery/jquery-1.12.4.min",
        template : "/CM_project/src/lib/art-template/template-web",
        cookie : "/CM_project/src/lib/jquery-plugins/jquery.cookie",
        zoom : "/CM_project/src/lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        loadHF : "/CM_project/src/js/loadHeaderFooter",
        pul : "/CM_project/src/lib/jquery-plugins/pinterest_grid"
    },
    shim : {
        zoom : {
            deps : ["jquery"]
        },
        pul : {
            deps : ["jquery"]
        }
    }
});
