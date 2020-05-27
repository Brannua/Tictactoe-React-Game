- 在 React 应用中，数据通过 props 的传递，从父组件流向子组件。

- 可以通过在 React 组件的构造函数中设置 this.state 来初始化 state

- this.state 应该被视为一个组件的私有属性

- 在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。

- 每次在组件中调用 setState 时，React 都会自动更新其子组件。

- 把所有 9 个 Square 的值放在一个地方，这样我们就可以判断出胜者了。

- 做法: 直接将所有的 state 状态数据存储在 Board 父组件当中。之后 Board 组件可以将这些数据通过 props 传递给各个 Square 子组件

- 当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。

- 修改 Square 的点击事件监听函数时，我们不能直接通过 Square 来更新 Board 的 state。

- 解决方法: 从 Board 组件向 Square 组件传递一个函数，当 Square 被点击的时候，这个函数就会被调用

- 在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。

- 在 React 术语中，我们把目前的 Square 组件称做“受控组件”。在这种情况下，Board 组件完全控制了 Square 组件。
