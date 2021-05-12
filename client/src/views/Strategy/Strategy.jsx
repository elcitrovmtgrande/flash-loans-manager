import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './Strategy.css';
import { Line } from 'react-chartjs-2';
import uniswapLogo from '../../uniswap-uni-logo.png';
import sushiSwapLogo from '../../sushiswap.png';

const Strategy = ({ app }) => {
  const { strategies, events } = app;
  const { strategyId } = useParams();
  const strategy = strategies.find(strategy => strategy.strategyId === strategyId);
  console.log(strategy)
  const eventsForStrategy = events && events.length > 0
    ? events.filter(event => event.strategyId === strategyId) : null;
  const lastBlock = eventsForStrategy && eventsForStrategy.length > 0
    ? eventsForStrategy[eventsForStrategy.length - 1] : null;
  
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    
    updateGraph();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateGraph();
    // eslint-disable-next-line
  }, [events, strategyId]);

  function updateGraph() {
    if(eventsForStrategy && eventsForStrategy.length > 0) {
      const data = {
        labels: eventsForStrategy.map(e => e.timestamp),
        datasets: [
          {
            label: "Profitability",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: eventsForStrategy.map(e => e.absoluteSpread),
          },
          {
            label: "Threshold",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "red",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "red",
            pointBackgroundColor: "red",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: eventsForStrategy.map(e => 0),
          },
        ]
      };
      setGraphData(data);
    } else {
      setGraphData([]);
    }
  }

  

  

  //const myRef = React.createRef();
  const lineOptions = {
    onClick: (e, element) => {
      if (element.length > 0) {
        var ind = element[0]._index;
        alert(ind);
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          // stacked: true,
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            // Return an empty string to draw the tick line but hide the tick label
            // Return `null` or `undefined` to hide the tick line entirely
            userCallback(value) {
              // Convert the number to a string and splite the string every 3 charaters from the end
              // value = value.toString();
              // value = value.split(/(?=(?:...)*$)/);

              // // Convert the array to a string and format the output
              // value = value.join(".");
              return value;
            }
          }
        }
      ]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    }
  };

  return (
    <div className="page flex-col-start">
      <div className="infos">
        <div className="infos__lastBlock">
          {lastBlock ? (
            <>
              <h1>Pair details</h1>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div>

                  <div className="infos__cryptos">
                    <div className="infos__cryptos--symbol">
                      <img src={strategy.pair.tokenA.icon} alt={strategy.pair.tokenA.symbol} width={30} />
                    </div>
                    <div className="infos__cryptos--symbol tokenB">
                      <img src={strategy.pair.tokenB.icon} alt={strategy.pair.tokenB.symbol} width={30} />
                    </div>
                  </div>
                  <div>
                    <h3>Profitability</h3>
                    <h1>{new Intl.NumberFormat('en-US').format(lastBlock.absoluteSpread)} %</h1>
                  </div>
                </div>
                <div>
                  <h3>Uniswap and Sushiswap rates</h3>
                  <div className="infos__lastBlock--provider">
                    <img src={uniswapLogo} alt="Uniswap" width={40} />
                    <div className="price">{new Intl.NumberFormat('en-US').format(lastBlock.priceUniswap)}</div>
                  </div>
                  <div className="infos__lastBlock--provider">
                    <img src={sushiSwapLogo} alt="Uniswap" width={36} />
                    <div className="price">{new Intl.NumberFormat('en-US').format(lastBlock.priceSushiswap)}</div>
                  </div>
                </div>
              </div>
            </>
          ) : <div>Waiting for first block...</div>}
        </div>
      </div>
      <div className="graph">
        {/* {JSON.stringify(strategy)} */}
        <Line data={graphData} options={lineOptions} />
      </div>
    </div>
  );
};

export default connect(state => state)(Strategy);
