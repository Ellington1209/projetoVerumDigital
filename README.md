# Projeto Verum Digital

Este projeto é uma aplicação full-stack utilizando Laravel no backend e React no frontend. Abaixo estão as instruções detalhadas para rodar o projeto em um ambiente Docker.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Passos para rodar o projeto

### 1. Clonar o repositório

Clone o repositório Git para sua máquina local:

```bash
git clone https://github.com/Ellington1209/projetoVerumDigital.git 
```

### 2. Entre na pasta do projeto

```
 cd projetoVerumDigital
 ```
### 3.1 Configurar os arquivos .env
#### Crie um arquivo .env na raiz da aplicação (no diretório projetoVerumDigital) e adicione o seguinte conteúdo:

```
 # Especificações do docker-compose.yml
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=api
DB_USERNAME=root
DB_PASSWORD=root

 ```

 ### 3.2 Arquivo .env dentro da pasta api-laravel
#### Agora, dentro da pasta api-laravel, crie um arquivo .env com o seguinte conteúdo:

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8989

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

# Especificações do docker-compose.yml
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=api
DB_USERNAME=root
DB_PASSWORD=root

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_SECRET=yDDgnM3YJZ6QU06nU5wObth2s3uekVtj1RXDus7tNVeyBkT0TdTw4IfbfSJi3HSh


 ```

 ### 4. Subir os contêineres Docker

 
 ```
 docker-compose up -d --build
 ```

 #### Isso criará e iniciará os contêineres necessários para a aplicação

 ### 5. Acessar o contêiner do Laravel
  ```
 docker-compose exec api bash
 ```

 ### 6. Instalar as dependências do Laravel
 #### Dentro do contêiner, rode o comando para instalar as dependências do Laravel:
   ```
 composer install
 ```
#### Ainda dentro do contêiner, gere a chave da aplicação Laravel:
   ```
 php artisan key:generate
 ```

 ## 8. Acesse a aplicação
#### frontend
 http://localhost:4000

### 9. Acessar o Sistema
   ```
 Usuario: ellington1209
 senha: 123456

  Usuario: Usuario1
 senha: 123456

  Usuario: Usuario2
 senha: 123456
 ```
 ### dev: Ellington Machado de Paula
