window.onload = async ()=> {
    await popularTabelaClientes();
    document.getElementById("form_login_cliente").addEventListener("submit",
    async  (event)=> {
        event.preventDefault()

        let nome = document.getElementById("nome").value;
        let data_nascimento = document.getElementById("data_nascimento").value;
        let cpf = document.getElementById("cpf").value;
        let rg = document.getElementById("rg").value;
        let telefone = document.getElementById("telefone").value;
        let cep = document.getElementById("cep").value;
        let rua = document.getElementById("rua").value;
        let estado = document.getElementById("estado").value;
        let cidade = document.getElementById("cidade").value;



        await cadastrarClientes(nome, data_nascimento, cpf, rg, telefone, cep, rua, estado, cidade);
        window.location.reload();
        
    })

    document.getElementById("editar_cliente").addEventListener("submit",
    async  (event)=> {
        event.preventDefault()
        let id = document.getElementById("cliente_id").value;
        let id_endereco = document.getElementById("id_endereco").value;

        console.log(id);

        let nome = document.getElementById("nome_edit").value;
        let data_nascimento = document.getElementById("data_nascimento_edit").value;
        let cpf = document.getElementById("cpf_edit").value;
        let rg = document.getElementById("rg_edit").value;
        let telefone = document.getElementById("telefone_edit").value;
        let cep = document.getElementById("cep_edit").value;
        let rua = document.getElementById("rua_edit").value;
        let estado = document.getElementById("estado_edit").value;
        let cidade = document.getElementById("cidade_edit").value;

        console.log(cidade)

        await editarCliente(id, nome, data_nascimento, cpf, rg, telefone, cep, rua, estado, cidade, id_endereco);
        window.location.reload();
    })

}

async function popularTabelaClientes() {
    let tbody = document.querySelector("table#tabela_clientes tbody");
    tbody.innerHTML = ``;
    receber_clientes = await clientes()
    if (receber_clientes) {
        if (receber_clientes.status == "ERRO") {
            console.log(receber_clientes);
            alert(receber_clientes.mensagem);
        } else {
            receber_clientes.resultado.forEach(c => {
                tbody.innerHTML += `
                    <tr>
                        <td>${c["nome"]}</td> 
                        <td>${c["cpf"]}</td>
                        <td>${c["rg"]}</td>
                        <td>${c["data_nascimento"]}</td>
                        <td>${c["telefone"]}</td>
                        <td>${c["cep"]}</td>
                        <td>${c["rua"]}</td>
                        <td>${c["cidade"]}</td>
                        <td>${c["estado"]}</td>
                        <td><button onclick = "editar_os_clientes(${c["id"]})">Editar</button> 
                        <button onclick = "deletarCliente(${c['id']})">Excluir</button></td>
                    </tr>
                `;
            });

        }
    }
}

async function deletarCliente(id) {
    let deletar_os_clientes = await excluirCliente(id);

    if (deletar_os_clientes.status >= 300) {
        alert(deletar_os_clientes.message);
    } else {
        alert(deletar_os_clientes.msg);
        window.location.reload();
    }
    
}

async function editar_os_clientes(id) {
    let cliente = await listarClientesId(id);

    if (cliente.status ==  "ERRO") {
        alert(cliente.mensagem);
    } else {
        console.log("teste");
        document.getElementById("cliente_id").value = cliente.resultado[0]["id"];
        document.getElementById("id_endereco").value = cliente.resultado[0]["id_endereco"];
        document.getElementById("nome_edit").value = cliente.resultado[0]["nome"];
        document.getElementById("cpf_edit").value = cliente.resultado[0]["cpf"];
        document.getElementById("rg_edit").value = cliente.resultado[0]["rg"];
        document.getElementById("data_nascimento_edit").value = cliente.resultado[0]["data_nascimento"];
        document.getElementById("telefone_edit").value = cliente.resultado[0]["telefone"];
        
        document.getElementById("cep_edit").value = cliente.resultado[0]["cep"];
        document.getElementById("rua_edit").value = cliente.resultado[0]["rua"];
        document.getElementById("estado_edit").value = cliente.resultado[0]["estado"];
        document.getElementById("cidade_edit").value = cliente.resultado[0]["cidade"];
        document.getElementById("container_editar_cliente").style.display="flex";
    }
}

