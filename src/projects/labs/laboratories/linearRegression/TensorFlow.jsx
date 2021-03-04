import React, { useState } from 'react';
import { useAsync } from '../../../../hooks/misc';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

const TensorFlow = props => {
	const [finalResult, setFinalResult] = useState({
		trainingLoss: 'N/A',
		validationLoss: 'N/A',
		testingLoss: 'N/A'
	});

	const ready = useAsync(async () => {
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

		const normalize = tensor => {
			let [min, max, normalized] = tf.tidy(() => {
				const min = tensor.min();
				const max = tensor.max();
				return [min, max, tensor.sub(min).div(max.sub(min))];
			});

			return {
				tensor: normalized,
				min,
				max
			};
		};

		const denormalize = (tensor, min, max) => tf.tidy(() => tensor.mul(max.sub(min)).add(min));

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

		// Preparing data
		// const dataset = tf.data.csv('/data/kc_house_data.csv').take(5000);
		const dataset = tf.data.csv('/data/lab/kc_house_data.csv');

		// extract x and y value
		const pointsDataset = dataset.map(({ sqft_living: x, price: y }) => ({ x, y }));
		const points = await pointsDataset.toArray();
		points.length % 2 && points.pop();
		tf.util.shuffle(points);
		plot(points, 'Square Feet');

		// extract features(input)
		const featureValues = points.map(p => p.x);
		const featureTensor = tf.tensor2d(featureValues, [featureValues.length, 1]);

		// extract labels(output)
		const labelValues = points.map(p => p.y);
		const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

		// normalize feature sand labels
		const { min, max, tensor: normalizedFeatureTensor } = normalize(featureTensor);
		const { tensor: normalizedLabelTensor } = normalize(labelTensor);

		// splitting sets into training and testing sets
		const [trainingFeatureTensor, testingFeatureTensor] = tf.split(normalizedFeatureTensor, 2);
		const [trainingLabelTensor, testingLabelTensor] = tf.split(normalizedLabelTensor, 2);

		// creating training model
		const model = createModel();
		tfvis.show.modelSummary({ name: 'Model Summary' }, model);

		const layer = model.getLayer(undefined, 0);
		tfvis.show.layer({ name: 'Layer 1' }, layer);

		// training the model
		const { onBatchEnd, onEpochEnd } = tfvis.show.fitCallbacks({ name: 'Training Performance' }, ['loss']);
		const trainingResult = await model.fit(trainingFeatureTensor, trainingLabelTensor, {
			batchSize: 32,
			epochs: 20,
			validationSplit: 0.2,
			callbacks: {
				// onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch + 1}: loss = ${log.loss}`)
				// onBatchEnd,
				onEpochEnd: (epoch, log, ...ags) => {
					setFinalResult(r => ({ ...r, trainingLoss: log.loss }));
					onEpochEnd(epoch, log, ...ags);
				}
			}
		});

		// training loss
		const trainingLoss = trainingResult.history.loss[trainingResult.history.loss.length - 1];
		console.log(`Training loss: ${trainingLoss}`);
		setFinalResult(r => ({ ...r, trainingLoss }));

		// validation loss
		const validationLoss = trainingResult.history.val_loss[trainingResult.history.val_loss.length - 1];
		console.log(`Validation loss: ${validationLoss}`);
		setFinalResult(r => ({ ...r, validationLoss }));

		// testing and testing loss
		const testingLossTensor = model.evaluate(testingFeatureTensor, testingLabelTensor);
		const testingLoss = await testingLossTensor.dataSync();
		console.log(`Testing loss: ${testingLoss}`);
		setFinalResult(r => ({ ...r, testingLoss }));
	});

	return (
		<section className="lab-view TensorFlow">
			<p>{ready ? 'Done' : 'Calculating...'}</p>
			<p>Number of Tensors: {tf.memory().numTensors}</p>
			<p>Training Loss: {finalResult.trainingLoss}</p>
			<p>Validation Loss: {finalResult.validationLoss}</p>
			<p>Testing Loss: {finalResult.testingLoss}</p>
		</section>
	);
}

export default TensorFlow;