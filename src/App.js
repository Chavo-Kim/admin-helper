import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
    const style = {
        width : 200,
        height : 70,
        fontSize : 30
    }

    const [inputs, setInputs] = useState({
        height : 300,
        width : 300,
        link : '',
        content : '',
    });

    const {height, width, link, content} = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name] : value,
        });
    };

    function myFunction() {
        const s = `<p align="center">\n<img width="${width}" height="${height}" src="`;
        const s2 = '">\n</p>';
        return s + link + s2;
    }

    function removeNew() {
        return content.replace(/\n\n/g, '\n');
    }

    function copyText(){
        const textField = document.getElementById('result');
        textField.select();
        document.execCommand('copy');
    }

    function selectText(){
        navigator.clipboard.readText()
            .then((text) => {
                setInputs({
                    ...inputs,
                    link: text,
                });
                console.log('Async readText successful, "' + text + '" written');
            })
            .catch((err) => console.log('Async readText failed with error: "' + err + '"'));
        myFunction();
    }

    async function addNewLine(e){
        navigator.clipboard.readText()
            .then((text) => {
                setInputs({
                    ...inputs,
                    content: content + '\n' + text,
                });
                console.log('Async readText successful, "' + text + '" written');
            })
            .catch((err) => console.log('Async readText failed with error: "' + err + '"'));
        removeNew();
        document.getElementById('content').focus();
    }


    const clearText = () => {
        setInputs({
                ...inputs,
                content : '',
            }
        );
        document.getElementById('content').focus();
    }



  return (
    <body>
    <h1>picture markdown generator</h1>
    <label for="link">link:</label>
    <input type = "text" id="link" name="link" style={{width:200}} value={link} onChange={onChange}/>
    <button onClick={selectText}>paste</button>
    <label for="height">height:</label>
    <input type = "text" id="height" name="height" value={height} onChange={onChange}/>
    <label for="width">width:</label>
    <input type = "text" id="width" name="width" value={width} onChange={onChange}/>
    <br />
    <br />
    <textarea id = "result" rows = "6" cols="50" value={myFunction()}></textarea>
    <button onClick={copyText} style={style}>copy</button>

    <br />
    <br />

    <h1>unnecessary newline remover</h1>
    <div style={{width:1000}}>
        <button onClick={addNewLine} style={style}>paste</button>
        <button onClick={clearText} style={style}>clear</button>
    </div>

    <br />


    <textarea id = "content" name="content" rows = "40" cols="50" onChange={onChange} value={content}></textarea>
    <textarea id = "newContent" rows = "40" cols="50" value={removeNew()}></textarea>
    <br />

    </body>
  );
}

export default App;
