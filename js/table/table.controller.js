import * as model from '../model.js';
import * as view from './table.view.js';

// Start App
init();

// Functions
function init() {
	const requests = model.getRequests();
	view.renderRequests(requests);
	addEventListeners();
	const newRequestsCount = model.countNewRequest();
	view.renderBadgeNew(newRequestsCount);

	const filter = model.getFilter();
	view.updateFilter(filter);
	console.log(filter);
}

function addEventListeners() {
	view.elements.select.addEventListener('change', filterProducts);
	view.elements.topStatusBar.addEventListener('click', filterByStatus);
	view.elements.leftStatusLinks.forEach((link) => {
		link.addEventListener('click', filterByStatus);
	});
}

function filterProducts() {
	const filter = model.changeFilter('products', this.value);
	const filteredRequests = model.filterRequests(filter);
	view.renderRequests(filteredRequests);
}

function filterByStatus(e) {
	const filter = model.changeFilter('status', e.target.dataset.value);
	const filteredRequests = model.filterRequests(filter);
	view.renderRequests(filteredRequests);
	view.updateStatusBar(e.target.dataset.value);
}
