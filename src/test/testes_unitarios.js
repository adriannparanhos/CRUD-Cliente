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


const { popularTabelaClientes, deletarCliente, editar_os_clientes } = require('../../public/js/crud_cliente/cliente.js');

test('popularTabelaClientes preenche corretamente a tabela', async () => {
  const mockClientes = {
    status: 'OK',
    resultado: [
      { nome: 'João', cpf: '123456789', rg: '987654321', data_nascimento: '01/01/1990', telefone: '123456789', cep: '12345678', rua: 'Rua A', cidade: 'Cidade A', estado: 'Estado A' },
      { nome: 'Maria', cpf: '987654321', rg: '123456789', data_nascimento: '02/02/1990', telefone: '987654321', cep: '87654321', rua: 'Rua B', cidade: 'Cidade B', estado: 'Estado B' }
    ]
  };

  global.clientes = jest.fn().mockResolvedValue(mockClientes);

  document.body.innerHTML = '<table id="tabela_clientes"><tbody></tbody></table>';

  await popularTabelaClientes();

  expect(document.querySelectorAll('#tabela_clientes tbody tr').length).toBe(mockClientes.resultado.length);

    const mockCliente = {
        status: 'OK',
        resultado: [
            { id: 1, id_endereco: 1, nome: 'João', cpf: '123456789', rg: '987654321', data_nascimento: '01/01/1990', telefone: '123456789', cep: '12345678', rua: 'Rua A', cidade: 'Cidade A', estado: 'Estado A' }
        ]
    };

    const mockExcluirCliente = {
        status: 200,
        msg: 'Cliente excluído com sucesso.'
    };

    const mockEditarCliente = {
        status: 200,
        msg: 'Cliente editado com sucesso.'
    };

    describe('Testes das funções do arquivo', () => {
        test('popularTabelaClientes preenche corretamente a tabela', async () => {
            global.clientes = jest.fn().mockResolvedValue(mockClientes);

            document.body.innerHTML = '<table id="tabela_clientes"><tbody></tbody></table>';

            await popularTabelaClientes();

            expect(document.querySelectorAll('#tabela_clientes tbody tr').length).toBe(mockClientes.resultado.length);
        });

        test('deletarCliente exclui corretamente o cliente', async () => {
            global.excluirCliente = jest.fn().mockResolvedValue(mockExcluirCliente);

            window.location.reload = jest.fn();

            await deletarCliente(1);

            expect(window.location.reload).toHaveBeenCalledTimes(1);
        });

        test('editar_os_clientes preenche corretamente o formulário de edição', async () => {
            global.listarClientesId = jest.fn().mockResolvedValue(mockCliente);

            document.body.innerHTML = `
                <form id="editar_cliente">
                    <input id="cliente_id" value="">
                    <input id="id_endereco" value="">
                    <input id="nome_edit" value="">
                    <input id="cpf_edit" value="">
                    <input id="rg_edit" value="">
                    <input id="data_nascimento_edit" value="">
                    <input id="telefone_edit" value="">
                    <input id="cep_edit" value="">
                    <input id="rua_edit" value="">
                    <input id="estado_edit" value="">
                    <input id="cidade_edit" value="">
                    <div id="container_editar_cliente"></div>
                </form>
            `;

            await editar_os_clientes(1);

            expect(document.getElementById("cliente_id").value).toBe('1');
            expect(document.getElementById("id_endereco").value).toBe('1');
            expect(document.getElementById("nome_edit").value).toBe('João');
        });
    });

    
});
