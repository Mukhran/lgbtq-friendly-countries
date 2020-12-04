

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipHTML = '<b>{name}</b><br><a href="/amCharts/{id.urlEncode()}">More info</a>';
polygonTemplate.fill = am4core.color("#74B266");

// Set up tooltips
polygonSeries.calculateVisualCenter = true;
polygonTemplate.tooltipPosition = "fixed";
polygonSeries.tooltip.label.interactionsEnabled = true;
polygonSeries.tooltip.keepTargetHover = true;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#87CEFA");



// European countries
polygonSeries.include = ["AD","AT","BA","BE","BG","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FR",
"GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MC","MD","ME","MT","NL","NO","PL","PT","RO","RS","SE","SI","SK","UA"];

// Add some data
polygonSeries.data = [{
  "id": "FI",
  "name": "Finland: residency in a country where same sex partnership or marriage is legal required",
  "fill": am4core.color("#74B266")
}, {
  "id": "CH",
  "name": "Switzerland: residency required",
  "fill": am4core.color("#74B266")
}, {
  "id": "NO",
  "name": "Norway: residency required",
  "fill": am4core.color("#74B266")
}, {
  "id": "ES",
  "name": "Spain: residency required",
  "fill": am4core.color("#74B266")
}, {
  "id": "EE",
  "name": "Estonia: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "GR",
  "name": "Greece: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "CZ",
  "name": "Czechia: registered partnership",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "IT",
  "name": "Italy: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "HR",
  "name": "Croatia: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "CY",
  "name": "Cyprus: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "HU",
  "name": "Hungary: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "AD",
  "name": "Andorra: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "SI",
  "name": "Slovenia: parnership",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "LI",
  "name": "Liechtenstein: registered partnership",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "MC",
  "name": "Monaco: civil union",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "ME",
  "name": "Montenegro: civil union from July 2021",
  "fill": am4core.color("#FFA07A")
}, {
  "id": "BG",
  "name": "Bulgaria: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "BY",
  "name": "Belarus: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "MD",
  "name": "Moldova: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "UA",
  "name": "Ukraine: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "LT",
  "name": "Lithuania: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "LV",
  "name": "Latvia: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "RS",
  "name": "Serbia: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "SK",
  "name": "Slovakia: does not recognise same-sex marriage",
  "fill": am4core.color("#DC143C")
}, {
  "id": "RO",
  "name": "Romania: does not allow same-sex marriage ",
  "fill": am4core.color("#DC143C")
}, {
  "id": "PL",
  "name": "Poland: no legal recognition",
  "fill": am4core.color("#DC143C")
}, {
  "id": "BA",
  "name": "Bosnia and Herzegovina: no legal recognition",
  "fill": am4core.color("#DC143C")
}];

// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";