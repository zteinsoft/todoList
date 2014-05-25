function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pendingList/pending_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pendingView = Ti.UI.createWindow({
        title: "Pending",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        id: "pendingView"
    });
    $.__views.pendingView && $.addTopLevelView($.__views.pendingView);
    $.__views.pendingList = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        id: "pendingList"
    });
    $.__views.pendingView.add($.__views.pendingList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;