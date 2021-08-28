const customExpress = require('./cofig/customExpress')
const pool = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

pool.getConnection()
    .then(conexao => {
        console.log('Conectado com sucesso!')
        
        Tabelas.init(conexao)
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }).catch(erro => {
      console.log(erro)
    });