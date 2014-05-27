function Controller() {
    function __alloyId11(e) {
        if (e && e.fromAdapter) return;
        __alloyId11.opts || {};
        var models = __alloyId10.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = {};
            var __alloyId6 = Ti.UI.createTableViewRow({
                width: "100%",
                height: "90dp",
                rowId: "undefined" != typeof __alloyId5.__transform["task_id"] ? __alloyId5.__transform["task_id"] : __alloyId5.get("task_id"),
                hasCheck: "undefined" != typeof __alloyId5.__transform["status"] ? __alloyId5.__transform["status"] : __alloyId5.get("status")
            });
            rows.push(__alloyId6);
            var __alloyId7 = Ti.UI.createImageView({
                left: "5dp",
                width: "70dp",
                image: "undefined" != typeof __alloyId5.__transform["image"] ? __alloyId5.__transform["image"] : __alloyId5.get("image")
            });
            __alloyId6.add(__alloyId7);
            var __alloyId8 = Ti.UI.createLabel({
                left: "80dp",
                top: "8dp",
                font: {
                    fontSize: "12dp"
                },
                color: "grey",
                text: "undefined" != typeof __alloyId5.__transform["updated_date"] ? __alloyId5.__transform["updated_date"] : __alloyId5.get("updated_date")
            });
            __alloyId6.add(__alloyId8);
            var __alloyId9 = Ti.UI.createLabel({
                left: "80dp",
                text: "undefined" != typeof __alloyId5.__transform["content"] ? __alloyId5.__transform["content"] : __alloyId5.get("content")
            });
            __alloyId6.add(__alloyId9);
        }
        $.__views.completedList.setData(rows);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "completedList/completed_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("tasks");
    $.__views.completedView = Ti.UI.createWindow({
        title: "Completed",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        id: "completedView"
    });
    $.__views.completedView && $.addTopLevelView($.__views.completedView);
    $.__views.completedList = Ti.UI.createTableView({
        width: "100%",
        height: "100%",
        id: "completedList"
    });
    $.__views.completedView.add($.__views.completedList);
    var __alloyId10 = Alloy.Collections["tasks"] || tasks;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    var objTask = require("task_lib").load;
    objTask.reloadCollectionCompleted($.tasksCompleted);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;