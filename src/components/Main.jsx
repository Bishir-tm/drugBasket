import React, { useState, useEffect } from 'react';
import Link from './Link';

function removeWords(inputString, number) {
  // Split the string into an array of words
  const wordsArray = inputString.split(' ');

  // Remove the first two elements from the array
  wordsArray.splice(0, number);

  // Join the remaining words back into a string
  const resultString = wordsArray.join(' ');
  
  return resultString;
}



const linkItems = [
  "warnings",
  "dosage_and_administration",
  "description",
  "overdosage",
  "indications_and_usage",
  "contraindications",
  "boxed_warning",
  "precautions",
  "information_for_patients",
  "drug_interactions",
  "pregnancy",
  "nursing_mothers",
  "how_supplied",
  "storage_and_handling",
]

const links = linkItems.map((item)=>{
  return (
      <Link item = {item} itemText = {item.replace(/_/g, " ")} />
      )} 
      )
      
      function Result(props){
        console.log(props.data)
        
        return (
      <div className="container mt-4">
          <div>{links}</div>
          <div className="card">
              <div className="card-header bg-white">
                  <h1 className="display-1  text-center border-bottom py-3">{props.data.openfda.brand_name} <span className="text-danger">|</span> {props.data.openfda.generic_name}</h1>
              </div>
              <div className="card-body">

                  {/* Description */}
                  <div>
                      <h2 id="description" className="h1 border-bottom py-3">Description</h2>
                      <p>{props.description[0]}</p>
                  </div>
                 
                  {/* Warning */}
                  <div  className="accordion border-start border-danger border-5 accordion-flush " id="accordionPanelsStayOpenExample">
                      <div className="accordion-item alert alert-danger">
                          <h2 id="boxed_warning" className="accordion-header" id="panelsStayOpen-headingOne">
                              <button className="text-danger  h2 fs-2 accordion-button bg-white" type="button" props-bs-toggle="collapse" props-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                  Warning
                              </button>
                          </h2>
                          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                              <div className="accordion-body">
                                  <strong>{removeWords(props.boxed_warning[0],0)}</strong>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Indications and Usage */}
                  <div>
                      <h2 id="indications_and_usage" className="h1 border-bottom py-3">Indications and Usage</h2>
                      <p>{props.indications_and_usage[0]}</p>
                  </div>

                  {/* Dosage and Administration */}
                  <div>
                      <h2 id="dosage_and_administration" className="h1 border-bottom py-3">Dosage and Administration</h2>
                      <p>{props.dosage_and_administration[0]}</p>
                  </div>
                 
                  {/* Dosage and Administration */}
                  <div>
                      <h2 id="dosageAndAdministration" className="h1 border-bottom py-3">Dosage and Administration</h2>
                      <p>{props.dosage_and_administration[0]}</p>
                  </div>

              </div>
          </div>
      </div>
  )
}


const Main = () => {
  // States
  const [drugName, setDrugName] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  
  // collect user input
  const handleInputChange = (event) => {
    setDrugName(event.target.value);
  }

  
  function searchDrug() {
    if (!drugName) {
      setError('Please enter a drug name.');
      setData('');
    } else {
      // construct API url
      const apiUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${
        drugName
      }+OR+openfda.generic_name:${
        drugName
      }+OR+openfda.substance_name:${
        drugName
      }&limit=1`;

      // fetch(apiUrl)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.results && data.results.length > 0) {
      //       console.log(data.results);
      //       setData(data);
      //       setError('');
      //     } else {
      //       setData('');
      //       setError(`No results found for ${drugName}\n check your spelling and try again!`);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //     setError(error.message + ' Check your Internet connection and try again');
      //     setData('');
      //   });
    }
  }

  
  setError('');
  
  return (
    <div>
       <form action="">
            <div className="home-search-box m-5 d-flex border border-3 border-primary rounded-pill">
                <input className="form-control bg-transparent border-0"
                  type="text"
                  value={drugName}
                  onChange={handleInputChange}
                  placeholder="Enter drug name"
                />
                <button 
                  className="search-submit-button" 
                  type="button"
                  onClick={searchDrug}
                >
                  <img src="icons/search.svg" className="icon" alt="search"  />
                </button>

                <button 
                  className="search-barcode-button" type="button">
                  <img src="icons/barcode-outline.svg"    className="icon" alt="scan barcode"  />
                </button>
            </div>
            {console.log(error)}
        </form>
        {   
           <div className="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body">
                  {error}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
        }

      <Result data={data} />
    </div>
  );
};

export default Main;
