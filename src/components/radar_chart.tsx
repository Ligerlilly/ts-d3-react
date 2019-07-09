    // import * as React from 'react'
    // import { select, Selection, BaseType } from 'd3-selection'
    // import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
    // import { axisBottom, axisLeft } from 'd3-axis'
    // import { max } from 'd3-array'
    // import { format } from "d3-format"

    // interface IProps {
    //     data: IDataPoint[];
    //     width: number;
    //     height: number;
    // }

    // interface IDataPoint {
    //     area: string
    //     value: number
    // }

    // export default class BarChart extends React.Component<IProps> {
    //     private svgRef?: SVGElement | null;
    //     constructor(props: IProps) {
    //         super(props)
    //         this.drawChart = this.drawChart.bind(this)
    //     }

    //     public componentDidMount() {
    //         this.drawChart(this.props.data);
    //     }

    //     public componentWillReceiveProps(nextProps: IProps) {
    //         if (nextProps.data !== this.props.data) {
    //             this.drawChart(nextProps.data);
    //         }
    //     }

    //     private drawChart(data: IDataPoint[]) {
    //         const svg = select(this.svgRef!);
    //         const cfg = {
    //             ExtraWidthX: 100,
    //             ExtraWidthY: 100,
    //             color: scaleOrdinal().range(["#6F257F", "#CA0D59"]),
    //             factor: 1,
    //             factorLegend: .85,
    //             h: 600,
    //             levels: 3,
    //             maxValue: 0,
    //             opacityArea: 0.5,
    //             radians: 2 * Math.PI,
    //             radius: 5,
    //             ToRight: 5,
    //             TranslateX: 80,
    //             TranslateY: 30,
    //             w: 600,
    //            }

    //         const allAxis = data.map((i: IDataPoint ) => i.area)
    //         const total = allAxis.length;
    //         const radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    //         const Format = format('%');

    //         const g = svg.append("g").attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")")
    //         //Circular segments
    //         for(var j=0; j<cfg.levels; j++){
    //             var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
    //             g.selectAll(".levels")
    //             .data(allAxis)
    //             .enter()
    //             .append("svg:line")
    //             .attr("x1", (d, i) => {return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total))})
    //             .attr("y1", (d, i) => {return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total))})
    //             .attr("x2", (d, i) => {return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total))})
    //             .attr("y2", (d, i) => {return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total))})
    //             .attr("class", "line")
    //             .style("stroke", "grey")
    //             .style("stroke-opacity", "0.75")
    //             .style("stroke-width", "0.3px")
    //             .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
    //         }

    //          //Text indicating at what % each level is
    //         for(var j=0; j<cfg.levels; j++){
    //             var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
    //             g.selectAll(".levels")
    //             .data([1]) //dummy data
    //             .enter()
    //             .append("svg:text")
    //             .attr("x", (d) => levelFactor*(1-cfg.factor*Math.sin(0)))
    //             .attr("y", (d) => levelFactor*(1-cfg.factor*Math.cos(0)))
    //             .attr("class", "legend")
    //             .style("font-family", "sans-serif")
    //             .style("font-size", "10px")
    //             .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
    //             .attr("fill", "#737373")
    //             .text((j+1)*100/cfg.levels);
    //         }

    //         const axis = g.selectAll(".axis")
    //         .data(allAxis)
    //         .enter()
    //         .append("g")
    //         .attr("class", "axis");

    //         axis.append("line")
    //         .attr("x1", cfg.w/2)
    //         .attr("y1", cfg.h/2)
    //         .attr("x2", (d, i) => cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total)))
    //         .attr("y2", (d, i) => cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total)))
    //         .attr("class", "line")
    //         .style("stroke", "grey")
    //         .style("stroke-width", "1px");

    //         axis.append("text")
    //         .attr("class", "legend")
    //         .text((d) => d)
    //         .style("font-family", "sans-serif")
    //         .style("font-size", "11px")
    //         .attr("text-anchor", "middle")
    //         .attr("dy", "1.5em")
    //         .attr("transform", (d, i) => "translate(0, -10)")
    //         .attr("x", (d, i) => cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total))
    //         .attr("y", (d, i) => cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total))

    //         data.forEach((dataPoint) => {
    //             const dataValues: any[] = [];
    //             g.selectAll(".nodes")
    //             .data(dataPoint, (j: IDataPoint, i: number) => {
    //               dataValues.push([
    //               cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
    //               cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
    //               ]);
    //             });
    //             dataValues.push(dataValues[0]);
    //             g.selectAll(".area")
    //                    .data([dataValues])
    //                    .enter()
    //                    .append("polygon")
    //                    .attr("class", "radar-chart-serie"+series)
    //                    .style("stroke-width", "2px")
    //                    .style("stroke", cfg.color(series))
    //                    .attr("points",function(d) {
    //                      var str="";
    //                      for(var pti=0;pti<d.length;pti++){
    //                        str=str+d[pti][0]+","+d[pti][1]+" ";
    //                      }
    //                      return str;
    //                     })
    //                    .style("fill", function(j, i){return cfg.color(series)})
    //                    .style("fill-opacity", cfg.opacityArea)
    //                    .on('mouseover', function (d){
    //                             z = "polygon."+d3.select(this).attr("class");
    //                             g.selectAll("polygon")
    //                              .transition(200)
    //                              .style("fill-opacity", 0.1);
    //                             g.selectAll(z)
    //                              .transition(200)
    //                              .style("fill-opacity", .7);
    //                             })
    //                    .on('mouseout', function(){
    //                             g.selectAll("polygon")
    //                              .transition(200)
    //                              .style("fill-opacity", cfg.opacityArea);
    //                    });
    //             series++;
    //           })


    //         // const margin = ({ top: 20, right: 0, bottom: 30, left: 40 })
    //         // const { width, height } = this.props;

    //         // const x = scaleBand()
    //         //     .domain(data.map(d => `${d}`))
    //         //     .range([margin.left, width - margin.right])
    //         //     .padding(0.1)

    //         // const y = scaleLinear()
    //         //     .domain([0, max(data, d => d) || 0]).nice()
    //         //     .range([height - margin.bottom, margin.top])

    //         // svg.append("g")
    //         //     .attr("fill", "steelblue")
    //         //     .selectAll("rect").data(data).enter().append("rect")
    //         //     .attr("x", d => x(`${d}`) || "")
    //         //     .attr("y", d => y(d))
    //         //     .attr("height", d => y(0) - y(d))
    //         //     .attr("width", x.bandwidth())

    //         // const xAxis = (g: Selection<BaseType, {}, null, undefined>) => g
    //         //     .attr("transform", `translate(0,${height - margin.bottom})`)
    //         //     .call(axisBottom(x)
    //         //         .tickSizeOuter(0))

    //         // const yAxis = (g: Selection<BaseType, {}, null, undefined>) => g
    //         //     .attr("transform", `translate(${margin.left},0)`)
    //         //     .call(axisLeft(y))
    //         //     .call((g: Selection<BaseType, {}, null, undefined>) => g.select(".domain").remove())

    //         // svg.append("g")
    //         //     .call(xAxis);

    //         // svg.append("g")
    //         //     .call(yAxis);
    //     }

    //     public render() {
    //         const { width, height } = this.props;

    //         return (
    //             <svg width={width} height={height} ref={ref => (this.svgRef = ref)} />
    //         );
    //     }
    // }