import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Topbar from '../common/Topbar';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/ApiService';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function DashboardBook() {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    try {
      let res = await ApiService.get('/ReactFormik');
      if (res.status === 200) {
        setBookData(res.data);
      }
    } catch (error) {
      alert('Data fetch failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await ApiService.delete(`/ReactFormik/${id}`);
      if (res.status === 200) {
        getBookData();
      }
    } catch (error) {
      alert('Data removal failed');
    }
  };

  const renderCards = () => {
    return bookData.map((e, i) => (
      <Col key={i} xs={12} md={4} className='mb-4'>
        <Card style={{
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
              }}>          
            <Card.Body>
            <Card.Title>
              <strong>Title :</strong> {e.title}
            </Card.Title>
            <Card.Text>
              <strong>Author :</strong> {e.author}
            </Card.Text>
            <Card.Text>
              <strong>ISBN No :</strong> {e.isbnNum}
            </Card.Text>
            <Card.Text>
              <strong>Description :</strong> {e.description}
            </Card.Text>
            <Card.Text>
              <strong>Published At :</strong> {e.date}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-right justify-content-end">
            <Button variant='primary' onClick={() => navigate(`/edit-book/${e.id}`)}>
              Edit
            </Button>
            &nbsp;
            <Button variant='danger' onClick={() => handleDelete(e.id)}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <Topbar /><br/>
      <Container  style={{ backgroundColor: '#93F5A4' }}>
      <Container className="d-flex justify-content-center align-items-center flex-column" >
        <Button className='mt-3' variant='success' onClick={() => navigate(`/add-book`)}>
          Add Book
        </Button>
      </Container><br/>
      <Container>      
        <Row className='mt-3'>{renderCards()}</Row>
      </Container>
      </Container>

    </>
  );
}

export default DashboardBook;