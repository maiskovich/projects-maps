# Project-Maps

Project-Maps is a web app for showing projects in a map: 

It's showing the data from [Donor and Government funded projects map 2013 - 2015](https://www.opendata.go.ke/Government-Programs-Financing/Donor-and-Government-funded-projects-map-2013-2015/5mtp-qs2h). The data was download in a CSV file and converted to GeoJSON using [this](http://www.convertcsv.com/csv-to-geojson.htm) tool.

It's built with angularJS and based in the [Yeoman gulp-AngularJS generator](https://github.com/Swiip/generator-gulp-angular).
 
The map feature is in based on [Angular Leaflet Directive](https://github.com/tombatossals/angular-leaflet-directive).
 
## Install

After cloning the repository you should run:

`npm install`

`bower install`
 
 
##### Being inside of the directory of the project you can run:
 
 
#### `serve`
  
For the development phase, use the command `gulp serve` to lunch server which supports live reload of your modifications.
  
#### `test`
  
For testing, a fully working test environment is shipped. It uses Karma (with gulp test) for the unit tests.
 
#### `build`
  
For production, use the command `gulp` or `gulp build` to optimize the files for production, they will be saved optimized in the dist directory.
[More info](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md#optimization-process)
 
 

