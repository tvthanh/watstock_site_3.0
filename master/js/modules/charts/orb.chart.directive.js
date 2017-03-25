(function() {
    'use strict';


  const SOURCE_INDEX = 1;
  const SCORE_INDEX = 2;
  const DATA_ROW_OFFSET = 2;
  const AVG_VALUES_INDEX = 1;

  var prepareOrbData = (rawData) => {

    var orbData = [];
    var orbHeaders = [];

    //step 1 : preparing the heading row
    var singleOrbHeader = rawData[0][0][SOURCE_INDEX];
    orbHeaders.push(singleOrbHeader);
    for (let tickerState of rawData) {
      for (let aRecord of tickerState) {
        if (singleOrbHeader != aRecord[SOURCE_INDEX]) {
          orbHeaders.push(aRecord[SOURCE_INDEX]);
          singleOrbHeader = aRecord[SOURCE_INDEX];
        }
      }
    }
    orbData.push ( orbHeaders);

    //step 2 : preparing state rows with zero values
    for (var index = 0; index < (rawData.length+1); index +=1) {
      var stateRow = [];
      for (var i=0;i<orbHeaders.length; i +=1) {
        stateRow.push(0);
      }
      orbData.push ( stateRow);
    }

    //step 3 : putting proper values to orb data
    for (var headerIndex = 0; headerIndex < orbHeaders.length; headerIndex += 1) {
      var source = orbHeaders[headerIndex];
      for (var stateIndex = 0; stateIndex < rawData.length; stateIndex += 1) {
        var rawState = rawData[stateIndex];
        for (let stateItem of rawState) {
          if (source == stateItem[SOURCE_INDEX]) {
            orbData[stateIndex + DATA_ROW_OFFSET][headerIndex] = stateItem[SCORE_INDEX];
          }
        }
      }
    }

    //step 4 : calculating average values and putting them to proper data row of orb data
    for (var headerIndex = 0; headerIndex < orbHeaders.length; headerIndex += 1) {
      var valuesCnt = 0;
      var sum = 0;
      for (var orbDataIndex = DATA_ROW_OFFSET; orbDataIndex < orbData.length ; orbDataIndex +=1) {
        if (orbData[orbDataIndex][headerIndex] != 0) {
          valuesCnt +=1;
          sum += orbData[orbDataIndex][headerIndex];
        }
      }
      orbData[AVG_VALUES_INDEX][headerIndex]  = (valuesCnt > 0) ? sum/valuesCnt:0;

    }

    return orbData;

  };

    angular
        .module('app.charts')
        .directive('orbChart', orbChart);

    orbChart.$inject = ['$rootScope', '$document'];

    function orbChart($rootScope, $document) {

        var directive = {
            restrict: 'EA',
            templateUrl: $rootScope.app.templateDir + 'orb.chart.template.html',
            scope: {
                dataset: '=?',
                ticker: '=?'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

            scope.$on('$destroy', function() {
              if (refreshIntervalId) {
                clearInterval(refreshIntervalId);
              }
              d3.selectAll("svg > *").remove();
              d3.select("#svgDiv").selectAll("svg").remove();
            });

            var maxWidth = 900;
            // var maxWidth = Math.max(900, Math.min(window.innerWidth, window.innerHeight) - 50); //TODO

            var outerRadius = (maxWidth / 2),
                innerRadius = outerRadius - 170,
                // maxSliderWidth=Math.max(600,(innerRadius*2)-250);
                maxSliderWidth = (outerRadius - 50) * 2;

            var itemCountPerApiCall = 40;

            var iText, iChords, eText, eChords;

            var angleRange = 320,
                baseYear = 2001,
                maxMonth = 1,
                maxYear = 12,
                monthOffset = (maxSliderWidth) / (maxYear * 12 + maxMonth),
                countries,
                e_labels = [],
                e_chords = [],
                i_labels = [],
                i_chords = [],
                topCountryCount = 20,
                e_buf_indexByName = {},
                e_indexByName = {},
                e_nameByIndex = {},
                i_indexByName = {},
                i_nameByIndex = {},
                i_buf_indexByName = {},
                export_countries = [],
                import_countries = [],
                e_colorByName = {},
                i_colorByName = {},
                months = [],
                monthlyExports = [],
                monthlyImports = [],
                countriesGrouped,
                delay = 2000,
                refreshIntervalId = undefined,
                year = 0,
                month = -1,
                running = true,
                formatNumber = d3.format(",.0f"),
                formatCurrency = function(d) {
                    return "-$" + formatNumber(d)
                },
                eTextUpdate,
                eChordUpdate,
                TextUpdate,
                iChordUpdate,
                titleEnter,
                circleEnter,
                labelEnter,
                gradientGroup,
                ticker,
                monthEnter,
                monthUpdate,
                preparedData;

            var toolTip = d3.select(document.getElementById("toolTip-orb"));
            var header = d3.select(document.getElementById("head"));
            var header1 = d3.select(document.getElementById("header1"));
            var header2 = d3.select(document.getElementById("header2"));

            var e_fill = d3.scale.ordinal().range(["#1B5E20", "#388E3C", "#4CAF50", "#81C784", "#C8E6C9"]);
            var i_fill = d3.scale.ordinal().range(["#B71C1C", "#D32F2F", "#F44336", "#E57373", "#FFCDD2"]);

            var monthsMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            d3.select(document.getElementById("bpg"))
                .style("min-width", (outerRadius * 2) + "px");


            var playPause = d3.select(document.getElementById("playPause"));

            d3.select(document.getElementById("imgDiv"))
                .style("left", ((outerRadius - maxSliderWidth / 2)) + "px");

            var svg = d3.select(document.getElementById("svgDiv"))
                .style("width", (outerRadius * 2) + "px")
                .style("height", (outerRadius * 2 + 100) + "px")
                .append("svg")
                .attr("id", "svg")
                .style("overflow", "visible")
                .style("width", (outerRadius * 2) + "px")
                .style("height", (outerRadius * 2 + 100) + "px");

            var timeSlider = d3.select(element[0].querySelector('#timeSlider'))
                .style("width", (outerRadius * 2) + "px")
                .style("height", 50 + "px")
                .style("margin", "0 auto")
                .append("svg")
                .attr("class","timeSlider")
                .style("width", (outerRadius * 2) + "px")
                .style("height", 50 + "px")
                .style("margin", 0 + " auto");

            var mGroup = timeSlider.append("g")
                .style("height", 50 + "px")
                .style("margin", 10 + " auto")
                .attr("class","months")
                .style("cursor","pointer");

            // Region legend chart

            // Draw title and legend
            var svgInfoChart = d3.select(document.getElementById("infoChart"))
                .style("width", "100%")
                .style("height", "300px")
                .append("svg")
                .attr("class", "info-chart")
                .attr("transform", "translate(" + 0 + "," + 50 + ")")
                .style("width", "100%")
                .style("height", "300px")
                .style("fill", "#000");

            // Title
            var tGroup = svgInfoChart.append("g")
                .attr("class", "title-chart")
                .attr("transform", "translate(" + 0 + "," + 28 + ")")
                .style("height", "50px");

            var dataTitle = [{
                title: 'Top 40 sentiment influencers'
            }];

            var titleAxis = tGroup.selectAll("g.title")
                .data(dataTitle);

            titleEnter = titleAxis.enter();

            titleEnter.append("text")
                .style("font-size", "14px")
                .text(function(d) {
                    return d.title;
                });

            // Legend
            var cGroup = svgInfoChart.append("g")
                .attr("class", "circles")
                .style("width", "100%")
                .attr("transform", "translate(" + 10 + "," + 60 + ")");

            var dataCircle = [
                { "x_axis": 0, "y_axis": 0, "radius": 8, "color" : "#4CAF50" },
                { "x_axis": 0, "y_axis": 25, "radius": 8, "color" : "#F44336" }
            ];

            var dataLabel = [{
                label: 'positive sentiment'
            }, {
                label: 'negative sentiment'
            }, ]

            var circleAxis = cGroup.selectAll("g.circle")
                .data(dataCircle);

            var labelAxis = cGroup.selectAll("g.circle")
                .data(dataLabel);

            circleEnter = circleAxis.enter();

            labelEnter = labelAxis.enter();

            circleEnter.append("circle")
                .attr("cx", function(d) {
                    return d.x_axis;
                })
                .attr("cy", function(d) {
                    return d.y_axis;
                })
                .attr("r", function(d) {
                    return d.radius;
                })
                .style("fill", function(d) {
                    return d.color;
                });

            labelEnter.append("text")
                .style("font-size", "14px")
                .text(function(d) {
                    return ' - ' + d.label;
                })
                .attr("transform", function(d, i) {
                    return "translate(" + 15 + "," + ((i === 0) ? 5 : 30) + ")"
                });

            // End region legend chart

            var export_chord = d3.layout.arc_chord()
                .padding(.05)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)
                .yOffsetFactor(-0.8);

            var import_chord = d3.layout.arc_chord()
                .padding(.05)
                .yOffsetFactor(0.7)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending);

            var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(innerRadius + 5);


            var dGroup = svg.append("g")
                .attr("class", "mainLabel");

            dGroup.append("text")
                .attr("class", "mainLabel")
                .attr("transform", "translate(" + (outerRadius - 20) + "," + (outerRadius + 30) + ")")
                .style("font-size", "0px");

            var gY = (outerRadius - (innerRadius * .8 / 2));

            gradientGroup = svg.append("g")
                .attr("class", "gradient")
                .attr("transform", "translate(" + (outerRadius - 6) + "," + (gY + 70) + ")");

            var gradient2 = svg.append("defs")
              .append("linearGradient")
                .attr("id", "gradient2")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            gradient2.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "#4CAF50")
                .attr("stop-opacity", 1);

            gradient2.append("stop")
                .attr("offset", "40%")
                .attr("stop-color", "#FFFFFF")
                .attr("stop-opacity", 0);

            gradient2.append("stop")
                .attr("offset", "60%")
                .attr("stop-color", "#FFFFFF")
                .attr("stop-opacity", 0);

            gradient2.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "#F44336")
                .attr("stop-opacity", 1);

            gradientGroup.append("rect")
                .attr("height", ((outerRadius + innerRadius * .7 / 2) - gY))
                .attr("width", 0)
                .style("fill", "url(#gradient2)");

            var sGroup = svg.append("g")
                .attr("class", "sliders")
                .style("cursor", "pointer")
                .attr("transform", "translate(" + (outerRadius - maxSliderWidth / 2 - 20) + "," + 20 + ")");

            var coGroup = svg.append("g")
                .attr("class", "company-info");

            var eGroup = svg.append("g")
                .attr("class", "exports")
                .attr("transform", "translate(" + outerRadius + "," + (outerRadius + 70) + ")");

            var iGroup = svg.append("g")
                .attr("class", "imports")
                .attr("transform", "translate(" + outerRadius + "," + (outerRadius + 70) + ")");

            initialize();

            if (scope.ticker) {
              ticker = scope.ticker;
            } else {
              ticker = 'AAPL';
            }

            function refresh() {
                fetchData(ticker, function(data) {
                    buildSliderSeries(data);

                    var updating = false;
                    setTimeout(function() {
                        updateCompany(getIconLogo(ticker));
                    }, delay + 600);
                    refreshIntervalId = setInterval(function() {
                        // console.log('refreshInterval: ' + refreshIntervalId);
                        if (updating) {
                            return;
                        }
                        updating = true;

                        if (!parseDataAndUpdate(data)) {
                            clearInterval(refreshIntervalId);
                            refresh();
                        } else {
                            updating = false;
                        }
                    }, delay);
                });
            }

            refresh();

            function getIconLogo(ticker) {
                var company_info = {
                    icon: '',
                    name: ''
                };
                switch (ticker) {
                    case 'AMZN':
                        company_info.icon = 'app/img/orb-icon/amazon.png';
                        company_info.name = 'Amazon - AMZN';
                        break;
                    case 'AAPL':
                        company_info.icon = 'app/img/orb-icon/apple.png';
                        company_info.name = 'Apple Inc. (AAPL)';
                        break;
                    case 'FB':
                        company_info.icon = 'app/img/orb-icon/fb.png';
                        company_info.name = 'Facebook - FB';
                        break;
                    case 'GOOGL':
                        company_info.icon = 'app/img/orb-icon/google.png';
                        company_info.name = 'Google - GOOGL';
                        break;
                    case 'GRPN':
                        company_info.icon = 'app/img/orb-icon/groupon.png';
                        company_info.name = 'Groupon - GRPN';
                        break;
                    case 'NFLX':
                        company_info.icon = 'app/img/orb-icon/netflix.png';
                        company_info.name = 'Netflix - NFLX';
                        break;
                    case 'NVDA':
                        company_info.icon = 'app/img/orb-icon/nvidia.png';
                        company_info.name = 'Nvidia - NVDA';
                        break;
                    case 'PCLN':
                        company_info.icon = 'app/img/orb-icon/pcln.png';
                        company_info.name = 'Priceline Group - PCLN';
                        break;
                    case 'TSLA':
                        company_info.icon = 'app/img/orb-icon/tesla.png';
                        company_info.name = 'Tesla - TSLA';
                        break;
                }

                return company_info;
            }

            function initialize() {
                gradientGroup.transition()
                    .select("rect")
                    .delay(delay * 1.5)
                    .attr("width", 12);

                dGroup.transition()
                    .selectAll("text")
                    .delay(delay * 1.5)
                    .style("font-size", "10px");
            }

            playPause.on("click", stopStart);

            function stopStart() {
                if (running == true) {
                    running = false;
                    clearInterval(refreshIntervalId);
                    playPause.attr('src', 'app/img/play_bw.png');
                    eChords.interrupt();
                    iChords.interrupt();
                    iText.interrupt();
                    eText.interrupt();
                } else {
                    running = true;
                    playPause.attr('src', 'app/img/pause_bw.png');
                    refreshIntervalId = setInterval(function() {
                        var updating = false;
                        if (updating) {
                            return;
                        }
                        updating = true;

                        if (!parseDataAndUpdate(currentApiData)) {
                            clearInterval(refreshIntervalId);
                            refresh();
                        } else {
                            updating = false;
                        }
                    }, delay);
                }
            }

            function node_onMouseOver(d) {
                var t;
                if (typeof d.imports === 'undefined') {
                    t = "Score: " + Number(d.exports);
                } else {
                    t = "Score: " + Number(d.imports);
                }
                toolTip.transition()
                    .duration(200)
                    .style("opacity", ".9");
                header.text((d.index + 1) + ". " + d.label);
                // header1.text(monthsMap[month] + " " + (baseYear+year));
                header2.text(t);
                toolTip.style("left", (d3.event.pageX/2) + "px")
                    .style("top", (d3.event.pageY/2) + "px");
            }

            function node_onMouseOut(d) {

                toolTip.transition() // declare the transition properties to fade-out the div
                    .duration(500) // it shall take 500ms
                    .style("opacity", "0"); // and go all the way to an opacity of nil

            }
            /** Returns an event handler for fading a given chord group. */
            function fade(opacity) {

                return;

                return function(g, i) {
                    svg.selectAll("path.chord")
                        .filter(function(d) {
                            //  return true;
                            return d.source.index != i && d.target.index != i;
                        })
                        .transition()
                        .style("opacity", opacity);
                };
            }

            function fetchData(ticker, callback) {
                var url = "http://watson.wtst.io/sentiments/states?count=40&threshold=0.002&tickers=" + ticker;

                $.ajax({
                    url: url,
                    method: 'GET'
                }).success(function(response) {
                    if (callback) {
                        preparedData =  prepareOrbData(response);
                        callback(preparedData);
                    }
                }).fail(function() {
                    console.log('Fail to get data from api: ' + url)
                });
            }

            function transform(data) {
                var transformed = {};
                transformed.positive = [];
                transformed.negative = [];
                for (var i = 0; i < data.sentiments.length; i++) {
                    var item = {};
                    item.sid = data.sentiments[i].name;
                    item.score = data.sentiments[i].score;

                    if (data.sentiments[i].score < 0) {
                        transformed.negative.push(item);
                    } else {
                        transformed.positive.push(item);
                    }
                }
                return transformed;
            }

            function parseData(source, index) { // zero base index of item index
                var data = {
                    sentiments: []
                };

                // first source ([0]) is for naming
                var dataIndex = index + 1;

                if (dataIndex < source.length) {
                    for (var i = 0; i < source[0].length; i++) {
                        var sentimentItem = {
                            score: '',
                            name: ''
                        };
                        sentimentItem.name = source[0][i];
                        if (source[dataIndex][i] !== 0) {
                            sentimentItem.score = 5 * source[dataIndex][i];
                        } else {
                            sentimentItem.score = source[1][i];
                        }
                        data.sentiments.push(sentimentItem);
                    }

                    return transform(data);
                }
                return null;
            }

            function buildChords(data) {
                var postives = data.positive;
                var negatives = data.negative;

                var negative_matrix = [],
                    positive_matrix = [];

                e_buf_indexByName = e_indexByName;
                i_buf_indexByName = i_indexByName;

                e_indexByName = [];
                e_nameByIndex = [];
                i_indexByName = [];
                i_nameByIndex = [];
                e_labels = [];
                i_labels = [];
                e_chords = [];
                i_chords = [];

                var n = 0;

                // Compute a unique index for each package name
                var totalPositive = 0;
                postives.forEach(function(d) {
                    totalPositive += Number(d.score);
                    d = d.sid;
                    if (!(d in e_indexByName)) {
                        e_nameByIndex[n] = d;
                        e_indexByName[d] = n++;
                    }

                    var l = {};
                    l.index = i;
                    l.label = "null";
                    l.angle = 0;
                    e_labels.push(l);

                    var c = {};
                    c.label = "null";
                    c.source = {};
                    c.target = {};
                    e_chords.push(c);
                });

                postives.forEach(function(d) {
                    var source = e_indexByName[d.sid],
                        row = positive_matrix[source];
                    if (!row) {
                        row = positive_matrix[source] = [];
                        for (var i = -1; ++i < n;) row[i] = 0;
                    }
                    row[e_indexByName[d.sid]] = d.score;
                });

                // Compute a unique index for each name.
                n = 0;
                var totalNegative = 0;
                negatives.forEach(function(d) {
                    totalNegative += Number(d.score);
                    d = d.sid;
                    if (!(d in i_indexByName)) {
                        i_nameByIndex[n] = d;
                        i_indexByName[d] = n++;
                    }

                    var l1 = {};
                    l1.index = i;
                    l1.label = "null";
                    l1.angle = 0;
                    i_labels.push(l1);

                    var c1 = {};
                    c1.label = "null";
                    c1.source = {};
                    c1.target = {};
                    i_chords.push(c1);
                });

                negatives.forEach(function(d) {
                    var source = i_indexByName[d.sid],
                        row = negative_matrix[source];
                    if (!row) {
                        row = negative_matrix[source] = [];
                        for (var i = -1; ++i < n;) row[i] = 0;
                    }
                    row[i_indexByName[d.sid]] = d.score;
                });

                // var positiveRange = angleRange * (totalPositive / (totalPositive - totalNegative));
                // var negativeRange = angleRange - positiveRange;

                var positiveRange = 160;
                var negativeRange = 160;

                export_chord.startAngle(-(positiveRange / 2)).endAngle((positiveRange / 2));
                import_chord.startAngle(180 - (negativeRange / 2)).endAngle(180 + (negativeRange / 2));

                import_chord.matrix(negative_matrix);
                export_chord.matrix(positive_matrix);

                for (var i = 0; i < e_labels.length; i++) {
                    e_labels[i].label = 'null';
                    e_chords[i].label = 'null';
                }

                for (i = 0; i < export_chord.groups().length; i++) {
                    var d = {};
                    var g = export_chord.groups()[i];
                    var c = export_chord.chords()[i];
                    d.index = i;
                    d.angle = (g.startAngle + g.endAngle) / 2;
                    d.label = e_nameByIndex[g.index];
                    d.exports = c.source.value;

                    e_labels.push({
                        angle: d.angle,
                        label: d.label,
                        index: i,
                        exports: d.exports
                    });

                    e_chords.push({
                        index: i,
                        label: d.label,
                        source: c.source,
                        target: c.target,
                        exports: d.exports
                    });
                }

                for (i = 0; i < i_labels.length; i++) {
                    i_labels[i].label = 'null';
                    i_chords[i].label = 'null';
                }

                for (i = 0; i < import_chord.groups().length; i++) {
                    d = {};
                    g = import_chord.groups()[i];
                    c = import_chord.chords()[i];
                    d.index = i;
                    d.angle = (g.startAngle + g.endAngle) / 2;
                    d.label = i_nameByIndex[g.index];
                    d.imports = c.source.value;

                    i_labels.push({
                        angle: d.angle,
                        label: d.label,
                        index: i,
                        imports: d.imports
                    });

                    i_chords.push({
                        index: i,
                        label: d.label,
                        source: c.source,
                        target: c.target,
                        imports: d.imports
                    });
                }

                function getFirstIndex(index, indexes) {
                    for (var i = 0; i < topCountryCount; i++) {
                        var found = false;
                        for (var y = index; y < indexes.length; y++) {
                            if (i == indexes[y]) {
                                found = true;
                            }
                        }
                        if (found == false) {
                            return i;
                        }
                    }
                }

                function getLabelIndex(name) {
                    for (var i = 0; i < topCountryCount; i++) {
                        if (e_buffer[i].label == name) {
                            return i;
                        }
                    }
                    return -1;
                }
            }

            var accumSliderSeries = [];
            var sliderPointer = 0;
            var sliderStrokeDistance = 6; // distance between 2 strokes
            var widthStroke = 2;
            var widthStrokeActive = 2.5;
            var currentApiData = null;

            function buildSliderSeries(apiData) { // data from API
                if (!apiData) {
                    return;
                }

                var countSliderPoints = function(dataFromApi) {
                    return dataFromApi.length - 1; // first item is for naming
                };

                var buildPoint = function(index) {
                    return {
                        index: index,
                        xAxisLabel: '',
                        peakLabel: ''
                    };
                };

                accumSliderSeries = [];
                for (var i = 0; i < countSliderPoints(apiData); i++) {
                    accumSliderSeries.push(buildPoint(i))
                }

                if ((accumSliderSeries.length - 1) * sliderStrokeDistance > maxWidth) {
                    sliderStrokeDistance = 3;
                    widthStroke = 1;
                    widthStrokeActive = 1.5;
                }
                if ((accumSliderSeries.length - 1) > 200) {
                    sliderStrokeDistance = 2;
                    widthStroke = 0.75;
                    widthStrokeActive = 1;
                }
                var sliderWidth = sliderStrokeDistance * accumSliderSeries.length;
                mGroup.attr("transform", "translate(" + (outerRadius - sliderWidth / 2) + "," + 20 + ")");
                sliderPointer = 0;
            }

            function parseDataAndUpdate(data) {
                currentApiData = data;
                var transformed = parseData(data, sliderPointer);
                if (transformed === null) {
                    return false;
                } else {
                    // console.debug(sliderPointer);
                    update(transformed);
                    return true;
                }
            }

            function update(data) {
                updateSliders(sliderPointer++);

                buildChords(data);

                eText = eGroup.selectAll("g.group")
                    .data(e_labels, function(d) {
                        return d.label;
                    });

                iText = iGroup.selectAll("g.group")
                    .data(i_labels, function(d) {
                        return d.label;
                    });

                eChords = eGroup.selectAll("g.chord")
                    .data(e_chords, function(d) {
                        return d.label;
                    });

                iChords = iGroup.selectAll("g.chord")
                    .data(i_chords, function(d) {
                        return d.label;
                    });

                eText.enter()
                    .append("g")
                    .attr("class", "group")
                    .append("text")
                    .attr("class", "export")
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    })
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });

                eText.transition()
                    .duration(delay - 1000)
                    .select("text")
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    });

                eText.exit().remove();

                eChords.enter()
                    .append("g")
                    .attr("class", "chord")
                    .append("path")
                    .attr("class", "chord")
                    .style("stroke", function(d) {
                        return d3.rgb(getExportColor(d.source.index)).darker();
                    })
                    .style("fill", function(d) {
                        return getExportColor(d.source.index);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .85 * (data.positive.length - d.index) / data.positive.length
                    })
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .style("opacity", 0)
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });


                eChords.transition()
                    .select("path")
                    .duration(delay- 1000)
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .style("stroke", function(d) {
                        return d3.rgb(getExportColor(d.source.index)).darker();
                    })
                    .style("fill", function(d) {
                        return getExportColor(d.source.index);
                    })
                    .style("stroke-opacity", function(d, i) {
                        return Math.max(.85 * (data.positive.length - d.index) / data.positive.length, .2);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .85 * (data.positive.length - d.index) / data.positive.length
                    })
                    .style("opacity", 1);


                eChords.exit()
                    .remove();

                iText.enter()
                    .append("g")
                    .attr("class", "group")
                    .append("text")
                    .attr("class", "import")
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    })
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });

                iText.transition()
                    .select("text")
                    .duration(delay - 1000)
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    });

                iText.exit()
                    .attr("class", "exit")
                    .transition()
                    .duration(delay)
                    .attr("y", 0)
                    .attr("fill-opacity", 1e-6)
                    .remove();

                iChords.enter()
                    .append("g")
                    .attr("class", "chord")
                    .append("path")
                    .attr("class", "chord")
                    .style("stroke", function(d) {
                        return d3.rgb(getImportColor(d.source.index)).darker();
                    })
                    .style("stroke-opacity", function(d, i) {
                        return Math.max(.85 * (data.negative.length - d.index) / data.negative.length, .2);
                    })
                    .style("fill", function(d) {
                        return getImportColor(d.source.index);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .7 * (data.negative.length - d.index) / data.negative.length
                    })
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });

                iChords.transition()
                    .select("path")
                    .duration(delay - 1000)
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .style("stroke", function(d) {
                        return d3.rgb(getImportColor(d.source.index)).darker();
                    })
                    .style("fill", function(d) {
                        return getImportColor(d.source.index);
                    })
                    .style("stroke-opacity", function(d, i) {
                        return Math.max(.85 * (data.negative.length - d.index) / data.negative.length, .2);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .7 * (data.negative.length - d.index) / data.negative.length
                    });


                iChords.exit()
                    .remove();

            }

            function updateCompany(company_info) {
                var imageInfo = coGroup
                    .selectAll("image")
                    .data([company_info]);
                imageInfo
                    .enter()
                    .append("image")
                    .attr("class", "companyIcon")
                    .attr("transform", "translate(" + (outerRadius - 40) + "," + (outerRadius * 1.02) + ")")
                    .attr('width', 80)
                    .attr('height', 80)
                    .attr("xlink:href", function(d) {
                        return d.icon;
                    });
                imageInfo.exit().remove();

                var textInfo = coGroup
                    .selectAll("text")
                    .data([company_info]);
                textInfo
                    .enter()
                    .append("text")
                    .text(function(d) {
                        return d.name;
                    })
                    .attr("class", "companyName")
                    .attr("fill", "#52687a")
                    .style("font-size", "18px")
                    .attr("transform", function(e) {
                        return "translate(" + (outerRadius - (this.clientWidth != 0 ? this.clientWidth : (this.childNodes[0].length * 8.5)) / 2) + "," + (outerRadius * 1.25) + ")"
                    });
                textInfo.exit().remove();
            }

            function updateSliders(currentIndex) {
                function getStrokeY1(ordinalFromCurrent) {
                    if (ordinalFromCurrent == 0)
                        return 0;
                    else if (ordinalFromCurrent == 1)
                        return 4;
                    else if (ordinalFromCurrent == 2)
                        return 8;
                    else if (ordinalFromCurrent == 3)
                        return 11;
                    else if (ordinalFromCurrent == 4)
                        return 14;
                    else if (ordinalFromCurrent == 5)
                        return 15;
                    else if (ordinalFromCurrent == 6)
                        return 15;
                    else
                        return 16;
                }

                function getOpacityFromCurrent(ordinalFromCurrent) {
                    if (ordinalFromCurrent == 0)
                        return 1;
                    else if (ordinalFromCurrent == 1)
                        return .9;
                    else if (ordinalFromCurrent == 2)
                        return .8;
                    else if (ordinalFromCurrent == 3)
                        return .7;
                    else if (ordinalFromCurrent == 4)
                        return .6;
                    else if (ordinalFromCurrent == 5)
                        return .5;
                    else if (ordinalFromCurrent == 6)
                        return .4;
                    else
                        return .4;
                }

                var maxHeight = 22;

                var monthAxis = mGroup.selectAll("g.month")
                    .data(accumSliderSeries);

                monthEnter = monthAxis.enter()
                    .append("g")
                    .attr("class", "month");

                monthEnter.append("line")
                    .attr("x1", function(dataAtI, i) {
                        return i * sliderStrokeDistance;
                    })
                    .attr("x2", function(dataAtI, i) {
                        return i * sliderStrokeDistance;
                    })
                    .attr("y1", function(dataAtI, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getStrokeY1(ordinalFromCurrent);
                    })
                    .attr("y2", maxHeight)
                    .attr("shape-rendering", "crispEdges")
                    .attr('stroke-width', widthStroke)
                    .style("stroke-opacity", function(d, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getOpacityFromCurrent(ordinalFromCurrent);
                    })
                    .style("stroke", "#000")
                    .on("click", function(d) {
                        sliderPointer = d.index;
                        parseDataAndUpdate(currentApiData);
                    });

                // top text
                monthEnter.append("text")
                    .attr("transform", function(dataAtI, i) {
                        return "translate (" + String(i * sliderStrokeDistance - 10) + ", -3)";
                    })
                    .text(function(dataAtI, i) {
                        return dataAtI.peakLabel;
                    })
                    .style("fill-opacity", function(d, i) {
                        return 0; // hide by default, will be delay-shown latter
                    });

                // bottom text
                monthEnter.append("text")
                    .attr("transform", function(dataAtI, i) {
                        return "translate (" + (i * sliderStrokeDistance - 10) + ",33)";
                    })
                    .text(function(dataAtI, i) {
                        return dataAtI.xAxisLabel + '';
                    });

                monthUpdate = monthAxis.transition();

                // show/hide text
                monthUpdate.select("text")
                    .delay(delay / 2)
                    .style("fill-opacity", function(d) {
                        if (d.index == currentIndex) {
                            return 1;
                        }
                        return 0;
                    });

                monthUpdate.select("line")
                    .delay(delay / 2)
                    .attr("y1", function(d, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getStrokeY1(ordinalFromCurrent);
                    })
                    .style("stroke-width", function(d, i) {
                        if (i == currentIndex) {
                            return widthStrokeActive;
                        }
                        return widthStroke;
                    })
                    .style("stroke-opacity", function(d, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getOpacityFromCurrent(ordinalFromCurrent);
                    })
                    .style("stroke", "#000");
            }

            function getExportColor(i) {
                var country = e_nameByIndex[i];
                if (e_colorByName[country] == undefined) {
                    e_colorByName[country] = e_fill(i);
                }

                return e_colorByName[country];
            }

            function getImportColor(i) {
                var country = i_nameByIndex[i];
                if (i_colorByName[country] == undefined) {
                    i_colorByName[country] = i_fill(i);
                }

                return i_colorByName[country];
            }
        }
    }

})();
