var lib = {};

lib.insert = function(description) {
    var listModel = Alloy.createModel("tasks", {
        content: description,
        status: 0,
        image: ""
    });
    listModel.save();
};

lib.update = function() {
    alert("update");
};

lib.reloadCollectionPending = function() {
    Alloy.Collections.tasks.fetch({
        query: "SELECT * FROM tasks WHERE status=0"
    });
};

module.exports.load = lib;