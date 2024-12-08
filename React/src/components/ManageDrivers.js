import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form, Navbar, Nav, Alert } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { FaWindowClose, FaBars, FaPlus, FaMale, FaCar, FaPersonBooth, FaSignOutAlt } from "react-icons/fa";
import Navbar2 from "./Navbar";

const ManageDrivers = () => {
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

    return (<><Button
        variant="primary"
        className="my-4"
        onClick={() => openAddEditForm()}
    >
        <FaPlus /> Add Driver
    </Button><Table striped bordered hover className="table table-dark">
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
        </Table></>
    );

}

export default ManageDrivers;