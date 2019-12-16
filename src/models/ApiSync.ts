import axios, { AxiosPromise } from 'axios';

interface HasId {
	id?: number;
}
export class ApiSync<T extends HasId> {
	// http://localhost0:3000/users
	constructor(public rootUrl: string) {}
	fetch(id: number): AxiosPromise {
		return axios.get(`${this.rootUrl}/${id}`);
	}
	save(data: T): AxiosPromise {
		// const id = data.id;

		const { id } = data;
		if (id) {
			//put update
			return axios.put(`${this.rootUrl}/${id}`, data);
		} else {
			//post create
			return axios.post(this.rootUrl, data);
		}
	}
}

// .then((response: AxiosResponse): void => {
// 	this.set(response.data);
// });
