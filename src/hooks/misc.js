import { useEffect, useCallback } from 'react';

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