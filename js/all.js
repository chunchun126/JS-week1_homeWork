
// dom 節點
const addBtn = document.querySelector('.addBtn');        // Btn
const recordUl = document.querySelector('.recordUl');    // Ul
const recordLi = document.querySelector('.recordLi');    // Li
const inputArea = document.querySelector('.inputArea');  // input
const footer = document.querySelector('.footer');        // footer


// 宣告一組陣列 用來裝所有輸入的資料
// 當有資料輸入之後 從 localStorage 取出的資料
// 經由轉型 JSON.parse() 將字串轉型成 陣列
// 一開始是空資料 [] 尚未輸入任何資料 
// 用 ||(或是) 才不會出錯，而且一定要放在後面，不然一更新頁面 可能會吃到[] 
// 就無法抓到 localStorage 的資料
let data = JSON.parse(localStorage.getItem('todoList')) || [];


// 事件監聽
addBtn.addEventListener('click', addLI, false);
recordUl.addEventListener('click', deleteLi, false);
footer.addEventListener('click', deleteAll, false);
// 呼叫函式（更新畫面時，資料才會一開始就印在頁面上）
updateData(data);


// 新增資料（click 事件 function）
function addLI(e) {
    e.preventDefault(); // 取消默認行為
    // 取得輸入欄位資料
    let text = inputArea.value;
    console.log(text);
    // 將資料 給定成 物件格式 [{},{}]
    let dataObject = {
        content: text
    };
    // 沒輸入內容則跳 alert
    if (text == '') {
        alert('請輸入內容～～～');
        return;
    }
    // 用 push 的方式 推入每一筆 物件object 資料
    data.push(dataObject);
    // 更新 並 印在網頁上 的 function 會重複用到 所以拉出來寫
    updateData(data);  // 呼叫更新函式

    inputArea.value = ''; // 輸入todo之後清除 input
}


// 更新資料 function 拉出來寫
function updateData(myData) {
    // forEach 迴圈抓出每一筆資料 做加總
    let str = '';
    let footerStr = `<div class="flex-grow-1">目前沒有任務</div>
                    <a href="#" class="delAll">全部刪除</a>`;
    data.forEach(function (item, i) {
        str += `<li class="recordLi">
                    <div class="checkList">
                        <input type="checkbox" class="checkBox" id="check${i}">
                        <label for="check${i}">${item.content}</label>
                    </div>
                    <a href="#" class="delBtn"><i class="far fa-trash-alt" data-num="${i}"></i></a>
                </li>`

        footerStr = `<div class="flex-grow-1">還有 ${i + 1} 筆任務</div>
                    <a href="#" class="delAll">全部刪除</a>`
    });
    // 把資料加在 ul 內
    recordUl.innerHTML = str;
    // 把資料加在 footer 內
    footer.innerHTML = footerStr;
    // 存在 localStorage 要轉成 字串 JSON.stringify
    localStorage.setItem('todoList', JSON.stringify(data));
}


// 刪除資料（click 事件 function）
function deleteLi(e) {
    let num = e.target.dataset.num;  // 當前指向的編號
    // console.log(e.target.nodeName);
    if (e.target.nodeName !== 'I') { // 若指向的不是 I 則中止動作
        return;
    };
    data.splice(num, 1); // 刪除點選的清單
    updateData(data);    // 刪除完後要充新渲染網頁
}


// 清除所有任務（click 事件 function）
function deleteAll(e) {
    if (e.target.nodeName !== 'A') { // 若指向的不是 A 則中止動作
        return;
    };
    recordUl.innerHTML = '';  // 將 Ul 內清空
    data = [];                // localStorage 也清空
    updateData(data);         // 刪除完後要充新渲染網頁
}




