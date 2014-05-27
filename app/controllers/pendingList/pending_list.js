var tools = require('tools').load;
var objTask = require('task_lib').load;
var image = undefined;

function onBtnAddTaskClicked(){
	tools.slideAnimationPopUp($.addView,'show');
};

function onBtnEditTaskClicked(row){
	tools.slideAnimationPopUp($.editView,'show');
	loadEditView(row);
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
		objTask.insert($.txtContentEdit.value,image,lastUpd);		
		objTask.reloadCollectionPending();
		onBtnCloseAddViewClicked();
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

function onOptionClicked(e){
	if(e.index == 0){
		image = tools.showCamera();
	}else if(e.index==1){
		image = tools.showGallery();
	}
};

$.pendingList.addEventListener('click',function(e){
	onBtnEditTaskClicked(e.row);
});

objTask.reloadCollectionPending();
