window.onload = () => {
    document.getElementById("form_cadastrar").addEventListener("submit", async (event) => {
        event.preventDefault();

        let nome_usuario_cadastrar = document.getElementById("username_cadastrar").value;
        let senha_usuario_cadastrar = document.getElementById("password_cadastrar").value;

        try {
            const resposta = await cadastrarUsuario(nome_usuario_cadastrar, senha_usuario_cadastrar);
            if (resposta.status >= 300) {
                alert(resposta.message);
            } else {
                alert("Usuário cadastrado com sucesso!");
                window.location.href = "./../../../src/crud/clientes.html";
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Ocorreu um erro ao cadastrar o usuário.");
        }
    });
};

async function cadastrarUsuario(username, password) {
    const resposta = await fetch("http://localhost/api-php/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const data = await resposta.json();
    return data;
}
