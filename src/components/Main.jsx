import React, { useState } from 'react';
import SkeletonLoader from './SkeletonLoader';

const Main = () => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:${drugName}+OR+openfda.generic_name:${drugName}+OR+openfda.substance_name:${drugName}&limit=1`;

  const handleSearch = () => {
    setIsLoading(true)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setDrugInfo(data.results[0]);
          setIsLoading(false)
        } else {
          setDrugInfo(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setDrugInfo(null);
        setIsLoading(false)
      });
 
    };

  return (
    <div className="container mt-5">
      <h1>Drug Info App</h1>
      <div className="home-search-box m-5 d-flex border border-3 border-primary rounded-pill">
        <input
          type="text"
          className="form-control bg-transparent border-0"
          id="drugName"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
        />
        <button className='search-submit-button' onClick={handleSearch} >
          <img src="icons/search.svg" className="icon" alt="search"  />
        </button>
      </div>
      {isLoading ? (<SkeletonLoader /> ):
        (drugInfo && (
          <div className="card mt-4">
            <div className="card-header bg-white">
                  <h1 className="text-center border-bottom py-3">{drugInfo.openfda.brand_name} <span className="text-danger">|</span> {drugInfo.openfda.generic_name}</h1>
            </div>
            <div className="card-body">
                {/* Description */}
                <div>
                    <h2  className="h1 border-bottom py-3">Description</h2>
                    <p>{drugInfo.description} </p>
                </div>

                {/* Warning */}
                { drugInfo.warning && 
                  <div  className="accordion border-start border-danger border-5 accordion-flush " id="accordionPanelsStayOpenExample">
                      <div className="accordion-item alert alert-danger">
                          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                              <button className="text-danger  h2 fs-2 accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                  Warning
                              </button>
                          </h2>
                          {console.log(drugInfo)}
                          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                              <div className="accordion-body">
                                  <strong>{drugInfo.boxed_warning}</strong>
                              </div>
                          </div>
                      </div>
                  </div> 
                }

                {/* Indications and Usage */}
                <div>
                      <h2 id="indications_and_usage" className="h1 border-bottom py-3">Indications and Usage</h2>
                      <p>{drugInfo.indications_and_usage}</p>
                  </div>

                  {/* Dosage and Administration */}
                  <div>
                      <h2 id="dosage_and_administration" className="h1 border-bottom py-3">Dosage and Administration</h2>
                      <p>{drugInfo.dosage_and_administration}</p>
                  </div>
  {console.log(drugInfo)}
                  {/* Overdosage */}
                  <div>
                      <h2 id="dosage_and_administration" className="h1 border-bottom py-3">Overdose Warning</h2>
                      <p>{drugInfo.overdosage}</p>
                  </div>

              {/* <h5 className="card-title">{drugInfo.openfda.brand_name}</h5>
              <p className="card-text">Generic Name: {drugInfo.openfda.generic_name}</p>
              <p className="card-text">Substance Name: {drugInfo.openfda.substance_name}</p>
              // Add more drug info fields as needed
              */}
            </div>
          </div>
        )
        )}
    </div>
  );
};

export default Main;
