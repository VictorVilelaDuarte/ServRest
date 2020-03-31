import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  padding: 0 10px;
`;

export const ListView = styled.View`
  top: 10px;
  max-height: 50%;
  width: 100%;
`;

export const List = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const ProductRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: #552c6e;
`;

export const ProductList = styled.View``;

export const ProductClear = styled.View``;

export const ProductText = styled.Text`
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  font-size: 14px;
`;

export const InputViewModal = styled.View`
  margin-top: 15px;
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
  margin-left: 5px;
  color: #222;
  margin-bottom: -5px;
`;

export const TLabel = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #552c6e;
  margin-top: 15px;
`;

export const InputViewTbale = styled.View`
  margin-top: 10px;
  width: 90%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-color: #555;
  border-width: 1px;
  border-radius: 5px;
`;

export const ButtonView = styled.TouchableOpacity`
  height: 50px;
  background: #552c6e;
  width: 40%;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;
