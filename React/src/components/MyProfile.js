import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Image, Modal } from "react-bootstrap";

const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+123456789",
        address: "123, Elm Street, Springfield",
        profilePicture: "https://via.placeholder.com/150",
    });

    const [tempProfile, setTempProfile] = useState({ ...profile });

    const handleEditToggle = () => {
        setTempProfile({ ...profile }); // Reset temp data
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = () => {
        setProfile(tempProfile); // Save changes
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setTempProfile((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="my-4 dark">
            <Row className="justify-content-center ">
                <Col md={8}>
                    <Card className="shadow-lg border-0 bg-dark text-white">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <Image
                                    src={profile.profilePicture}
                                    roundedCircle
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    className="border"
                                />
                                {isEditing && (
                                    <Form.Group className="mt-3">
                                        <Form.Label className="text-white">Profile Picture URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={tempProfile.profilePicture}
                                            onChange={(e) => handleInputChange("profilePicture", e.target.value)}
                                        />
                                    </Form.Group>
                                )}
                            </div>

                            <Form className=" justify-content-center">
                                <Row className="">
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Name:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.name}</p>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Email:</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="email"
                                                value={tempProfile.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.email}</p>
                                        )}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Phone</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.phone}</p>
                                        )}
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label><h4>Address</h4></Form.Label>
                                        {isEditing ? (
                                            <Form.Control
                                                type="text"
                                                value={tempProfile.address}
                                                onChange={(e) => handleInputChange("address", e.target.value)}
                                            />
                                        ) : (
                                            <p className="form-control-plaintext text-white">{profile.address}</p>
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
