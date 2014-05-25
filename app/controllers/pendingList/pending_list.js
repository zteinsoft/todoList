var tools = require('tools').load;
var objTask = require('task_lib').load;
var image = undefined;

function onBtnAddTaskClicked(){
	tools.slideAnimationPopUp($.addView,'show');
};

function onBtnCloseAddViewClicked(){
		tools.slideAnimationPopUp($.addView,'hide');	
		$.txtContent.blur();
		$.txtContent.value = "";
		$.imgTask.image = $.imgTask.defaultImage;
		$.lblError.text = "";
};

function onAddTaskClicked(){
	$.txtContent.blur();
	if($.txtContent.value == "")
		$.lblError.text = $.txtContent.onError;
	else{
		$.lblError.text = "";
		objTask.insert($.txtContent.value,image);		
		objTask.reloadCollectionPending();
		onBtnCloseAddViewClicked();
	}
};

function onSelectImageClicked(){
	$.dialog.show();
};

function onOptionClicked(e){
	if(e.index == 0){
		showCamera();
	}else if(e.index==1){
		showGallery();
	}
};

function showCamera(){
Titanium.Media.showCamera({
    success:function(event) {
        // called when media returned from the camera
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
           image = event.media;
           if(image != undefined)
			$.imgTask.image = image;
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

function showGallery(){
Titanium.Media.openPhotoGallery({
    success:function(event) {
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
            image = event.media;       
            if(image != undefined)
				$.imgTask.image = image;     
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
}

objTask.reloadCollectionPending();
