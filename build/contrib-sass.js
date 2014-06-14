module.exports = function(grunt) {
	grunt.config.set("sass", {
		prod: {
			files: {
				"chrysalis-public/www/css/styles.css": "chrysalis-public/www/STATIC/sass/styles.scss"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
};