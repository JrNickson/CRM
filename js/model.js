// DATA
const requests = loadFromLocalStorage();
console.log(requests);

// Конструктор для создания заявки
class Request {
	constructor(id, name, phone, email, product) {
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.product = product;
		this.date = new Date().toISOString();
		this.status = 'new';
	}
}

const products = {
	'course-html': 'Курс по вертске',
	'course-js': 'Курс по JavaScript',
	'course-vue': 'Курс по VUE JS',
	'course-php': 'Курс по PHP',
	'course-wordpress': 'Курс по WordPress',
};

const statuses = {
	new: 'Новая',
	inwork: 'В работе',
	complete: 'Завершена',
};

const filter = loadFilter();

function changeFilter(prop, value) {
	filter[prop] = value;
	localStorage.setItem('filter', JSON.stringify(filter));
	return filter;
}

function loadFilter() {
	let filter = {
		products: 'all',
		status: 'all',
	};
	if (localStorage.getItem('filter')) {
		filter = JSON.parse(localStorage.getItem('filter'));
	}

	return filter;
}

function filterRequests(filter) {
	let filteredRequests;

	// By products
	if (filter.products !== 'all') {
		filteredRequests = requests.filter((el) => {
			return el.product === filter.products;
		});
	} else {
		filteredRequests = [...requests];
	}

	// By status
	if (filter.status !== 'all') {
		filteredRequests = filteredRequests.filter((el) => {
			return el.status === filter.status;
		});
	}

	return prepareRequests(filteredRequests);
}

function countNewRequest() {
	const newRequests = requests.filter((el) => {
		return el.status === 'new';
	});

	return newRequests.length;
}

function addRequest(formData) {
	// Расчет ID
	let id = requests.length > 0 ? requests.at(-1).id + 1 : 1;

	// Создаем заявку
	const request = new Request(
		id,
		formData.get('name'),
		formData.get('phone'),
		formData.get('email'),
		formData.get('product')
	);

	// Добавляем заявку в массив
	requests.push(request);

	// Сохраняем в LocalStorage
	saveToLocalStorage();
}

function saveToLocalStorage() {
	localStorage.setItem('requests', JSON.stringify(requests));
}

function loadFromLocalStorage() {
	const data = localStorage.getItem('requests');
	return data ? JSON.parse(data) : [];
}

function getRequests() {
	return filterRequests(filter);
}

function prepareRequests(requests) {
	return requests.map((item) => {
		return {
			...item,
			date: new Date(item.date).toLocaleDateString(),
			productName: products[item.product],
			statusName: statuses[item.status],
		};
	});
}

function getRequestByID(id) {
	const request = requests.find((item) => item.id === parseInt(id));

	request.dateDate = new Date(request.date).toLocaleDateString();
	request.dateTime = new Date(request.date).toLocaleTimeString();

	return request;
}

function updateRequest(formData) {
	const request = getRequestByID(formData.get('id'));
	request.name = formData.get('name');
	request.phone = formData.get('phone');
	request.email = formData.get('email');
	request.status = formData.get('status');
	request.product = formData.get('product');

	saveToLocalStorage();
}

function getFilter() {
	return { ...filter };
}

export {
	addRequest,
	getRequests,
	getRequestByID,
	updateRequest,
	changeFilter,
	filterRequests,
	countNewRequest,
	getFilter,
};
