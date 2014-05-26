exports.definition = {
    config: {
        columns: {
            task_id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            content: "TEXT",
            status: "INTEGER",
            image: "BLOB",
            updated_date: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "tasks"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("tasks", exports.definition, []);

collection = Alloy.C("tasks", exports.definition, model);

exports.Model = model;

exports.Collection = collection;