# Visual DEM/DTM

This is an AngularJS 1.x application written using the ES6 functionalities.

It uses:
- [SystemJS](https://github.com/systemjs/systemjs) to support the ES6 module loading paradigm;
- [Babel](https://github.com/babel/babel) to transpile ES6 syntax to ES5;
- [ocLazyLoad](https://github.com/ocombe/ocLazyLoad) to use lazy loading in AngularJS;
- [ui-router-extras](https://github.com/christopherthielen/ui-router-extras) to intercept routes loading and make possible to load modules with SystemJS and ocLazyLoad.

The application can be summarized in these passages:
- it takes a file that contains [DEM/DTM](https://en.wikipedia.org/wiki/Digital_elevation_model) informations (it is a raster file containing the altitude for each georeferenced point);
- it sends the DEM/DTM file to its nodeJS server that reads out the altitude informations contained, thanks to the [nodeJS gdal library](https://github.com/naturalatlas/node-gdal);
- it sends the informations back to the client via a websocket, thanks to the [Comunicator](https://github.com/720kb/comunicator) library;
- it draws a 3d model of the area submitted and a graph of the highest points for each latitude point analyzed, thanks to [three.js](https://github.com/mrdoob/three.js) and [d3](https://github.com/mbostock/d3).

The style of the application is quite almost achieved using  [Material Design](https://www.google.com/design/spec/material-design/introduction.html) (because I wanted to try its flexbox layout).

## How can I see what the application does?

At the moment I haven't published the application anywhere (I haven't written a Dockerfile yet to publish on my github organization server...).

To try the application you should clone this repository, and have Mongodb and gulp installed.

After `npm install && bower install`, you can run the application via `gulp serve` task. It will automatically open a tab in your browser. I advice you to double check your browser console looking for something like "_Transport ... opened_", if it's not present refresh the page.

After a login (done using the [jwt](https://tools.ietf.org/html/rfc7519) specification) there is an upload form. Here you have to provide a DEM/DTM file. If you haven't one you can find a test file [here](https://github.com/wouldgo/dem/blob/master/server/spec/dem-tests/china.tif) or you can download any geographies you want from [here](http://gdex.cr.usgs.gov/gdex/) downloading arcASC (the **.asc** file inside the zip) or geoTIFF files.

There is only a limitation in file size to 1.5Mb due to the fact that at the moment the file analyzer is spawn once per file. Since this analysis can be easily parallelized in small chunks of work, dividing the work between multiple spawned process can be a way to increase the raster file size.

## Contributing

I will be very grateful if you help me making this project grow up.
Feel free to contribute by forking, opening issues, pull requests etc.

## License

The MIT License (MIT)

Copyright (c) 2014 Dario Andrei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
