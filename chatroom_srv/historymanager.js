const fs = require('fs')

module.exports = class HistoryManager
{
    constructor(file)
    {
        this.file = file
    }

    saveMessage(message)
    {
        let history = this.loadHistory()
        history.push(message)
        fs.writeFileSync(this.file, JSON.stringify(history, null, 2))
    }

    loadHistory()
    {
        if (fs.existsSync(this.file))
        {
            try { return JSON.parse(fs.readFileSync(this.file)) }
            catch (e) { return [] }
        }

        return []
    }
}
