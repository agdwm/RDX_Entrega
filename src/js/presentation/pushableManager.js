"use strict";

const $ = require('jquery');

export default class PushableManager {
	
	constructor () {
		this.btnMenu = $('#btn-menu');
		this.mq = window.matchMedia('(min-width: 768px)');
		this.headerContent = $('#header-content');
		this.pushableContent = $('#pushable-content');
		this.logo = $('#logo');
	}

	init () {
		self = this;
		this.setupClickEventHandler();
		this.setupMatchEventHandler();
	}

	setupClickEventHandler() {
		// On click in "logo" or in "btnMenu", trigger the following functions
		this.logo.add(this.btnMenu).on('click', (e) => {
			if (!this.mq.matches) {
				this.switchButton();
				this.switchHeaderContent();
				this.switchPushableContent();
				return false;
			}
		});
	}

	setupMatchEventHandler() {
		if (matchMedia) {
			this.mq.addListener(this.closeSideMenu);
			this.closeSideMenu(this.mq);
		}
	}

	closeSideMenu (mq) {
		// if window width is at least 768px
		if (mq.matches) {
			self.btnMenu.removeClass('active');
			self.headerContent.removeClass('active');
			self.pushableContent.removeClass('active');
			return false;
		}
	}

	switchButton() {
		this.btnMenu.toggleClass('active');
	}
	switchHeaderContent(){
		this.headerContent.toggleClass('active');
	}
	switchPushableContent(){
		this.pushableContent.toggleClass('active');
	}
}