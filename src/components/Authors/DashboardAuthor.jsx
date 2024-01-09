import React,  { useState,useEffect }  from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Topbar from '../common/Topbar'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/ApiService';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

function DashboardAuthor() {

  const [authorData, setAuthorData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getAuthorData()
  },[])

  const getAuthorData = async() => {
    try {
      let res = await ApiService.get('/ReactFormik')
     
      if(res.status === 200){
        setAuthorData(res.data)
      }
    } catch (error) {
      alert("data fetch failed")
    }
  }

  const handleDelete = async(id) => {
    try {
      let res = await ApiService.delete(`/ReactFormik/${id}`)
      
      if(res.status === 200){
        getAuthorData();
      }
    } catch (error) {
      alert("data removal failed")
    }
  }

  return <>
    <Topbar/>
    <Container className='dash-container'>
    <Container className="d-flex justify-content-center align-items-center flex-column" >
      <Button className='mt-3' onClick={()=>navigate(`/add-author`)}>Add Author</Button>
    </Container>
      <Row className='d-flex justify-content-start flex-row'>
      <div className='mt-3'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Author's Name</th>
                    <th>Author's DOB</th>
                    <th>Author's Bio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    authorData.map((e,i)=>{
                      return <>
                        <tr key={i}>
                          <td>{e.id}</td>
                          <td>{e.name}</td>
                          <td>{e.date}</td>
                          <td>{e.bio}</td>
                          <td>
                            <Button onClick={()=>navigate(`/edit-author/${e.id}`)}>Edit</Button>
                            &nbsp;
                            <Button variant='danger' onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                          </td>
                        </tr>
                      </>
                    })
                  }
                </tbody>
              </Table>
            </div>
      </Row>
    </Container>
    
  </>
}

export default DashboardAuthor