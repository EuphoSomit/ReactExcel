import React from 'react';
import { UploadBox, OutputRenderer } from '../components';
import { ExcelRenderer } from '../helpers/ExcelRenderer';
import { Jumbotron, Container, Card } from 'reactstrap';
import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    };
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.renderFile = this.renderFile.bind(this);
  }

  renderFile = fileObj => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  };

  fileHandler = event => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === 'xlsx') {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj);
      } else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ''
        });
      }
    }
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </Jumbotron>
        <Container>
          <UploadBox
            fileHandler={this.fileHandler}
            uploadedFileName={this.state.uploadedFileName}
            isFormInvalid={this.state.isFormInvalid}
          />
          {this.state.dataLoaded && (
            <div>
              <Card body outline color="secondary" className="restrict-card">
                <OutputRenderer
                  rows={this.state.rows}
                  columns={this.state.cols}
                />
              </Card>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default AppContainer;
