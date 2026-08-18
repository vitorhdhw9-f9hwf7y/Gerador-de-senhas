// =========================================================
// PASSWORD GENERATOR
// Windows 98 / SpaceHey Style
// =========================================================


// =========================================================
// ELEMENTOS DA PÁGINA
// =========================================================

const numeroSenha = document.querySelector(
    '.parametro-senha__texto'
);

const botoes = document.querySelectorAll(
    '.parametro-senha__botao'
);

const campoSenha = document.querySelector(
    '#campo-senha'
);

const checkbox = document.querySelectorAll(
    '.checkbox'
);

const forcaSenha = document.querySelector(
    '.forca'
);

const valorEntropia = document.querySelector(
    '.entropia'
);


// =========================================================
// CONFIGURAÇÕES
// =========================================================

let tamanhoSenha = 12;

const letrasMaiusculas =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas =
    'abcdefghijklmnopqrstuvwxyz';

const numeros =
    '0123456789';

const simbolos =
    '!@#$%*?&';


// =========================================================
// INICIALIZAÇÃO
// =========================================================

numeroSenha.textContent = tamanhoSenha;


// Botão -

botoes[0].addEventListener(
    'click',
    diminuiTamanho
);


// Botão +

botoes[1].addEventListener(
    'click',
    aumentaTamanho
);


// =========================================================
// ALTERAR TAMANHO DA SENHA
// =========================================================

function diminuiTamanho() {

    if (tamanhoSenha > 1) {

        tamanhoSenha--;

    }

    numeroSenha.textContent =
        tamanhoSenha;

    geraSenha();
}


function aumentaTamanho() {

    if (tamanhoSenha < 20) {

        tamanhoSenha++;

    }

    numeroSenha.textContent =
        tamanhoSenha;

    geraSenha();
}


// =========================================================
// CHECKBOXES
// =========================================================

for (
    let i = 0;
    i < checkbox.length;
    i++
) {

    checkbox[i].addEventListener(
        'change',
        geraSenha
    );

}


// =========================================================
// GERAR SENHA
// =========================================================

function geraSenha() {

    let alfabeto = '';


    // Letras maiúsculas

    if (checkbox[0].checked) {

        alfabeto += letrasMaiusculas;

    }


    // Letras minúsculas

    if (checkbox[1].checked) {

        alfabeto += letrasMinusculas;

    }


    // Números

    if (checkbox[2].checked) {

        alfabeto += numeros;

    }


    // Símbolos

    if (checkbox[3].checked) {

        alfabeto += simbolos;

    }


    // =====================================================
    // NENHUMA OPÇÃO SELECIONADA
    // =====================================================

    if (alfabeto.length === 0) {

        campoSenha.value =
            'Selecione uma opção';

        forcaSenha.classList.remove(
            'fraca',
            'media',
            'forte'
        );

        forcaSenha.style.width = '0%';

        valorEntropia.textContent =
            'Escolha pelo menos um tipo de caractere.';

        return;
    }


    // =====================================================
    // CRIAÇÃO DA SENHA
    // =====================================================

    let senha = '';


    for (
        let i = 0;
        i < tamanhoSenha;
        i++
    ) {

        const numeroAleatorio =
            Math.floor(
                Math.random() *
                alfabeto.length
            );


        senha +=
            alfabeto[numeroAleatorio];

    }


    // Coloca a senha no campo

    campoSenha.value = senha;


    // =====================================================
    // VERIFICA A FORÇA
    // =====================================================

    classificaSenha(
        alfabeto.length
    );

}


// =========================================================
// CLASSIFICAÇÃO DA SENHA
// =========================================================

function classificaSenha(
    tamanhoAlfabeto
) {


    // =====================================================
    // CÁLCULO DA ENTROPIA
    // =====================================================

    const entropia =
        tamanhoSenha *
        Math.log2(tamanhoAlfabeto);


    // Remove classes anteriores

    forcaSenha.classList.remove(
        'fraca',
        'media',
        'forte'
    );


    // =====================================================
    // DEFINIÇÃO DA FORÇA
    // =====================================================

    if (entropia > 57) {

        forcaSenha.classList.add(
            'forte'
        );

    }

    else if (entropia > 35) {

        forcaSenha.classList.add(
            'media'
        );

    }

    else {

        forcaSenha.classList.add(
            'fraca'
        );

    }


    // =====================================================
    // ESTIMATIVA DE TEMPO
    // =====================================================

    /*
       Esta é apenas uma estimativa didática.

       Consideramos aproximadamente
       100 milhões de tentativas por segundo.
    */

    const tentativas =
        Math.pow(
            2,
            entropia
        );


    const tentativasPorSegundo =
        100000000;


    const segundos =
        tentativas /
        tentativasPorSegundo;


    const segundosPorDia =
        60 * 60 * 24;


    const dias =
        segundos /
        segundosPorDia;


    // =====================================================
    // TEXTO DA ENTROPIA
    // =====================================================

    if (dias < 1) {

        valorEntropia.textContent =
            'Senha extremamente fraca! ' +
            'Pode ser quebrada rapidamente.';

    }

    else if (dias < 365) {

        const diasFormatados =
            Math.floor(dias);

        valorEntropia.textContent =
            `Estimativa: ${diasFormatados} ` +
            `dias para quebrar esta senha.`;

    }

    else {

        const anos =
            Math.floor(
                dias / 365
            );


        if (anos < 1000) {

            valorEntropia.textContent =
                `Estimativa: ${anos} ` +
                `anos para quebrar esta senha.`;

        }

        else {

            const milhares =
                Math.floor(
                    anos / 1000
                );


            valorEntropia.textContent =
                `Estimativa: mais de ` +
                `${milhares} mil anos ` +
                `para quebrar esta senha.`;

        }

    }

}


// =========================================================
// GERAR A PRIMEIRA SENHA
// =========================================================

geraSenha();