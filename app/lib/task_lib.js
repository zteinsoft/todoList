var lib = {};

lib.insert = function(description,image){
	var listModel = Alloy.createModel("tasks", {
                  content:description,
                  status:0,
                  image:''
     });
    //This is how we save a model to our databaseif the model already exists, the save will be an "update".
    listModel.save();      
};

lib.update = function(){
	alert('update');
};

lib.reloadCollectionPending = function(e){
	Alloy.Collections.tasks.fetch({query:'SELECT * FROM tasks WHERE status=0'});
};

module.exports.load = lib;