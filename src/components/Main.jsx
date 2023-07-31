import React, { useState } from 'react';
import SkeletonLoader from './SkeletonLoader';

const Main = () => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${
    drugName
  }+OR+openfda.generic_name:${
    drugName
  }+OR+openfda.substance_name:${
    drugName
  }&limit=1`;

  const handleSearch = () => {
    setIsLoading(true)

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setDrugInfo(data.results[0]);
        } else {
          setDrugInfo(null);
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDrugInfo(null);
        setIsLoading(false)
      });
  };

  return (
    <div className="container-fluid mt-5 ">
      <div className=''>
        <div className="home-search-box m-5 d-flex border border-3 border-primary rounded-pill">
          <input
            type="text"
            className="form-control 2 border-0"
            id="drugName"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
          />
          <button  className="search-submit-button bg-transparent"  onClick={handleSearch}>
            <img src="icons/search-outline.svg" className="mx-4 icon bg-transparent" alt="search"  />
          </button>
        </div>
      </div>
      {isLoading ? (<SkeletonLoader />) : 
      ( drugInfo && (
        <div className="card m-4 p-5 ">
          <div className="card-header bg-white m-3 my-5 p-3 rounded rounded-4'">
                <h1 className="text-center text-primary border-primary py-3">{drugInfo.openfda.brand_name} <span className="text-danger">|</span> {drugInfo.openfda.generic_name}</h1>
          </div>
          <div className="card-body">
              { drugInfo.description && (
                <div className='m-3 border my-5 shadow p-3 rounded rounded-4'>
                  <h2  className="h1 border-bottom border-primary py-3">Description</h2>
                  <p>{drugInfo.description} </p>
                </div>
              )}

              {(drugInfo.warnings || drugInfo.boxed_warning || drugInfo.warnings_and_cautions) && (
                  <div  className="accordion border-start border-danger border-5 accordion-flush m-3 my-5 shadow p-3 rounded rounded-4" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item alert alert-danger">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button className="text-danger  h2 fs-2 accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                      Warning
                      </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                        {drugInfo.warnings && <strong><p>{drugInfo.warnings}</p></strong>} {drugInfo.boxed_warning && <strong><p>{drugInfo.boxed_warning}</p></strong>} {drugInfo.warnings_and_cautions && <strong><p>{drugInfo.warnings_and_cautions[0]}</p></strong>}
                        </div>
                      </div>
                    </div>
                  </div> 
                )}

{console.log(drugInfo)}

              { drugInfo.indications_and_usage && (
                <div className='m-3 border border-primary border-1 my-5 shadow p-3 rounded rounded-4'>
                  <h2 id="indications_and_usage" className="h1 border-bottom border-primary py-3">Indications and Usage</h2>
                  <p>{drugInfo.indications_and_usage}</p>
                </div>
              )}
             
              { drugInfo.active_ingredient && (
                <div className='m-3 border border-primary border-1 my-5 shadow p-3 rounded rounded-4'>
                  <h2 id="active_ingredient" className="h1 border-bottom border-primary py-3">Active Ingredient</h2>
                  <p>{drugInfo.active_ingredient}</p>
                </div>
              )}

              {drugInfo.dosage_and_administration && (
                <div className='m-3 border border-primary border-1 my-5 shadow p-3 rounded rounded-4'>
                  <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">Dosage and Administration</h2>
                  <p>{drugInfo.dosage_and_administration}</p>
                </div>
              )}
                {drugInfo.overdosage && (
                  <div className='m-3 border border-primary border-1 my-5 shadow p-3 rounded rounded-4'>
                    <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">Overdose Warning</h2>
                    <p>{drugInfo.overdosage}</p>
                  </div>
                )}
                
                {drugInfo.contraindications && (
                  <div className='m-3 border border-primary border-1 my-5 shadow p-3 rounded rounded-4'>
                    <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">Contraindications And Precautions</h2>
                    <p>{drugInfo.contraindications}</p>
                  </div>
                )}
                
                {drugInfo.general_precautions && (
                  <div className='m-3 border border-primary border-1 my-5 shadow p-3 rounded rounded-4'>
                    <h2 id="dosage_and_administration" className="h1 border-bottom border-primary py-3">General Precautions</h2>
                    <p>{drugInfo.general_precautions}</p>
                  </div>
                )}

            {/* <h5 className="card-title">{drugInfo.openfda.brand_name}</h5>
            <p className="card-text">Generic Name: {drugInfo.openfda.generic_name}</p>
            <p className="card-text">Substance Name: {drugInfo.openfda.substance_name}</p>
            // Add more drug info fields as needed
             */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
