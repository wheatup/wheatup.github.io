import React, { useState, useCallback } from 'react';
import Button from '../../../../components/common/Button';
import { useAsync } from '../../../../hooks/misc';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import swal from "sweetalert2";

let normalizedFeature, normalizedLabel;
let trainingFeatureTensor, testingFeatureTensor, trainingLabelTensor, testingLabelTensor;
let trainingModel, savedResult;
let featureMin, featureMax, labelMin, labelMax;

const EPOCHS = 24;
const BATCH_SIZE = 32;
const STORAGE_ID = 'kc-house-price-regression';

const normalize = (tensor, min, max) => {
	let normalized;
	[min, max, normalized] = tf.tidy(() => {
		min = min ?? tensor.min();
		max = max ?? tensor.max();
		return [min, max, tensor.sub(min).div(max.sub(min))];
	});

	return {
		tensor: normalized,
		min,
		max
	};
};

const denormalize = (tensor, min, max) => tf.tidy(() => tensor.mul(max.sub(min)).add(min));

const plot = async (pointsArray, feat) => {
	tfvis.render.scatterplot(
		{
			name: `${feat} vs House Price`
		},
		{
			values: [pointsArray],
			series: ['original']
		},
		{
			xLabel: feat,
			yLabel: 'Price'
		}
	);
};

const createModel = () => {
	const model = tf.sequential();

	model.add(
		tf.layers.dense({
			units: 1,
			useBias: true,
			activation: 'linear',
			inputDim: 1
		})
	);

	// const optimizer = tf.train.sgd(0.1);
	const optimizer = tf.train.adam();

	model.compile({
		loss: 'meanSquaredError',
		optimizer
	});

	return model;
};

const LinearRegression = props => {
	const [sqft, setSqft] = useState(1000);
	const [trainingStatus, setTrainingStatus] = useState('READY');
	const [testingStatus, setTestingStatus] = useState('READY');
	const [epochs, setEpochs] = useState(NaN);
	const [trainingTime, setTrainingTime] = useState(NaN);
	const [trainingLoss, setTrainingLoss] = useState(NaN);
	const [validationLoss, setValidationLoss] = useState(NaN);
	const [testingLoss, setTestingLoss] = useState(NaN);
	const [saved, setSaved] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [predicted, setPredicted] = useState(NaN);

	const onClickToggleVisor = useCallback(() => {
		tfvis.visor().toggle();
	}, []);

	const onClickTrainNewModel = useCallback(async () => {
		setTrainingStatus('LOADING');

		// Preparing data
		// const dataset = tf.data.csv('/data/lab/kc_house_data.csv').take(2000);
		const dataset = tf.data.csv('/data/lab/kc_house_data.csv');

		// extract x and y value
		const pointsDataset = dataset.map(({ sqft_living: x, price: y }) => ({ x, y }));
		const points = await pointsDataset.toArray();
		points.length % 2 && points.pop();
		tf.util.shuffle(points);
		plot(points, 'Square Feet');
		tfvis.visor().close();

		// extract features(input)
		const featureValues = points.map(p => p.x);
		const featureTensor = tf.tensor2d(featureValues, [featureValues.length, 1]);

		// extract labels(output)
		const labelValues = points.map(p => p.y);
		const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

		// normalize feature sand labels
		normalizedFeature = normalize(featureTensor);
		normalizedLabel = normalize(labelTensor);

		[featureMin, featureMax] = [normalizedFeature.min, normalizedFeature.max];
		[labelMin, labelMax] = [normalizedLabel.min, normalizedLabel.max];

		console.log(featureMin);

		// splitting sets into training and testing sets
		[trainingFeatureTensor, testingFeatureTensor] = tf.split(normalizedFeature.tensor, 2);
		[trainingLabelTensor, testingLabelTensor] = tf.split(normalizedLabel.tensor, 2);

		setTrainingStatus('TRAINING');

		const startTime = new Date().getTime();

		// creating training model
		trainingModel = createModel();
		tfvis.show.modelSummary({ name: 'Model Summary' }, trainingModel);

		const layer = trainingModel.getLayer(undefined, 0);
		tfvis.show.layer({ name: 'Layer 1' }, layer);

		// training the model
		const { onBatchEnd, onEpochEnd } = tfvis.show.fitCallbacks({ name: 'Training Performance' }, ['loss']);
		const trainingResult = await trainingModel.fit(trainingFeatureTensor, trainingLabelTensor, {
			batchSize: BATCH_SIZE,
			epochs: EPOCHS,
			validationSplit: 0.2,
			callbacks: {
				// onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch + 1}: loss = ${log.loss}`)
				// onBatchEnd,
				onEpochEnd: (epoch, log, ...rest) => {
					setEpochs(epoch + 1);
					onEpochEnd(epoch, log, ...rest);
				}
			}
		});

		const trainingTime = new Date().getTime() - startTime;
		setTrainingTime(trainingTime);

		// training loss
		const trainingLoss = trainingResult.history.loss[trainingResult.history.loss.length - 1];
		setTrainingLoss(trainingLoss);

		// validation loss
		const validationLoss = trainingResult.history.val_loss[trainingResult.history.val_loss.length - 1];
		setValidationLoss(validationLoss);

		setTrainingStatus('TRAINED');
		setLoaded(false);
		setSaved(false);
		setTestingLoss(NaN);
	}, []);

	const onClickTestModel = useCallback(async () => {
		// testing and testing loss
		const testingLossTensor = trainingModel.evaluate(testingFeatureTensor, testingLabelTensor);
		const testingLoss = await testingLossTensor.dataSync();
		setTestingLoss(testingLoss[0]);

		setTestingStatus('TESTED');
	}, [setTestingLoss]);

	const onClickLoadModel = useCallback(async () => {
		const storageKey = `localstorage://${STORAGE_ID}`;
		const models = await tf.io.listModels();
		savedResult = models[storageKey];
		if (savedResult) {
			savedResult.dateSaved = new Date(savedResult.dateSaved);
			trainingModel = await tf.loadLayersModel(storageKey);

			const config = JSON.parse(localStorage.getItem(`${STORAGE_ID}/config`));
			console.log(config);
			[featureMin, featureMax, labelMin, labelMax] = [tf.tensor1d([+config.featureMin]), tf.tensor1d([+config.featureMax]), tf.tensor1d([+config.labelMin]), tf.tensor1d([+config.labelMax])];

			tfvis.show.modelSummary({ name: 'Model Summary' }, trainingModel);
			const layer = trainingModel.getLayer(undefined, 0);
			tfvis.show.layer({ name: 'Layer 1' }, layer);

			tfvis.visor().close();

			setTrainingStatus('TRAINED');
			setSaved(true);
			setLoaded(true);
		} else {
			swal.fire('Error', 'No saved model found!', 'error');
		}
	}, [setTrainingStatus, setSaved, setLoaded]);

	const onClickSaveModel = useCallback(async () => {
		savedResult = (await trainingModel.save(`localstorage://${STORAGE_ID}`)).modelArtifactsInfo;
		localStorage.setItem(
			`${STORAGE_ID}/config`,
			JSON.stringify({
				featureMin: featureMin.dataSync()[0],
				featureMax: featureMax.dataSync()[0],
				labelMin: labelMin.dataSync()[0],
				labelMax: labelMax.dataSync()[0]
			})
		);
		setSaved(true);
	}, [setSaved]);

	const onClickPredict = useCallback(() => {
		const result = tf.tidy(() => {
			const inputTensor = tf.tensor1d([+sqft]);
			const normalizedInput = normalize(inputTensor, featureMin, featureMax);
			const normalizedOutputTensor = trainingModel.predict(normalizedInput.tensor);
			const outputTensor = denormalize(normalizedOutputTensor, labelMin, labelMax);
			const outputValue = Math.max(outputTensor.dataSync()[0], 0);

			return outputValue;
		});

		setPredicted(result);
	}, [sqft, setPredicted]);

	return (
		<section className="lab-view LinearRegression">
			<div className="title-area">
				<h1>Linear Regression with TensorFlow.js</h1>
				<h2>Train a model to predict house price from living space.</h2>
			</div>
			<div className="operations">
				<Button onClick={onClickToggleVisor}>Toggle Visor</Button>
			</div>
			<div className="columns">
				<div className="column">
					<div className="legend">
						<i className="icon-wrench"></i>
						<h2>Train & Test</h2>
					</div>
					<div className="data-set">
						<h3>Training status</h3>
						<output>
							<p>
								{{ READY: 'Ready for training', LOADING: 'Loading data...', TRAINING: 'Training....', TRAINED: 'Trained.' }[trainingStatus]}
								{!isNaN(epochs) && trainingStatus === 'TRAINING' ? ` ${((epochs / EPOCHS) * 100).toFixed(1)}%` : ''}
								{trainingStatus === 'TRAINED' &&
									(saved
										? ` (saved ${savedResult.dateSaved
												.toISOString()
												.replace('T', ' ')
												.replace(/\.\d+Z$/, '')})`
										: ' (unsaved)')}
							</p>
							{!isNaN(trainingTime) && <p>Training Time: {trainingTime}ms</p>}
							{!isNaN(trainingLoss) && <p>Training Loss: {trainingLoss.toFixed(5)}</p>}
							{!isNaN(validationLoss) && <p>Validation Loss: {validationLoss.toFixed(5)}</p>}
						</output>
					</div>
					<div className="data-set">
						<h3>Testing status</h3>
						<output>
							<p>{{ READY: 'Not yet tested', TESTED: 'Tested.' }[testingStatus]}</p>
							{!isNaN(testingLoss) && <p>Testing Loss: {testingLoss.toFixed(5)}</p>}
						</output>
					</div>
					<div className="buttons">
						<Button onClick={onClickTrainNewModel} disabled={!['TRAINED', 'READY'].includes(trainingStatus)}>
							Train New Model
						</Button>
						<Button onClick={onClickTestModel} disabled={trainingStatus !== 'TRAINED' || loaded || !isNaN(testingLoss)}>
							Test Model
						</Button>
						<Button onClick={onClickLoadModel} disabled={['LOADING', 'TRAINING'].includes(trainingStatus) || loaded}>
							Load Model
						</Button>
						<Button onClick={onClickSaveModel} disabled={trainingStatus !== 'TRAINED' || loaded || saved}>
							Save Model
						</Button>
					</div>
				</div>
				<div className="column">
					<div className="legend">
						<i className="icon-stats-dots"></i>
						<h2>Predict</h2>
					</div>
					<div className="data-set">
						<h3>Square feet of living space:</h3>
						<input type="number" placeholder="1000" min="0" value={sqft} onChange={({ target: { value } }) => setSqft(value)} />
					</div>
					<div className="data-set">
						<h3>Prediction</h3>
						<output>
							<p>{!isNaN(predicted) ? predicted.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Not yet predicted'}</p>
						</output>
					</div>
					<div className="buttons">
						<Button onClick={onClickPredict} disabled={trainingStatus !== 'TRAINED'}>
							Predict House Price
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LinearRegression;
