import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './scss/style.scss';
import { setup as initStore } from './utils/store';
import { init as initI18n } from 'whi18n';
import http from "./utils/http";

(async () => {
	initStore();
	await initI18n(window.localStorage.getItem('lang') || 'zh-CN', async lang => (await http.get(`/i18n/${lang}.json`)).data);

	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	);
	serviceWorker.unregister();
})();



