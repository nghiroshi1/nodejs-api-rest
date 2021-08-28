const conexao = require('../infraestrutura/database/conexao')
const uploadDeArquivos = require('../infraestrutura/arquivos/uploadDeArquivos')

class Pet{
    adiciona(pet, res){
        const query = 'INSERT INTO Pets (nome, imagem) value (?,?)'

        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {

            if (erro){
                res.status(400).json(erro)
            } else {
                const novoPet = {"nome": pet.nome, "imagem": novoCaminho}
                
                conexao.query(query, [novoPet.nome, novoPet.imagem])
                .then(resultados => {
                    res.status(201).json(novoPet)
                })
                .catch(erro => {
                    res.status(400).json(erro)
                })
            }

        })

    }

    lista(res){
        const query = "SELECT * FROM Pets "

        conexao.query(query)
        .then(resultado => {
            res.status(200).json(resultado)
        })
        .catch(erro => {
            res.status(400).json(erro)
        })
    }
}

module.exports = new Pet