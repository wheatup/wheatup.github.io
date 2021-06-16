import React, { useEffect, useState } from 'react';
import { init } from 'whi18n';
import { setData, useData } from 'wherehouse';
import http from '../utils/http';
import { LANG } from '../utils/store';

const GlobalRouteHandler = ({ location }) => {
	const lang = useData(LANG);
	useEffect(() => {
		(async () => {
			const search = new URLSearchParams(location.search);
			let newLang = search.get('lang');

			if (newLang && newLang !== lang) {
				setData(LANG, newLang);
				await init(newLang, async lang => (await http.get(`/i18n/${newLang}.json`)).data);
				window.location.reload();
			}
		})();
	}, [location, lang]);

	return null;
};

export default GlobalRouteHandler;
