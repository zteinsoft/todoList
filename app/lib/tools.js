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


myTool.showCamera = function(e){
Titanium.Media.showCamera({
    success:function(event) {
        // called when media returned from the camera
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
           image = event.media;
           if(image != undefined)
			return image;
        } else {
            alert("got the wrong type back ="+event.mediaType);
        }
    },
    cancel:function() {
        // called when user cancels taking a picture
    },
    error:function(error) {
        // called when there's an error
        var a = Titanium.UI.createAlertDialog({title:'Camera'});
        if (error.code == Titanium.Media.NO_CAMERA) {
            a.setMessage('Please run this test on device');
        } else {
            a.setMessage('Unexpected error: ' + error.code);
        }
        a.show();
    },
    saveToPhotoGallery:true,
    // allowEditing and mediaTypes are iOS-only settings
    allowEditing:true,
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});
};

myTool.showGallery = function(e){
Titanium.Media.openPhotoGallery({
    success:function(event) {
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
            image = event.media;       
            if(image != undefined)
				return image;     
        } else {
            alert("got the wrong type back ="+event.mediaType);
        }
    },
    cancel:function() {
        // called when user cancels taking a picture
    },
    error:function(error) {
        // called when there's an error
        var a = Titanium.UI.createAlertDialog({title:'Camera'});
        if (error.code == Titanium.Media.NO_CAMERA) {
            a.setMessage('Please run this test on device');
        } else {
            a.setMessage('Unexpected error: ' + error.code);
        }
        a.show();
    },
    // allowEditing and mediaTypes are iOS-only settings
    allowEditing:true,
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});
};


module.exports.load = myTool;