<?php
        require_once("./models/Address.php");

    class ClientController {
        private $client;
    
        public function __construct($client) {
            $this->client = $client;
        }

        public function cadastrar($parametros) {
            $informacoesToken = validarToken();
            $parametrosPost = parametrosJson() + parametrosPost();
            if(!verificarParametrosObrigatorios($parametrosPost, ["nome", "data_nascimento", "cpf", "rg", "telefone"]));
            $nomeclient = $this->client->listarPorCpf($parametrosPost["cpf"]);
            if($nomeclient) outputError(404, "cliente ja existe");
            $client = $this->client->cadastrar($parametrosPost["nome"], $parametrosPost["data_nascimento"], $parametrosPost["cpf"], $parametrosPost["rg"], $parametrosPost["telefone"]);
            if(!$client) outputError(500, "Erro interno do servidor");
            $address = new Address();
            $outPut = $address->cadastrar($client[0]["id"], $parametrosPost["rua"], $parametrosPost["cidade"], $parametrosPost["estado"], $parametrosPost["cep"]);
            if (!$outPut) outputError(500, "Erro interno do servidor");
            output(200, "client cadastrado com sucesso", "OK", $client);
        }

        public function buscarTodos() {
            //$informacoesToken = validarToken();

            $client = $this->client->listarTodos();
            if(!$client) outputError(404, "cliente não encontrado");
            output(200, "clientes encontrados com sucesso", $client);
        }

        public function atualizar($parametros) {
            $informacoesToken = validarToken();
            $parametrosPost = parametrosJson() + parametrosPost();
            if(!verificarParametrosObrigatorios($parametrosPost, [ "nome", "data_nascimento", "cpf", "rg", "telefone", "cep", "rua", "cidade", "estado", "id_endereco"]));
            $client = $this->client->atualizar($parametrosPost["nome"], $parametrosPost["data_nascimento"], $parametrosPost["cpf"], $parametrosPost["rg"], $parametrosPost["telefone"], $parametros['id']);
            if(!$client) outputError(500, "Erro interno do servidor");
            $endereco = new Address();
            $endereco->atualizar($parametrosPost["rua"], $parametrosPost["cidade"], $parametrosPost["estado"], $parametrosPost["cep"], $parametrosPost['id_endereco']);
            output(200, "client atualizado com sucesso", "OK", $client);
        }

        public function deletar($parametros) {
            $informacoesToken = validarToken();
            $endereco = new Address();
            $endereco->deletarPorIdCliente($parametros['id']);
            $endereco->deletar($parametros['id']);

            $client = $this->client->deletar($parametros['id']);
            output(200, "cliente deletado com sucesso", "OK", $client);
        }

        public function buscarPorId($parametros) {

            $informacoesToken = validarToken();

            if(!verificarParametrosObrigatorios($parametros, ["id"]));

            $client = $this->client->buscarPorId($parametros["id"]);
            if(!$client) outputError(404, "cliente não encontrado");
            output(200, "cliente encontrado com sucesso", $client);
        }


    }