function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.pendingList = Alloy.createController("pendingList/pending_list", {
        id: "pendingList"
    });
    $.__views.pendingWin = Ti.UI.createTab({
        title: "Pending",
        icon: "KS_nav_ui.png",
        window: $.__views.pendingList.getViewEx({
            recurse: true
        }),
        id: "pendingWin"
    });
    __alloyId0.push($.__views.pendingWin);
    $.__views.completedList = Alloy.createController("completedList/completed_list", {
        id: "completedList"
    });
    $.__views.completedWin = Ti.UI.createTab({
        title: "Completed",
        icon: "KS_nav_views.png",
        window: $.__views.completedList.getViewEx({
            recurse: true
        }),
        id: "completedWin"
    });
    __alloyId0.push($.__views.completedWin);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;