import React from "react";
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,} from "mdbreact";

const FormPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
              </MDBCardHeader>
              <label htmlFor="defaultFormEmailEx" className="grey-text font-weight-light"> Your Name </label>
              <input type="name" id="defaultFormEmailEx" className="form-control" placeholder="Name" />
              <label htmlFor="defaultFormPasswordEx" className="grey-text font-weight-light"> Your password </label>
              <input type="password" id="defaultFormPasswordEx" className="form-control" placeholder="Password"/>

              <div className="text-center mt-4">
                <MDBBtn color="light-blue" className="mb-3" type="submit">
                  Login
                </MDBBtn>
              </div>

              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Not a member yet? <a href="#!" className="green-text ml-1 font-weight-bold">
                    Register
                  </a></p>
                  <p><a href="#!" className="green-text ml-1 font-weight-bold">
                  Forgot Password?
                  </a></p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;