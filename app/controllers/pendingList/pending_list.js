var args = arguments[0] || {};

Alloy.Collections.tasks.fetch({query:'SELECT * FROM tasks WHERE status=0'});
