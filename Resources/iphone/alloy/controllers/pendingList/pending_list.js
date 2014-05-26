function Controller() {
    function __alloyId10(e) {
        if (e && e.fromAdapter) return;
        __alloyId10.opts || {};
        var models = __alloyId9.models;
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
                text: "undefined" != typeof __alloyId5.__transform["content"] ? __alloyId5.__transform["content"] : __alloyId5.get("content")
            });
            __alloyId6.add(__alloyId8);
        }
        $.__views.pendingList.setData(rows);
    }
    function onBtnAddTaskClicked() {
        tools.slideAnimationPopUp($.addView, "show");
    }
    function onBtnCloseAddViewClicked() {
        tools.slideAnimationPopUp($.addView, "hide");
        $.txtContent.blur();
        $.txtContent.value = "";
        $.imgTask.image = $.imgTask.defaultImage;
        $.lblError.text = "";
    }
    function onAddTaskClicked() {
        $.txtContent.blur();
        if ("" == $.txtContent.value) $.lblError.text = $.txtContent.onError; else {
            $.lblError.text = "";
            objTask.insert($.txtContent.value, image);
            objTask.reloadCollectionPending();
            onBtnCloseAddViewClicked();
        }
    }
    function onSelectImageClicked() {
        $.dialog.show();
    }
    function onOptionClicked(e) {
        0 == e.index ? showCamera() : 1 == e.index && showGallery();
    }
    function showCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    image = event.media;
                    void 0 != image && ($.imgTask.image = image);
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
                    void 0 != image && ($.imgTask.image = image);
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
    var __alloyId9 = Alloy.Collections["tasks"] || tasks;
    __alloyId9.on("fetch destroy change add remove reset", __alloyId10);
    var __alloyId12 = [];
    __alloyId12.push("Camera");
    __alloyId12.push("Library");
    __alloyId12.push("Cancel");
    $.__views.dialog = Ti.UI.createOptionDialog({
        title: "Where do you want to select the image?",
        options: __alloyId12,
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
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "95%",
        height: "95%",
        backgroundColor: "white",
        id: "__alloyId16"
    });
    $.__views.addView.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        width: "100%",
        height: "10%",
        backgroundColor: "#1560BD",
        top: 0,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        text: "Add Task",
        font: {
            fontSize: "16dp"
        },
        color: "white",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        text: "X",
        right: "9dp",
        font: {
            fontSize: "20dp"
        },
        color: "white",
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    onBtnCloseAddViewClicked ? $.__views.__alloyId19.addEventListener("click", onBtnCloseAddViewClicked) : __defers["$.__views.__alloyId19!click!onBtnCloseAddViewClicked"] = true;
    $.__views.imgTask = Ti.UI.createImageView({
        height: "20%",
        top: "12%",
        image: "http://www.museohistoriconacional.cl/img/not_found.png",
        defaultImage: "http://www.museohistoriconacional.cl/img/not_found.png",
        id: "imgTask"
    });
    $.__views.__alloyId16.add($.__views.imgTask);
    $.__views.txtContent = Ti.UI.createTextArea({
        hintText: "Task Description",
        width: "90%",
        height: "30%",
        top: "33%",
        borderColor: "black",
        onError: "Please enter a Description",
        id: "txtContent"
    });
    $.__views.__alloyId16.add($.__views.txtContent);
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
    $.__views.__alloyId16.add($.__views.btnImage);
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
    $.__views.__alloyId16.add($.__views.btnAddTask);
    onAddTaskClicked ? $.__views.btnAddTask.addEventListener("click", onAddTaskClicked) : __defers["$.__views.btnAddTask!click!onAddTaskClicked"] = true;
    $.__views.lblError = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        color: "red",
        top: "89%",
        id: "lblError"
    });
    $.__views.__alloyId16.add($.__views.lblError);
    exports.destroy = function() {
        __alloyId9.off("fetch destroy change add remove reset", __alloyId10);
    };
    _.extend($, $.__views);
    var tools = require("tools").load;
    var objTask = require("task_lib").load;
    var image = void 0;
    objTask.reloadCollectionPending();
    __defers["$.__views.btnAdd!click!onBtnAddTaskClicked"] && $.__views.btnAdd.addEventListener("click", onBtnAddTaskClicked);
    __defers["$.__views.dialog!click!onOptionClicked"] && $.__views.dialog.addEventListener("click", onOptionClicked);
    __defers["$.__views.__alloyId19!click!onBtnCloseAddViewClicked"] && $.__views.__alloyId19.addEventListener("click", onBtnCloseAddViewClicked);
    __defers["$.__views.btnImage!click!onSelectImageClicked"] && $.__views.btnImage.addEventListener("click", onSelectImageClicked);
    __defers["$.__views.btnAddTask!click!onAddTaskClicked"] && $.__views.btnAddTask.addEventListener("click", onAddTaskClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;