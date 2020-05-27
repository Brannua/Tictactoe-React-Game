/**
 * @description 渲染了一个单独的 <button> 作为棋盘上的一个格子
 */

import React from 'react';

// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//         className="square" 
//         // onClick={ () => { this.props.onClick() } }
//         onClick={ this.props.onClick }
//       >
//         { this.props.value }
//       </button>
//     );
//   }
// }

// 函数式改写
// 如果你想写的组件只包含一个 render 方法
// 并且不包含 state，那么使用函数组件就会更简单
// 函数接收 props 作为参数，然后返回需要渲染的元素
function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value }
    </button>
  );
}

export default Square;
