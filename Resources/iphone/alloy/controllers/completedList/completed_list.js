function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "completedList/completed_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.completedView = Ti.UI.createWindow({
        title: "Completed",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        id: "completedView"
    });
    $.__views.completedView && $.addTopLevelView($.__views.completedView);
    $.__views.completedList = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        id: "completedList"
    });
    $.__views.completedView.add($.__views.completedList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;