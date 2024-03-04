<?php 

    require_once("./models/Client.php");

    class AddressController {
        private $address;
    
        public function __construct($address) {
            $this->address = $address;
        }

        public function cadastrar($parametros) {
            $client =  new Client();
            $informacoesToken = validarToken();
            $parametrosPost = parametrosJson() + parametrosPost();
            if(!verificarParametrosObrigatorios($parametrosPost, ["cliente_id", "rua", "cidade", "estado", "cep"]));
            $nomeclient = $client->buscarPorId($parametrosPost["cliente_id"]);
            if (!$nomeclient) outputError(404, "cliente não existe");
            $address = $this->address->cadastrar($parametrosPost["cliente_id"], $parametrosPost["rua"], $parametrosPost["cidade"], $parametrosPost["estado"], $parametrosPost["cep"]);
            if(!$address) outputError(500, "Erro interno do servidor");
            output(200, "Endereço cadastrado com sucesso", "OK", $address);
        }

        public function buscarTodos() {
            $informacoesToken = validarToken();

            $address = $this->address->listarTodos();
            if(!$address) outputError(404, "Endereço não encontrado");
            output(200, "Endereços encontrados com sucesso", $address);
        }

        public function atualizar($parametros) {
            $informacoesToken = validarToken();
            $parametrosPost = parametrosJson() + parametrosPost();
            if(!verificarParametrosObrigatorios($parametrosPost, ["cliente_id", "rua", "cidade", "estado", "cep"]));
            $address = $this->address->atualizar($parametrosPost["cliente_id"], $parametrosPost["rua"], $parametrosPost["cidade"], $parametrosPost["estado"], $parametrosPost["cep"], $parametros['id']);
            if(!$address) outputError(500, "Erro interno do servidor");
            output(200, "Endereço atualizado com sucesso", "OK", $address);
        }

        public function deletar($parametros) {
            $informacoesToken = validarToken();
            $address = $this->address->deletar($parametros['id']);
            output(200, "Endereço deletado com sucesso", "OK", $address);
        }
        
    }
