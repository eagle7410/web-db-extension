/**
 * Created by igor on 26.07.16.
 */
module.exports = function (grunt) {

	grunt.initConfig({
		jsdoc2md: {
			oneOutputFile: {
				src: ['src/BrowerDataBase.js'],
				dest: 'Api.md'
			}

		}
	});
	grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
	grunt.registerTask('default', ['jsdoc2md']);
};
