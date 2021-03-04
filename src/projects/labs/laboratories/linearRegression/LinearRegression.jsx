import React, { useState } from 'react';
import Button from '../../../../components/common/Button';
import { useAsync } from '../../../../hooks/misc';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const LinearRegression = props => {
	return (
		<section className="lab-view LinearRegression">
			<div className="title-area">
				<h1>Linear Regression with TensorFlow.js</h1>
				<h2>Train a model to predict house price from living space.</h2>
			</div>
			<div className="operations">
				<Button>Toggle Visor</Button>
			</div>
			<div className="columns">
				<div className="column">
					<div className="legend">
						<i className="icon-wrench"></i>
						<h2>Train & Test</h2>
					</div>
					<div className="data-set">
						<h3>Training status</h3>
						<output>Loading Data...</output>
					</div>
					<div className="data-set">
						<h3>Testing status</h3>
						<output>Not yet tested</output>
					</div>
					<div className="buttons">
						<Button>Train New Model</Button>
						<Button>Test Model</Button>
						<Button>Load Model</Button>
						<Button>Save Model</Button>
					</div>
				</div>
				<div className="column">
					<div className="legend">
						<i className="icon-stats-dots"></i>
						<h2>Predict</h2>
					</div>
					<div className="data-set">
						<h3>Square feet of living space:</h3>
						<input />
					</div>
					<div className="buttons">
						<Button>Predict House Price</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LinearRegression;
