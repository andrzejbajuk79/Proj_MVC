import { Callback } from './../types/Callback';
import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
	regions: { [key: string]: Element } = {};
	constructor(public parent: Element, public model: T) {
		this.bindModel();
	}

	abstract template(): string;
	regionsMap(): { [key: string]: string } {
		return {};
	}

	eventsMap(): { [key: string]: Callback } {
		return {};
	}

	bindModel(): void {
		// blad  poniewaz type T nie koniecznie musi zawierac metode ON, dlatego type T musi zaimplementowac
		// interfejs w ktortym upewniamy sie ze ta metoda istnieje
		this.model.on('change', () => {
			this.render();
		});
	}
	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();

		// EventKey bedzie w tym przypadku :'click:button'
		//  musimy zrobic splita po ":"
		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');

			//  w naszym fragmencie HTML probujemy znalezc kazdy element ktory pasuje do SELECTORA
			// i przypisac do niego zdarzenie EVENTNAME
			fragment.querySelectorAll(selector).forEach(element => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	}
	mapRegions(fragment: DocumentFragment): void {
		const regionsMap = this.regionsMap();
		for (let key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector);
			if (element) {
				this.regions[key] = element;
			}
		}
	}
	onRender(): void {}
	// zamieniamy string  na element HTML
	render(): void {
		this.parent.innerHTML = '';
		const templateElem = document.createElement('template');

		templateElem.innerHTML = this.template();
		this.bindEvents(templateElem.content);
		this.mapRegions(templateElem.content);
		this.onRender();

		this.parent.append(templateElem.content);
	}
}
