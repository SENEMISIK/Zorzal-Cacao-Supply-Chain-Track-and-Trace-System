import { useState } from 'react';
import { useDataService } from '../../../services';

/**
 * Sets up parameters for the hook fucntion useView
 */
interface UseViewInterface {
  /**
   * The value of the Start Date textfield on View section
   */
  startDate: string;

  /**
   * The fucntion that updates the value of the Start Date textfield
   */
  setStartDate: React.Dispatch<React.SetStateAction<string>>;

  /**
   * The value of the End Date textfield on View section
   */
  endDate: string;

  /**
   * The fucntion that updates the value of the End Date textfield
   */
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * This is a function that extracts the user input for the start and end dates
 * to be used for fetching data for the barchart.
 */
const useView = (): UseViewInterface => {
  const dataService = useDataService(); // ASK!
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const useViewHook = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
  return useViewHook;
};

export default useView;
