// (function() {
//     'use strict';
//
//     angular
//         .module('app.charts')
//         .directive('haloChart', haloChart);
//
//     haloChart.$inject = ['$rootScope', '$document', '$localStorage'];
//
//     function haloChart($rootScope, $document, $localStorage) {
//
//         var directive = {
//             restrict: 'EA',
//             templateUrl: $rootScope.app.templateDir + 'halo.chart.template.html',
//             scope: {
//                 dataset: '=?'
//             },
//             link: link
//         };
//         return directive;
//
//         function link(scope, element, attrs) {
//
//           var data;           // Holds the currently used data (senate or house)
//           var dataSource={};  // Object holds both senate and house data sources.
//           var delay=3000;
//           var accumSliderSeries = [];
//           var sliderPointer = 0;
//           var sliderStrokeDistance = 6; // distance between 2 strokes
//           var widthStroke = 2;
//           var widthStrokeActive = 2.5;
//           var currentApiData = null;
//           var refreshIntervalId;
//           var distinctGroupKeys = [];
//           var playPause;
//           var currentApiData, running=true;
//
//           var rect, screenWidth, screenHeight, outerRadius,
//               viz, viz_container, viz_title, theme,
//               timeSlider, mGroup, titleEnter, circleEnter, labelEnter,
//               monthEnter, monthUpdate
//               ;
//
//           var vizuly = window.vizuly;
//
//           if (self == top) {
//               rect = $document[0].body.getBoundingClientRect();
//           } else {
//               rect = parent.$document[0].body.getBoundingClientRect();
//           }
//
//           //Set display size based on window size.
//           screenWidth = (rect.width < 960)
//               ? Math.round(rect.width * .95)
//               : Math.round((rect.width - 210) * .95)
//           screenHeight = 600;//Math.min(parent.innerHeight * 0.75, screenWidth);
//           screenWidth = 600;//screenHeight;
//           outerRadius = (screenWidth / 2);
//
//           d3.select(element[0].querySelector('#currentDisplay')).attr("item_value", screenWidth + "," + screenHeight).attr("class", "selected").html("<a>" + screenWidth + "px - " + screenHeight + "px</a>");
//
//           // Set the size of our container element.
//           viz_container = d3.selectAll(element[0].querySelector('#viz_container')).style("width", screenWidth + "px").style("height", screenHeight + "px");
//
//           viz = vizuly.viz.halo_cluster(element[0].querySelector('#viz_container'));
//
//           timeSlider = d3.select(element[0].querySelector('#timeSlider'))
//               .style("width", screenWidth + "px")
//               .style("height", 50 + "px")
//               .style("margin", "0 auto")
//               .append("svg")
//               .attr("class","timeSlider")
//               .style("width", screenWidth + "px")
//               .style("height", 50 + "px")
//               .style("margin", 0 + " auto");
//
//           mGroup = timeSlider.append("g")
//               .style("height", 50 + "px")
//               .style("margin", 10 + " auto")
//               .attr("class","months")
//               .style("cursor","pointer");
//
//           // Draw title and legend
//           var svgInfoChart = d3.select(element[0].querySelector('#infoChart'))
//               .style("width", "100%")
//               .style("height", 90 + "px")
//               .append("svg")
//               .attr("class", "info-chart")
//               .attr("transform", "translate(" + 0 + ","  + 0 + ")")
//               .style("width", "100%")
//               .style("height", 90 + "px")
//               .style("fill", "#000");
//
//           // Legend
//           var cGroup = svgInfoChart.append("g")
//               .attr("class","circles")
//               .style("width", "100%")
//               .attr("transform", "translate(" + 10 + ","  + 45 + ")");
//
//           var dataCircle = [
//               { "x_axis": 0, "y_axis": 0, "radius": 8, "color" : "#4CAF50" },
//               { "x_axis": 0, "y_axis": 25, "radius": 8, "color" : "#F44336" }
//           ];
//
//           var dataLabel = [
//               { label: 'Positive sentiment' },
//               { label: 'Negative sentiment' },
//           ]
//
//           var circleAxis = cGroup.selectAll("g.circle")
//               .data(dataCircle);
//
//           var labelAxis = cGroup.selectAll("g.circle")
//               .data(dataLabel);
//
//           circleEnter = circleAxis.enter();
//
//           labelEnter = labelAxis.enter();
//
//           circleEnter.append("circle")
//               .attr("cx", function(d) {
//                   return d.x_axis;
//               })
//               .attr("cy", function(d) {
//                   return d.y_axis;
//               })
//               .attr("r", function(d) {
//                   return d.radius;
//               })
//               .style("fill", function(d) {
//                   return d.color;
//               });
//
//           labelEnter.append("text")
//               .style("font-size", "14px")
//               .text(function(d) {
//                   return d.label;
//               })
//               .attr("transform", function(d, i) {
//                   return "translate(" + 15 + ","  + ((i === 0) ? 5 : 30) + ")"
//               });
//
//           // D3 formatters we will use for labels
//           var formatDate = d3.time.format("%b %d, 20%y");
//
//           // Set our party colors
//           var repColor="#F44336";
//           var demColor="#4CAF50";
//           // var repColor="#F80018";
//           // var demColor="#0543bc";
//           var otherColor="#FFa400";
//
//           // Create a skin object that has all of the same properties as the skin objects in the /themes/halo.js vizuly file
//           var customSkin = {
//               name: "custom",
//               labelColor: "#FFF",
//               labelFill: "#000",
//               background_transition: function (selection) {
//                   viz.selection().select(".vz-background").transition(1000).style("fill-opacity", 0);
//               },
//               // Here we set the contribution colors based on the party
//               link_stroke: function (d, i) {
//                   return (d.data.PTY == "negative") ? repColor : (d.nodeGroup="positive") ? demColor: otherColor;
//               },
//               link_fill: function (d, i) {
//                   return (d.data.PTY == "negative") ? repColor : (d.nodeGroup="positive") ? demColor: otherColor;
//               },
//               link_fill_opacity:.2,
//               link_node_fill_opacity:.5,
//               node_stroke: function (d, i) {
//                   return "#FFF";
//               },
//               node_over_stroke: function (d, i) {
//                   return "#FFF";
//               },
//               // Here we set the candidate colors based on the party
//               node_fill: function (d, i) {
//                   return (d.nodeGroup == "negative") ? repColor : (d.nodeGroup=="positive") ? demColor: otherColor;
//               },
//               arc_stroke: function (d, i) {
//                   return "#FFF";
//               },
//               // Here we set the arc contribution colors based on the party
//               arc_fill: function (d, i) {
//                   return (d.data.PTY == "negative") ? repColor : (d.nodeGroup=="positive") ? demColor: otherColor;
//               },
//               arc_over_fill: function (d, i) {
//                   return "#000";
//               },
//               class: "vz-skin-political-influence-no"
//           };
//
//           playPause = $('#playPause');
//
//           playPause.on('click',stopStart);
//
//           function stopStart() {
//               if (running==true) {
//                   running=false;
//                   stopAnnimation();
//                   playPause.attr('src', 'app/img/play_bw.png');
//               }
//               else {
//                   running=true;
//                   playPause.attr('src', 'app/img/pause_bw.png');
//                   scheduleAnnimation();
//               }
//           }
//
//           loadData();
//
//           function loadData() {
//
//               fetchData(function(tmpDataApi) {
//                   buildSliderSeries(tmpDataApi);
//
//                   var updating = false;
//                   if (updating) {
//                       return;
//                   }
//                   updating = true;
//
//                   if (!parseDataAndUpdate(tmpDataApi)) {
//                       clearInterval(refreshIntervalId);
//                       loadData();
//                   } else {
//                       updating = false;
//                       scheduleAnnimation();
//                   }
//               });
//           }
//
//           function fetchData(callback) {
//               var tmpDataApi = [];
//
//               if (!$rootScope.app.haloApiData) {
//                 var url = 'http://watson.wtst.io/sentiments/states?count=40&threshold=0.02&tickers=AAPL,AMZN,FB,GOOGL,NFLX,NVDA,PCLN,TSLA,TRIP,SRCL,AMAT,AMGN,AMZN,ATVI,AVGO,BBBY,BIDU,BIIB,BMRN,CA,CTSH,CTXS,DISCA,DISCK,DISH,DLTR,EA,EBAY,ENDP,ESRX,LRCX,LVNTA,MAR,MAT,MDLZ,MNST,MSFT,MU,MXIM,MYL';
//                 $.ajax({
//                     url: url,
//                     method: 'GET'
//                 }).success(function (response) {
//                   tmpDataApi = response;
//                   $localStorage.haloData = tmpDataApi;
//
//                   if (callback) {
//                       callback(tmpDataApi);
//                   }
//                 }).fail(function () {
//                     console.log('Fail to get data from api: ' + url);
//                 });
//               } else {
//                 tmpDataApi = $rootScope.app.haloApiData
//                 if (callback) {
//                     callback(tmpDataApi);
//                 }
//               }
//           }
//
//           function parseDataAndUpdate(tmpDataApi) {
//               if (parseData(tmpDataApi, sliderPointer) === null) {
//                   return false;
//               } else {
//                   if (!sliderPointer) {
//                       currentApiData = tmpDataApi;
//                   } else {
//                       tmpDataApi[sliderPointer] = currentApiData[sliderPointer-1];
//                   }
//
//                   update(parseData(tmpDataApi, sliderPointer));
//                   return true;
//               }
//           }
//
//           function parseData(source, index) { // zero base index of item index
//
//               let dataIndex = index;
//               let arr = source[dataIndex];
//               let internalData = [];
//
//               if (dataIndex < source.length) {
//                 for (let i = 0; i < arr.length; i++) {
//                   let item = {
//                       CAND_ID: arr[i][0], // "IRBT"
//                       CAND_NAME: arr[i][0], // "IRBT"
//                       CMTE_ID: arr[i][1].replace(/[\. ]/g, '_'), // "www.broadcastnewsroom.com"
//                       CMTE_NM: arr[i][1], // "www.broadcastnewsroom.com"
//                       Key: arr[i][3], // "K0"
//                       PTY: (arr[i][2] > 0 ? 'positive' : 'negative'), // "positive"
//                       TRANSACTION_AMT: arr[i][2] // "0.923376024"
//                   };
//                   internalData.push(item);
//                 }
//
//                 for (let j = 0; j < internalData.length; j++) {
//                   for (let z = 0; z < internalData.length; z++) {
//                     if (internalData[j].CAND_NAME === internalData[z].CAND_NAME) {
//                       if (internalData[j].TRANSACTION_AMT < 0) {
//                         internalData[j].CAND_ID = '_' + internalData[j].CAND_ID;
//                       }
//                       if (internalData[z].TRANSACTION_AMT < 0) {
//                         internalData[z].CAND_ID = '_' + internalData[z].CAND_ID;
//                       }
//                     }
//                   }
//                 }
//
//                 // internalData = internalData.slice(0, 10);
//                 return internalData;
//               }
//               return null;
//           }
//
//           function scheduleAnnimation() {
//               if (!currentApiData) {
//                   return;
//               }
//               refreshIntervalId = setInterval(function() {
//                   // shiftRight();
//                   // console.log('refreshInterval: ' + refreshIntervalId);
//                   update(parseData(currentApiData, sliderPointer));
//               }, delay);
//           }
//           function stopAnnimation() {
//               if (refreshIntervalId) {
//                   clearInterval(refreshIntervalId);
//               }
//           }
//           function shiftRight() {
//               var lastItem = distinctGroupKeys[distinctGroupKeys.length - 1];
//               for (var i = distinctGroupKeys.length - 1; i >= 1; i--) {
//                   distinctGroupKeys[i] = distinctGroupKeys[i - 1];
//               }
//               distinctGroupKeys[0] = lastItem;
//
//               var shiftedData = [];
//               for (var i = 0; i < distinctGroupKeys.length; i++) {
//                   for (var j = 0; j < data.length; j++) {
//                       if (data[j].CMTE_ID == distinctGroupKeys[i]) {
//                           shiftedData.push(data[j]);
//                       }
//                   }
//               }
//               data = shiftedData;
//           }
//
//           //Initializes chart and container.
//           function update(data) {
//
//             // console.log('sliderPointer: ' + sliderPointer);
//
//               updateSliders(sliderPointer++);
//               if (sliderPointer === accumSliderSeries.length) {
//                   sliderPointer = 0;
//               }
//
//               viz.data(data)
//                   .width(800).height(600)                     // Initial display size
//                   .haloKey(function (d) {
//                       return d.CMTE_ID; })                    // The property that determines each PAC
//                   .nodeKey(function (d) {
//                       return d.CAND_ID; })                    // The property that determines Candidate
//                   .nodeGroupKey(function (d) {
//                       return d.PTY; })                        // The property that determines candidate Party affiliation
//                   .value(function (d) {
//                       return Math.abs(Number(d.TRANSACTION_AMT)); })            // The property that determines the weight/size of the link path
//                   .on("update", onUpdate)                     // Callback for viz update
//                   .on("nodeover",node_onMouseOver)            // Callback for mouseover on the candidates
//                   .on("nodeout",onMouseOut)                   // Callback for mouseout on from the candidate
//                   .on("arcover",arc_onMouseOver)              // Callback for mouseover on each PAC
//                   .on("arcout",onMouseOut)                    // Callback for mouseout on each PAC
//                   .on("linkover",link_onMouseOver)            // Callback for mousover on each contribution
//                   .on("linkout",onMouseOut)                   // Callback for mouseout on each contribution
//                   .on("nodeclick",node_onClick)
//
//               theme = vizuly.theme.halo(viz);
//
//               theme.skins()["custom"]=customSkin;
//               theme.skin("custom");
//
//               viz_title = viz.selection().select("svg").append("text").attr("class", "title")
//                   .style("font-family","Raleway")
//                   .attr("x", viz.width() / 2).attr("y", 40).attr("text-anchor", "middle").style("font-weight",300).text("");
//
//               //Update the size of the component
//               changeSize(d3.select("#currentDisplay").attr("item_value"));
//           }
//
//           function buildSliderSeries(apiData) { // data from API
//               if (!apiData) {
//                   return;
//               }
//
//               var countSliderPoints = function (dataFromApi) {
//                   return dataFromApi.length; // first item is for naming
//               };
//
//               var buildPoint = function(index) {
//                   return {
//                       index: index,
//                       xAxisLabel: '',
//                       peakLabel: ''
//                   };
//               };
//
//               accumSliderSeries = [];
//               for (var i = 0; i < countSliderPoints(apiData); i++) {
//                   accumSliderSeries.push(buildPoint(i))
//               }
//
//               if ((accumSliderSeries.length - 1) * sliderStrokeDistance > screenWidth) {
//                   sliderStrokeDistance = 3;
//                   widthStroke = 1;
//                   widthStrokeActive = 1.5;
//               }
//               if ((accumSliderSeries.length - 1) > 200) {
//                   sliderStrokeDistance = 2;
//                   widthStroke = 0.75;
//                   widthStrokeActive = 1;
//               }
//               var sliderWidth = sliderStrokeDistance * accumSliderSeries.length;
//               mGroup.attr("transform", "translate(" + (outerRadius - sliderWidth/2) + ","  + 20 + ")");
//               sliderPointer = 0;
//           }
//
//           // Time slider
//           function updateSliders(currentIndex) {
//               function getStrokeY1(ordinalFromCurrent) {
//                   if (ordinalFromCurrent == 0)
//                       return 0;
//                   else if (ordinalFromCurrent == 1)
//                       return 4;
//                   else if (ordinalFromCurrent == 2)
//                       return 8;
//                   else if (ordinalFromCurrent == 3)
//                       return 11;
//                   else if (ordinalFromCurrent == 4)
//                       return 14;
//                   else if (ordinalFromCurrent == 5)
//                       return 15;
//                   else if (ordinalFromCurrent == 6)
//                       return 15;
//                   else
//                       return 16;
//               }
//               function getOpacityFromCurrent(ordinalFromCurrent) {
//                   if (ordinalFromCurrent == 0)
//                       return 1;
//                   else if (ordinalFromCurrent == 1)
//                       return .9;
//                   else if (ordinalFromCurrent == 2)
//                       return .8;
//                   else if (ordinalFromCurrent == 3)
//                       return .7;
//                   else if (ordinalFromCurrent == 4)
//                       return .6;
//                   else if (ordinalFromCurrent == 5)
//                       return .5;
//                   else if (ordinalFromCurrent == 6)
//                       return .4;
//                   else
//                       return .4;
//               }
//
//               var maxHeight = 22;
//
//               var monthAxis = mGroup.selectAll("g.month")
//                   .data(accumSliderSeries);
//
//               monthEnter = monthAxis.enter()
//                   .append("g")
//                   .attr("class", "month");
//
//               // draw a vertical line
//               // (x1, y1) top, (x2, y2) bottom. x1 = x2
//               monthEnter.append("line")
//                   .attr("x1", function (dataAtI, i) {
//                       return i * sliderStrokeDistance;
//                   })
//                   .attr("x2", function (dataAtI, i) {
//                       return i * sliderStrokeDistance;
//                   })
//                   .attr("y1", function (dataAtI, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getStrokeY1(ordinalFromCurrent);
//                   })
//                   .attr("y2", maxHeight)
//                   .attr("shape-rendering", "crispEdges")
//                   .attr('stroke-width', widthStroke)
//                   .style("stroke-opacity", function (d, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getOpacityFromCurrent(ordinalFromCurrent);
//                   })
//                   .style("stroke", "#000")
//                   .on("click", function (d) {
//                       sliderPointer = d.index;
//                       parseDataAndUpdate(currentApiData);
//                   });
//
//
//               // top text
//               monthEnter.append("text")
//                   .attr("transform", function (dataAtI, i) {
//                       return "translate (" + String(i * sliderStrokeDistance - 10) + ", -3)";
//                   })
//                   .text(function (dataAtI, i) {
//                       return dataAtI.peakLabel;
//                   })
//                   .style("fill-opacity", function (d, i) {
//                       return 0; // hide by default, will be delay-shown latter
//                   });
//
//               // bottom text
//               monthEnter.append("text")
//                   .attr("transform", function (dataAtI, i) {
//                       return "translate (" + (i * sliderStrokeDistance - 10) + ",33)";
//                   })
//                   .text(function (dataAtI, i) {
//                       return dataAtI.xAxisLabel + '';
//                   });
//
//               monthUpdate = monthAxis.transition();
//
//               // show/hide text
//               monthUpdate.select("text")
//                   .delay(delay / 2)
//                   .style("fill-opacity", function (d) {
//                       if (d.index == currentIndex) {
//                           return 1;
//                       }
//                       return 0;
//                   });
//
//               monthUpdate.select("line")
//                   .delay(delay / 2)
//                   .attr("y1", function (d, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getStrokeY1(ordinalFromCurrent);
//                   })
//                   .style("stroke-width", function (d, i) {
//                       if (i == currentIndex) {
//                           return widthStrokeActive;
//                       }
//                       return widthStroke;
//                   })
//                   .style("stroke-opacity", function (d, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getOpacityFromCurrent(ordinalFromCurrent);
//                   })
//                   .style("stroke", "#000");
//
//           }
//
//           // Each time the viz is updated we adjust our title color
//           // Do a little tweak for our custom skin.
//           function onUpdate() {
//               viz_title.style("fill", (theme.skin() != customSkin) ? theme.skin().labelColor : "#000");
//           }
//
//           // An example of how you could respond to a node click event
//           function node_onClick(e,d,i) {
//               console.log("You have just clicked on " + d.values[0].CAND_NAME);
//           }
//
//           // For each mouse over on the node we want to create a datatip that shows information about the candidate
//           // and any assoicated PACs that have contributed to the candidate.
//           function node_onMouseOver(e,d,i) {
//               stopAnnimation();
//
//               //Find all node links (candidates) and create a label for each arc
//               var haloLabels={};
//               var links=viz.selection().selectAll(".vz-halo-link-path.node-key_" + d.key);
//               var total=0;
//
//               //For each link we want to dynamically total the transactions to display them on the datatip.
//               links.each(function (d) {
//                   total+= viz.value()(d.data);
//                   var halos=viz.selection().selectAll(".vz-halo-arc.halo-key_" + viz.haloKey()(d.data));
//                   halos.each(function (d) {
//                       if (!haloLabels[d.data.key]) {
//                           haloLabels[d.data.key]=1;
//                           createPacLabel(d.x, d.y,d.data.values[0].CMTE_NM);
//                       }
//                   })
//               });
//
//               //Format the label for the datatip.
//               total = d3.format(",.0f")(total);
//
//               //Create and position the datatip
//               var rect = d3.selectAll(".vz-halo-arc-plot")[0][0].getBoundingClientRect();
//
//               var node = viz.selection().selectAll(".vz-halo-node.node-key_" + d.key);
//
//               //Create and position the datatip
//               var rect = node[0][0].getBoundingClientRect();
//
//               var x = rect.left;
//               var y = rect.top + document.body.scrollTop;
//
//               var strSyntax = d.values[0].PTY == 'positive' ? 'Sentiment index: +' : 'Sentiment index: -'
//
//               createDataTip(x + d.r, y + d.r + 25, d.values[0].CAND_ID, d.values[0].CAND_NAME,  strSyntax + total);
//           }
//
//           // For each PAC we want to create a datatip that shows the total of all contributions by that PAC
//           function arc_onMouseOver(e,d,i) {
//               stopAnnimation();
//
//               //Find all links from a PAC and create totals
//               var links=viz.selection().selectAll(".vz-halo-link-path.halo-key_" + d.data.key);
//               var total=0;
//               var num = 0;
//               var average = 0;
//               links.each(function (d) {
//                   num ++;
//                   total+= viz.value()(d.data);
//               });
//
//               total = d3.format(",.0f")(total);
//
//               average = d3.format(",.0f")(total / num);
//               // console.log('number: ' + num);
//
//               //Create and position the datatip
//               var rect = d3.selectAll(".vz-halo-node-plot")[0][0].getBoundingClientRect();
//               createDataTip(d.x + rect.left  + rect.width/2, (d.y + rect.top + rect.height + 100),"NEWS SOURCE", d.data.values[0].CMTE_NM,"Sentiment index: " + total);
//           }
//
//           // When the user rolls over a link we want to create a lable for the PAC and a data tip for the candidate that the
//           // contribution went to.
//           function link_onMouseOver(e,d,i) {
//               stopAnnimation();
//
//               // find the associated candidate and get values for the datatip
//               var cand=viz.selection().selectAll(".vz-halo-node.node-key_" + viz.nodeKey()(d.data));
//               var datum=cand.datum();
//               var total = d3.format(",.0f")(viz.value()(d.data));
//               var date = '';
//               // var date = d.data.month + "/" + d.data.day + "/" + d.data.year;
//
//               //Create and position the datatip
//               var rect = d3.selectAll(".vz-halo-arc-plot")[0][0].getBoundingClientRect();
//               createDataTip(datum.x + rect.left + datum.r, datum.y + datum.r + rect.height/2 + rect.top, date, d.data.CAND_NAME,"Sentiment index: " + total);
//
//               //find the pac and create a label for it.
//               var pac=viz.selection().selectAll(".vz-halo-arc.halo-key_" + viz.haloKey()(d.data));
//               datum=pac.datum();
//               createPacLabel(datum.x, datum.y,datum.data.values[0].CMTE_NM);
//           }
//
//           //Here is a template for our data tip
//           var datatip='<div class="tooltip-halo" style="width: 250px; background-opacity:.5">' +
//               // '<div class="header1">HEADER1</div>' +
//               // '<div class="header-rule"></div>' +
//               '<div class="header2"> HEADER2 </div>' +
//               '<div class="header-rule"></div>' +
//               '<div class="header3"> HEADER3 </div>' +
//               '</div>';
//
//           // This function uses the above html template to replace values and then creates a new <div> that it appends to the
//           // document.body.  This is just one way you could implement a data tip.
//           function createDataTip(x,y,h1,h2,h3) {
//
//               var html = datatip.replace("HEADER1", h1);
//               html = html.replace("HEADER2", h2);
//               html = html.replace("HEADER3", h3);
//
//               d3.select("body")
//                   .append("div")
//                   .attr("class", "vz-halo-label")
//                   .style("position", "absolute")
//                   .style("top", y + "px")
//                   .style("left", (x - 125) + "px")
//                   .style("opacity",0)
//                   .style("z-index",99999)
//                   .html(html)
//                   .transition().style("opacity",1);
//
//           }
//
//           // This function creates a highlight label with the PAC name when an associated link or candidate has issued a mouseover
//           // event.  It uses properties from the skin to determine the specific style of the label.
//           function createPacLabel (x,y,l) {
//
//               var g = viz.selection().selectAll(".vz-halo-arc-plot").append("g")
//                   .attr("class","vz-halo-label")
//                   .style("pointer-events","none")
//                   .style("opacity",0);
//
//               g.append("text")
//                   .style("font-size","11px")
//                   .style("fill",theme.skin().labelColor)
//                   .style("fill-opacity",.75)
//                   .attr("text-anchor","middle")
//                   .attr("x", x)
//                   .attr("y", y)
//                   .text(l);
//
//               var rect = g[0][0].getBoundingClientRect();
//               g.insert("rect","text")
//                   .style("shape-rendering","auto")
//                   .style("fill",theme.skin().labelFill)
//                   .style("opacity",.45)
//                   .attr("width",rect.width+12)
//                   .attr("height",rect.height+12)
//                   .attr("rx",3)
//                   .attr("ry",3)
//                   .attr("x", x-5 - rect.width/2)
//                   .attr("y", y - rect.height-3);
//
//               g.transition().style("opacity",1);
//           }
//
//           // When we mouse out we want to remove all pac datatips and labels.
//           function onMouseOut(d,i) {
//               scheduleAnnimation();
//               d3.selectAll(".vz-halo-label").remove();
//           }
//
//           //
//           // Functions used by the test container to set various properties of the viz
//           //
//           function changeSkin(val) {
//               if (!val) return;
//               theme.skin(val);
//               viz.update();
//           }
//
//           function changeSize(val) {
//               var s = String(val).split(",");
//               viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');
//               viz.width(Number(s[0])).height(Number(s[1])).update();
//               viz_title.attr("x", viz.width() / 2);
//               theme.apply();
//           }
//
//           var congress="House";
//           function changeData(val) {
//               congress=val;
//               data=dataSource[val];
//               viz.data(data).update();
//           }
//
//         }
//     }
//
// })();
