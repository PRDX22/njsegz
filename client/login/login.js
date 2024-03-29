const getUser = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/login', {
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
	localStorage.clear();
	const data = {
		email: event.target.elements.email.value,
		password: event.target.elements.password.value,
	};
	if (!data.email || !data.password) return;

	const { token, user } = await getUser(data);
	if (token) {
		localStorage.setItem(
			'userData',
			JSON.stringify({ token: token, user })
		);
		location.replace('../groups/groups.html');
	} else {
		alert('Email or password is incorrect !');
	}
});
