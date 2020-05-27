/**
 * @description 棋盘: 渲染了 9 个方块
 */
import React from 'react';
import Square from './Square';
import calculateWinner from '../tools/calculateWinner';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      // 默认x是先手棋
      // 棋子每移动一步，xIsNext（布尔值）都会反转
      // 该值将确定下一步轮到哪个玩家，并且游戏的状态会被保存下来。
    }
  }

  // 该函数用于子组件改变父组件的state
  handleClick(i) {
    // 复制数据，通过使用 .slice() 方法创建了数组的一个副本，而不是直接修改现有的数组。
    // 撤销和恢复功能在开发中是一个很常见的需求。不直接在数据上修改可以让我们追溯并复用游戏的历史记录。
    const squares = this.state.squares.slice();
    // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回。
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 修改复制的数据
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // 将修改过的数据同步到this.state
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={ this.state.squares[i] }
        onClick={ () => { this.handleClick(i) } }
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `winner: ${ winner }`;
    } else {
      status = `Next player: ${ this.state.xIsNext ? 'X' : 'O' }`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
