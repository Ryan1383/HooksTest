import React from 'react';

const User = React.memo(function User({user,onRemove,onToggle}){
    const {username,email,id,active} = user;
    return(
        <div>
             <b
                onClick ={()=>onToggle(id)} 
                style={{
                    color:active?'green':'black',
                    cursor:'pointer'
                }}
             >
             {username}</b>
             &nbsp;
            <span> ({email}) </span>
             <button onClick={()=>onRemove(id)}>삭제</button>
        </div>
    )
})

function UserList({users, onRemove, onToggle} ){
   

    return(
        <div>
            {
                users.map(user=>(
                    <User 
                        user={user}
                        key={user.id}
                        onRemove ={onRemove}
                        onToggle ={onToggle}
                    />
                ))
            }
        </div>
    )
}

export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users);