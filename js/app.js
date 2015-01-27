'use strict';

/**
 * HTML5 FileReader API Basic Example
 */

var input = document.getElementById('input');
var preview = document.getElementById('preview');

input.addEventListener('change', prefiewFiles, false);

function prefiewFiles() {
  var fileList = this.files,
  image = document.createElement('img');

  for (var i = 0, length = fileList.length; i < length; i++) {
    var file = fileList[i];
    var imageType = /image.*/;

    if (!file.type.match(imageType)) {
      continue;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(e) {
      image = document.createElement('img')
      image.src = e.target.result;
      preview.appendChild(image);
    }
  }

}
