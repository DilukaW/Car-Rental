import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { getUserById, updateUserById } from '../services/api';


const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({});
    const [tempProfile, setTempProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchData = async () => {
                try {
                    const userData = await getUserById(userId);
                    setProfile(userData);
                    setTempProfile(userData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, []);

    const handleEditToggle = () => {
        setTempProfile({ ...profile }); // Reset temp profile to match current profile
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const updatedData = await updateUserById(userId, tempProfile);
            setProfile(updatedData); // Update the displayed profile
            setIsEditing(false);
            alert("Profile updated successfully!");

        } catch (error) {
            console.error('Error saving profile changes:', error);
        }
    };


    const handleInputChange = (field, value) => {
        setTempProfile((prev) => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return <div className="text-center text-white my-4">Loading...</div>;
    }

    return (
        <div className="my-4 dark">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg border-0 bg-dark text-white">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <Image

                                    src={profile.image || profile}
                                    roundedCircle
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    className="border"
                                />
                                {isEditing && (
                                    <Form.Group className="mt-3">
                                        <Form.Label className="text-white">Profile Picture URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={tempProfile.image || ''}
                                            onChange={(e) => handleInputChange("image", e.target.value)}
                                        />
                                    </Form.Group>
                                )}
                            </div>

                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Name:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.displayName || ''}
                                                onChange={(e) => handleInputChange("displayName", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.displayName}</p>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Email:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="email"
                                                value={tempProfile.email || ''}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.email}</p>
                                        )}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Phone:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.contact || ''}
                                                onChange={(e) => handleInputChange("contact", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.contact}</p>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Street:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.street || ''}
                                                onChange={(e) => handleInputChange("street", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.street}</p>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>City:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.city || ''}
                                                onChange={(e) => handleInputChange("city", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.city}</p>
                                        )}
                                    </Col>
                                </Row>
                            </Form>

                            <div className="text-center mt-4">
                                {isEditing ? (
                                    <div>
                                        <Button
                                            variant="success"
                                            className="me-2"
                                            onClick={handleSaveChanges}
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={handleEditToggle}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={handleEditToggle}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default MyProfile;
