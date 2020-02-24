import React, { Component } from 'react'
import FooterBar from 'commons/FooterBar'

class App extends Component {



    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }

    //兄弟节点的传值问题
    //复杂情况下请使用redux
    //简单情况下 请使用Context，Context的使用请参考文档：(中文)https://cnodejs.org/topic/5a7aab01497a08f571384ec5， （英文）https://reactjs.org/docs/context.html
    render () {

        return (

            <div>

                <FooterBar/>

            </div>

        )

    }

}

export default App;
