function alterarTabela() {
    var opcao = document.querySelector('input[name="opcao"]:checked').value;
    var tabela = document.getElementById("tabela");

    // Limpa a tabela
    tabela.innerHTML = '';
    fetch(`./${opcao}.html`) // Faz uma solicitação HTTP para obter o conteúdo do arquivo
    .then(response => response.text()) // Converte a resposta em texto
    .then(html => {
        tabela.innerHTML = html; // Coloca o conteúdo na div
    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo:', error);
    });
}

// Adiciona um listener de evento para cada botão de rádio
var radios = document.querySelectorAll('input[name="opcao"]');
radios.forEach(function (radio) {
    radio.addEventListener('change', alterarTabela);
});

// Inicializa a tabela com base na opção selecionada inicialmente
alterarTabela();

document.getElementById('gerarPDF').addEventListener('click', function () {
    // Captura o conteúdo da tabela
    var tabela = document.getElementsByTagName('table')[0];
    window.jsPDF = window.jspdf.jsPDF;

    // Cria um novo documento PDF com as dimensões desejadas (11cm x 17cm)
    var doc = new jsPDF({
        orientation: 'portrait', // Orientação da página: 'portrait' (vertical) ou 'landscape' (horizontal)
        unit: 'cm',
        format: [11, 17] // Tamanho da página
    });


    var margin = 0.5;
    var scale = (doc.internal.pageSize.width - margin * 2) / tabela.offsetWidth

    doc.html(tabela, {
 
        x:margin,
        y:margin,

        html2canvas: {
            scale: scale },
        callback: function (doc) {
            doc.output('dataurlnewwindow', { filename: 'pdf.pdf' });
        }
    });
    //doc.text("Hello world!", 1, 1);
    // Baixa o PDF

});

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const imageDataURL = reader.result;
        const imageElement = document.querySelector('.uploaded-image');
        imageElement.src = imageDataURL;
        imageElement.style.display = 'block';
    };

    reader.readAsDataURL(file);
}

function handleImageClick() {
    document.querySelector('#file').click();
}