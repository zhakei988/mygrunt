module.exports = function(grunt) {
  grunt.initConfig({
    us: grunt.file.readJSON('config.json'),
	copy: {
	    html: {
	        files: [
	            {
	                expand: true,
	                cwd: 'modules/default/',
	                src: ['**'],
	                dest: 'src/<%=us.author%>/<%=us.name%>/'
	            }               
	        ]
	    }
	},
    watch:{
      livereload:{
        options: {
          livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
        },

        files: [ //下面文件的改变就会实时刷新网页
          'src/<%=us.author%>/<%=us.name%>/*.html',
          'src/<%=us.author%>/<%=us.name%>/css/{,*/}*.css',
          'src/<%=us.author%>/<%=us.name%>/js/{,*/}*.js',
          'src/<%=us.author%>/<%=us.name%>/images/{,*/}*.{png,jpg}'
        ]
      }
    },
    connect:{
      options:{
          port:8000,
          open:true,
          appName:'chrome',
          livereload:35729,
          hostname: '192.168.20.241' //默认就是这个值，可配置为本机某个 IP，localhost 或域名
      },
      server: {
        options: {
          //keepalive:true,
          base: [
            'src/<%=us.author%>/<%=us.name%>/' //主目录
          ]
        }
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('sever', ['connect:server','watch']);
  grunt.registerTask('copymodules',['copy'])
}