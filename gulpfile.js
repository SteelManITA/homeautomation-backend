var gulp = require('gulp');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var exec = require('child_process').exec;
// var buildCommand = 'clang++ src/*.cpp -o bin/helloWorld';
var buildCommand = 'gcc src/clib/irslinger.c -lm -lpigpio -pthread -lrt -o dist/irslinger';

// gulp.task('ts', function () {
gulp.task('default', function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));

  // gulp.src('./src/clib/irslinger.exe')
  //   .pipe(gulp.dest('./fonts'));
});

// Forse ok
// gulp.task('build',function(){
//   exec(buildCommand, function (error, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//   });
// });

// gulp.task('watch', function() {
//   return watch('src/**/*.ts', function(a) {
//     console.log(a, typeof a, a.constructor.name);
//   })

//   // gulp.watch('src/**/*.cpp', ['build']);
//   // gulp.watch('src/**/*.ts', ['ts']);
//   // gulp.watch('include/*.h', ['build']);
// });

// gulp.task(
//   'default',
//   ['ts', 'build', 'watch'],
//   function(){}
// );
