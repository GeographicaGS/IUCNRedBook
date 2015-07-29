App.View.Map = Backbone.View.extend({
    _tooltip_template : $('#map-tooltip_template').html(),

    currentWMSLayers: [],

    events:{},

    initialize: function() {
        $("#map").outerHeight($("#map").outerHeight()-$("footer").outerHeight()-$("header").outerHeight());
        $("#map").css({"top": $("header").outerHeight()});

        //create the left map's leaflet instance
        this._map = new L.Map('map', {'zoomControl': false}).setView([App.Cons.iniLat, App.Cons.iniLng], App.Cons.iniZoom);

        L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
            {attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
        ).addTo(this._map);

        // add zoom control to map left
        var zoomControl = new L.Control.Zoom({
            position : 'topright'
        });

        zoomControl.addTo(this._map);

        this._map.touchZoom.disable();

        this.listenTo(App.currentLayers, 'add', this.renderLayers);
        this.listenTo(App.currentLayers, 'remove', this.renderLayers);
        this.listenTo(App.currentLayers, 'change:visible', this.updateLayers);
        this.listenTo(App.currentLayers, 'change:opacity', this.updateLayers);

        this._map.on("click", this.getFeatureInfo, this);

        this.render();

        var aux = Backbone.history.getFragment();
        if(aux){
            aux = aux.split(App.router.langRoutes["_link map"][[App.lang]]);
            if(aux.length >1){
                this.getRoute(aux[1]);
    	    }
        }

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
        elem.get('layerInstance').setVisibility(false, null, null);
    },

    updateLayers: function(elem) {
        var gSLayerWMS = elem.get('layerInstance');
        var visible = elem.get('visible');
        if(gSLayerWMS.numLayers === 1){
            gSLayerWMS.setVisibility(visible, gSLayerWMS.z_index, this._map._zoom);
            gSLayerWMS.setOpacity(elem.get('opacity'));
        }else{
            this.renderLayers();
        }

        this.setRoute();
    },

    renderLayers: function() {
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
                    groups[i].unshift(currentLayers[idx]);
                }else{
                    i++;
                    groups[i] = [];
                    groups[i].push(currentLayers[idx]);
                }
            }
        }

        var numLayers = groups.length;
        for (var j in groups){
            this.addLayers(groups[j], numLayers - j);
        }

        this.setRoute();
    },

    getFeatureInfo : function(e,id){
        if(!id){
            id = 0;
        }

        var map = this._map;
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
                server =  currentLayers[i].wmsServer;
                layers = currentLayers[i].wmsLayName;
                requestIdx = i;
                break;
            }
        }

        if (layers==null || server==null || requestIdx==null)
        {
            $("#container_feature_info").html("No hay información sobre este punto");

            return;
        }

        var request = server + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=' +layers+'&QUERY_LAYERS='+layers+'&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=application%2Fjson&SRS=EPSG%3A4326&X='+X+'&Y='+Y;
		request = request.replace("wmts","wms");

        var obj = this;
	    $.ajax({
			url : request,
			type: "GET",
	        success: function(data) {
	        	try {
		        	if (!data || data.features.length === 0){
		        		obj.getFeatureInfo(e,requestIdx+1);
		        	}
		        	else{
                        if(currentLayers[requestIdx].gis)
                        currentLayers[requestIdx].gis = App.config.static_path + 'gis/' + currentLayers[requestIdx].gis;
                        if(currentLayers[requestIdx].xls)
                            currentLayers[requestIdx].xls = App.config.static_path + 'xls/' + currentLayers[requestIdx].xls;
                        var content = new App.View.MapTooltip({model: currentLayers[requestIdx]});
                        obj.listenTo(content, 'openPdf', this.openPdf);
                        var popup = L.popup()
                            .setLatLng(e.latlng)
                            .setContent(content.render().el)
                            .openOn(obj._map);
		        	}
	        	}catch (ex){
	        		if((i+1) < currentLayers.length){
        				obj.getFeatureInfo(e, requestIdx+1);
        			}else{
        				console.log('No data');
        			}
	        	}
	        },
	        error: function(){
                if((i+1) < currentLayers.length){
                    obj.getFeatureInfo(e, requestIdx+1);
                }else{
                    console.log('No data');
                }
	        }
	    });
    },

    buildRoute: function() {
		var layers = "";
		var actives = "";
		var opacity = "";

        var currentLayers = App.currentLayers.toJSON();

		currentLayers.forEach(function(layer) {
			layers += layer.id + "_"

			if(layer.visible){
				actives += "1_"
			}else{
				actives += "0_"
			}

			opacity += (layer.opacity * 100) + "_";

		});
		layers = layers.replace(/_([^_]*)$/,"/"+'$1');
		actives = actives.replace(/_([^_]*)$/,"/"+'$1');
		opacity = opacity.replace(/_([^_]*)$/,"/"+'$1');

		return layers + actives + opacity;
	},

    setRoute: function() {
		if(Backbone.history.fragment.indexOf(App.router.langRoutes["_link map"][[App.lang]]) == 0){

			var result = this.buildRoute();

			if(result != ""){
				App.router.navigate(App.router.langRoutes["_link map"][[App.lang]] + "/" + result,{trigger: false});
			}else{
				App.router.navigate(App.router.langRoutes["_link map"][[App.lang]],{trigger: false});
			}
		}
	},

    getRoute: function(route) {
    	var args = route.split('/');
    	if(args.length > 3){
    		if(args[1].indexOf(App.router.langRoutes['_link map'][[App.lang]]) == -1){
    			var layers = args[1].split('_');
    			var actives = args[2].split('_');
    			var opacity = args[3].split('_');
    			for(var i=layers.length -1; i>=0; i--){
                    var layer = App.catalog.getLayerById(parseInt(layers[i]));
                    var visible = (actives[i] == "1");
                    layer.set({'visible': visible, opacity: (parseInt(opacity[i]) / 100)});
                    App.currentLayers.add(layer);
    			}
           	}
    	}
	},

    toggleOpen: function(e, force){
        if(force === undefined)
            this.$el.toggleClass('shrink');
        else
            this.$el.toggleClass('shrink', force);
    },

    openPdf: function(e){
        this.toggleOpen();
        this.trigger('openPdf');
    }

});
