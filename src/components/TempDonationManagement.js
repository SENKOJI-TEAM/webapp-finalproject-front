import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";

export default function TempDonationManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [items, setItems] = useState([]);
  const [itemRows, setItemRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);

  const [item, setItem] = useState({
    itemName: "",
    quantity: 0,
    donatorName: "",
    contactNo: ""
  });

  // Input References
  const refItemName = useRef();
  const refQuantity = useRef();
  const refDonatorName = useRef();
  const refContactNo = useRef();

  useEffect(() => {
    fetch(`${API_URL}/donations`)
      .then((res) => res.json())
      .then((data) => {

        const rows = data.map((e,i) => {
          return (
            <tr key={i}>
              <td style={{width: '40px'}}>
                {/* add icons (make sure to import first) */}
                <FaPencilAlt onClick={() => {handleUpdate(e)}} />
                {/* ways to create empty space */}
                &nbsp; {/* {' '} */}
                <FaTrashAlt onClick={() => {handleDelete(e)}} /> 
              </td>
              <td>{e.itemName}</td>
              <td>{e.quantity}</td>
              <td>{e.donatorName}</td>
              <td>{e.contactNo}</td>
            </tr>
          );
        });

        setItems(data);
        setItemRows(rows);
      });
  }, []);

  // Set whether to show or close the Modal
  const handleClose = () => {
    setModeAdd(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  // Show UPDATE Modal
  const handleUpdate = (item) => {
    console.log("Update Item", item)
    //console.log(refCode)
    //refCode.code = item.code

    setShow(true);
    setItem(item);
  };

  // Show ADD Modal
  const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };

  const handleDelete = (item) => {
    console.log(item);
    if (window.confirm(`Are you sure to delete [${item._id}]?`)) {
      fetch(`${API_URL}/donations/${item._id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
      })
      .then(res => res.json())
      .then(json => {
        console.log("DELETE Result", json);
         for (let i = 0; i < items.length; i++) {
          if (items[i]._id === item._id) {
            items.splice(i, 1);
            break;
          }
        }

        const rows = items.map((e, i) => {
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
              <td>{e.name}</td>
              <td>{e.neededAmount}</td>
            </tr>
          );
        });
      
        setItems(items);
        setItemRows(rows);     
        handleClose();
      });
    }
  };

  const handleFormAction = () => {
    if (modeAdd) {
      // Add new item
      const newItem = {
        itemName: refItemName.current.value,
        quantity: refQuantity.current.value,
        donatorName: refDonatorName.current.value,
        contactNo: refContactNo.current.value
      };
      console.log(newItem);

      // POST data
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
        body: JSON.stringify(newItem), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(json => {
        console.log("POST Result", json);
          items.push(json)
          const rows = items.map((e, i) => {
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
  
          setItems(items);
          setItemRows(rows);          
          handleClose();
      });
      
    } else {
      // Update item
      const updatedItem = {
        // _id is required for updation
        _id: item._id,
        itemName: refItemName.current.value,
        quantity: refQuantity.current.value,
        donatorName: refDonatorName.current.value,
        contactNo: refContactNo.current.value
      };
      console.log(updatedItem)

      // PUT data
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
        body: JSON.stringify(updatedItem), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(json => {
        // Sucessfully updated the item
        console.log("PUT Result", json)
        for (let i=0; i<items.length; i++) {
          if (items[i]._id === updatedItem._id) {
            items[i] = updatedItem;
            break;
          }
        }
      
        
        const rows = items.map((e, i) => {
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
  
          setItems(items);
          setItemRows(rows);     
          handleClose();
        }); 
      }
    
    
  };

  return (
    <>
      <Container>
        <h1>Item Management</h1>
        {/* API_URL: {API_URL} */}
        <Button variant="outline-dark" onClick={handleShowAdd}>
          <FaPlus /> Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
          
              <th className={style.textCenter}>Name</th>
              <th className={style.textCenter}>Need</th>
            </tr>
          </thead>
          <tbody>
            {itemRows}
          </tbody>
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
            {modeAdd ? "Add New Item" : "Update item"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col>Item Name</Col>
              <Col>
                <input type="text" ref={refItemName} defaultValue={item.itemName} />
              </Col>
            </Row>
            <Row>
              <Col>Item Quantity</Col>
              <Col>
                <input type="number" ref={refQuantity} defaultValue={item.neededAmount} />
              </Col>
            </Row>
            <Row>
              <Col>Donator Name</Col>
              <Col>
                <input type="text" ref={refDonatorName} defaultValue={item.donatorName} />
              </Col>
            </Row>
            <Row>
              <Col>Contact Number</Col>
              <Col>
                <input type="text" ref={refContactNo} defaultValue={item.contactNo} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
            {modeAdd ? 'Add' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
