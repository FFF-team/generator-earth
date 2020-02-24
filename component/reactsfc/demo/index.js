import React from 'react'
import ReactDOM from 'react-dom'
import 'scss_mixin/<%= resetCss %>' //reset 样式
import App from './App'

const rootElement = document.getElementById('root');


ReactDOM.render(

	<App />,

    rootElement

)
