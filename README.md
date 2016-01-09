# Project-Maps

Project-Maps is a web app for showing projects in a map: 

It's showing the data from [Donor and Government funded projects in Kenya map 2013 - 2015](https://www.opendata.go.ke/Government-Programs-Financing/Donor-and-Government-funded-projects-map-2013-2015/5mtp-qs2h). The data was download in a CSV file and converted to GeoJSON using [this](http://www.convertcsv.com/csv-to-geojson.htm) tool.

There is a second layer showing a choropleth. This data is showing the amount 
of projects by each Kenyan county. 
The GeoJSON file used for plotting the counties is based on [this file](https://github.com/mikelmaron/kenya-election-data/blob/master/data/counties.geojson) wich was
 reduced from 1.3MB to 0.7MB to improve performance, shortening the amount of decimal numbers of coordinates fields from 15 to 6.
 This procedure was based on what was found [here](http://gis.stackexchange.com/questions/86640/how-to-limit-decimal-places-of-coordinate-values-in-geojson-file-using-qgis-2-0).

It's built with angularJS and based in the [Yeoman gulp-AngularJS generator](https://github.com/Swiip/generator-gulp-angular).
 
The map feature is in based on [Angular Leaflet Directive](https://github.com/tombatossals/angular-leaflet-directive).
 
Markers clustering was done using the code taken from [here](https://github.com/tombatossals/angular-leaflet-directive/issues/744).
 
## Install

After cloning the repository you should run:

`npm install`

`bower install`
 
 
##### Being inside of the directory of the project you can run:
 
 
#### `serve`
  
For the development phase, use the command `gulp serve` to lunch server which supports live reload of your modifications.
  
 
#### `build`
  
For production, use the command `gulp` or `gulp build` to optimize the files for production, they will be saved optimized in the dist directory.
[More info](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md#optimization-process)
 
 

