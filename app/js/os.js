// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

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
      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Operating System');
      data.addColumn('number', 'Visits');
      data.addRows(myJson);
      // Set chart options
      var options = {'title':'Usage by OS',
                     'width':400,
                     'height':300};
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  });
}
getData();
