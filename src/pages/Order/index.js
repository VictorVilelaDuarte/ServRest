import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
} from './styles';

export default function Order({route, navigation}) {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

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
        <TInput placeholder="Comanda" keyboardType="numeric" />
      </InputViewTbale>
      <InputViewTbale>
        <TInput placeholder="Mesa" keyboardType="numeric" />
      </InputViewTbale>
    </Container>
  );
}
