'use strict';

var ENTER_KEY = 13;

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();

  if (this.onClose){
    this.onClose();
  }
}

String.prototype.endsWith = function(suffix) {
   return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

App.events = {};

_.extend(App.events , Backbone.Events);

App.events.on('context:change',function(ctxData){
    if (ctxData.type == App.Cons.TYPE_TWEETS){
        $('.info-panel').hide();
    }
    else{
        $('.info-panel').show();
    }
});


$(function() {

    $(document).ajaxError(function(event, jqxhr) {
        if (jqxhr.status == 404) {
            App.router.navigate('notfound',{trigger: true});
        }
        else {
            App.router.navigate('error',{trigger: true});
        }
    });

    $('body').on('click','a',function(e){
        var attr = $(this).attr('jslink'),
            href = $(this).attr('href');

        if (attr!= undefined && attr!='undefined'){
            e.preventDefault();
            if (href=='#back') {
                history.back();
            }
            App.router.navigate($(this).attr('href'),{trigger: true});
        }
    });

    App.lang = App.detectCurrentLanguage();

    if (App.lang){
        // get locales
        $.getJSON('/locales/'+App.lang+'.json',function(locales){
            App.locales = locales;
            App.ini();
        });
    }
    else{
        App.ini();
    }

    $(document).resize(function(){
        App.resizeMe();
    });

});

App.resizeMe = function(){

};

App.detectCurrentLanguage = function(){
    // Detect lang analyzing the URL
    if (document.URL.indexOf('/es/') != -1 || document.URL.endsWith('/es')) {
        return 'es';
    }
    else if (document.URL.indexOf('/en/') != -1 || document.URL.endsWith('/en')) {
        return 'en';
    }

    return 'es';
};

App.ini = function(){

    this.lang = this.detectCurrentLanguage();


    moment.locale(this.lang);


    var ctx = new Context(),
        map = new App.View.Map({ctx: ctx});
        // groupChart = new App.View.GroupChart({ctx: ctx}),
        // dataPanel = new App.View.DataPanel({ctx: ctx, miniChart:groupChart.getMiniChart()}),
        // sidebar = new App.View.Sidebar({ctx: ctx}),
        // timebar = new App.View.Timebar({ctx: ctx});
        // filterHeader = new App.View.FilterHeader({ctx: ctx});
        // filter = new App.View.Filter({ctx: ctx});

    // Be careful UPDATING the context, that's generated work
    // var options = ctx.toJSON();
    // options.dateFilter.min = '01/01/2015';
    // options.dateFilter.max = '31/12/2015';
    // ctx.update(options);

    this.router = new App.Router({
        ctx: ctx,
        map : map,
        // groupChart : groupChart,
        // dataPanel : dataPanel,
        // sidebar : sidebar,
        // timebar : timebar,
        // filterHeader : filterHeader
        // filter : filter
    });

    this.basePath = this.config.BASE_PATH + this.lang;


    this.$main = $('#main');

    Backbone.history.start({pushState: true,root: this.basePath });

    this.resizeMe();

};


App.showView = function(view) {

    if (this.currentView){
      this.currentView.close();
    }

    this.currentView = view;

    this.$main.html(this.currentView.el);
    this.scrollTop();
}


App.scrollTop = function(){
    var body = $('html, body');
    body.animate({scrollTop:0}, '500', 'swing', function() {

    });
}

App.scrollToEl = function($el){
    $('html, body').animate({
        scrollTop: $el.offset().top
    }, 500);
}

App.nl2br = function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

// Tue, 25 Feb 2014 22:32:40 GMT
App.dateFormat = function(dateStr){
    var date = new Date(dateStr);

    var month = date.getMonth() + 1; //Months are zero based
    var day = date.getUTCDate();
    var year = date.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return day +'/'+month+'/'+year;
}

/* dateStr must be a date in GMT Tue, 25 Feb 2014 22:32:40 GMT*/
App.dateTimeFormat = function(dateStr){
    var date = new Date(dateStr);

    var month = date.getMonth() + 1; //Months are zero based
    var day = date.getUTCDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return day +'/'+month+'/'+year +' - ' + hours + ':' + minutes ;
}

App.slug = function(str) {
    var $slug = '';
    var trimmed = $.trim(str);
    $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
    replace(/-+/g, '-').
    replace(/^-|-$/g, '');
    return $slug.toLowerCase();
}

App.tr = function(key){
    if (this.locales && this.locales.hasOwnProperty(key)){
        return this.locales[key];
    }
    else{
        return key;
    }
}

App.getBrowserInfo = function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

App.getAPISQLURL = function(){
    return 'https://' + App.config.account + '.cartodb.com/api/v2/sql/';
}

App.formatNumber = function (n,decimals){

    if (n===null){
        return "--";
    }

    if (decimals ===null || decimals === undefined){
        decimals = 2;
    }

    if (typeof n == "number"){
        return parseFloat(sprintf("%."+ decimals + "f",n)).toLocaleString(this.lang, {
            style: 'decimal',
            minimumFractionDigits: decimals
        });
    }
    else{

        if (n.indexOf(".") != -1){
            n = sprintf("%."+ decimals + "f",n);
            return parseFloat(n).toFixed(decimals).toLocaleString(this.lang, {
                style: 'decimal',
                minimumFractionDigits: decimals
            });
        }
        else{
            return parseInt(n).toLocaleString(this.lang, {
                style: 'decimal',
                minimumFractionDigits: decimals
            });
        }
    }
};

// App.getFilterPetrolPumpTransactions = function (ctx){
//     var query = '',
//     typeFilters = ctx.typeFilter;


//     if(typeFilters){

//         if(typeFilters.indexOf('gas') >= 0){
//             query += ' AND familia_pago= \'gasolina\''
//         }else if(typeFilters.indexOf('shop') >= 0){
//             query += ' AND familia_pago= \'tienda\''
//         }

//         if(typeFilters.indexOf('pump') >= 0){
//             query += ' AND payment_type= \'PAGO EN SURTIDOR\''
//         }else if(typeFilters.indexOf('box') >= 0){
//             query += ' AND payment_type= \'PAGO EN CAJA\''
//         }else if(typeFilters.indexOf('refund') >= 0){
//             query += ' AND payment_type= \'DEVOLUCIÓN EN CAJA\''
//         }
//     }
//     return query;
// };


// App.getFilterPetrolPumpTransactions = function (ctx){
//     var query = '',
//     typeFilters = ctx.typeFilter;


//     if(typeFilters){

//         if(typeFilters.indexOf('gas') >= 0){
//             query += ' AND familia_pago= \'gasolina\''
//         }else if(typeFilters.indexOf('shop') >= 0){
//             query += ' AND familia_pago= \'tienda\''
//         }

//         if(typeFilters.indexOf('pump') >= 0){
//             query += ' AND payment_type= \'PAGO EN SURTIDOR\''
//         }else if(typeFilters.indexOf('box') >= 0){
//             query += ' AND payment_type= \'PAGO EN CAJA\''
//         }else if(typeFilters.indexOf('refund') >= 0){
//             query += ' AND payment_type= \'DEVOLUCIÓN EN CAJA\''
//         }
//     }
//     return query;
// };
