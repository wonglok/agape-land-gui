export function CanvasDrawTexture(parentTexture) {
  this._canvas = document.createElement('canvas')
  this._canvas.width = this._canvas.height = 1024
  this._context2D = this._canvas.getContext('2d')

  if (parentTexture) {
    this._parentTexture.push(parentTexture)
    parentTexture.image = this._canvas
  }

  const that = this
  this._background = document.createElement('img')
  this._background.addEventListener('load', function () {
    that._canvas.width = that._background.naturalWidth
    that._canvas.height = that._background.naturalHeight

    that._crossRadius = Math.ceil(
      Math.min(that._canvas.width, that._canvas.height / 30)
    )
    that._crossMax = Math.ceil(0.70710678 * that._crossRadius)
    that._crossMin = Math.ceil(that._crossMax / 10)
    that._crossThickness = Math.ceil(that._crossMax / 10)

    that._draw()
  })
  this._background.crossOrigin = ''
  this._background.src = ''

  this._draw()
}

CanvasDrawTexture.prototype = {
  constructor: CanvasDrawTexture,

  _canvas: null,
  _context2D: null,
  _xCross: 0,
  _yCross: 0,

  _crossRadius: 57,
  _crossMax: 40,
  _crossMin: 4,
  _crossThickness: 4,

  _parentTexture: [],

  addParent: function (parentTexture) {
    if (this._parentTexture.indexOf(parentTexture) === -1) {
      this._parentTexture.push(parentTexture)
      parentTexture.image = this._canvas
    }
  },

  setCrossPosition: function (x, y) {
    this._xCross = x * this._canvas.width
    this._yCross = y * this._canvas.height

    this._draw()
  },

  _draw: function () {
    if (!this._context2D) return

    // this._context2D.clearRect(0, 0, this._canvas.width, this._canvas.height)

    // Background.
    // this._context2D.drawImage(this._background, 0, 0)

    // Yellow cross.
    this._context2D.lineWidth = this._crossThickness * 3
    this._context2D.strokeStyle = 'rgba(255,255,255,0.03)'

    this._context2D.beginPath()
    this._context2D.moveTo(
      this._xCross - this._crossMax - 2,
      this._yCross - this._crossMax - 2
    )
    this._context2D.lineTo(
      this._xCross - this._crossMin,
      this._yCross - this._crossMin
    )

    this._context2D.moveTo(
      this._xCross + this._crossMin,
      this._yCross + this._crossMin
    )
    this._context2D.lineTo(
      this._xCross + this._crossMax + 2,
      this._yCross + this._crossMax + 2
    )

    this._context2D.moveTo(
      this._xCross - this._crossMax - 2,
      this._yCross + this._crossMax + 2
    )
    this._context2D.lineTo(
      this._xCross - this._crossMin,
      this._yCross + this._crossMin
    )

    this._context2D.moveTo(
      this._xCross + this._crossMin,
      this._yCross - this._crossMin
    )
    this._context2D.lineTo(
      this._xCross + this._crossMax + 2,
      this._yCross - this._crossMax - 2
    )

    this._context2D.stroke()

    for (let i = 0; i < this._parentTexture.length; i++) {
      this._parentTexture[i].needsUpdate = true
    }
  },
}
