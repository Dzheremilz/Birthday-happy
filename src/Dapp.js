import React, { useContext, useState, useEffect } from 'react'
import { Text, Button, VStack, HStack, Input, useToast } from '@chakra-ui/core'
import { ethers } from 'ethers'
import { Web3Context } from './hooks/useWeb3'
import { SimpleStorageContext } from './App'

function Dapp() {
  const [web3State, login] = useContext(Web3Context)
  const simpleStorage = useContext(SimpleStorageContext)
  const toast = useToast()

  const [getValue, setGetValue] = useState(0)
  const [inputValue, setInputValue] = useState(0)

  useEffect(() => {
    if (simpleStorage) {
      const cb = (from, value) => {
        toast({
          position: 'bottom',
          title: `SET`,
          description: `set value: ${value} by ${from}`,
          status: 'success',
          duration: 10000,
          isClosable: true,
        })
      }
      console.log('USEEFFECT CALLED FOR TOAST')
      simpleStorage.on('StorageSet', cb)
      return () => {
        console.log('USEEFFECT CLEANUP FOR TOAST')
        simpleStorage.off('StorageSet', cb)
      }
    }
  }, [simpleStorage, toast])

  const handleOnClickGet = async () => {
    try {
      const res = await simpleStorage.get()
      setGetValue(res.toString())
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleOnClickSet = async () => {
    console.log('nb listeners:', simpleStorage.listenerCount('StorageSet'))
    try {
      const tx = await simpleStorage.set(inputValue)

      const cb = (_from, value) => {
        setGetValue(value.toString())
      }
      const filter = simpleStorage.filters.StorageSet(web3State.account, null)

      // Ecoute une fois event StorageSet
      simpleStorage.once(filter, cb)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <Text>Web3: {web3State.is_web3 ? 'injected' : 'no-injected'}</Text>
      <Text>Network id: {web3State.chain_id}</Text>
      <Text>Network name: {web3State.network_name}</Text>
      <Text>MetaMask installed: {web3State.is_metamask ? 'yes' : 'no'}</Text>
      <Text>logged: {web3State.is_logged ? 'yes' : 'no'}</Text>
      <Text>{web3State.account}</Text>
      <Text>Balance: {web3State.balance}</Text>
      {!web3State.is_logged && (
        <>
          <Button onClick={login}>login</Button>
        </>
      )}
      {simpleStorage && web3State.chain_id === 4 && (
        <>
          <HStack>
            <Button onClick={handleOnClickGet}>GET</Button>
            <Text>{getValue}</Text>
          </HStack>
          <HStack>
            <Button onClick={handleOnClickSet}>SET</Button>
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.currentTarget.value)
              }}
            />
          </HStack>
        </>
      )}
    </>
  )
}

export default Dapp
