import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api';

import {
  Container,
  List,
  ProductRow,
  ProductList,
  ProductText,
  ProductPrice,
  ProductClear,
  InputViewModal,
  TLabel,
  TInput,
  ListView,
  InputViewTbale,
  ButtonView,
  ButtonText,
} from './styles';

export default function Order({route, navigation}) {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [comanda, setComanda] = useState('');
  const [verifyTable, setVerifyTable] = useState(true);
  const [editable, setEditable] = useState(false);
  const [table, setTable] = useState('');
  const [canSend, setCanSend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prodList = route.params.order;
    setOrder(prodList);
  }, []);

  async function deleteProduct(id) {
    await setOrder(order.filter(item => item.PROD_CODIG !== id));
  }

  useEffect(() => {
    const finalPrice = order.reduce(
      (prevValue, ord) => prevValue + ord.PROD_TOTAL,
      0,
    );
    setTotal(finalPrice);
  }, [order]);

  useEffect(() => {
    if (table.length === 3) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [table]);

  useEffect(() => {
    function searchTable() {
      const arr = [
        {
          cartao: comanda,
        },
      ];

      api
        .post('/mesa', arr)
        .then(async resp => {
          if (resp.data[0].mesa === 'NULO') {
            setEditable(true);
            setVerifyTable(true);
            Toast.show('Comanda sem mesa', {
              duration: Toast.durations.LONG,
              position: Toast.positions.TOP,
              backgroundColor: '#B24327',
              opacity: '0.9',
              shadow: true,
              animation: true,
              hideOnPress: true,
            });
          } else {
            setVerifyTable(true);
            setTable(resp.data[0].mesa.toString());
          }
        })
        .catch(() => {
          Toast.show('Erro ao conectar com o servidor', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: '#B24327',
            opacity: '0.9',
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        });
    }

    if (comanda.length === 4) {
      searchTable();
    } else {
      setVerifyTable(false);
      setTable('');
    }
  }, [comanda]);

  async function send() {
    setLoading(true);
    const garcom = await AsyncStorage.getItem('User');
    const pedido = [];

    order.map(item => {
      const obj = {
        PROD_CODIG: item.PROD_CODIG,
        VENDA_QTDE: item.VENDA_QTDE,
        VENDA_PUNIT: item.VENDA_PUNIT,
        VENDA_PTOTAL: item.PROD_TOTAL,
        VENDA_OBS: item.VENDA_OBS,
        VENDA_OBVALOR: item.VENDA_OBVALOR,
      };
      pedido.push(obj);
    });

    const json = {
      MESA: table,
      COMANDA: comanda,
      GARCOM: garcom,
      PEDIDO: pedido,
    };

    await api
      .post('/salles', json)
      .then(() => {
        setLoading(false);
        Alert.alert('Pedido enviado com sucesso!', '', [
          {
            text: 'OK',
            onPress: () => navigation.push('Menu'),
          },
        ]);
      })
      .catch(() => {
        setLoading(false);
        Toast.show('Erro ao enviar pedido', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: '#B24327',
          opacity: '0.9',
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        Alert.alert('Pedido enviado com sucesso!', '', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
      });
  }
  return (
    <Container>
      <ListView>
        <List>
          {order.map(item => (
            <ProductRow>
              <ProductList>
                <ProductText>
                  {item.VENDA_QTDE}X {item.PROD_DESCR}
                </ProductText>
                {item.VENDA_OBS ? (
                  <ProductPrice>{item.VENDA_OBS}</ProductPrice>
                ) : (
                  <ProductPrice>Sem observação</ProductPrice>
                )}
                <ProductPrice>
                  Valor final do produto: R${item.PROD_TOTAL}
                </ProductPrice>
              </ProductList>
              <ProductClear>
                <TouchableOpacity
                  onPress={() => deleteProduct(item.PROD_CODIG)}>
                  <Icon name="clear" size={35} color="#f00" />
                </TouchableOpacity>
              </ProductClear>
            </ProductRow>
          ))}
        </List>
      </ListView>
      <InputViewModal>
        <TLabel>Valor final do pedido: R${total.toString()}</TLabel>
      </InputViewModal>
      <InputViewTbale>
        <TInput
          maxLength={4}
          placeholder="Comanda"
          onChangeText={setComanda}
          keyboardType="numeric"
        />
      </InputViewTbale>

      {verifyTable ? (
        <>
          <InputViewTbale>
            <TInput
              defaultValue={table.length ? table : ''}
              editable={editable}
              maxLength={3}
              placeholder="Mesa"
              keyboardType="numeric"
              onChangeText={setTable}
            />
          </InputViewTbale>
          <ButtonView disabled={!canSend} onPress={() => send()}>
            {canSend ? (
              <ButtonText>Enviar pedido</ButtonText>
            ) : (
              <ButtonText>Digite a mesa</ButtonText>
            )}
          </ButtonView>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
