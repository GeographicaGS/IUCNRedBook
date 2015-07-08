'use strict';

var Context = function(opts){
    if (!opts) opts = {};
    this._type = opts.type || App.Cons.TYPE_REG;
    this._aggregation = opts.aggregation || App.Cons.NOAGG;
    this._animation = opts.animation || null;
    this._dateFilter = opts.dateFilter || { min: moment(App.Cons.MIN_DATE), max: moment()};
    this._filters = opts.filters || [];

    return this;
};

Context.prototype._updateOptions = function (opts){
    for (var k in opts){
        this["_"+ k] = opts[k];
    }
};

Context.prototype.toJSON = function(){
    return {
        type : this._type,
        aggregation : this._aggregation,
        animation : this._animation,
        dateFilter : this._dateFilter,
        filters : this._filters
    }
};

Context.prototype.fromURL = function(type,agg,animation,date,filters){

    try{
        this._type = type;
        this._aggregation = agg ;
        this._animation = animation == App.Cons.NOANIMATION ? null : animation;

        var dateSplit = date.split("_")
        this._dateFilter.min = moment(dateSplit[0]);
        this._dateFilter.max = moment(dateSplit[1]);

        this._filters = [];

        if (filters != App.Cons.NOFILTER){
            var filtersarray = filters.split(',');
            for (var i=0;i<filtersarray.length;i++){
                var f = filtersarray[i].split('=');
                this._filters.push({
                    'name' : f[0],
                    'value' : f[1]
                });
            }
        }

        return this;
    }
    catch (err){
        console.error(err);
        return null;
    }

};

Context.prototype._filtersToURL = function(){

    if (!this._filters.length){
        return App.Cons.NOFILTER
    }

    var url = [];

    for (var i=0;i< this._filters.length;i++){
        url.push(this._filters[i].name + '=' + this._filters[i].value);
    }

    return url.join(',');
}

Context.prototype.url = function(){

    var url = [this._type,
            this._aggregation,
            this._animation ? this._animation : App.Cons.NOANIMATION,
            this._dateFilter.min.format('YYYY-MM-DD') + "_" + this._dateFilter.max.format('YYYY-MM-DD'),
            this._filtersToURL()];

    return url.join("/");
};

Context.prototype.update = function(opts,navigate){
    // Change the data
    this._updateOptions(opts);

    if (navigate === undefined || navigate==="undefined" || navigate ===null){
        navigate = true;
    }

    if (navigate){
        App.router.navigate(this.url(),{trigger:false});
    }


    // Tell everyone context has changed
    App.events.trigger('context:change',this.toJSON())
};

Context.prototype.getFilterValueByName = function(name){
    for (var i=0;i<this._filters.length;i++){
        if (this._filters[i].name == name){
            return this._filters[i].value;
        }
    }

    return 'all';
}

Context.prototype.getFilterPlaceholder = function(filter){
    return filter!='all' ? filter : '%';
}
