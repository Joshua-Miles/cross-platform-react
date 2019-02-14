import React from 'react';
import {Container, Item, Input, Content, Header, Card, CardItem, Body, Icon} from 'native-base';
import { View, Text } from 'react-native'

export default class App extends React.Component {
 
  render() {
      return (
        <Container>
          <Header>
            <Icon name="home" />
          </Header>
          <Content>
            <Card>
              <CardItem>
                <Body>
                  <Text>Hello World</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
  }

}