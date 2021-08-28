const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => 
{
    const tipo = path.extname(caminho)
    const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`

    const tiposValidos = ['.jpg', '.jpeg', '.png']

    tipoEhValido = tiposValidos.indexOf(tipo) !== -1

    if (tipoEhValido){
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        const erro = "Tipo é inválido"
        console.log(erro)
        callbackImagemCriada(erro)
    }
}
