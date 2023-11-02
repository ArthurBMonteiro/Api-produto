const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulando uma lista de produtos
let produtos = [
  { id: 1, nome: 'Produto 1', preco: 10.99 },
  { id: 2, nome: 'Produto 2', preco: 20.99 },
  { id: 3, nome: 'Produto 3', preco: 15.99 },
];

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Rota para obter um produto por ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    res.status(404).json({ message: 'Produto não encontrado' });
  } else {
    res.json(produto);
  }
});

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const novoProduto = req.body;
  novoProduto.id = produtos.length + 1;
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Rota para atualizar um produto por ID
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex(p => p.id === id);

  if (produtoIndex === -1) {
    res.status(404).json({ message: 'Produto não encontrado' });
  } else {
    produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
    res.json(produtos[produtoIndex]);
  }
});

// Rota para excluir um produto por ID
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex(p => p.id === id);

  if (produtoIndex === -1) {
    res.status(404).json({ message: 'Produto não encontrado' });
  } else {
    produtos.splice(produtoIndex, 1);
    res.json({ message: 'Produto removido com sucesso' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});