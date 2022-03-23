import { io } from "socket.io-client"
import router from "../router"

export interface Message
{
    isNotification: boolean
    sender: string
    payload: string
    timestamp: string
}

export default class API
{
    private static readonly URL: string = `${window.location.hostname}:3001`
    public static readonly socket = io(API.URL)
    private static username : string
    private static history : Message[] = []

    constructor()
    {
        API.socket.on("connect_error", (reason) =>
        {
            alert(`Connection Error: ${reason.message}`)
        })

        API.socket.on("disconnect", (reason) =>
        {
            alert(`Disconnected: ${reason}`)
        })

        API.socket.on("history", (history) =>
        {
            for (const message of history)
            API.history.push(message)
        })
    }
    
    public static login(username: string) : void
    {
        API.username = username
        API.socket.connect()
        API.socket.emit("auth",
        {
            username: API.username
        })
    }

    public static sendMessage(message: string) : Message
    {
        let msg : Message
        API.socket.emit("clientMessage", 
        msg = {
            isNotification: false,
            sender: API.username,
            payload: message,
            timestamp: new Date().toLocaleString('it-IT').replace(', ', ' - ')
        })

        return msg
    }

    public static getHistory() : Message[]
    {
        return API.history
    }

    public static async getMessages() : Promise<Message[]>
    {
        const response = await fetch(`${API.URL}/messages`)
        return await response.json()
    }

}