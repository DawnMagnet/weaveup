import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "WeaveUp - Weaving Draft Tool",
      toHome: "To Home",
      explain: {
        open: "Show Instructions",
        close: "Hide Instructions",
        content: {
          init: {
            term: "Initialization",
            desc: "Set the number of shafts, treadles, and chart dimensions, then click Initialize"
          },
          toChart: {
            term: "Creating Weaving Draft",
            desc1: "Click on threading and treadling squares to mark them",
            desc2: "Set up the tie-up pattern",
            desc3: "Click 'Generate Draft' to create the weaving pattern",
            desc4: "Use color picker to add colors and click 'Color Chart'"
          },
          fromChart: {
            term: "From Weaving Draft",
            desc1: "Click on the weaving draft squares to mark the pattern",
            desc2: "Select 'From Draft' mode",
            desc3: "Click 'Generate Threading & Treadling'",
            desc4: "The system will generate the threading and treadling automatically"
          }
        }
      },
      setting: {
        treadle: "Treadles:",
        shaft: "Shafts:",
        tieUp: {
          name: "Tie-up Position:",
          location: {
            rightUp: "Right-Up",
            rightDown: "Right-Down",
            leftUp: "Left-Up",
            leftDown: "Left-Down"
          }
        },
        chart: {
          width: "Chart Width:",
          height: "Chart Height:"
        },
        button: {
          init: "Initialize",
          chart: {
            drowdown: "Generate Draft",
            color: "Color Chart",
            threadAndTreadle: "Generate Threading & Treadling"
          },
          export: "Export JSON",
          import: "Import JSON"
        },
        toOrFrom: {
          to: "To Draft",
          from: "From Draft"
        },
        upOrDown: {
          name: "Thread Action:",
          select: {
            up: "Up",
            down: "Down"
          }
        },
        color: "Color:"
      },
      content: {
        warpColor: "Warp Color",
        weftColor: "Weft Color"
      },
      error: {
        notDraw: {
          thread: "Please set up threading first",
          treadle: "Please set up treadling first",
          drawdown: "Please draw the weaving draft first"
        },
        notEnough: {
          thread: "Not enough shafts for this pattern",
          tieUp: "Tie-up pattern is incomplete"
        },
        notSupport: "Complex tie-up patterns are not supported in this mode"
      },
      home: "Home"
    }
  },
  zh: {
    translation: {
      title: "WeaveUp - 织物组织图工具",
      toHome: "返回主页",
      explain: {
        open: "显示说明",
        close: "隐藏说明",
        content: {
          init: {
            term: "初始化",
            desc: "设置综框数、踏板数和图表尺寸，然后点击初始化"
          },
          toChart: {
            term: "创建织物组织图",
            desc1: "点击穿综和踏板方格进行标记",
            desc2: "设置综框与踏板的连接模式",
            desc3: "点击'生成组织图'创建织物图案",
            desc4: "使用颜色选择器添加颜色并点击'彩色图表'"
          },
          fromChart: {
            term: "从织物组织图反推",
            desc1: "点击织物组织图方格标记图案",
            desc2: "选择'从组织图'模式",
            desc3: "点击'生成穿综和踏板'",
            desc4: "系统将自动生成穿综和踏板图案"
          }
        }
      },
      setting: {
        treadle: "踏板数:",
        shaft: "综框数:",
        tieUp: {
          name: "连接图位置:",
          location: {
            rightUp: "右上",
            rightDown: "右下",
            leftUp: "左上",
            leftDown: "左下"
          }
        },
        chart: {
          width: "图表宽度:",
          height: "图表高度:"
        },
        button: {
          init: "初始化",
          chart: {
            drowdown: "生成组织图",
            color: "彩色图表",
            threadAndTreadle: "生成穿综和踏板"
          },
          export: "导出JSON",
          import: "导入JSON"
        },
        toOrFrom: {
          to: "生成组织图",
          from: "从组织图反推"
        },
        upOrDown: {
          name: "线程动作:",
          select: {
            up: "上升",
            down: "下降"
          }
        },
        color: "颜色:"
      },
      content: {
        warpColor: "经线颜色",
        weftColor: "纬线颜色"
      },
      error: {
        notDraw: {
          thread: "请先设置穿综",
          treadle: "请先设置踏板",
          drawdown: "请先绘制织物组织图"
        },
        notEnough: {
          thread: "综框数不足以表示此图案",
          tieUp: "连接图案不完整"
        },
        notSupport: "此模式不支持复杂连接图案"
      },
      home: "主页"
    }
  },
  ja: {
    translation: {
      title: "WeaveUp - 織物組織図ツール",
      toHome: "ホームへ",
      explain: {
        open: "説明を表示",
        close: "説明を非表示",
        content: {
          init: {
            term: "初期化",
            desc: "シャフト、テトル、チャートのサイズを設定し、初期化をクリックします"
          },
          toChart: {
            term: "織りパターンの作成",
            desc1: "スレッドとテッドルのマスをクリックしてマークします",
            desc2: "タイアップパターンを設定します",
            desc3: "'ドラフトを生成'をクリックして織りパターンを作成します",
            desc4: "カラーピッカーを使用して色を追加し、'カラーチャート'をクリックします"
          },
          fromChart: {
            term: "織りドラフトから",
            desc1: "織りドラフトのマスをクリックしてパターンをマークします",
            desc2: "'ドラフトから'モードを選択します",
            desc3: "'スレッドとテッドルを生成'をクリックします",
            desc4: "システムが自動的にスレッドとテッドルを生成します"
          }
        }
      },
      setting: {
        treadle: "テトル:",
        shaft: "シャフト:",
        tieUp: {
          name: "タイアップ位置:",
          location: {
            rightUp: "右上",
            rightDown: "右下",
            leftUp: "左上",
            leftDown: "左下"
          }
        },
        chart: {
          width: "チャートの幅:",
          height: "チャートの高さ:"
        },
        button: {
          init: "初期化",
          chart: {
            drowdown: "ドラフトを生成",
            color: "カラーチャート",
            threadAndTreadle: "スレッドとテッドルを生成"
          },
          export: "JSONをエクスポート",
          import: "JSONをインポート"
        },
        toOrFrom: {
          to: "ドラフトへ",
          from: "ドラフトから"
        },
        upOrDown: {
          name: "スレッドアクション:",
          select: {
            up: "上",
            down: "下"
          }
        },
        color: "色:"
      },
      content: {
        warpColor: "経糸の色",
        weftColor: "緯糸の色"
      },
      error: {
        notDraw: {
          thread: "先にスレッドを設定してください",
          treadle: "先にテッドルを設定してください",
          drawdown: "先に織りドラフトを描いてください"
        },
        notEnough: {
          thread: "このパターンにはシャフトが足りません",
          tieUp: "タイアップパターンが不完全です"
        },
        notSupport: "このモードでは複雑なタイアップパターンはサポートされていません"
      },
      home: "ホーム"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      // Add your Spanish translations here
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
