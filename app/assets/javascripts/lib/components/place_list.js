
define([ "jquery", "lib/extends/events", "lib/utils/page_state" ], function($, EventEmitter, PageState) {

  "use strict";

  var LISTENER = "#js-card-holder";

  // @args = {}
  // el: {string} selector for parent element
  // list: {string} delimited list of child selectors
  function PlacesList( args ) {
    this.$el = $(args.el);
    this.$list = $(args.list);

    this.$el.length && this.init();

  }

  // -----------------
  // Extends
  // ------------------

  $.extend(PlacesList.prototype, PageState.prototype);
  $.extend(PlacesList.prototype, EventEmitter);

  PlacesList.prototype.init = function() {
    this.list = this.$el.find(this.list);
    this.listen();
  };

  PlacesList.prototype.listen = function() {
    $(LISTENER).on( ":cards/received", this._update.bind(this));
  };

  // -----------------
  // Private
  // ------------------

  PlacesList.prototype._update = function() {
    var link,
        newParams = this.getParams();

    this.$list.each(function( i, item ) {
      link = item.href.split("?")[0];
      item.href = (link + "?" + newParams);
    });
  };

  return PlacesList;

});
