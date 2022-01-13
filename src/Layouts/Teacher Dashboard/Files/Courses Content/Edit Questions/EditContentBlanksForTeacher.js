import React, { useState, useRef,} from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation,  useParams } from "react-router-dom";
import { updateCoursePlannings } from "../../Apis/apiForCoursePlanning";

function EditContentBlanksForTeacher() {
  let {id} = useParams()
  const location = useLocation();
  const editorRef = useRef(null);
  const history = useHistory()
  const log = (data) => {
      if (editorRef.current) {
        console.log(data)
        console.log(location.state.optionsQuestionFillInTheBlank)
        var contentFromTextArea = editorRef.current.getContent({ format: "text" });
        location.state.questioncontent = contentFromTextArea
        location.state.totalmarks = data.totalmarks
        location.state.optionsQuestionFillInTheBlank = data.optionsQuestionFillInTheBlank
        location.state.questiontitle = data.questiontitle
        location.state.teacherId = id
        console.log(location.state)
        updateCoursePlannings(location.state, location.state._id)
        history.push(`/teacher/list-of-classes/${id}`)
      }
  };
  const onSubmit = async (data) => {
      
      await log(data)
      //history.push("/placement-question-details")
    }
    const formik = useFormik({
      initialValues: {
         totalmarks:location.state.totalmarks,
         questiontitle:location.state.questiontitle,
         optionsQuestionFillInTheBlank:location.state.optionsQuestionFillInTheBlank,
      },

      //4 Make onSubmit propert to handle what happens to data on form submisison

      onSubmit: values => {

        
        //createTodo(formik.values)
        //redirecting 
        //history.push("/")

        onSubmit(formik.values)

      },

      //5 Make validation property
      
      validate: values => {
          
          let errors = {}

          const letters = /^[A-Za-z ]+$/;

          const cnic = /^[0-9--]+$/;

          const phone = /^[0-9]+$/;

          const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
          if(!values.totalmarks){
              errors.totalmarks = "Please enter Total Marks"
          }else if (!phone.test(values.totalmarks)) {
              errors.totalmarks = "Please enter digits only"
          }else if (symbols.test(values.totalmarks)) {
              errors.totalmarks = "Please enter digits only"
          }else if (values.totalmarks > 100) {
            errors.totalmarks = "Marks for the question cannot exceed 100"
        }else if(!values.questiontitle){
          errors.questiontitle = "Please eneter a Title for the Question"
        }
          return errors


      }


  })
  const [inputList, setInputList] = useState(location.state.optionsQuestionFillInTheBlank);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    if (inputList.length > 3 ){
      return "cannot exceed more than 4 options"
    }
    
    setInputList([...inputList, { options: "",}]);
  };
  const handleTextBox = (data) => {
    console.log(data, "handleText")
    formik.values.optionsQuestionFillInTheBlank = data
    console.log(formik.values)
  }
  const originalOptions = () => {
    console.log(location.state.optionsQuestionFillInTheBlank[0].options)
    return(
      <ul  className = "text-left p-3">
        <li>{location.state.optionsQuestionFillInTheBlank[0].options}</li>
        <li>{location.state.optionsQuestionFillInTheBlank[1].options}</li>
        <li>{location.state.optionsQuestionFillInTheBlank[2].options}</li>
        <li>{location.state.optionsQuestionFillInTheBlank[3].options}</li>
      </ul>
    )
 }
  return (
    <div>
        
<div className = "mt-5 pt-4">
{/* Content Wrapper */}
<div id="content-wrapper" className="d-flex flex-column">
{/* Main Content */}
<div id="content">
  {/* Begin Page Content */}
  <div className="containerBlackDashboard-fluid mt-5">
    {/* Page Heading */}
    <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Course Planning</h1>
    {/* DataTales Example */}
    <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4 text-center">
      <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
        <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}> Course Content Fill in the Blank Content Edit Panel</h5>
      </div>
      <div className="card-body">
      <form onSubmit={formik.handleSubmit}>
                <div className = "mt-4"> 
                      <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                          <label ><h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Instructions: Please follow the example below to create a <b><i>Fill In The Blank</i></b> Questions</h5></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                        <div className="text-left border border-dark">
                          <div className="m-3">
                            <h5>Q. The quick ______ fox jumps over the lazy dog</h5>
                            <h5>a) Yellow</h5>
                            <h5>b) Brown</h5>
                            <h5>c) Purple</h5>
                            <h5>d) Green</h5>
                          </div>
                        </div>
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2 " style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                          <label ><h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Question's Title</h5></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                      <input type="text" placeholder="Title for Question" name="questiontitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questiontitle} className="form-control" required  />
                      {formik.errors.questiontitle && formik.touched.questiontitle ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.questiontitle}</div>) : null}
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2 " style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                          <label ><h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Please edit your desired <b><i>Fill In The Blank</i></b> Question below</h5></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                        <Editor
                          apiKey='zbxzyzqkm6uw6oz4uywxx4kbvw59xasjkldmya07y0hfjupf'
                          onInit={(evt, editor) => editorRef.current = editor}
                          initialValue={location.state.questioncontent}
                          init={{
                          height: 500,
                          browser_spellcheck : true,
                          menubar: false,
                          plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}
                        />  
                      </div>
                      <hr />
                  </div>
                  </form>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2  text-left" style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                          <label ><h5 className="m-0 font-weight-bold text-white ">Options</h5></label>
                          <p className = "text-left"><b>Original Options: </b></p>
                          {originalOptions()}
                          <br />
                          <p><b> Update Options: </b></p>
                          <p>Please click <i>Add Option</i> to add more options and <i>Remove option</i> to remove the desired option.</p>
                          <p><b>Disclaimer:</b> Total number of Options cannot exceed more than four. Only four Options are allowed to be created.</p>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                        {inputList.map((x, i) => {
                        return (
                            <div className="box">
                            <input
                                    name="options"
                                    placeholder="Enter Option"
                                    value={x.options}
                                    onChange={e => handleInputChange(e, i)} className="form-control border-0 shadow-sm"
                            />
                            <div className="btn-box">
                                {inputList.length !== 1 && <div >
                            <button type="submit" className="btn m-2 shadow-sm  btn-outline-muted" onClick={() => handleRemoveClick(i)} style = {{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>
                              Remove Option
                            </button>
                            </div>}
                                
                                {inputList.length - 1 === i &&  <div >
                            <button type="submit" className="btn m-2 shadow-sm  btn-outline-muted" onClick={handleAddClick} style = {{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>
                              Add Option
                            </button>
                            </div>}
                            </div>
                            </div>
                        );
                        })}
                      </div>
                      <hr />
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                  <div className = "mt-4"> 
                        <div class="p-3 mb-2 " style = {{color : "white", backgroundColor : "rgba(55, 64, 85, 0.9)"}}>
                            <label><h5 className = "text-white">Total Marks</h5></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                              {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                              <input type="text" placeholder="Total Marks for the Question" name="totalmarks" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.totalmarks} className="form-control" required  />
                              {formik.errors.totalmarks && formik.touched.totalmarks ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.totalmarks}</div>) : null}
                        </div>
                        <hr />
                    </div>
                    <div className="">
                        <button type="submit" className="btn m-2 shadow-sm  btn-outline-muted">
                          Save Changes
                        </button>
                    </div>
                  </form>
      </div>
      {handleTextBox(inputList)}
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
    </div>
  );
}

export default EditContentBlanksForTeacher