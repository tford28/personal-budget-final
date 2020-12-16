gulp.task('serveprod', function() {
  connect.server({
    root: [__dirname],
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});
