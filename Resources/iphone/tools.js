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

module.exports.load = myTool;