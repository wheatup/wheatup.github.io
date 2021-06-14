import { useEffect, useState } from "react";
import { get } from '../../../../../utils/http';

let cache = [];

export const useDictionary = () => {
	const [dictionary, setDictionary] = useState(cache);

	useEffect(() => {
		if (!dictionary.length) {
			get('/data/idiom.min.json').then(({ data }) => {
				setDictionary(data);
			});
		}
	}, [dictionary]);
	

	return dictionary;
}