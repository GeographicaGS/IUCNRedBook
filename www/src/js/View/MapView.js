App.View.Map = Backbone.View.extend({
  //_template : _.template( $('#map_template').html()),

  events:{
  },

  initialize: function() {
    $("#map").outerHeight($("#map").outerHeight()-$("footer").outerHeight()-$("header").outerHeight());
    $("#map").css({"top": $("header").outerHeight()});

    //create the left map's leaflet instance
    this._map = new L.Map('map', {'zoomControl': false}).setView([App.Cons.iniLat, App.Cons.iniLng], App.Cons.iniZoom);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this._map);

    // add zoom control to map left
    var zoomControl = new L.Control.Zoom({
          position : 'topright'
    });

    zoomControl.addTo(this._map);

    this._map.touchZoom.disable();

    /*var aux = Backbone.history.fragment.split(App.router.langRoutes["_link map"][[App.lang]]);
    if(aux.length >1){
      Map.setRoute(aux[1]);
    }*/

    this._tooltipModel = new Backbone.Model();
    this._tooltip = new App.View.TooltipMap({
        model: this._tooltipModel
    });
    $('#map').append(this._tooltip.$el);

    /*this._map.on("click",function(e){
      $.fancybox($("#container_feature_info"), {
        'width':"auto",
        "height": "auto",
        // 'autoDimensions':true,
        'autoSize':true,
        'closeBtn': true,
        'scrolling': 'yes',

        tpl: {
          closeBtn: '<a title="Close" class="fancybox-item fancybox-close myCloseRound" href="javascript:;"><img src="/img/catalogue/ALB_icon_buscar_cerrar.svg"></a>'
        },

        // helpers : {
        //   overlay: {
        //     css: {'background-color': 'rgba(0,0,102,0.85)'}
        //   }
        // },

        afterShow: function () {
          //$.fancybox.update();
          if ($('#groupLayer').is(":visible")) {
            $('.fancybox-wrap').addClass('stretch');
          }
        }
      });

      Map.featureInfo(e);

    });*/

    /*Map.getMap().on('zoomend', function() {
      if(currentMap == 1 && Map.getMap().getZoom() >= 11){
        currentMap = 2;
        Map.getMap().removeLayer(baseMap1);
        baseMap2.addTo(Map.getMap());
      }else if(currentMap == 2 && Map.getMap().getZoom() < 11){
        currentMap = 1;
        Map.getMap().removeLayer(baseMap2);
        baseMap1.addTo(Map.getMap());
      }
    });*/

    this.render();

  },

  onClose: function(){
    // Remove events on close
    this.stopListening();
    $("#map").hide();
  },

  render: function() {
    // this.$el.html(this._template());
    // $("#map").show();

    return this;
  },

});
