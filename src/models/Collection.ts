import { Eventing } from './Eventing';
import axios, { AxiosResponse, AxiosPromise } from 'axios';

// T symbolizuje zbior danych pobieranych za pomoc Axios ktore znajda w JSONie
// K symbolizuje strukture danych pojedynczego rekordu kolekcji
export class Collection<T, K> {
	models: T[] = [];
	events: Eventing = new Eventing();

	//  w konstruktorze aby generic zaczelo działac musimy dodac funkcje
	// ktora wezmie dane z jsona i w instancje obiektu, wtedy beziemy jej mogli uzyc w foreach
	constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

	// nie mozemy uzyc skroconej wersji  on this.EventSource.on

	get on() {
		return this.events.on;
	}
	get trigger() {
		return this.events.trigger;
	}
	fetch(): void {
		axios.get(this.rootUrl).then((response: AxiosResponse) => {
			response.data.forEach((value: K) => {
				// const user = User.builUser(value);
				this.models.push(this.deserialize(value));
			});

			this.trigger('change');
		});
	}
}
