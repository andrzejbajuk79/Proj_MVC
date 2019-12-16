import { Callback } from '../types/Callback';
import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: Callback } {
		return {
			// 'click:button': this.onButtonClick,
			'click:.set-age': this.onSetAgeClick,
			'click:.set-name': this.onSetNameClick,
			'click:.save-model': this.onSaveClick
		};
	}

	onSetAgeClick = (): void => {
		// debugger;
		this.model.setRandomAge();
	};
	onSetNameClick = (): void => {
		const input = this.parent.querySelector('input');
		// type guard , zapobiega  dumpowi kiedy input jest pusty
		if (input) {
			const name = input.value;
			this.model.set({ name });
		}
	};
	onSaveClick = (): void => {
		this.model.save();
	};

	template(): string {
		return `
    <div>
      <input placeholder ="${this.model.get('name')}"/>
			<button class="set-name">Change Name</button> 
			<button class="set-age">SET RANDOM AGE</button>
			<button class="save-model">Save User</button>
    </div>
    `;
	}
}
// <h3>User Nmae: ${this.model.get('name')}</h3>
// <h3>User Name: ${this.model.get('age')}</h3>
