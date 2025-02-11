// 1: CREATE BLANK SVG
// Set dimensions and margins for the scatter plot
const margin = { top: 50, right: 30, bottom: 60, left: 100 },
      width = 800 - margin.left - margin.right, // Actual chart width
      height = 600 - margin.top - margin.bottom; // Actual chart height

// Create the SVG container, setting the full width and height including margins
const svgScatter = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)  // Total width with margins
    .attr("height", height + margin.top + margin.bottom)  // Total height with margins
    .append("g") // Append a `g` element to position the chart content correctly within the SVG
    .attr("transform", `translate(${margin.left},${margin.top})`);  // Offset by the top and left margins

// 2: LOAD...
d3.csv("colleges.csv").then(data => {
    // 2: ... AND REFORMAT DATA
    // console.log(data)
    data.forEach(d => {
        d["earnings"] = +d["Median Earnings 8 years After Entry"];
        d["debt"] = +d["Median Debt on Graduation"];
    })

    // 3: SET AXES SCALES
    //Your code...
    let xScatter = d3.scaleLinear() // x variable: earnings
        .domain([0, d3.max(data, d => d.earnings)])
        .range([0, width]);

    let yScatter = d3.scaleLinear() // y variable: debt
        .domain([0, d3.max(data, d => d.debt)])
        .range([0, height]);

    let xEarnings = d3.scaleLinear() // x variable: earnings
        .domain([0, d3.max(data, d => d.earnings)])
        .range([0, width]);

    let yDebt = d3.scaleLinear() // y variable: debt
        .domain([0, d3.max(data, d => d.debt)])
        .range([height, 0]);

    // 4: PLOT POINTS
    //Your code...
    svgScatter.attr("class", "scatter")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xEarnings(d.earnings))
        .attr("cy", d => yDebt(d.debt))
        .attr("r", 5)
        // tooltip code
        .on("mouseover", function(event, d) {
            d3.select(this).transition().duration(100).attr("r", 10);
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`${d.Name}
                    <br>Median Earnings: $${d.earnings}
                    <br>Median Debt: $${d.debt}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(100).attr("r", 5);
            tooltip.transition().duration(500).style("opacity", 0);
        })

    // 5: AXES
    // Add x-axis
    //Your code...
    svgScatter.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xEarnings));
    
    // Add y-axis
    //Your code...
    svgScatter.append("g")
        .call(d3.axisLeft(yDebt));

    // 6: ADD LABELS
    // Add title
    //Your code...
    svgScatter.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle") // Center the text
        .attr("x", width / 2) // Centered horizontally on the chart
        .attr("y", -margin.top / 2) // Positioning below the x-axis
        .text("College Debt upon Graduation vs Earnings 8 Years Later"); // Change as needed
    
    // Add x-axis label
    //Your code...
    svgScatter.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2) // Centered horizontally on the chart
        .attr("y", height + (margin.bottom / 2)) // Positioning below the x-axis
        .text("Median Earnings ($)"); // Change as needed
    
    // Add y-axis label
    //Your code...
    svgScatter.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)") // Rotate the text for vertical alignment
        .attr("y", -margin.left / 2) // Position it slightly away from the axis
        .attr("x", -height / 2) // Center it vertically
        .text("Median Debt ($)"); // Change as needed
    

    // [optional challenge] 7: ADD TOOL-TIP
    // Follow directions on this slide: https://docs.google.com/presentation/d/1pmG7dC4dLz-zfiQmvBOFnm5BC1mf4NpG/edit#slide=id.g32f77c1eff2_0_159
    //Your code...
    let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
});
