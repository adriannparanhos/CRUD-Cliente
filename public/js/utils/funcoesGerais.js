function recuperarStorage(nome) {
    const dados = localStorage.getItem(nome);

    if (dados) {
        return JSON.parse(dados);
    }  else {
        return null;
    }
}

function salvarStorage(nome, dados) {
    localStorage.setItem(nome, JSON.stringify(dados));
}
