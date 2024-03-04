var host = "http://localhost/api-php";

//rotas usuario
async function login (username, password) {
    
    const resposta = await fetch(`${host}/users/login`, {
        method : "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify({
            "username": username,
            "password": password
        })
        
    })

    const data = await resposta.json();
    return data;
}


// rotas clientes
async function clientes () {
    const resposta = await fetch(`${host}/client`, {
        method : "GET",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        }
    })

    const data = await resposta.json();
    return data;
}

async function address () {
    const resposta = await fetch(`${host}/address`, {
        method : "GET",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        }
    })

    const data = await resposta.json();
    return data;
}

async function listarClientesId (id) {
    const resposta = await fetch(`${host}/client/${id}`, {
        method : "GET",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        }
    })

    const data = await resposta.json();
    return data;
}

async function listarEnderecosId (id) {
    const resposta = await fetch(`${host}/address/${id}`, {
        method : "GET",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        }
    })

    const data = await resposta.json();
    return data;
}

async function cadastrarClientes (nome, data_nascimento, cpf, rg, telefone, cep, rua, cidade, estado ) {
    const resposta = await fetch(`${host}/client`, {
        method : "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        },
        body : JSON.stringify({
            'nome': nome,
            'data_nascimento': data_nascimento,
            'cpf': cpf,
            'rg': rg,
            'telefone': telefone,
            'cep': cep,
            'rua': rua,
            'cidade': cidade,
            'estado': estado
        }) 
    })

    const data = await resposta.json();
    return data;
}

async function cadastrarEndereco (cep, rua, cidade, estado ) {
    const resposta = await fetch(`${host}/address`, {
        method : "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        },
        body : JSON.stringify({
            'cep': cep,
            'rua': rua,
            'cidade': cidade,
            'estado': estado
        }) 
    })

    const data = await resposta.json();
    return data;
}


async function excluirCliente (id) {
    const resposta = await fetch(`${host}/client/${id}`, {
        method : "DELETE",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        }
    })

    const data = await resposta.json();
    return data;
}

async function editarCliente (id, nome, data_nascimento, cpf, rg, telefone, cep, rua, estado, cidade, id_endereco) {
    const resposta = await fetch(`${host}/client/${id}`, {
        method : "PUT",
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${recuperarStorage("UsuarioLogado").token}`
        },
        body : JSON.stringify({
            'nome': nome,
            'data_nascimento': data_nascimento,
            'cpf': cpf,
            'rg': rg,
            'telefone': telefone,
            'cep': cep,
            'rua': rua,
            'estado': estado,
            'cidade': cidade,
            'id_endereco': id_endereco
        })
    })

    const data = await resposta.json();
    return data;
}





