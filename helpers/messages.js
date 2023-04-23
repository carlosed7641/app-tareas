import 'colors'

export const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPresione ${'ENTER'.green} para continuar \n`, (opt) => {
            readline.close()
            resolve(opt)
        })
    })

}