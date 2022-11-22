import { useEffect, useMemo } from 'react'

export default function Socket() {
  let { oss } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { oss: false }
    }
    let oss = new OSSocket({ roomID: 'yoyo' })
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
  constructor({ roomID = 'myRoom' }) {
    //
    this.roomID = roomID
    this.connectionString = `${backend.socket}/?roomID=${encodeURIComponent(
      roomID
    )}`
    //
    this.ws = new WebSocket(this.connectionString)
    this.autoReconnect = -1

    this.ws.addEventListener('message', (ev) => {
      console.log(JSON.parse(ev.data))
    })
    this.ws.addEventListener('open', (ev) => {
      console.log(ev)

      clearInterval(this.autoReconnectInterval)
      this.autoReconnectInterval = setInterval(() => {
        if (this.ws.readyState === this.ws.CLOSED) {
          this.ws = new WebSocket(this.connectionString)
        }
      }, 10 * 1000)

      //
      // this.send({ roomID: this.roomID, data: { yyaya: 11 } })
    })
    this.ws.addEventListener('error', (ev) => {
      console.log(ev)
    })
    this.ws.addEventListener('close', (ev) => {
      console.log(ev)
    })
  }

  sendJSON({ roomID, data = Math.random() }) {
    let ttt = setInterval(() => {
      if (this.ws.readyState === this.ws.OPEN) {
        clearInterval(ttt)
        this.ws.send(
          JSON.stringify({
            data: data,
            roomID: roomID || this.roomID,
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
