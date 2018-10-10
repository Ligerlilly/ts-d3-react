import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import BarChart from "./components/bar_chart"
import LineChart from "./components/line_chart"

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
      </div>
    );
  }
}

export default App;
