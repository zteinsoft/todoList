var myTool = {};

//to slide the pop up animation
myTool.slideAnimationPopUp = function(obj,action){
	var slideAnimation = Titanium.UI.createAnimation();
	slideAnimation.duration = 300;
	var showObj = action.toLowerCase() == "show";
	if(showObj)
	{
		slideAnimation.top = 0;
		obj.visible = true;	
		obj.animate(slideAnimation);
	}
	else if(obj.isShowing)
	{
	    slideAnimation.top = obj.defaultTop;
		obj.animate(slideAnimation);
	}
	
	obj.isShowing = showObj;	
};

//getting the current date in a specific format :)
myTool.lastUpdate = function(e){	
	var formatLib = require('dateFormat').load;
	var now = new Date();
	return formatLib.format(now,'dd/MM/yyyy - HH:MM:ss');	
};


module.exports.load = myTool;