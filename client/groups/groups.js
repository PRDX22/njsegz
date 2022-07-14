const output = document.querySelector('#output');
const USER_DATA = localStorage.getItem('userData');
const userId = JSON.parse(USER_DATA).user.id;

const allGroups = async () => {
	try {
		const response = await fetch('http://localhost:8080/api/groups', {
			headers: {
				Authorization: `Bearer ${JSON.parse(USER_DATA).token}`,
			},
		});
		return await response.json();
	} catch (err) {
		location.replace('../login/login.html');
		console.log(err);
	}
};

const userGroups = async () => {
	try {
		const response = await fetch(
			`http://localhost:8080/api/accounts?userId=${userId}`,
			{
				headers: {
					Authorization: `Bearer ${JSON.parse(USER_DATA).token}`,
				},
			}
		);
		return await response.json();
	} catch (err) {
		location.replace('../login/login.html');
		console.log(err);
	}
};

function displayGroup(group) {
	group.forEach((element) => {
		const div = document.createElement('div');
		const id = document.createElement('h2');
		const name = document.createElement('p');
		id.textContent = `ID  ${element.group_id}`;
		name.textContent = `${element.name}`;
		div.append(id, name);
		output.append(div);
		// cia bus nukreipimas i vidu grupes su FETCH pagalba (neturiu dar route pruosto)
		// output.addEventListener('click', async () => {
		// 	const data = await deleteProd(el.id);
		// 	console.log(data);
		// 	// console.log(el);
		// 	if (data.msg) {
		// 		div.remove();
		// 		alert('Produktas istrintas.');
		// 	} else {
		// 		alert('Kortelė neistrinta. Klaida');
		// 	}
		// });
	});
}

const main = async () => {
	const data = await userGroups();
	displayGroup(data);
};
main();
