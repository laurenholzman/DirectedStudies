// JavaScript source code
async function getStuff(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data, "response");
    pntRoute = data
    return data
}
filler = await getStuff('PNToneLine2.geojson')
pntRoute = pntRoute.features[0]





console.log(pntRoute, "pntRoute")
distanceChange = 0.05;

var distancesToCheck = []
for (i = 0; i < turf.length(geojsonLine); i = i + distanceChange) {
    distancesToCheck.push(i);
}
distancesToCheck.push(turf.length(geojsonLine)); //adds last point to ensure line displayed is of the correct length.
var elevationPoints = _getPointsToCheck(geojsonLine, distancesToCheck);
//elevationPlot()
let coords;


for (var i = 0; i < elevationPoints.length; i++) {
    coords = elevationPoints[i].geometry.coordinates;

    //this is the reason the elevation profile is so slow. This was the simplest way to query the elevation that I could find that was free. For this service, you cannot do multiple points at once to my knowledge, causing a huge slow down. I know you can also sample elevation through the mapbox rbg tiles, but I got confused halfway through trying that.
    var link2 = `https://nationalmap.gov/epqs/pqs.php?x=${coords[0]}&y=${coords[1]}&units=Meters&output=json&__ncforminfo=WDoY5iIkH99QoxSMc5GQYzbiTrYoUYK4Queko5PPbV2U_WWXoA-JJ8YjpEmR-6WHidpf6jkSpEs3fSBCbietRlsT4SDJqSZ9pMM7nr4F6CTbJkBM3JSC0XZbw3gW6EQXuuMJGzGZ0xS6YoGSOuq50A%3D%3D&__ncforminfo=_loyPwUiZOjrU5XiaWRlrZZA1PDVvTaukn02GFkurLPrIiTLbOemIgJYjOuE5AXBf9nqscwEaENPOaKmlrW6W7NTLXWSIy-sGKTG3xagglYFeVkaCoPOC1aQbI6WxLb-R77Y4l28lZ8Gg9UZJtrpp_OsRsngKOmU`;
    var elevationData = await fetch(link2, { method: "GET" });
    elevationData = await elevationData.json();
    elevationsAlongLine.push(elevationData.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation)

}


function _getPointsToCheck(lineString, distancesToCheck) {
    let points = [];
    distancesToCheck.forEach(function (distance) {
        let feature = turf.along(lineString, distance, { units: "kilometers" });
        feature.properties.distanceAlongLine = distance * 1000;
        points.push(feature);
    });
    return points;
}