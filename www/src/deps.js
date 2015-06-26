var deps = {};

deps.templateFolder = 'js/template';

deps.JS = [
    'js/lib/jquery-2.1.4.js',
    'js/lib/underscore-1.8.3.js',
    'js/lib/mustache.min.js',
    'js/lib/backbone-1.2.0.js',
    'js/lib/moment-with-locales-2.10.3.js',
    'js/lib/sprintf.js',


    // Namespace
    'js/Namespace.js',
    'js/Config.js',
    'js/Cons.js',
    'js/Context.js',

    // --------------------
    // ------  Views ------
    // --------------------
    'js/View/ErrorView.js',
    'js/View/NotFoundView.js',

    // --------------------
    // ---  Collections ---
    // --------------------


    // router
    'js/Router.js',
    // app
    'js/App.js'
];



deps.lessFile = 'css/styles.less';

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
