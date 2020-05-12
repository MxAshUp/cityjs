const http = require('http');
const unzip = require('unzip');
const csvParse = require('csv-parse');
const stringify = require('csv-stringify');
const fs = require('fs');

//http://download.geonames.org/export/dump/cities5000.zip

// cities1000.zip
// cities15000.zip
// cities500.zip
// cities5000.zip


// Column notes
// ---------------------------------------------------
// geonameid         : integer id of record in geonames database
// name              : name of geographical point (utf8) varchar(200)
// asciiname         : name of geographical point in plain ascii characters, varchar(200)
// alternatenames    : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(10000)
// latitude          : latitude in decimal degrees (wgs84)
// longitude         : longitude in decimal degrees (wgs84)
// feature class     : see http://www.geonames.org/export/codes.html, char(1)
// feature code      : see http://www.geonames.org/export/codes.html, varchar(10)
// country code      : ISO-3166 2-letter country code, 2 characters
// cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 200 characters
// admin1 code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
// admin2 code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80)
// admin3 code       : code for third level administrative division, varchar(20)
// admin4 code       : code for fourth level administrative division, varchar(20)
// population        : bigint (8 byte int)
// elevation         : in meters, integer
// dem               : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
// timezone          : the iana timezone id (see file timeZone.txt) varchar(40)
// modification date : date of last modification in yyyy-MM-dd format


// const transformer = transform(function(record, callback){
//   callback(null, JSON.stringify(record));
// });

const fileName = 'cities5000';

const columnsToKeep = [
  'latitude',
  'longitude',
  'name',
  'countryCode',
]

console.log(`Downloading ${fileName}.zip...`);
http.get(`http://download.geonames.org/export/dump/${fileName}.zip`, function(response) {
  response.pipe(unzip.Parse())
  .on('entry', function (entry) {
    if (entry.path === `${fileName}.txt`) {
      console.log(`Found ${fileName}.txt...`);
      entry
        .pipe(csvParse({
          delimiter: "	",
          columns: [
            'geonameid',
            'name',
            'asciiname',
            'alternatenames',
            'latitude',
            'longitude',
            'featureClass',
            'featureCode',
            'countryCode',
            'cc2',
            'admin1Code',
            'admin2Code',
            'admin3Code',
            'admin4Code',
            'population',
            'elevation',
            'dem',
            'timezone',
            'modificationDate',
          ]
        }))
        .pipe(stringify({
          header: true,
          delimiter: String.fromCharCode(9), // Tab
          columns: {
            ...columnsToKeep.reduce((o, k) => ({...o, [k]: k}), {})
          }
        }))
        .pipe(fs.createWriteStream(`./src/${fileName}.csv`))
    } else {
      console.log(`Ignoring ${fileName}...`);
      entry.autodrain();
    }
  })
});