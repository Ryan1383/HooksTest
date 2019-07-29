import React ,{useRef,useReducer, useMemo, useCallback} from 'react';
import './App.css';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

/**
 * Reducer는 상태를 업데이트 하는 함수
 * -- dispatch : 액션을 발생시킨다.
 * -- 
 */

function countActiveUsers(users){
  console.log('활성 사용자 수 세는중 ...');
  return users.filter(users => users.active).length;
}



const initialState = {
          users:[
            {
                id: 1,
                username: 'In',
                email: 'chaosmos1383@gmail.com',
                active: true
            },
            {
                id: 2,
                username: 'Eunmi',
                email: 'eunmi6564@gmail.com',
                active: false

            },
            {
                id: 3,
                username: 'eunIn',
                email: 'Eunin@gmail.com',
                active: false

            },
          
          ]
}

function reducer(state, action) {
  switch(action.type){
     case 'CREATE_USER':
       return { 
         users : state.users.concat(action.user)
       }
       
     case 'TOGGLE_USER':
       return {
         ...state,
         users: state.users.map( user =>
           user.id === action.id?
           {...user, active: !user.active}
           :
           user
         )
       };
      case 'REMOVE_USER':
        return{
          ...state,
          users: state.users.filter(user => user.id !== action.id)
        }   
    default : 
      throw new Error('Unhandled action');
  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const [ form, onChange, reset ] = useInputs({
    username: '',
    email: '',
  })
  const {users} = state;
  const {username, email} = form;



  const onCreate = useCallback(() =>{
    dispatch({
          type: 'CREATE_USER',
          user:{
            id: nextId.current,
            username,
            email,
          }
      });

      nextId.current += 1;
      reset();
    }, [username, email, reset]);


  const onToggle = useCallback( (id) =>{
    dispatch({
      type: 'TOGGLE_USER',
      id,
    })
  }, []);

  const onRemove = useCallback( (id) =>{
    dispatch({
      type: 'REMOVE_USER',
      id,
    })
  }, []);

  const count = useMemo( () =>countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username= {username} 
        email = {email}
        onChange= {onChange}
        onCreate = {onCreate}
      />
      <UserList 
          users = {users}
          onToggle = {onToggle}
          onRemove = {onRemove}
      />
      <div>활성사용자 수 : {count} </div>
   </>

  );
}

export default App;
