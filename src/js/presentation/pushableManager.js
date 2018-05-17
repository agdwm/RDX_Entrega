const $ = require('jquery');

export default class PushableManager {
	
	constructor () {
		this.btnMenu = $('#btn-menu');
		this.mq = window.matchMedia('(min-width: 768px)');
		this.navigation = $('#navigation');
		this.pushableContent = $('#pushable-content');
	}

	init () {
		this.setupClickEventHandler();
		this.setupMatchEventHandler();
	}

	setupClickEventHandler() {
		this.btnMenu.on('click', (e) => {
			this.switchButton($(e.currentTarget));
			this.switchNavigation();
			this.switchPushableContent();
			return false;
		});
	}

	switchButton(btn) {
		btn.toggleClass('active');
	}
	switchNavigation(){
		this.navigation.toggleClass('active');
	}
	switchPushableContent(){
		this.pushableContent.toggleClass('active');
	}

	// https://www.sitepoint.com/javascript-media-queries/
	setupMatchEventHandler() {
		if(matchMedia) {
			this.mq.addListener(this.toggleState);
			this.toggleState(this.mq);
		}
	}

	toggleState(mq) {
		if (mq.matches) {
			$('.footer').css({'background-color': 'red'});
		}else{
			$('.footer').css({'background-color': 'green'});
		}
		console.log("CLICK");
	}
}