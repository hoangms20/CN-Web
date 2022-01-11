document.addEventListener('DOMContentLoaded', function () {
	const avatar = document.getElementById('avatar')
	const settingUser = document.getElementById('setting-user')
	avatar &&
		avatar.addEventListener('click', function () {
			settingUser.classList.toggle('setting-user-active')
		})

	const modelCreateTable = document.getElementById('model-create-new')
	const ToogleModel = document.getElementById('toogle-model')
	const closeModel = document.getElementById('close-model-create')

	ToogleModel &&
		ToogleModel.addEventListener('click', function () {
			modelCreateTable.classList.add('model-create-new-active')
		})

	closeModel &&
		closeModel.addEventListener('click', function () {
			modelCreateTable.classList.remove('model-create-new-active')
		})
})

document.getElementById('logo').addEventListener('click', () => {
	window.open('/', '_self');
});