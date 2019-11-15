import * as React from "react"
import { select, Selection, BaseType } from "d3-selection"
import { scaleBand, scaleLinear, ScaleBand, ScaleLinear } from "d3-scale"
import { axisBottom, axisLeft } from "d3-axis"
import { max } from "d3-array"
import { line, Line } from "d3-shape"

interface LineChartProps {
    data: number[]
    width: number
    height: number
}

export default class LineChart extends React.Component<LineChartProps> {
    private svgRef?: SVGElement | null
    constructor(props: LineChartProps) {
        super(props)
        this.drawChart = this.drawChart.bind(this)
    }

    public componentDidMount() {
        this.drawChart(this.props.data)
    }

    public componentWillReceiveProps(nextProps: LineChartProps) {
        if (nextProps.data !== this.props.data) {
            this.drawChart(nextProps.data)
        }
    }

    private drawChart(data: number[]) {
        const svg = select(this.svgRef!)
        const margin = { top: 20, right: 0, bottom: 30, left: 40 }
        const { width, height } = this.props

        const x: ScaleBand<string> = scaleBand()
            .domain(data.map(d => `${d}`))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y: ScaleLinear<number, number> = scaleLinear()
            .domain([0, max(data, d => d) || 0])
            .nice()
            .range([height - margin.bottom, margin.top])

        const lineCalc: Line<number> = line<number>()
            .defined(d => !isNaN(d))
            .x((d: any) => x(`${d}`) || 0)
            .y((d: any) => y(d))

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", lineCalc)

        const xAxis = (
            g: Selection<BaseType, {}, null, undefined>,
        ): Selection<BaseType, {}, null, undefined> =>
            g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(axisBottom(x).tickSizeOuter(0))

        const yAxis = (
            g: Selection<BaseType, {}, null, undefined>,
        ): Selection<BaseType, {}, null, undefined> =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .call(axisLeft(y))
                .call((g: Selection<BaseType, {}, null, undefined>) =>
                    g.select(".domain").remove(),
                )

        svg.append("g").call(xAxis)

        svg.append("g").call(yAxis)
    }

    public render() {
        const { width, height } = this.props

        return (
            <svg
                width={width}
                height={height}
                ref={ref => (this.svgRef = ref)}
            />
        )
    }
}
