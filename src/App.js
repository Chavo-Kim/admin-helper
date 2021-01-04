import logo from './logo.svg';
import './App.css';

function App() {
    function myFunction() {
        const height = document.getElementById("height").value;
        const width = document.getElementById("width").value;
        const s = `<p align="center">\n<img width="${width}" height="${height}" src="`;
        const s2 = '">\n</p>';
        const link=document.getElementById("link").value;
        document.getElementById("result").value = s + link + s2;

    }

    function removeNew() {
        const content = document.getElementById("content").value;
        document.getElementById("newContent").textContent = content.replace(/\n\n/g, '\n');
    }

    function copyText(){
        const textField = document.getElementById('result');
        textField.select();
        document.execCommand('copy');
    }

    function selectText(){
        const textField = document.getElementById('link');
        navigator.clipboard.readText()
            .then((text) => {
                textField.value = text;
                console.log('Async readText successful, "' + text + '" written');
            })
            .catch((err) => console.log('Async readText failed with error: "' + err + '"'));
        textField.focus();
    }

    async function addNewLine(e){
        const textField = document.getElementById('content');
        textField.value += '\n';
        navigator.clipboard.readText()
            .then((text) => {
                textField.value += text;
                console.log('Async readText successful, "' + text + '" written');
            })
            .catch((err) => console.log('Async readText failed with error: "' + err + '"'));
        textField.focus();
    }


    async function pleaseLetMeNotify() {
        return await navigator.permissions.request({name: 'clipboard-read'});
    }

  return (
    <body>
    <h1>picture markdown generator</h1>
    <label for="link">link:</label>
    <input type = "text" id="link" name="link" style={{width:200}} onChange={myFunction}/>
    <button onClick={selectText}>select</button>
    <label for="height">height:</label>
    <input type = "text" id="height" name="height" value="300" onChange={myFunction}/>
    <label for="width">width:</label>
    <input type = "text" id="width" name="width" value="300" onChange={myFunction}/>
    <br />
    <br />
    <textarea id = "result" rows = "6" cols="50" onChange={myFunction}></textarea>
    <button onClick={copyText} style={{width:100}}>copy</button>

    <br />
    <br />

    <h1>unnecessary newline remover</h1>

    <textarea id = "content" rows = "40" cols="50" onChange={removeNew}></textarea>
    <textarea id = "newContent" rows = "40" cols="50" onChange={removeNew}></textarea>
    <br />
    <button onClick={addNewLine} style={{width:100}}>copy</button>

    </body>
  );
}

export default App;
