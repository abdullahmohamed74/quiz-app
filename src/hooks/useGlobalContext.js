import { useContext } from 'react';
import GlobalContext from '../context/globalContext';

function useGlobalContext() {
  return useContext(GlobalContext);
}
export default useGlobalContext;
