import React from 'react';
import Snap from 'snapsvg/dist/snap.svg.js';
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.svgRender = this.svgRender.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  svgRender() {
    let element = Snap(this.svgDiv)
    Snap.load(this.state.imageURL, function(data){
      if (element) {
        element.append(data);
      }
    });
  }

  componentDidMount() {
    this.svgRender();
  }
  componentDidUpdate() {
    this.svgRender();
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <p> {this.state.imageURL} </p>
        <div ref={d=>this.svgDiv=d} />
      </form>
    );
  }
}

export default Main;
