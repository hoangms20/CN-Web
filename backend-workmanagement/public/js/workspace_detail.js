// tables of workplace
const contaner = document.getElementById('container');
const workplaceId = contaner.getAttribute("class");
const workplace_action_table = document.getElementById('workplace-action-table');
const workplace_action_member = document.getElementById('workplace-action-member');
const workplace_action_setting = document.getElementById('workplace-action-setting');
const workplace_container_table = document.getElementById('workplace-container-table');
const setting_workplace_content = document.getElementById('setting-workplace-content');
workplace_action_table.addEventListener('click', () => {
    workplace_action_table.style.backgroundColor = '#fff';
    workplace_action_member.style.backgroundColor = '#dfe1e6';
    workplace_action_setting.style.backgroundColor = '#dfe1e6';
    workplace_container_table.style.display = "flex";
    setting_workplace_content.style.display = "none";
});

// Member of workplace
workplace_action_member.addEventListener('click', () => {
    workplace_action_table.style.backgroundColor = '#dfe1e6';
    workplace_action_member.style.backgroundColor = '#fff';
    workplace_action_setting.style.backgroundColor = '#dfe1e6';
});

// Setting workplace
workplace_action_setting.addEventListener('click', () => {
    workplace_action_table.style.backgroundColor = '#dfe1e6';
    workplace_action_member.style.backgroundColor = '#dfe1e6';
    workplace_action_setting.style.backgroundColor = '#fff';
    workplace_container_table.style.display = "none";
    setting_workplace_content.style.display = "block";
});

//change scope
const btn_chang_scope = document.getElementById('btn-chang-scope');
const popup_change_scope = document.getElementById('popup-change-scope');
const close_popup_change_scope = document.getElementById('close-popup-change-scope');
const select_private = document.getElementById('select-private');
const select_public = document.getElementById('select-public');
btn_chang_scope.addEventListener('click', () => {
    popup_change_scope.style.display = 'block';
});

close_popup_change_scope.addEventListener('click', () => {
    popup_change_scope.style.display = 'none';
});

select_private.addEventListener('click', () => {
    const form = createForm('POST', `/workplace/updatescope/${workplaceId}`);
    const type = createInputWithValue("PRIVATE", 'type');
    form.appendChild(type);
    document.body.appendChild(form);
    form.submit();
});

select_public.addEventListener('click', () => {
    const form = createForm('POST', `/workplace/updatescope/${workplaceId}`);
    const type = createInputWithValue("PUBLIC", 'type');
    form.appendChild(type);
    document.body.appendChild(form);
    form.submit();
});


//remove workplace
const btn_remove_workplace = document.getElementById('btn-remove-workplace');
btn_remove_workplace.addEventListener('click', () => {

});
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

// Create table form
const inputTableBackground = document.querySelector('.input-background') || null;
if (inputTableBackground) {
    inputTableBackground.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const type = file.type.split('/')[1];
        if (type !== 'jpg' && type !== 'png' && type !== 'jpeg') alert("Bạn phải chỉ có thể tải lên ảnh định dạng png hoặc jpg");
        else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                const url = fileReader.result;
                const img = document.getElementById(`input-table-background-image`);
                img.src = url;
                img.style.display = "block";
            };


        }
    });
};

const closeForm = document.querySelector('#close-form');
const formElement = document.querySelector('.add-table-form');
const createTable = document.querySelector('.create-table');
closeForm.addEventListener('click', () => {
    formElement.style.display = 'none';
});

createTable.addEventListener('click', () => {
    formElement.style.display = 'block';
});


// Add favorite table
const favorite = document.querySelectorAll('.add-favorite, .favorite');

favorite.forEach((item, index) => {
    item.addEventListener('click', e => {
        e.preventDefault();
        let id = item.id;
        id = id.split('-')[1];
        let form = null;
        if (item.getAttribute('class') == 'favorite') {
            item.setAttribute('class', 'add-favorite');
            item.firstElementChild.setAttribute('src', "../../public/img/boards/icon/star.svg");
            form = createForm('POST', '/api/table/favorite/remove');
        } else {
            item.setAttribute('class', 'favorite');
            item.firstElementChild.setAttribute('src', "../../public/img/boards/icon/starFull.svg");
            form = createForm('POST', '/api/table/favorite/add');
        }
        const input = createInputWithValue(id, 'tableId');
        const type = createInputWithValue("workplace", 'type');
        const workplId = createInputWithValue(workplaceId, 'workplaceId');
        form.appendChild(input);
        form.appendChild(type);
        form.appendChild(workplId);
        document.body.appendChild(form);
        form.submit();
    });
});

// Update workplace img
const inputavatarworkplace = document.querySelector('.input-logo') || null;
if (inputavatarworkplace) {
    inputavatarworkplace.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const type = file.type.split('/')[1];
        if (type !== 'jpg' && type !== 'png' && type !== 'jpeg') alert("Bạn phải chỉ có thể tải lên ảnh định dạng png hoặc jpg");
        else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                const url = fileReader.result;
                const img = document.getElementById(`input-logo-image`);
                img.src = url;
                img.style.display = "block";
            };


        }
    });
};

const close_update_logo_form = document.querySelector('#close-update-logo-form');
const form_update_logo = document.querySelector('.update-logo');
const img_btn = document.querySelector('.img-btn');

close_update_logo_form.addEventListener('click', () => {
    form_update_logo.style.display = 'none';
});

img_btn.addEventListener('click', () => {
    form_update_logo.style.display = 'block';
});


// Update workplace
const modal = document.getElementById('create-workplace-modal');
const closeModal = document.getElementById('close-modal');
const addWorkplaceIcon = document.getElementById('add-workplace-icon');
const btnModalContinue = document.getElementById('btn-create-modal-info');
const createWpInfo = document.querySelector('.create-workplace-info');
const addWpMembers = document.querySelector('.create-modal-add-members');
const backElement = document.getElementById('back');
const formCreate = document.getElementById('form-workplace');
const btn_update_workplace = document.getElementById('btn-chinh-sua-khong-gian-lam-viec');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

btn_update_workplace.addEventListener('click', () => {
    modal.style.display = 'block';
    createWpInfo.style.display = 'block';
});

// btnModalContinue.addEventListener('click', (e) => {
//     const workplaceName = document.getElementById('input-workplace-name');
//     const workplaceCategory = document.getElementById('input-workplace-category');
//     const workplaceDescription = document.getElementById('input-workplace-description');

//     formCreate.appendChild(createInputWithValue(workplaceName.value, 'workplaceName'));
//     formCreate.appendChild(createInputWithValue(workplaceCategory.value, 'workplaceCategory'));
//     formCreate.appendChild(createInputWithValue(workplaceDescription.value, 'workplaceDescription'));

//     createWpInfo.style.display = 'none';
//     addWpMembers.style.display = 'block';
// });

// backElement.addEventListener('click', () => {
//     createWpInfo.style.display = 'block';
//     addWpMembers.style.display = 'none';
// });