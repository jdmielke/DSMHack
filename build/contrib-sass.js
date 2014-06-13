module.exports = function(grunt) {
	grunt.config.set("sass", {
		prod: {
			files: {
				"chrysalis-public/www/css/styles.css": "chrysalis-public/www/scss/styles.scss"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
};