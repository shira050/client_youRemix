// import React from 'react';
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
// import { USER } from '../../services/apiService';
// import { Link } from 'react-router-dom';

// export default function Profile() {

//     const currentUser = JSON.parse(localStorage.getItem(USER));

//     return (
//         <div className="vh-100" style={{}}>
//             <MDBContainer className="container py-5 h-100">
//                 <MDBRow className="justify-content-center align-items-center h-100">
//                     <MDBCol md="12" xl="4">
//                         <MDBCard style={{ borderRadius: '15px' }}>
//                             <MDBCardBody className="text-center">
//                                 <div className="mt-3 mb-4">
//                                     <MDBCardImage src={currentUser.avatar}
//                                         className="rounded-circle m-auto" fluid style={{ width: '100px' }} />
//                                 </div>
//                                 <MDBTypography tag="h4">{currentUser.firstName} {currentUser.lastName}</MDBTypography>
//                                 <MDBCardText className="text-muted mb-4">
//                                     {currentUser.email} <span className="mx-2">|</span> <a href="#!">RemixSpotify.com</a> {/* //TODO-את הכתובת של האתר */}
//                                 </MDBCardText>
//                                 {/* <div className="mb-4 pb-2">
//                   <MDBBtn outline floating>
//                     <MDBIcon fab icon="facebook" size="lg"  />
//                   </MDBBtn>
//                   <MDBBtn outline floating className="mx-1">
//                     <MDBIcon fab icon="twitter" size="lg" />
//                   </MDBBtn>
//                   <MDBBtn outline floating>
//                     <MDBIcon fab icon="skype" size="lg" />
//                   </MDBBtn>
//                 </div> */}
//                                 <Link to="/users/signUp">   <MDBBtn rounded size="lg" color='success'>
//                                     EDIT
//                                 </MDBBtn>
//                                 </Link>
//                                 {/* <div className="d-flex justify-content-between text-center mt-5 mb-2"> */}
//                                 <div>
//                                     <MDBCardText className="m-1 h5">13</MDBCardText>
//                                     <MDBCardText className="small text-muted mb-0">Songs that I Made <strong>ByMyself</strong> </MDBCardText>
//                                 </div>
//                                 {/* <div className="px-3">
//                     <MDBCardText className="mb-1 h5">8512</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
//                   </div>
//                   <div>
//                     <MDBCardText className="mb-1 h5">4751</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
//                   </div>*/}
//                                 {/* </div>  */}
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//         </div>
//     );
// }



import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { USER } from '../../services/apiService';
import { Link } from 'react-router-dom';

export default function Profile() {
    const currentUser = JSON.parse(localStorage.getItem(USER));

  return (
    <div className="vh-100" style={{  }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol  className="mt-5 col-10">
            <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag='h6'>{currentUser.firstName} {currentUser.lastName}</MDBTypography>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="small mb-0"><MDBIcon far icon="clock me-2" />3 hrs</p>
                    <p className="fw-bold mb-0">$90</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '70px' }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src={currentUser.avatar}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">{currentUser.email} </p>
                      <ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: '#1B7B2C' }}>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                      </ul>

                    </div>
                    <div>
                      <MDBBtn outline color="dark" rounded size="sm">+ Follow</MDBBtn>
                      <Link to="/users/editProfile">  <MDBBtn outline color="dark" rounded size="sm" className="mx-1">Edit profile</MDBBtn></Link>
                      <MDBBtn outline color="dark" floating size="sm"><MDBIcon fas icon="comment" /></MDBBtn>
                    </div>
                  </div>
                </div>
                <hr />
                <MDBCardText>52 comments</MDBCardText>
                <MDBBtn color="success" rounded block size="lg">
                  <MDBIcon far icon="clock me-2" /> Book now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

