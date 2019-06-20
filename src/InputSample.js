import React, {useState,useRef} from 'react';

function InputSample () {
    // const [text, setText] = useState('');
    // const onChange = (e) =>{
    //     setText(e.target.value);
    // }
    const [inputs, setInputs] = useState({
        name: '',
        nickName: '',
    });
    const {name, nickName} = inputs;
    const nameInput = useRef();
    
    const onChange = (e) =>{
      const {name, value} = e.target;

      setInputs({
                 ...inputs,
                [name]: value,
      });
    }
    const onReset = () =>{
        setInputs({
            name: '',
            nickName:'',
        });
        nameInput.current.focus();

    }

    return(
        <div>
            <input 
                name = "name" 
                onChange = {onChange} 
                value={name}
                placeholder ="이름"
                ref={nameInput}
            />
            <input 
                name = "nickName" 
                placeholder="닉네임" 
                value={nickName}
                onChange={onChange}
            />
            <button onClick ={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickName})
            </div>
        </div>
    )
}

export default InputSample;