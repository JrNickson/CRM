import * as model from '../model.js';
import * as view from './edit.view.js';

// Start App
init();

// Functions
function init() {
	const id = gerRequestID();
	const request = model.getRequestByID(id);
	view.renderRequest(request);
	setupEventListeners();
}

function gerRequestID() {
	const params = new URLSearchParams(window.location.search);
	return params.get('id');
}

function setupEventListeners() {
	view.elements.form.addEventListener('submit', formSubmitHandler);
}

function formSubmitHandler(e) {
	e.preventDefault();
	const formData = view.getFormInput();
	model.updateRequest(formData);
	window.location = './table.html';
}
