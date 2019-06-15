import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import style from './Banner.module.css'
class Banner extends Component {
    render() {
      return(
        <div className={style.banner}>
          <div className={style.caption}>
            { this.props.location.pathname === '/saved' ? 
            <div>
              <h1 className={style.bannerTitle}>Saved Articles</h1> 
              <h2><strong>Your Saved Articles</strong></h2>
            </div>
            :
            <div>
              <h1 className={style.bannerTitle}>Mongo Scraper</h1> 
              <h2><strong>Huffington Post Edition</strong></h2>
            </div>
            }
          </div>
          <div onClick={ this.props.goTo } className={style.footer}>
            <div className={style.indicator}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
  )
    }
}
export default withRouter(Banner)
