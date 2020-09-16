import { useState, useEffect } from "react"

export const useInterval = (fn, ms, stop) => {
	const [update, setUpdate] = useState(0);

	useEffect(() => {
		if (stop && stop()) return;
		if (update !== 0) {
			fn();
		}
		setTimeout(() => setUpdate(i => i + 1), typeof ms === 'function' ? ms() : ms);
	}, [update]);

}