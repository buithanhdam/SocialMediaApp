import React from 'react';
import {Modal,Form,Col,Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';

const ProfileModal = ({modalOpened,setModalOpened,data}) => {
  const {password,...other} =data;
  const [formData,setFormData] = useState(data);
  const [profileImage,setProfileImage] = useState(null);
  const [coverImage,setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const {user} = useSelector((state)=>{return state.authReducer.authData});

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
    
  }
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name ==="profilePicture" ?setProfileImage(img):setCoverImage(img);
    }
  };
  const handleUpdate = (e)=>{
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name",filename)
      data.append("file",profileImage);
      UserData.profilePicture = filename;
      
      try {
          dispatch(uploadImage(data))
      } catch (error) {
          console.log(error)
      }
    };
    if (coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name",filename)
      data.append("file",coverImage);
      UserData.coverPicture = filename;
      
      try {
          dispatch(uploadImage(data))
      } catch (error) {
          console.log(error)
      }
    };
    dispatch(updateUser(param.id,UserData));
    setModalOpened(false);
  }
  
  return (
    <Modal show={modalOpened} onHide={()=>{setModalOpened(false)}} size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Edit Info</Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          
            <Form>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                          onChange={handleChange}
                          value={formData.firstname}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          name="lastname"
                          placeholder="Last Name"
                          onChange={handleChange}
                          value={formData.lastname}
                        />
                      </Form.Group>
                    </Col>
                  </Row> 
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      placeholder="Bio"
                      name="about" value={formData.about} rows={2} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          name="livein"
                          placeholder="Lives In"
                          onChange={handleChange}
                          value={formData.livein}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          name="age"
                          placeholder="Age"
                          onChange={handleChange}
                          value={formData.age}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                   
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                          type="file"
                          name="profilePicture"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cover Image</Form.Label>
                        <Form.Control
                          type="file"
                          name="coverPicture"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>         
            </Form>

        </Modal.Body>

        <Modal.Footer>
          <button className='Button' onClick={handleUpdate} style={{padding: "10px"}}>Update</button>
            
        </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal;