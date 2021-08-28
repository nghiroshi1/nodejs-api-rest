class Tabelas{
    init(conexao){
        this.conexao = conexao

        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, \
            cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, \
            data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, \
            observacoes text, PRIMARY KEY(id))'

        this.conexao.query(sql)
        .then((res) => {
            console.log(res)
            console.log("Tabela Atendimentos criada com sucesso")
        })

        .catch(erro =>{
            console.log(erro)
        })
    }

    criarPets(){
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT,\
            nome VARCHAR(50) NOT NULL, imagem VARCHAR(200), PRIMARY KEY (id))'

        this.conexao.query(query)
        .then(resultados => {
            console.log(resultados)
            console.log('Tabela Pets criada com sucesso')
        })
        .catch(erro => {
            console.log(erro)
        })

    }
}

module.exports = new Tabelas