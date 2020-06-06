﻿import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
    // criacao de rotas
    createStackNavigator({
        Main,
        User,
    }, {
        headerLayoutPreset: 'center',
        // config. para todas telas
        defaultNavigationOptions: {
            headerStyle: {
                 backgroundColor: "#7159c1",
            },
            headerTintColor: '#FFF',
        },
      }
    )
);

export default Routes;