import { ModelAttribute } from '../interface/ModelAttribute';
import { AxiosResponse, AxiosPromise } from 'axios';
import { Callback } from '../types/Callback';

interface HasId {
	id?: number;
}
interface Sync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}
interface Events {
	on(eventName: string, callback: Callback): void;
	trigger(eventName: string): void;
}

export class Model<T extends HasId> {
	constructor(
		private attributes: ModelAttribute<T>,
		private events: Events,
		private sync: Sync<T>
	) {}

	on = this.events.on;
	trigger = this.events.trigger;
	get = this.attributes.get;

	set(update: T): void {
		this.attributes.set(update);
		this.events.trigger('change');
	}
	fetch(): void {
		const id = this.attributes.get('id');
		if (typeof id !== 'number') {
			console.log('test err');
			throw new Error('NIE MA TAKIEGO OSOBNIKA');
		}
		this.sync.fetch(id).then((response: AxiosResponse): void => {
			this.set(response.data);
		});
	}
	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((response: AxiosResponse): void => {
				this.trigger('save');
			})
			.catch(() => {
				this.trigger('error');
			});
	}
	// get on() {
	// 	return this.events.on;
	// }

	// get trigger() {
	// 	return this.events.trigger;
	// }

	// get get() {
	// 	return this.attributes.get;
	// }
}
