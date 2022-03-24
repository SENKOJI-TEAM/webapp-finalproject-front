import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";

export default function DonationManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [donations, setDonations] = useState([]);
  const [donationRows, setDonationRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const [donation, setDonation] = useState({
    itemName: "",
    quantity: 0,
    donatorName: "",
    contactNo: "",
  });

  // Input references
  const refItemName = useRef();
  const refQuantity = useRef();
  const refDonatorName = useRef();
  const refContactNo = useRef();
  
  useEffect(() => {
    fetch(`${API_URL}/donations`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e, i) => {
          return (
            <tr key={i}>
              <td>
                <FaPencilAlt
                  onClick={() => {
                    handleUpdate(e);
                  }}
                />
                &nbsp;
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>
              <td>{e.itemName}</td>
              <td>{e.quantity}</td>
              <td>{e.donatorName}</td>
              <td>{e.contactNo}</td>
            </tr>
          );
        });

        setDonations(data);
        setDonationRows(rows);
      });
  }, []);

  const handleClose = () => {
    setModeAdd(false);
    setShow(false);
  };

  const handleDelete = (donation) => {
    console.log(donation);
    if (window.confirm(`Are you sure to delete [${donation.itemName}]?`)) {
      fetch(`${API_URL}/donations/${donation._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);
          for (let i = 0; i < donations.length; i++) {
            if (donations[i]._id === donation._id) {
              donations.splice(i,1);
              break;
            }
          }

          const rows = donations.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.itemName}</td>
                <td>{e.quantity}</td>
                <td>{e.donatorName}</td>
                <td>{e.contactNo}</td>
              </tr>
            );
          });
  
          setDonations(donations);
          setDonationRows(rows);     
          handleClose();
        });
    }
  };

  const handleShow = () => setShow(true);

  const handleUpdate = (donation) => {
    console.log("Update Donation", donation);
  //   console.log(refCode);
  //   refCode.current = donation.code;

    setShow(true);
    setDonation(donation);
  };

  const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };

  const handleFormAction = () => {
    if (modeAdd) {
      // Add new donation
      const newDonation = {
        itemName: refItemName.current.value,
        quantity: refQuantity.current.value,
        donatorName: refDonatorName.current.value,
        contactNo: refContactNo.current.value,
      };
      console.log(newDonation);

      fetch(`${API_URL}/donations`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newDonation), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully added the donation
          console.log("POST Result", json);
          donations.push(json)
          const rows = donations.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.itemName}</td>
                <td>{e.quantity}</td>
                <td>{e.donatorName}</td>
                <td>{e.contactNo}</td>
              </tr>
            );
          });
  
          setDonations(donations);
          setDonationRows(rows);          
          handleClose();
        });
    } else {
      // Update donation
      const updatedDonation = {
        _id: donation._id,
        itemName: refItemName.current.value,
        quantity: refQuantity.current.value,
        donatorName: refDonatorName.current.value,
        contactNo: refContactNo.current.value,
      };
      console.log(updatedDonation);

      fetch(`${API_URL}/donations`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(updatedDonation), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully updated the donation
          console.log("PUT Result", json);
          for(let i=0; i<donations.length; i++) {
            if (donations[i]._id === updatedDonation._id) {
              console.log(donations[i],updatedDonation)
              donations[i] = updatedDonation;
              break;
            }
          }

          const rows = donations.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.itemName}</td>
                <td>{e.quantity}</td>
                <td>{e.donatorName}</td>
                <td>{e.contactNo}</td>
              </tr>
            );
          });
  
          setDonations(donations);
          setDonationRows(rows);     
          handleClose();
        });
    }
  };

  return (
    <>
      <Container>
        <h1>Donation Management</h1>
        {/* API_URL: {API_URL} */}
        <Button variant="outline-dark" onClick={handleShowAdd}>
          <FaPlus /> Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
              <th className={style.textLeft}>Item Name</th>
              <th className={style.textLeft}>Item Quantity</th>
              <th className={style.textLeft}>Donator Name</th>
              <th className={style.textLeft}>Contact Number</th>
            </tr>
          </thead>
          <tbody>{donationRows}</tbody>
        </Table>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modeAdd ? "Add New Donation" : "Update Dontation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>Item Name</Col>
              <Col>
                <input type="text" ref={refItemName} defaultValue={donation.itemName} />
              </Col>
            </Row>
            <Row>
              <Col>Item Quantity</Col>
              <Col>
                <input
                  type="number"
                  ref={refQuantity}
                  defaultValue={donation.quantity}
                />
              </Col>
            </Row>
            <Row>
              <Col>Donator Name</Col>
              <Col>
                <input type="text" ref={refDonatorName} defaultValue={donation.donatorName} />
              </Col>
            </Row>
            <Row>
              <Col>Contact Number</Col>
              <Col>
                <input type="text" ref={refContactNo} defaultValue={donation.contactNo} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
            {modeAdd ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
