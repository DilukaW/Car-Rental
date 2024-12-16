import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form, Navbar, Nav, Alert } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { FaWindowClose, FaBars, FaPlus, FaMale, FaCar, FaPersonBooth, FaSignOutAlt } from "react-icons/fa";
import Navbar2 from "./Navbar";
import ManageDrivers from "./ManageDrivers";
import MyProfile from "./MyProfile";

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
    const [activePage, setActivePage] = useState("manageVehicles"); // Track active page

    const { register, handleSubmit, reset } = useForm();

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleFormSubmit = (data) => {
        if (selectedItem) {
            setVehicles((prev) =>
                prev.map((v) => (v.id === selectedItem.id ? { ...v, ...data } : v))
            );
            showSnackbar("Vehicle updated successfully", "success");
        } else {
            setVehicles((prev) => [
                ...prev,
                { id: Date.now(), ...data, availability: "Available" },
            ]);
            showSnackbar("Vehicle added successfully", "success");
        }
        closeAddEditForm();
    };

    const handleDelete = (id) => {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        showSnackbar("Vehicle deleted successfully", "success");
    };

    const openAddEditForm = (item = null) => {
        setSelectedItem(item);
        setOpenForm(true);
        reset(item || {});
    };

    const closeAddEditForm = () => {
        setOpenForm(false);
        setSelectedItem(null);
        reset();
    };

    const toggleSidebar = () => setOpenSidebar(!openSidebar);

    const renderContent = () => {
        switch (activePage) {
            case "manageVehicles":
                return (
                    <>
                        <Button
                            variant="primary"
                            className="my-4"
                            onClick={() => openAddEditForm()}
                        >
                            <FaPlus /> Add Vehicle
                        </Button>
                        <Table striped bordered hover className="table table-dark">
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
                    </>
                );
            case "manageDrivers":
                return <ManageDrivers />
            case "myProfile":
                return <MyProfile />
            case "logout":
                return <h2 className="text-white">Logout Page</h2>;
            default:
                return <h2 className="text-white">Select a page from the sidebar</h2>;
        }
    };

    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24" }}>

            <div className="container-fluid" style={{ display: "flex", height: "100vh" }}>
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
                    <Button
                        className="me-2"
                        variant="light"
                        onClick={toggleSidebar}
                        style={{ marginLeft: "auto", display: "block" }}
                    >
                        <FaWindowClose />
                    </Button>
                    <Nav className="flex-column" style={{ paddingLeft: "10px" }}>
                        <Nav.Link onClick={() => setActivePage("manageVehicles")} className="text-white">
                            <FaCar className="me-3" /> Manage Vehicles
                        </Nav.Link>
                        <Nav.Link onClick={() => setActivePage("manageDrivers")} className="text-white">
                            <FaPersonBooth className="me-3" /> Manage Drivers
                        </Nav.Link>
                        <Nav.Link onClick={() => setActivePage("myProfile")} className="text-white">
                            <FaMale className="me-3" /> My Profile
                        </Nav.Link>
                        <Nav.Link onClick={() => setActivePage("logout")} className="text-white">
                            <FaSignOutAlt className="me-3" /> Logout
                        </Nav.Link>
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
                    <Navbar bg="dark" className="rounded px-2" variant="dark" expand="lg" sticky="top">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Button variant="outline-light" onClick={toggleSidebar}>
                                    <FaBars />
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Navbar>

                    {openSnackbar && (
                        <Alert
                            variant={snackbarSeverity}
                            onClose={() => setOpenSnackbar(false)}
                            dismissible
                        >
                            {snackbarMessage}
                        </Alert>
                    )}

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
