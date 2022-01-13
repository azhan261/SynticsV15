
import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation,  useParams } from "react-router-dom";
import { getRegistrations } from '../Apis/apiForRegistrations';
import { getTeachers } from '../Apis/apiForTeachers';

function CreateBatch() {
  let {id} = useParams()
  const [items, setItems] = useState()
  const [file, setFile] = useState()
  const [filesNewName, setFilesNewName] = useState(id)
  const [newName, setNewName] = useState([])
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
  const history = useHistory()

  //const [referenceName, setReferenceName] = useState()
  //console.log(referenceName)
  
  const randomValue = Math.floor((Math.random() * 100000) + 1)
  const randomName = id + randomValue

  const log = (data) => {
    console.log(data)
    //var contentFromTextArea = editorRef.current.getContent({ format: "text" });
    /*
    location.state.questioncontent = data.questioncontent
    location.state.questiontitle = data.questiontitle
    location.state.totalmarks = data.totalmarks
    location.state.teacherId = id
    location.state.currentDate = new Date()
    location.state.referenceName = location.state.referenceName + ".mp3"
    console.log(location.state)
    if ((location.state.startDate != null) && (location.state.endDate != null)) {
      createAssignmentPlannings(location.state)
      history.push(`/teacher/list-of-classes-assignments/${id}`)
    }
    else{
      createCoursePlannings(location.state)
      history.push(`/teacher/list-of-classes/${id}`)
    }
    */
   history.push({
     pathname : `/admin/student/create-batch-student-selection/${id}`,
     state: data
   })
  
};

  console.log(randomName)
  const onSubmitHandler = async (data) => {
  
    await log(data)  
    //history.push('/placement-question-details')
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
          batchTitle:'',
          batchType:'',
          batchStartDate:'',
          batchEndDate:'',
          batchStatus:'',
          batchDescription:'',
          batchAttachmentsReference: '',
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
    <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}></h1>
    {/* DataTales Example */}
    <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4 text-center">
      <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
        <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Batch Creation Panel</h5>
      </div>
      <div className="card-body">
        <div>
        <form onSubmit={formik.handleSubmit}>
        <div className = "mt-4"> 
                    <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                        <label><h5 className = "text-white">Batch Title</h5></label>
                    </div>
                    <div class="p-3 mb-2 bg-light text-dark">
                    <input type="text" placeholder="Short Title For Batch" name="batchTitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.batchTitle} className="form-control" required  />
                    {formik.errors.batchTitle && formik.touched.batchTitle ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.batchTitle}</div>) : null}
                    </div>
                    <hr />
                </div>
                <div className = "mt-4"> 
                    <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                        <label><h5 className = "text-white">Batch Type</h5></label>
                    </div>
                    <div class="p-3 mb-2 bg-light text-dark">
                    <select name="batchType" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.batchType} className="form-control" >
                            <option>Select Batch Type</option>                  
                            <option >Artificial Intelligence (Machine Learning & Deep Learning)</option>
                            <option >Full-stack Web Development</option>
                          </select>
                          {formik.touched.batchType ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.batchType}</div>) : null}
                    </div>
                    <hr />
                </div>
                <div className = "mt-4"> 
                    <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                        <label><h5 className = "text-white">Batch Start Date</h5></label>
                    </div>
                    <div class="p-3 mb-2 bg-light text-dark">
                    <input type="date" name="batchStartDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.batchStartDate} className="form-control" required  />
                    {formik.errors.batchStartDate && formik.touched.batchStartDate ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.batchStartDate}</div>) : null}
                    </div>
                    <hr />
                </div>
                <div className = "mt-4"> 
                    <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                        <label><h5 className = "text-white">Batch End Date</h5></label>
                    </div>
                    <div class="p-3 mb-2 bg-light text-dark">
                    <input type="date" name="batchEndDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.batchEndDate} className="form-control" required  />
                    {formik.errors.batchEndDate && formik.touched.batchEndDate ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.batchEndDate}</div>) : null}
                    </div>
                    <hr />
                </div>
                <div className = "mt-4"> 
                    <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                        <label><h5 className = "text-white">Batch Description</h5></label>
                    </div>
                    <div class="p-3 mb-2 bg-light text-dark">
                    <textarea rows="4" cols="50"  name="batchDescription" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.batchDescription} className="form-control" required >
                      Enter Batch description...</textarea>
                    {formik.errors.batchDescription && formik.touched.batchDescription ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.batchDescription}</div>) : null}
                    </div>
                    <hr />
                </div>
                      <center>
                      <div>    
                      <div className="">
                        <button type="submit" className="btn m-2 shadow-sm  btn-outline-muted" style = {{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>
                          Create Batch
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

export default CreateBatch
