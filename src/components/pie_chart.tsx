import * as React from 'react'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import { pie, arc, DefaultArcObject } from 'd3-shape'
import { interpolateHcl, quantize } from 'd3-interpolate'


interface IProps {
    data: number[];
    width: number;
    height: number;
}


export default class PieChart extends React.Component<IProps> {
    private svgRef?: SVGElement | null;
    constructor(props: IProps) {
        super(props)
        this.drawChart = this.drawChart.bind(this)
    }

    public componentDidMount() {
        this.drawChart(this.props.data);
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.data !== this.props.data) {
            this.drawChart(nextProps.data);
        }
    }

    private drawChart(data: number[]) {
        const svg = select(this.svgRef!);
        const { width, height } = this.props;
        const pieFunc = pie()
            .sort(null)
            .value((d: number) => d)
        const arcFunc: any = arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1)
        const radius = Math.min(width, height) / 2 * 0.8
        const arcLabel = arc().innerRadius(radius).outerRadius(radius)

        const arcs = pieFunc(data)

        const colorScale: any = scaleOrdinal()
            .domain(data.map(d => `${d}`))
            .range(quantize(t => interpolateHcl('#d73027', '#1a9850'), data.length).reverse())("")

        const getColor: any = (d: { readonly value: number }) => colorScale(d.value)


        const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)

        g.selectAll("path")
            .data(arcs)
            .enter().append("path")
            .attr("fill", getColor)
            .attr("stroke", "white")
            .attr("d", arcFunc)
            .append("title")
            .text(d => `${d}`)

        const text = g.selectAll("text")
            .data(arcs)
            .enter().append("text")
            .attr("transform", (d) => {
                const arcProps:  DefaultArcObject = {...d, innerRadius: 0, outerRadius: 0}
                return `translate(${arcLabel.centroid(arcProps)})`})
            .attr("dy", "0.35em");

        text.append("tspan")
            .attr("x", 0)
            .attr("y", "-0.7em")
            .style("font-weight", "bold")
            .text(d => `${d.value}`);

        // text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        //     .attr("x", 0)
        //     .attr("y", "0.7em")
        //     .attr("fill-opacity", 0.7)
        //     .text(d => `${d.value}`);

    }

    public render() {
        const { width, height } = this.props;

        return (
            <svg width={width} height={height} ref={ref => (this.svgRef = ref)} />
        );
    }
}