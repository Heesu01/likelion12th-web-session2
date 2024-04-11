const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let todos= [];

const addItem = (todo) => { 
    if(todo.text !== ''){ 
        const li = document.createElement('li');
        const checkbox = document.createElement('input'); // 체크박스 생성
        checkbox.type = 'checkbox'; // input 타입을 체크박스로 지정
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerHTML = todo.text;
        button.innerHTML = '삭제';
        button.addEventListener('click',delItem);

        li.appendChild(checkbox);
        li.appendChild(span); 
        li.appendChild(button); 
        ul.appendChild(li); 
        li.id=todo.id;    
    }
    
};

const save = () => { 
    localStorage.setItem('todos', JSON.stringify(todos)); 
}; 


const delItem = (event) => {
    const target = event.target.parentElement; 
    
    todos = todos.filter((todo) => todo.id !== parseInt(target.id));
    save(); 
    target.remove(); 
}; 

const toggleDone = (event) => { //체크박스 클릭시 체크 상태 변경
    const target = event.target.parentElement;
    if (event.target.checked) {
        target.classList.add('done'); // 체크되었을 때 완료된 스타일 추가
    } else {
        target.classList.remove('done'); // 체크 해제되었을 때 완료된 스타일 제거
    }
    save(); // 변경된 상태 저장
};

const handler = (event) => { 
    event.preventDefault(); 

    const todo = {
        id: Date.now(), 
        text: input.value,
    };

    todos.push(todo);
    addItem(todo);

    save(); 
    input.value = ''; 
};

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos')); 
    if(userTodos) { 
        userTodos.forEach((todo) => { 
            addItem(todo); 
        });
        todos = userTodos; 
    };
};
init();
form.addEventListener('submit', handler);

ul.addEventListener('click', (event) => { // 체크박스 클릭 이벤트 추가
    if (event.target.type === 'checkbox') {
        toggleDone(event); // 체크 상태 변경 함수 호출
    }
});