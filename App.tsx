import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import RootStack from './app/navigation/rootstack';

const App = () => 
{
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    )
}

export default App;