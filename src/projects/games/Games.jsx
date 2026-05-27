import React from 'react';
import EmojiSpin from './games/emojiSpin/EmojiSpin';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import $ from 'whi18n';

const Games = () => {
	return (
		<section className="Games">
			<div className="games">
				<div className="game-navs">
					<NavLink to="/games/emoji-spin">{$`_games.emoji-spin`}</NavLink>
				</div>
			</div>
			<div className="game">
				<Routes>
					<Route index element={<Navigate to="emoji-spin" replace />} />
					<Route path="emoji-spin" element={<EmojiSpin />} />
				</Routes>
			</div>
		</section>
	);
};

export default Games;
