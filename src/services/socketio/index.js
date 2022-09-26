import { io } from "socket.io-client"

const socket = io(process.env.REACT_APP_API_URL)

socket.on("connect", () => {})

export default socket
