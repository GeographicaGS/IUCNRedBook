App.Collection.Layers = Backbone.Collection.extend({
	model: App.Model.Layer,
	comparator: function( model ){
    	return( model.get('category') + model.get('topic') + model.get('order') );
	},
	layersByCategory: function(){
		var counter = {};
		this.each(function(layer){
			var category = layer.get('category');
			if(!counter[category]){
				counter[category] = 1;
			}else{
				counter[category]++;
			}
		});

		return counter;
	}
});
