/**
 * @description 渲染了含有默认值的一个棋盘
 */

import React from 'react';
import Board from './Board';
import calculateWinner from '../tools/calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0, // 默认查看的是第一项历史记录( 第一步棋 )
      xIsNext: true,
      // 默认x是先手棋
      // 棋子每移动一步，xIsNext（布尔值）都会反转
      // 该值将确定下一步轮到哪个玩家，并且游戏的状态会被保存下来。
    }
  }

  // 历史记录跳转
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  // 该函数用于子组件改变父组件的state
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    // 复制数据，通过使用 .slice() 方法创建了数组的一个副本，而不是直接修改现有的数组。
    // 撤销和恢复功能在开发中是一个很常见的需求。不直接在数据上修改可以让我们追溯并复用游戏的历史记录。
    const squares = current.squares.slice();
    // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回。
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 修改复制的数据
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // 将修改过的数据同步到this.state
    this.setState({
      // concat相比于push，并不会改变原数组，所以推荐使用 concat()。
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${ move }` :
        'Go to game start';
      return (
        <li key={ move }>
          <button onClick={() => this.jumpTo(move)}>{ desc }</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = `Winner: ${ winner }`;
    } else {
      status = `Next player: ${ this.state.xIsNext ? 'X' : 'O' }`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game;
