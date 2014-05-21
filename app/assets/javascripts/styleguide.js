require([ "jquery" ], function($) {

  "use strict";

  require([
    "lib/utils/swipe",
    "lib/utils/konami",
    "lib/utils/scroll_perf",
    "lib/utils/toggle_active",
    "lib/managers/select_group_manager",
    "lib/styleguide/svg",
    "lib/styleguide/copy",
    "lib/styleguide/swipe",
    "pickadate/lib/legacy",
    "pickadate/lib/picker",
    "lib/styleguide/konami",
    "lib/styleguide/colours",
    "lib/components/lightbox",
    "lib/styleguide/lightbox",
    "lib/utils/feature_detect",
    "lib/styleguide/typography",
    "pickadate/lib/picker.date",
    "lib/components/range_slider",
    "lib/styleguide/snippet-expand"
  ], function(Swipe, Konami, ScrollPerf, ToggleActive, SelectGroupManager) {

    new ScrollPerf();
    new ToggleActive();
    new Konami();
    new Swipe();
    new SelectGroupManager();

    var d = new Date();
    $(".input--datepicker").pickadate({
      min: [ d.getFullYear(), (d.getMonth() + 1), d.getDate() ]
    });

  });
});
