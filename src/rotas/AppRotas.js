import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import useProdutores from '../hooks/useProdutores';
import ProdutorRotas from './ProdutorRotas';
import MelhoresProdutoresRotas from './MelhoresProdutoresRotas';
//usando bib de svg transformer qnd coloca letra maiuscula ele transforma o svg em um componente
import Coracao from '../assets/coracao.svg';
import Home from '../assets/home.svg';

const Tab = createBottomTabNavigator();

export default function AppRotas() {
  const produtores = useProdutores(false);
  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({headerShown: false, 
        tabBarActiveTintColor: '#2A9F85', 
        tabBarIcon: ({color}) => {
          let Icon = Home;
          if(route.name == 'Melhores Produtores') {
            Icon = Coracao;
          }

          return <Icon color={color} />
         },
        tabBarInactiveTintColor: '#C7C7C7'})}>
        <Tab.Screen name="Home" component={ProdutorRotas} />
        <Tab.Screen
          name="Melhores Produtores"
          component={MelhoresProdutoresRotas}
        />
      </Tab.Navigator>
      {/* {produtores.length > 0 && 
      <Cesta produtor={{
        nome: produtores[0].nome, 
        imagem: produtores[0].imagem
      }}
      {...produtores[0].cestas[0]} />
    } */}
    </NavigationContainer>
  );
}
