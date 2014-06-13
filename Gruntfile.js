module.exports = function(grunt) {

	grunt.loadTasks("build");

	grunt.registerTask("dev",
		"dev build",
		["sass", "watch"]
	);

	grunt.registerTask("prod",
		"prod build",
		["sass"]
	);

	grunt.registerTask("default", ["dev"]);
};