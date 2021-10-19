import React from 'react'
import {observer, Provider} from "mobx-react";
import RootStore from "../../stores"
import PageService from "../../utils/PageService";
import 'react-multi-carousel/lib/styles.css';
import {positions, Provider as AlertProvider} from "react-alert";
import { Alert } from 'react-bootstrap';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const options = {
    timeout: 5000,
    position: positions.BOTTOM_RIGHT

};

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    {options.type === 'info' && <Alert variant="info" onClose={close} dismissible>
        {/*<Alert.Heading>Oh snap! You got an info!</Alert.Heading>*/}
        <p>
          {message}
        </p>
      </Alert>}
    {options.type === 'success' && <Alert variant="success" onClose={close} dismissible>
        <Alert.Heading>Успешно</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>}
    {options.type === 'error' && <Alert variant="danger" onClose={close} dismissible>
        <Alert.Heading>Уппсссс...</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>}

    {/*<button onClick={close}>X</button>*/}
  </div>
)

const App = observer(() => {
    const rootStore = new RootStore()

    return (
        <Provider {...rootStore}>
            <AlertProvider template={AlertTemplate} {...options}>
                <PageService/>
            </AlertProvider>
        </Provider>
    );
})

export default App;