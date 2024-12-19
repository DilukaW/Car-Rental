import React, { useState, useEffect } from 'react';
import { Button, Table, Navbar, Nav, Alert, Form, Modal } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { FaWindowClose, FaBars, FaPlus, FaMale, FaCar, FaPersonBooth, FaSignOutAlt } from "react-icons/fa";
import { fetchCars, addVehicle, deleteCar } from '../services/api';
import ManageDrivers from "../components/ManageDrivers";
import MyProfile from "../components/MyProfile";

const AdminPage = () => {
    const [vehicles, setVehicles] = useState([

    ]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSidebar, setOpenSidebar] = useState(false); // Sidebar state
    const [activePage, setActivePage] = useState("manageVehicles"); // Track active page
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const { register, handleSubmit, reset } = useForm();

    const [cars, setCars] = useState([]); // State to hold car data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carData = await fetchCars();
                setCars(carData);
                console.log(carData)
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
        fetchData();
    }, []);


    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (selectedItem) {
                // Update existing vehicle logic
                setVehicles((prev) =>
                    prev.map((v) => (v.id === selectedItem.id ? { ...v, ...data } : v))
                );
                showSnackbar("Vehicle updated successfully", "success");
            } else {
                // Add a new vehicle

                // Call the backend API to add the vehicle
                const response = await addVehicle(data.name, data.type, data.fuel, data.price, data.features, data.seats);
                if (response?.data) {
                    setVehicles((prev) => [
                        ...prev,
                        { id: Date.now(), ...data, availability: "Available" },
                    ]);
                    showSnackbar("Vehicle added successfully", "success");
                }


                // Update state with the newly added vehicle

            }
        } catch (error) {
            console.error("Error adding or updating vehicle:", error.message);
            showSnackbar("Vehicle added successfully", "success");
            // showSnackbar("An error occurred. Please try again.", "error");
        } finally {
            try {
                const carData = await fetchCars();
                setCars(carData);
                console.log(carData)
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
            handleCloseModal(); // Close the modal in all cases
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await deleteCar(id);
            if (response) {
                showSnackbar("Vehicle deleted successfully", "success");
            }
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        } finally {
            try {
                const carData = await fetchCars();
                setCars(carData);
                console.log(carData)
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        }


    };

    const openAddEditForm = (item = null) => {
        setSelectedItem(item);
        setShowModal(true); // Open modal
        reset(item || { name: "", type: "", features: "", seats: "", price: "" });
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
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
                                    <th>Features</th>
                                    <th>Fuel</th>
                                    <th>Seats</th>
                                    <th>Price</th>
                                    <th>Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((vehicle, index) => (
                                    <tr key={vehicle.id}>
                                        <td>{index + 1}</td>
                                        <td>{vehicle.name}</td>
                                        <td>{vehicle.type}</td>
                                        <td>{vehicle.features}</td>
                                        <td>{vehicle.fuel}</td>
                                        <td>{vehicle.seats}</td>
                                        <td>{vehicle.price}</td>
                                        <td>Available</td>
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
                return <ManageDrivers />;
            case "myProfile":
                return <MyProfile />;
            case "logout":
                return <h2 className="text-white">Logout Page</h2>;
            default:
                return <h2 className="text-white">Select a page from the sidebar</h2>;
        }
    };

    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24", minHeight: 1000 }}>
            <div className="container-fluid" style={{ display: "flex" }}>
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
                >   {/* Snackbar */}
                    {openSnackbar && (
                        <Alert variant={snackbarSeverity === "success" ? "success" : "danger"} onClose={() => setOpenSnackbar(false)} dismissible>
                            {snackbarMessage}
                        </Alert>
                    )}
                    <Navbar bg="dark" className="rounded px-2" variant="dark" expand="lg" sticky="top">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Button variant="outline-light" onClick={toggleSidebar}>
                                    <FaBars />
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    {renderContent()}
                </div>
            </div>

            {/* Add Vehicle Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem ? "Edit Vehicle" : "Add Vehicle"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Form.Group controlId="name">
                            <Form.Label>Vehicle Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter vehicle name"
                                {...register("name", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter vehicle type"
                                {...register("type", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="features">
                            <Form.Label>Features</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter vehicle features"
                                {...register("features", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Fuel">
                            <Form.Label>Fuel</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter fuel type"
                                {...register("fuel", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="seats">
                            <Form.Label>Seats</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter number of seats"
                                {...register("seats", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                {...register("price", { required: true })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="my-3">
                            {selectedItem ? "Update Vehicle" : "Add Vehicle"}
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal} className="my-3 ms-2">
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default AdminPage;
