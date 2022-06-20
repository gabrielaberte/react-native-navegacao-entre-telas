import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Produtores({melhoresProdutores}) {
  const navigation = useNavigation();
  const lista = useProdutores(melhoresProdutores);
  const {tituloProdutores, mensagemCompra} = useTextos();
  const route = useRoute();
  const [exibirMensagem, setExibirMensagem] = useState(false);

  const timestampCompra = route.params?.compra.timestamp
  console.log(timestampCompra)
  const nomeCompra = route.params?.compra.nome
  const mensagemCompraCompleta = mensagemCompra?.replace('$NOME', nomeCompra);

  useEffect(()=> {
    setExibirMensagem(!!nomeCompra);
    let timeout;

    if(nomeCompra) {
      
      timeout = setTimeout(() => setExibirMensagem(false), 1000);
    }

    return () => { clearTimeout(timeout)}
  },[timestampCompra])

  const TopoLista = () => {
    return (
      <>
        <Topo melhoresProdutores={melhoresProdutores} />
        {!!nomeCompra && <Text style={estilos.compra}>{mensagemCompraCompleta}</Text>}
        <Text style={estilos.titulo}>{tituloProdutores}</Text>
      </>
    );
  };

  return (
    <FlatList
      data={lista}
      renderItem={({item}) => (
        <Produtor
          {...item}
          aoPressionar={() => {
            navigation.navigate('Produtor', item);
          }}
        />
      )}
      keyExtractor={({nome}) => nome}
      ListHeaderComponent={TopoLista}
      style={estilos.lista}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
  compra: {
    backgroundColor: '#EAF5F3',
    padding: 16,
    fontSize: 16,
    color: '#464646',
    lineHeight: 26,
  }
});
