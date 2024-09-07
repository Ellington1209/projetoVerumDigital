# Usar a imagem oficial do Node.js
FROM node:latest

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos package.json e package-lock.json primeiro para usar cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos para o contêiner
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Instalar um servidor simples para servir os arquivos estáticos
RUN npm install -g serve

# Usar o servidor para servir a aplicação em produção
CMD ["serve", "-s", "build"]

# Expor a porta 3000 (ou qualquer outra porta que você deseje)
EXPOSE 3000
