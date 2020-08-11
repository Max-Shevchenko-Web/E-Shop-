//папка готового проэктак(стандарт)
let project_folder = "dist";
//папка с исходниками
let source_folder = "#src";

//читает  файлы системы
let fs = require('fs');

//пути вывода обработанных файлов
let path = {
  build: {
    //будет в корневой папке
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts",
  },
  src: {
    html: [source_folder + "/*.html",'!'+source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/app.js",
    //настраиваем какие файлы и папки будем слушать ** - все папки , *.{} все файлы с такими расширениями
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf ",
  },
  //файлы которые нужно отлавливать и делать изменения на лету
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    //настраиваем какие файлы и папки будем слушать ** - все папки , *.{} все файлы с такими расширениями
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  //путь к папке проэкта, будет удалять староекаждый раз при запуске галпа
  clean: './' + project_folder + '/'
}

//подключаем переменные
let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  gulp_rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webp_html = require('gulp-webp-html'),
  webpcss = require('gulp-webpcss'),
  svgSprite = require('gulp-svg-sprite'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter');

//Функция обновления страницы
function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    //отключаем ненужное уведомления браузера
    notify: false,
  })
}


//функция которая передает html
function html() {
  //укажем путь прописаный в обьекте path
  return src(path.src.html)
    .pipe(fileinclude()) //соберет файлы из исходников в папку назначения
    .pipe(webp_html()) //добавляем помошь по выводу картинок при верстке
    //из исходной папки в папку назначения
    .pipe(dest(path.build.html)) //.pipe() сюда пишем команды для галпа
    .pipe(browsersync.stream()) //обновит страницу
}


//Функция CSS
function css() {
  //укажем путь прописаный в обьекте path
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle:"expanded", //будет превращать в развернутый читаемый css
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'], //до какой последней версии браузеров поддерживать
        cascade: true //стиль написания автопрефиксов
      })
    )
    .pipe(webpcss())
    .pipe(dest(path.build.css))  //до того как сожмем выгрузим в папку dist оригинал а потом сожмем и опять выгрузим
    .pipe(browsersync.stream())
    .pipe(clean_css()) //сжимаем файл
    .pipe(
      gulp_rename({
        extname: ".min.css" //добавляем к названию сжатого файла
      })
    )//из исходной папки в папку назначения
    .pipe(dest(path.build.css)) //.pipe() сюда пишем команды для галпа
    .pipe(browsersync.stream()) //обновит страницу
}


//функция которая настраивает работу JS файлов
function js() {
  //укажем путь прописаный в обьекте path
  return src(path.src.js)
    .pipe(fileinclude()) //соберет файлы из исходников в папку назначения
    .pipe(dest(path.build.js))
    .pipe(
      uglify()
    )
    .pipe(
      gulp_rename({
        extname: ".min.js" //добавляем к названию сжатого файла
      })
    )
    //из исходной папки в папку назначения
    .pipe(dest(path.build.js)) //.pipe() сюда пишем команды для галпа
    .pipe(browsersync.stream()) //обновит страницу
}


//функция обработки картинок
function images() {
  //укажем путь прописаный в обьекте path
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img)) //опять обращаемся к исходникам
    .pipe(
      imagemin({ //плагин сжатия картинок
        progressive:  true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3 //0 to 7  //как сильно хотим сжать
      })
    )
    .pipe(dest(path.build.img)) //.pipe() сюда пишем команды для галпа
    .pipe(browsersync.stream()) //обновит страницу
}


//функция для работы со шрифтами // конвертирует в woff and woff2
function fonts() {
  src(path.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(path.build.fonts));
}

//конвертирует шрифты
gulp.task('otf2ttf', function () {
  return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf'] //во что конвертируем вышеотобраные файлы
    }))
    .pipe(dest(source_folder + '/fonts')) // выгрузим не в павпку dist а в папку исходников
})

//работа с cdu? обьединяет ли разделяет cdu на спрайты отдельные
gulp.task('svgSprite', function() {
  return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
          mode: {
            stack: {
              sprite: '../icons/icons.svg', //sprite file name
              example: true
            }
          },
        }
        ))
        .pipe(dest(path.build.img)) //вывод в папку
})


//для подключения шрифтов
function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
      fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
      return fs.readdir(path.build.fonts, function (err, items) {
        if (items) {
          let c_fontname;
          for (var i = 0; i < items.length; i++) {
            let fontname = items[i].split('.');
            fontname = fontname[0];
            if (c_fontname != fontname) {
              fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
            }
            c_fontname = fontname;
            }
        }
      })
    }
}

//Функция колбэк
function cb() {

}


//слежка за нашими файлами
function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

//Удаляет старую папку dist
const clean = (params) => {
  return del(path.clean);
}

//что должно быть выполнено с этой переменной
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);
//запуск browserSync
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
// что бы gulp запускал это надо экспортировать
exports.watch = watch;
//когда запускаем в команд строе gulp будет выполняться функция по умолчанию default
exports.default = watch;