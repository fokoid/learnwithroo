import React, {Component} from 'react'
import FileDrop from 'react-file-drop'

class Uploader extends Component {
	state = {
		displayName: "myUploader"
	}
	
	render = () => {
		return(
			<div className="uploader">
				Drag your images here to upload...
				<FileDrop frame={document} onDrop={this.props.callback}>
					Drop some files here!
				</FileDrop>
			</div>
		);
	}
} 

const FileSelector = ({callback}) => (
<div class="row">
	<div class="column">
		<div style={{margin:"20px"}}><h3> <b>L</b>earn. <b>R</b>eact. <b>U</b>nderstand. </h3></div>
		<div>
		</div>
	</div>
	<div class="column">
		<div style={{margin:"20px"}}><h4> Select your image source for the game: </h4></div>
		<div id='input'>
				<button id="photolib">
					Existing photo library
				 </button>
				<p>OR</p>
				<input
				  multiple
				  type='file'
				  id='files'
				  onChange={(event) => callback(event.target.files)}
				  className="inputfile"
				/>
				<label htmlFor="file"><strong>Choose multiple files</strong></label>
				<Uploader callback={callback}></Uploader>
		</div>
	</div>
</div>
)

export default FileSelector
