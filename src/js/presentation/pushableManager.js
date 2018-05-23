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
		this.setupClickEventHandler();
		this.setupMatchEventHandler();
	}

	setupClickEventHandler() {
		this.btnMenu.on('click', (e) => {
			this.switchButton(this.btnMenu);
			this.switchHeaderContent();
			this.switchPushableContent();
			return false;
		});

		this.logo.on('click', (e) => {
			this.switchButton(this.btnMenu);
			this.switchHeaderContent();
			this.switchPushableContent();
			return false;
		})
	}

	setupMatchEventHandler() {
		if (matchMedia) {
			this.mq.addListener(this.toggleState);
			this.toggleState(this.mq);
		}
	}

	switchButton(btn) {
		btn.toggleClass('active');
	}
	switchHeaderContent(){
		this.headerContent.toggleClass('active');
	}
	switchPushableContent(){
		this.pushableContent.toggleClass('active');
	}

	// https://www.sitepoint.com/javascript-media-queries/
	toggleState(mq) {
		if (mq.matches) {
			$('.footer').css({'background-color': 'red'});
		}else{
			$('.footer').css({'background-color': 'green'});
		}
		console.log("CLICK");
	}
}