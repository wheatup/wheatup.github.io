import React, { useCallback, useState } from 'react';
import { setData, useData } from 'wherehouse';
import { LANG } from '../utils/store';
import whi18n, { init } from 'whi18n';
import http from '../utils/http';

const LanguageSwitcher = props => {
	const lang = useData(LANG);

	const switchLanguage = useCallback(async () => {
		const target = lang === 'en-US' ? 'zh-CN' : 'en-US';
		setData(LANG, target);
		await init(target, async lang => (await http.get(`/i18n/${lang}.json`)).data);
		window.location.reload();
	}, [lang]);

	return (
		<a className="LanguageSwitcher" href="javascript: void(0)" title={whi18n`switch-language`} onClick={switchLanguage}>
			<img src={`/images/i18n/${lang}.svg`} alt={whi18n`switch-language`} />
		</a>
	);
};

export default LanguageSwitcher;
