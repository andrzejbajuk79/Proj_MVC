import { Callback } from '../types/Callback';

export class Eventing {
	events: { [key: string]: Callback[] } = {};

	on = (eventName: string, callback: Callback): void => {
		// event handlary moga byc zdefiniowany w tabeli np 'click
		// albo moga byc puste np 'mose over''
		const handlers = this.events[eventName] || [];

		// dodajemy callback function
		handlers.push(callback);
		this.events[eventName] = handlers;
	};
	trigger = (eventName: string): void => {
		const handlers = this.events[eventName];
		if (!handlers || handlers.length === 0) {
			return;
		}
		handlers.forEach(callback => {
			callback();
		});
	};
}
