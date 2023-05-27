const url = 'https://covid-193.p.rapidapi.com/countries';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c84be96a26msh78160e43ee57983p137202jsn34f450015272',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

let buttonGetData = document.getElementById('btn-get')
buttonGetData.addEventListener('click', function(event){
	event.preventDefault()
	let inputCountry = document.getElementById('input-country')
	let countryName = inputCountry.value
	let inputDate = document.getElementById('input-date')
	let date = inputDate.value
	if(countryName == "" && date == "" ){
		swal.fire('Please input country and date')
	} else if(countryName == ""){
		alert('Country is required')
	} else if (date == ""){
		alert('Date is required')
	} else {
		fetch(`https://covid-193.p.rapidapi.com/history?country=${countryName}&day=${date}`, options)
		.then(response => response.json())
		.then(response => {
			document.getElementById('text-active').innerHTML = response['response'][0]['cases']['active']
			document.getElementById('text-new').innerHTML = response['response'][0]['cases']['new']
			document.getElementById('text-recover').innerHTML = response['response'][0]['cases']['recovered']
			document.getElementById('text-totcases').innerHTML = response['response'][0]['cases']['total']
			document.getElementById('text-deaths').innerHTML = response['response'][0]['deaths']['total']
			document.getElementById('text-tests').innerHTML = response['response'][0]['tests']['total']
		})
		.catch(err => swal.fire({
            title: 'No results found!',
            imageUrl: 'https://img.freepik.com/premium-vector/earth-mascot-character-against-coronavirus_162048-79.jpg?w=2000',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image'}));
	}
})
