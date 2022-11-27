import { useEffect, useMemo } from 'react'

export default function Socket() {
  let { oss } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { oss: false }
    }
    let oss = new OSSocket({ room: 'yoyo' })
    return { oss }
  }, [])
  useEffect(() => {
    return () => {
      if (oss) {
        oss.clean()
      }
    }
  }, [oss])
  return (
    <div>
      <div>!</div>
      <div>!</div>
      <div>!</div>
      <div>!</div>

      <div>Socket</div>
      <div>
        <textarea id='ta'></textarea>
        <button
          onClick={() => {
            oss.sendJSON({
              data: {
                ya:
                  document.querySelector(`#ta`).value +
                  '_' +
                  Math.floor(Math.random() * 1000000),
              },
            })
          }}
        >
          Send
        </button>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}

const backend = {
  bucketDomain: `amaze-lok-sst-nova-mystack-ugcdatabucket4f0ed9ca-d3oir61lmzxc.s3.amazonaws.com`,
  bucketName: `amaze-lok-sst-nova-mystack-ugcdatabucket4f0ed9ca-d3oir61lmzxc`,
  cdnDomain: `d8p25ehiz3ivn.cloudfront.net`,
  rest: `https://fl7bsdl89f.execute-api.us-east-1.amazonaws.com`,
  socket: `wss://0tehxmpe2m.execute-api.us-east-1.amazonaws.com/amaze-lok`,
}

// dont support JSON
class OSSocket {
  constructor({ room = 'myRoom' }) {
    //
    this.room = room
    this.connectionString = `${backend.socket}`
    //
    this.autoReconnectInterval = -1
    this.ws = false
    this.connect()
  }
  connect() {
    this.ws = new WebSocket(this.connectionString)
    this.ws.addEventListener('message', (ev) => {
      console.log(JSON.parse(ev.data))
    })
    this.ws.addEventListener('open', (ev) => {
      console.log(ev)

      this.sendJSON({
        room: this.room,
        type: 'join',
        data: JSON.stringify({ random: Math.random() }),
      })

      this.autoReconnect()
      //
      // this.send({ room: this.room, data: { yyaya: 11 } })
    })
    this.ws.addEventListener('error', (ev) => {
      console.log(ev)

      this.autoReconnect()
    })
    this.ws.addEventListener('close', (ev) => {
      console.log(ev)
    })
  }

  autoReconnect() {
    clearInterval(this.autoReconnectInterval)
    this.autoReconnectInterval = setInterval(() => {
      if (this.ws.readyState === this.ws.CLOSED) {
        clearInterval(this.autoReconnectInterval)
        this.connect()
      }
    }, 15 * 1000)
  }

  sendJSON({
    room,
    type = 'toRoom',
    data = JSON.stringify({ random: Math.random() }),
  }) {
    let ttt = setInterval(() => {
      if (this.ws.readyState === this.ws.OPEN) {
        clearInterval(ttt)
        this.ws.send(
          JSON.stringify({
            data: data,
            type: type,
            room: room || this.room,
          })
        )
      }
    })
  }
  clean() {
    clearInterval(this.autoReconnectInterval)
    let ttt = setInterval(() => {
      if (this.ws.readyState === this.ws.OPEN) {
        clearInterval(ttt)
        this.ws.close()
      }
    })
  }
}
