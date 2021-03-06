# terraform

> Terraform is the pre-processor engine for the Harp Web Server. Terraform does not write or serve files. Ony processes.

## Features

- pre-processorse
- layouts
- partials
- metadata (via _data.json)
- LRU cache (production mode)

### Supported Pre-Processors

**HTML** - EJS, Jade, Markdown
**CSS** - LESS, Stylus
**JavaScript** - CoffeeScript

![](https://s3-us-west-2.amazonaws.com/harp-misc/terraform.jpg)

## Install

    npm install terraform

## API


Step 1) require the library

```javascript
var terraform = require('terraform')
```

Step 2) set the root

- publicPath (String): path to public directory
- globals (Object): global variables to be available to every template

```javascript
var planet = root("path/to/public/dir", { "title": "Bitchin" })
```

Step 3) render a file

```javascript
planet.render('index.jade', function(error, body){
  console.log(body)
})
```

## Tests

    npm test

![](https://s3-us-west-2.amazonaws.com/harp-misc/terraform-tests.png)
