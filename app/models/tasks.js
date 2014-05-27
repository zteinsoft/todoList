exports.definition = {
	config: {
 		columns : {
            "task_id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "content" : "TEXT",
            "status": "BOOLEAN",
            "image": "BLOB",
            "updated_date": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "tasks"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};