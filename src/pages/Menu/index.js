import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  ProductList,
  List,
  ButtonText,
  ButtonView,
  ProductText,
  ProductPrice,
  SearchView,
  InputView,
  TInput,
  TLabel,
  ModalIndicator,
  ModalContainer,
  ModalTitle,
  ModalTitleView,
  InputViewModal,
  InputObsView,
  InputPriceViewModal,
  ButtonFabView,
  ButtonFabText,
  ModalButtonClose,
} from './styles';

export default function Menu({route, navigation}) {
  const [list, setList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [addproduct, setAddproduct] = useState({});
  const [finalPrice, setFinalPrice] = useState(0);
  const [qtd, setQtd] = useState(0);
  const [obs, setObs] = useState('');
  const [obsPrice, setObsPrice] = useState('');
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // const list = route.params;
    // console.tron.log(route.params);
    async function loadProducts() {
      const prodList = await AsyncStorage.getItem('Prod');
      setList(JSON.parse(prodList));
      setFinalList(JSON.parse(prodList));
    }
    loadProducts();
  }, []);

  function search(value) {
    const filtered = list.filter(
      prod =>
        prod.PROD_DESCR.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        prod.GRUP_DESCR.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        prod.PROD_CODIG.toLowerCase().indexOf(value.toLowerCase()) > -1,
    );
    setFinalList(filtered);
  }

  function handleToogleModal(item) {
    setFinalPrice(0);
    setObs('');
    setObsPrice(0);
    setQtd(0);
    if (!item) {
      setModal(!modal);
    } else {
      setAddproduct(item);
      setModal(!modal);
    }
  }

  useEffect(() => {
    setFinalPrice(
      addproduct.PROD_VLVENDA * parseFloat(qtd) + parseFloat(obsPrice),
    );
  }, [addproduct, qtd, obsPrice]);

  function show() {
    const price =
      addproduct.PROD_VLVENDA * parseFloat(qtd) + parseFloat(obsPrice);

    const product = {
      PROD_CODIG: addproduct.PROD_CODIG,
      PROD_DESCR: addproduct.PROD_DESCR,
      PROD_TOTAL: price,
      VENDA_QTDE: qtd,
      VENDA_PUNIT: addproduct.PROD_VLVENDA,
      VENDA_OBS: obs,
      VENDA_OBVALOR: obsPrice,
    };

    setOrder(ord => [...ord, product]);

    handleToogleModal();
  }

  function handleOrder() {
    navigation.push('Order', {
      order,
    });
  }

  return (
    <>
      <Container>
        {order.length ? (
          <ButtonFabView onPress={() => handleOrder()}>
            <ButtonFabText>
              {order.length.toString()}
              <Icon name="shopping-cart" size={17} color="#fff" />
            </ButtonFabText>
          </ButtonFabView>
        ) : (
          <></>
        )}

        <SearchView>
          <InputView>
            <Icon name="search" size={20} color="#552c6e" />
            <TInput
              placeholder="Pesquise aqui"
              onChangeText={text => search(text)}
              autoCapitalize="none"
            />
          </InputView>
        </SearchView>
        <List>
          {finalList.map(item => (
            <TouchableOpacity onPress={() => handleToogleModal(item)}>
              <ProductList>
                <ProductText>
                  {item.PROD_CODIG} - {item.PROD_DESCR}
                </ProductText>
                <ProductPrice>Grupo - {item.GRUP_DESCR}</ProductPrice>
                <ProductPrice>Preço - R${item.PROD_VLVENDA}</ProductPrice>
              </ProductList>
            </TouchableOpacity>
          ))}
        </List>
      </Container>
      <ModalIndicator
        isVisible={modal}
        onSwipeComplete={() => handleToogleModal()}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationOutTiming={500}
        animationInTiming={500}
        swipeDirection={['up']}
        backdropColor="#1D2671"
        backdropOpacity={0.3}>
        <ModalContainer>
          {addproduct.PROD_VLVENDA ? (
            <>
              <ModalTitleView>
                <ModalButtonClose>
                  <TouchableOpacity onPress={() => handleToogleModal()}>
                    <Icon name="clear" size={35} color="#f00" />
                  </TouchableOpacity>
                </ModalButtonClose>
                <ModalTitle>{addproduct.PROD_DESCR}</ModalTitle>
              </ModalTitleView>
              <InputPriceViewModal>
                <TInput
                  placeholder="Quantidade do produto"
                  keyboardType="numeric"
                  onChangeText={setQtd}
                />
              </InputPriceViewModal>
              <InputObsView>
                <TInput
                  placeholder="Observação"
                  multiline
                  numberOfLines={4}
                  onChangeText={setObs}
                />
              </InputObsView>
              <InputPriceViewModal>
                <TInput
                  placeholder="Valor da observação"
                  keyboardType="numeric"
                  onChangeText={setObsPrice}
                />
              </InputPriceViewModal>
              <InputViewModal>
                <Icon name="attach-money" size={20} color="#552c6e" />
                <TLabel>Valor final do produto: </TLabel>
                <TInput
                  editable={false}
                  defaultValue={`R$${finalPrice.toString()}`}
                />
              </InputViewModal>
              {qtd ? (
                <ButtonView onPress={() => show()}>
                  <ButtonText>Adicionar</ButtonText>
                </ButtonView>
              ) : (
                <TLabel> Digite a quantidade </TLabel>
              )}
            </>
          ) : (
            <></>
          )}
        </ModalContainer>
      </ModalIndicator>
    </>
  );
}
