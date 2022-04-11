import React, {Component} from 'react'
import {StyleSheet, Text, View, Alert} from 'react-native'
import params from './src/params'
import MineField from './src/components/MineField'
import { 
  createMineBoard,
  cloneBoard,
  openField,
  hadExcplosion,
  wonGame,
  showMines
} from './src/functions'

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
      won: false,
      lost: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExcplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Perder!', 'Zé mané!')
    }
    if(won){
      Alert.alert('Parabéns!', 'Você venceu!')
    }
    this.setState({board, lost, won})
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Iniciando o Mines</Text>
        <Text>Tamanho da grade:
          {params.getRowsAmount()}x{params.getCollumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField}/>
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