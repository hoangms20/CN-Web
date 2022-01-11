// create form 
const createForm = (method, path) => {
    const form = document.createElement('form');
    form.style.display = 'none';
    form.method = method;
    form.action = path;

    return form;
}
const createInputWithValue = (value, name) => {
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('name', name);
    newInput.setAttribute('value', value);
    newInput.style.display = 'none';
    return newInput;
}
// for action down
const downIcon = document.querySelectorAll('.action-down');
downIcon.forEach((item, index) => {
    item.addEventListener('click', () => {
        const actions = document.getElementById(`list-actions-left-${index}`);
        if (getComputedStyle(actions).display === 'none')
            actions.style.display = 'block';
        else actions.style.display = 'none';
    });
});
// for create table form
const inputTableBackground = document.querySelectorAll('.input-background') || null;
if (inputTableBackground) {
    inputTableBackground.forEach((element, index) => {
        element.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const type = file.type.split('/')[1];
            if (type !== 'jpg' && type !== 'png' && type !== 'jpeg') alert("Bạn phải chỉ có thể tải lên ảnh định dạng png hoặc jpg");
            else {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
        
                fileReader.onload = () => {
                    const url = fileReader.result;
                    const img = document.getElementById(`input-table-background-image-${index}`);
                    img.src = url;
                };
            }
        });
    });
};
const closeForm = document.querySelectorAll('#close-form');
// const formElement = document.querySelector('.add-table-form');
const createTable = document.querySelectorAll('.create-table');
closeForm.forEach((item, index) => {
    item.addEventListener('click', () => {
        document.getElementById(`add-table-form-${index}`).style.display = 'none';
    });
})
createTable.forEach((item, index) => {
    item.addEventListener('click', () => {
        for(let i=0; i<createTable.length; i++) {
            if (i !== index) document.getElementById(`add-table-form-${i}`).style.display = 'none';
        }
       document.getElementById(`add-table-form-${index}`).style.display = 'block';
    });
});

// add favorite
const addFavorite = document.querySelectorAll('.add-favorite');
addFavorite.forEach((item, index) => {
    item.addEventListener('click', e => {
        e.preventDefault();
        let id = item.id;
        id = id.split('-')[1];
        const form = createForm('POST', '/api/table/favorite/add');
        const input = createInputWithValue(id, 'tableId');
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    });
});

const favorite = document.querySelectorAll('.favorite');
favorite.forEach((item, index) => {
    item.addEventListener('click', e => {
        e.preventDefault();
        let id = item.id;
        id = id.split('-')[1];
        const form = createForm('POST', '/api/table/favorite/remove');
        const input = createInputWithValue(id, 'tableId');
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    });
});

// for create workplace
const modal = document.getElementById('create-workplace-modal');
const closeModal = document.getElementById('close-modal');
// const addWorkplaceIcon = document.getElementById('add-workplace-icon');
const btnModalContinue = document.getElementById('btn-create-modal-info');
const createWpInfo = document.querySelector('.create-workplace-info');
const addWpMembers = document.querySelector('.create-modal-add-members');
const backElement = document.getElementById('back');
const formCreate = document.getElementById('form-workplace');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
document.getElementById('add-workplace-icon').addEventListener('click', () => {
    modal.style.display = 'block';
    createWpInfo.style.display = 'block';
    addWpMembers.style.display = 'none';
});


btnModalContinue.addEventListener('click', (e) => {
    const workplaceName = document.getElementById('input-workplace-name');
    const workplaceCategory = document.getElementById('input-workplace-category');
    const workplaceDescription = document.getElementById('input-workplace-description');
    
    formCreate.appendChild(createInputWithValue(workplaceName.value, 'workplaceName'));
    formCreate.appendChild(createInputWithValue(workplaceCategory.value, 'workplaceCategory'));
    formCreate.appendChild(createInputWithValue(workplaceDescription.value, 'workplaceDescription'));

    createWpInfo.style.display = 'none';
    addWpMembers.style.display = 'block';
});
backElement.addEventListener('click', () => {
    createWpInfo.style.display = 'block';
    addWpMembers.style.display = 'none';
});

const inviteAfter = document.querySelector('.add-members-after');
inviteAfter.addEventListener('click', () => {
    formCreate.submit();
});

// workplace left action
const listWorkplace = document.querySelectorAll('.workplace-element');
listWorkplace.forEach((item, index) => {
    document.getElementById(`delete-workplace-${index}`).addEventListener('click', event => {
        event.preventDefault();
        if (window.confirm(`Bạn có muốn xóa workplace ${item.classList[1]} ?`)) {
            const form = createForm('POST', `/workplace/delete/${item.id}`);
            document.body.appendChild(form);
            form.submit();
        }
    });
});