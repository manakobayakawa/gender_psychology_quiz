document.addEventListener('DOMContentLoaded', () => {
    // --- ゲームデータ ---
    // {{target}} は相手の名前に、{{he_she}}などは性別に合わせて「彼」「彼女」に自動で置き換わります。
    const scenarios = {
        maleTargetStory: [
            { id: 0, image: "https://images.unsplash.com/photo-1517486808906-6538cb3b81ee?q=80&w=2070", text: "共通の友人の紹介で知り合った{{target}}。{{he_she}}とは時々メッセージをやりとりする仲だ。ある週末、{{target}}から突然LINEが届く。「今、渋谷で友達と飲んでるんだけど、よかったら合流しない？」", choices: [
                { text: "「楽しそう！今から準備していくね！」", effect: 15, next: 1 },
                { text: "「今日はちょっと疲れてるから、また今度誘って！」", effect: -5, next: 2 },
                { text: "「誰がいるの？メンバーによるかな（笑）」", effect: 5, next: 1 }
            ]},
            { id: 1, image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=2070", text: "合流した飲み会は盛り上がった。帰り道、{{target}}と二人きりになるチャンスが。何を話す？", choices: [
                { text: "「今日の飲み会、すごく楽しかったね！」", effect: 10, next: 3 },
                { text: "「〇〇くん（共通の友人）って面白いよね」", effect: 5, next: 3 },
                { text: "黙って、{{his_her}}の隣を歩く", effect: -5, next: 3 }
            ]},
            { id: 2, image: "https://images.unsplash.com/photo-1577823297195-21db3a9e3391?q=80&w=2070", text: "断りのLINEを送った後、{{target}}から「そっか、残念！またね！」と返信が。この後どうする？", choices: [
                { text: "「またぜひ誘って！」と返信する", effect: 10, next: 3 },
                { text: "そのまま既読スルーする", effect: -15, next: 3 },
                { text: "翌日、「昨日はごめんね」と追いLINEする", effect: 5, next: 3 }
            ]},
            { id: 3, image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070", text: "後日、{{target}}が仕事でミスをして落ち込んでいると聞いた。あなたなら何と声をかける？", choices: [
                { text: "「大変だったね。私でよかったら話聞くよ」", effect: 20, next: 4 },
                { text: "「そんな時もあるよ！元気出して！」", effect: 5, next: 4 },
                { text: "具体的な解決策を長文LINEで送る", effect: -10, next: 4 }
            ]},
            { id: 4, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070", text: "{{target}}から「今週末、空いてる？」とLINEが来た。初めて二人きりで会うチャンス！どこに行きたいと提案する？", choices: [
                { text: "「おしゃれなカフェでのんびり話したいな」", effect: 10, next: 5 },
                { text: "「{{target}}くんの好きなところがいいな」", effect: 15, next: 5 },
                { text: "「話題の映画が観たい！」", effect: 5, next: 5 }
            ]},
            { id: 5, text: "（最終章）二人きりのデートは順調に進んだ。別れ際、{{he_she}}が少し真剣な顔でこちらを見ている。あなたはどうする？", image: "https://images.unsplash.com/photo-1516900557549-41557d405439?q=80&w=1974", choices: [
                { text: "{{his_her}}の言葉を待つ", effect: 20, next: 'end' },
                { text: "「今日はありがとう！」と笑顔で先に言う", effect: 5, next: 'end' },
                { text: "恥ずかしくて、少し目をそらす", effect: -5, next: 'end' }
            ]}
        ],
        femaleTargetStory: [
            // 女性をターゲットにしたストーリーも同様に作成できます
            { id: 0, text: "（女性ターゲット用のシナリオ1）{{target}}は元気かな？", image: "https://images.unsplash.com/photo-1517486808906-6538cb3b81ee?q=80&w=2070", choices: [
                { text: "選択肢A", effect: 10, next: 'end' },
                { text: "選択肢B", effect: -5, next: 'end' }
            ]}
        ]
    };
    const endings = {
        trueLove: { title: "True Love Ending", description: "{{his_her}}の真剣な眼差しに応えたあなた。{{target}}の口から出たのは、ずっと聞きたかった言葉だった。二人の物語は、ここから始まる。", image: "https://images.unsplash.com/photo-1502790671504-44a34115432a?q=80&w=1964" },
        goodFriends: { title: "Good Friends Ending", description: "楽しい時間を過ごした二人。恋人というには、まだ少し早いのかもしれない。でも、これからも良き友人として、{{target}}の隣にいられそうだ。", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932" },
        justAcquaintances: { title: "Just Acquaintances Ending", description: "お互いに少し壁があるようだ。{{target}}との距離は、縮まることなく今日を終えた。またどこかで会うことがあれば、その時は...。", image: "https://images.unsplash.com/photo-1604786283220-37053550393e?q=80&w=1974" }
    };

    // --- DOM要素 ---
    const screens = { start: document.getElementById('start-screen'), game: document.getElementById('game-screen'), result: document.getElementById('result-screen') };
    const playerNameInput = document.getElementById('player-name');
    const targetNameInput = document.getElementById('target-name');
    const genderOptions = document.querySelectorAll('.gender-option');
    const startGameBtn = document.getElementById('start-game-btn');
    const errorMessageEl = document.getElementById('error-message');
    const characterNameEl = document.getElementById('character-name');
    const loveMeterValueEl = document.getElementById('love-meter-value');
    const scenarioImageEl = document.getElementById('scenario-image');
    const scenarioTextEl = document.getElementById('scenario-text');
    const choicesContainer = document.getElementById('choices-container');
    const endingTitleEl = document.getElementById('ending-title');
    const endingImageEl = document.getElementById('ending-image');
    const endingDescriptionEl = document.getElementById('ending-description');
    const retryBtn = document.getElementById('retry-btn');

    // --- ゲームの状態 ---
    let player = { name: '' };
    let target = { name: '', gender: '' };
    let currentStory = [];
    let loveMeter = 50;
    
    // --- イベントリスナー ---
    genderOptions.forEach(option => {
        option.addEventListener('click', () => {
            genderOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            target.gender = option.dataset.gender;
        });
    });

    startGameBtn.addEventListener('click', () => {
        player.name = playerNameInput.value.trim();
        target.name = targetNameInput.value.trim();
        
        if (!player.name || !target.name || !target.gender) {
            errorMessageEl.textContent = 'すべての項目を入力してください。';
            return;
        }
        errorMessageEl.textContent = '';
        startGame();
    });

    retryBtn.addEventListener('click', () => {
        // 入力フォームをリセット
        playerNameInput.value = '';
        targetNameInput.value = '';
        genderOptions.forEach(o => o.classList.remove('selected'));
        showScreen('start');
    });

    // --- ゲームロジック ---
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // テキスト内のプレースホルダーを実際の情報に置き換える関数
    function processText(text) {
        let processedText = text.replace(/{{player}}/g, player.name).replace(/{{target}}/g, target.name);
        if (target.gender === 'male') {
            processedText = processedText.replace(/{{he_she}}/g, '彼').replace(/{{him_her}}/g, '彼').replace(/{{his_her}}/g, '彼');
        } else {
            processedText = processedText.replace(/{{he_she}}/g, '彼女').replace(/{{him_her}}/g, '彼女').replace(/{{his_her}}/g, '彼女');
        }
        return processedText;
    }

    function startGame() {
        currentStory = target.gender === 'male' ? scenarios.maleTargetStory : scenarios.femaleTargetStory;
        
        // 女性ターゲットのシナリオが準備中ならアラート
        if (currentStory.length <= 1) {
            errorMessageEl.textContent = 'このストーリーは現在準備中です。';
            return;
        }

        characterNameEl.textContent = target.name;
        loveMeter = 50;
        updateLoveMeter();
        loadScenario(0);
        showScreen('game');
    }

    function loadScenario(id) {
        const scenario = currentStory.find(s => s.id === id);
        if (!scenario) return;

        scenarioImageEl.style.backgroundImage = `url(${scenario.image})`;
        scenarioTextEl.textContent = processText(scenario.text);
        choicesContainer.innerHTML = '';

        scenario.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = processText(choice.text);
            button.classList.add('choice-btn');
            button.onclick = () => selectChoice(choice);
            choicesContainer.appendChild(button);
        });
    }

    function selectChoice(choice) {
        loveMeter += choice.effect;
        if (loveMeter > 100) loveMeter = 100;
        if (loveMeter < 0) loveMeter = 0;
        updateLoveMeter();

        if (choice.next === 'end') {
            showResult();
        } else {
            loadScenario(choice.next);
        }
    }

    function updateLoveMeter() {
        loveMeterValueEl.textContent = loveMeter;
    }

    function showResult() {
        let ending;
        if (loveMeter >= 80) ending = endings.trueLove;
        else if (loveMeter >= 50) ending = endings.goodFriends;
        else ending = endings.justAcquaintances;
        
        endingTitleEl.textContent = processText(ending.title);
        endingImageEl.style.backgroundImage = `url(${ending.image})`;
        endingDescriptionEl.textContent = processText(ending.description);
        showScreen('result');
    }
});
