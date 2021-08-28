const Atendimento = require('../models/atendimentos')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {

        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        Atendimento.buscaPorId(req.params.id, res)
    })
    
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        console.log(atendimento)
        
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = req.params.id
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = req.params.id
        Atendimento.deleta(id, res)
    })
    
}