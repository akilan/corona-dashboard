/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
/* import { Line, Pie } from "react-chartjs-2"; */
// reactstrap components
import {
  Card,
//   CardHeader,
  CardBody,
//   CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
/* import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx"; */
import Axios from 'axios';
import Cheerio from 'cheerio';

class CoronaDash extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        jsonResp: {}
      };
  }

  componentDidMount(){

    fetch("https://api.covid19india.org/data.json")
    .then(res=>res.json())
    .then(
      (result) => {
        this.setState({jsonResp: result});
      },
      (error) => {
        alert("ERROR");
      }
    );

    /* let getData = html => {
        var data= [];
        console.log(html);
        const $ = Cheerio.load(html);
        console.log($('div#confirmedCases').text());
    }

    Axios.get('https://www.who.int/emergencies/diseases/novel-coronavirus-2019')
      .then(response => {
        getData(response.data);
      })
      .catch(error => {
          console.log(error);
      }) */

      const fetchData = async () => {
        const result = await Axios.get('https://www.who.int/emergencies/diseases/novel-coronavirus-2019');
        return Cheerio.load(result.data);
      };
      
      (async () => {
        const $ = await fetchData();
        const postJobButton = $('div#confirmedCases').text();
        console.log(postJobButton)
    })()

  }


  

  render() {
    return (
      <>
        
              {
                  
              Object.keys(this.state.jsonResp).map((t) => (
                  t==='statewise'?
                  <div className="content">
                  <Row>
                    <Col md="12">
                    <h3 className='dash-h3'>India</h3>
                    <hr className='dash-title' />
                    </Col>
                  <Col lg="3" md="6" sm="6">
                      
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="nc-icon nc-ambulance text-warning" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Confirmed Cases</p>
                              <CardTitle tag="p">{this.state.jsonResp.statewise[0].confirmed}</CardTitle>
                              <p className="stats text-danger today-stats">
                                +{this.state.jsonResp.key_values[0].confirmeddelta}
                              </p>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="nc-icon nc-sound-wave text-warning" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Active Cases</p>
                              <CardTitle tag="p">{this.state.jsonResp.statewise[0].active}</CardTitle>
                              <p className="stats text-danger today-stats">
                                &nbsp;
                              </p>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="nc-icon nc-favourite-28 text-success" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Recovered</p>
                              <CardTitle tag="p">{this.state.jsonResp.statewise[0].recovered}</CardTitle>
                              <p className="stats text-danger today-stats">
                                +{this.state.jsonResp.key_values[0].recovereddelta}
                              </p>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="nc-icon nc-box text-danger"/>
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Deaths</p>
                              <CardTitle tag="p">{this.state.jsonResp.statewise[0].deaths}</CardTitle>
                              <p className="stats text-danger today-stats">
                                +{this.state.jsonResp.key_values[0].deceaseddelta}
                              </p>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  
                </Row>
                <Row>
                    <Col md="12">
                        <hr />
                        <span>Last Update on {this.state.jsonResp.key_values[0].lastupdatedtime}</span>
                    </Col>
                </Row>
                </div>
                  :''
              )
                
              )

              }
        
      </>
    );
  }
}

export default CoronaDash;
