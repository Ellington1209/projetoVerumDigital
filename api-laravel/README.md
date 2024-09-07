# Meu Projeto

## Tutorial de Configuração

### Acesso ao Sistema

Para acessar o sistema, utilize as seguintes credenciais:

-   **usuario:** medico1234
-   **Senha:** 123456

### Como Configurar o Projeto

1. Instale as dependências do projeto utilizando Composer:

    ```
    composer install
    ```

2. Execute as migrações do banco de dados para criar as tabelas necessárias:

    ```
    faça as configurações necessarias no arquivo .env
    ex:
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3307
    DB_DATABASE=testeDeovita
    DB_USERNAME=root
    DB_PASSWORD=root
    
    php artisan migrate
    ```

3. Gere uma chave de aplicativo:
    ```
    php artisan key:generate
    ```
4. Execute os seeders para popular o banco de dados com dados de perfil e usuários:

    ```
    php artisan db:seed
    ```

5. Gere uma chave JWT para autenticação:
    ```
    php artisan jwt:secret
    ```
6. Inicie o servidor local:
    ```
    php artisan serve
    ```
