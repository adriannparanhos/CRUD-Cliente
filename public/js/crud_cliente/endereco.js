window.onload = async ()=> {
    await popularTabelaClientes();

    document.getElementById("adicionar_endereco").addEventListener("submit",
    async  (event)=> {
        event.preventDefault()
        let id = document.getElementById("id_cliente_endereco").value;

        console.log(id);

        let cep = document.getElementById("cep").value;
        let rua = document.getElementById("rua").value;
        let cidade = document.getElementById("cidade").value;
        let estado = document.getElementById("estado").value;

        await editarCliente(cep, rua, cidade, estado);
        window.location.reload();
    })

}