'use strict';

App.View.AddLayerPanel = Backbone.View.extend({

    _template : $('#addLayerPanel-layer_panel_template').html(),

    events: {
        'click .btn-cancel': 'closePanel',
        'click .btn-ok': 'closePanel',
        'click .tabs-nav li': 'changeTab',
    },

    initialize: function() {
        this.collection = App.catalog;
        this.render();
        this.$panelEl = this.$el.find("#addlayer-panel");

        this.listenTo(App.currentLayers, 'update', this.updateActive);
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },

    render: function() {
        this.$el.html(Mustache.render(this._template, App.Catalog));

        this.$tabsNav = this.$('.tabs-nav li');
        this.$tabsContent = this.$('.tabs-content div');

        this.$tabsNav.eq(0).addClass('current');
        this.$tabsContent.eq(0).addClass('current');

        this.renderAll();

        return this;
    },

    renderAll: function() {
        this.collection.each(this.renderTab, this);
    },

    renderTab: function(elem, index) {
        var topics = elem.get('topics');
        for (var i = 0; i < topics.length; i++){
            topics[i]['category'] = elem.get('title');
            topics[i]['icon'] = elem.get('icon');
            var group = new App.View.AddLayerGroup({model:topics[i]});
            this.$tabsContent.eq(index).append(group.render().$el);
        }
        // this.$tabsNav.eq(index).find('.counter').html(elem.totalLayerCount());
    },

    openPanel: function() {
        this.$panelEl.addClass('open');
    },

    closePanel: function(ev) {
        if(ev)
            ev.preventDefault();
        this.$panelEl.removeClass('open');
        this.trigger('close');
    },

    changeTab: function(ev) {
        var target = null;
        if(ev){
            ev.preventDefault();
            target = $(ev.target);
            if (target[0].tagName.toLowerCase() != 'li'){
                target = target.parent();
            }
        }
        if(target){
            this.$el.find('.tabs-nav li.current').removeClass('current');
            target.addClass('current');
            this.$el.find('.tabs-content > div.current').removeClass('current');
            this.$el.find('.tabs-content div#'+target.data('tab')).addClass('current');
        }

    },

    updateActive: function(){
        this.$el.find('input[type="checkbox"]').prop('checked', false);
        App.currentLayers.each(this.updateLayer, this);
        var counter = App.currentLayers.layersByCategory();
        this.$tabsNav.each(function(index){
            $(this).find('.counter').html(counter[index] || '');
        });
    },

    updateLayer: function(elem, index){
        this.$el.find('#layer' + elem.get('id')).prop('checked', true);
    },

});
