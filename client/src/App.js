import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav.js';

class App extends Component {
  state = {
    data: []
  };
  componentDidMount(){
   this.getDataFromDB();
  };
  componentWillUnmount(){};
  scrapeDB = () => {
    axios.get('http://localhost:3001/api/scrape').then(res => {
      console.log(res);
      this.getDataFromDB();
    });
  };
  getDataFromDB = () => {
    axios.get('http://localhost:3001/api/getData')
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data.data });
      });
  };
  render(){
    const data = this.state.data;
    return (
      <div className="app">
        <div className="nav">
          <Nav />
        </div>
        <ul>
        {data.length < 1
          ? 'NO DB ENTRIES YET'
          : data.map((dat) => (
              <li style={{ padding: '10px' }} key={dat._id}>
                <span style={{ color: 'gray' }}> id: </span> {dat._id} <br />
                <span style={{ color: 'gray' }}> data: </span>
                {dat.title}
              </li>
            ))}
        </ul>
        <div style={{ padding: '10px' }}>
          
          <button onClick={this.scrapeDB}>
            Scrape
          </button>
        </div>
      </div>
    );
  };
};

export default App;
