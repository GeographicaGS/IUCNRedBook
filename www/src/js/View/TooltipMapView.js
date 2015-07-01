App.View.TooltipMap = Backbone.View.extend({
    _template : $('#map-tooltip_template').html(),

    className : 'map_tooltip',

    initialize: function(opts) {



        this._map = $('#map');
        this.render();
        this.listenTo(this.model,'change', this.render);
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },

    render: function() {
        var data = this.model.get('data'),
            pos = this.model.get('pos');

        if (!pos){
            this.$el.addClass('hide');
            this._map.css('cursor','auto');
            return;
        }
        else{
            this.$el.removeClass('hide');
            this._map.css('cursor','pointer');
        }

        this.$el.html(Mustache.render(this._template, {data:data}));

        this.$el.css('left',pos.x + 'px').css('top',pos.y + 'px');

        return this;
    }

});
