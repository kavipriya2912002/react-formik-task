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

function EditBook() {

  let params = useParams()
  const navigate = useNavigate()
  const [initialValues, setValues] = useState({ 
    title:'',
    author:'',
    isbnNum:'',
    description:'',
    date:''
  })

  let formik = useFormik({
    initialValues:initialValues,
    validationSchema: Yup.object({
      title : Yup.string().max(40,'Title cannot exceed 40 characters')
                          .min(4,"Title cannot be shorter than 4 characters")
                          .required("Title cannot be empty"),
      author : Yup.string().max(20,'Author cannot exceed 20 characters')
                           .min(4,"Author cannot be shorter than 4 characters")
                           .required("Author cannot be empty"),
      isbnNum : Yup.string().matches(/^\d{17}$/,' Enter a valid 17 digit ISBN Number')
                            .required("ISBN Number cannot be empty"),
      description : Yup.string().max(250,'Description cannot exceed 250 characters')
                                .min(50,"Description cannot be shorter than 50 characters")
                                .required("Description cannot be empty"),
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
          navigate('/')
        }
      } catch (error) {
        alert("Failed to Edit a book")
      }
    }
  })

  const getBookdataById = async() => {
    let {id} = params
    try {
      let res = await ApiService.get(`/Formik_Task_json/${id}`)
      if(res.status===200){
        console.log(res.data);
        setValues({ 
          title:res.data.title,
          author:res.data.author,
          isbnNum:res.data.isbnNum,
          description:res.data.description,
          date:res.data.date,
        })
      }    
    }catch (error) {
      alert("Internal error")
    }
  }

  useEffect(()=>{
    getBookdataById();
  },[])

  return <>
    <Topbar/>
    <div>
      <Container>
        <Form className='mt-5' onSubmit={formik.handleSubmit}>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Title</b></Form.Label>
              <Form.Control type="text" id="title" name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} placeholder="Enter Book Title"/>
              {formik.touched.title && formik.errors.title ? (<div style={{color: 'red'}}>{formik.errors.title}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Author</b></Form.Label>
              <Form.Control type="text" id="author" name="author" onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur} placeholder="Enter Author Name"/>
              {formik.touched.author && formik.errors.author ? (<div style={{color: 'red'}}>{formik.errors.author}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>ISBN Number</b></Form.Label>
              <Form.Control type="text" id="isbnNum" name="isbnNum" onChange={formik.handleChange} value={formik.values.isbnNum} onBlur={formik.handleBlur} placeholder="Enter ISBN Number"/>
              {formik.touched.isbnNum && formik.errors.isbnNum ? (<div style={{color: 'red'}}>{formik.errors.isbnNum}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control as="textarea" rows={3} id="description" name="description" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} placeholder='Enter Description'/>
              {formik.touched.description && formik.errors.description ? (<div style={{color: 'red'}}>{formik.errors.description}</div>) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label><b>Published at</b></Form.Label>
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

export default EditBook