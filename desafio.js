function corrigirCaracteres(json) {
	// Substitui os caracteres "æ" por "a" e "ø" por "o" na propriedade "nome"
	json.forEach(veiculo => {
		veiculo.nome = veiculo.nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
	});
	json.forEach(veiculo => {
		veiculo.vendas = parseInt(veiculo.vendas);
	});

	return json;
}

function corrigirMarca(json) {
	// Substitui os caracteres "æ" por "a" e "ø" por "o" na propriedade "nome"
	json.forEach(veiculo => {
		veiculo.marca = veiculo.marca.replace(/æ/g, 'a').replace(/ø/g, 'o');
	});

	return json;
}

document.addEventListener("DOMContentLoaded", function () {
	let divDados = document.querySelector("#dados");

	fetch('broken_database_1.json')
		.then(response => response.json())
		.then(data => {
			const json = corrigirCaracteres(data);
			let jsonDados = JSON.stringify(json);
			divDados.innerHTML = jsonDados;
		})
		.catch(error => console.error(error));

	let divMarca = document.querySelector("#marca");

	fetch('broken_database_2.json')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			const json = corrigirMarca(data);
			let jsonMarca = JSON.stringify(json);
			divMarca.innerHTML = jsonMarca;
		})
		.catch(error => console.error(error));
});

function download(jsonDados, database_corrigido, json) {
    const file = new Blob([jsonDados], {type: json});
    
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, database_corrigido);
        return
    }
    
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
        
    a.href = url;
    a.download = database_corrigido;
    
    document.body.appendChild(a);
    
    a.click();
    
    setTimeout(function() {
       document.body.removeChild(a);
       window.URL.revokeObjectURL(url);  
    },0); 
}