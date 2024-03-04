<?php
    require_once("config/conexao.php");

    class Users {
        
        public static function cadastrar($username, $password) {

            if(empty($username) || empty($password)) {
                return "Por favor, preencha todos os campos.";
            }
            
            $sql = "INSERT INTO users (username, password) VALUES (:username, :password)";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":password", $password);
            $stmt->execute();
            return self::listarPorId($conexao->lastInsertId());
        }
        
        public static function listarTodos($username) {
            $sql = "SELECT username FROM users WHERE username = :username";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":username", $username);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function listarPorId($id) {
            $sql = "SELECT username FROM users WHERE id = :id";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function buscarUsersEPassword($username, $password) {
            $sql = "SELECT id, username, password FROM users WHERE username = :username AND password = :password";
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":password", $password);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        
        
        
    }