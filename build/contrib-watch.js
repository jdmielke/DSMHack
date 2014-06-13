module.exports = function(grunt) {
	grunt.config.set("watch", {
		scss: {
			files: ['**/*.scss'],
			tasks: ['sass']
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
};