import React, {Component} from 'react'

class FocusImage extends Component {
  state = {
    image: null
  }

  render = () => {
    return (
      <canvas
        ref={c => this.canvas = c}
        width={this.props.width}
        height={this.props.height}
      ></canvas>
    )
  }

  offsetRect = () => {
    const {rect, width, height} = this.props
    const offsetX = (width - rect.width) / 2
    const offsetY = (height - rect.height) / 2
    return {
      left: rect.left - offsetX,
      top: rect.top - offsetY,
      width: width,
      height: height
    }
  }

  boundingRect = () => {
    const {rect, width, height} = this.props
    const offsetX = (width - rect.width * 2) / 2
    const offsetY = (height - rect.height * 2) / 2
    return {
      left: offsetX,
      top: offsetY,
      width: rect.width * 2,
      height: rect.height * 2
    }
  }

  componentDidMount = () => void this.drawImage()
  componentWillReceiveProps = () => void this.drawImage()

  drawImage = () => {
    const image = new Image()
    image.onload = () => {
      const context = this.canvas.getContext('2d')
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      context.globalAlpha = 1.0
      context.fillStyle = 'white'
      const rect = this.offsetRect()
      context.drawImage(
        image,
        rect.left, rect.top, rect.width, rect.height,
        0, 0, this.canvas.width, this.canvas.height
      )
      context.globalAlpha = 0.5
      const bRect = this.boundingRect()
      context.fillRect(0, 0, this.canvas.width, bRect.top)
      context.fillRect(
        0, bRect.top + bRect.height,
        this.canvas.width, this.canvas.height - bRect.top - bRect.height
      )
      context.fillRect(0, bRect.top, bRect.left, bRect.height)
      context.fillRect(
        bRect.left + bRect.width, bRect.top,
        this.canvas.width - bRect.left - bRect.width, bRect.height
      )
    }
    image.src=this.props.src
  }
}

export default FocusImage
