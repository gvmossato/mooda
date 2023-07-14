***

<p align="center">
   <img src="https://i.ibb.co/XYbxkCj/mooda-logo.png" alt="mooda-logo" width=1000 />
</p>

<br />

<p align="center">  
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/NodeJS-16.15.1-339933?style=for-the-badge&logo=node.js&logoColor=339933" alt="nodejs-badge" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactjs-badge" />
  </a>
  <a href="https://github.com/gvmossato/mooda/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/gvmossato/mooda?color=blue&style=for-the-badge" alt="license-badge" />
  </a>
</p>

***

<p align="center">
  <a href="#-sobre">📚 Sobre</a> | 
  <a href="#-site">🌎 Site</a>   | 
  <a href="#-api">🧰 API</a>
</p>

<p align="center">
  <b>Mooda</b> é o sistema de monitoramento que traduz em sentimentos as condições da sua mudinha! 
</p>
  
<h4 align="center">
  :star: Curtiu? Deixe uma estrela! :star:
</h4>

## 📚 Sobre

A Mooda é um sistema de monitoramento composto por duas partes:

1. Um sistema embarcado que deve ser colocado no vaso da própria planta, responsável por medir a temperatura, luminosidade, umidade do solo e outros, fornecendo um *feedback* em tempo real das condições dessa planta, para conferir os detalhes, [clique aqui](https://github.com/HenriqueKen/mooda-embarcado);

2. Uma plataforma online que recebe os dados do sistema embarcado por Wi-Fi e fornece uma visão histórica com totalizações das amostras coletadas.

Nesse repositório, encontram-se as particularidades dessa plataforma online.

## 🌎 Site

<p align="center">
   <img alt="mooda-site" src="https://i.ibb.co/hMpKVDg/mooda.gif" />
</p>

<p align="center">
   🔗 Uma vez hosteado gratuitamente no <a href="http://mood-a.herokuapp.com/">Heroku</a>! Hoje, disponível apenas localmente. 🔗
</p>

## 🧰 API

Breve documentação dos *endpoints* da aplicação:

<br />
<br />

```
GET /api/sensors
```

Retorna um vetor com o último dia de todas as leituras de todos os sensores, recebidas em intervalos de 10 minutos. Parâmetros opicionais da *query*:

#### `sensor`

> Sensor em específico para se obter os dados.

> Aceita um dos seguintes: `luminosity`, `temperature`, `soilMoisture`, `airMoisture`, `airQuality` e `presence`.

#### `startDate`

> Data de início da leituras, estritamente no formato `YYYY-MM-DD`.

#### `endDate`

> Data de término da leituras, estritamente no formato `YYYY-MM-DD`.

<br />
<br />

```
GET /api/happiness
```

Retorna um vetor com o último dia de todas as felicidades para todos os sensores cabíveis, calculadas em intervalos de 10 minutos. Parâmetros opicionais da *query*:

#### `sensor`

> Sensor em específico para se obter os dados.

> Aceita um dos seguintes: `luminosity`, `temperature`, `soilMoisture`, `airMoisture` e `airQuality`.

#### `startDate`

> Data de início, estritamente no formato `YYYY-MM-DD`.

#### `endDate`

> Data de término, estritamente no formato `YYYY-MM-DD`.

<br />
<br />

```
POST /api/sensors
```

Retorna um vetor com três objetos: (1) as leituras inseridas no banco; (2) o enquadramento dessas leituras dentro dos limites aceitáveis e (3) a felicidade levando em conta o histórico de leituras, com essa inclusa. Parâmetros de *query* obrigatórios:

#### `luminosity`

> Leitura do sensor de luminosidade, em lúmens — `float`

#### `temperature`

> Leitura do sensor de temperatura, em °C — `float`

#### `soilMoisture`

> Leitura do sensor de umidade do solo, em % — `float`

#### `airMoisture`

> Leitura do sensor de umidade do ar, em % — `float`

#### `airQuality`

> Leitura de qualidade do ar, em ppm de CO₂ — `float`

#### `presence`

> Leitura do sensor de presença — `boolean`
