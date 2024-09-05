//thay thế phương thức mặc định
const $         = document.querySelector.bind(document);
const $$        = document.querySelectorAll.bind(document);





const App = {
    GAME_PLAY_DATA: [],
    async getData(api) {
        /**
         * TODO: tối ưu hoá hàm này với trường hợp lấy data thất bại
         * @return {dataConvert} sẽ chưa được chuyển đổi dữ liệu kịp thời
         * @author hieuruy
         */
        const dataAPI = await fetch(api);
        const dataConvert = await dataAPI.json()

        return dataConvert;
    },
    setButtonEvent() {
        //lấy các elements trong DOM
        const controlBtns       = $$('.option-controls .btn');
        const mainMenu          = $('.option');
        const backBtn           = $('.btn-back');
        const agreeBtn           = $('.btn-agree');
        const contentOption     = {
            content: $('.content'),
            contentTitle: $('.content-title .title'),
            wordleRule: $('.rule-description:first-child p.description'),
            gameType: $('.rule-description:last-child p.description'),
            gameAbout: $('.rule-description:last-child ul.rules')
            
        }
        console.log(contentOption);

        controlBtns.forEach(button => {
            button.onclick = function(e) {
                const dataValue = button.getAttribute('data-value');

                //lấy dữ liệu khi bấm vào một nút
                const dataGamePlay = App.GAME_PLAY_DATA.find(data => data.name === dataValue);

                mainMenu.classList.add('d-none');
                contentOption.content.classList.remove('d-none');
                contentOption.contentTitle.innerText = dataGamePlay.type;
                contentOption.gameType.innerHTML = dataGamePlay.description;
                contentOption.gameAbout.innerHTML = dataGamePlay.about;
                contentOption.wordleRule.innerHTML = dataGamePlay.rules;
                console.log(dataGamePlay);

            }

        });
        backBtn.onclick = function(e) {
            mainMenu.classList.remove('d-none');
            contentOption.content.classList.add('d-none');
        }

    },
    async start() {
        //! đây là biến toàn cục trong App nên không được thay đổi.
        this.GAME_PLAY_DATA = await this.getData("gameplays.json");

        /**
         * TODO: các hàm dưới đây sẽ chạy sau khi call API
         * FIXME: phần logic sẽ bị lỗi nếu call API thất bại
         */
        this.setButtonEvent();
    }
}

App.start();