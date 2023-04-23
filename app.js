import 'colors'
import { inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } from './helpers/inquirer.js'
import Tareas from './models/tareas.js'
import { readDB, saveDB } from './helpers/saveFile.js'




const main = async () => {

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = readDB()

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                break
            case '2':
                tareas.listadoCompleto()
                break
            case '3':
                tareas.listarPendientesCompletadas(true)
                break
            case '4':
                tareas.listarPendientesCompletadas(false)
                break
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0') {
                    const ok = await confirmar('¿Estás seguro?')

                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log("Tarea borrada")
                    }
                }


                break
        }


        saveDB(tareas.listadoArr)

        await pause()

    } while (opt !== '0')
}


main()