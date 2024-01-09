import React, { useState, useEffect } from 'react'
import Topbar from '../common/Topbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import ApiService from '../../utils/ApiService';
import { useNavigate,useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'

function EditAuthor() {

  let params = useParams()
  const navigate = useNavigate()
  const [initialValues, setValues] = useState({ 
    name:'',
    date:'',
    bio:''
  })

  let formik = useFormik({
    initialValues:initialValues,
    validationSchema: Yup.object({
      name : Yup.string().max(20,'Title cannot exceed 20 characters')
                          .min(5,"Title cannot be shorter than 5 characters")
                          .required("Title cannot be empty"),
      bio : Yup.string().max(250,'Bio cannot exceed 250 characters')
                                .min(50,"Bio cannot be shorter than 50 characters")
                                .required("Bio cannot be empty"),
      date : Yup.string().required("Date cannot be empty")
    }) ,
    enableReinitialize: true,
    onSubmit : async(values) => {
      // console.log(values);
      let {id} = params
      values.id = id
      try {
        // console.log(values);
        let res = await ApiService.put(`/Formik_Task_json/${id}`,values)
        if(res.status === 200){
          navigate('/dashboard-author')
        }
      } catch (error) {
        alert("Failed to Edit a Author")
      }
    }
  })

  const getAuthorDataById = async() => {
    let {id} = params
    try {
      let res = await ApiService.get(`/Formik_Task_json/${id}`)
      if(res.status===200){
        console.log(res.data);
        setValues({ 
          name:res.data.name,
          date:res.data.date,
          bio:res.data.bio
        })
      }    
    }catch (error) {
      alert("Internal error")
    }
  }

  useEffect(()=>{
    getAuthorDataById();
  },[])

  return <>
    <Topbar/>
    <div>
      <Container>
        <Form className='mt-5' onSubmit={formik.handleSubmit}>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} placeholder="Enter Author Name"/>
              {formik.touched.name && formik.errors.name ? (<div style={{color: 'red'}}>{formik.errors.name}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" id="bio" name="bio" onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur} placeholder="Enter Author Bio"/>
              {formik.touched.bio && formik.errors.bio ? (<div style={{color: 'red'}}>{formik.errors.bio}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type='date' id="date" name="date" onChange={formik.handleChange} value={formik.values.date} onBlur={formik.handleBlur} placeholder="Enter published date"/>
              {formik.touched.date && formik.errors.date ? (<div style={{color: 'red'}}>{formik.errors.date}</div>) : null}
            </Form.Group>
          </Col>
          <Button variant="primary" type='submit'>Submit</Button>
        </Form>
      </Container>
    </div>
</>
}

export default EditAuthor