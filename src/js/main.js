window.$ = window.jQuery = require('jquery');

import PushableManager from './presentation/pushableManager';

const pushableManager = new PushableManager();
pushableManager.init();