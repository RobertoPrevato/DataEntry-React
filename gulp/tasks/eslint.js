const config = require("../config");
const gulp = require("gulp");
const eslint = require("gulp-eslint");

// Pain-in-the-ass task
//      for the pedants
// with questionable priorities

gulp.task("eslint", () => {
  return gulp.src(config.eslint.src)
    .pipe(eslint(config.eslint.params))
    .pipe(eslint.format());
    // .pipe(eslint.failAfterError()); // Ultra-pain-in-the-ass mode
});
