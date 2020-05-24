# Very Useful Tools to Remember (VUTTR)

## Requisitos❗

1. NodeJS 12.x
2. NPM 
3. MySQL (local)
4. Postgres (production)

## Instalação 📝

1. Após entrar na pasta do projeto através de um terminal, execute o comando:

```
$ npm install .
```

Caso você utilize o Yarn, execute:

```
$ yarn
```

2. Certifique-se que o seu servidor MySQL está rodando e execute:

```
$ npx knex migrate:latest
```

Caso você utilize o Yarn, execute:

```
$ yarn knex migrate:latest
```

3. Gere o arquivo .env rodando o comando:

```
$ npm run generate:key
```

Caso você utilize o Yarn, execute:

```
$ yarn generate:key
```

OBS.: Para executar localhost, altere a variável NODE_ENV para "development" no arquivo .env


4. Execute o servidor de desenvolvimento rodando o comando:

```
$ npm run dev
```

Caso você utilize o Yarn, execute:

```
$ yarn dev
```

5. Para executar o servidor sem ser monitorado pelo nodemon, execute:

```
$ npm run start
```

Caso você utilize o Yarn, execute:

```
$ yarn start
```

<hr/>

## 💾 Modelo relacional do banco de dados.
![GitHub Logo](https://raw.githubusercontent.com/lucasemn1/vuttr/master/public/database_model.png)

##### Desenvolvido com o coração por Lucas Emanuel Nascimento Nóbrega Dias 😁 (lucasnobrega.js@gmail.com).
##### Visite meu [Linkedin! 🌐🗯](https://www.linkedin.com/in/lucas-emn/) 