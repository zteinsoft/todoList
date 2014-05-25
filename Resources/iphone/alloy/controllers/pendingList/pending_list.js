function Controller() {
    function __alloyId8(e) {
        if (e && e.fromAdapter) return;
        __alloyId8.opts || {};
        var models = __alloyId7.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                rowId: "undefined" != typeof __alloyId4.__transform["task_id"] ? __alloyId4.__transform["task_id"] : __alloyId4.get("task_id"),
                hasCheck: "undefined" != typeof __alloyId4.__transform["status"] ? __alloyId4.__transform["status"] : __alloyId4.get("status")
            });
            rows.push(__alloyId5);
            var __alloyId6 = Ti.UI.createLabel({
                text: "undefined" != typeof __alloyId4.__transform["content"] ? __alloyId4.__transform["content"] : __alloyId4.get("content")
            });
            __alloyId5.add(__alloyId6);
        }
        $.__views.pendingList.setData(rows);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pendingList/pending_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("tasks");
    $.__views.pendingView = Ti.UI.createWindow({
        title: "Pending",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        id: "pendingView",
        rightNavButton: "btnAdd"
    });
    $.__views.pendingView && $.addTopLevelView($.__views.pendingView);
    $.__views.btnAdd = Ti.UI.createButton({
        id: "btnAdd"
    });
    $.__views.pendingView.add($.__views.btnAdd);
    $.__views.pendingList = Ti.UI.createTableView({
        width: "100%",
        height: "100%",
        id: "pendingList"
    });
    $.__views.pendingView.add($.__views.pendingList);
    var __alloyId7 = Alloy.Collections["tasks"] || tasks;
    __alloyId7.on("fetch destroy change add remove reset", __alloyId8);
    exports.destroy = function() {
        __alloyId7.off("fetch destroy change add remove reset", __alloyId8);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Collections.tasks.fetch({
        query: "SELECT * FROM tasks WHERE status=0"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;