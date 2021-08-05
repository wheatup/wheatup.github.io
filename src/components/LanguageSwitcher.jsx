import React, { useCallback, useState } from 'react';
import { setData, useData } from 'wherehouse';
import { LANG, LANGUAGES } from '../utils/store';
import whi18n, { init } from 'whi18n';
import http from '../utils/http';

const LanguageSwitcher = () => {
	const lang = useData(LANG);
	const languages = useData(LANGUAGES);

	const switchLanguage = useCallback(async () => {
		const target = languages[(languages.indexOf(lang) + 1) % languages.length];
		console.log(languages, target);
		await init(target, async lang => (await http.get(`/i18n/${lang}.json`)).data);
		window.location.reload();
	}, [lang, languages]);

	return (
		<a className="LanguageSwitcher" href="javascript: void(0)" title={whi18n`switch-language`} onClick={switchLanguage}>
			<img src={`/images/i18n/${lang}.${lang === 'ja-JP' ? 'png' : 'svg'}`} alt={whi18n`switch-language`} />
		</a>
	);
};

export default LanguageSwitcher;
