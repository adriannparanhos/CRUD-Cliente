const { fazerLogin } = require('../../public/js/autenticacao/login');


jest.mock('./caminho/do/arquivo/com/as/funcoes', () => ({
    login: jest.fn().mockReturnValue({ status: 200, resultado: 'Usuário logado' }),
    salvarStorage: jest.fn(),
}));

test('Teste de fazer login', async () => {
    const event = {
        preventDefault: jest.fn(),
    };

    await fazerLogin(event);

    expect(event.preventDefault).toHaveBeenCalled();

    expect(login).toHaveBeenCalledWith('nome_de_usuario', 'senha_de_usuario');

    expect(salvarStorage).toHaveBeenCalledWith('UsuarioLogado', 'Usuário logado');

    expect(window.location.href).toBe('./../../../src/crud/clientes.html');

});

test('Teste de cadastro de usuário', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ status: 200, message: 'Usuário cadastrado com sucesso!' })
        })
    );

    const event = {
        preventDefault: jest.fn(),
    };

    await handleCadastro(event);

    expect(event.preventDefault).toHaveBeenCalled();

    expect(fetch).toHaveBeenCalledWith("http://localhost/api-php/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: 'nome_de_usuario',
            password: 'senha_de_usuario'
        })
    });

    expect(window.location.href).toBe('./../../../src/crud/clientes.html');
});
