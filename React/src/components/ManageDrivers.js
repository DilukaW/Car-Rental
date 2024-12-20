import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

import { addDriver, deleteDriver, fetchDrivers, updateDriverById } from "../services/api";
import { FaPlus } from "react-icons/fa";

const ManageDrivers = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const { register, handleSubmit, reset } = useForm();
    const [drivers, setDrivers] = useState([]); // State to hold driver data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driverData = await fetchDrivers();
                setDrivers(driverData);
                console.log(driverData)
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

                await updateDriverById(selectedItem.id, data)
                setDrivers((prev) =>
                    prev.map((v) => (v.id === selectedItem.id ? { ...v, ...data } : v))
                );
                showSnackbar("Driver updated successfully", "success");
            } else {

                const response = await addDriver(data.name, data.email, data.contact);
                if (response?.data) {
                    setDrivers((prev) => [
                        ...prev,
                        { id: Date.now(), ...data, availability: "Available" },
                    ]);
                    showSnackbar("Driver added successfully", "success");
                }
            }
        } catch (error) {
            console.error("Error adding or updating driver:", error.message);
            // showSnackbar("Vehicle added successfully", "success");
            showSnackbar("An error occurred. Please try again.", "error");
        } finally {
            handleCloseModal();
        }
    };

    const handleDelete = async (id) => {

        // console.log(id)
        try {
            const response = await deleteDriver(id);
            if (response) {
                showSnackbar("Vehicle deleted successfully", "success");
            }
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        } finally {

            const driverData = await fetchDrivers();
            setDrivers(driverData);
            console.log(driverData);

        }
    };

    const openAddEditForm = (item = null) => {
        setSelectedItem(item);
        setShowModal(true);
        reset(item || {});
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        reset();
    };

    return (
        <>
            {openSnackbar && (
                <Alert variant={snackbarSeverity === "success" ? "success" : "danger"} onClose={() => setOpenSnackbar(false)} dismissible>
                    {snackbarMessage}
                </Alert>
            )}
            <Button
                variant="primary"
                className="my-4"
                onClick={() => openAddEditForm()}
            >
                <FaPlus /> Add Driver
            </Button>
            <Table striped bordered hover className="table table-dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Driver Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver, index) => (
                        <tr key={driver.id}>
                            <td>{index + 1}</td>
                            <td>{driver.name}</td>
                            <td>{driver.email}</td>
                            <td>{driver.contact}</td>
                            <td>Available</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => openAddEditForm(driver)}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(driver.id)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    <Trash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add/Edit Driver Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem ? "Edit Driver" : "Add Driver"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Form.Group controlId="name">
                            <Form.Label>Driver Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter driver name"
                                {...register("name", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                {...register("email", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group controlId="contact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Contact Number"
                                {...register("contact", { required: true })}
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit" className="my-3">
                            {selectedItem ? "Update Driver" : "Add Driver"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleCloseModal}
                            className="my-3 ms-2"
                        >
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ManageDrivers;
