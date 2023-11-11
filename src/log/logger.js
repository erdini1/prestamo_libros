import fs from "fs/promises"
import path from "path"

const logFile = path.join(process.cwd(), "logs.log")

async function log(message) {
    const timestamp = new Date().toLocaleDateString()
    const logMessage = `[${timestamp}] ${message}\n`

    try {
        await fs.appendFile(logFile, logMessage)
    } catch (error) {
        console.log("Error writing to the log file: ", error)
    }
}

function info(message) {
    log(`INFO: ${message}`)
}

function error(message) {
    log(`ERROR: ${message}`)
}

export { info, error }