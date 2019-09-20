import React, { Component } from 'react'
import './MobileNav.scss'

class MobileNav extends Component {
  state = { sideBarActive: false }

  toggleSideBar = () => {
    this.props.handleSideBarActive()
    this.setState({
      sideBarActive: !this.state.sideBarActive,
    })
  }

  render() {
    const { sideBarActive } = this.state
    const { handleSideNav } = this.props
    return (
      <div className="mobile-nav-component" id="header">
        <nav>
          <div className="name">
            <h3>Color Constructor</h3>
          </div>
          <div className="hamburger" onClick={() => this.toggleSideBar()}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <ul className={sideBarActive ? 'open nav-links' : 'nav-links'}>
            <li
              className={sideBarActive ? 'fade' : null}
              onClick={() => this.toggleSideBar()}
            >
              <a href="#" onClick={() => handleSideNav(true, false, false)}>
                Create New Project
              </a>
            </li>
            <li
              className={sideBarActive ? 'fade' : null}
              onClick={() => this.toggleSideBar()}
            >
              <a href="#" onClick={() => handleSideNav(false, true, false)}>
                Create New Palette
              </a>
            </li>
            <li
              className={sideBarActive ? 'fade' : null}
              onClick={() => this.toggleSideBar()}
            >
              <a href="#" onClick={() => handleSideNav(false, false, true)}>
                Edit Existing Project
              </a>
            </li>
            <li
              className={sideBarActive ? 'fade' : null}
              onClick={() => this.toggleSideBar()}
            >
              <a href="#projects">View Saved Projects</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default MobileNav
