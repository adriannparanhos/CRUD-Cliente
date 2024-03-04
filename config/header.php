<?php
    // Permitindo acesso de qualquer origem
    header("Access-Control-Allow-Origin: *");
    
    // Permitindo métodos específicos
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    // Permitindo cabeçalhos específicos
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // Definindo o tipo de conteúdo
    header("Content-Type: application/json; charset=UTF-8");
    
    // Verificando se a requisição é do tipo OPTIONS
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        // Respondendo somente ao preflight request
        http_response_code(200);
        exit();
    }

    // Restante do seu código PHP aqui...
?>
