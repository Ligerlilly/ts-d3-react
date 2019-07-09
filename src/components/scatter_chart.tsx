import * as React from 'react'
import { select, Selection, BaseType } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { max } from 'd3-array'

interface IProps {
    data: IPoint[];
    width: number;
    height: number;
}

interface IPoint {
    readonly x: number
    readonly y: number
}


export default class ScatterChart extends React.Component<IProps> {
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

    private drawChart(data: IPoint[]) {
        const svg = select(this.svgRef!);
        const margin = ({ top: 20, right: 0, bottom: 30, left: 40 })
        const { width, height } = this.props;

        const x = scaleLinear()
            .domain([0, max(data, d => d.y) || 0]).nice()
            .range([margin.left, width - margin.right])

        const y = scaleLinear()
            .domain([0, max(data, d => d.y) || 0]).nice()
            .range([height - margin.bottom, margin.top])

        svg.append("g")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "steelblue")
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 4);

        const xAxis = (g: Selection<BaseType, {}, null, undefined>) => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(axisBottom(x)
                .tickSizeOuter(0))

        const yAxis = (g: Selection<BaseType, {}, null, undefined>) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(axisLeft(y))
            .call((g: Selection<BaseType, {}, null, undefined>) => g.select(".domain").remove())

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis)
    }

    public render() {
        const { width, height } = this.props;

        return (
            <svg width={width} height={height} ref={ref => (this.svgRef = ref)} />
        );
    }
}