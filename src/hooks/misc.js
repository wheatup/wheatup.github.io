import { useEffect, useCallback, useState } from 'react';

export const useMaxHeight = () => {
	const onHeightChange = useCallback(() => {
		document.body.style.maxHeight = window.innerHeight + 'px';
	}, []);

	useEffect(() => {
		window.addEventListener('resize', onHeightChange);

		onHeightChange();
	}, [onHeightChange]);
}

export const useTitle = title => {
	useEffect(() => {
		document.title = title;
	}, [title]);
}

export const useAsync = (fn, deps = []) => {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		fn().then(() => setReady(true));
	}, deps);

	return ready;
}