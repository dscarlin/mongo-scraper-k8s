

               
                // {/* <ul>
                //     <li><Link to="/">Home</Link></li>
                //     <li><Link to="/save">Saved Articles</Link></li>
                //     <li><button class="">SCRAPE NEW ARTICLES</button></li>
                //     <li><button>CLEAR ARTICLES</button></li>
                // </ul> */}
         
import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavItem,
  Button,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem 
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import style from './Nav.module.css';
class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  componentDidMount(){
    console.log(this.props)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className={style.bg}light expand="md">
          <NavLink to="/" exact={true} activeClassName="active" tag={RRNavLink} className={style.brand} >Mongo Scraper</NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
              <NavLink to="/" exact={true} activeClassName="active" tag={RRNavLink}>Home</NavLink> 
              </NavItem>
              <NavItem>
              <NavLink to="/saved" exact={true} activeClassName="active" tag={RRNavLink}>Saved Articles</NavLink> 
              </NavItem>
              {this.props.location.pathname !== '/saved' ? 
              <NavItem>
                <Button color="primary" onClick={this.props.scrapeDB} className={style.ripple}>Scrape New Articles</Button>
              </NavItem>
              :
              <div></div>
              }
              <NavItem><NavLink></NavLink></NavItem>
              <NavItem>
                <Button color="primary" onClick={this.props.clearArticles} className={style.ripple}>Clear Articles</Button>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(AppNavbar);