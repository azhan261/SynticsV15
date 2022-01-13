import React, { useState, useEffect }  from 'react'
import { Link, useHistory, useRouteMatch, useLocation,  useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Swal from 'sweetalert2'
import axios from 'axios';
import { getTeacherBatch, updateTeacher } from '../Apis/apiForTeachers';
import { createBatchs } from '../Apis/apiForBatches';


function TeacherSelectionBatchCreation() {

    let {id} = useParams()
    const location = useLocation();
    const history = useHistory()
    const [items, setItems] = useState([])
    var serialNumber = 0

    useEffect(() => {
        const fetchItems = async function() {
          const teacher = await getTeacherBatch(location.state.batchType)
          setItems(teacher)
        }
        fetchItems()
      }, []);

    const handlingSerialNumber = () => {
        serialNumber = serialNumber + 1
        return(
            <td>{serialNumber}</td>
        )
    }

    const handleAddTeacherIntoBatch = (data) => {
        console.log(location.state)
        data.batchTitle = location.state.batchTitle
        console.log(data)
        updateTeacher(data, data._id)
        window.location.reload();
    }


    const handleAssignProjectManager = (e) => {
      var idForTeacher = ''
      e.preventDefault()
      for (var i = 0; i < items.length; i++  ){
        if (items[i].batchTitle == location.state.batchTitle){
          idForTeacher = items[i]._id
          location.state.batchTeacherName = items[i].name
        }
      }
      
      location.state.batchTeacherID = idForTeacher
      console.log(location.state)
      history.push({
        pathname: `/admin/student/create-batch-manager-selection/${id}`,
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
        <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>List Of {/*{location.state.gender}*/} teacher</h5>
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
                            items.map(teacher => (
                                <tr key={teacher._id}>
                                 {handlingSerialNumber()}
                                <td>
                                <Link to={{
                                        pathname: `/admin/teacher-details/${id}`,
                                        state: teacher,
                                      }} className = "text-dark">{teacher.name}</Link>
                                </td>
                                <td>
                                  <Link to ={{
                                    pathname : `/admin/teacher-details/${id}`,
                                    state: teacher,

                                  }} className = "text-dark">{teacher.gender}</Link>
                                    
                                </td>
                               
                                <td>
                                <Link to ={{
                                    pathname : `/admin/teacher-details/${id}`,
                                    state: teacher,

                                  }} className = "text-dark">
                                    {teacher.email}</Link>
                                </td>
                                <td>
                                
                                    {teacher.batchTitle}
                                
                                </td>
                                <td>
                                  {teacher.batchTitle == location.state.batchTitle ? 
                              <div className="">
                                  <button className="btn btn-success m-2   btn-outline-muted"  >Teacher Added!</button>
                              </div>
                                :
                              <div className="">
                                <button className="btn m-2 shadow-sm  btn-outline-muted"   onClick={() => handleAddTeacherIntoBatch(teacher)}>Add Teacher</button>
                              </div>
                                }

                                </td>
                                </tr>
                            ))
                            }
                        </tbody>
          </table>
        </div>
        <button className='btn btn-primary' onClick = {(e) => handleAssignProjectManager(e)}>Assign Project Manager</button>
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

export default TeacherSelectionBatchCreation
