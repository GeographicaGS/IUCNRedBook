var deps = {};

deps.templateFolder = 'js/template';

deps.JS = [
    'js/lib/jquery-2.1.4.js',
    'js/lib/underscore-1.8.3.js',
    'js/lib/mustache.min.js',
    'js/lib/backbone-1.2.0.js',
    'js/lib/moment-with-locales-2.10.3.js',
    'js/lib/sprintf.js',
    'js/lib/leaflet/leaflet.js',


    // Namespace
    'js/Namespace.js',
    'js/Config.js',
    'js/Cons.js',
    'js/Context.js',

    // --------------------
    // -----  Models ------
    // --------------------
    'js/Model/Layer.js',
    'js/Model/Category.js',

    // --------------------
    // ---  Collections ---
    // --------------------
    'js/Collection/Layers.js',
    'js/Collection/Categories.js',

    // --------------------
    // ------  Views ------
    // --------------------
    'js/View/ErrorView.js',
    'js/View/NotFoundView.js',
    'js/View/AddLayerItemView.js',
    'js/View/AddLayerGroupView.js',
    'js/View/AddLayerPanelView.js',
    'js/View/MapLayerItemView.js',
    'js/View/MapLayerGroupView.js',
    'js/View/MapLayerPanelView.js',
    'js/View/ContentPanelView.js',
    'js/View/TooltipMapView.js',
    'js/View/MapView.js',
    'js/View/MainView.js',

    // router
    'js/Router.js',

    // app
    'js/App.js',

    // others
    'js/Catalog.js',
    'js/gSLayerWMS.js',
];



deps.lessFile = 'css/styles.less';

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
