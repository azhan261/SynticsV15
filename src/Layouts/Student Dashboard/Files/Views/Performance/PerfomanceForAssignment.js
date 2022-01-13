import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation,  useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2'
import { getAssignmentSpecific } from '../../Apis/apiForAnswers';


function PerfomanceForAssignment() {
    let {id} = useParams()
    const location = useLocation();
    const editorRef = useRef(null);
    const history = useHistory()


    const [totalObtainedMathFoundations, setTotalObtainedMarksMathFoundation] = useState()
    const [totalObtainedMarksPython, setTotalObtainedMarksPython] = useState()
    const [totalObtainedMarksDataStructures, setTotalObtainedMarksDataStructures] = useState()
    const [totalObtainedMarksIntroToArtificialIntelligence , setTotalObtainedMarksIntroToArtificialIntelligence ] = useState()
    const [totalObtainedMarksAdvancedPythonLibraries, setTotalObtainedMarksAdvancedPythonLibraries] = useState()
    const [totalObtainedMarksMachineLearning, setTotalObtainedMarksMachineLearning] = useState()
    const [totalObtainedMarksDeepLearning, setTotalObtainedMarksDeepLearning] = useState()
    
    const [totalOriginalMarksMathFoundation, setTotalOriginalMarksMathFoundation] = useState()
    const [totalOriginalMarksPython, setTotalOriginalMarksPython] = useState()
    const [totalOriginalMarksDataStructures, setTotalOriginalMarksDataStructures] = useState()
    const [totalOriginalMarksIntroToArtificialIntelligence , setTotalOriginalMarksIntroToArtificialIntelligence ] = useState()
    const [totalOriginalMarksAdvancedPythonLibraries, setTotalOriginalMarksAdvancedPythonLibraries] = useState()
    const [totalOriginalMarksMachineLearning, setTotalOriginalMarksMachineLearning] = useState()
    const [totalOriginalMarksDeepLearning, setTotalOriginalMarksDeepLearning] = useState()
    const [studentDataValues, setStudentDataValues] = useState([])
     
    useEffect(() => {
      
        const fetchStudentData = async function() {
          if(location.state == null){
            const studentData = await getAssignmentSpecific(id)
            console.log(studentData)
            setStudentDataValues(studentData)
          }
          else{
            const studentData = await getAssignmentSpecific(location.state._id)
            console.log(studentData)
            setStudentDataValues(studentData)
          }
          
        }
        fetchStudentData() 
        
    }, [])
    const timerId = setTimeout(() => {
        chartsData()
      }, 1500);
      var testing = ''
      var arrForMathFoundationValues = [];
      var arrForMathFoundationValuesObtainedMarks = [];

      var arrForPythonValues = [];
      var arrForPythonValuesObtainedMarks = [];

      var arrForDataStructuresValues = [];
      var arrForDataStructuresValuesObtainedMarks = [];

      var arrForIntroToArtificialIntelligenceValues = [];
      var arrForIntroToArtificialIntelligenceValuesObtainedMarks = [];

      var arrForAdvancedPythonLibrariesValues = [];
      var arrForAdvancedPythonLibrariesValuesObtainedMarks = [];

      var arrForMachineLearningValues = [];
      var arrForMachineLearningValuesObtainedMarks = [];
      
      var arrForDeepLearningValues = [];
      var arrForDeepLearningValuesObtainedMarks = [];
      
      var totForMathFoundationValues = 0;
      
      var totForMathFoundationValuesObtainedMarks = 0;
      
      var totForPythonValue = 0;
      
      var totForPythonValueObtainedMarks = 0;
      
      var totForDataStructuresValues = 0;
      
      var totForDataStructuresValuesObtainedMarks = 0;
      
      var totForIntroToArtificialIntelligenceValues = 0;
      
      var totForIntroToArtificialIntelligenceValuesObtainedMarks = 0;
      
      var totForAdvancedPythonLibrariesValues = 0;
      
      var totForAdvancedPythonLibrariesValuesObtainedMarks = 0;
      
      var totForMachineLearningValues = 0;
      
      var totForMachineLearningValuesObtainedMarks = 0;

      var totForDeepLearningValues = 0;
      
      var totForDeepLearningValuesObtainedMarks = 0;

    const chartsData = () => {

        for (var i=0;i<studentDataValues.length;i++){
            if (studentDataValues[i].coursetype === "Math Foundations"){
                    arrForMathFoundationValues.push(studentDataValues[i].totalMarks)
                    arrForMathFoundationValuesObtainedMarks.push(studentDataValues[i].marksObtained)
            }
            else if (studentDataValues[i].coursetype === "Python"){
                    arrForPythonValues.push(studentDataValues[i].totalMarks)
                    arrForPythonValuesObtainedMarks.push(studentDataValues[i].marksObtained)
            }
            else if (studentDataValues[i].coursetype === "Intro to Artificial Intelligence"){
                    arrForDataStructuresValues.push(studentDataValues[i].totalMarks)
                    arrForDataStructuresValuesObtainedMarks.push(studentDataValues[i].marksObtained)
            }
            else if (studentDataValues[i].coursetype === "Data-structures "){
                    arrForIntroToArtificialIntelligenceValues.push(studentDataValues[i].totalMarks)
                    arrForIntroToArtificialIntelligenceValuesObtainedMarks.push(studentDataValues[i].marksObtained)
            }
            else if (studentDataValues[i].coursetype === " Advanced Python Libraries"){
                    arrForAdvancedPythonLibrariesValues.push(studentDataValues[i].totalMarks)
                    arrForAdvancedPythonLibrariesValuesObtainedMarks.push(studentDataValues[i].marksObtained)
            }
            else if (studentDataValues[i].coursetype === "Machine Learning"){
                    arrForMachineLearningValues.push(studentDataValues[i].totalMarks)
                    arrForMachineLearningValuesObtainedMarks.push(studentDataValues[i].marksObtained)
            }
            else if (studentDataValues[i].coursetype === "Deep Learning"){
                    arrForDeepLearningValues.push(studentDataValues[i].totalMarks)
                    arrForDeepLearningValuesObtainedMarks.push(studentDataValues[i].marksObtained)
      }
        }
     
        for(var i=0;i<arrForMathFoundationValues.length;i++){
            totForMathFoundationValues +=  parseInt(arrForMathFoundationValues[i]);
        }
        for(var i=0;i<arrForMathFoundationValuesObtainedMarks.length;i++){
            if(arrForMathFoundationValuesObtainedMarks[i] == ""){
                arrForMathFoundationValuesObtainedMarks[i] = 0
              }
            totForMathFoundationValuesObtainedMarks +=  parseInt(arrForMathFoundationValuesObtainedMarks[i]);
        }
        for(var i=0;i<arrForPythonValues.length;i++){
            totForPythonValue +=  parseInt(arrForPythonValues[i]);
        }
        for(var i=0;i<arrForPythonValuesObtainedMarks.length;i++){
            if(arrForPythonValuesObtainedMarks[i] == ""){
                arrForPythonValuesObtainedMarks[i] = 0
              }
            totForPythonValueObtainedMarks +=  parseInt(arrForPythonValuesObtainedMarks[i]);
            
        }
        for(var i=0;i<arrForDataStructuresValues.length;i++){
            totForDataStructuresValues +=  parseInt(arrForDataStructuresValues[i]);
        }
        for(var i=0;i<arrForDataStructuresValuesObtainedMarks.length;i++){
            if(arrForDataStructuresValuesObtainedMarks[i] == ""){
                arrForDataStructuresValuesObtainedMarks[i] = 0
              }
            totForDataStructuresValuesObtainedMarks +=  parseInt(arrForDataStructuresValuesObtainedMarks[i]);
        }
        for(var i=0;i<arrForIntroToArtificialIntelligenceValues.length;i++){
            totForIntroToArtificialIntelligenceValues +=  parseInt(arrForIntroToArtificialIntelligenceValues[i]);
        }
        for(var i=0;i<arrForIntroToArtificialIntelligenceValuesObtainedMarks.length;i++){
            if(arrForIntroToArtificialIntelligenceValuesObtainedMarks[i] == ""){
                arrForIntroToArtificialIntelligenceValuesObtainedMarks[i] = 0
              }
            totForIntroToArtificialIntelligenceValuesObtainedMarks +=  parseInt(arrForIntroToArtificialIntelligenceValuesObtainedMarks[i]);
        }
        for(var i=0;i<arrForAdvancedPythonLibrariesValues.length;i++){
            totForAdvancedPythonLibrariesValues +=  parseInt(arrForAdvancedPythonLibrariesValues[i]);
        }
        for(var i=0;i<arrForAdvancedPythonLibrariesValuesObtainedMarks.length;i++){
            if(arrForAdvancedPythonLibrariesValuesObtainedMarks[i] == ""){
                arrForMathFoundationValuesObtainedMarks[i] = 0
              }
            totForAdvancedPythonLibrariesValuesObtainedMarks +=  parseInt(arrForAdvancedPythonLibrariesValuesObtainedMarks[i]);
        }
        for(var i=0;i<arrForMachineLearningValues.length;i++){
            totForMachineLearningValues +=  parseInt(arrForMachineLearningValues[i]);
        }
        for(var i=0;i<arrForMachineLearningValuesObtainedMarks.length;i++){
            if(arrForMachineLearningValuesObtainedMarks[i] == ""){
                arrForMachineLearningValuesObtainedMarks[i] = 0
              }
            totForMachineLearningValuesObtainedMarks +=  parseInt(arrForMachineLearningValuesObtainedMarks[i]);
            
        }
        for(var i=0;i<arrForDeepLearningValues.length;i++){
            totForDeepLearningValues +=  parseInt(arrForDeepLearningValues[i]);
        }
        for(var i=0;i<arrForDeepLearningValuesObtainedMarks.length;i++){
          if(arrForDeepLearningValuesObtainedMarks[i] == ""){
              arrForDeepLearningValuesObtainedMarks[i] = 0
            }
          totForDeepLearningValuesObtainedMarks +=  parseInt(arrForDeepLearningValuesObtainedMarks[i]);
          
      }
        
        setTotalObtainedMarksMathFoundation(totForMathFoundationValuesObtainedMarks)
        setTotalObtainedMarksPython(totForPythonValueObtainedMarks)
        setTotalObtainedMarksDataStructures(totForDataStructuresValuesObtainedMarks)
        setTotalObtainedMarksIntroToArtificialIntelligence (totForIntroToArtificialIntelligenceValuesObtainedMarks)
        setTotalObtainedMarksAdvancedPythonLibraries(totForAdvancedPythonLibrariesValuesObtainedMarks)
        setTotalObtainedMarksMachineLearning(totForMachineLearningValuesObtainedMarks)
        setTotalObtainedMarksDeepLearning(totForDeepLearningValuesObtainedMarks)

        setTotalOriginalMarksMathFoundation(totForMathFoundationValues)
        setTotalOriginalMarksPython(totForPythonValue)
        setTotalOriginalMarksDataStructures(totForDataStructuresValues)
        setTotalOriginalMarksIntroToArtificialIntelligence (totForIntroToArtificialIntelligenceValues)
        setTotalOriginalMarksAdvancedPythonLibraries(totForAdvancedPythonLibrariesValues)
        setTotalOriginalMarksMachineLearning(totForMachineLearningValues)
        setTotalOriginalMarksDeepLearning(totForDeepLearningValues)

        console.log([Math.floor(totForMathFoundationValuesObtainedMarks), totForPythonValueObtainedMarks, totForDataStructuresValuesObtainedMarks, 
                    totForIntroToArtificialIntelligenceValuesObtainedMarks, totForAdvancedPythonLibrariesValuesObtainedMarks, totForMachineLearningValuesObtainedMarks])
    }
    return (
        <>
        <div>
        <div className = "mt-5 pt-4">
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="containerBlackDashboard-fluid mt-5">
            {/* Page Heading */}
            <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Performance</h1>
            {/* DataTales Example */}
            <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4 text-center">
              <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
                <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Performance Charts For Assignments</h5>
              </div>
              <div className="card-body">
                  <Bar 
                    data = {{
                        labels: ['Math Foundations', 'Python', 'Data-structures ', 'Intro to Artificial Intelligence', 'Advanced Python Libraries', 'Machine Learning', 'Deep Learning'],
                        datasets: [{
                            label: 'Content Results',
                            data: [totalObtainedMathFoundations, totalObtainedMarksPython, totalObtainedMarksDataStructures, totalObtainedMarksIntroToArtificialIntelligence ,
                                    totalObtainedMarksAdvancedPythonLibraries, totalObtainedMarksMachineLearning,  totalObtainedMarksDeepLearning],
                                },
                                {
                                    label : 'Original Marks',
                                    data: [totalOriginalMarksMathFoundation, totalOriginalMarksPython, totalOriginalMarksDataStructures, totalOriginalMarksIntroToArtificialIntelligence ,
                                           totalOriginalMarksAdvancedPythonLibraries, totalOriginalMarksMachineLearning, totalOriginalMarksDeepLearning],
                                    backgroundColor: "orange"
                                } 
                            ],
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                  />
              </div>
            </div>
            <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4 text-center">
              <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
                <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}></h5>
              </div>
              <div className="card-body">
              <div className="table-responsive">
        <table className="tableBlackDashboard table-bordered"  width="100%" cellSpacing={0}>
        <thead>
                              <tr>
                              <th>Content</th>
                              <th>Math Foundations </th>
                              <th>Python</th>
                              <th>Data-structures </th>
                              <th>Intro to Artificial Intelligence</th>
                              <th>Advanced Python Libraries</th>
                              <th>Machine Learning</th>
                              <th>Deep Learning</th>
                              </tr>
                          </thead>
                          <tbody>
                            <tr>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Original Marks
                                </td>
                                <td>{totalOriginalMarksMathFoundation}</td>
                                <td>{totalOriginalMarksPython}</td>
                                <td>{totalOriginalMarksDataStructures}</td>
                                <td>{totalOriginalMarksIntroToArtificialIntelligence }</td>
                                <td>{totalOriginalMarksAdvancedPythonLibraries}</td>
                                <td>{totalOriginalMarksMachineLearning}</td>
                                <td>{totalOriginalMarksDeepLearning}</td>
                                
                        
                            </tr>
                            <tr>
                                <td>
                                    Obtained Marks
                                </td>
                                <td>
                                    {totalObtainedMathFoundations}
                                </td>
                                <td>
                                    {totalObtainedMarksPython}
                                </td>
                                <td>
                                   {totalOriginalMarksDataStructures}
                                </td>
                                <td>
                                    {totalObtainedMarksIntroToArtificialIntelligence }
                                </td>
                                <td>
                                    {totalObtainedMarksAdvancedPythonLibraries}
                                </td>
                                <td>
                                    {totalObtainedMarksMachineLearning}
                                </td>
                                <td>
                                    {totalObtainedMarksDeepLearning}
                                </td>
                       
                            </tr>
                          </tbody>
                    </table>
                
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
              </div>
              </>
    )
}

export default PerfomanceForAssignment
