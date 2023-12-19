import { Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketData {
  connectionId: string;
}

function ws(server: any) {
  const io = new Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SocketData>(server, {
    cors: {
      origin: '*',
    },
  })

  io.use((socket, next) => {
    const connectionId = socket.handshake.auth.connectionId

    if (!connectionId) {
      return next(new Error('Invalid connectionId'))
    }

    socket.data.connectionId = connectionId
    socket.join(connectionId)
    next()
  })

  io.on('connection', (socket) => {
    console.log(`
      User connected: ${socket.handshake.auth.connectionId},
      Socket ID: ${socket.id}
    `)

    socket.on('update-image', (data: {connectionId: string, image: string}) => {
      const connectionId = socket.handshake.headers.connectionid as string
      io.to(connectionId).emit('set-image-on-screen', data.image)
    })
  })

}

export default ws
