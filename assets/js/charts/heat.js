var margin = { top: 50, right: 0, bottom: 50, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendEleWidth = gridSize*2,
    buckets = 9,
    colors = ["#e3e3a0","#c7e9b4","#95ca90","#8aa17c","#78a0a1","#ca9bad","#e37f80","#be585a","#a5484e"], /*7fcdbb c66b6d*/
    days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    times = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", 
            "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"];
    datasets = ["assets/sets/data1.tsv", "assets/sets/data2.tsv"];

var svg = d3.select("#heat-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", 0)
      .attr("y", function (d, i) { return i * gridSize; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
      .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
      .text(function(d) { return d; })
      .attr("x", function(d, i) { return i * gridSize; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("class", function(d, i) { return ((i >= 7 && i <= 17) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

var heatChart = function(tsv) {
  d3.tsv(tsv, function(d) {
    return {
      day: +d.day,
      hour: +d.hour,
      value: +d.value
    };
  },

  function(error, data) {
    var tip = d3.tip()
      .attr("class", "d3-tool-tips")
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Value</strong> - " + d.value + "<br>" 
                + "<strong>Day</strong> - " + d.day + "<br>" 
                + "<strong>Hour</strong> - " + d.hour;
    });

    var colorScale = d3.scale.quantile()
      .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
      .range(colors);

    //For legend:
    var legend = svg.selectAll("g")
      .data([0].concat(colorScale.quantiles()), function(d) { return d; });

    legend.enter().append("g")
      .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return legendEleWidth * i; })
      .attr("y", height)
      .attr("width", legendEleWidth)
      .attr("height", gridSize / 2)
      .attr("transform", "translate(5, 5)")
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d); })
      .attr("x", function(d, i) { return legendEleWidth * i; })
      .attr("y", height + gridSize)
      .attr("transform", "translate(5, 5)");

    legend.exit().remove();

    // for each card/tiles:
    var cards = svg.selectAll(".hour")
      .data(data, function(d) {return d.day+':'+d.hour;}); /*{return d.day+':'+d.hour;}*/

    cards.enter().append("rect")
      .attr("x", function(d) { return (d.hour - 1) * gridSize; })
      .attr("y", function(d) { return (d.day - 1) * gridSize; })
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("class", "hour bordered")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .attr("transform", "translate(5, 5)")
      .style("fill", colors[0])
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    cards.transition().duration(1000)
      .style("fill", function(d) { return colorScale(d.value); });
      
    cards.call(tip);
    
    cards.exit().remove();

  });  
};

heatChart(datasets[0]);

var datasetpicker = d3.select(".datasets-picker").selectAll(".dataset-button")
  .data(datasets);

  datasetpicker.enter()
    .append("input")
    .attr("value", function(d){ return "Dataset - " + d.slice(12,17) })
    .attr("type", "button")
    .attr("class", "btn btn-default")
    .on("click", function(d) {
      heatChart(d);
    });