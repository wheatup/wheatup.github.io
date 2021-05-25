import { useEffect } from "react";
import { setData, useData } from "wherehouse";
import http from "../../../../../utils/http"
import { RegexDictionary } from "../../../../../utils/store";

export const useWords = () => {
	const words = useData(RegexDictionary.WORDS);
	useEffect(() => {
		if(words.length) return;
		http.get('/data/lab/words.txt').then(e => {
			setData(RegexDictionary.WORDS, e.data.split(/\n/));
		});
	}, [words])
	return words;
}