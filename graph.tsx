import React, { ReactElement, useMemo } from 'react';

/**
 * This interface sets up the properties for the Bar Chart: the values, y-axis, and x-axis.
 */
interface BarChartProps {
  /** The values to visualize. */
  values: GraphType[];

  /** Returns the y-value, the height, for a value */
  yValueFn: (action: GraphType) => number;

  /** Returns the label on the x-axis for a value or its index in the value array. */
  xLabelFn: (action: GraphType) => string | number;
}

/**
 * BarChart
 * --------
 * This function builds the barchart based on the data provided and returns it to be
 * rendeered on the View section of the web app. (Most of these components consist of css
 * styling)
 *
 * @param {values}    An array of objects with type Graphtype (in the form {action, numScans})
 * @param {yValueFn}  This function returns the frequency (numScans) corresponding to each action
 * @return {xLabelFn} This function returns the name of each action
 */
function BarChart({ values, yValueFn, xLabelFn }: BarChartProps): ReactElement {
  const max = useMemo(
    () => values.reduce((prev, curr) => {
      const c = yValueFn(curr);
      return c < prev ? prev : c;
    }, 0),
    [values, yValueFn],
  );
  const ysegments = useMemo(() => new Array<number>(4).fill(0), []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        //flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          alignItems: 'stretch',
          paddingTop: '6%',
        }}
      >
        <div
          style={{
            flexGrow: 0,
            flexShrink: 0,
            maxWidth: '2%',
            minWidth: '2%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
          }}
        >
          {ysegments.map((_v, idx) => (
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingTop: '300%',
              }}
            >
              <span style={{ flexGrow: 1, fontSize: 'medium' }}> 
                {Math.round(max - (idx * max) / ysegments.length)}
              </span>
              <div
                style={{
                  minWidth: '50%',
                  flexShrink: 0,
                  flexGrow: 0,
                  borderColor: 'black',
                  borderStyle: 'solid',
                  borderWidth: '3px 0 0 0',
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: '0 0 thin thin',
            maxWidth: '90%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'flex-end',
          }}
        >
          {values.map((v) => (
            <div
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                height: `${(yValueFn(v) / max) * 100}%`,
                //width: `${100.0 / values.length}%`,
                width: `50px`,
              }}
            >
              <div
                style={{
                  backgroundColor: '#77aaff',
                  width: '60%',
                  height: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          flexShrink: 1,
          // maxWidth: '100%',
          //alignItems: 'stretch',
        }}
      >
        <div
          style={{
            flexGrow: 10,
            minHeight: '20px',
            //maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '15px',
            //justifyContent: 'space-evenly',
            

          }}
        >
          {values.map((v) => (
            <div
              style={{
                // fontSize: '100%',
                // flexGrow: 1,
                paddingLeft: '25px',
                paddingRight: '26.5px',
                paddingTop: '10px',
                //width: '10%',
                //marginLeft: '4%',
                //marginRight: '6%',
                //alignSelf: 'flex-end',
                // alignItems: 'stretch',
                // justifyContent: 'space-evenly',
                 writingMode: 'vertical-rl',
              }}
            >
              {xLabelFn(v)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarChart;
