window.onload = () => {
    document.getElementById("form_login").addEventListener("submit", fazerLogin);
    async function fazerLogin(event) {
        console.log(event);
        event.preventDefault();
        
        let nome_usuario = document.getElementById("username").value;
        let senha_usuario = document.getElementById("password").value;

        try {
            const resposta = await login(nome_usuario, senha_usuario);
            if (resposta.status >= 300) {
                alert(resposta.message);
            } else {
                salvarStorage("UsuarioLogado", resposta["resultado"]);
                window.location.href = "./../../../src/crud/clientes.html";
            }
        } catch (error) {
            alert("Erro ao fazer login");
        }
    }
};
