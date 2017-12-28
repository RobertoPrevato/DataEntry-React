const gulp = require("gulp");
const source = require("vinyl-source-stream"); // Used to stream bundle for further handling
const buffer = require("vinyl-buffer");
const babelify = require("babelify");
const browserify = require("browserify");
const watchify = require("watchify");
const gutil = require("gulp-util");
const cssmin = require("gulp-cssmin");
const less = require("gulp-less");
const uglify = require("gulp-uglify");

const config = require("../config");
const _error_ = "error"

// Build without watch:
gulp.task("js-build", () => {
  config.esToJs.forEach(o => {
    var filename = o.filename + ".js"; // .built implicit
    browserify(o.entry, { debug: true })
      .transform(babelify, { 
        //presets: ["es2015"],
        sourceMaps: true,
        sourceType: 'module'
      })
      .bundle()
      .on(_error_, err => console.log(err))
      .pipe(source(filename))
      .pipe(gulp.dest(o.destfolder));
  });
});

// Build for distribution (with uglify)
gulp.task("js-dist", () => {
  process.env.NODE_ENV = "production";
  //NB: the following lines are working examples of source mapping generation and js minification
  //they are commented on purpose, to keep the build process fast during development
  config.esToJs.forEach(o => {
    /*
    //support for source maps (and minification):
    stream = stream.pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify()) //js minification and obfuscation
      .pipe(sourcemaps.write("./"));
    */
    var filename = o.filename + ".js"; // .min implicit
    browserify(o.entry, { debug: false })
      .transform(babelify, { 
        //presets: ["es2015"],
        sourceMaps: false 
      })
      .bundle()
      .on(_error_, err => console.log(err))
      .pipe(source(filename))
      .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
      .pipe(uglify())
      .pipe(gulp.dest(o.destfolder));
  });
});

gulp.task("css-build", () => {
  config.lessToCss.forEach(o => {
    var source = o[0], dest = o[1];
    gulp.src(source) // path to your files
      .pipe(less().on(_error_, err => console.log(err)))
      .pipe(cssmin().on(_error_, err => console.log(err))) // always minify CSS, remove temptation of editing css directly
      .pipe(gulp.dest(dest));
  });
});

// Copies static files to the output folder
gulp.task("copy-static", () => {
  config.toBeCopied.forEach(o => {
    gulp.src([o.src])
        .pipe(gulp.dest(o.dest));
  });
});

// watches less files for changes; compiles the files upon change
gulp.task("watch-less", () => {
  gulp.watch(config.lessRoot, ["css-build"]);
});

// Build using watchify, and watch
gulp.task("watch-es", watch => {
  if (watch === undefined) watch = true;

  config.esToJs.forEach(o => {
    /*
    //support for source maps (and minification):
    stream = stream.pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify()) //js minification and obfuscation
      .pipe(sourcemaps.write("./"));
    */
    var filename = o.filename + ".js"; // .built implicit

    var bundler = browserify(o.entry, {
      debug: true,              // gives us sourcemapping
      cache: {},                // required for watchify
      packageCache: {},         // required for watchify
      fullPaths: true           // required for watchify
    });
    bundler.transform(babelify, {
      //presets: ["es2015"]
    });

    if (watch) {
      bundler = watchify(bundler);
    }

    function rebundle() {
      var stream = bundler.bundle();
      stream.on(_error_, err => console.log(err));
      stream = stream.pipe(source(filename));
      return stream.pipe(gulp.dest(o.destfolder));
    }

    bundler.on("update", () => {
      console.log(`[*] Rebuilding ${o.destfolder}${filename}`);
      rebundle();
    });
    return rebundle();
  });
});

gulp.task("dev-init", ["js-build", "css-build", "copy-static"]);

gulp.task("env-init", ["js-dist", "css-build", "copy-static"]);