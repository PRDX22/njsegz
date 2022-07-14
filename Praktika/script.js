const output = document.querySelector('.main');
async function onFetch() {
	try {
		const resp = await fetch('https://radial-reinvented-shoe.glitch.me', {
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await resp.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

function displayProp(prop) {
	prop.forEach((element) => {
		const imgEl = document.createElement('img');
		const price = document.createElement('h3');
		const city = document.createElement('p');
		const description = document.createElement('p');
		imgEl.src = element.image;
		price.textContent = `$  ${element.price}`;
		city.textContent = `${element.city}`;
		description.textContent = `${element.description}`;
		output.append(imgEl, price, city, description);
		// console.log(prop);
	});
}

const main = async () => {
	const data = await onFetch();
	displayProp(data);
};
main();

document
	.getElementById('addPro')
	.addEventListener('click', () => location.replace('./add.html'));

document.getElementById('vilnius').addEventListener('click', async (event) => {
	event.preventDefault();
	output.innerHTML = '';
	const data = await onFetch();
	const newArray = [];
	filterLoop(data);
	function filterLoop(array) {
		array.forEach((element) => {
			if (element.city === 'Vilnius') {
				newArray.push(element);
			}
		});
	}
	if (newArray.length === 0) {
		output.textContent = 'Siam mieste hatku neturime';
	} else {
		displayProp(newArray);
	}
});

document.getElementById('kaunas').addEventListener('click', async (event) => {
	event.preventDefault();
	output.innerHTML = '';
	const data = await onFetch();
	const newArray = [];
	filterLoop(data);
	function filterLoop(array) {
		array.forEach((element) => {
			if (element.city === 'Kaunas') {
				newArray.push(element);
			}
		});
	}
	if (newArray.length === 0) {
		output.textContent = 'Siam mieste hatku neturime';
	} else {
		displayProp(newArray);
	}
});

document.getElementById('klaipeda').addEventListener('click', async (event) => {
	event.preventDefault();
	output.innerHTML = '';
	const data = await onFetch();
	const newArray = [];
	filterLoop(data);
	function filterLoop(array) {
		array.forEach((element) => {
			if (element.city === 'Klaipeda') {
				newArray.push(element);
			}
		});
	}
	if (newArray.length === 0) {
		output.textContent = 'Siam mieste hatku neturime';
	} else {
		displayProp(newArray);
	}
});

// vienas eventlisetner
// const buttonContainer = document.querySelector('.button_container');
// document.addEventListener('click', (event) => {
// 	if (event.target.matches('button')) {
// 		console.log('paspaudziau buttona');
// if (event.target.textContent === 'Pirmas') {  // cia reikia tikrinti pagal ID arba name arba dar pagal kazka
// 			console.log('pirmas buttonas');
// 		}
// 	}
// });
