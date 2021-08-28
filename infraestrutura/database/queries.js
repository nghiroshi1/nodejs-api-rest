const conexao = require('./conexao')

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros)
        .then(resultados => {
            resolve(resultados)
        })
        .catch(erros => {
            reject(erros)
        })
    
    })
}

module.exports = executaQuery
