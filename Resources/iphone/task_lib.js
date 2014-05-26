var lib = {};

lib.insert = function(description, image) {
    var listModel = Alloy.createModel("tasks", {
        content: description,
        status: 0,
        image: image
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