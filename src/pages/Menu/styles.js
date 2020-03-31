import styled from 'styled-components/native';
import Modal from 'react-native-modal';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

export const List = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const ProductText = styled.Text`
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  font-size: 14px;
`;

export const CategoryText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #552c6e;
`;

export const CategoryView = styled.View`
  height: 50px;
  background-color: #eee;
  align-items: center;
  justify-content: center;
`;

export const ProductList = styled.View`
  margin-top: 5px;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: #552c6e;
`;

export const SearchView = styled.View`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
`;

export const InputView = styled.View`
  width: 90%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: #555;
  border-bottom-width: 1px;
`;

export const InputObsView = styled.View`
  margin-top: 10px;
  width: 90%;
  height: 80px;
  flex-direction: row;
  align-items: center;
  border-color: #555;
  border-width: 1px;
  border-radius: 5px;
`;

export const InputPriceViewModal = styled.View`
  margin-top: 10px;
  width: 90%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-color: #555;
  border-width: 1px;
  border-radius: 5px;
`;

export const InputViewModal = styled.View`
  margin-top: 10px;
  width: 90%;
  height: 40px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#222',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #222;
  margin-bottom: -5px;
`;

export const TLabel = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #552c6e;
`;

export const ModalIndicator = styled(Modal)`
  background-color: #fff;
  border-radius: 8px;
  justify-content: flex-start;
`;
export const ModalButtonClose = styled.TouchableOpacity`
  align-self: flex-start;
  height: 50px;
  margin-top: 10px;
`;
export const ModalContainer = styled.View`
  /* border: 1px solid red; */
  /* justify-content: space-around; */
  padding: 0 10px;
  margin-top: 10px;
  align-items: center;
  height: 100%;
`;

export const ModalTitleView = styled.View`
  max-width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ModalTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  width: 90%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const ButtonView = styled.TouchableOpacity`
  height: 50px;
  background: #552c6e;
  width: 40%;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ButtonFabView = styled.TouchableOpacity`
  position: absolute;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  bottom: 20px;
  right: 20px;
  background: #552c6e;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const ButtonFabText = styled.Text`
  color: #fff;
  font-size: 23px;
`;
