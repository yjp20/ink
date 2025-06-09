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

	const borderColor = isLoading ? 'blue' : 'green';

	return (
		<Box
			id="top"
			padding={1}
			borderStyle={'double'}
			borderColor={borderColor}
			flexDirection={'column'}
			width={'50'}
		>
			<Text>{JSON.stringify({isLoading})}</Text>
		</Box>
	);
};

render(<AppBox />, {debug: true});
