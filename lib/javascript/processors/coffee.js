var cs = require("coffee-script")
var TerraformError = require("../../error").TerraformError
var path = require("path")

exports.compile = function(filePath, fileContents, callback){
  try{
    var errors = null
    var script = cs.compile(
      fileContents.toString(),
      {
        bare: true,
        sourceMap: true,
        sourceFiles: [path.basename(filePath)]
      }
    )
    // var script = compiled.js
  }catch(e){
    var errors = e
    errors.source = "CoffeeScript"
    errors.dest = "JavaScript"
    errors.filename = filePath
    errors.stack = fileContents.toString()
    errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1)
    var script = null
    var error = new TerraformError(errors)
  }finally{
    callback(error, script)
  }
}
