"use strict";

var App = App || {};

App.Router = Backbone.Router.extend({

    langRoutes : {
        "_link map" : {"es": "mapa", "fr": "carte" },
        "_link help" : {"es": "ayuda", "fr": "aide" },
        "_link legal" : {"es": "legal", "fr": "juridique" },
        "_link privacy" : {"es": "privacidad", "fr": "confidentialité" },
    },

    routes : {
        "": "start",
        "map": "map",
        "map/:layers/:actives/:opacity": "map",
        "help": "help",
        "legal": "legal",
        "privacy": "privacy"
    },

    initialize: function(opts) {
        this.route(this.langRoutes["_link map"][App.lang], "map");
        this.route(this.langRoutes["_link map"][App.lang] + "/:capas/:activas/:opacidad", "map");
        this.route(this.langRoutes["_link help"][App.lang], "help");
        this.route(this.langRoutes["_link legal"][App.lang], "legal");
        this.route(this.langRoutes["_link privacy"][App.lang], "privacy");
    },

    start: function(){
        this.navigate(this.langRoutes["_link map"][App.lang], { trigger: true});
    },

    map: function(layers,actives,opacity){
        if(!App.isSupportedBrowser()){
            $("#content").show();
            $("#map").hide();
            window.location.href="/" + App.lang + "/browser_error.html";
        }else{

        }
    },

    notfound: function(){
        App.showView(new App.View.NotFound());
    },

    error: function(){
        App.showView(new App.View.Error());
    }

});
