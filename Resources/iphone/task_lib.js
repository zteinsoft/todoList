var lib = {};

lib.insert = function(description, image, lastUpd) {
    var listModel = Alloy.createModel("tasks", {
        content: description,
        status: false,
        image: image,
        updated_date: lastUpd
    });
    listModel.save();
};

lib.update = function(values) {
    var data = Alloy.createCollection("tasks");
    data.fetch({
        query: "SELECT * FROM tasks where task_id=" + values.task_id
    });
    if (data.length > 0) {
        data.at(0).set({
            task_id: values.task_id,
            status: values.status,
            content: values.description,
            image: values.image,
            updated_date: values.lastUpd
        });
        data.at(0).save();
    }
};

lib.reloadCollectionPending = function() {
    Alloy.Collections.tasks.fetch({
        query: "SELECT * FROM tasks WHERE status=0"
    });
};

lib.reloadCollectionCompleted = function() {
    Alloy.Collections.tasks.fetch({
        query: "SELECT * FROM tasks WHERE status=1"
    });
};

module.exports.load = lib;