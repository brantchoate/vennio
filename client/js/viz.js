var BarChart = function(data, config) {

  this.width = config.width || 400;
  this.height = config.height || 700;
  this.offset = config.offset || 19;
  this.colors = config.colors || ['#000000'];
  this.selector = config.selector;

  this.categories = data.categories;
  this.metrics = data.metrics;

  this.xscale = d3.scale.linear()
    .domain([data.metrics[9], data.metrics[0]])
    .range([300, this.width]);

  this.yscale = d3.scale.linear()
    .domain([0, this.categories.length])
    .range([0, 70 * this.categories.length]);

  this.colorScale = d3.scale.quantize()
    .domain([0, this.categories.length])
    .range(this.colors);

  this.canvas = d3.select(this.selector)
    .append('svg')
    .attr({
      width: this.width,
      height: this.height
    });

  this.yAxis = d3.svg.axis()
    .orient('right')
    .scale(this.yscale)
    .tickSize(0)
    .tickFormat(function(d, i) { return data.categories[i]; })

  return this;
};

BarChart.prototype.render = function() {
  var _this = this;
  this.canvas.selectAll('g').remove();

  var bars = this.canvas.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'bars')
    .selectAll('rect')
    .data(this.metrics)
    .enter()
      .append('rect')
      .attr('height', 65)
      .attr({
        x: 0,
        y: function(d, i) { return _this.yscale(i); }
      })
      .style('fill', function(d, i) { return _this.colorScale(i); })
      .attr('width', function(d) { return 0; });

  this.canvas.append('g')
    .style('opacity', '0')
    .transition()
    .duration(1000)
    .attr('transform', 'translate(10,-40)')
    .style('opacity', '1')
    .attr('id', 'yaxis')
    .style({'fill':'#fff', 'font-size':'22px'})
    .call(this.yAxis);

  //ANIMATION
  d3.select(this.selector).selectAll('rect')
    .transition()
    .duration(1000)
    .attr({width: function(d) { return _this.xscale(d); }});

  d3.selectAll('.bars')
    .selectAll('text')
    .data(this.metrics)
    .enter()
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', 0)
      .transition()
      .duration(1000)
      .attr({x:function(d) {return _this.xscale(d) - 10; }, y:function(d, i) { return _this.yscale(i) + 42; }})
      .text(function(d) { return d; }).style({'fill':'#fff', 'font-size':'40px'});
}

var generateCompareFunction = function(metric) {
  return function(a, b) {
    if (a[metric] > b[metric]) {
      return -1;
    } else if (a[metric] === b[metric]) {
      return 0;
    } else {
      return 1;
    }
  };

};

/*
metric: metric used
group: what grouping
limit: number of data points visualizing
data: returned data from server endpoint
*/
var generateInput = function(metric, group, limit, data) {
  var input = {};

  // Sort based on metric
  var sortedData = data.sort(generateCompareFunction(metric));

  // Take a subset of data based on the limit
  var dataLimited = data.slice(0, limit);

  // categories are the yaxis labels
  //TODO: The leading empty string needs refactor
  input.categories = [''].concat(
    dataLimited.map(function(item) {
      return item[group];
    })

  );

  input.metrics = dataLimited.map(function(item) {
    return item[metric];
  });

  // Changed this based on UI style. Chit Chat Time: what's up Brant? How is your day?
  return input;
};

var colWidth = $('.barchart').width();

var data1 = generateInput('Jobs', 'Skill', 10, SalaryJobBySkill);
var data2 = generateInput('Startups', 'Skills', 10, CompanyBySkill);
var data3 = generateInput('AvgSal', 'Skill', 10, SalaryJobBySkill);

data3.metrics = data3.metrics.map(function(m) {
  return Math.round(m);
});

var b = new BarChart(data1, {
  selector: '.wrapper1',
  colors: ['#19C999'],
  width: colWidth
});

var b2 = new BarChart(data2, {
  selector: '.wrapper2',
  colors: ['#9686E9'],
  width: colWidth
})

var b3 = new BarChart(data3, {
  selector: '.wrapper3',
  colors: ['#E65E5E'],
  width: colWidth
})

b.render();
b2.render();
b3.render();

$('#update').click(function() {
  b.render();
  b2.render();
  b3.render();
});
