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

module.exports.load = myTool;