import React, { useState, useEffect }  from 'react'
import { Link, useHistory, useRouteMatch, useLocation,  useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Swal from 'sweetalert2'
import axios from 'axios';
import { getRegistrationsBatch, updateRegistration } from '../Apis/apiForRegistrations';
import { getTeachers } from '../Apis/apiForTeachers';

function StudentAndTeacherBatchSelection() {

    let {id} = useParams()
    const location = useLocation();
    const history = useHistory()
    const [items, setItems] = useState([])
    var serialNumber = 0

    useEffect(() => {
        const fetchItems = async function() {
          const students = await getRegistrationsBatch(location.state.batchType)
          setItems(students)
        }
        fetchItems()
      }, []);

    const handlingSerialNumber = () => {
        serialNumber = serialNumber + 1
        return(
            <td>{serialNumber}</td>
        )
    }

    const handleAddStudentIntoBatch = (data) => {
        data.batchTitle = location.state.batchTitle
        console.log(data)
        updateRegistration(data, data._id)
        window.location.reload();
    }


    const handleAssignTeacher = (e) => {
      e.preventDefault()
      history.push({
        pathname:`/admin/student/create-batch-teacher-selection/${id}`,
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
    <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Batch: {location.state.batchTitle}</h1>
    
    {/* DataTales Example */}
    <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4">
      <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
        <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>List Of {/*{location.state.gender}*/} students</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="tableBlackDashboard table-bordered text-center"  width="100%" cellSpacing={0}>
          <thead>
                            <tr>
                              <th>Serial Number</th>
                              <th>Full Name</th>
                              <th>Gender</th>
                              <th>Email</th>
                              <th>Batch</th>
                              <th colSpan="4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            items.map(students => (
                                <tr key={students._id}>
                                 {handlingSerialNumber()}
                                <td>
                                <Link to={{
                                        pathname: `/admin/student-details/${id}`,
                                        state: students,
                                      }} className = "text-dark">{students.name}</Link>
                                </td>
                                <td>
                                  <Link to ={{
                                    pathname : `/admin/student-details/${id}`,
                                    state: students,

                                  }} className = "text-dark">{students.gender}</Link>
                                    
                                </td>
                               
                                <td>
                                <Link to ={{
                                    pathname : `/admin/student-details/${id}`,
                                    state: students,

                                  }} className = "text-dark">
                                    {students.email}</Link>
                                </td>
                                <td>
                                
                                    {students.batchTitle}
                                
                                </td>
                                <td>
                                  {students.batchTitle == location.state.batchTitle ? 
                              <div className="">
                                  <button className="btn btn-success m-2   btn-outline-muted"  >Student Added!</button>
                              </div>
                                :
                              <div className="">
                                <button className="btn m-2 shadow-sm  btn-outline-muted"   onClick={() => handleAddStudentIntoBatch(students)}>Add Student</button>
                              </div>
                                }

                                </td>
                                </tr>
                            ))
                            }
                        </tbody>
          </table>
        </div>
        <button className='btn btn-primary' onClick = {(e) => handleAssignTeacher(e)}>Assign Teacher</button>
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

export default StudentAndTeacherBatchSelection
