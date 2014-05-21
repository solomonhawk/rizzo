require([ "jquery" ], function($) {

  "use strict";

  var iconColors = [],
      intro = $(".js-intro-section"),
      colorFilter = $("#js-icon-filter"),
      colorSelect = intro.find(".js-select"),
      icons = $(".js-icon"),
      iconCards = icons.closest(".js-card"),
      setIconColor = function(color) {
        icons.removeClass(iconColors.join(" "));
        icons.addClass("icon--" + color);
        if (color == "white") {
          icons.parent().addClass("is-white");
        } else {
          icons.parent().removeClass("is-white");
        }
      };

  if (colorSelect.length) {
    $.each(colorSelect.get(0).options, function(_, option) {
      iconColors.push("icon--" + option.value);
    });
  }

  colorSelect.on("change", function() {
    setIconColor(this.value);
  });

  colorFilter.on("keyup", function() {
    var query = this.value;

    iconCards.addClass("is-hidden").each(function() {
      var element = $(this);
      element.data("icon").match(query) && element.removeClass("is-hidden");
    });

    if (iconCards.filter(".is-hidden").length) {
      intro.addClass("is-closed");
    } else {
      intro.removeClass("is-closed");
    }

  });

});
