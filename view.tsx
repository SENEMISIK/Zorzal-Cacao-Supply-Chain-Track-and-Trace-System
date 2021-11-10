import React, { ReactElement, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { truncateSync } from 'fs';
import BarChart from './graph/graph';
import useView from './hooks/use-view';

/**
 * ProcessActions changes the format of data of actionrecords in between specific
 * dates received from the firestore to a format that barhcrat component can intake.
 * Then, it returns a barchart with processed action record data.
 *
 * @param {ActionRecord[]} An array of action records
 * @param {Action[]} A correctly ordered array of actions according to the supply chain
 */
function ProcessActions(
  actionRecords: ActionRecord[],
  orderedActions: Action[],
): ReactElement {
  const actionRecordMap: { [key: string]: number } = {};

  /**
   * Updates actionRecordMap with each possible actionId for action
   * records as keys and their frequencies (number of times an unit was scanned
   * at the action with that specific actionId) as values.
   */
  actionRecords.forEach((value: ActionRecord) => {
    if (typeof actionRecordMap[value.actionId] === 'undefined') {
      actionRecordMap[value.actionId] = 0;
    }
    actionRecordMap[value.actionId] += 1;
  });

  /**
   * actionsToDisplay is a sorted array version of actionRecordMap according
   * to ordering of the Actions in the orderedActions array.
   */
  const actionsToDisplay = orderedActions.map((value: Action) => ({
    actionName: value.name,
    numScans: actionRecordMap[value.uid],
  }));

  /** Returns the y-value, the height, for a value */
  const yValueFn = (action: GraphType) => action.numScans;

  /** Returns the label on the x-axis for a value or its index in the value array. */
  const xValueFn = (action: GraphType) => action.actionName;
  return (
    <BarChart
      values={actionsToDisplay}
      yValueFn={yValueFn}
      xLabelFn={xValueFn}
    />
  );
}

/**
 * View
 * ---
 * This function creates the entire View page which inclides
 *  the start and end date components, the display button,
 * the bar chart, and some headers.
 */
function View(): ReactElement {
  /** Temporary placeholder that mocks the data from the firestore */
  const actionsAll = [
    {
      actionName: 'Create Box',
      numScans: 1,
    },
    {
      actionName: 'Entrega',
      numScans: 1,
    },
    {
      actionName: 'Box 1',
      numScans: 2,
    },
    {
      actionName: 'Box 2',
      numScans: 7,
    },
    {
      actionName: 'Box 3',
      numScans: 6,
    },
    {
      actionName: 'Box 4',
      numScans: 5,
    },
    {
      actionName: 'Leaving',
      numScans: 2,
    },
    {
      actionName: 'Fermentation Info',
      numScans: 2,
    },
    {
      actionName: 'Collection',
      numScans: 8,
    },
    {
      actionName: 'Tarping',
      numScans: 9,
    },
    {
      actionName: 'Raking',
      numScans: 7,
    },
    {
      actionName: 'Drying Info',
      numScans: 9,
    },
    {
      actionName: 'Chocolate Making',
      numScans: 9,
    },
    {
      actionName: 'Aggregate',
      numScans: 7,
    },
    {
      actionName: 'Catacion',
      numScans: 3,
    },
    {
      actionName: 'Shipping',
      numScans: 5,
    },
  ];
  const actionsFermentation = actionsAll.slice(0, 8);
  const actionsDrying = actionsAll.slice(8, 12);
  const actionsContainers = actionsAll.slice(12, 15);
  const actionsWarehouse = actionsAll.slice(-1);

  const yValueFn = (action: GraphType) => action.numScans;
  const xValueFn = (action: GraphType) => action.actionName;
  const [isOpen, setIsOpen] = useState(false);
  const [fermentationOpen, setFermentationOpen] = useState(false);
  const [warehouseOpen, setWarehouseOpen] = useState(false);
  const [dryingOpen, setDryingOpen] = useState(false);
  const [containersOpen, setContainersOpen] = useState(false);

  const displayAll = () => {
    setIsOpen(true);
    setFermentationOpen(false);
    setDryingOpen(false);
    setWarehouseOpen(false);
    setContainersOpen(false);
  };

  const displayFermentation = () => {
    setFermentationOpen(true);
    setDryingOpen(false);
    setWarehouseOpen(false);
    setIsOpen(false);
    setContainersOpen(false);
  };

  const displayDrying = () => {
    setDryingOpen(true);
    setFermentationOpen(false);
    setWarehouseOpen(false);
    setIsOpen(false);
    setContainersOpen(false);
  };

  const displayWarehouse = () => {
    setWarehouseOpen(true);
    setFermentationOpen(false);
    setDryingOpen(false);
    setIsOpen(false);
    setContainersOpen(false);
  };

  const displayContainers = () => {
    setContainersOpen(true);
    setWarehouseOpen(false);
    setFermentationOpen(false);
    setDryingOpen(false);
    setIsOpen(false);
  };

  const {
    startDate, setStartDate, endDate, setEndDate,
  } = useView();
  return (
    <div>
      <h3>Select a start and end date</h3>
      <TextField
        id="date"
        label="Start Date"
        type="date"
        defaultValue="2000-01-01"
        InputLabelProps={{
          shrink: true,
        }}
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
      />
      <TextField
        id="date"
        label="End Date"
        type="date"
        defaultValue="2000-01-01"
        InputLabelProps={{
          shrink: true,
        }}
        value={endDate}
        onChange={(event) => setEndDate(event.target.value)}
        style={{
          paddingRight: '2%',
        }}
      />

      <Button
        variant="contained"
        size="large"
        style={{
          display: 'in-line',
        }}
        // onClick={}
        onClick={displayAll}
      >
        Display
      </Button>

      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          paddingTop: '4%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <Button onClick={displayGraph}> All</Button> */}
        <Button onClick={displayFermentation}>Fermentation</Button>
        <Button onClick={displayDrying}>Drying</Button>
        <Button onClick={displayContainers}>Containers</Button>
        <Button onClick={displayWarehouse}>Warehouse</Button>
      </ButtonGroup>
      {isOpen && (
        <BarChart values={actionsAll} yValueFn={yValueFn} xLabelFn={xValueFn} />
      )}
      {fermentationOpen && (
        <BarChart values={actionsFermentation} yValueFn={yValueFn} xLabelFn={xValueFn} />
      )}
      {dryingOpen && (
        <BarChart values={actionsDrying} yValueFn={yValueFn} xLabelFn={xValueFn} />
      )}
      {containersOpen && (
        <BarChart values={actionsContainers} yValueFn={yValueFn} xLabelFn={xValueFn} />
      )}
      {warehouseOpen && (
        <BarChart values={actionsWarehouse} yValueFn={yValueFn} xLabelFn={xValueFn} />
      )}
    </div>
  );
}

export default View;
