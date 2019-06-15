import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router 
} from 'react-router-dom'
import axios from 'axios';
import AppNavbar from './components/AppNavbar.js';
import Articles from './components/Articles.js';
import Banner from './components/Banner.js'
import style from './App.module.css'
import scrollToComponent from 'react-scroll-to-component'
class App extends Component {
  state = {
    data: [],
  };
  componentDidMount(){
   
  };
  componentWillUnmount(){};
  scrapeDB = () => {
    axios.get('/api/scrape').then(res => {
      console.log(res);
      this.getDataFromDB();
    });
  };
  getDataFromDB = (param) => {
    param = param === '/saved' || false 
    console.log(`get url: /api/getData/${param}`)
    axios.get(`/api/getData/${param}`)
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data});
      });
  };
  saveArticle = (_id) => {
    axios.put('/api/saveArticle',{ _id }).then(res => {
      console.log(res);
      this.getDataFromDB();
    });
  };
  clearArticles = () => {
    axios.delete('/api/clearArticles').then(res => {
      console.log(res);
      this.getDataFromDB();
    });
  };
  removeArticle = (_id) => {
    axios.put('/api/removeArticle',{ _id }).then(res => {
      console.log(res)
      this.getDataFromDB('/saved')
    });
  }
  addNote = (note) => {
    axios.put('api/addNote',note).then(res => {
      console.log(res)
      this.getDataFromDB('/saved')
    })
  }
  removeNote = (articleIdAndNoteId) => {
    console.log('remove note: ',articleIdAndNoteId)
    axios.put('api/removeNote', articleIdAndNoteId).then(res => {
      console.log(res)
      this.getDataFromDB('/saved')
    })
  }
  goToArticles = () => {
    scrollToComponent(this.Articles,{offset: -70, align: 'top', duration: 1000})
  }
  render(){
    return (
      <Router>
      <div className={style.app}>
        <AppNavbar
          clearArticles={ this.clearArticles }
          scrapeDB={ this.scrapeDB }
          getDataFromDB={ this.getDataFromDB }
        />
        <Banner 
          goTo={ this.goToArticles }  
        />
       
        <Route 
          exact path="/" 
          render={props => 
            <Articles 
            ref={ a => this.Articles = a }  
            data={ this.state.data }
            scrapeDB={ this.scrapeDB }
            saveArticle={ this.saveArticle }
            getDataFromDB={ this.getDataFromDB }
            {...props}
            />
          }
        />
        <Route 
          exact path="/saved" 
          render={props => 
            <Articles 
            ref={ a => this.Articles = a}  
            data={this.state.data}
            addNote={ this.addNote }
            removeNote={ this.removeNote }
            removeArticle={ this.removeArticle}
            saveArticle={this.saveArticle}
            getDataFromDB={ this.getDataFromDB }
            {...props}
            />
          }
        />
       
      </div>
      </Router>
    );
  };
};

export default App;
