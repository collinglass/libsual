// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Diameter', 'Age'],
    [8, 37], [4, 19.5], [11, 52], [4, 22], [3, 16.5], [6.5, 32.8], [14, 72]]);

  var options = {
    title: 'Age of sugar maples vs. trunk diameter, in inches',
    hAxis: {title: 'Diameter'},
    vAxis: {title: 'Age'},
    legend: 'none',
    trendlines: { 0: {} }    // Draw a trendline for data series 0.
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

// FOOTER

$(document).foundation();
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

// REMINDER CSV data = Hour, Unique Visits