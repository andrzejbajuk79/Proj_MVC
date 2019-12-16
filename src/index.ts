import { User } from './models/User';
import { UserProps } from './interface/UserProps';
import { Collection } from './models/Collection';
import { UserList } from './views/UserList';

const users = new Collection(
	'http://localhost:3000/users',
	(json: UserProps) => {
		return User.buildUser(json);
	}
);
users.on('change', () => {
	const root = document.getElementById('root');
	if (root) {
		new UserList(root, users).render();
	}
});

users.fetch();
