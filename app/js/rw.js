// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

// Get Data
function getData() {

  $.getJSON( "/api/data/2", function(myJson) {
    console.log( "success" );

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawChart);
    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    
    function drawChart() {
      
      // Create the data table.
      var data = google.visualization.arrayToDataTable(myJson);

        var options = {
          title: 'Usage during October 2013 (Reading Week 13-19)'
        };
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('chart_rw'));
      chart.draw(data, options);
    }
  });
}
getData();
