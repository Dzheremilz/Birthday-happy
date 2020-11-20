import React from 'react'
import {
  SimpleStorage_address,
  SimpleStorage_abi,
} from './contracts/SimpleStorage'
import { useContract } from './hooks/useContract'
import Dapp from './Dapp'

export const SimpleStorageContext = React.createContext(null)

function App() {
  const simpleStorage = useContract(SimpleStorage_address, SimpleStorage_abi)

  return (
    <SimpleStorageContext.Provider value={simpleStorage}>
      <Dapp />
    </SimpleStorageContext.Provider>
  )
}

export default App
