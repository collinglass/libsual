/*
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Get Data
function getData() {

  $.getJSON( "/api/data/", function(myJson) {
    console.log( "success" );

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawChart);
    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    
    function drawChart() {
      var data = google.visualization.arrayToDataTable(myJson);
    
      var options = {
        title: 'Age of sugar maples vs. trunk diameter, in inches',
        hAxis: {title: 'Hour'},
        vAxis: {title: 'Unique Visits'},
        legend: 'none',
        trendlines: { 0: {} }    // Draw a trendline for data series 0.
      };
    
      var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  });
}
getData();

// FOOTER

$(document).foundation();
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

// REMINDER CSV data = Hour, Unique Visits
*/