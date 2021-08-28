const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment')
const axios = require('axios')
const repositorio = require('../repositorios/atendimento')

class Atendimento{
    constructor(){
        
        this.dataEhValida = ({data, dataCriacao}) => {
            return moment(data).isSameOrAfter(dataCriacao)
        } 
            
        this.clienteEhValido = tamanho => tamanho >= 5

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const nome = campo.nome
                const parametro = parametros[nome]
                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: "data",
                mensagem: "Data dever ser maior ou igual a data atual",
                valido: this.dataEhValida
            },
            {
                nome: "cliente",
                mensagem: "cliente deve ter pelo menos 5 caracteres",
                valido: this.clienteEhValido
            }
        ]
    }

    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS')

         const parametros = {
            "data": {data, dataCriacao},
            "cliente": atendimento.cliente.length
        }
        
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros){
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = {...atendimento, data, dataCriacao}

            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return { ...atendimento, id }
                })
        }

    }

    lista(res){
        const sql = "select * from Atendimentos "

        conexao.query(sql)
        .then(resultados => {
            res.status(200).json(resultados)
        })
        .catch(erro => {
            res.status(400).json(erro)
        })
    }

    buscaPorId(id, res){
        const sql = `select * from Atendimentos where id = ${id}`

        conexao.query(sql)
        .then(async resultados => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente

            const { data } = await axios.get(`http://localhost:8082/${cpf}`) 

            atendimento.cliente = data

            res.status(200).json(atendimento)
        })
        .catch(erro => {
            res.status(400).json(erro)
        })
    }

    altera(id, valores, res){
        const sql = 'update Atendimentos set cliente=?, pet=?, servico=?, status=?, observacoes=?, data=? where id=?'

        const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS')

        conexao.query(sql, [valores.cliente, valores.pet, valores.servico,
            valores.status, valores.observacoes, data, id])

        .then(resultados => {
            res.status(200).json(resultados)
        })
        .catch(erro => {
            res.status(400).json(erro)
        })
    }

    deleta(id, res){
        const sql = `delete from Atendimentos where id=${id}`

        conexao.query(sql)
        .then(resultados => {
            res.status(200).json(resultados)
        })
        .catch(erro => {
            res.status(400).json(erro)
        })
    }
}

module.exports = new Atendimento