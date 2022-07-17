const output = document.querySelector('#output');
const USER_DATA = localStorage.getItem('userData');
const group_id = localStorage.getItem('groupId');
const groupId = JSON.parse(group_id);
const userId = JSON.parse(USER_DATA).user.id;

// first page show that group bills
const groupBills = async () => {
	try {
		const response = await fetch(
			`http://localhost:8080/api/bills/${groupId}`,
			{
				headers: {
					Authorization: `Bearer ${JSON.parse(USER_DATA).token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return await response.json();
	} catch (err) {
		location.replace('../login/login.html');
		console.log(err);
	}
};
const displayBills = (data) => {
	data.forEach((bill) => {
		const table = document.querySelector('.tableOutput');
		const tableRow = document.createElement('tr');
		const id = document.createElement('td');
		const description = document.createElement('td');
		const amount = document.createElement('td');
		id.textContent = bill.id;
		description.textContent = bill.description;
		amount.textContent = ` € ${bill.amount}`;
		tableRow.append(id, description, amount);
		table.append(tableRow);
	});
};
const main = async () => {
	const data = await groupBills();
	displayBills(data);
};
main();
// bill post to bill lentele
const addBill = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/bills', {
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
		group_id: groupId,
		amount: event.target.elements.amount.value,
		description: event.target.elements.description.value,
	};
	await addBill(data);
	location.reload();
});
//-------------------------------------------------------------------------------------
