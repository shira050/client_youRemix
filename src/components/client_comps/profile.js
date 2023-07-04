import React, { useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { USER } from "../../services/apiService";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = JSON.parse(localStorage.getItem(USER));
  console.log("llll");

  if (currentUser)
    return (
      <div className="vh-100 " style={{}}>
        <MDBContainer>
          <MDBRow className="justify-content-center">
            <MDBCol className="mt-5 col-10">
              <MDBCard
                style={{ borderRadius: "15px", backgroundColor: "#93e2bb" }}
              >
                <MDBCardBody className="p-4 text-black text-center">
                  <MDBCardTitle>
                    <MDBTypography tag="h6">
                      {currentUser.firstName} {currentUser.lastName}
                    </MDBTypography>
                  </MDBCardTitle>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: "70px" }}
                        className="img-fluid rounded-circle border border-dark border-3"
                        src={currentUser.avatar}
                        alt="Generic placeholder image"
                        fluid
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex flex-row align-items-center mb-2">
                        <p className="mb-0 me-2">{currentUser.email} </p>
                        <p className="mb-0 me-2 text-black text-xl">{currentUser.role} </p>
                      </div>
                    </div>
                    <Link to="/users/editProfile">
                      {" "}
                      <MDBBtn
                        outline
                        color="dark"
                        rounded
                        size="sm"
                        className="mx-1"
                      >
                        Edit profile
                      </MDBBtn>
                    </Link>
                  </div>
                  <hr />
                  {currentUser.lastSearch.length > 0 ? (
                    <MDBCardText>
                      {currentUser.lastSearch.length} songs that I made
                    </MDBCardText>
                  ) : (
                    <MDBCardText>didnt make any songs yet...</MDBCardText>
                  )}
                  <Link to="/songs/playlist">
                    <MDBBtn
                      className="m-2"
                      color="success"
                      rounded
                      block
                      size="lg"
                    >
                      <MDBIcon far icon="clock me-2" /> SEE ALL
                    </MDBBtn>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
}
