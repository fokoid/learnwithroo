import React, {Component} from 'react'

const relu = x => x > 0 ? x : 0

class FocusImage extends Component {
  state = {
    image: null
  }

  render = () => (
    <canvas
      ref='canvas'
      width={this.props.width}
      height={this.props.height}
    ></canvas>
  )

  offsetRect = () => {
    const {rect, width, height} = this.props
    const offsetX = (width - rect.width) / 2
    const offsetY = (height - rect.height) / 2
    return {
      left: relu(rect.left - offsetX),
      top: relu(rect.top - offsetY),
      width,
      height
    }
  }

  boundingRect = () => {
    const {rect, width, height} = this.props
    const offsetX = (width - rect.width * 2) / 2
    const offsetY = (height - rect.height * 2) / 2
    return {
      left: relu(offsetX),
      top: relu(offsetY),
      width: rect.width * 2,
      height: rect.height * 2
    }
  }

  componentDidMount = () => {
    const image = new Image()
    const {canvas} = this.refs
    image.onload = () => {
      const context = canvas.getContext('2d')
      const rect = this.offsetRect()
      context.drawImage(
        image,
        rect.left, rect.top, rect.width, rect.height,
        0, 0, canvas.width, canvas.height
      )
      context.globalAlpha = 0.5
      const bRect = this.boundingRect()
      context.fillRect(0, 0, canvas.width, bRect.top)
      context.fillRect(
        0, bRect.top + bRect.height,
        canvas.width, canvas.height - bRect.top - bRect.height
      )
      context.fillRect(0, bRect.top, bRect.left, bRect.height)
      context.fillRect(
        bRect.left + bRect.width, bRect.top,
        canvas.width - bRect.left - bRect.width, bRect.height
      )
    }
    image.src=this.props.src
  }
}

export default FocusImage
