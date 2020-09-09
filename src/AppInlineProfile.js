import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import './AppInlineProfile.css';

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
            username: ''
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    async getUserInfo() {
        const userInfo = await Auth.currentUserInfo();
        console.log('userInfo', userInfo)
        this.setState({username: userInfo.username });
    }

    async signOut() {
        await Auth.signOut();
        window.location.href = "/";
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return  <div>
                    <div className={classNames('profile', {'profile-expanded': this.state.expanded})}>
                        <button className="p-link" onClick={this.onClick}>
                            <img alt="Profile" className="profile-image" src="assets/layout/images/me.png" />
                            <span className="profile-name">Matt Webb</span>
                            <i className="fa fa-fw fa-caret-down"></i>
                            <span className="profile-role">Idle Knights</span>
                        </button>
                    </div>
                    
                    <ul className="layout-menu profile-menu">
                        <li role="menuitem">
                            <Link className="p-link" to="/profile">
                                <i className="fa fa-fw fa-user"></i>
                                <span>Profile</span>
                            </Link>
                            <div className="layout-menu-tooltip">
                                <div className="layout-menu-tooltip-arrow"></div>
                                <div className="layout-menu-tooltip-text">Profile</div>
                            </div>
                        </li>
                        <li role="menuitem">
                            <button className="p-link"  tabIndex={this.state.expanded ? null : '-1'}>
                                <i className="fa fa-fw fa-cog"></i>
                                <span>Settings</span>
                            </button>
                            <div className="layout-menu-tooltip">
                                <div className="layout-menu-tooltip-arrow"></div>
                                <div className="layout-menu-tooltip-text">Settings</div>
                            </div>
                        </li>
                        <li role="menuitem">
                            <button className="p-link"  onClick={() => this.signOut()}>
                                <i className="fa fa-fw fa-sign-out"></i>
                                <span>Logout</span>
                            </button>
                            <div className="layout-menu-tooltip">
                                <div className="layout-menu-tooltip-arrow"></div>
                                <div className="layout-menu-tooltip-text">Logout</div>
                            </div>
                        </li>
                    </ul>
                </div>
    }
}