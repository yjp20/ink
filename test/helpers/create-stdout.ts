import EventEmitter from 'events';
import {spy} from 'sinon';
import {WriteStream} from 'tty';

// Fake process.stdout
interface Stream extends EventEmitter {
	output: string;
	columns: number;
	write: {
		(str: string): void;
		firstCall: {
			args: any[];
		};
		lastCall: {
			args: any[];
		};
	};
	get(): string;
}

export default (columns?: number): Stream & WriteStream => {
	const stdout = new EventEmitter();
	// @ts-expect-error
	stdout.columns = columns ?? 100;
	// @ts-expect-error
	stdout.write = spy();
	// @ts-expect-error
	stdout.get = () => stdout.write.lastCall.args[0];
	// @ts-expect-error
	return stdout;
};
