import React, { useState, useEffect }  from 'react'
import { Link, useHistory, useRouteMatch, useLocation,  useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Formik, FormikConsumer, useFormik } from 'formik'
import { updatePayment } from '../Apis/apiForPayments';

function UpdatePayment() {
    let {id} = useParams()
    const [items, setItems] = useState([])
    const location = useLocation();
    const history = useHistory()
    var serialNumber = 0
    /*
    useEffect(() => {
      const fetchItems = async function() {
        const contents = await getCourseForTeacher(id)
        console.log(contents)
        setItems(contents)
        console.log(items)
      }
      fetchItems()
      
    }, []);
    */
           /*const { register, handleSubmit } = useForm({
      defaultValues: { text: todo ? todo.text : "" },
    });*/
  
    /*const submitHandler = handleSubmit((data) => {
      onSubmit(data)
    });*/

  
    //const [referenceName, setReferenceName] = useState()
    //console.log(referenceName)
    
    const onSubmitHandler = async (data) => {
        console.log(data)
        updatePayment(data, location.state._id)
        
        history.push({
            pathname:`/admin/student-payments/${id}`,
            state: location.state
        })
        
    }
    
    /*const onSubmit = async (data) => {
      //console.log(data)
      await createCoursePlannings(data)
      //await createQuestions(data)
      //await createPlacementTestQuestions(data)
      //redirecting 
      //history.push("/")
    };
    */
      //1 Start of by making initial values 
      const formik = useFormik({
          initialValues: {
             studentName:location.state.studentName,
             studentID:location.state._id,
             payableAmount:location.state.payableAmount,
             amountPaid:'',
             month:location.state.month,
             datePaid:'',
             dueDate: '',
             status:'',
          },
  
          //4 Make onSubmit propert to handle what happens to data on form submisison
  
          onSubmit: values => {
  
            
            //createTodo(formik.values)
            //redirecting 
            //history.push("/")
  
            //onSubmit(formik.values)
            onSubmitHandler(formik.values)
  
          },
  
          //5 Make validation property
          validate: values => {
                
              let errors = {}
  
              const letters = /^[A-Za-z ]+$/;
  
              const cnic = /^[0-9--]+$/;
  
              const phone = /^[0-9]+$/;
  
              const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
              
            if ((symbols.test(values.amountPaid)) | (letters.test(values.amountPaid))) {
                errors.amountPaid = "Please enter digits only"
            }
            else if(values.amountPaid > parseInt(location.state.payableAmount)){
                errors.amountPaid = "Amount Paid cannot exceed Payable Amount"
            }
              return errors
  
  
          }
  
      })
  
      console.log("Form errors", formik.errors)
      return (
          <>
        <div className = "mt-5 pt-4">
                 {/* Content Wrapper */}
  <div id="content-wrapper" className="d-flex flex-column">
  {/* Main Content */}
  <div id="content">
    {/* Begin Page Content */}
    <div className="containerBlackDashboard-fluid mt-5">
      {/* Page Heading */}
      <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Update Payment For {location.state.studentName}</h1>
      {/* DataTales Example */}
      <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4 text-center">
        
        <div className="card-body">
          <div>
          <form onSubmit={formik.handleSubmit}>
                    
                        <div>
                        </div>
                        <div className = "mt-4"> 
            
                        <div>
                            <div className="form-group">
                              {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                              <label htmlFor="sel1">Amount Paid for Payable Amount of {location.state.payableAmount}</label>
                              <input type="text" placeholder="Total amount paid" name="amountPaid" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.amountPaid} className="form-control" required  />
                              {formik.errors.amountPaid && formik.touched.amountPaid ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.amountPaid}</div>) : null}
                            </div>
                        </div>
                  
                    </div>
                    <div>
                          <div className="form-group">
                          <label htmlFor="sel1">Date Paid for the Month of {location.state.month}</label>
                          <input type="date"  name="datePaid" value={formik.values.datePaid} onChange={formik.handleChange} onBlur={formik.handleBlur}className="form-control" required />
                          {formik.touched.datePaid ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.datePaid}</div>) : null}
                        </div>
                      </div>

                  
                        <center>
                        <div>    
                        <div>
                          <button type="submit" className="btn m-2 shadow-sm  btn-outline-muted" style = {{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>
                            Submit
                          </button>
                        </div>
                      </div>
                      </center>
                      </form>
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

export default UpdatePayment
