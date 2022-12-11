import { useEffect, useMemo } from 'react'

export default function Socket() {
  //

  let { oss } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { oss: false }
    }
    let oss = new OSSocket({ room: 'yoyo' })
    return { oss }
  }, [])

  //
  useEffect(() => {
    return () => {
      if (oss) {
        oss.clean()
      }
    }
  }, [oss])

  useEffect(() => {
    return oss.on('clients', (ev) => {
      console.log(ev)
    })
  }, [oss])

  useEffect(() => {
    return oss.on('toRoom', (ev) => {
      console.log(ev)
    })
  }, [oss])

  //
  return (
    <div>
      <div>Socket</div>
      <div>
        <textarea id='ta'></textarea>
        <button
          onClick={() => {
            //
            oss.sendJSON({
              // type: 'toRoom',
              // room: 'yoyo2w2',
              data: {
                content: document.querySelector(`#ta`).value,
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

const EndPointProfiles = {
  development: `wss://r1gdl0aeoj.execute-api.ap-southeast-1.amazonaws.com/sst-nova`,
  production: `wss://sj684x8rvj.execute-api.ap-southeast-1.amazonaws.com/prod`,
  test: `wss://mu46hxv22d.execute-api.ap-southeast-1.amazonaws.com/test`,
}
const myAPIEndPoint = EndPointProfiles[process.env.NODE_ENV]

// aws dont support binary
class OSSocket {
  constructor({ room = 'myRoom' }) {
    //
    this.room = room
    this.connectionString = `${myAPIEndPoint}`
    //
    this.autoReconnectInterval = -1
    this.ws = false
    this.myConnectionID = false
    this.onlineList = []

    this.handlers = {
      toRoom: [],
      clients: [],
    }
    this.connect()
  }

  on(ev, h) {
    this.handlers[ev] = this.handlers[ev] || []
    this.handlers[ev].push(h)
    return () => {
      this.off(ev, h)
    }
  }

  off(ev, h) {
    this.handlers[ev] = this.handlers[ev] || []
    this.handlers[ev] = this.handlers[ev].filter((e) => e !== h)
  }

  getID() {
    return (
      '_' +
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9)
    )
  }

  connect() {
    this.ws = new WebSocket(this.connectionString)
    this.ws.addEventListener('message', (ev) => {
      let response = JSON.parse(ev.data)
      // console.log('debug', response)

      if (response.type === 'clients') {
        this.myConnectionID = response.myConnectionID
        this.onlineList = response.data
      }

      this.handlers[response.type] = this.handlers[response.type] || []
      this.handlers[response.type].forEach((h) => {
        h(response)
      })
    })

    this.ws.addEventListener('open', (ev) => {
      console.log('socket event:', ev.type, this.ws)

      this.sendJSON({
        room: this.room,
        type: 'join',
        data: JSON.stringify({}),
      })

      this.autoRecover()

      // this.send({ room: this.room, data: { yyaya: 11 } })
    })
    this.ws.addEventListener('error', (ev) => {
      console.log(ev)

      this.autoRecover()
    })
    this.ws.addEventListener('close', (ev) => {
      console.log(ev)
    })
  }

  autoRecover() {
    clearInterval(this.autoReconnectInterval)
    this.autoReconnectInterval = setInterval(() => {
      if (this.ws.readyState === this.ws.CLOSED) {
        clearInterval(this.autoReconnectInterval)
        this.connect()
      }
    }, 15 * 1000)
    console.log(
      'scheduled auto reconnect',
      'timerID',
      this.autoReconnectInterval
    )
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
