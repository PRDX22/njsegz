document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
	const propData = {
		image: event.target.elements.addImg.value,
		city: event.target.elements.addCity.value,
		price: +event.target.elements.addNum.value,
		description: event.target.elements.addDesc.value,
	};
	const onPost = async () => {
		try {
			const response = await fetch(
				'https://radial-reinvented-shoe.glitch.me',
				{
					method: 'POST',
					body: JSON.stringify(propData),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			// const divEl = document.createElement('div');
			// divEl.textContent = data.error || data.msg;
			// document.body.append(divEl);
			console.log('Mano data: ', data);
		} catch (err) {
			console.log(err);
		}
	};
	onPost(propData);
	console.log(propData);
});
