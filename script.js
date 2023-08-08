//https://test-data-gules.vercel.app/data.json
const button = document.querySelector('.btn');
const tableBody = document.querySelector('.table tbody');
const accord = document.querySelector('.main-container .accordion');


const arrayContent = [];

function getData() {
    fetch('https://test-data-gules.vercel.app/data.json')
        .then((res) => res.json())
        .then((content) => {

            var noOfQue = 0;
            if (content.status) {

                content.data.forEach((quest) => {
                    noOfQue += quest.ques.length;
                })

                let data = content.data;
                let mainOutput = "";
                data.forEach((item) => {
                    let questions = item.ques;
                    let title = item.title;

                    let output = "";
                    questions.forEach((que) => {

                        let plLink1 = que.p1_link;
                        let plLink2 = que.p2_link;
                        let ytLink = que.yt_link;

                        if (plLink1 === null) {
                            plLink1 = "#";
                        }
                        if (plLink2 === null) {
                            plLink2 = "#";
                        }
                        if (ytLink === null) {
                            ytlink = "#";
                        }
                        output += `
                        <tr>
                            <td class="action">
                                <input type="checkbox">
                                <!-- checkbox from uiverse io  -->
                            </td>
                            <td class="Qtitle">${que.title}</td>
                            <td class="PL-1"><a href="${plLink1}"><img src="images/coding-ninja.png" alt="images" class="coding-ninja"></a></td>
                            <td class="PL-2"><a href="${plLink2}"><img src="images/leetcode.png" alt="images" class="leetcode"></a></td>
                            <td class="YT-link"><a href="${ytLink}"><img src="images/youtube.png" alt="images" class="youtube"></a></td>
                            <td class="bookmark">
                                    <i class="fa-regular fa-bookmark"></i>
                            </td>
                        </tr> 
                    `
                    })


                    mainOutput = `
                    <header class="header">
                        <div class="start">
                            <i class="fa-solid fa-circle"></i>
                            <span class="title">${item.title}</span>
                        </div>
                        <a href="#"><i class="fa-solid fa-plus plus"></i></a>
                    </header>

                    <div class="table">
                        <table>
                            <thead>
                                <tr>
                                    <td class="done?">Mark</td>
                                    <td class="question1">Question Title</td>
                                    <td class="PF1">PF1</td>
                                    <td class="PF2">PF2</td>
                                    <td class="YT">YT</td>
                                    <td class="book1">Book</td>
                                </tr>
                            </thead>

                            ${output}

                        </table>
                    </div>
                `

                    const element = document.createElement("div");
                    element.className = "accordion-content";
                    element.innerHTML = mainOutput;
                    accord.appendChild(element);

                })
                const accordionContent = document.querySelectorAll(".accordion-content");
                var countBar = 0;
                accordionContent.forEach((item) => {

                    let header = item.querySelector('header');
                    header.addEventListener("click", () => {    
                        item.classList.toggle('open');
                        let plusIcon = item.querySelector('.plus');
                        
                        let table = item.querySelector('.table');
                        if (item.classList.contains('open')) {
                            table.style.height = `${table.scrollHeight + 50}px`;
                            plusIcon.classList.replace('fa-plus', 'fa-minus')
                        }
                        else {
                            table.style.height = '0px';
                            plusIcon.classList.replace('fa-minus', 'fa-plus');
                        }

                    })

                    let inputCheckBox = item.querySelectorAll('input');
                    let progressBar = document.querySelector('.progress-bar input')
                    let progressMaxVal = document.querySelector('.progress-bar .two')
                    let progressVal = document.querySelector('.progress-bar .one')

                    progressBar.value = 0;

                    inputCheckBox.forEach((checkBox) => {
                        checkBox.addEventListener('click', () => {

                            if (checkBox.checked) {
                                let parentOfCheckBox = checkBox.parentElement.parentElement;
                                parentOfCheckBox.classList.add('active');
                                countBar++;
                            }
                            else {
                                let parentOfCheckBox = checkBox.parentElement.parentElement;
                                parentOfCheckBox.classList.remove('active');
                                countBar--;
                            }

                            progressBar.max = noOfQue;
                            progressMaxVal.innerHTML = noOfQue;

                            progressVal.innerHTML = countBar;
                            progressBar.value = countBar;

                            const totalQuePara = document.querySelector('.progressBar span .two');

                        })
                    })

                });

                const searchBox = document.querySelector('input');
                const searchButton = document.querySelector('.search button');
                searchButton.addEventListener('click', (e) => {
                    let textInput = searchBox.value.toLocaleLowerCase();
                    let tableItems = document.querySelectorAll('.table ')
                    Array.from(tableItems).forEach((ite) => {

                        let liItem = ite.querySelectorAll('table tbody tr .Qtitle');
                        // console.log(liItem)
                        liItem.forEach((it) => {
                            let textData = it.textContent
                            if (textData.toLocaleLowerCase().indexOf(textInput) == -1) {
                                it.parentElement.style.display = 'none';
                            }
                            else {
                                it.parentElement.style.display = 'grid';
                            }
                        })
                    })
                })

                let themeBtn = document.querySelector('.theme-btn span');
                themeBtn.addEventListener('click', () => {
                    let body = document.querySelector('body');
                    body.classList.toggle('dark-theme');

                    let para = document.querySelector('.theme-btn p')
                    if (body.classList.contains('dark-theme')) {
                        para.innerHTML = 'DARK THEME';
                    }
                    else {
                        para.innerHTML = 'LIGHT THEME';
                    }
                })

                const hamBurger = document.querySelector('.navbar .ham a ');
                hamBurger.addEventListener('click', (e) => {

                    let mediaQ1060 = document.querySelector('.navbar .media-q-1060');
                    mediaQ1060.classList.toggle('active');
                    let iButton = document.querySelector('.navbar .ham i');
                    if (mediaQ1060.classList.contains('active')) {
                        iButton.classList.replace('fa-bars', 'fa-xmark')
                    }
                    else {
                        iButton.classList.replace('fa-xmark', 'fa-bars')
                    }
                })


                const bookMarkDiv = document.querySelector('.bookmark-sec .bookmark-div table tbody');
                const bookMarkIcon = document.querySelectorAll('.main .table tbody .bookmark i');
                bookMarkIcon.forEach((bookMarkIc) => {
                    let flag = 0;
                    bookMarkIc.addEventListener('click', (e) => {

                        if (!flag) {
                            e.target.classList.replace('fa-regular', 'fa-solid');
                            flag = 1;

                            const bookMarkDivContent = document.createElement('tr');
                            bookMarkDivContent.className = 'trs';
                            let title = e.target.parentElement.parentElement.querySelector('.Qtitle')
                            let pl1link = e.target.parentElement.parentElement.querySelector('.PL-1 a')
                            let pl2link = e.target.parentElement.parentElement.querySelector('.PL-2 a')
                            let ytlink = e.target.parentElement.parentElement.querySelector('.YT-link a')

                            let outPut1 = `

                                <td class="action">
                                    <input type="checkbox">
                                    <!-- checkbox from uiverse io  -->
                                </td>
                                <td class="Qtitle">${title.textContent}</td>
                                <td class="PL-1"><a href="${pl1link.href}"><img src="images/coding-ninja.png" alt="images" class="coding-ninja"></a></td>
                                <td class="PL-2"><a href="${pl2link.href}"><img src="images/leetcode.png" alt="images" class="leetcode"></a></td>
                                <td class="YT-link"><a href="${ytlink.href}"><img src="images/youtube.png" alt="images" class="youtube"></a></td>
                                <td class="bookmark">
                                        <i class="fa-regular fa-bookmark"></i>
                                </td>

                            
                        `
                            bookMarkDivContent.innerHTML = outPut1;
                            bookMarkDiv.appendChild(bookMarkDivContent);


                        }
                        else {
                            e.target.classList.replace('fa-solid', 'fa-regular');
                            flag = 0;

                            let trQtitle = e.target.parentElement.parentElement.querySelector('.Qtitle').textContent;
                            let bookMarkedQtitle = document.querySelectorAll('.bookmark-div tbody .Qtitle');

                            bookMarkedQtitle.forEach((item) => {
                                if (item.textContent === trQtitle) {
                                    item.parentElement.style.display = 'none';
                                }
                            })
                        }

                    })
                })



            }
        })

}

getData();




