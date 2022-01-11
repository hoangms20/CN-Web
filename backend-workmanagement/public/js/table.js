
const btnCloses = document.querySelectorAll('.btn-close')
const btnAdds = document.querySelectorAll('.btn-add')
const inviteMember = document.getElementById('inviteMember')
const modelInvite = document.getElementById('model-invite')
const closeModel = document.getElementById('close-model')

//show model invite
inviteMember.addEventListener('click', function () {
	modelInvite.classList.add('model-invite-active')
})

//close model invite
closeModel.addEventListener('click', function () {
	modelInvite.classList.remove('model-invite-active')
})

btnAdds.forEach((btnAdd) => {
	btnAdd.addEventListener('click', function () {
		const formAdd =
			btnAdd.parentElement.lastElementChild.previousElementSibling
				.previousElementSibling
		formAdd.classList.add('form-add-active')
		btnAdd.style.display = 'none'
	})
})
document.querySelectorAll('.btn-close-item').forEach(item => {
	item.addEventListener('click', (e) => {
		e.stopPropagation();
	})
});
btnCloses.forEach((btnClose) => {
	const btnAdd = btnClose.parentElement.previousElementSibling
	btnClose.addEventListener('click', function () {
		const formAdd = btnClose.parentElement
		formAdd.classList.remove('form-add-active')
		btnAdd.style.display = 'block'
	})
})

// table setting

const tableSettingOpen = document.getElementById('table-setting-open')
const tableSetting = document.getElementById('table-setting')

tableSettingOpen.addEventListener('click', function () {
	tableSetting.classList.toggle('option-table-setting-active')
})

const btnUpdateTable = document.querySelectorAll('.btn-update-table')

btnUpdateTable.forEach((btnUpdate) => {
	const formUpdateTable = btnUpdate.parentElement.lastElementChild
	btnUpdate.addEventListener('click', function (e) {
		formUpdateTable.classList.toggle('option-table-setting-active')
	})
})

//column setting
const columnSettingOpen = document.querySelectorAll('.btn-column-setting')

columnSettingOpen.forEach((btnUpdate) => {
	const formUpdateTable = btnUpdate.parentElement.lastElementChild
	btnUpdate.addEventListener('click', function (e) {
		formUpdateTable.classList.toggle('option-table-setting-active')
	})
})

// -----------------------drag and drop------------------------
const columns = document.querySelectorAll('.columns')
const cards = document.querySelectorAll('.card')
const listColumn = document.querySelectorAll('.column')
const tableContainer = document.querySelector('.table-container')
const tableDraggable = document.querySelector('.table-draggable')

let draggableTodo = null

for(let index = 0; index < columns.length; index++) {
	const close = document.querySelectorAll(`.icon-close-model-${index}`)
	const cardItem = document.querySelectorAll(`.card-${index}`)
	close.forEach((e, _index) => {
		e.addEventListener('click', (e) => {
			e.stopPropagation();
			const node = document.getElementById(`model-card-${index}-${_index}`);
			node.classList.remove('model-card-active')
		});
	});
	cardItem.forEach((e, __index) => {
		e.addEventListener('click', (event) => {
			const allElement = document.querySelectorAll('.model-card-active');
			allElement.forEach(i => {
				i.classList.remove('model-card-active');
			})
			const x = document.getElementById(`model-card-${index}-${__index}`);
			x.classList.add('model-card-active');
		});
	})
}

cards.forEach((card) => {
	card.addEventListener('dragstart', dragStart)
	card.addEventListener('dragend', dragEnd)

	//show model card
	// card.addEventListener('click', function (e) {
	// 	const modelCard = card.nextElementSibling
	// 	modelCard.classList.add('model-card-active')
	// })

	//close model card
	// card.addEventListener('dblclick', function (e) {
	// 	const modelCard = card.nextElementSibling
	// 	modelCard.classList.remove('model-card-active')
	// })
})

// drag drop column

const getColumnPosition = (container, x) => {
	const draggableElement = [...container.querySelectorAll('.column:not(.dragging)')];
	let closest = {
		offset: Number.NEGATIVE_INFINITY,
		element: '',
	};
	for (let i=0; i < draggableElement.length; i++) {
		const box = draggableElement[i].getBoundingClientRect();
		const offset = x - box.left - box.width / 2;
		if (offset < 0 && offset > closest.offset) {
			closest = {
				offset,
				element: draggableElement[i]
			}
		}
	}
	return closest.element;
};

listColumn.forEach((col, index) => {
	col.addEventListener('dragstart', e => {
		e.stopPropagation();
		col.classList.add('dragging')
	});
	col.addEventListener('dragend', e => {
		e.stopPropagation();
		col.classList.remove('dragging');
	});
});

tableContainer.addEventListener('dragover', e => {
	e.stopPropagation();
	const dragging = document.querySelector('.dragging');
	if ([...dragging.classList].indexOf('items') === -1)
	{
		const elementClosest = getColumnPosition(tableContainer, e.clientX);
		if (!elementClosest) tableContainer.appendChild(dragging);
		else tableContainer.insertBefore(dragging, elementClosest);
	}
});


function dragStart(e) {
	e.stopPropagation();
	draggableTodo = this
	this.classList.add('dragging')
	setTimeout(() => {
		// this.style.display = 'none'
	}, 0)
}

function dragEnd(e) {
	e.stopPropagation();	
	listColumn.forEach(item => {
		item.setAttribute('draggable', 'true');
	});
	draggableTodo = null
	this.classList.remove('dragging')
	setTimeout(() => {
		this.style.display = 'block'
	}, 0)
}

columns.forEach((column) => {
	column.addEventListener('dragover', (e) => {
		e.stopImmediatePropagation();
		e.stopPropagation();
		const dragging = document.querySelector('.dragging');
		const id = dragging.id;
		const idForm = id.replace(/card/g, 'model-card');
		const cardForm = document.getElementById(idForm);
		const afterElement = getDroppedElement(column, e.clientY);
		if (!afterElement) {
			column.appendChild(dragging);
			column.appendChild(cardForm);
		}
		else {
			column.insertBefore(cardForm, afterElement)
			column.insertBefore(dragging, cardForm);
		}
	})
	column.addEventListener('dragenter', dragEnter)
	column.addEventListener('dragleave', dragLeave)
	column.addEventListener('drop', dragDrop)
})

// function dragOver(e) {
// 	e.preventDefault();
// 	const dragging = document.querySelector('.dragging');
// 	const afterElement = getDroppedElement(this, e.clientY);
	
// 	if (!afterElement) {
// 		this.appendChild(dragging);
// 	}
// 	else {
// 		this.insertBefore(dragging, afterElement);
// 	}
// }

function dragEnter(e) {
	e.stopPropagation();
}

function dragLeave(e) {
	e.stopPropagation();
	this.style.border = 'none';
}

function dragDrop(e) {
	e.stopPropagation();
	this.style.border = 'none'
	// this.insertBefore(draggableTodo, this.childNodes[1])
}

const getDroppedElement = (container, y) => {
	
	const draggableElement = [...container.querySelectorAll('.card:not(.dragging)')];
	let closest = {
		offset: Number.NEGATIVE_INFINITY,
		element: '',
	}
	for (let i=0; i < draggableElement.length; i++) {
		const box = draggableElement[i].getBoundingClientRect();
		const offset = y - box.top - box.height / 2;
		if (offset < 0 && offset > closest.offset) {
			closest = {
				offset,
				element: draggableElement[i]
			}
		}
	}
	return closest.element;
};

// add column
const btnAddColumn = document.getElementById('btn-add-column')
btnAddColumn.addEventListener('click', function (e) {
	const fromAddColumn = btnAddColumn.parentElement.lastElementChild
	fromAddColumn.classList.add('form-add-active')
})

// save table

let timer = null;
const btnSave = document.getElementById('save-table');
btnSave.addEventListener('click', e => {
	e.stopPropagation();
	let arr = [];
	document.querySelectorAll('.columns').forEach((item, index) => {
		const id = item.id.replace(/column-/g, '');
		const tagElements = [...item.querySelectorAll('.card')];
		let tags = [];
		tagElements.forEach(_item => {
			const tagId = _item.classList[_item.classList.length - 1].split('tag-id-')[1];
			tags.push(tagId);
		});
		const data = {
			columnId: id,
			tags: tags
		}
		arr.push(data);
	});
	const request = new XMLHttpRequest();
	const url = '/api/column/order';
	request.open('POST', url, true);
	request.setRequestHeader("Content-Type", "application/json");
	const data = JSON.stringify({ data: arr });
	request.onreadystatechange = function () {
		clearTimeout(timer);
		if (request.readyState === 4) {
			if (request.status === 200) {
				document.getElementById('notification').style.display = 'block';
				document.querySelector('.success').style.display = 'block';
			}
			else {
				document.getElementById('notification').style.display = 'block';
				document.querySelector('.fail').style.display = 'block';
			}
		}
		timer = setTimeout(() => {
			document.getElementById('notification').style.display = 'none';
			document.querySelector('.success').style.display = 'none';
			document.querySelector('.fail').style.display = 'none';
		}, 2000);
		
	};
	request.send(data);
});

// Update table

document.querySelector('.u-table').addEventListener('click', () => {
	document.getElementById('u-table').classList.remove('option-table-setting-active');
});
document.querySelector('.u-description').addEventListener('click', () => {
	document.getElementById('u-description').classList.remove('option-table-setting-active');
});
document.querySelector('.u-background').addEventListener('click', () => {
	document.getElementById('u-background').classList.remove('option-table-setting-active');
});