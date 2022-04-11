import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import params from './src/params'
import MineField from './src/components/MineField'
import { createMineBoard } from './src/functions'
import { Suspense } from 'react/cjs/react.production.min'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = this.createState()
  }
  
  minesAmount = () => {
    const cols = params.getCollumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols*rows*params.difficultLevel)
  }

  createState = () => {
    const cols = params.getCollumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMineBoard(rows, cols, this.minesAmount()),
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Iniciando o Mines</Text>
        <Text>Tamanho da grade:
          {params.getRowsAmount()}x{params.getCollumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board}/>
        </View>
      </View> 
    )
  } 
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
})