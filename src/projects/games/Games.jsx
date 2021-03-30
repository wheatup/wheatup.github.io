import React, { useState } from 'react';
import EmojiSpin from './games/emojiSpin/EmojiSpin';
import { Redirect, Route, Switch } from 'react-router';
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
				<Switch>
					<Route path="/games/emoji-spin" component={EmojiSpin} />
					<Redirect to="/games/emoji-spin" />
				</Switch>
			</div>
		</section>
	);
};

export default Games;
