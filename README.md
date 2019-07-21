# Overview

NewsServer provides images rendered from various information sources that can be used in a slideshow.  To do this, static URLs are required to reference the image.

Each image is rendered to a 1920x1080 PNG file and returned as part of a REST request.


## Weather
### Lattitude & Longitude
```
http://your-hostname/weather/forecast/lat/42.346228/lon/-71.097688/title/Fenway%20Park%20Forecast
```

This is the simplies form, if you know the lat/lon.  Google maps can get this easily if you click on the map and check the URL.  Make sure the lat/lon is over land in the US.  It fails if the coordinates are over the water.

Specific parameters:
* lat - a floating point value for decimal degrees of north lattitude (e.g. 42.346228, 42.34)
* lon - a floating point value for decimal degrees of west longitude (e.g. -71.097688, -71.09)
* title - The title to be displayed.  Remember to use %20 for a space.

### Zip code and MapQuest Key
```
http://your-hostname/weather/forecast/zip/02201/key/98524rfjokhjgfklu092uyhg/title/Fenway%20Park%20Forecast
```

If you know the zip code you can get a location that way but you need to provide a MapQuest key.  They are free for lots of transactions per month.  

Go to https://developer.mapquest.com/user/me/apps to signup and get a key.  Then, just provide the key in the URL as shown below.  The lat/lon is easier for one time lookups but this works well for contructed queries where the lat/lon coordinates are not known ahead of time.

Specific parameters:
* zip - a 5 digit US zip code.
* key - a Mapquest Key.  See above.
* title - The title to be displayed.  Remember to use %20 for a space.

## Baseball
### Team lookup
```
http://your-hostname/baseball/schedule/team/BOS
```

This retreives an image with a 7 day schedule including 2 days back.  If there are any days with double-headers, fewer than 7 days are shown.  

Past games show the final score.  Current games show the score and inning (updated every 10 minutes) and future games show the start time in the local city.

Specific parameters:
* team - Use the MLB abbreviation for the team.  (e.g.: Boston = BOS, Tampa Bay = TB, Chicago White Sox = CWS, ...)

# Installation
```
$ npm install           # pulls in my weatherimage repo as well
$ npm start             # starts the node server on port 80
```
