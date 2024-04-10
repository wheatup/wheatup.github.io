import React, { useState } from 'react';
import EmojiSpin from './games/emojiSpin/EmojiSpin';
import { Route, Routes } from 'react-router';
import { NavLink } from 'react-router-dom';
import $$ from 'whi18n';

const Games = props => {
	return (
		<section className="Games">
			<div className="games">
				<div className="game-navs">
					<NavLink to="/games/emoji-spin">{$$`_games.emoji-spin`}</NavLink>
				</div>
			</div>
			<div className="game">
				<Routes>
					<Route path="/games/emoji-spin" component={EmojiSpin} />
				</Routes>
			</div>
		</section>
	);
};

export default Games;
