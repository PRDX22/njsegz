const output = document.querySelector('#output');
const USER_DATA = localStorage.getItem('userData');
const userId = JSON.parse(USER_DATA).user.id;

// ADD group to a logged user --------------------------------------------------------------
const addGroup = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/accounts', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${JSON.parse(USER_DATA).token}`,
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
	const data = {
		group_id: event.target.elements.groupId.value,
	};
	await addGroup(data);
	location.reload();
});
//-------------------------------------------------------------------------------------

// first page show groups that belong to logged user
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
		// issaugom on click localstorage group_id
		div.addEventListener('click', async () => {
			localStorage.removeItem('groupId');
			localStorage.setItem('groupId', element.group_id);
			location.replace('../bills/bills.html');
		});
	});
}
const main = async () => {
	const data = await userGroups();
	displayGroup(data);
};
main();

//--- Mygroups button
document.getElementById('myGroups').addEventListener('click', async (event) => {
	location.replace('../groups/groups.html');
});
