const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let todos= [];

const addItem = (todo) => { //항목추가
    if(todo.text !== ''){ // 내용이 있을때만 등록눌렀을때 추가되도록
        const li = document.createElement('li');
        const checkbox = document.createElement('input'); // 체크박스 생성
        checkbox.type = 'checkbox'; // input 타입을 체크박스로 지정
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerHTML = todo.text;
        button.innerHTML = '삭제';
        button.addEventListener('click',delItem);

        li.appendChild(checkbox);
        li.appendChild(span); //li라는 부모태그안에 span이라는 자식태그 넣어줌
        li.appendChild(button); 
        ul.appendChild(li); 
        li.id=todo.id; //삭제버튼이 어떤 요소를 삭제할지 식별하기 위해 필요 -> 시간아이디로 만듬    
    }
    
};

const save = () => { //로컬스토리지에 항목 저장
    localStorage.setItem('todos', JSON.stringify(todos)); //(key, vaule) 배열을 JSON 문자열로 변환한 후 로컬스토리지에 저장
}; //저장소에 보관 (새로고침시 항목 유지)


const delItem = (event) => { //항복삭제
    const target = event.target.parentElement; //이벤트를 발생시킨 주체를 타겟으로 정해줌
    
    todos = todos.filter((todo) => todo.id !== parseInt(target.id)); //q배열에서지움
    save(); //함수호출로 로컬스토리지 업데이트
    target.remove(); //UI까지 지워줌
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

const handler = (event) => { //폼 제출 처리
    event.preventDefault(); //submit 기본적으로 새로고침돼서 막아줘야함

    const todo = {
        id: Date.now(), //고유한아이디생성
        text: input.value,
    };

    todos.push(todo);
    addItem(todo);

    save(); //로컬스토리지에저장
    input.value = ''; //입렵필드 지워줌
};

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos')); //로컬 스토리지에서 'todos' 키로 저장된 값 가져옴
    if(userTodos) { //가져온 할 일 목록이 있다면
        userTodos.forEach((todo) => { //각 항목을 UI에 추가
            addItem(todo); // addItem 함수를 사용하여 UI에 항목을 추가
        });
        todos = userTodos; //todos 배열을 가져온 할 일 목록으로 업데이트
    };
};
init();
form.addEventListener('submit', handler);

ul.addEventListener('click', (event) => { // 체크박스 클릭 이벤트 추가
    if (event.target.type === 'checkbox') {
        toggleDone(event); // 체크 상태 변경 함수 호출
    }
});