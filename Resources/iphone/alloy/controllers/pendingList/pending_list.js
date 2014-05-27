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
        $.__views.pendingList.setData(rows);
    }
    function onBtnAddTaskClicked() {
        tools.slideAnimationPopUp($.addView, "show");
    }
    function onBtnEditTaskClicked(row) {
        tools.slideAnimationPopUp($.editView, "show");
        loadEditView(row);
    }
    function onBtnCloseAddViewClicked() {
        tools.slideAnimationPopUp($.addView, "hide");
        $.txtContent.blur();
        $.txtContent.value = "";
        $.imgTask.image = $.imgTask.defaultImage;
        $.lblError.text = "";
    }
    function onBtnCloseEditViewClicked() {
        tools.slideAnimationPopUp($.editView, "hide");
        $.txtContentEdit.blur();
        $.txtContentEdit.value = "";
        $.imgTaskEdit.image = $.imgTask.defaultImage;
        $.lblErrorEdit.text = "";
    }
    function onAddTaskClicked() {
        $.txtContent.blur();
        if ("" == $.txtContent.value) $.lblError.text = $.txtContent.onError; else {
            var lastUpd = tools.lastUpdate();
            $.lblError.text = "";
            objTask.insert($.txtContent.value, image, lastUpd);
            objTask.reloadCollectionPending();
            onBtnCloseAddViewClicked();
        }
    }
    function onEditTaskClicked() {
        $.txtContentEdit.blur();
        if ("" == $.txtContentEdit.value) $.lblErrorEdit.text = $.txtContent.onError; else {
            var lastUpd = tools.lastUpdate();
            $.lblErrorEdit.text = "";
            objTask.insert($.txtContentEdit.value, image, lastUpd);
            objTask.reloadCollectionPending();
            onBtnCloseAddViewClicked();
        }
    }
    function loadEditView(row) {
        var table = Alloy.createCollection("tasks");
        table.fetch({
            query: "SELECT * FROM tasks where task_id = " + row.rowId
        });
        if (table.length > 0) {
            $.txtContentEdit.value = table.at(0).get("content");
            $.imgTaskEdit.image = void 0 === table.at(0).get("image") ? $.imgTask.defaultImage : table.at(0).get("image");
        }
    }
    function onSelectImageClicked() {
        $.dialog.show();
    }
    function onOptionClicked(e) {
        0 == e.index ? image = tools.showCamera() : 1 == e.index && (image = tools.showGallery());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pendingList/pending_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("tasks");
    $.__views.pendingView = Ti.UI.createWindow({
        title: "Pending",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        id: "pendingView"
    });
    $.__views.pendingView && $.addTopLevelView($.__views.pendingView);
    $.__views.btnAdd = Ti.UI.createButton({
        backgroundColor: "#1560BD",
        width: "200dp",
        height: "50dp",
        color: "white",
        title: "Add",
        id: "btnAdd"
    });
    onBtnAddTaskClicked ? $.__views.btnAdd.addEventListener("click", onBtnAddTaskClicked) : __defers["$.__views.btnAdd!click!onBtnAddTaskClicked"] = true;
    $.__views.pendingView.rightNavButton = $.__views.btnAdd;
    $.__views.pendingList = Ti.UI.createTableView({
        width: "100%",
        height: "100%",
        id: "pendingList"
    });
    $.__views.pendingView.add($.__views.pendingList);
    var __alloyId10 = Alloy.Collections["tasks"] || tasks;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    var __alloyId13 = [];
    __alloyId13.push("Camera");
    __alloyId13.push("Library");
    __alloyId13.push("Cancel");
    $.__views.dialog = Ti.UI.createOptionDialog({
        title: "Where do you want to select the image?",
        options: __alloyId13,
        id: "dialog"
    });
    onOptionClicked ? $.__views.dialog.addEventListener("click", onOptionClicked) : __defers["$.__views.dialog!click!onOptionClicked"] = true;
    $.__views.addView = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "Transparent",
        visible: "false",
        top: Ti.Platform.displayCaps.platformHeight,
        defaultTop: Ti.Platform.displayCaps.platformHeight,
        defaultVisible: false,
        id: "addView"
    });
    $.__views.pendingView.add($.__views.addView);
    $.__views.__alloyId17 = Ti.UI.createView({
        width: "95%",
        height: "95%",
        backgroundColor: "white",
        id: "__alloyId17"
    });
    $.__views.addView.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createView({
        width: "100%",
        height: "10%",
        backgroundColor: "#1560BD",
        top: 0,
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        text: "Add Task",
        font: {
            fontSize: "16dp"
        },
        color: "white",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        text: "X",
        right: "9dp",
        font: {
            fontSize: "20dp"
        },
        color: "white",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    onBtnCloseAddViewClicked ? $.__views.__alloyId20.addEventListener("click", onBtnCloseAddViewClicked) : __defers["$.__views.__alloyId20!click!onBtnCloseAddViewClicked"] = true;
    $.__views.imgTask = Ti.UI.createImageView({
        height: "20%",
        top: "12%",
        image: "http://www.museohistoriconacional.cl/img/not_found.png",
        defaultImage: "http://www.museohistoriconacional.cl/img/not_found.png",
        id: "imgTask"
    });
    $.__views.__alloyId17.add($.__views.imgTask);
    $.__views.txtContent = Ti.UI.createTextArea({
        hintText: "Task Description",
        width: "90%",
        height: "30%",
        top: "33%",
        borderColor: "black",
        onError: "Please enter a Description",
        id: "txtContent"
    });
    $.__views.__alloyId17.add($.__views.txtContent);
    $.__views.btnImage = Ti.UI.createButton({
        backgroundColor: "#1560BD",
        width: "200dp",
        height: "50dp",
        color: "white",
        title: "Select Image",
        defaultText: "Select Image",
        imgSelected: "Delete Image",
        top: "65%",
        id: "btnImage"
    });
    $.__views.__alloyId17.add($.__views.btnImage);
    onSelectImageClicked ? $.__views.btnImage.addEventListener("click", onSelectImageClicked) : __defers["$.__views.btnImage!click!onSelectImageClicked"] = true;
    $.__views.btnAddTask = Ti.UI.createButton({
        backgroundColor: "#1560BD",
        width: "200dp",
        height: "50dp",
        color: "white",
        top: "77%",
        title: "Add Task",
        id: "btnAddTask"
    });
    $.__views.__alloyId17.add($.__views.btnAddTask);
    onAddTaskClicked ? $.__views.btnAddTask.addEventListener("click", onAddTaskClicked) : __defers["$.__views.btnAddTask!click!onAddTaskClicked"] = true;
    $.__views.lblError = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        color: "red",
        top: "89%",
        id: "lblError"
    });
    $.__views.__alloyId17.add($.__views.lblError);
    $.__views.editView = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "Transparent",
        visible: "false",
        top: Ti.Platform.displayCaps.platformHeight,
        defaultTop: Ti.Platform.displayCaps.platformHeight,
        defaultVisible: false,
        id: "editView"
    });
    $.__views.pendingView.add($.__views.editView);
    $.__views.__alloyId21 = Ti.UI.createView({
        width: "95%",
        height: "95%",
        backgroundColor: "white",
        id: "__alloyId21"
    });
    $.__views.editView.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        width: "100%",
        height: "10%",
        backgroundColor: "#1560BD",
        top: 0,
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        text: "Edit Task",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        text: "X",
        right: "9dp",
        font: {
            fontSize: "20dp"
        },
        color: "white",
        id: "__alloyId24"
    });
    $.__views.__alloyId22.add($.__views.__alloyId24);
    onBtnCloseEditViewClicked ? $.__views.__alloyId24.addEventListener("click", onBtnCloseEditViewClicked) : __defers["$.__views.__alloyId24!click!onBtnCloseEditViewClicked"] = true;
    $.__views.imgTaskEdit = Ti.UI.createImageView({
        height: "20%",
        top: "12%",
        image: "http://www.museohistoriconacional.cl/img/not_found.png",
        defaultImage: "http://www.museohistoriconacional.cl/img/not_found.png",
        id: "imgTaskEdit"
    });
    $.__views.__alloyId21.add($.__views.imgTaskEdit);
    $.__views.txtContentEdit = Ti.UI.createTextArea({
        hintText: "Task Description",
        width: "90%",
        height: "30%",
        top: "33%",
        borderColor: "black",
        onError: "Please enter a Description",
        id: "txtContentEdit"
    });
    $.__views.__alloyId21.add($.__views.txtContentEdit);
    $.__views.btnImageEdit = Ti.UI.createButton({
        backgroundColor: "#1560BD",
        width: "200dp",
        height: "50dp",
        color: "white",
        title: "Select Image",
        defaultText: "Select Image",
        imgSelected: "Delete Image",
        top: "65%",
        id: "btnImageEdit"
    });
    $.__views.__alloyId21.add($.__views.btnImageEdit);
    onSelectImageClicked ? $.__views.btnImageEdit.addEventListener("click", onSelectImageClicked) : __defers["$.__views.btnImageEdit!click!onSelectImageClicked"] = true;
    $.__views.btnEditTaskEdit = Ti.UI.createButton({
        backgroundColor: "#1560BD",
        width: "200dp",
        height: "50dp",
        color: "white",
        top: "77%",
        title: "Add Task",
        id: "btnEditTaskEdit"
    });
    $.__views.__alloyId21.add($.__views.btnEditTaskEdit);
    onEditTaskClicked ? $.__views.btnEditTaskEdit.addEventListener("click", onEditTaskClicked) : __defers["$.__views.btnEditTaskEdit!click!onEditTaskClicked"] = true;
    $.__views.lblErrorEdit = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        color: "red",
        top: "89%",
        id: "lblErrorEdit"
    });
    $.__views.__alloyId21.add($.__views.lblErrorEdit);
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    var tools = require("tools").load;
    var objTask = require("task_lib").load;
    var image = void 0;
    $.pendingList.addEventListener("click", function(e) {
        onBtnEditTaskClicked(e.row);
    });
    objTask.reloadCollectionPending();
    __defers["$.__views.btnAdd!click!onBtnAddTaskClicked"] && $.__views.btnAdd.addEventListener("click", onBtnAddTaskClicked);
    __defers["$.__views.dialog!click!onOptionClicked"] && $.__views.dialog.addEventListener("click", onOptionClicked);
    __defers["$.__views.__alloyId20!click!onBtnCloseAddViewClicked"] && $.__views.__alloyId20.addEventListener("click", onBtnCloseAddViewClicked);
    __defers["$.__views.btnImage!click!onSelectImageClicked"] && $.__views.btnImage.addEventListener("click", onSelectImageClicked);
    __defers["$.__views.btnAddTask!click!onAddTaskClicked"] && $.__views.btnAddTask.addEventListener("click", onAddTaskClicked);
    __defers["$.__views.__alloyId24!click!onBtnCloseEditViewClicked"] && $.__views.__alloyId24.addEventListener("click", onBtnCloseEditViewClicked);
    __defers["$.__views.btnImageEdit!click!onSelectImageClicked"] && $.__views.btnImageEdit.addEventListener("click", onSelectImageClicked);
    __defers["$.__views.btnEditTaskEdit!click!onEditTaskClicked"] && $.__views.btnEditTaskEdit.addEventListener("click", onEditTaskClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;