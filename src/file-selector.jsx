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
		<div id='input'>
				<input
				  multiple
				  type='file'
				  id='files'
				  onChange={(event) => callback(event.target.files)}
				  className="inputfile"
				/>
				<label htmlFor="file"><strong>Choose a file</strong></label>

				<p>OR</p>
				<Uploader callback={callback}></Uploader>
		</div>
	</div>
	<div class="column">
		
	</div>
</div>
)

export default FileSelector
