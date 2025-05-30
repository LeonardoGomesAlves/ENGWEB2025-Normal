## Setup DB
Relativamente ao setup da base de dados, utilizei o script que está na pasta dataset, chamado mongo-import.sh que, dado um ficheiro, um nome de uma base de dados, um nome duma coleção e o nome do container docker, ele importa corretamente o ficheiro para o mongo.

(ficheiro=edicoes.json e collection="edicoes" por exemplo)

As coleções também estão nesta pasta dataset.

## Persistência de dados
Quanto à persistência de dados, decidi utilizar duas collections, fazendo uma alteração ao dataset base:
- edicoes
    Esta é responsável por guardar as informações de cada uma das edições e o campo vencedor em alguns dos casos do dataset não existe, pelo que tranformei-o numa string vazia.
    O formato de uma edição é o seguinte:
    {
        "_id": "ed2016",
        "ano": 2016,
        "organizacao": "Sweden",
        "vencedor": "Ukraine"
    }

- musicas
    Uma vez que o dataset é muito denso, decidi criar uma coleção para as músicas. Tive atenção a alguns campos que podem ser vazios e, nesse caso, troquei por uma string vazia como pode ser observado no script da pasta dataset (normalize.py). 
    O formato de uma música é o seguinte:
    {
        "_id": "m2018_Iceland",
        "edicaoId": "ed2018",
        "titulo": "Our Choice",
        "pais": "Iceland",
        "link": "https://youtube.com/watch?v=RQytWeg9CzE",
        "compositor": "Thorunn Clausen",
        "interprete": "Ari Ólafsson",
        "letra": ""
    }

## Execução dos servicos
Para executar o backend, temos que entrar na pasta ex1, executar o comando npm i para instalar as dependências e npm run start para executar o serviço. 

De forma similar para o frontend, temos que entrar na pasta ex2, executar o comando npm i para instalar as dependências e npm run start para executar o serviço.
