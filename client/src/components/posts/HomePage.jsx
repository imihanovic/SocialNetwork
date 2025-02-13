import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error('User ID nije pronađen u localStorage');
        }

        const response = await fetch(`http://localhost:5000/posts/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log("Status odgovora:", response.status); 

        if (!response.ok) {
          throw new Error(`Neuspješan zahtjev za dohvaćanje postova, Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Tijelo odgovora:", data);

        setPosts(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Dobrodošli na svoju početnu stranicu</h1>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {posts.length === 0 && !loading && !error ? (
        <Alert variant="info">Nema dostupnih postova</Alert>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
