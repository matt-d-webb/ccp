import React, { Component } from 'react';
import { withAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppInlineProfile } from './AppInlineProfile';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Help } from './pages/Help';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/primereact.min.css';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			layoutMode: 'static',
			profileMode: 'inline',
			layoutCompact: true,
			overlayMenuActive: false,
			staticMenuDesktopInactive: false,
			staticMenuMobileActive: false,
			rotateMenuButton: false,
			topbarMenuActive: false,
			activeTopbarItem: null,
			darkMenu: true,
			menuActive: false,
			theme: 'blue',
			layout: 'blue',
			version: 'v4',
			configDialogActive: false
		};


        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
		this.changeMenuMode = this.changeMenuMode.bind(this);
		this.changeMenuColor = this.changeMenuColor.bind(this);
		this.changeProfileMode = this.changeProfileMode.bind(this);
		this.changeLayout = this.changeLayout.bind(this);
		this.onConfigCloseClick = this.onConfigCloseClick.bind(this);
        this.createMenu();
	}

	onMenuClick(event) {
		this.menuClick = true;
	}

	onMenuButtonClick(event) {
		this.menuClick = true;
		this.setState(({
			rotateMenuButton: !this.state.rotateMenuButton,
			topbarMenuActive: false
		}));

		if (this.state.layoutMode === 'overlay') {
			this.setState({
				overlayMenuActive: !this.state.overlayMenuActive
			});
		}
		else {
			if (this.isDesktop())
				this.setState({ staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive });
			else
				this.setState({ staticMenuMobileActive: !this.state.staticMenuMobileActive });
		}

		event.preventDefault();
	}

	onTopbarMenuButtonClick(event) {
		this.topbarItemClick = true;
		this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
		this.hideOverlayMenu();
		event.preventDefault();
	}

	onTopbarItemClick(event) {
		this.topbarItemClick = true;

		if (this.state.activeTopbarItem === event.item)
			this.setState({ activeTopbarItem: null });
		else
			this.setState({ activeTopbarItem: event.item });

		event.originalEvent.preventDefault();
	}

	onMenuItemClick(event) {
		if (!event.item.items) {
			this.hideOverlayMenu();
		}
		if (!event.item.items && this.isHorizontal()) {
			this.setState({
				menuActive: false
			})
		}
	}

	onRootMenuItemClick(event) {
		this.setState({
			menuActive: !this.state.menuActive
		});
	}

	onConfigCloseClick() {
		this.setState({ configDialogActive: false })
	}

	onDocumentClick(event) {
		if (!this.topbarItemClick) {
			this.setState({
				activeTopbarItem: null,
				topbarMenuActive: false
			});
		}

		if (!this.menuClick) {
			if (this.isHorizontal() || this.isSlim()) {
				this.setState({
					menuActive: false
				})
			}

			this.hideOverlayMenu();
		}

		if (!this.configClick) {
			this.setState({ configDialogActive: false });
		}

		if (!this.rightPanelClick) {
			this.setState({
				rightPanelActive: false
			})
		}

		this.topbarItemClick = false;
		this.menuClick = false;
		this.configClick = false;
		this.rightPanelClick = false;
	}

	hideOverlayMenu() {
		this.setState({
			rotateMenuButton: false,
			overlayMenuActive: false,
			staticMenuMobileActive: false
		})
	}

	isTablet() {
		let width = window.innerWidth;
		return width <= 1024 && width > 640;
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	isMobile() {
		return window.innerWidth <= 640;
	}

	isOverlay() {
		return this.state.layoutMode === 'overlay';
	}

	isHorizontal() {
		return this.state.layoutMode === 'horizontal';
	}

	isSlim() {
		return this.state.layoutMode === 'slim';
	}

	changeMenuMode(event) {
		this.setState({ layoutMode: event.layoutMode })
		if (event.layoutMode === 'horizontal') {
			this.setState({ profileMode: 'top' })
		}
	}

	changeMenuColor(event) {
		this.setState({ darkMenu: event.darkMenu })
	}

	changeProfileMode(event) {
		this.setState({ profileMode: event.profileMode })
	}

	changeLayout(event) {
		this.setState({ layout: event.layout });
		if (this.state.version === 'v3') {
			this.changeStyleSheetUrl('layout-css', event.layout, 'layout');
		} else {
			this.changeStyleSheetUrl('layout-css', event.layout + '-v4', 'layout');
		}

		if (event.special) {
			this.setState({
				darkMenu: true
			})
		}
	}

	changeStyleSheetUrl(id, value, prefix) {
		let element = document.getElementById(id);
		let urlTokens = element.getAttribute('href').split('/');
		urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
		let newURL = urlTokens.join('/');

		this.replaceLink(element, newURL);
	}

	isIE() {
		return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
	}

	replaceLink(linkElement, href) {
		if (this.isIE()) {
			linkElement.setAttribute('href', href);
		}
		else {
			const id = linkElement.getAttribute('id');
			const cloneLinkElement = linkElement.cloneNode(true);

			cloneLinkElement.setAttribute('href', href);
			cloneLinkElement.setAttribute('id', id + '-clone');

			linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

			cloneLinkElement.addEventListener('load', () => {
				linkElement.remove();
				cloneLinkElement.setAttribute('id', id);
			});
		}
	}

	createMenu() {
		this.menu = [
			{
				label: 'Home', icon: 'fa fa-fw fa-home', to: '/'
			},
			{
				label: 'Events', icon: 'fa fa-fw fa-calendar-check-o', to: '/events'
			},
			{
				label: 'Results', icon: 'fa fa-fw fa-trophy', 
				items: [
					{label: 'Leagues', icon: 'fa fa-fw fa-globe',  command: () => this.setState({layoutMode: 'leagues'}) },
					{label: 'Clubs', icon: 'fa fa-fw fa-table',  command: () => this.setState({layoutMode: 'clubs'}) },
					{label: 'Teams', icon: 'fa fa-fw fa-bars',  command: () => this.setState({layoutMode: 'teams'}) },
					{label: 'Players', icon: 'fa fa-fw fa-users',  command: () => this.setState({layoutMode: 'players'}) },
				]
			},
			{
				label: 'Help', icon: 'fa fa-fw fa-question-circle', to: '/help'
			}
		];
	}

	render() {
		let layoutClassName = classNames('layout-wrapper', {
			'menu-layout-static': this.state.layoutMode !== 'overlay',
			'menu-layout-overlay': this.state.layoutMode === 'overlay',
			'layout-menu-overlay-active': this.state.overlayMenuActive,
			'menu-layout-slim': this.state.layoutMode === 'slim',
			'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
			'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
			'layout-menu-static-active': this.state.staticMenuMobileActive
		});
		let menuClassName = classNames('layout-menu-container', { 'layout-menu-dark': this.state.darkMenu });

		return (
			<div className={layoutClassName} onClick={this.onDocumentClick}>
				<div>
					<AppTopbar profileMode={this.state.profileMode} horizontal={this.isHorizontal()}
						topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
						onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
						onTopbarItemClick={this.onTopbarItemClick} />

					<div className={menuClassName} onClick={this.onMenuClick}>
						<div className="menu-scroll-content">
							{(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
							<AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
								layoutMode={this.state.layoutMode} active={this.state.menuActive} />
						</div>
					</div>

					<div className="layout-main">
						<Route path="/" exact component={Dashboard} />
						<Route path="/help" component={Help} />
						<Route path="/profile" component={Profile} />
					</div>

					<div className="layout-mask"></div>
					<AppFooter />
				</div>
			</div>
		);
	}
}

export default withAuthenticator(App);
