const inputAvatar = document.getElementById('input-avatar');
const form = document.getElementById('form-profile');
const save = document.querySelector('.btn-update-user');

if (inputAvatar) {
    inputAvatar.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const type = file.type.split('/')[1];
            if (type !== 'jpg' && type !== 'png' && type !== 'jpeg') alert("Bạn phải chỉ có thể tải lên ảnh định dạng png hoặc jpg");
            else {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
        
                fileReader.onload = () => {
                    const url = fileReader.result;
                    const img = document.querySelector('.img-avatar');
                    img.src = url;
                };
            }
        });
};

const avatar = document.querySelector('.img-avatar');
avatar.addEventListener('click', () => {
    const url = avatar.src;
    window.open(url);
});