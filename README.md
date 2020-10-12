# MobCar
O projeto MobCar API desenvolvido em [Node.js](https://nodejs.org/en/).
Ele usa [Express](https://expressjs.com/pt-br/) como estrutura da web e [MongoDB](https://www.mongodb.com/) como banco de dados. 
O código é totalmente coberto por testes, usando [Jest](https://jestjs.io/).

O aplicativo permite que novos usuários se registrem e se autentiquem usando JSON Web Tokens. 
Os usuários registrados podem alugar um carro e devolvê-lo a qualquer momento. 
Os administradores têm privilégios adicionais, como adicionar novos carros ao banco de dados ou visualizar todos os aluguéis ativos.

## Instalação do projeto
Dependencias do projeto

    npm install  
  
## Testes
Rodando os teste

    npm test
  
## Utilizando
Inicializando o projeto

    npm start

## Rotas/endpoints Desenvolvidas:
● Uma rota de cadastro de usuário.
  
● Uma rota de login.
  
● Uma rota que liste carros com paginação, filtros e ordenação.
  
● Uma rota que retorne todas informações de um carro específico.
  
● Uma rota que calcule o valor do aluguel de um carro específico.
  
● Uma rota que reserve um carro para uma pessoa.
