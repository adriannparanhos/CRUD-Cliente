<?php 

    require_once("config/conexao.php");

    class Address {
        // Cadastrar um endereço baseado no id do cliente
        public static function cadastrar($cliente_id, $rua, $cidade, $estado, $cep) {
            $sql = "INSERT INTO enderecos (cliente_id, rua, cidade, estado, cep) VALUES (:cliente_id, :rua, :cidade, :estado, :cep)";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":cliente_id", $cliente_id);
            $stmt->bindParam(":rua", $rua);
            $stmt->bindParam(":cidade", $cidade);
            $stmt->bindParam(":estado", $estado);
            $stmt->bindParam(":cep", $cep);
            $stmt->execute();
            return self::listarPorId($conexao->lastInsertId());
        }

        public static function listarPorId($id) {
            $sql = "select * from enderecos where id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        }

        public static function listarTodos() {
            $sql = "select * from enderecos";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function atualizar($rua, $cidade, $estado, $cep, $id) {
            $sql = "UPDATE enderecos SET rua = :rua, cidade = :cidade, estado = :estado, cep = :cep WHERE id = :id";

            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":rua", $rua);
            $stmt->bindParam(":cidade", $cidade);
            $stmt->bindParam(":estado", $estado);
            $stmt->bindParam(":cep", $cep);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return self::listarPorId($id);
        }

        public static function deletar($id) {
            $sql = "DELETE FROM enderecos WHERE id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return $stmt->rowCount();
        }
        
        public static function deletarPorIdCliente($cliente_id) {
            $sql = "DELETE FROM enderecos WHERE cliente_id = :cliente_id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":cliente_id", $cliente_id);
            $stmt->execute();
            return $stmt->rowCount();
        }
    }