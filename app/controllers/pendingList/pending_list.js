var tools = require('tools').load;
var objTask = require('task_lib').load;
var image = undefined;
var view;
var row;

function onBtnAddTaskClicked(){
	tools.slideAnimationPopUp($.addView,'show');
	view = "add";
};

function onBtnEditTaskClicked(row){
	tools.slideAnimationPopUp($.editView,'show');
	loadEditView(row);
	view = "edit";
};

function onBtnCloseAddViewClicked(){
		tools.slideAnimationPopUp($.addView,'hide');	
		$.txtContent.blur();
		$.txtContent.value = "";
		$.imgTask.image = $.imgTask.defaultImage;
		$.lblError.text = "";
};

function onBtnCloseEditViewClicked(){
		tools.slideAnimationPopUp($.editView,'hide');
		$.txtContentEdit.blur();
		$.txtContentEdit.value = "";
		$.imgTaskEdit.image = $.imgTask.defaultImage;
		$.lblErrorEdit.text = "";
};

function onAddTaskClicked(){
	$.txtContent.blur();
	if($.txtContent.value == "")
		$.lblError.text = $.txtContent.onError;
	else{
		var lastUpd = tools.lastUpdate();
		$.lblError.text = "";
		objTask.insert($.txtContent.value,image,lastUpd);		
		objTask.reloadCollectionPending();
		onBtnCloseAddViewClicked();
	}
};

function onEditTaskClicked(){
	$.txtContentEdit.blur();
	if($.txtContentEdit.value == "")
		$.lblErrorEdit.text = $.txtContent.onError;
	else{
		var lastUpd = tools.lastUpdate();
		$.lblErrorEdit.text = "";
		
		//update functionality
		var values = {
			 task_id: row.rowId,	
             status: $.btnCompleted.value,
             description:$.txtContentEdit.value,
             image: image,
             lastUpd: lastUpd		
		};
		objTask.update(values);		
		objTask.reloadCollectionPending();
		onBtnCloseEditViewClicked();
		
	}
};

function loadEditView(row){
	var table = Alloy.createCollection("tasks");
    //e.row.rowId is a custom property created in the .xml file that contains the primary key of every value in the database
    table.fetch({query:"SELECT * FROM tasks where task_id = " + row.rowId });
	
	 //if the query returned with more than 0 rows
	if(table.length > 0){	  
	  $.txtContentEdit.value = table.at(0).get('content');
	  $.imgTaskEdit.image = (table.at(0).get('image') === undefined) ? $.imgTask.defaultImage : table.at(0).get('image');
	}
};

function onSelectImageClicked(){
	$.dialog.show();
};

function setImage(){
	if(view == "add")
		$.imgTask.image = image;
	else
		$.imgTaskEdit.image = image;	
};

function onOptionClicked(e){
	if(e.index == 0){
		showCamera();
	}else if(e.index==1){
		showGallery();
	}
};

$.pendingList.addEventListener('click',function(e){
	onBtnEditTaskClicked(e.row);
	row = e.row;
});


//image handling
function showCamera(e){
Titanium.Media.showCamera({
    success:function(event) {
        // called when media returned from the camera
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
           image = event.media;
           if(image != undefined)
			setImage();
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

function showGallery(e){
Titanium.Media.openPhotoGallery({
    success:function(event) {
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
            image = event.media;       
            if(image != undefined)
				setImage();   
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
