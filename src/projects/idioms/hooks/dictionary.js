import { useEffect, useState } from "react";
import { get } from '../../../utils/http';

let cache = [];

export const useDictionary = () => {
	const [dictionary, setDictionary] = useState(cache);

	useEffect(() => {
		if (!dictionary.length) {
			get('/data/idiom.json').then(({ data }) => {
				setDictionary(data);
				console.log(data);
			});
		}
	}, [dictionary]);
	

	return dictionary;
}