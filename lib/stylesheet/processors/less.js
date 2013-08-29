var less           = require("less")
var path           = require("path")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){

  var formatError = function(e){
    return new TerraformError({
      source: "Less",
      dest: "CSS",
      lineno: parseInt(e.line || -1),
      name: e.type + "Error",
      filename: filePath,
      message: e.message,
      stack: fileContents.toString(),
    })
  }

  var parser = new(less.Parser)({
    paths:    dirs,     // Specify search paths for @import directives
    filename: filePath,  // Specify a filename, for better error messages
    // sourceMap: true,
    // sourceMapBasepath: ,
    // sourceMapFullFilename: path.basename(filePath)
  })

  parser.parse(fileContents.toString(), function (e, tree) {
    if(e) return callback(formatError(e))

    try{
      var error = null
      var output = {}

      output['css'] = tree.toCSS({ 
          compress: true,
          sourceMap: true,
          //sourceMapFilename: 'what',
          sourceMapRootpath: './',
          sourceMapBasepath: path.dirname(filePath),
          writeSourceMap: function(sourcemap){
            output['sourceMap'] = sourcemap
          }
      })
    } catch(e) {
      var error = formatError(e)
      var css = null
    } finally {
      callback(e, output)
    }
  })
}

