import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from  '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText
} from './styles';

export default class Main extends Component {
     // propriedaded de navegação
    static navigationOptions = {
        title: 'Usuários',
     };

     // validação de propriedades
     static propTypes = {
         navigation: PropTypes.shape({
             navigate: PropTypes.func,
         }).isRequired,
     };

    state = {
        newUser: '',
        users: [],
        loading: false,
    };

    async componentDidMount(){
        console.tron.log(this.props);
        // recupera dados do bd storage do celular
        const users = await AsyncStorage.getItem('users');

        if(users){
            // seta lista de users no state
            this.setState({ users: JSON.parse(users)});
        }
    }

    // prevState - estado anterio do state
    componentDidUpdate(_, prevState){
        const { users } = this.state;

        // se antes de executar esse metodo a lista de usuarios sofreu alteração
        if(prevState.users !== this.state.users){
            // salva dados no bd storage do celular
            AsyncStorage.setItem('users', JSON.stringify(users));
        }

    }

    handleAddUser = async () => {
        //console.tron.log(this.state.newUser);
        const { users, newUser } = this.state;
        this.setState({ loading: true });

        const response = await api.get(`/users/${newUser}`);

        // os dados da api vem no objeto array data
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };

        // atualiza os valores das variaveis no state
        this.setState({
            users: [...users, data], // copia o array users e inclui a variavel data
            newUser: '',
            loading: false,
        });

        Keyboard.dismiss();
    };

    // navega para a pagina User
    handleNavigate = (user) => {
        const { navigation } = this.props;

        navigation.navigate('User', { user });
    };

    render() {

        const { users, newUser, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={ false }
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={ newUser }
                        onChangeText={ text => this.setState({ newUser: text }) }
                        returnKeyType="send"
                        onSubmitEditing={ this.handleAddUser }
                    />
                    <SubmitButton loading={loading} onPress={ this.handleAddUser }>
                        { loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                                <Icon name="add" size={ 20 } color="#FFF" />
                            ) }
                    </SubmitButton>
                </Form>
                <List
                    data={ users }
                    keyExtractor={ user => user.login }
                    renderItem={ ({ item }) => (
                        <User>
                            <Avatar source={ { uri: item.avatar } } />
                            <Name>{ item.name }</Name>
                            <Bio>{ item.bio }</Bio>

                            <ProfileButton onPress={() => this.handleNavigate(item) }>
                                <ProfileButtonText>Ver Perfil</ProfileButtonText>
                            </ProfileButton>

                        </User>
                    ) }
                />
            </Container >
        )
    }
}


