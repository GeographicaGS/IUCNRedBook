App.Model.Category = Backbone.Model.extend({

	totalLayerCount: function() {
		var count = 0;
		_.each(this.get('topics'),function(el){
			count += el.layers.length;
		});
		return count;
	}
});
