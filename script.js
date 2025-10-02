document.addEventListener('DOMContentLoaded', () => {
    // --- (シナリオとエンディングのデータは変更なし) ---
    const scenarios = {
        maleTargetStory: [
            { id: 0, act: "第一幕：出会い編 📸", text: "共通の友人の紹介で知り合った{{target}}。ある週末、{{target}}から突然LINEが届く。「今、渋谷で飲んでるんだけど、よかったら合流しない？」", choices: [
                { text: "🎉「楽しそう！すぐ行く！」", effects: { love: 10, style: 15, trust: 5 }, next: 1 },
                { text: "🤔「誰がいるの？」と探る", effects: { love: 0, style: 0, trust: -5 }, next: 2 },
                { text: "🙏「ごめん、今日は別の予定が…」", effects: { love: -5, style: -5, trust: 0 }, next: 3 }
            ]},
            { id: 1, act: "第一幕：出会い編 🥂", text: "合流した飲み会。少し離れた席にいる{{target}}と話したい。周りには{{his_her}}の友人もたくさんいる。どうする？", choices: [
                { text: "👋 勇気を出して隣の席に移動し、話しかける", effects: { love: 15, style: 15, trust: 5 }, next: 4 },
                { text: "📲「こっちの席も楽しいよ」とLINEを送る", effects: { love: 5, style: -5, trust: 0 }, next: 4 }
            ]},
            { id: 2, act: "第一幕：出会い編 🔎", text: "{{target}}からメンバーの名前が返ってきた。知らない名前ばかりだ。「気にせずおいでよ！」と{{he_she}}は言うが…", choices: [
                { text: "🏃‍♀️「やっぱり行く！」と決断する", effects: { love: 10, style: 5, trust: 5 }, next: 1 },
                { text: "😥「人見知りだから、また今度にするね」", effects: { love: -10, style: -10, trust: -5 }, next: 3 }
            ]},
            { id: 3, act: "第一幕：出会い編 🌙", text: "結局、今夜は会わないことにした。数日後、あなたから{{target}}に連絡を取ることにした。どんなメッセージを送る？", choices: [
                { text: "😋「この前行きたがってたカフェ、今週末どう？」", effects: { love: 15, style: 15, trust: 10 }, next: 5 },
                { text: "❓「最近、元気？」と様子をうかがう", effects: { love: 5, style: -5, trust: 5 }, next: 5 }
            ]},
            { id: 4, act: "第二幕：深化編 🌃", text: "飲み会の帰り道、{{target}}と二人きりになった。{{he_she}}は少し疲れた顔をしているように見える。", choices: [
                { text: "💖「今日の服装、すごく似合ってるね」と褒める", effects: { love: 15, style: 10, trust: -5 }, next: 6 },
                { text: "🍵「大丈夫？何か温かいものでも飲む？」と気遣う", effects: { love: 10, style: -5, trust: 15 }, next: 6 }
            ]},
            { id: 5, act: "第二幕：深化編 ☀️", text: "あなたから誘い、二人で会う約束が無事に取り付けられた！", choices: [
                { text: "🙌 やった！楽しみ！", effects: { love: 5, style: 0, trust: 0 }, next: 6 }
            ]},
            { id: 6, act: "第二幕：深化編 💬", text: "二人きりで会った日。{{target}}が最近仕事で悩んでいることを打ち明けてくれた。あなたはどうする？", choices: [
                { text: "🧠「それは大変だね」と共感し、具体的なアドバイスをする", effects: { love: 5, style: 10, trust: 5 }, next: 7 },
                { text: "👂「そっか…」と口を挟まず、{{his_her}}の話を静かに最後まで聞く", effects: { love: 10, style: -10, trust: 20 }, next: 8 }
            ]},
            { id: 7, act: "第二幕：深化編 ✨", text: "あなたのアドバイスに{{target}}は「ありがとう、参考にするよ」と言ってくれた。会話はそれで一区切りついたようだ。", choices: [
                { text: "✨ 明るい話題に変える", effects: { love: 5, style: 5, trust: 0 }, next: 9 }
            ]},
            { id: 8, act: "第二幕：深化編 😊", text: "すべて話し終えた{{target}}は、「聞いてくれてありがとう。すごくスッキリした」と、心からの笑顔を見せた。", choices: [
                { text: "😊「いつでも聞くよ」と微笑む", effects: { love: 15, style: -5, trust: 10 }, next: 9 }
            ]},
            { id: 9, act: "第三幕：クライマックス編 💖", text: "デートも終盤。解散の時間が近づいている。「すごく楽しかった」と{{target}}は言ってくれた。", choices: [
                { text: "❤️「私もだよ。またすぐ会いたいな」とストレートに伝える", effects: { love: 20, style: 15, trust: 5 }, next: 10 },
                { text: "😊「今日はありがとう。また連絡するね」と控えめに伝える", effects: { love: 10, style: -5, trust: 5 }, next: 10 }
            ]},
            { id: 10, act: "第三幕：クライマックス編 🌃", text: "別れ際、{{target}}が「少し、話さない？」と近くの公園にあなたを誘った。ベンチに座る二人。{{he_she}}は何か言いたそうだ…", choices: [
                { text: "🤝 {{his_her}}の手をそっと握る", effects: { love: 20, style: 20, trust: 10 }, next: 'end' },
                { text: "💬 黙って、{{his_her}}の言葉を待つ", effects: { love: 15, style: -10, trust: 15 }, next: 'end' }
            ]}
        ],
        femaleTargetStory: [
            { id: 0, act: "第一幕：出会い編 🐶", text: "あなたがフォローしているカフェのInstagram。そのストーリーに頻繁に登場する店員の{{target}}さんが気になっていた。", choices: [
                { text: "💬 ストーリーに「いつも見てます！素敵ですね」と当たり障りのない感想を送る", effects: { love: 5, style: 0, trust: 0 }, next: 1 },
                { text: "☕️ 勇気を出して、彼女がいる時間帯にお店に行ってみる", effects: { love: 10, style: 15, trust: 10 }, next: 2 },
                { text: "🤔 共通の知り合いがいないか、SNSを探る", effects: { love: 0, style: -10, trust: -10 }, next: 1 }
            ]},
            { id: 1, act: "第一幕：出会い編 💬", text: "DMを送ったあなた。彼女から「ありがとうございます嬉しいです！」と丁寧な返信が来た。どう会話を続ける？", choices: [
                { text: "✨「今度お店行きますね！」と来店を予告する", effects: { love: 10, style: 10, trust: 5 }, next: 2 },
                { text: "🎬「カフェ以外の時間は、何してるんですか？」とプライベートに踏み込む", effects: { love: 0, style: 5, trust: -10 }, next: 2 },
                { text: "👍「頑張ってください！」と応援して、一旦会話を終える", effects: { love: 5, style: -15, trust: 5 }, next: 2 }
            ]},
            { id: 2, act: "第一幕：出会い編 ☕️", text: "お店に行くと、{{target}}さんは笑顔で迎えてくれた。「インスタの方ですよね？」と彼女はあなたのことを覚えていた！", choices: [
                { text: "😍「はい！会えて嬉しいです」と素直な気持ちを伝える", effects: { love: 15, style: 10, trust: 5 }, next: 3 },
                { text: "😎「まあ、どうも」と、少しクールに振る舞う", effects: { love: -5, style: 5, trust: -5 }, next: 3 },
                { text: "😳 恥ずかしくて、軽く会釈するだけ", effects: { love: 5, style: -10, trust: 0 }, next: 3 }
            ]},
            { id: 3, act: "第二幕：深化編 🍽", text: "何度か店に通い、少しずつ話すようになったあなた。ついに勇気を出して食事に誘い、OKをもらえた！どんなお店を選ぶ？", choices: [
                { text: "🥂 話題のおしゃれなビストロを予約する", effects: { love: 10, style: 10, trust: 5 }, next: 4 },
                { text: "🍝 彼女が「好き」と言っていたパスタが美味しい、隠れ家的なお店", effects: { love: 20, style: 5, trust: 20 }, next: 4 },
                { text: "❓「どこか行きたいお店ある？」と彼女に委ねる", effects: { love: 5, style: -15, trust: 10 }, next: 4 }
            ]},
            { id: 4, act: "第二幕：深化編 ☔️", text: "食事は盛り上がったが、店の外に出ると突然の雨。傘は一本しかない。", choices: [
                { text: "🥰「よかったら、入る？」と相合傘に誘う", effects: { love: 15, style: 15, trust: 5 }, next: 5 },
                { text: "🚕「タクシー拾うね！」とスマートに対応する", effects: { love: 10, style: 5, trust: 10 }, next: 5 },
                { text: "🏃‍♂️「駅まで走ろう！」と明るく提案する", effects: { love: 0, style: 10, trust: -5 }, next: 5 }
            ]},
            { id: 5, act: "第二幕：深化編 😥", text: "後日、彼女から「ちょっと仕事で落ち込むことがあって…」とLINEが。元気がないようだ。", choices: [
                { text: "🎁「美味しいものでも食べて元気出そ！」とすぐに食事に誘う", effects: { love: 10, style: 15, trust: 5 }, next: 6 },
                { text: "👂「そうなんだ、大変だったね。よかったら話聞くよ」と、まずは共感を示す", effects: { love: 15, style: -5, trust: 20 }, next: 6 },
                { text: "🤔「何があったの？」と原因を詳しく聞こうとする", effects: { love: 0, style: 5, trust: -10 }, next: 6 }
            ]},
            { id: 6, act: "第三幕：クライマックス編 🎡", text: "あなたの言葉で元気を取り戻した彼女。次のデートで、夜景の見える観覧車に乗ることになった。", choices: [
                { text: "🤣 いつものように、楽しい話で彼女を笑わせる", effects: { love: 10, style: 5, trust: 5 }, next: 7 },
                { text: "💖「〇〇さんといると、本当に楽しい」と、これまでの感謝を伝える", effects: { love: 15, style: 0, trust: 15 }, next: 7 },
                { text: "👀 何も言わず、窓の外の夜景を二人で眺める", effects: { love: 5, style: -10, trust: 10 }, next: 7 }
            ]},
            { id: 7, act: "第三幕：クライマックス編 💖", text: "観覧車が頂上に近づく。彼女がふと、真剣な顔であなたを見つめてきた。「ねぇ、私たちの関係って、なんだろうね…？」", choices: [
                { text: "❤️「俺は、〇〇さんのことが好きだよ。付き合ってほしい」と、ストレートに告白する", effects: { love: 25, style: 20, trust: 15 }, next: 'end' },
                { text: "🤝 彼女の手を優しく握り、「これからも、一緒にいたいと思ってる」と伝える", effects: { love: 20, style: 5, trust: 20 }, next: 'end' }
            ]}
        ]
    };
    const endings = { trueLove: { emoji: '🎉', title: "True Love Ending", description: "静寂の中、{{target}}が口にしたのは、あなたへの素直な気持ちだった。二人の物語は、最高の形でここから始まる。" }, goodFriends: { emoji: '😊', title: "Good Friends Ending", description: "楽しい時間を過ごした二人。恋人にはなれないかもしれない。でも、最高の友人として、これからも{{target}}の隣にいられそうだ。" }, justAcquaintances: { emoji: '🤷', title: "Just Acquaintances Ending", description: "あと一歩が踏み出せず、{{target}}との距離は縮まらないまま…。この関係が進むには、もう少し時間が必要なのかもしれない。" } };

    // DOM要素
    const screens = { start: document.getElementById('start-screen'), game: document.getElementById('game-screen'), result: document.getElementById('result-screen') };
    const playerNameInput = document.getElementById('player-name'), targetNameInput = document.getElementById('target-name');
    const genderOptions = document.querySelectorAll('.gender-option'), startGameBtn = document.getElementById('start-game-btn');
    const errorMessageEl = document.getElementById('error-message'), characterNameEl = document.getElementById('character-name');
    const loveMeterValueEl = document.getElementById('love-meter-value'), styleMeterValueEl = document.getElementById('style-meter-value'), trustMeterValueEl = document.getElementById('trust-meter-value');
    const loveProgress = document.getElementById('love-progress'), styleProgress = document.getElementById('style-progress'), trustProgress = document.getElementById('trust-progress');
    const scenarioActEl = document.getElementById('scenario-act'), scenarioTextEl = document.getElementById('scenario-text');
    const choicesContainer = document.getElementById('choices-container'), feedbackContainer = document.getElementById('feedback-container');
    const endingEmojiEl = document.getElementById('ending-emoji'), endingTitleEl = document.getElementById('ending-title'), endingDescriptionEl = document.getElementById('ending-description');
    const analysisTypeEl = document.getElementById('analysis-type'), adviceTextEl = document.getElementById('advice-text'), retryBtn = document.getElementById('retry-btn');
    const helpBtn = document.getElementById('help-btn'), helpModal = document.getElementById('help-modal'), closeModalBtn = document.getElementById('close-modal-btn');
    
    // ゲームの状態
    let player = { name: '' }, target = { name: '', gender: '' };
    let currentStory = [], loveMeter = 50, styleMeter = 0, trustMeter = 0;

    // イベントリスナー
    genderOptions.forEach(option => option.addEventListener('click', () => {
        genderOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        target.gender = option.dataset.gender;
    }));
    startGameBtn.addEventListener('click', () => {
        player.name = playerNameInput.value.trim();
        target.name = targetNameInput.value.trim();
        if (!player.name || !target.name || !target.gender) { errorMessageEl.textContent = 'すべての項目を入力してください。'; return; }
        errorMessageEl.textContent = '';
        startGame();
    });
    retryBtn.addEventListener('click', () => {
        playerNameInput.value = ''; targetNameInput.value = '';
        genderOptions.forEach(o => o.classList.remove('selected'));
        showScreen('start');
    });
    helpBtn.addEventListener('click', () => helpModal.classList.add('visible'));
    closeModalBtn.addEventListener('click', () => helpModal.classList.remove('visible'));
    helpModal.addEventListener('click', (e) => { if (e.target === helpModal) helpModal.classList.remove('visible'); });

    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    function processText(text) {
        let processedText = text.replace(/{{player}}/g, player.name).replace(/{{target}}/g, target.name);
        const pronouns = target.gender === 'male' ? { 'he_she': '彼', 'his_her': '彼' } : { 'he_she': '彼女', 'his_her': '彼女' };
        return processedText.replace(/{{he_she}}/g, pronouns.he_she).replace(/{{his_her}}/g, pronouns.his_her);
    }

    function startGame() {
        currentStory = target.gender === 'male' ? scenarios.maleTargetStory : scenarios.femaleTargetStory;
        if (currentStory[0].act === "準備中") { errorMessageEl.textContent = 'このストーリーは現在準備中です。'; return; }
        characterNameEl.textContent = target.name;
        loveMeter = 50; styleMeter = 0; trustMeter = 0;
        updateMeters();
        loadScenario(0);
        showScreen('game');
    }

    function loadScenario(id) {
        const scenario = currentStory.find(s => s.id === id);
        if (!scenario) return;
        scenarioActEl.textContent = scenario.act;
        scenarioTextEl.textContent = processText(scenario.text);
        choicesContainer.innerHTML = '';
        scenario.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.classList.add('choice-btn');
            button.innerHTML = `<span>${processText(choice.text)}</span>`;
            button.style.animationDelay = `${index * 0.1}s`;
            button.onclick = (e) => selectChoice(choice, e.currentTarget);
            choicesContainer.appendChild(button);
        });
    }

    function selectChoice(choice, buttonElement) {
        choicesContainer.querySelectorAll('.choice-btn').forEach(btn => btn.classList.add('disabled'));
        showFeedback(choice.effects, buttonElement);
        loveMeter = Math.max(0, Math.min(100, loveMeter + (choice.effects.love || 0)));
        styleMeter += choice.effects.style || 0;
        trustMeter = Math.max(0, Math.min(100, trustMeter + (choice.effects.trust || 0)));
        setTimeout(() => {
            updateMeters();
            if (choice.next === 'end') showResult();
            else loadScenario(choice.next);
        }, 1500);
    }

    function showFeedback(effects, buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        const containerRect = feedbackContainer.getBoundingClientRect();
        const effectsMap = { love: '好感度', style: '主導権', trust: '信頼度' };
        const emojiMap = { love: '❤️', style: '⚡️', trust: '💎' };

        let delay = 0;
        for (const key in effects) {
            if (effects[key] !== 0) {
                setTimeout(() => {
                    const feedbackEl = document.createElement('div');
                    feedbackEl.classList.add('feedback-popup');
                    const value = effects[key];
                    feedbackEl.classList.add(value > 0 ? 'positive' : 'negative');
                    feedbackEl.innerHTML = `${effectsMap[key]} ${value > 0 ? '+' : ''}${value} ${emojiMap[key]}`;
                    feedbackEl.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                    feedbackEl.style.top = `${rect.top - containerRect.top}px`;
                    feedbackContainer.appendChild(feedbackEl);
                    setTimeout(() => feedbackEl.remove(), 1900);
                }, delay);
                delay += 300;
            }
        }
    }

    function updateMeters() {
        loveMeterValueEl.textContent = loveMeter;
        styleMeterValueEl.textContent = styleMeter;
        trustMeterValueEl.textContent = trustMeter;

        loveProgress.style.width = `${loveMeter}%`;
        const stylePercentage = 50 + styleMeter / 2; // 主導権は-100~100の範囲と仮定
        styleProgress.style.width = `${Math.max(0, Math.min(100, stylePercentage))}%`;
        trustProgress.style.width = `${trustMeter}%`;
    }

    function showResult() {
        let ending;
        if (loveMeter >= 80 && trustMeter >= 50) ending = endings.trueLove;
        else if (loveMeter >= 50) ending = endings.goodFriends;
        else ending = endings.justAcquaintances;
        
        endingEmojiEl.textContent = ending.emoji;
        endingTitleEl.textContent = processText(ending.title);
        endingDescriptionEl.textContent = processText(ending.description);

        let type = '', advice = '';
        if (styleMeter >= 30) {
            type = '情熱的リーダー';
            advice = 'あなたは関係を積極的にリードし、情熱で相手を惹きつけます。ただ、時には相手のペースに合わせる「待ち」の姿勢も、更なる信頼に繋がるでしょう。';
        } else if (styleMeter <= -20) {
            type = '心優しきサポーター';
            advice = '相手に寄り添い、支える優しさを持っています。その思いやりは最大の魅力。自信を持って、自分の意見を伝えてみることで、関係はさらに深まります。';
        } else {
            type = 'スマートなバランサー';
            advice = '場の空気を読み、柔軟に対応できるスマートさがあります。そのバランス感覚を武器に、相手との心地よい距離感を保ち続けられるでしょう。';
        }
        analysisTypeEl.textContent = type;
        adviceTextEl.textContent = advice;
        showScreen('result');
    }
});
