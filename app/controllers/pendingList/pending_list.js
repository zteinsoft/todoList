var tools = require('tools').load;
var objTask = require('task_lib').load;
var image;

function onBtnAddTaskClicked(){
	tools.slideAnimationPopUp($.addView,'show');
};

function onBtnCloseAddViewClicked(){
		tools.slideAnimationPopUp($.addView,'hide');	
		$.txtContent.blur();
		$.txtContent.value = "";
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

objTask.reloadCollectionPending();
