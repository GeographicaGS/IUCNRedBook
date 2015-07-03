App.View.Map = Backbone.View.extend({
    //_template : _.template( $('#map_template').html()),

    currentWMSLayers: [],

    events:{},

    initialize: function() {
        $("#map").outerHeight($("#map").outerHeight()-$("footer").outerHeight()-$("header").outerHeight());
        $("#map").css({"top": $("header").outerHeight()});

        //create the left map's leaflet instance
        this._map = new L.Map('map', {'zoomControl': false}).setView([App.Cons.iniLat, App.Cons.iniLng], App.Cons.iniZoom);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
    ).addTo(this._map);

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

    this.listenTo(App.currentLayers, 'add', this.renderLayers);
    this.listenTo(App.currentLayers, 'remove', this.renderLayers);
    this.listenTo(App.currentLayers, 'change:visible', this.updateLayers);
    this.listenTo(App.currentLayers, 'change:opacity', this.updateLayers);

    //this._map.on("click", this.getFeatureInfo);

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

    addLayers: function(layers, z_index) {
        console.log('add');
        if(layers != null && layers.length > 0){
            var gSLayerWMS = new GSLayerWMS(layers, 1000, this._map);
            gSLayerWMS.setVisibility(layers[0].visible, z_index, this._map._zoom);
            if(layers[0].opacity < 1){
                gSLayerWMS.setOpacity(layers[0].opacity);
            }
            for(var idx in layers){
                var layerModel = App.currentLayers.get(layers[idx]);
                layerModel.set({'layerInstance': gSLayerWMS});
            }
            this.currentWMSLayers.push(gSLayerWMS);
        }
    },

    removeLayer: function(elem) {
        console.log('remove');
        elem.get('layerInstance').setVisibility(false, null, null);
    },

    updateLayers: function(elem) {
        console.log('update');
        var gSLayerWMS = elem.get('layerInstance');
        var visible = elem.get('visible');
        if(gSLayerWMS.numLayers === 1){
            gSLayerWMS.setVisibility(visible, gSLayerWMS.z_index, this._map._zoom);
            gSLayerWMS.setOpacity(elem.get('opacity'));
        }else{
            this.renderLayers();
        }
    },

    renderLayers: function() {
        console.log('renderLayers');

        // Clear current layers
        while(this.currentWMSLayers.length){
            var wmsLayer = this.currentWMSLayers.pop();
            wmsLayer.setVisibility(false, null, null);
        }

        // Load layers
        var groups = [];
        var i = 0;
        groups[i] = [];
        var currentLayers = App.currentLayers.toJSON()
        for (var idx in currentLayers){
            if(idx == 0){
                groups[i].push(currentLayers[idx]);
            }else{
                if (currentLayers[idx].opacity === currentLayers[idx-1].opacity && currentLayers[idx].visible === currentLayers[idx-1].visible && currentLayers[idx].wmsServer === currentLayers[idx-1].wmsServer){
                    groups[i].push(currentLayers[idx]);
                }else{
                    i++;
                    groups[i] = [];
                    groups[i].push(currentLayers[idx]);
                }
            }
        }

        for (var j in groups){
            this.addLayers(groups[j], j);
        }
    },

    getFeatureInfo : function(e,id){
        if(!id){
            id = 0;
        }

        var map = this;
        var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';

        var BBOX = map.getBounds().toBBoxString();
        var WIDTH = map.getSize().x;
        var HEIGHT = map.getSize().y;
        var X = map.layerPointToContainerPoint(e.layerPoint).x;
        var Y = map.layerPointToContainerPoint(e.layerPoint).y;

        var layers = null;
        var server = null;
        var requestIdx = null;

        var currentLayers = App.currentLayers.toJSON();

        for (var i=id;i<currentLayers.length;i++){
            var l = currentLayers[i].layerInstance;
            if (l.visible && l.layer.options.opacity>0){
                /*server = l.url;
                layers = l.name;
                requestIdx = i;*/
                console.dir(l);
                break;
            }
        }

        if (layers==null || server==null || requestIdx==null)
        {
            $("#container_feature_info").html("No hay información sobre este punto");

            return;
        }
    }

});
