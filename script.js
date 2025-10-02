document.addEventListener('DOMContentLoaded', () => {
    // --- ゲームデータ ---
    // effects: { love: 好感度, style: 主導権 }
    const scenarios = {
        maleTargetStory: [
            { id: 0, emoji: '💬', chapter: '第1章：突然の誘い', text: "共通の友人の紹介で知り合った{{target}}。{{he_she}}とは時々メッセージをやりとりする仲だ。ある週末、{{target}}から突然LINEが届く。「今、渋谷で友達と飲んでるんだけど、よかったら合流しない？」", choices: [
                { emoji: '🎉', text: "「楽しそう！すぐ行く！」と即答する", effects: { love: 10, style: 15 }, next: 1 },
                { emoji: '🤔', text: "「誰がいるの？」とメンバーを探る", effects: { love: 0, style: 0 }, next: 2 },
                { emoji: '🙏', text: "「ごめん、今日は別の予定が…」と断る", effects: { love: -5, style: -5 }, next: 3 }
            ]},
            // --- 分岐Aルート (即答した場合) ---
            { id: 1, emoji: '🥂', chapter: '第2章：賑やかな時間', text: "合流した飲み会は盛り上がっている。少し離れた席にいる{{target}}と話したいが、周りには{{his_her}}の友人もたくさんいる。どうする？", choices: [
                { emoji: '👋', text: "勇気を出して隣の席に移動し、話しかける", effects: { love: 15, style: 15 }, next: 4 },
                { emoji: '📲', text: "「こっちの席も楽しいよ」とLINEを送ってみる", effects: { love: 5, style: -5 }, next: 4 },
                { emoji: '👀', text: "目が合うのを待ち、小さく会釈する", effects: { love: 0, style: -10 }, next: 4 }
            ]},
            // --- 分岐Bルート (探りを入れた場合) ---
            { id: 2, emoji: '📲', chapter: '第2章：探りのメッセージ', text: "{{target}}からメンバーの名前が返ってきた。知らない名前ばかりだ。「気にしなくていいからおいでよ！」と{{he_she}}は言うが…", choices: [
                { emoji: '🏃‍♀️', text: "「やっぱり行く！」と決断する", effects: { love: 10, style: 5 }, next: 1 },
                { emoji: '😥', text: "「人見知りだから、また今度にするね」と断る", effects: { love: -10, style: -10 }, next: 3 }
            ]},
             // --- 分岐Cルート (断った場合) ---
            { id: 3, emoji: '🌙', chapter: '第2章：それぞれの夜', text: "結局、今夜は会わないことにした。数日後、あなたから{{target}}に連絡を取ることにした。どんなメッセージを送る？", choices: [
                { emoji: '😋', text: "「この前行きたがってたカフェ、今週末どう？」と具体的に誘う", effects: { love: 15, style: 15 }, next: 5 },
                { emoji: '❓', text: "「最近、元気？」と様子をうかがう", effects: { love: 5, style: -5 }, next: 5 },
                { emoji: '😂', text: "面白いミーム画像を何も言わずに送りつける", effects: { love: 0, style: 10 }, next: 5 }
            ]},
            // --- 合流ルート ---
            { id: 4, emoji: '帰り道', chapter: '第3章：帰り道', text: "飲み会が終わり、駅までの道を{{target}}と二人きりで歩いている。沈黙が少し気まずい…", choices: [
                { emoji: '🎤', text: "「今日の服装、すごく似合ってるね」と褒める", effects: { love: 15, style: 10 }, next: 6 },
                { emoji: '🤔', text: "「仕事（学校）、最近どう？」と質問する", effects: { love: 10, style: 0 }, next: 6 },
                { emoji: '🎧', text: "「どんな音楽聴くの？」と趣味の話を振る", effects: { love: 10, style: 5 }, next: 6 }
            ]},
            { id: 5, emoji: '☀️', chapter: '第3章：次の約束', text: "メッセージを送ると、{{target}}から好意的な返事が来た。二人で会う約束が無事に取り付けられた！", choices: [
                { emoji: '🙌', text: "やった！楽しみ！", effects: { love: 5, style: 0 }, next: 6 }
            ]},
            { id: 6, emoji: '☕️', chapter: '第4章：初めてのデート', text: "二人きりのデート当日。会話も弾み、楽しい時間を過ごした。そろそろ解散の時間が近づいている。", choices: [
                { emoji: '💖', text: "「すごく楽しかった！またすぐ会いたいな」とストレートに伝える", effects: { love: 20, style: 15 }, next: 7 },
                { emoji: '😊', text: "「今日はありがとう。また連絡するね」と控えめに伝える", effects: { love: 10, style: -5 }, next: 7 },
                { emoji: '🤝', text: "「ごちそうさま！次は私が出すね！」と次の約束を匂わせる", effects: { love: 15, style: 5 }, next: 7 }
            ]},
            { id: 7, emoji: '🌃', chapter: '最終章：夜の公園で', text: "別れ際、{{target}}が「少し、話さない？」と近くの公園にあなたを誘った。ベンチに座る二人。{{he_she}}は何か言いたそうだ…", choices: [
                { emoji: '❤️', text: "黙って、{{his_her}}の言葉を待つ", effects: { love: 15, style: -10 }, next: 'end' },
                { emoji: '✨', text: "「月が綺麗だね」と、雰囲気に任せてみる", effects: { love: 10, style: 0 }, next: 'end' },
                { emoji: '🏃', text: "緊張して「そろそろ帰らなきゃ！」と話を遮る", effects: { love: -20, style: 5 }, next: 'end' }
            ]}
        ],
        femaleTargetStory: [
             { id: 0, text: "（女性ターゲット用のシナリオ）", choices: [{ text: "選択肢", effects: { love: 0, style: 0 }, next: 'end' }] }
        ]
    };
    const endings = {
        trueLove: { emoji: '🎉', title: "True Love Ending", description: "静寂の中、{{target}}が口にしたのは、あなたへの素直な気持ちだった。二人の物語は、最高の形でここから始まる。" },
        goodFriends: { emoji: '😊', title: "Good Friends Ending", description: "楽しい時間を過ごした二人。恋人にはなれないかもしれない。でも、最高の友人として、これからも{{target}}の隣にいられそうだ。" },
        justAcquaintances: { emoji: '🤷', title: "Just Acquaintances Ending", description: "あと一歩が踏み出せず、{{target}}との距離は縮まらないまま…。この関係が進むには、もう少し時間が必要なのかもしれない。" }
    };

    // --- DOM要素 (変更なし) ---
    const screens = { start: document.getElementById('start-screen'), game: document.getElementById('game-screen'), result: document.getElementById('result-screen') };
    const playerNameInput = document.getElementById('player-name');
    const targetNameInput = document.getElementById('target-name');
    const genderOptions = document.querySelectorAll('.gender-option');
    const startGameBtn = document.getElementById('start-game-btn');
    const errorMessageEl = document.getElementById('error-message');
    const characterNameEl = document.getElementById('character-name');
    const loveMeterValueEl = document.getElementById('love-meter-value');
    const styleMeterValueEl = document.getElementById('style-meter-value');
    const scenarioEmojiEl = document.getElementById('scenario-emoji');
    const scenarioChapterEl = document.getElementById('scenario-chapter');
    const scenarioTextEl = document.getElementById('scenario-text');
    const choicesContainer = document.getElementById('choices-container');
    const endingEmojiEl = document.getElementById('ending-emoji');
    const endingTitleEl = document.getElementById('ending-title');
    const endingDescriptionEl = document.getElementById('ending-description');
    const adviceTextEl = document.getElementById('advice-text');
    const retryBtn = document.getElementById('retry-btn');
    
    // --- ゲームの状態 ---
    let player = { name: '' };
    let target = { name: '', gender: '' };
    let currentStory = [];
    let loveMeter = 50;
    let styleMeter = 0;

    // --- イベントリスナー (変更なし) ---
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
        playerNameInput.value = '';
        targetNameInput.value = '';
        genderOptions.forEach(o => o.classList.remove('selected'));
        showScreen('start');
    });

    // --- ゲームロジック (更新) ---
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

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
        if (currentStory.length <= 1) {
            errorMessageEl.textContent = 'このストーリーは現在準備中です。';
            return;
        }
        characterNameEl.textContent = target.name;
        loveMeter = 50;
        styleMeter = 0;
        updateMeters();
        loadScenario(0);
        showScreen('game');
    }

    function loadScenario(id) {
        const scenario = currentStory.find(s => s.id === id);
        if (!scenario) return;
        scenarioEmojiEl.textContent = scenario.emoji || '💬';
        scenarioChapterEl.textContent = scenario.chapter || '';
        scenarioTextEl.textContent = processText(scenario.text);
        choicesContainer.innerHTML = '';
        scenario.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('choice-btn');
            button.innerHTML = `<span class="choice-emoji">${choice.emoji || '➡️'}</span> <span class="choice-text">${processText(choice.text)}</span>`;
            button.onclick = () => selectChoice(choice);
            choicesContainer.appendChild(button);
        });
    }

    function selectChoice(choice) {
        loveMeter += choice.effects.love || 0;
        styleMeter += choice.effects.style || 0;
        if (loveMeter > 100) loveMeter = 100; if (loveMeter < 0) loveMeter = 0;
        updateMeters();
        if (choice.next === 'end') showResult();
        else loadScenario(choice.next);
    }

    function updateMeters() {
        loveMeterValueEl.textContent = loveMeter;
        styleMeterValueEl.textContent = styleMeter;
    }

    function showResult() {
        let ending;
        if (loveMeter >= 80) ending = endings.trueLove;
        else if (loveMeter >= 50) ending = endings.goodFriends;
        else ending = endings.justAcquaintances;
        
        endingEmojiEl.textContent = ending.emoji;
        endingTitleEl.textContent = processText(ending.title);
        endingDescriptionEl.textContent = processText(ending.description);

        // 新機能：アドバイス生成
        let advice = '';
        if (styleMeter >= 20) {
            advice = 'あなたは積極的に関係をリードできるタイプ！たまには相手に委ねてみることで、新たな一面が見えるかも？';
        } else if (styleMeter <= -20) {
            advice = '相手を思いやる優しいあなた。でも、時には自分の気持ちをストレートに伝える勇気も、関係を深める鍵になります。';
        } else {
            advice = '聞き上手で、押し引きもできるバランス感覚が素晴らしい！その柔軟なコミュニケーションがあなたの最大の武器です。';
        }
        adviceTextEl.textContent = advice;
        showScreen('result');
    }
});
