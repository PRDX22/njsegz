// const { password } = require('../../server/src/middleware/config');

const createUser = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const user = await response.json();
		return user;
	} catch (err) {
		console.log(err);
	}
};

document.querySelector('form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const fullName = event.target.elements.fullName.value;
	const email = event.target.elements.email.value;
	const password = event.target.elements.password.value;
	const password2 = event.target.elements.password2.value;
	if (!fullName || !password || !email || !password2) {
		alert('Truksta duomenu!');
	} else if (password !== password2) {
		alert('Password ne vienodas !');
	}
	const data = {
		full_name: fullName,
		email,
		password,
	};
	const user = await createUser(data);
	if (user.response.insertId) {
		location.replace('../login/login.html');
	} else {
		alert('User is not created!');
	}
});
