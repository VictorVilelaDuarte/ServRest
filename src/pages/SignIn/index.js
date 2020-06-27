/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Form,
  InputView,
  TInput,
  ButtonView,
  ButtonText,
  BlankView,
  LogoImage,
} from './styles';
import api from '~/services/api';
import logo from '~/assets/servilepng.png';

export default function SignIn({navigation}) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!user || !password) {
      Toast.show('Digite o login e senha', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#B24327',
        opacity: '0.9',
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }

    const sendUser = user.toUpperCase();

    const arr = [
      {
        id: sendUser,
        senha: password,
      },
    ];

    api
      .post('/users/login', arr)
      .then(async resp => {
        if (resp.data.status) {
          await AsyncStorage.setItem('User', arr[0].id);
          await AsyncStorage.setItem('Pass', arr[0].senha);
          await AsyncStorage.setItem(
            'Prod',
            JSON.stringify(resp.data.produtos),
          );
          navigation.navigate('Menu');
        } else {
          Toast.show('Login e/ou senha errado(s)', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: '#B24327',
            opacity: '0.9',
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
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

  return (
    <>
      <Container>
        <LogoImage source={logo} />
        <Form>
          <InputView>
            <Icon name="person-outline" size={20} color="#552c6e" />
            <TInput
              placeholder="Login"
              onChangeText={setUser}
              autoCapitalize="characters"
            />
          </InputView>
          <InputView>
            <Icon name="lock-outline" size={20} color="#552c6e" />
            <TInput
              placeholder="Senha"
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </InputView>
          <ButtonView onPress={() => handleLogin()}>
            <ButtonText>Entrar</ButtonText>
          </ButtonView>
        </Form>
        <BlankView />
      </Container>
    </>
  );
}
