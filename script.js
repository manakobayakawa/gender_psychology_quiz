document.addEventListener('DOMContentLoaded', () => {
    // クイズデータ
    const quizzes = {
        male: [
            { question: "デートの別れ際に彼が「じゃあ、また」とだけ言った。彼の本心は？", answers: ["今日のデートは微妙だった", "次の約束を急かしたくない", "特に深い意味はない"], correct: "特に深い意味はない", explanation: "男性の「またね」には深い意味がないことがほとんど。言葉通りに受け取るのが◎。考えすぎは禁物です。" },
            { question: "あなたが髪を切ったのに、彼は何も言ってこない。なぜ？", answers: ["似合ってないと思っている", "興味がない", "本当に気づいていない"], correct: "本当に気づいていない", explanation: "多くの男性は女性の細かい変化に気づきにくい傾向が。悪気はないので、自分から「髪切ったんだ！」と言ってみるのがおすすめです。" },
            { question: "彼が自分の趣味の話を延々と続けている。どう思ってる？", answers: ["退屈だと思われている", "自分のことをもっと知ってほしい", "あなたを試している"], correct: "自分のことをもっと知ってほしい", explanation: "男性は信頼している相手に自分の好きなことや得意なことを話したい生き物。あなたに心を開いている証拠です。" },
            { question: "彼からのLINEの返信が急に遅くなった。考えられる理由は？", answers: ["他に気になる人ができた", "仕事などが忙しくなった", "あなたへの気持ちが冷めた"], correct: "仕事などが忙しくなった", explanation: "男性の脳はシングルタスクと言われがち。仕事や趣味に集中すると、他のことがおろそかになることがあります。少し待ってみましょう。" },
            { question: "あなたが落ち込んでいる時、彼が具体的なアドバイスをしてくる。なぜ？", answers: ["共感能力が低い", "早く問題を解決してあげたい", "自分の知識を披露したい"], correct: "早く問題を解決してあげたい", explanation: "男性は共感よりも問題解決を優先する傾向があります。それは彼の優しさの表現。ただ話を聞いてほしい時は、先に伝えてみて。" },
            { question: "グループでいる時と二人きりの時で、彼の態度が違う。なぜ？", answers: ["二人きりの時の態度が本物", "八方美人なだけ", "あなたを騙している"], correct: "二人きりの時の態度が本物", explanation: "男性はプライドや見栄から、人前ではクールに振る舞うことがあります。二人きりの時の甘えた態度こそが、彼の本当の姿です。" },
            { question: "彼が「疲れた」と言う時、どうしてほしい？", answers: ["詳しい話を聞いてほしい", "具体的なアドバイスがほしい", "ただ黙って癒やしてほしい"], correct: "ただ黙って癒やしてほしい", explanation: "男性が「疲れた」と言う時は、解決策よりも安らぎを求めていることが多いです。「お疲れ様」と優しく声をかけるだけで十分です。" },
            { question: "喧嘩した時、彼が急に黙り込んでしまった。なぜ？", answers: ["言うべき言葉を探している", "反省していない", "もう話したくない"], correct: "言うべき言葉を探している", explanation: "感情的になると口を閉ざす男性は多いです。頭の中で冷静に考えを整理しようとしている時間なので、少し待ってあげるのが吉。" },
            { question: "彼が小さな成功を自慢げに話してくる。どう対応するのが正解？", answers: ["「すごいね！」と褒める", "もっと大きな目標を持つよう促す", "謙虚になるように言う"], correct: "「すごいね！」と褒める", explanation: "男性は好きな人に認められたい、尊敬されたいという気持ちが強いです。子供のように褒めてあげると、彼はとても喜びます。" },
            { question: "デート中、彼があまり話さない。どうして？", answers: ["退屈している", "あなたとの時間に満足している", "何か怒っている"], correct: "あなたとの時間に満足している", explanation: "男性はリラックスできる相手とは、無言の時間も心地よいと感じます。彼が穏やかな表情なら、安心してその時間を楽しんでください。" }
        ],
        female: [
            { question: "彼女が「なんでもない」と言っている。本当はどういう意味？", answers: ["本当に何でもない", "私の気持ちに気づいてほしい", "そっとしておいてほしい"], correct: "私の気持ちに気づいてほしい", explanation: "女性の「なんでもない」は「何かあるけど、あなたから優しく聞いてほしい」のサインであることが多いです。「どうしたの？」ともう一押しが大切です。" },
            { question: "デートプランを尋ねたら「なんでもいいよ」と返ってきた。本音は？", answers: ["本当に興味がない", "あなたのセンスを信頼している", "私の好きそうな所を提案してほしい"], correct: "私の好きそうな所を提案してほしい", explanation: "「あなたに決めてほしいけど、私の好みを理解した上で素敵な提案をしてほしい」という、少し高度な期待が込められています。" },
            { question: "彼女が急に無口になった。考えられる理由は？", answers: ["体調が悪い", "あなたの何気ない一言に傷ついた", "ただ疲れている"], correct: "あなたの何気ない一言に傷ついた", explanation: "女性は言葉の些細なニュアンスに敏感です。何か原因になるような発言がなかったか、そっと振り返ってみましょう。" },
            { question: "「私のこと、本当に好き？」と聞かれた時のベストな返答は？", answers: ["当たり前だよ", "好きだよ。〇〇なところとかね", "どうしてそんなこと聞くの？"], correct: "好きだよ。〇〇なところとかね", explanation: "ただ「好き」と返すだけでなく、具体的にどこが好きなのかを伝えることで、彼女は安心し、愛情を実感します。" },
            { question: "彼女が「あの子、可愛いよね」と言ってきた。どういう意図？", answers: ["純粋な感想", "あなたの反応を見ている", "友達になりたい"], correct: "あなたの反応を見ている", explanation: "あなたの好みを探ったり、嫉妬心からあなたの愛情を試している可能性があります。「君が一番可愛いよ」が模範解答です。" },
            { question: "彼女が「疲れた」と言う時、どうしてほしい？", answers: ["マッサージをしてあげる", "解決策を提案する", "「大変だったね」と共感する"], correct: "「大変だったね」と共感する", explanation: "女性が求めるのは、まず共感です。具体的な解決策よりも先に、彼女の気持ちに寄り添う言葉をかけてあげましょう。" },
            { question: "プレゼントに何が欲しいか聞いたら「気持ちだけで嬉しいよ」と言われた。信じていい？", answers: ["本当に何もいらない", "信じてはいけない", "サプライズを期待している"], correct: "サプライズを期待している", explanation: "本音ではプレゼントを期待していることが多いです。彼女の普段の言動や好みをリサーチして、素敵なサプライズを用意しましょう。" },
            { question: "デート中、彼女が頻繁にスマホを触っている。なぜ？", answers: ["デートがつまらない", "あなたとの写真を撮りたい・見返したい", "緊急の連絡がきている"], correct: "あなたとの写真を撮りたい・見返したい", explanation: "一見ネガティブに見えますが、楽しさのあまりSNSに投稿したり、今日の思い出を記録しているポジティブな理由の場合も多いです。" },
            { question: "彼女が昔の恋愛話を始めた。どういう心理？", answers: ["元カレが忘れられない", "あなたの過去の恋愛も知りたい", "もっと自分を理解してほしい"], correct: "もっと自分を理解してほしい", explanation: "過去の経験を話すことで、自分の恋愛観や価値観をあなたに伝え、より深い関係を築きたいと思っています。" },
            { question: "「痩せたいなー」と彼女が言っている。どう返すべき？", answers: ["「今のままで十分可愛いよ」", "「一緒に運動する？」", "「確かに少し太ったかもね」"], correct: "「今のままで十分可愛いよ」", explanation: "彼女が求めているのは、痩せる方法ではなく「今のあなたを肯定してほしい」という承認欲求です。まずは全肯定してあげましょう。" }
        ]
    };

    // DOM要素
    const screens = {
        start: document.getElementById('start-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen')
    };

    const startButtons = document.querySelectorAll('.start-btn');
    const quizTitleEl = document.getElementById('quiz-title');
    const progressEl = document.getElementById('progress');
    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const explanationContainer = document.getElementById('explanation-container');
    const explanationResultEl = document.getElementById('explanation-result');
    const explanationTextEl = document.getElementById('explanation-text');
    const scoreEl = document.getElementById('score');
    const resultRankEl = document.getElementById('result-rank');
    const resultAdviceEl = document.getElementById('result-advice');
    const retryBtn = document.getElementById('retry-btn');

    // クイズの状態
    let currentQuizType = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let currentQuestions = [];

    // イベントリスナー
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentQuizType = button.dataset.quiz;
            if(currentQuizType){
                startQuiz();
            }
        });
    });

    retryBtn.addEventListener('click', () => {
        showScreen('start');
    });

    function showScreen(screenName) {
        for (const key in screens) {
            screens[key].classList.remove('active');
        }
        screens[screenName].classList.add('active');
    }

    function startQuiz() {
        currentQuestions = quizzes[currentQuizType];
        currentQuestionIndex = 0;
        score = 0;
        quizTitleEl.textContent = currentQuizType === 'male' ? '男心クイズ' : '女心クイズ';
        quizTitleEl.style.color = currentQuizType === 'male' ? 'var(--accent-color-male)' : 'var(--accent-color-female)';
        showScreen('quiz');
        loadQuestion();
    }

    function loadQuestion() {
        explanationContainer.classList.add('hidden');
        answersContainer.innerHTML = '';
        
        if (currentQuestionIndex < currentQuestions.length) {
            const question = currentQuestions[currentQuestionIndex];
            progressEl.textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
            questionNumberEl.textContent = `Q${currentQuestionIndex + 1}`;
            questionTextEl.textContent = question.question;

            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.classList.add('answer-btn');
                button.addEventListener('click', () => selectAnswer(button, question));
                answersContainer.appendChild(button);
            });
        } else {
            showResult();
        }
    }

    function selectAnswer(selectedButton, question) {
        const isCorrect = selectedButton.textContent === question.correct;

        if (isCorrect) {
            score += 10;
            selectedButton.classList.add('correct');
            explanationResultEl.textContent = '正解！';
            explanationResultEl.className = 'correct';
        } else {
            selectedButton.classList.add('incorrect');
            explanationResultEl.textContent = '不正解...';
            explanationResultEl.className = 'incorrect';
        }
        
        explanationTextEl.textContent = question.explanation;
        explanationContainer.classList.remove('hidden');

        // 他のボタンを無効化
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === question.correct) {
                if (!isCorrect) btn.classList.add('correct');
            }
        });

        currentQuestionIndex++;
        setTimeout(loadQuestion, 3000); // 3秒後に次の問題へ
    }

    function showResult() {
        showScreen('result');
        scoreEl.textContent = score;

        if(currentQuizType === 'male') scoreEl.style.color = 'var(--accent-color-male)';
        else scoreEl.style.color = 'var(--accent-color-female)';


        let rank, advice;
        if (score >= 80) {
            rank = "心のエキスパート";
            advice = "素晴らしい！あなたは相手の心を的確に理解していますね。その深い洞察力で、これからも素敵な関係を築いていけるはずです。";
        } else if (score >= 50) {
            rank = "グッドコミュニケーター";
            advice = "なかなかの理解度！基本的なことは分かっていますが、時々すれ違うことも。相手の言葉の裏にある「本当の気持ち」を想像すると、もっと仲が深まりますよ。";
        } else {
            rank = "のびしろたっぷり";
            advice = "ちょっぴりすれ違いがあるかも？でも大丈夫、誰にでも間違いはあります。このクイズをきっかけに、相手の気持ちを優しく想像することから始めてみましょう！";
        }
        resultRankEl.textContent = rank;
        resultAdviceEl.textContent = advice;
    }
});
