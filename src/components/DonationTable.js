import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import style from "../mystyle.module.css";
import { FaTrashAlt } from "react-icons/fa";

function DonationTable({ data, clearDataItems, updateDataItems }) {
  // const [dataDonations, setDataDonations] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // let sum = 0;
    const z = data.map((v, i) => {
      // let amount = v.qty * v.price;
      // sum += amount;
      return (
        <tr key={i}>
          {/* <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v._id)} />
          </td> */}
          <td className={style.textCenter}>{v.itemName}</td>
          <td className={style.textCenter}>{v.quantity}</td>
          <td className={style.textCenter}>{v.donatorName}</td>
          <td className={style.textCenter}>{v.contactNo}</td>
        </tr>
      );
    });

    setDataRows(z);
    //setTotal(sum);
  }, [data]);

  const deleteItem = (_id => {
    var z = data.filter((value, index, arr) => value._id != _id);
    updateDataItems(z);
  });

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1>Recent Donation</h1>
      {/* <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th style={{ width: "20px" }}>&nbsp;</th> */}
            <th className={style.textLeft}>Name</th>
            <th className={style.textLeft}>Qty</th>
            <th className={style.textLeft}>Donator</th>
            <th className={style.textLeft}>ContactNo</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        {/* <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot> */}
      </Table>
    </div>
  );
}

export default DonationTable;
