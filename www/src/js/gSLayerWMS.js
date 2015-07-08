function GSLayerWMS(layers, maxZoom, map){
	this.id = layers[0].id;
	this.title = layers[0].name;
	this.url = layers[0].wmsServer;
	this.visible = true;
	this.layer = null;
	this.maxZoom = maxZoom;
	this.z_index = null;
    this.map = map;
	this.numLayers = layers.length;
	this.layersName = layers[0].wmsLayName;

	for(var i = 1;i<layers.length;i++){
		this.layersName = this.layersName + ',' + layers[i].wmsLayName;
	}

	this.setVisibility = function(visibility, z_index, zoomLevel){

		if(this.layer == null){
			this.layer =  L.tileLayer.wms(this.url, {
								layers: this.layersName,
								format: 'image/png',
								transparent: true
							});
		}

		if((visibility) && (zoomLevel <= this.maxZoom)){
			this.layer.addTo(map);
			this.z_index = z_index;
			this.layer.setZIndex(z_index);
			this.visible = true;
		}else{
			this.map.removeLayer(this.layer);
			this.visible = false;
		}
	};

	this.setOpacity = function(opacity){
		this.layer.setOpacity(opacity);
	}
}
