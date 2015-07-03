App.Collection.Layers = Backbone.Collection.extend({
	model: App.Model.Layer,
	comparator: function( model ){
    	return( model.get('category') + model.get('topic') + model.get('order') );
  	}
});
