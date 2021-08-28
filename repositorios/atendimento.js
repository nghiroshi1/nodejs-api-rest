const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos (cliente,pet,servico,status,observacoes, data, dataCriacao) \
                value (?,?,?,?,?,?,?)'

        return query(sql, [atendimento.cliente, atendimento.pet, atendimento.servico, atendimento.status,
        atendimento.observacoes, atendimento.data, atendimento.dataCriacao])
    }

    lista(){
        const sql = "select * from Atendimentos "

        return query(sql)
    }
}

module.exports = new Atendimento()