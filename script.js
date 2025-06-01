function validarFormulario() {
    // Verifica se os campos obrigatórios estão preenchidos
    const requiredFields = ['frota', 'odometroInicial', 'despacho', 'odometroFinal'];
    for (let field of requiredFields) {
        if (document.getElementById(field).value === '') {
            alert(`Por favor, preencha o campo: ${field}`);
            return false;
        }
    }
    return true;
}

function enviarDados() {
    if (!validarFormulario()) return;

    cicloData.frota = document.getElementById('frota').value;
    cicloData.configuracao = document.getElementById('configuracao').value;
    cicloData.marcaModelo = document.getElementById('marcaModelo').value;
    cicloData.odometroInicial = document.getElementById('odometroInicial').value;
    cicloData.despacho = document.getElementById('despacho').value;
    cicloData.tipoCarregamento = document.getElementById('tipoCarregamento').value;
    cicloData.odometroFinal = document.getElementById('odometroFinal').value;

    // Adiciona um feedback visual de carregamento
    document.getElementById('enviarDados').disabled = true;
    document.getElementById('enviarDados').innerText = "Enviando...";

    fetch('https://script.google.com/macros/s/AKfycbwblllxtzcxOxQJhXcSUFmFWxPGERXj3kGCMajepWVdhXDMdMRZI0G7dpz6A8LHsG_i/exec', {
        method: 'POST',
        body: JSON.stringify(cicloData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "sucesso") {
            alert('Dados enviados com sucesso!');
        } else {
            alert('Erro ao enviar dados: ' + data.message);
        }
        document.getElementById('enviarDados').disabled = false;
        document.getElementById('enviarDados').innerText = "Enviar Dados";
    })
    .catch(error => {
        alert('Erro ao enviar dados: ' + error);
        document.getElementById('enviarDados').disabled = false;
        document.getElementById('enviarDados').innerText = "Enviar Dados";
    });
}