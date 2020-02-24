import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from 'lm-loading'

import FooterBar from 'commons/FooterBar'

class App extends Component {


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {


        return (

            <div>
                <Loading isShow={ this.props.showState }/>
                <FooterBar/>
            </div>


        )

    }

}


const mapStateToProps = (state) => {

    return {

        showState: state.toastData.showState

    }

};

export default connect(mapStateToProps)(App);
