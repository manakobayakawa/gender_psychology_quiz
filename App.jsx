import React, { useState } from 'react';
import { Heart, User, Target, Award, CheckCircle, XCircle, Sparkles, TrendingUp } from 'lucide-react';

const LovePsychologyQuiz = () => {
  const [gameState, setGameState] = useState('setup');
  const [playerGender, setPlayerGender] = useState('');
  const [targetGender, setTargetGender] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const quizzes = {
    'male-female': [
      {
        question: '女性がLINEの返信を遅らせるとき、最も多い理由は？',
        options: ['A. 忙しいから', 'B. 駆け引き', 'C. 返信内容を考えている', 'D. 忘れていた'],
        correct: 'C',
        explanation: '多くの場合は「内容を考えている」です。女性は相手にどう思われるか気にして、言葉を選んでいることが多いんです💭'
      },
      {
        question: 'デート中、女性が「どこでもいいよ」と言う本当の意味は？',
        options: ['A. 本当にどこでもいい', 'B. あなたに決めてほしい', 'C. 行きたい場所がある', 'D. デートに興味がない'],
        correct: 'B',
        explanation: '正解は「あなたに決めてほしい」！リードしてほしいという期待の表れです。でも、いくつか選択肢を提示してあげると喜ばれますよ✨'
      },
      {
        question: '女性が髪型を変えたとき、気づいてほしい理由は？',
        options: ['A. 褒められたい', 'B. 自分を見ていてほしい', 'C. 変化を共有したい', 'D. 全部'],
        correct: 'D',
        explanation: '正解は「全部」！女性にとって髪型の変化は大きなイベント。気づいて褒めてあげることで「ちゃんと見てくれてる」と安心します💕'
      },
      {
        question: '「今日疲れた〜」というLINEに対する最適な返信は？',
        options: ['A. 俺も疲れた', 'B. 大丈夫？無理しないでね', 'C. 早く寝なよ', 'D. 何があったの？'],
        correct: 'B',
        explanation: '「大丈夫？無理しないでね」が正解！共感と気遣いを示すのがポイント。解決策より寄り添う姿勢が大切です🤗'
      },
      {
        question: '女性が「別に怒ってないよ」と言うとき、実際は？',
        options: ['A. 本当に怒ってない', 'B. かなり怒っている', 'C. 話したくない', 'D. 様子を見ている'],
        correct: 'B',
        explanation: '残念ながら「かなり怒っている」が正解😅「別に」は危険信号！ちゃんと向き合って話を聞く姿勢を見せましょう。'
      },
      {
        question: 'デート後「楽しかった！」と言われたら、本音は？',
        options: ['A. 社交辞令', 'B. 本当に楽しかった', 'C. 次も会いたい', 'D. 状況による'],
        correct: 'D',
        explanation: '「状況による」が正解！トーンや表情、その後の連絡頻度で判断しましょう。「また行こうね」など具体的な言葉があれば脈ありです💓'
      },
      {
        question: '女性が相談を持ちかける本当の理由は？',
        options: ['A. アドバイスがほしい', 'B. 話を聞いてほしい', 'C. 共感してほしい', 'D. B と C'],
        correct: 'D',
        explanation: '正解は「話を聞いてほしい＆共感してほしい」！解決策より「大変だったね」「わかるよ」という共感が何より嬉しいんです🎧'
      },
      {
        question: '「前から気になってたんだ」と言われたとき、女性の心理は？',
        options: ['A. 本当にずっと気になっていた', 'B. 最近気になり始めた', 'C. 好意を伝えたい', 'D. A と C'],
        correct: 'D',
        explanation: '「本当にずっと気になっていた＆好意を伝えたい」が正解！勇気を出して伝えてくれているので、真摯に受け止めましょう💝'
      },
      {
        question: '女性が「〇〇くんって優しいよね」と言う意味は？',
        options: ['A. 褒めている', 'B. 友達としか見ていない', 'C. 好意がある', 'D. 文脈による'],
        correct: 'D',
        explanation: '「文脈による」が正解！言い方や状況で全然違います。「優しいよね（誰にでも）」なら友達止まり、特別な雰囲気なら脈ありかも✨'
      },
      {
        question: 'プレゼント選びで女性が最も嬉しいのは？',
        options: ['A. 高価なもの', 'B. 自分の好みを理解したもの', 'C. サプライズ', 'D. 実用的なもの'],
        correct: 'B',
        explanation: '「自分の好みを理解したもの」が正解！価格より「ちゃんと私のこと見てくれてる」と感じられるのが一番嬉しいんです🎁'
      }
    ],
    'female-male': [
      {
        question: '男性が仕事で疲れているとき、最も嬉しい言葉は？',
        options: ['A. 大丈夫？話聞くよ', 'B. 頑張ってるね', 'C. 何も言わずそばにいる', 'D. アドバイスする'],
        correct: 'B',
        explanation: '「頑張ってるね」が正解！男性は認められたい生き物。頑張りを認める言葉が一番の励みになります💪'
      },
      {
        question: '男性が「別に何でもいい」と言うとき、本音は？',
        options: ['A. 本当に何でもいい', 'B. 考えるのが面倒', 'C. あなたに合わせたい', 'D. A と C'],
        correct: 'D',
        explanation: '「本当に何でもいい＆あなたに合わせたい」が正解！女性と違い、男性の「何でもいい」は本音のことが多いです😊'
      },
      {
        question: 'デート中、男性が黙り込むのは？',
        options: ['A. つまらない', 'B. 考え事をしている', 'C. 疲れている', 'D. 居心地がいい'],
        correct: 'D',
        explanation: '実は「居心地がいい」が正解！男性は安心すると無言でも平気に。沈黙を埋めようとしなくても大丈夫です🌟'
      },
      {
        question: '男性に相談するとき、最も効果的なのは？',
        options: ['A. 結論から話す', 'B. 経緯を詳しく話す', 'C. 感情を伝える', 'D. 何を求めているか明確にする'],
        correct: 'D',
        explanation: '「何を求めているか明確にする」が正解！「話を聞いてほしいだけ」か「解決策がほしい」か最初に伝えるとスムーズです👌'
      },
      {
        question: '男性が趣味の話を熱く語るとき、してほしいことは？',
        options: ['A. 一緒に趣味を楽しむ', 'B. 興味を持って聞く', 'C. 褒める', 'D. B と C'],
        correct: 'D',
        explanation: '「興味を持って聞く＆褒める」が正解！必ずしも一緒にやる必要はないけど、認めて褒めてもらえると嬉しいんです🎮'
      },
      {
        question: '男性が「一人の時間がほしい」と言う理由は？',
        options: ['A. 別れたい', 'B. リフレッシュしたい', 'C. 冷静に考えたい', 'D. B と C'],
        correct: 'D',
        explanation: '「リフレッシュしたい＆冷静に考えたい」が正解！男性は一人の時間で充電します。尊重してあげると逆に絆が深まりますよ⚡'
      },
      {
        question: 'LINE の返信が遅い男性、その理由は？',
        options: ['A. 興味がない', 'B. 本当に忙しい', 'C. LINEが苦手', 'D. B と C'],
        correct: 'D',
        explanation: '「本当に忙しい＆LINEが苦手」が正解！男性は基本的にLINEを連絡ツールとしか思ってないことも。会ったときの態度で判断しましょう📱'
      },
      {
        question: '男性を励ますとき、最も効果的なのは？',
        options: ['A. 優しく慰める', 'B. 能力を信じていると伝える', 'C. 気分転換を提案', 'D. そっとしておく'],
        correct: 'B',
        explanation: '「能力を信じていると伝える」が正解！男性は自信を失ったとき、信頼されている実感が一番の力になります💪✨'
      },
      {
        question: '男性が「結婚」を意識するきっかけは？',
        options: ['A. 年齢的なタイミング', 'B. この人と一緒にいたい', 'C. 経済的な安定', 'D. 全部'],
        correct: 'D',
        explanation: '実は「全部」が正解！男性は現実的に物事を考えがち。でも最終的には「この人となら」という気持ちが決め手です💑'
      },
      {
        question: '男性が本気で好きな人にする行動は？',
        options: ['A. 頻繁に連絡する', 'B. 将来の話をする', 'C. 友人に紹介する', 'D. 全部'],
        correct: 'D',
        explanation: '「全部」が正解！本気の男性は言葉より行動で示します。特に「友人や家族に紹介する」は本命のサインです💕'
      }
    ],
    'male-male': [
      {
        question: '男友達が悩みを打ち明けてきたとき、求めているのは？',
        options: ['A. 解決策', 'B. 共感', 'C. 黙って聞く', 'D. A と C'],
        correct: 'D',
        explanation: '「解決策＆黙って聞く」が正解！男性同士は長々と感情を語り合わず、実用的なアドバイスか静かな理解を求めます🤝'
      },
      {
        question: '男性が「飲みに行こう」と誘うとき、本音は？',
        options: ['A. 本当に飲みたい', 'B. 話したいことがある', 'C. ストレス発散', 'D. 全部あり得る'],
        correct: 'D',
        explanation: '「全部あり得る」が正解！男性の誘いはシンプル。深読みせず、気軽に応じるのが男友達の付き合い方です🍺'
      },
      {
        question: '男性同士で沈黙が続くのは？',
        options: ['A. 気まずい', 'B. 問題ない', 'C. 話題がない', 'D. 関係が終わり'],
        correct: 'B',
        explanation: '「問題ない」が正解！男性同士は無言でも居心地がいいもの。沈黙を無理に埋める必要はありません😌'
      },
      {
        question: '男性が競争心を見せるのは？',
        options: ['A. 嫉妬している', 'B. 認められたい', 'C. 仲間意識', 'D. B と C'],
        correct: 'D',
        explanation: '「認められたい＆仲間意識」が正解！男性の競争は敵対ではなく、お互いを高め合う手段です。健全なライバル関係ですね🔥'
      },
      {
        question: '男性が趣味を共有したがる理由は？',
        options: ['A. 布教したい', 'B. 一緒に楽しみたい', 'C. 絆を深めたい', 'D. 全部'],
        correct: 'D',
        explanation: '「全部」が正解！男性は共通の趣味を通じて関係を深めます。興味を持ってくれると嬉しいものです🎮'
      },
      {
        question: '男性が弱音を吐くとき、してほしいのは？',
        options: ['A. 励ます', 'B. 何も言わず聞く', 'C. 一緒に解決策を考える', 'D. B と C'],
        correct: 'D',
        explanation: '「何も言わず聞く＆一緒に解決策を考える」が正解！過度な慰めより、実践的なサポートを好みます💪'
      },
      {
        question: '男性が連絡を取らなくなる理由は？',
        options: ['A. 忙しい', 'B. 距離を置きたい', 'C. 特に理由はない', 'D. A と C'],
        correct: 'D',
        explanation: '「忙しい＆特に理由はない」が正解！男性は連絡頻度＝友情の深さではないと考えがち。久しぶりでも気にしません📱'
      },
      {
        question: '男性同士の喧嘩、仲直りのきっかけは？',
        options: ['A. 謝罪', 'B. 時間が解決', 'C. 共通の活動', 'D. B と C'],
        correct: 'D',
        explanation: '「時間が解決＆共通の活動」が正解！男性は言葉で和解するより、一緒に何かすることで自然と仲直りします🤝'
      },
      {
        question: '男性が「助けて」と言う心理は？',
        options: ['A. 本当に困っている', 'B. 信頼している', 'C. 弱さを見せられる', 'D. 全部'],
        correct: 'D',
        explanation: '「全部」が正解！男性が助けを求めるのはかなりのこと。信頼の証なので、真摯に対応しましょう🆘'
      },
      {
        question: '男友達への最高の褒め言葉は？',
        options: ['A. 頼りになる', 'B. 尊敬する', 'C. お前がいてよかった', 'D. 全部嬉しい'],
        correct: 'D',
        explanation: '「全部嬉しい」が正解！男性は認められること、必要とされることに喜びを感じます。素直に伝えましょう👍'
      }
    ],
    'female-female': [
      {
        question: '女友達が「太っちゃった」と言うとき、最適な返答は？',
        options: ['A. 全然太ってないよ！', 'B. ダイエット頑張ろう', 'C. どこが？全然わからない', 'D. A と C'],
        correct: 'D',
        explanation: '「全然太ってないよ＆どこが？全然わからない」が正解！否定＋具体的に見えないと伝えることで安心させられます💕'
      },
      {
        question: '女性が相談を持ちかけるとき、本当に求めているのは？',
        options: ['A. 解決策', 'B. 共感', 'C. 背中を押してほしい', 'D. B と C'],
        correct: 'D',
        explanation: '「共感＆背中を押してほしい」が正解！女性同士の相談は答えが決まっていることも。寄り添って応援するのがベストです🤗'
      },
      {
        question: '女友達の新しい髪型、どう反応する？',
        options: ['A. 似合う！可愛い！', 'B. いいね！どこで切ったの？', 'C. 前のほうが好きだった', 'D. A と B'],
        correct: 'D',
        explanation: '「似合う！可愛い！＆いいね！どこで切ったの？」が正解！まず褒めて、興味を示すのが女子力です✨ネガティブな感想はNG！'
      },
      {
        question: '女性グループでLINEの返信が遅いと？',
        options: ['A. 怒られる', 'B. 心配される', 'C. 気にされない', 'D. 状況による'],
        correct: 'D',
        explanation: '「状況による」が正解！重要な話なら早めの返信を、雑談なら適度でOK。空気を読むことが大切です📱'
      },
      {
        question: '女友達が恋愛相談してきたとき、してはいけないことは？',
        options: ['A. 彼氏の悪口を言う', 'B. 別れたら？と言う', 'C. 理詰めで説得', 'D. 全部NG'],
        correct: 'D',
        explanation: '「全部NG」が正解！女性は話を聞いてもらいたいだけのことも。決めつけず、寄り添う姿勢が大切です💭'
      },
      {
        question: '女性同士の「今度ご飯行こう」の本気度は？',
        options: ['A. 社交辞令', 'B. 本気で行きたい', 'C. その場の雰囲気', 'D. 言った人による'],
        correct: 'D',
        explanation: '「言った人による」が正解！具体的な日程を提案してくる人は本気、曖昧なら社交辞令の可能性も🍽️'
      },
      {
        question: '女友達が褒めてほしいサインを出しているとき、どうする？',
        options: ['A. 気づかないふり', 'B. すぐに褒める', 'C. 質問して引き出す', 'D. B と C'],
        correct: 'D',
        explanation: '「すぐに褒める＆質問して引き出す」が正解！女性は承認欲求が強め。気づいて褒めてあげると喜ばれます👗✨'
      },
      {
        question: '女性グループで一人が抜けたとき、正しい対応は？',
        options: ['A. その人の話をする', 'B. その人の話は避ける', 'C. 普段通り', 'D. 状況による'],
        correct: 'B',
        explanation: '「その人の話は避ける」が正解！陰口と思われる可能性があるので、いない人の話は基本的にしないのがマナーです🤐'
      },
      {
        question: '女友達への最高のプレゼントは？',
        options: ['A. 高価なもの', 'B. 相手の好みを理解したもの', 'C. お揃いのもの', 'D. B と C'],
        correct: 'D',
        explanation: '「相手の好みを理解したもの＆お揃いのもの」が正解！「わかってくれてる」感と「特別な関係」を示せるのが嬉しいんです🎁'
      },
      {
        question: '女性同士の友情で最も大切なのは？',
        options: ['A. 共感力', 'B. 秘密を守る', 'C. 対等な関係', 'D. 全部'],
        correct: 'D',
        explanation: '「全部」が正解！女性の友情は信頼、共感、尊重のバランスで成り立ちます。どれが欠けても深い関係は築けません👭💕'
      }
    ]
  };

  const getQuizKey = () => {
    if (playerGender === 'male' && targetGender === 'female') return 'male-female';
    if (playerGender === 'female' && targetGender === 'male') return 'female-male';
    if (playerGender === 'male' && targetGender === 'male') return 'male-male';
    if (playerGender === 'female' && targetGender === 'female') return 'female-female';
    return 'male-female';
  };

  const currentQuiz = gameState === 'playing' ? quizzes[getQuizKey()][currentQuestion] : null;

  const startGame = () => {
    if (playerGender && targetGender) {
      setGameState('playing');
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    if (answer === currentQuiz.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    } else {
      setGameState('result');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayerGender('');
    setTargetGender('');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const getResultMessage = () => {
    const percentage = (score / 10) * 100;
    const genderText = targetGender === 'female' ? '女心' : '男心';
    
    if (percentage >= 90) return `完璧！あなたは${genderText}のエキスパートです！🏆✨`;
    if (percentage >= 70) return `素晴らしい！あなたは${genderText}を${percentage}%理解しています！💕`;
    if (percentage >= 50) return `まずまず！${genderText}の理解度は${percentage}%です。もう少し頑張りましょう！📚`;
    return `${genderText}はまだまだ謎が多いようです...でも大丈夫、これから学んでいきましょう！💪`;
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 p-4 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <Heart className="w-20 h-20 mx-auto text-pink-500 drop-shadow-lg" />
                <Sparkles className="w-8 h-8 absolute -top-2 -right-2 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
                女心・男心クイズ
              </h1>
              <p className="text-gray-600 text-lg font-medium">相手の心理を10問のクイズで理解度チェック！</p>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                <div className="flex items-center mb-5">
                  <div className="bg-purple-500 p-2 rounded-lg mr-3">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">あなたの性別は？</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPlayerGender('male')}
                    className={`group relative py-6 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                      playerGender === 'male'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-700 hover:shadow-lg hover:scale-102 border-2 border-gray-200'
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="text-3xl mr-2">👨</span>
                      <span>男性</span>
                    </div>
                    {playerGender === 'male' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent animate-pulse"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setPlayerGender('female')}
                    className={`group relative py-6 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                      playerGender === 'female'
                        ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-700 hover:shadow-lg hover:scale-102 border-2 border-gray-200'
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="text-3xl mr-2">👩</span>
                      <span>女性</span>
                    </div>
                    {playerGender === 'female' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-transparent animate-pulse"></div>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
                <div className="flex items-center mb-5">
                  <div className="bg-blue-500 p-2 rounded-lg mr-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">知りたい相手の性別は？</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTargetGender('male')}
                    className={`group relative py-6 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                      targetGender === 'male'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-700 hover:shadow-lg hover:scale-102 border-2 border-gray-200'
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="text-3xl mr-2">👨</span>
                      <span>男性</span>
                    </div>
                    {targetGender === 'male' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent animate-pulse"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setTargetGender('female')}
                    className={`group relative py-6 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                      targetGender === 'female'
                        ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-700 hover:shadow-lg hover:scale-102 border-2 border-gray-200'
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="text-3xl mr-2">👩</span>
                      <span>女性</span>
                    </div>
                    {targetGender === 'female' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-transparent animate-pulse"></div>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={!playerGender || !targetGender}
                className={`relative w-full py-6 rounded-2xl font-black text-xl transition-all duration-300 overflow-hidden ${
                  playerGender && targetGender
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:shadow-2xl hover:scale-105 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  <span>クイズスタート！</span>
                  <Sparkles className="w-6 h-6 ml-2" />
                </div>
                {playerGender && targetGender && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 p-4 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-bold text-lg shadow-lg">
                  問題 {currentQuestion + 1}/10
                </div>
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-pink-500" />
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full font-bold text-lg shadow-lg">
                  {score}/{currentQuestion + (showAnswer ? 1 : 0)}
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border-2 border-purple-100 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
                {currentQuiz.question}
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {currentQuiz.options.map((option, index) => {
                const letter = option.charAt(0);
                const isSelected = selectedAnswer === letter;
                const isCorrect = letter === currentQuiz.correct;
                
                let buttonClass = 'bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-800 border-2 border-gray-200 hover:border-purple-300';
                let iconElement = null;
                
                if (showAnswer) {
                  if (isCorrect) {
                    buttonClass = 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-900 shadow-lg';
                    iconElement = <CheckCircle className="w-7 h-7 text-green-600" />;
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-400 text-red-900 shadow-lg';
                    iconElement = <XCircle className="w-7 h-7 text-red-600" />;
                  } else {
                    buttonClass = 'bg-gray-50 text-gray-500 border-2 border-gray-200 opacity-50';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 text-purple-900 shadow-lg scale-102';
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && handleAnswer(letter)}
                    disabled={showAnswer}
                    className={`relative w-full p-5 rounded-xl font-bold text-left text-lg transition-all duration-300 ${buttonClass} ${
                      !showAnswer ? 'hover:scale-102 cursor-pointer hover:shadow-lg' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{option}</span>
                      {iconElement}
                    </div>
                    {!showAnswer && isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {showAnswer && (
              <div className="space-y-5 animate-fadeIn">
                <div className={`relative overflow-hidden p-8 rounded-2xl shadow-xl ${
                  selectedAnswer === currentQuiz.correct
                    ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300'
                    : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-2 border-red-300'
                }`}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      {selectedAnswer === currentQuiz.correct ? (
                        <>
                          <CheckCircle className="w-10 h-10 text-green-600 mr-3" />
                          <span className="text-3xl font-black text-green-800">正解！</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-10 h-10 text-red-600 mr-3" />
                          <span className="text-3xl font-black text-red-800">不正解...</span>
                        </>
                      )}
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl">
                      <p className="text-gray-800 text-lg leading-relaxed font-medium">{currentQuiz.explanation}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="relative w-full py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative z-10 flex items-center justify-center">
                    {currentQuestion < 9 ? (
                      <>
                        <span>次の問題へ</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">▶</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-6 h-6 mr-2" />
                        <span>結果を見る</span>
                        <Sparkles className="w-6 h-6 ml-2" />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const percentage = (score / 10) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 p-4 md:p-8 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 text-center">
            <div className="relative inline-block mb-8">
              <Award className="w-24 h-24 mx-auto text-yellow-500 drop-shadow-2xl" />
              <Sparkles className="w-10 h-10 absolute -top-3 -right-3 text-yellow-400 animate-bounce" />
              <Sparkles className="w-8 h-8 absolute -bottom-2 -left-2 text-pink-400 animate-bounce" style={{animationDelay: '0.5s'}} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              クイズ終了！
            </h1>
            
            <div className="my-10">
              <div className="relative inline-block mb-6">
                <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 drop-shadow-lg">
                  {score}/10
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-xl rounded-full"></div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-6 mb-6 border-2 border-purple-200 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  正答率: {percentage}%
                </div>
                <p className="text-xl text-gray-700 leading-relaxed font-medium px-4">
                  {getResultMessage()}
                </p>
              </div>
            </div>

            <div className="relative w-full bg-gray-200 rounded-full h-6 mb-10 overflow-hidden shadow-inner">
              <div
                className="h-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-2000 ease-out shadow-lg relative"
                style={{ width: `${percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 animate-pulse"></div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="relative w-full py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative z-10 flex items-center justify-center">
                <Heart className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                <span>もう一度挑戦する</span>
                <Sparkles className="w-6 h-6 ml-2 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default LovePsychologyQuiz;