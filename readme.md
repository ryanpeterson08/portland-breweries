# Portland Brewery Map

#### Locator website of Portland Breweries

#### By Ryan Peterson, Chris Clifford, Getro Naissance, and Hal Fairless

## Description

This site uses the Leaflet API to create a map of breweries located in the greater Portland, Oregon area. It shows the location and other related information pertaining to the brewery, such as name, address, and a link to the brewery website.  Users can also keep a checklist of the breweries they have been to as well.


## Setup/Installation Requirements

* clone github repository
* or go to ryanpeterson08.github.io/portland-breweries

##Specifications

* Page loads map with pub data on it - presented in cluster format
  * As user zooms in clusters disperse, until certain zoom limit where everything de-clusters
* Users can search for brewery by clicking on spyglass in right hand cover-container
  * Search works best at zoom level where icons are no longer clustered
  * Clicking on brewery in search panel will zoom map to location and open popup
* Users can use location finder in left corner of map, to get there current location
  * Must allow computer to share location for this feature to work
* Users can also checkoff breweries' they have already been too.
  * By checking a brew pub and hitting the filter button, that icons symbol will change to a flag
  * Hitting the reset button refreshes the page and reset all the checkboxes to empty

## Known Bugs

No known bugs

## Support and contact details

ryanpeterson08@gmail.com

## Technologies Used

* HTML
* CSS
* Javascript
* geoJson - is an open standard format designed for representing simple geographical features, along with their non-spatial attributes, based on JavaScript Object Notation
* Leaflet - is a widely used open source JavaScript library used to build web mapping applications. It supports most mobile and desktop platforms, supporting HTML5 and CSS3

### License

HTML - Free Software Foundation, Inc. JavaScript - Free Software Foundation, Inc. jœuery - jQuery Foundation and other contributors CSS - Licensed under the MIT/X11 License Bootstrap - Code licensed MIT, docs CC BY 3.0, Currently v4.0.0-alpha.5. GeoJSON - 2002 JSON.org Leaflet - 2015 Vladimir Agafonkin. Maps © OpenStreetMap contributors.

Copyright (c) 2016 Ryan Peterson, Chris Clifford, Getro Naissance, and Hal Fairless
