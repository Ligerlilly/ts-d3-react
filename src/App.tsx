import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import BarChart from "./components/bar_chart"
import LineChart from "./components/line_chart"
import PieChart from "./components/pie_chart"
import ScatterChart from "./components/scatter_chart"
import DountChart from "./components/donut_chart"

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <BarChart data={[1, 2, 3, 4, 5]} height={500} width={500} />
        <LineChart data={[1, 2, 3, 4, 5]} height={500} width={500} />
        <PieChart data={[1, 2, 3, 4, 5]} height={500} width={500} />
        <ScatterChart
          data={[
            {x: .5, y: .5},
            {x: 1, y: 1},
            {x: 1.5, y: 1.5},
            {x: 2, y: 2},
            {x: 2.5, y: 2.5},
          ]}
          height={500}
          width={500}
        />
        <DountChart data={[1, 2, 3, 4, 5]} height={500} width={500} />
      </div>
    );
  }
}

export default App;
