'use strict';

const React = require('react');
const {Box, Text, render} = require('../..');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const AppBox = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		let LOADING = 1000;

		async function mockFetchData() {
			setIsLoading(true);
			await sleep(LOADING);
			setIsLoading(false);
		}

		mockFetchData();
	}, []);

	if (isLoading) {
		return (
			<Box borderColor="white" borderStyle="single" height={10} width={50}>
				<Text>{JSON.stringify({isLoading})}</Text>
			</Box>
		);
	}

	return (
		<Box borderColor="white" borderStyle="single" width={50}>
			<Text>{JSON.stringify({isLoading})}</Text>
		</Box>
	);
};

render(<AppBox />, {debug: true});
