import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
    // criacao de rotas com createStackNavigator
    createStackNavigator({
        Main,
        User,
    }, {
        headerLayoutPreset: 'center',
        // nao exibe o texto do header na proxima tela, somente icones
        headerBackTitleVisible: false,
        // config. do header visivel em todas telas
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
