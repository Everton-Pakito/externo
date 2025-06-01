let cicloData = {
    frota: null,
    configuracao: null,
    marcaModelo: null,
    odometroInicial: null,
    saidaBalancaVazio: null,
    despacho: null,
    chegadaBatedor: null,
    tipoCarregamento: null,
    saidaBatedor: null,
    chegadaBalanca: null,
    odometroFinal: null
};

// Função para registrar data e hora nos campos de botão
function registrarDataHora(campo) {
    let dataHoraAtual = new Date().toLocaleString();
    document.getElementById(campo).innerText = `Registrado: ${dataHoraAtual}`;
    cicloData[campo] = dataHoraAtual;
    document.getElementById(campo).disabled = true;
}

// Enviar dados para o Google Sheets
function enviarDados() {
    cicloData.frota = document.getElementById('frota').value;
    cicloData.configuracao = document.getElementById('configuracao').value;
    cicloData.marcaModelo = document.getElementById('marcaModelo').value;
    cicloData.odometroInicial = document.getElementById('odometroInicial').value;
    cicloData.despacho = document.getElementById('despacho').value;
    cicloData.tipoCarregamento = document.getElementById('tipoCarregamento').value;
    cicloData.odometroFinal = document.getElementById('odometroFinal').value;

    // Enviar os dados para o Google Sheets
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
    })
    .catch(error => alert('Erro ao enviar dados: ' + error));
}

// Iniciar um novo ciclo (limpar os dados do formulário)
function iniciarNovo() {
    document.getElementById('ciclo-form').reset();
    cicloData = {
        frota: null,
        configuracao: null,
        marcaModelo: null,
        odometroInicial: null,
        saidaBalancaVazio: null,
        despacho: null,
        chegadaBatedor: null,
        tipoCarregamento: null,
        saidaBatedor: null,
        chegadaBalanca: null,
        odometroFinal: null
    };

    // Reabilitar os botões
    document.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
}