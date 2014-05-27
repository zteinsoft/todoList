function Controller() {
    function __alloyId21(e) {
        if (e && e.fromAdapter) return;
        __alloyId21.opts || {};
        var models = __alloyId20.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId15 = models[i];
            __alloyId15.__transform = {};
            var __alloyId16 = Ti.UI.createTableViewRow({
                width: "100%",
                height: "90dp",
                rowId: "undefined" != typeof __alloyId15.__transform["task_id"] ? __alloyId15.__transform["task_id"] : __alloyId15.get("task_id"),
                hasCheck: "undefined" != typeof __alloyId15.__transform["status"] ? __alloyId15.__transform["status"] : __alloyId15.get("status")
            });
            rows.push(__alloyId16);
            var __alloyId17 = Ti.UI.createImageView({
                left: "5dp",
                width: "70dp",
                image: "undefined" != typeof __alloyId15.__transform["image"] ? __alloyId15.__transform["image"] : __alloyId15.get("image")
            });
            __alloyId16.add(__alloyId17);
            var __alloyId18 = Ti.UI.createLabel({
                left: "80dp",
                top: "8dp",
                font: {
                    fontSize: "12dp"
                },
                color: "grey",
                text: "undefined" != typeof __alloyId15.__transform["updated_date"] ? __alloyId15.__transform["updated_date"] : __alloyId15.get("updated_date")
            });
            __alloyId16.add(__alloyId18);
            var __alloyId19 = Ti.UI.createLabel({
                left: "80dp",
                text: "undefined" != typeof __alloyId15.__transform["content"] ? __alloyId15.__transform["content"] : __alloyId15.get("content")
            });
            __alloyId16.add(__alloyId19);
        }
        $.__views.pendingList.setData(rows);
    }
    function onFocus() {
        objTask.reloadCollectionPending();
    }
    function onBtnAddTaskClicked() {
        tools.slideAnimationPopUp($.addView, "show");
        view = "add";
    }
    function onBtnEditTaskClicked(row) {
        tools.slideAnimationPopUp($.editView, "show");
        loadEditView(row);
        view = "edit";
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
            var values = {
                task_id: row.rowId,
                status: $.btnCompleted.value,
                description: $.txtContentEdit.value,
                image: image,
                lastUpd: lastUpd
            };
            objTask.update(values);
            objTask.reloadCollectionPending();
            onBtnCloseEditViewClicked();
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
    function setImage() {
        "add" == view ? $.imgTask.image = image : $.imgTaskEdit.image = image;
    }
    function onOptionClicked(e) {
        0 == e.index ? showCamera() : 1 == e.index && showGallery();
    }
    function showCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    image = event.media;
                    void 0 != image && setImage();
                } else alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function showGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    image = event.media;
                    void 0 != image && setImage();
                } else alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
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
    onFocus ? $.__views.pendingView.addEventListener("focus", onFocus) : __defers["$.__views.pendingView!focus!onFocus"] = true;
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
    var __alloyId20 = Alloy.Collections["tasks"] || tasks;
    __alloyId20.on("fetch destroy change add remove reset", __alloyId21);
    var __alloyId23 = [];
    __alloyId23.push("Camera");
    __alloyId23.push("Library");
    __alloyId23.push("Cancel");
    $.__views.dialog = Ti.UI.createOptionDialog({
        title: "Where do you want to select the image?",
        options: __alloyId23,
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
    $.__views.__alloyId27 = Ti.UI.createView({
        width: "95%",
        height: "95%",
        backgroundColor: "white",
        id: "__alloyId27"
    });
    $.__views.addView.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createView({
        width: "100%",
        height: "10%",
        backgroundColor: "#1560BD",
        top: 0,
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        text: "Add Task",
        font: {
            fontSize: "16dp"
        },
        color: "white",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        text: "X",
        right: "9dp",
        font: {
            fontSize: "20dp"
        },
        color: "white",
        id: "__alloyId30"
    });
    $.__views.__alloyId28.add($.__views.__alloyId30);
    onBtnCloseAddViewClicked ? $.__views.__alloyId30.addEventListener("click", onBtnCloseAddViewClicked) : __defers["$.__views.__alloyId30!click!onBtnCloseAddViewClicked"] = true;
    $.__views.imgTask = Ti.UI.createImageView({
        height: "20%",
        top: "12%",
        image: "http://www.museohistoriconacional.cl/img/not_found.png",
        defaultImage: "http://www.museohistoriconacional.cl/img/not_found.png",
        id: "imgTask"
    });
    $.__views.__alloyId27.add($.__views.imgTask);
    $.__views.txtContent = Ti.UI.createTextArea({
        hintText: "Task Description",
        width: "90%",
        height: "30%",
        top: "33%",
        borderColor: "black",
        onError: "Please enter a Description",
        id: "txtContent"
    });
    $.__views.__alloyId27.add($.__views.txtContent);
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
    $.__views.__alloyId27.add($.__views.btnImage);
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
    $.__views.__alloyId27.add($.__views.btnAddTask);
    onAddTaskClicked ? $.__views.btnAddTask.addEventListener("click", onAddTaskClicked) : __defers["$.__views.btnAddTask!click!onAddTaskClicked"] = true;
    $.__views.lblError = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        color: "red",
        top: "89%",
        id: "lblError"
    });
    $.__views.__alloyId27.add($.__views.lblError);
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
    $.__views.__alloyId31 = Ti.UI.createView({
        width: "95%",
        height: "95%",
        backgroundColor: "white",
        id: "__alloyId31"
    });
    $.__views.editView.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        width: "100%",
        height: "10%",
        backgroundColor: "#1560BD",
        top: 0,
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        text: "Edit Task",
        color: "white",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        text: "X",
        right: "9dp",
        font: {
            fontSize: "20dp"
        },
        color: "white",
        id: "__alloyId34"
    });
    $.__views.__alloyId32.add($.__views.__alloyId34);
    onBtnCloseEditViewClicked ? $.__views.__alloyId34.addEventListener("click", onBtnCloseEditViewClicked) : __defers["$.__views.__alloyId34!click!onBtnCloseEditViewClicked"] = true;
    $.__views.imgTaskEdit = Ti.UI.createImageView({
        height: "20%",
        top: "12%",
        image: "http://www.museohistoriconacional.cl/img/not_found.png",
        defaultImage: "http://www.museohistoriconacional.cl/img/not_found.png",
        id: "imgTaskEdit"
    });
    $.__views.__alloyId31.add($.__views.imgTaskEdit);
    $.__views.txtContentEdit = Ti.UI.createTextArea({
        hintText: "Task Description",
        width: "90%",
        height: "20%",
        top: "33%",
        borderColor: "black",
        onError: "Please enter a Description",
        id: "txtContentEdit"
    });
    $.__views.__alloyId31.add($.__views.txtContentEdit);
    $.__views.lblCompleted = Ti.UI.createLabel({
        text: "Completed?",
        top: "55%",
        left: "80dp",
        font: {
            fontSize: "17dp"
        },
        color: "black",
        backgroundColor: "Transparent",
        id: "lblCompleted"
    });
    $.__views.__alloyId31.add($.__views.lblCompleted);
    $.__views.btnCompleted = Ti.UI.createSwitch({
        width: "100dp",
        height: "50dp",
        top: "55%",
        backgroundColor: "Transparent",
        right: "60dp",
        value: false,
        id: "btnCompleted"
    });
    $.__views.__alloyId31.add($.__views.btnCompleted);
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
    $.__views.__alloyId31.add($.__views.btnImageEdit);
    onSelectImageClicked ? $.__views.btnImageEdit.addEventListener("click", onSelectImageClicked) : __defers["$.__views.btnImageEdit!click!onSelectImageClicked"] = true;
    $.__views.btnEditTask = Ti.UI.createButton({
        backgroundColor: "#1560BD",
        width: "200dp",
        height: "50dp",
        color: "white",
        top: "77%",
        title: "Edit Task",
        id: "btnEditTask"
    });
    $.__views.__alloyId31.add($.__views.btnEditTask);
    onEditTaskClicked ? $.__views.btnEditTask.addEventListener("click", onEditTaskClicked) : __defers["$.__views.btnEditTask!click!onEditTaskClicked"] = true;
    $.__views.lblErrorEdit = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        color: "red",
        top: "89%",
        id: "lblErrorEdit"
    });
    $.__views.__alloyId31.add($.__views.lblErrorEdit);
    exports.destroy = function() {
        __alloyId20.off("fetch destroy change add remove reset", __alloyId21);
    };
    _.extend($, $.__views);
    var tools = require("tools").load;
    var objTask = require("task_lib").load;
    var image = void 0;
    var view;
    var row;
    $.pendingList.addEventListener("click", function(e) {
        onBtnEditTaskClicked(e.row);
        row = e.row;
    });
    __defers["$.__views.pendingView!focus!onFocus"] && $.__views.pendingView.addEventListener("focus", onFocus);
    __defers["$.__views.btnAdd!click!onBtnAddTaskClicked"] && $.__views.btnAdd.addEventListener("click", onBtnAddTaskClicked);
    __defers["$.__views.dialog!click!onOptionClicked"] && $.__views.dialog.addEventListener("click", onOptionClicked);
    __defers["$.__views.__alloyId30!click!onBtnCloseAddViewClicked"] && $.__views.__alloyId30.addEventListener("click", onBtnCloseAddViewClicked);
    __defers["$.__views.btnImage!click!onSelectImageClicked"] && $.__views.btnImage.addEventListener("click", onSelectImageClicked);
    __defers["$.__views.btnAddTask!click!onAddTaskClicked"] && $.__views.btnAddTask.addEventListener("click", onAddTaskClicked);
    __defers["$.__views.__alloyId34!click!onBtnCloseEditViewClicked"] && $.__views.__alloyId34.addEventListener("click", onBtnCloseEditViewClicked);
    __defers["$.__views.btnImageEdit!click!onSelectImageClicked"] && $.__views.btnImageEdit.addEventListener("click", onSelectImageClicked);
    __defers["$.__views.btnEditTask!click!onEditTaskClicked"] && $.__views.btnEditTask.addEventListener("click", onEditTaskClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;