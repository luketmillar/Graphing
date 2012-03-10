(function(w) {
    var colors = ["#252525", "#FA9715", "#29AAE1", "#542437", "#53777A"];

    // ARRAY
    Array.max = function(array) {
        return Math.max.apply(Math, array);
    };
    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };

    // GRAPH
    if (!w.graph) w.graph = {};
    
    // creates a canvas drawing a bar graph
    // options
    //    - data: array of intergers to graph
    //    - height: height of the canvas (default 200)
    //    - width: width of the canvas (default 400)
    // examples
    //    graph.bar({data: [10, 20, 30, 0, 100]});
    //    graph.bar({data: [10, 20, 30, 0, 100], width: 200, height: 200});
    graph.bar = function(options) {
        // Initialize options.
        var data = options.data;
        var graphHeight = options.height || 200;
        var graphWidth = options.width || 400;
        
        // Calculate graphing variables.
        var barWidth = Math.floor(graphWidth / data.length);
        var maxValue = Array.max(data);
        
        // Create the canvas.
        var graph = document.createElement('canvas');
        graph.height = graphHeight;
        graph.width = graphWidth;
        var ctx = graph.getContext('2d');
        
        // Draw all bars.
        for (var i = 0; i < data.length; i++) {
            var value = data[i];
            
            // Bar dimensions
            var barHeight = (value * graphHeight) / maxValue;
            
            // We draw all bars the same color.
            ctx.fillStyle = colors[0];
            
            // Draw bar.
            ctx.fillRect(i * barWidth, graphHeight - barHeight, barWidth, barHeight);
        }
        return graph;
    };
    
    // creates a canvas drawing a pie graph
    // options
    //    - data: array of intergers to graph
    //    - height: height of the canvas (default 300)
    //    - width: width of the canvas (default 300)
    //    - spacing: pixel padding between slices (default 0)
    // examples
    //    graph.bar({data: [10, 20, 50]});
    //    graph.bar({data: [10, 20, 50], width: 200, height: 200});
    //    graph.bar({data: [10, 20, 50], spacing: 5});
    graph.pie = function(options) {
        // Initialize options.
        var data = options.data;
        var graphHeight = options.height || 300;
        var graphWidth = options.width || 300;
        var spacing = options.spacing || 0;        
        var padding = 2 * spacing;
        
        // Calculate the total so we can figure out percentages
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            total += data[i];
        }
        
        // Initialize graphing variables.
        var diameter = Math.min(graphHeight, graphWidth) - padding;
        var radius = Math.floor(diameter / 2);
        var center = radius + spacing;
        var startAngle = 1;
        
        // Create the canvas.            
        var graph = document.createElement('canvas');
        graph.height = diameter + padding;
        graph.width = diameter + padding;
        var ctx = graph.getContext('2d');
        
        // Draw each data point.
        for (var i = 0; i < data.length; i++) {
            var value = data[i];
            
            // Calculate mid and end angles.
            var sliceSize = (Math.PI * 2 * (value / total));
            var endAngle = startAngle + sliceSize;
            var midAngle = startAngle + sliceSize/2;
            
            // Calculate the center point with spacing offset.
            var centerY = center + Math.sin(midAngle) * spacing;
            var centerX = center + Math.cos(midAngle) * spacing;
            
            // Get the color. We cycle through the list of colors if we run out.
            ctx.fillStyle = colors[i % colors.length];
            
            // Draw the slice.
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
            ctx.lineTo(centerX, centerY);
            ctx.fill();
            
            startAngle = endAngle;
        }
        return graph;
    };
    
    // creates a canvas drawing a percentage graph
    // options
    //    - value: percentage value to draw
    //    - color: color of the percent filled in (default to #29AAE1)
    //    - height: height of the graph (default to 70)
    //    - width: width of the graph (default to 300)
    // examples
    //    graph.bar({value: 78});
    graph.percentage = function(options) {
        // Initialize options.
        var value = options.value;
        var graphHeight = options.height || 60;
        var graphWidth = options.width || 300;
        var barColor = options.color || colors[2];
        
        // Calculate graphing variables.
        var filledInWidth = Math.floor(graphWidth * (value / 100));
        var grayedOutWidth = graphWidth - filledInWidth;

        // Create the canvas.
        var graph = document.createElement('canvas');
        graph.height = graphHeight;
        graph.width = graphWidth;
        var ctx = graph.getContext('2d');

        // Draw the blue bar.
        ctx.fillStyle = barColor;
        ctx.fillRect(0, 0, filledInWidth, graphHeight);

        ctx.fillStyle = colors[0];
        ctx.fillRect(filledInWidth, 0, grayedOutWidth, graphHeight);
        
        // Draw the text.
        ctx.font = "20pt Helvetica";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(value + '%', filledInWidth - 10, graphHeight / 2);
        return graph;
    };
})(window);
