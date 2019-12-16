import { UserShow } from './UserShow';
import { User, UserProps } from './../models/User';
import { View } from './View';
import { UserForm } from './UserForm';

export class UserEdit extends View<User, UserProps> {
	regionsMap(): { [key: string]: string } {
		return {
			userShow: '.user-show',
			userForm: '.user-form'
		};
	}
	onRender(): void {
		// we do our template nesting here
		const userShow = new UserShow(this.regions.userShow, this.model);
		userShow.render();
		const userForm = new UserForm(this.regions.userForm, this.model);
		userForm.render();
	}

	template(): string {
		return `
    <div>
      <h1> Edit User </h1>
      <div class="user-show">
      </div>
      <div class="user-form">
      </div>
    
    </div>
    `;
	}
}
