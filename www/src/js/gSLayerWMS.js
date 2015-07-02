function GSLayerWMS(id,title, url, name, maxZoom, map){
	this.id = id;
	this.title = title;
	this.url = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.maxZoom = maxZoom;
	this.z_index = null;
    this.map = map;

	this.setVisibility = function(visibility, z_index, zoomLevel){

		if(this.layer == null){
			this.layer =  L.tileLayer.wms(this.url, {
								layers: this.name,
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
}
