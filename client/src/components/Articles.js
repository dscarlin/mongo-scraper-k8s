import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Container, Button } from 'reactstrap';
import Note from './Note.js'
import style from './Articles.module.css';
export default class Articles extends Component {
    state = {
      modalOpen: false,
      modalDataIndex: 0
    };
    toggleModal = () => {
      this.setState(prevState => ({
        modalOpen: !prevState.modalOpen
      }));
    }
    componentDidMount() {
      console.log(this.props)
      this.props.getDataFromDB(this.props.location.pathname);
    }
    render(data = this.props.data) {
        return(
           <Container className="tpBg">
            {data.length < 1
              ? 
              <Row >
               
                <Col className={ style.noArticle } xs={{ size: 10, offset: 1}} md={{ size: 8, offset: 2}} lg={{ size: 6, offset: 3}}>
                  {this.props.location.pathname === '/saved' 
                  ?
                  <div>
                    <h4>It appears we do not have any articles saved.</h4>
                    <h5>Would you like to do?</h5>
                    <Link to="/"><h5>Browse Articles</h5></Link>
                  </div>
                  :
                  <div>
                    <h4>It appears there are no articles to browse.</h4>
                    <h5>What would you like to do?</h5>
                    <Link onClick={ this.props.scrapeDB }><h5 >Try scraping articles</h5></Link>
                    <Link to="/saved"><h5>Go to saved articles</h5></Link>
                  </div>
                  }
                </Col>
                
              </Row> 
              : data.map((dat, i) => (
                    <Row className={style.article} key={dat._id}>
                        <Col md="2">
                          <img className={style.articleImage} src={dat.image} alt="Article" />
                        </Col>
                        <Col md="8 ">
                          {dat.category}
                          <a href={dat.link} target="_blank" rel="noopener noreferrer"><h5 >{dat.title}</h5></a>
                          <a href={dat.link} target="_blank" rel="noopener noreferrer">{dat.caption}</a>

                          {dat.author ? (
                          <div >
                            by:
                            <a href={dat.authorLink} target="_blank" rel="noopener noreferrer"> {dat.author}</a>
                          </div>) : (<div></div>)} 
                        </Col>
                        <Col md="2">
                          {dat.saved ? 
                          <div>
                            <Button onClick={() => this.props.removeArticle(dat._id)}>
                              Remove
                            </Button>
                            <Button onClick={() => this.setState({modalOpen: true, modalDataIndex: i})}>
                              Notes
                            </Button>
                          </div>
                          :
                          <Button onClick={() => this.props.saveArticle(dat._id)}>
                            Save
                          </Button>
                          }
                        </Col>
                    </Row> 
                ))}
                <Note
                addNote={ this.props.addNote }
                removeNote={ this.props.removeNote }
                data={ data[this.state.modalDataIndex] || {notes: []} }
                toggle = {this.toggleModal}
                isOpen={this.state.modalOpen}
                />
          </Container>
        )  
    }
}