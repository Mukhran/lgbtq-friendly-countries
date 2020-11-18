

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
//polygonTemplate.tooltipHTML = '<b>{name}: {value}</b><br><a href='{link}'>Get info</a>';
polygonTemplate.tooltipHTML = '<b>{name}</b><br><a href="/amCharts/{id.urlEncode()}">More info</a>';
polygonTemplate.fill = am4core.color("#74B266");

// Set up tooltips
polygonSeries.calculateVisualCenter = true;
polygonTemplate.tooltipPosition = "fixed";
polygonSeries.tooltip.label.interactionsEnabled = true;
polygonSeries.tooltip.keepTargetHover = true;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");



// European countries
polygonSeries.include = ["AD","AT","BA","BE","BG","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FR",
"GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MC","MD","ME","MT","NL","NO","PL","PT","RO","RS","SE","SI","SK","UA"];

// Add some data
polygonSeries.data = [


{
  "id": "EE",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "GR",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "CZ",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "IT",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "HR",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "CY",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "HU",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "AD",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "SI",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "LI",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "MC",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "ME",
  "fill": am4core.color("#FFA07A")
},

{
  "id": "BG",
  "fill": am4core.color("#DC143C")
},

{
  "id": "BY",
  "fill": am4core.color("#DC143C")
},

{
  "id": "MD",
  "fill": am4core.color("#DC143C")
},

{
  "id": "UA",
  "fill": am4core.color("#DC143C")
},

{
  "id": "LT",
  "fill": am4core.color("#DC143C")
},

{
  "id": "LV",
  "fill": am4core.color("#DC143C")
},

{
  "id": "RS",
  "fill": am4core.color("#DC143C")
},

{
  "id": "SK",
  "fill": am4core.color("#DC143C")
},

{
  "id": "RO",
  "fill": am4core.color("#DC143C")
},

{
  "id": "PL",
  "fill": am4core.color("#DC143C")
},

{
  "id": "BA",
  "fill": am4core.color("#DC143C")
},

];

// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";





