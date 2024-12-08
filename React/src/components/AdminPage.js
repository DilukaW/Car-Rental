import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form, Navbar, Nav, NavDropdown, IconButton, Alert } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

const AdminPage = () => {
    const [vehicles, setVehicles] = useState([
        { id: 1, name: "Toyota Prius", type: "Car", availability: "Available" },
        { id: 2, name: "Ford F-150", type: "Truck", availability: "Unavailable" },
        { id: 3, name: "Honda Civic", type: "Car", availability: "Available" },
    ]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSidebar, setOpenSidebar] = useState(true); // Sidebar state

    const { register, handleSubmit, reset } = useForm();

    // Show Snackbar (Alert in Bootstrap)
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    // Add or Edit Vehicle
    const handleFormSubmit = (data) => {
        if (selectedItem) {
            // Edit
            setVehicles((prev) =>
                prev.map((v) => (v.id === selectedItem.id ? { ...v, ...data } : v))
            );
            showSnackbar("Vehicle updated successfully", "success");
        } else {
            // Add
            setVehicles((prev) => [
                ...prev,
                { id: Date.now(), ...data, availability: "Available" },
            ]);
            showSnackbar("Vehicle added successfully", "success");
        }
        closeAddEditForm();
    };

    // Delete Vehicle
    const handleDelete = (id) => {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        showSnackbar("Vehicle deleted successfully", "success");
    };

    // Open Add/Edit Form
    const openAddEditForm = (item = null) => {
        setSelectedItem(item);
        setOpenForm(true);
        reset(item || {});
    };

    // Close Add/Edit Form
    const closeAddEditForm = () => {
        setOpenForm(false);
        setSelectedItem(null);
        reset();
    };

    const toggleSidebar = () => setOpenSidebar(!openSidebar);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <div
                style={{
                    width: openSidebar ? "250px" : "0",
                    transition: "width 0.3s",
                    backgroundColor: "#343a40",
                    position: "fixed",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    overflowX: "hidden",
                    paddingTop: "20px",
                }}
            >
                <Button variant="light" onClick={toggleSidebar} style={{ marginLeft: "auto", display: "block" }}>
                    Close
                </Button>
                <Nav className="flex-column" style={{ paddingLeft: "10px" }}>
                    <Nav.Link href="#home" className="text-white">Dashboard</Nav.Link>
                    <Nav.Link href="#manage" className="text-white">Manage Vehicles</Nav.Link>
                </Nav>
            </div>

            {/* Main Content Area */}
            <div
                style={{
                    marginLeft: openSidebar ? "250px" : "0",
                    width: "100%",
                    transition: "margin-left 0.3s",
                    padding: "20px",
                }}
            >
                {/* Navbar (AppBar) */}
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={toggleSidebar}>
                                Toggle Sidebar
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* Snackbar (Bootstrap Alert) */}
                {openSnackbar && (
                    <Alert variant={snackbarSeverity} onClose={() => setOpenSnackbar(false)} dismissible>
                        {snackbarMessage}
                    </Alert>
                )}

                {/* Add/Edit Vehicle Button */}
                <Button
                    variant="primary"
                    onClick={() => openAddEditForm()}
                    style={{ marginBottom: "20px" }}
                >
                    Add Vehicle
                </Button>

                {/* Vehicle Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.availability}</td>
                                <td>
                                    <Button variant="warning" onClick={() => openAddEditForm(vehicle)}>
                                        <Pencil />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(vehicle.id)} style={{ marginLeft: "10px" }}>
                                        <Trash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Add/Edit Vehicle Form Modal */}
                <Modal show={openForm} onHide={closeAddEditForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedItem ? "Edit Vehicle" : "Add Vehicle"}</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Modal.Body>
                            <Form.Group controlId="vehicleName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter vehicle name"
                                    {...register("name", { required: true })}
                                />
                            </Form.Group>

                            <Form.Group controlId="vehicleType">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter vehicle type"
                                    {...register("type", { required: true })}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeAddEditForm}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminPage;
