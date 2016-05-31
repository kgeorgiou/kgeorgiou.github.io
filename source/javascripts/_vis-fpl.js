function drawGraphs() {
    var result = JSON.parse(fplos15);

    var data = result.sort(function (a, b) {
        return a[a.length - 1].oprank - b[b.length - 1].oprank;
    });

    var xScale = new Plottable.Scales.Category();
    var yScaleOp = new Plottable.Scales.Linear();
    yScaleOp.domain([
        data.length + 0.5,
        0.5
    ]);
    yScaleOp.tickGenerator(Plottable.Scales.TickGenerators.integerTickGenerator());

    var yScaleTv = new Plottable.Scales.Linear();
    yScaleTv.domain([
        data.length + 0.5,
        0.5
    ]);
    yScaleTv.tickGenerator(Plottable.Scales.TickGenerators.integerTickGenerator());

    var colorScale = new Plottable.Scales.Color();
    colorScale.domain(data.map(function (a) {
        return a[0].tname;
    }));

    var legend = new Plottable.Components.Legend(colorScale);
    legend.maxEntriesPerRow(Infinity);

    var lineW = 3.5;
    var pointW = 3;
    var pointS = 5;

    var opLinePlot = new Plottable.Plots.Line().x(function (d) {
        return d.gw;
    }, xScale).y(function (d) {
        return d.oprank;
    }, yScaleTv).attr("stroke-width", lineW).attr("stroke", function (d) {
        return d.tname;
    }, colorScale);

    var opScatterPlot = new Plottable.Plots.Scatter().symbol(function (d) {
        return d.wildcard
            ? new Plottable.SymbolFactories.cross()
            : new Plottable.SymbolFactories.circle();
    }).x(function (d) {
        return d.gw;
    }, xScale).y(function (d) {
        return d.oprank;
    }, yScaleTv).attr("stroke-width", pointW).size(pointS).attr("stroke", function (d) {
        return d.tname;
    }, colorScale).attr("fill", function (d) {
        return d.tname;
    }, colorScale).attr("opacity", 1);

    var tvLinePlot = new Plottable.Plots.Line().x(function (d) {
        return d.gw;
    }, xScale).y(function (d) {
        return d.tvrank;
    }, yScaleTv).attr("stroke-width", lineW).attr("stroke", function (d) {
        return d.tname;
    }, colorScale);

    var tvScatterPlot = new Plottable.Plots.Scatter().x(function (d) {
        return d.gw;
    }, xScale).y(function (d) {
        return d.tvrank;
    }, yScaleTv).attr("stroke-width", pointW).size(pointS).attr("stroke", function (d) {
        return d.tname;
    }, colorScale).attr("fill", function (d) {
        return d.tname;
    }, colorScale).attr("opacity", 1);

    data.forEach(function (d) {
        var dataSet = new Plottable.Dataset(d, {name: d[0].tname});
        opLinePlot.addDataset(dataSet);
        opScatterPlot.addDataset(dataSet);
        tvLinePlot.addDataset(dataSet);
        tvScatterPlot.addDataset(dataSet);
    });

    var opPlots = new Plottable.Components.Group([opLinePlot, opScatterPlot]);
    var tvPlots = new Plottable.Components.Group([tvLinePlot, tvScatterPlot]);

    var xAxisOp = new Plottable.Axes.Category(xScale, "bottom");
    var xAxisTv = new Plottable.Axes.Category(xScale, "bottom");
    var yAxisOp = new Plottable.Axes.Numeric(yScaleOp, "left");
    var yAxisTv = new Plottable.Axes.Numeric(yScaleTv, "left");

    var labelOp = new Plottable.Components.AxisLabel("Overall Point Rankings per Gameweek", 0);
    var labelTv = new Plottable.Components.AxisLabel("Team Value Rankings per Gameweek", 0);

    var title = new Plottable.Components.TitleLabel("The League of Sirs (2015/16)", 0);
    title.padding(20);

    labelOp.padding(10);
    labelTv.padding(10);

    var table = new Plottable.Components.Table([
        [null, title],
        [null, legend],
        [null, labelOp],
        [yAxisOp, opPlots],
        [null, xAxisOp],
        [null, labelTv],
        [yAxisTv, tvPlots],
        [null, xAxisTv]
    ]);

    table.renderTo("svg#fpl-plot");

    var adjustOpacity = function (plot, legendText) {
        plot.attr("opacity", function (d, i, ds) {
            return ds.metadata().name == legendText
                ? 1
                : .2;
        });
    };

    new Plottable.Interactions.Click().attachTo(legend).onClick(function (p) {
        if (legend.entitiesAt(p)[0] !== undefined) {
            var selected = legend.entitiesAt(p)[0].datum;
            adjustOpacity(opScatterPlot, selected);
            adjustOpacity(opLinePlot, selected);
            adjustOpacity(tvScatterPlot, selected);
            adjustOpacity(tvLinePlot, selected);
        }
    });

    new Plottable.Interactions.Click().attachTo(opPlots).onClick(function () {
        opScatterPlot.attr("opacity", 1);
        opLinePlot.attr("opacity", 1);
        tvScatterPlot.attr("opacity", 1);
        tvLinePlot.attr("opacity", 1);
    });

    // Initializing tooltip anchor
    var opTooltipAnchorSelection = opPlots.foreground().append("circle").attr({r: 3, opacity: 0});

    var opTooltipAnchor = $(opTooltipAnchorSelection.node()).tooltip({animation: false, container: "body", placement: "auto", title: "text", trigger: "manual"});

    new Plottable.Interactions.Pointer().onPointerMove(function (p) {
        var closest = opScatterPlot.entityNearest(p);
        if (closest) {
            opTooltipAnchor.attr({
                cx: closest.position.x,
                cy: closest.position.y,
                "data-original-title": closest.datum.op + " points"
            });
            opTooltipAnchor.tooltip("show");
        }
    }).onPointerExit(function () {
        opTooltipAnchor.tooltip("hide");
    }).attachTo(opPlots);

    var tvTooltipAnchorSelection = tvPlots.foreground().append("circle").attr({r: 3, opacity: 0});

    var tvTooltipAnchor = $(tvTooltipAnchorSelection.node()).tooltip({animation: false, container: "body", placement: "auto", title: "text", trigger: "manual"});

    new Plottable.Interactions.Pointer().onPointerMove(function (p) {
        var closest = tvScatterPlot.entityNearest(p);
        if (closest) {
            tvTooltipAnchor.attr({
                cx: closest.position.x,
                cy: closest.position.y,
                "data-original-title": closest.datum.tv + "M"
            });
            tvTooltipAnchor.tooltip("show");
        }
    }).onPointerExit(function () {
        tvTooltipAnchor.tooltip("hide");
    }).attachTo(tvPlots);
}
