#!/usr/bin/env node

"use strict";

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder({xmldec: { 'version': '1.0', 'encoding': 'UTF-8', 'standalone': false}});
var out = fs.createWriteStream(process.argv[3]);
var _ = require('underscore');

fs.readFile(process.argv[2], function(err, data) {
    parser.parseString(data, function (err, result) {

        if (err) {
            console.log('Source file has incorrect xml syntax');
            console.log(err);
            process.exit(1);
        }

        /**
         //* <trkpt lat="45.829824" lon="8.091413">
         //<ele>696</ele>
         //<time>2016-04-19T11:36:54.000Z</time>
         //<extensions>
         //<gpxdata:distance>0</gpxdata:distance>
         //<gpxdata:speed>0</gpxdata:speed>
         //</extensions>
         //</trkpt>
         */

        _.each(result.gpx.trk, function(trk) {
            _.each(trk.trkseg, function(trkseg) {
                _.each(trkseg.trkpt, function(trkpt, index) {

                    trkpt['extensions'] = {
                        'gpxdata:distance': 0,
                        'gpxdata:speed': 0
                    };


                    if (index > 0) {

                        var timeDiff =( new Date(trkpt['time'][0]) ) - ( new Date(trkseg.trkpt[index-1]['time'][0]) );

                        trkpt.extensions['gpxdata:distance'] = calcDistance(trkpt['$'].lat, trkpt['$'].lon, trkseg.trkpt[index-1]['$'].lat, trkseg.trkpt[index-1]['$'].lon);


                        if (timeDiff === 0) {
                            trkpt.extensions['gpxdata:speed'] = 0;
                        }
                        else {
                            trkpt.extensions['gpxdata:speed'] = trkpt.extensions['gpxdata:distance'] / timeDiff * 1000 * 3600 / 1000;
                        }


                    }
                    //console.log(trkpt);
                });
            });
        });

        //console.log(result.gpx.trk[0].trkseg);

        var xml = builder.buildObject(result);
        out.write(xml);

        //console.log(xml);
    });
});

/**
 * calculate distance between two points
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 */
var calcDistance = function(lat1, lon1, lat2, lon2) {
    var R = 6371000; // metres
    var PI = 3.141592653589793;

    var pi1 = lat1 * PI / 180;
    var pi2 = lat2 * PI / 180;
    var deltaPi = (lat2-lat1) * PI / 180;
    var deltaGamma = (lon2-lon1) * PI / 180;

    var a = Math.sin(deltaPi / 2) * Math.sin(deltaPi / 2) +
        Math.cos(pi1) * Math.cos(pi2) *
        Math.sin(deltaGamma/2) * Math.sin(deltaGamma/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d;
};





