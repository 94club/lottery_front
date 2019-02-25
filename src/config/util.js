const staffArr = [
  {
    username: 'faker',
    lang: 'en',
    avatar: '/public/img/avatar.jpg',
    role: 0,
    hadPrize: false,
    hadFashionComment: false,
    id: 1
  }
]
const langCn = {
  1: '进入抽奖',
  2: '节目表演',
  3: '登录',
  4: '返回',
  5: '您的名称:',
  6: '请输入您的用户名',
  7: '注意: 请填写邀请函上的名称',
  8: '进入主界面',
  9: '请输入用户名',
  10: '登入受限，请寻找alistar求助',
  11: '语言选择有误',
  12: '奖项列表',
  13: '距离晚会开始还有',
  14: '个人详情',
  15: '开奖结果',
  16: '查看奖品与规则',
  17: '参与人信息',
  18: '节目表演',
  19: '退出登录',
  20: '配置奖项',
  21: '奖项名称',
  22: '奖项数量',
  23: '添加奖项',
  24: '奖项名称不能为空',
  25: '奖项数量要大于0',
  26: '进入抽奖',
  27: '进入开奖',
  28: '抽奖还未开启',
  29: '此轮抽奖已经结束了',
  30: '温馨提示',
  31: '确认操作：',
  32: '确定',
  33: '取消',
  34: '此轮开奖已经结束了',
  35: '抽奖',
  36: '开奖',
  37: '关闭抽奖',
  38: '重置开奖',
  39: '开始',
  40: '停止',
  41: '兑奖号',
  42: '中奖者',
  43: '奖项',
  44: '人参与了抽奖',
  45: '您已经中奖啦',
  46: '点击获取幸运号',
  47: '在',
  48: '参与人数量：',
  49: '恭喜您获取了幸运号',
  50: '操作成功',
  51: '结束开奖',
  52: '无效操作',
  53: '开奖结束',
  54: '服装选秀',
  55: '头像',
  56: '名字',
  57: '是否中奖',
  58: '抽奖详情:',
  59: '是',
  60: '否',
  61: '上传成功',
  62: '奖项轮次',
  63: '幸运号',
  64: '兑奖号',
  65: '开奖时间',
  66: '中奖者',
  67: '奖项描述',
  68: '奖项描述不能为空',
  69: '参与人信息',
  70: '添加图片',
  71: '配置服装序号',
  72: '添加序号',
  73: '添加服装图片',
  74: '图片序号不能为空',
  75: '统计',
  76: '请为',
  77: '您的评分为',
  78: '评论',
  79: '提交',
  80: '号节目评分',
  81: '服装选秀结果统计',
  82: '节目表演结果统计',
  83: '排名',
  84: '得分',
  85: '评分人数',
  86: '服装编号',
  87: '号码',
  88: '发送',
  89: '弹幕',
  90: '收起',
  91: 'EVEB 年会',
  92: '请投票',
  93: '投票暂未开启',
  94: '您已经投过票了',
  95: '重置',
  96: '表演部门:',
  97: '节目名称:',
  98: '表演人员:',
  99: '评分',
  100: '10s内只能发一次弹幕',
  101: '评分不能为0',
  102: '评论成功',
  103: '节目编号',
  104: '弹幕聊天室'
}
const langEn = {
  1: 'Lottery',
  2: 'Performance',
  3: 'Login',
  4: 'back',
  5: 'name:',
  6: 'Plaease Input Your Name',
  7: 'PS: Input The Name In Your Invitation Card',
  8: 'login',
  9: 'blublublu9',
  10: 'blublublu10',
  11: 'language select error',
  12: 'blublublu12',
  13: 'blublublu13',
  14: 'blublublu',
  15: 'blublublu',
  16: 'blublublu',
  17: 'blublublu',
  18: 'Performance',
  19: 'Logout',
  20: 'blublublu',
  21: 'blublublu',
  22: 'blublublu',
  23: 'blublublu',
  24: 'blublublu',
  25: 'blublublu',
  26: 'blublublu',
  27: 'blublublu',
  28: 'blublublu',
  29: 'blublublu',
  30: 'blublublu',
  31: 'blublublu',
  32: 'blublublu',
  33: 'blublublu',
  34: 'blublublu',
  35: 'blublublu',
  36: 'blublublu',
  37: 'blublublu',
  38: 'blublublu',
  39: 'blublublu',
  40: 'blublublu',
  41: 'blublublu',
  42: 'blublublu',
  43: 'blublublu',
  44: 'blublublu',
  45: 'blublublu',
  46: 'blublublu',
  47: 'blublublu',
  48: 'blublublu',
  49: 'blublublu',
  50: 'blublublu',
  51: 'blublublu',
  52: 'blublublu',
  53: 'blublublu',
  54: 'Miss Ultra Rich',
  55: 'blublublu',
  56: 'blublublu',
  57: 'blublublu',
  58: 'blublublu',
  59: 'blublublu',
  60: 'blublublu',
  71: 'set fashion number',
  72: 'Add Number',
  73: 'blublublu',
  74: 'blublublu',
  75: 'statistic',
  76: 'please comment for',
  77: 'your comment score is',
  78: 'blublublu',
  79: 'submit',
  80: '',
  81: 'blublublu',
  82: 'blublublu',
  83: 'blublublu',
  84: 'blublublu',
  85: 'blublublu',
  86: 'blublublu',
  87: 'number',
  88: 'send',
  89: 'blublublu',
  90: 'blublublu',
  91: 'EVEB ANNUAL DINNER',
  92: 'Please vote for one contestant only',
  93: 'Voting session have not started',
  94: 'You"ve already voted',
  95: 'reset',
  96: 'Performers Department:',
  97: 'Performance detail:',
  98: 'Performer names:',
  99: 'Score',
  100: 'only can send every in 10 seconds',
  101: 'vote should more than 1',
  102: 'vote successful',
  103: 'performance sequence',
  104: 'Live Chat'
}

function translate (key, lang) {
  let obj = lang === 'cn' ? langCn : langEn
  return obj[key]
}

function reverseArr (arr) {
  if (arr.length < 2) {
    return arr
  }
  let newArr = []
  arr.map((ele) => {
    newArr.unshift(ele)
  })
  return newArr
}

// param比较的字段  forward 从小到大 backward 从大到小
function quickSort (arr, forward, param) {
  if (arr.length <= 1) {
    return arr
  }
  let pivot = arr.splice(arr.length >> 1, 1)[0]
  let left = []
  let right = []
  if (forward) {
    for (let i = 0; i < arr.length; i++) {
      if (param) {
        if (arr[i][param] > pivot[param]) {
          right.push(arr[i])
        } else {
          left.push(arr[i])
        }
      } else {
        if (arr[i] > pivot) {
          right.push(arr[i])
        } else {
          left.push(arr[i])
        }
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (param) {
        if (arr[i][param] < pivot[param]) {
          right.push(arr[i])
        } else {
          left.push(arr[i])
        }
      } else {
        if (arr[i] < pivot) {
          right.push(arr[i])
        } else {
          left.push(arr[i])
        }
      }
    }
  }
  return [...quickSort(left, forward, param), pivot, ...quickSort(right, forward, param)]
}
const devUrl = 'http://localhost:9091'
const proUrl = 'http://40.83.73.235:9091'
const mockLuckyList = [
  {
    'username': 'mac1',
    'luckyNum': 1,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:01'
  },
  {
    'username': 'mac2',
    'luckyNum': 2,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:02'
  },
  {
    'username': 'mac3',
    'luckyNum': 3,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:03'
  },
  {
    'username': 'mac4',
    'luckyNum': 4,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:04'
  },
  {
    'username': 'mac5',
    'luckyNum': 5,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:05'
  },
  {
    'username': 'mac6',
    'luckyNum': 6,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:06'
  },
  {
    'username': 'mac7',
    'luckyNum': 7,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:07'
  },
  {
    'username': 'mac8',
    'luckyNum': 8,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:08'
  },
  {
    'username': 'mac9',
    'luckyNum': 9,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:09'
  },
  {
    'username': 'mac10',
    'luckyNum': 10,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:10'
  },
  {
    'username': 'mac11',
    'luckyNum': 11,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:11'
  },
  {
    'username': 'mac12',
    'luckyNum': 12,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:12'
  },
  {
    'username': 'mac13',
    'luckyNum': 13,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:13'
  },
  {
    'username': 'mac14',
    'luckyNum': 14,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:14'
  },
  {
    'username': 'mac15',
    'luckyNum': 15,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:15'
  },
  {
    'username': 'mac16',
    'luckyNum': 16,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:16'
  },
  {
    'username': 'mac17',
    'luckyNum': 17,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:17'
  },
  {
    'username': 'mac18',
    'luckyNum': 18,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:18'
  },
  {
    'username': 'mac19',
    'luckyNum': 19,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:19'
  },
  {
    'username': 'mac20',
    'luckyNum': 20,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:20'
  },
  {
    'username': 'mac21',
    'luckyNum': 21,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:21'
  },
  {
    'username': 'mac22',
    'luckyNum': 22,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:22'
  },
  {
    'username': 'mac23',
    'luckyNum': 23,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:23'
  },
  {
    'username': 'mac24',
    'luckyNum': 24,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:24'
  },
  {
    'username': 'mac25',
    'luckyNum': 25,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:25'
  },
  {
    'username': 'mac26',
    'luckyNum': 26,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:26'
  },
  {
    'username': 'mac27',
    'luckyNum': 27,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:27'
  },
  {
    'username': 'mac28',
    'luckyNum': 28,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:28'
  },
  {
    'username': 'mac29',
    'luckyNum': 29,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:29'
  },
  {
    'username': 'mac30',
    'luckyNum': 30,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:30'
  },
  {
    'username': 'mac31',
    'luckyNum': 31,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:31'
  },
  {
    'username': 'mac32',
    'luckyNum': 32,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:32'
  },
  {
    'username': 'mac33',
    'luckyNum': 33,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:33'
  },
  {
    'username': 'mac34',
    'luckyNum': 34,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:34'
  },
  {
    'username': 'mac35',
    'luckyNum': 35,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:35'
  },
  {
    'username': 'mac36',
    'luckyNum': 36,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:36'
  },
  {
    'username': 'mac37',
    'luckyNum': 37,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:37'
  },
  {
    'username': 'mac38',
    'luckyNum': 38,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:38'
  },
  {
    'username': 'mac39',
    'luckyNum': 39,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:39'
  },
  {
    'username': 'mac40',
    'luckyNum': 40,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:40'
  },
  {
    'username': 'mac41',
    'luckyNum': 41,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:41'
  },
  {
    'username': 'mac42',
    'luckyNum': 42,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:42'
  },
  {
    'username': 'mac43',
    'luckyNum': 43,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:43'
  },
  {
    'username': 'mac44',
    'luckyNum': 44,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:44'
  },
  {
    'username': 'mac45',
    'luckyNum': 45,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:45'
  },
  {
    'username': 'mac46',
    'luckyNum': 46,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:46'
  },
  {
    'username': 'mac47',
    'luckyNum': 47,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:47'
  },
  {
    'username': 'mac48',
    'luckyNum': 48,
    'lang': 'en',
    'createTime': '2018/12/18 08:52:48'
  },
  {
    'username': 'mac49',
    'luckyNum': 49,
    'lang': 'cn',
    'createTime': '2018/12/18 08:52:46'
  },
  {
    'username': 'mac50',
    'luckyNum': 50,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:50'
  },
  {
    'username': 'mac51',
    'luckyNum': 51,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:51'
  },
  {
    'username': 'mac52',
    'luckyNum': 52,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:52'
  },
  {
    'username': 'mac53',
    'luckyNum': 53,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:53'
  },
  {
    'username': 'mac54',
    'luckyNum': 54,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:54'
  },
  {
    'username': 'mac55',
    'luckyNum': 55,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:55'
  },
  {
    'username': 'mac56',
    'luckyNum': 56,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:56'
  },
  {
    'username': 'mac57',
    'luckyNum': 57,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:57'
  },
  {
    'username': 'mac58',
    'luckyNum': 58,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:58'
  },
  {
    'username': 'mac59',
    'luckyNum': 59,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:59'
  },
  {
    'username': 'mac60',
    'luckyNum': 60,
    'lang': 'en',
    'createTime': '2018/12/18 08:50:00'
  },
  {
    'username': 'mac61',
    'luckyNum': 61,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:01'
  },
  {
    'username': 'mac62',
    'luckyNum': 62,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:02'
  },
  {
    'username': 'mac63',
    'luckyNum': 63,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:03'
  },
  {
    'username': 'mac64',
    'luckyNum': 64,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:04'
  },
  {
    'username': 'mac65',
    'luckyNum': 65,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:05'
  },
  {
    'username': 'mac66',
    'luckyNum': 66,
    'lang': 'cn',
    'createTime': '2018/12/18 08:50:15'
  },
  {
    'username': 'mac67',
    'luckyNum': 67,
    'lang': 'cn',
    'createTime': '2018/12/18 08:50:16'
  },
  {
    'username': 'mac68',
    'luckyNum': 68,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:17'
  },
  {
    'username': 'mac69',
    'luckyNum': 69,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:18'
  },
  {
    'username': 'mac70',
    'luckyNum': 70,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:19'
  },
  {
    'username': 'mac71',
    'luckyNum': 71,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:11'
  },
  {
    'username': 'mac72',
    'luckyNum': 72,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:12'
  },
  {
    'username': 'mac73',
    'luckyNum': 73,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:13'
  },
  {
    'username': 'mac74',
    'luckyNum': 74,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:14'
  },
  {
    'username': 'mac75',
    'luckyNum': 75,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:15'
  },
  {
    'username': 'mac76',
    'luckyNum': 76,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:16'
  },
  {
    'username': 'mac77',
    'luckyNum': 77,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:17'
  },
  {
    'username': 'mac78',
    'luckyNum': 78,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:18'
  },
  {
    'username': 'mac79',
    'luckyNum': 79,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:19'
  },
  {
    'username': 'mac80',
    'luckyNum': 80,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:11'
  },
  {
    'username': 'mac81',
    'luckyNum': 81,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:11'
  },
  {
    'username': 'mac82',
    'luckyNum': 82,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:12'
  },
  {
    'username': 'mac83',
    'luckyNum': 83,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:13'
  },
  {
    'username': 'mac84',
    'luckyNum': 84,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:14'
  },
  {
    'username': 'mac85',
    'luckyNum': 85,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:15'
  },
  {
    'username': 'mac86',
    'luckyNum': 86,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:16'
  },
  {
    'username': 'mac87',
    'luckyNum': 87,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:17'
  },
  {
    'username': 'mac88',
    'luckyNum': 88,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:18'
  },
  {
    'username': 'mac89',
    'luckyNum': 89,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:19'
  },
  {
    'username': 'mac90',
    'luckyNum': 90,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:20'
  },
  {
    'username': 'mac91',
    'luckyNum': 91,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:21'
  },
  {
    'username': 'mac92',
    'luckyNum': 92,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:22'
  },
  {
    'username': 'mac93',
    'luckyNum': 93,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:23'
  },
  {
    'username': 'mac94',
    'luckyNum': 94,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:24'
  },
  {
    'username': 'mac95',
    'luckyNum': 95,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:25'
  },
  {
    'username': 'mac96',
    'luckyNum': 96,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:26'
  },
  {
    'username': 'mac97',
    'luckyNum': 97,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:27'
  },
  {
    'username': 'mac98',
    'luckyNum': 98,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:28'
  },
  {
    'username': 'mac99',
    'luckyNum': 99,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:29'
  },
  {
    'username': 'mac100',
    'luckyNum': 100,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:30'
  },
  {
    'username': 'mac101',
    'luckyNum': 101,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac102',
    'luckyNum': 102,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac103',
    'luckyNum': 103,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac104',
    'luckyNum': 104,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac105',
    'luckyNum': 105,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac106',
    'luckyNum': 106,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac107',
    'luckyNum': 107,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac108',
    'luckyNum': 108,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac109',
    'luckyNum': 109,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac110',
    'luckyNum': 110,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:31'
  },
  {
    'username': 'mac111',
    'luckyNum': 111,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:32'
  },
  {
    'username': 'mac112',
    'luckyNum': 112,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:33'
  },
  {
    'username': 'mac113',
    'luckyNum': 113,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:34'
  },
  {
    'username': 'mac114',
    'luckyNum': 114,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:35'
  },
  {
    'username': 'mac115',
    'luckyNum': 115,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:36'
  },
  {
    'username': 'mac116',
    'luckyNum': 116,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:37'
  },
  {
    'username': 'mac117',
    'luckyNum': 117,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:38'
  },
  {
    'username': 'mac118',
    'luckyNum': 118,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:39'
  },
  {
    'username': 'mac119',
    'luckyNum': 119,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:40'
  },
  {
    'username': 'mac120',
    'luckyNum': 120,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:41'
  },
  {
    'username': 'mac121',
    'luckyNum': 121,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:42'
  },
  {
    'username': 'mac122',
    'luckyNum': 122,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:43'
  },
  {
    'username': 'mac123',
    'luckyNum': 123,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:44'
  },
  {
    'username': 'mac124',
    'luckyNum': 124,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:45'
  },
  {
    'username': 'mac125',
    'luckyNum': 125,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:46'
  },
  {
    'username': 'mac126',
    'luckyNum': 126,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:47'
  },
  {
    'username': 'mac127',
    'luckyNum': 127,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:48'
  },
  {
    'username': 'mac128',
    'luckyNum': 128,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:49'
  },
  {
    'username': 'mac129',
    'luckyNum': 129,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:50'
  },
  {
    'username': 'mac130',
    'luckyNum': 130,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:51'
  },
  {
    'username': 'mac131',
    'luckyNum': 131,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:52'
  },
  {
    'username': 'mac132',
    'luckyNum': 132,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:53'
  },
  {
    'username': 'mac133',
    'luckyNum': 133,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:54'
  },
  {
    'username': 'mac134',
    'luckyNum': 134,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:55'
  },
  {
    'username': 'mac135',
    'luckyNum': 135,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:56'
  },
  {
    'username': 'mac136',
    'luckyNum': 136,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:57'
  },
  {
    'username': 'mac137',
    'luckyNum': 137,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:58'
  },
  {
    'username': 'mac138',
    'luckyNum': 138,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:59'
  },
  {
    'username': 'mac139',
    'luckyNum': 139,
    'lang': 'cn',
    'createTime': '2018/12/18 08:50:00'
  },
  {
    'username': 'mac140',
    'luckyNum': 140,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:01'
  },
  {
    'username': 'mac141',
    'luckyNum': 141,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:02'
  },
  {
    'username': 'mac142',
    'luckyNum': 142,
    'lang': 'en',
    'createTime': '2018/12/18 08:49:03'
  },
  {
    'username': 'mac143',
    'luckyNum': 143,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:04'
  },
  {
    'username': 'mac144',
    'luckyNum': 144,
    'lang': 'cn',
    'createTime': '2018/12/18 08:49:05'
  }
]

export {
  staffArr,
  translate,
  reverseArr,
  devUrl,
  proUrl,
  mockLuckyList,
  quickSort
}
