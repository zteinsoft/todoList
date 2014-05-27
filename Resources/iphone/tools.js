var myTool = {};

myTool.slideAnimationPopUp = function(obj, action) {
    var slideAnimation = Titanium.UI.createAnimation();
    slideAnimation.duration = 300;
    var showObj = "show" == action.toLowerCase();
    if (showObj) {
        slideAnimation.top = 0;
        obj.visible = true;
        obj.animate(slideAnimation);
    } else if (obj.isShowing) {
        slideAnimation.top = obj.defaultTop;
        obj.animate(slideAnimation);
    }
    obj.isShowing = showObj;
};

myTool.lastUpdate = function() {
    var formatLib = require("dateFormat").load;
    var now = new Date();
    return formatLib.format(now, "dd/MM/yyyy - HH:MM:ss");
};

myTool.showCamera = function() {
    Titanium.Media.showCamera({
        success: function(event) {
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                image = event.media;
                if (void 0 != image) return image;
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
};

myTool.showGallery = function() {
    Titanium.Media.openPhotoGallery({
        success: function(event) {
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                image = event.media;
                if (void 0 != image) return image;
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
};

module.exports.load = myTool;