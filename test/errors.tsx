/* eslint-disable unicorn/string-content */
import React from 'react';
import test from 'ava';
import patchConsole from 'patch-console';
import stripAnsi from 'strip-ansi';
import {render} from '../src';
import createStdout from './helpers/create-stdout';

let restore;

test.before(() => {
	// @ts-expect-error
	restore = patchConsole();
});

test.after(() => {
	restore();
});

test('catch and display error', t => {
	const stdout = createStdout();

	const Test = () => {
		throw new Error('Oh no');
	};

	render(<Test />, {stdout});

	t.deepEqual(
		stripAnsi(stdout.write.lastCall.args[0]).split('\n').slice(0, 14),
		[
			'',
			'  ERROR  Oh no',
			'',
			' test/errors.tsx:24:9',
			'',
			' 21:   const stdout = createStdout();',
			' 22:',
			' 23:   const Test = () => {',
			" 24:     throw new Error('Oh no');",
			' 25:   };',
			' 26:',
			' 27:   render(<Test />, {stdout});',
			'',
			' - Test (test/errors.tsx:24:9)'
		]
	);
});
