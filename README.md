# cityjs
Simply finds the nearest city to lat/long position from a tiny database of about 50,000 cities. It's super fast and requires no remote api's (can be used offline).

## Why?
Querying remote api's to find information about cities is not always an option. Maybe you have an offline raspberry pi with gps? Or maybe you have a reactive web app that needs to quickly lookup nearest cities without constantly pinging a remote api.

## Data
This package uses data found here: http://download.geonames.org/export/dump
By default the dataset of cities with populations > 5,000 is used. If you need to also lookup cities with smaller populations, please build cityjs from source.

This data set puts the cityjs package at around 1.8MB. This may not be ideal for some web apps, but it's small enough for most applications.

## Usage
### nearestCity({ latitude: number, longitude: number})

Returns a the nearest city to latitude, longitude. Provides city name, country code, lat, long, and distance from queried coordinates.
```javascript
import { nearestCity } from 'cityjs'

const cityNearMe = nearestCity({ latitude: 44.0618643, longitude: -121.3188065 });

console.log(cityNearMe);

/**
 * Outputs:
 * {
 *   latitude:    44.05817
 *   longitude:   -121.31531
 *   name:        Bend
 *   countryCode: US
 *   distance:    0.00003898881741539725
 * }
```

### nearestCities({ latitude: number, longitude: number}, k: number)

Similar to nearestCity, but returns an array of cities of length **k** sorted from nearest to farthest.
```javascript
import { nearestCities } from 'cityjs'

const citiesNearMe = nearestCities({ latitude: 44.0618643, longitude: -121.3188065 }, 3);

console.log(citiesNearMe);

/**
 * Outputs:
 * [
 *   {
 *     latitude:    44.05817
 *     longitude:   -121.31531
 *     name:        Bend
 *     countryCode: US
 *     distance:    0.00003898881741539725
 *   },
 *   {
 *     latitude:    43.99151
 *     longitude:   -121.35836
 *     name:        Deschutes River Woods
 *     countryCode: US
 *     distance:    0.0006622218438156748
 *   },
 *   {
 *     latitude:    44.27262
 *     longitude:   -121.17392
 *     name:        Redmond
 *     countryCode: US
 *     distance:    0.0020506509923908602
 *   }
 * ]
```

## Credit/Thanks
 - This package was heavily influence by the python package [citipy](https://github.com/wingchen/citipy).
 - Also credit to [kd-tree-javascript](https://github.com/ubilabs/kd-tree-javascript) module which is bundled with cityjs. This is where the magic happens.

## TODO
 - [x] Build utilities for grabbing geoname data
 - [x] Implement basic geo-coordinate lookups using kd trees as seen in citipy
 - [x] Performance improvements
 - [x] Maybe implment proper distance comparison (might not matter)
 - [x] Create rollup configurations
 - [x] Implement extended functionality (eg get 5 nearest cities)
 - [ ] Create separate builds for different data sets (population > 500, 5000, etc...)
 - [ ] Add ability to pre-filter citiy list by country