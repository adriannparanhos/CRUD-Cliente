<?php
    require_once("config/conexao.php");

    class Client {
        public static function cadastrar($nome, $data_nascimento, $cpf, $rg, $telefone) {
            $sql = "INSERT INTO clientes (nome, data_nascimento, cpf, rg, telefone) VALUES (:nome, :data_nascimento, :cpf, :rg, :telefone)";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":nome", $nome);
            $stmt->bindParam(":data_nascimento", $data_nascimento);
            $stmt->bindParam(":cpf", $cpf);
            $stmt->bindParam(":rg", $rg);
            $stmt->bindParam(":telefone", $telefone);
            $stmt->execute();
            return self::listarPorId($conexao->lastInsertId());
        }

        public static function listarPorId($id) {
            $sql = "select * from clientes where id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function listarPorCpf($cpf) {
            $sql = "select * from clientes where cpf = :cpf";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":cpf", $cpf);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        }

        public static function buscarPorId($id) {
            $sql = "select clientes.*, enderecos.cep, enderecos.rua, enderecos.estado, enderecos.cidade, enderecos.id as id_endereco from clientes inner join enderecos on clientes.id = enderecos.cliente_id where clientes.id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function listarTodos() {
            $sql = "select clientes.*, enderecos.cep, enderecos.rua, enderecos.estado, enderecos.cidade, enderecos.id as id_endereco from clientes inner join enderecos on clientes.id = enderecos.cliente_id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function atualizar($nome, $data_nascimento, $cpf, $rg, $telefone, $id) {
            $sql = "UPDATE clientes SET nome = :nome, data_nascimento = :data_nascimento, cpf = :cpf, rg = :rg, telefone = :telefone WHERE id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":nome", $nome);
            $stmt->bindParam(":data_nascimento", $data_nascimento);
            $stmt->bindParam(":cpf", $cpf);
            $stmt->bindParam(":rg", $rg);
            $stmt->bindParam(":telefone", $telefone);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return self::listarPorId($id);
        }

        public static function deletar($id) {
            $sql = "DELETE FROM clientes WHERE id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();

            
        }

    }