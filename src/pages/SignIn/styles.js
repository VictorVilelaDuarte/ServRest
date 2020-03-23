import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Lottie = styled.View`
  width: 100px;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const InputView = styled.View`
  width: 90%;
  margin-top: 40px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: #555;
  border-bottom-width: 1px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#222',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #222;
`;

export const ButtonView = styled(RectButton)`
  margin-top: 40px;
  height: 40px;
  background: #552c6e;
  width: 50%;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const FooterContainer = styled.View`
  background: #f2f2f2;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  width: 100%;
  bottom: 0;
`;

export const FooterView = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
`;

export const FooterNormal = styled.Text`
  color: #552c6e;
  font-size: 14px;
  font-weight: 100;
`;

export const FooterBold = styled.Text`
  color: #552c6e;
  font-weight: bold;
  font-size: 14px;
`;

export const BlankView = styled.View`
  height: 50px;
`;

export const LogoImage = styled.Image`
  height: 180px;
  width: 150px;
`;
