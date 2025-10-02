document.addEventListener('DOMContentLoaded', () => {
    const scenarios = {
        maleTargetStory: [
            // --- 男性ターゲット編：彼の心の扉を開く物語 ---
            // 第一幕：出会い編
            { id: 0, act: "第一幕：出会い編 📸", text: "友人が投稿したInstagramの集合写真。そこに写っていた{{target}}が気になり、あなたからフォローしたのが始まりだった。", choices: [
                { text: "👤 彼の最新の投稿に「いいね！」だけする", effects: { love: 5, style: -5, trust: 0 }, next: 1 },
                { text: "💬 勇気を出して「写真見ました！〇〇の友達ですか？」とDMを送る", effects: { love: 10, style: 15, trust: 5 }, next: 1 },
                { text: "⏳ 共通の友人に、彼のことをリサーチしてもらう", effects: { love: 0, style: -10, trust: -5 }, next: 1 }
            ]},
            { id: 1, act: "第一幕：出会い編 ☕️", text: "何回かメッセージをやり取りした後、二人で会うことに。カフェでの会話は弾んだが、彼は自分のことをあまり話さないタイプのようだ。", choices: [
                { text: "🎤 積極的に質問して、彼のことをもっと知ろうとする", effects: { love: 5, style: 15, trust: -5 }, next: 2 },
                { text: "🎬 自分の話や共通の趣味の話で、場を盛り上げる", effects: { love: 10, style: 10, trust: 5 }, next: 2 },
                { text: "😌 沈黙も楽しみつつ、彼が話し出すのを待つ", effects: { love: 5, style: -15, trust: 10 }, next: 2 }
            ]},
            { id: 2, act: "第一幕：出会い編 🌃", text: "カフェからの帰り道。彼が「…ごめん、俺あんまり話すの上手くなくて」と少し申し訳なさそうに言った。", choices: [
                { text: "😂「全然！私もだよ！」と笑って、気にしていないと伝える", effects: { love: 10, style: -5, trust: 15 }, next: 3 },
                { text: "😊「ううん、一緒にいるだけで楽しいよ」と優しく伝える", effects: { love: 15, style: -10, trust: 20 }, next: 3 },
                { text: "🤔「じゃあ次はもっと話しやすい場所に行こうか！」と提案する", effects: { love: 5, style: 10, trust: 5 }, next: 3 }
            ]},
            // 第二幕：深化編
            { id: 3, act: "第二幕：深化編 💤", text: "順調に連絡を取り合っていたが、急に彼からの返信が遅くなった。インスタを見ると、仕事が忙しそうな投稿が。", choices: [
                { text: "🤔「忙しい？」と心配のDMを送る", effects: { love: 5, style: 5, trust: -5 }, next: 4 },
                { text: "🎁「お疲れ様！」と、労いのメッセージと可愛いスタンプを送る", effects: { love: 10, style: 0, trust: 10 }, next: 4 },
                { text: "⏳ 何も送らず、彼から連絡が来るのを待つ", effects: { love: 0, style: -15, trust: 5 }, next: 4 }
            ]},
            { id: 4, act: "第二幕：深化編 🎧", text: "数日後、彼から「落ち着いた、ごめん」と連絡が来た。彼は趣味である音楽の話を始めたが、あなたはそのジャンルに詳しくない。", choices: [
                { text: "👍「詳しくないけど、素敵だね！」と肯定的に相槌を打つ", effects: { love: 5, style: -5, trust: 5 }, next: 5 },
                { text: "🎶「おすすめの曲、教えてほしいな」と興味を示す", effects: { love: 15, style: 5, trust: 15 }, next: 5 },
                { text: "💬 正直に「よく分からないな」と言って、話題を変える", effects: { love: -10, style: 10, trust: -5 }, next: 5 }
            ]},
            { id: 5, act: "第二幕：深化編 🤒", text: "彼が体調を崩したとストーリーに投稿した。心配になったあなたはどうする？", choices: [
                { text: "LINEで「大丈夫？何か買って行こうか？」と具体的に申し出る", effects: { love: 15, style: 10, trust: 10 }, next: 6 },
                { text: "「お大事にね」とシンプルなメッセージだけ送る", effects: { love: 5, style: -10, trust: 5 }, next: 6 },
                { text: "ストーリーに「お大事に😢」と返信する", effects: { love: 10, style: 0, trust: 0 }, next: 6 }
            ]},
            // 第三幕：クライマックス編
            { id: 6, act: "第三幕：クライマックス編 🌊", text: "元気になった彼から、お礼も兼ねて景色のいい海辺の公園に誘われた。夕暮れ時、二人の間に心地よい沈黙が流れる。", choices: [
                { text: "💖「…〇〇くんと一緒にいると、落ち着くな」と、今の気持ちを伝える", effects: { love: 20, style: 5, trust: 15 }, next: 7 },
                { text: "✨「夕日、綺麗だね」と、雰囲気を楽しむ", effects: { love: 10, style: -5, trust: 5 }, next: 7 },
                { text: "🥶「少し、肌寒いね」と、彼に寄り添う", effects: { love: 15, style: 15, trust: 5 }, next: 7 }
            ]},
            { id: 7, act: "第三幕：クライマックス編 💖", text: "あなたの言葉を聞いて、彼が少し照れたように笑った。そして、ゆっくりと口を開く。「あのさ、俺…」", choices: [
                { text: "🤝 彼の手をそっと握り、言葉の続きを待つ", effects: { love: 20, style: 10, trust: 20 }, next: 'end' },
                { text: "😊 静かに彼の目を見つめ、頷く", effects: { love: 15, style: -10, trust: 15 }, next: 'end' }
            ]}
        ],
        femaleTargetStory: [
            // --- 女性ターゲット編：彼女の信頼を勝ち取る物語 ---
            // 第一幕：出会い編
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
            // 第二幕：深化編
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
            // 第三幕：クライマックス編
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
    const endings = {
        trueLove: { emoji: '🎉', title: "True Love Ending", description: "静寂の中、{{target}}が口にしたのは、あなたへの素直な気持ちだった。二人の物語は、最高の形でここから始まる。" },
        goodFriends: { emoji: '😊', title: "Good Friends Ending", description: "楽しい時間を過ごした二人。恋人にはなれないかもしれない。でも、最高の友人として、これからも{{target}}の隣にいられそうだ。" },
        justAcquaintances: { emoji: '🤷', title: "Just Acquaintances Ending", description: "あと一歩が踏み出せず、{{target}}との距離は縮まらないまま…。この関係が進むには、もう少し時間が必要なのかもしれない。" }
    };

    // DOM要素や他の関数は変更なしのため省略
    const screens = { start: document.getElementById('start-screen'), game: document.getElementById('game-screen'), result: document.getElementById('result-screen') };
    const playerNameInput = document.getElementById('player-name');
    const targetNameInput = document.getElementById('target-name');
    const genderOptions = document.querySelectorAll('.gender-option');
    const startGameBtn = document.getElementById('start-game-btn');
    const errorMessageEl = document.getElementById('error-message');
    const characterNameEl = document.getElementById('character-name');
    const loveMeterValueEl = document.getElementById('love-meter-value');
    const styleMeterValueEl = document.getElementById('style-meter-value');
    const trustMeterValueEl = document.getElementById('trust-meter-value');
    const scenarioActEl = document.getElementById('scenario-act');
    const scenarioTextEl = document.getElementById('scenario-text');
    const choicesContainer = document.getElementById('choices-container');
    const endingEmojiEl = document.getElementById('ending-emoji');
    const endingTitleEl = document.getElementById('ending-title');
    const endingDescriptionEl = document.getElementById('ending-description');
    const analysisTypeEl = document.getElementById('analysis-type');
    const adviceTextEl = document.getElementById('advice-text');
    const retryBtn = document.getElementById('retry-btn');
    
    let player = { name: '' };
    let target = { name: '', gender: '' };
    let currentStory = [];
    let loveMeter = 50, styleMeter = 0, trustMeter = 0;

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
            errorMessageEl.textContent = 'すべての項目を入力してください。'; return;
        }
        errorMessageEl.textContent = '';
        startGame();
    });
    retryBtn.addEventListener('click', () => {
        playerNameInput.value = ''; targetNameInput.value = '';
        genderOptions.forEach(o => o.classList.remove('selected'));
        showScreen('start');
    });

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
        if (currentStory[0].act === "準備中") {
            errorMessageEl.textContent = 'このストーリーは現在準備中です。'; return;
        }
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
            button.onclick = () => selectChoice(choice);
            choicesContainer.appendChild(button);
        });
    }

    function selectChoice(choice) {
        loveMeter = Math.max(0, Math.min(100, loveMeter + (choice.effects.love || 0)));
        styleMeter += choice.effects.style || 0;
        trustMeter = Math.max(0, Math.min(100, trustMeter + (choice.effects.trust || 0)));
        updateMeters();
        if (choice.next === 'end') showResult();
        else loadScenario(choice.next);
    }

    function updateMeters() {
        loveMeterValueEl.textContent = loveMeter;
        styleMeterValueEl.textContent = styleMeter;
        trustMeterValueEl.textContent = trustMeter;
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
