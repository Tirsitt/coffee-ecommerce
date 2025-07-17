import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Form, Alert, Spinner } from 'react-bootstrap';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProfilePage() {
  const { user, updateUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email,
        phone: (user as any).phone || '',
        address: (user as any).address || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      const dirty = JSON.stringify(newData) !== JSON.stringify({
        name: user?.name || '',
        email: user?.email || '',
        phone: (user as any).phone || '',
        address: (user as any).address || ''
      });
      setIsDirty(dirty);
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;
    
    setLoading(true);
    setError('');
    try {
      await updateUser({
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });
      setIsDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Breadcrumbs paths={[
        { name: "Home", link: "/" },
        { name: "Profile" }
      ]} />
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-4">Profile Settings</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <div className="d-flex gap-2 right">
                    <Button
                      variant="outline-secondary"
                      disabled={!isDirty || loading}
                      onClick={() => window.location.reload()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!isDirty || loading}
                    >
                      {loading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}