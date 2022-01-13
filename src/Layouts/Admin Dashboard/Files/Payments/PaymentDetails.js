import React, { useState, useEffect }  from 'react'
import { Link, useHistory, useRouteMatch, useLocation,  useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from 'axios';
import { getPaymentsSpecific } from '../Apis/apiForPayments';

function PaymentDetails() {
    let {id} = useParams()
    const [items, setItems] = useState([])
    const location = useLocation();
    const history = useHistory()
    var serialNumber = 0
  
    useEffect(() => {
      const fetchItems = async function() {
        
        const teachers = await getPaymentsSpecific(location.state._id)
        setItems(teachers)
      }
      fetchItems()
    }, []);
  
    const Swal = require('sweetalert2')
  
  
    const handlingSerialNumber = () => {
        serialNumber = serialNumber + 1
        return(
            <td>{serialNumber}</td>
        )
    }

    const handlePaymentsView = (data) => {
        history.push({
          pathname:`/admin/student-details/${id}`,
          state: data
        })
    }
  
    const handleUpdatePayment = (data) => {
      history.push({
        pathname:`/admin/update-payment-record/${id}`,
        state: data
      })
  }

  const handleSendRemind = (data) => {
    history.push({
      pathname:`/admin/student-activity-category/${id}`,
      state: data
    })
}

  const handleCreatePayment = (e) => {
    history.push({
      pathname:`/admin/create-payment-record/${id}`,
      state: location.state
    })
  }
      return (
                      <>
          <div>
           {/* Content Wrapper */}
  <div id="content-wrapper" className="d-flex flex-column mt-5 pt-4">
  {/* Main Content */}
  <div id="content">
    {/* Begin Page Content */}
    <div className="containerBlackDashboard-fluid mt-5">
      {/* Page Heading */}
      <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Payment Data</h1>
      
      {/* DataTales Example */}
      <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4">
        <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
          <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>List Of {/*{location.state.gender}*/} Payments For {location.state.name}</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="tableBlackDashboard table-bordered text-center"  width="100%" cellSpacing={0}>
            <thead>
                              <tr>
                                <th>Serial Number</th>
                                <th>Month</th>
                                <th>Payable Amount</th>
                                <th>Amount Paid</th>
                                <th>Date Paid</th>
                                <th colSpan="2" >Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                              items.map(students => (
                                  <tr key={students._id}>
                                   {handlingSerialNumber()}
                                  <td>
                                    {students.month}
                                  </td>
                                  <td>
                                    {students.payableAmount}
                                  </td>
                                  <td>
                                    {students.amountPaid}
                                  </td>
                                  <td>
                                    {students.datePaid}
                                  </td>
                                 
                                  <td>
                                    <div className="">
                                      <button className="btn m-2 shadow-sm  btn-outline-muted"   onClick={() => handleUpdatePayment(students)}>Update Payment</button>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="">
                                      <button className="btn m-2 shadow-sm  btn-outline-muted"   onClick={() => handleSendRemind(students)}>Send Reminder</button>
                                    </div>
                                  </td>
                                  </tr>
                              ))
                              }
                          </tbody>
            </table>
            <button className = "btn btn-primary" onClick={(e) => handleCreatePayment(e)}>Create Payment Record</button>
          </div>
        </div>
      </div>
    </div>
  
    {/* /.containerBlackDashboard-fluid */}
  </div>
  {/* End of Main Content */}
  {/* Footer */}
  <footer className="sticky-footer bg-transparent">
    <div className="containerBlackDashboard my-auto">
      <div className="copyright text-center my-auto">
        <span></span>
      </div>
    </div>
  </footer>
  {/* End of Footer */}
  </div>
  {/* End of Content Wrapper */}
  {/* End of Page Wrapper */}
          </div>
        </>
      )
}

export default PaymentDetails
