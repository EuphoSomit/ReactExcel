import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  Button,
  Fade,
  FormFeedback
} from 'reactstrap';

const UploadBox = props => {
  const { fileHandler, uploadedFileName, isFormInvalid } = props;
  const fileInput = React.createRef();
  function openFileBrowser() {
    fileInput.current.click();
  }
  return (
    <form>
      <FormGroup row>
        <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">
          Upload
        </Label>
        <Col xs={4} sm={8} lg={10}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                color="info"
                style={{ color: 'white', zIndex: 0 }}
                onClick={openFileBrowser}
              >
                <i className="cui-file"></i> Browse&hellip;
              </Button>
              <input
                type="file"
                hidden
                onChange={e => fileHandler(e)}
                ref={fileInput}
                onClick={event => {
                  event.target.value = null;
                }}
                style={{ padding: '10px' }}
              />
            </InputGroupAddon>
            <Input
              type="text"
              className="form-control"
              value={uploadedFileName}
              readOnly
              invalid={isFormInvalid}
            />
            <FormFeedback>
              <Fade in={isFormInvalid} tag="h6" style={{ fontStyle: 'italic' }}>
                Please select a .xlsx file only !
              </Fade>
            </FormFeedback>
          </InputGroup>
        </Col>
      </FormGroup>
    </form>
  );
};

UploadBox.propTypes = {
  fileHandler: PropTypes.func.isRequired,
  uploadedFileName: PropTypes.string,
  isFormInvalid: PropTypes.bool.isRequired
};
export default UploadBox;
