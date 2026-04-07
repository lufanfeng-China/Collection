window.ACTION_SUMMARY = {
    "sourceFile":  "C:\\Users\\Sky.Lu\\OneDrive - Thermo Fisher Scientific\\Desktop\\Discussion Summary.xlsx",
    "syncedAt":  "2026-04-07T11:52:24",
    "items":  [
                  {
                      "system":  "VAT",
                      "changePoint":  "收款团队在VAT系统内直接申请开票",
                      "remark":  "1.  Amy强调VAT团队需要进行税务合规性判断,如品名修改是否符合税率要求\n2.  品名不能随意变更(如A改成B再改成C),需要确保税务合规\n3.  拆分也有专业要求,如不能随意拆成小数(0.8和0.2)\n4.  技术上可以给收款团队开放权限自行操作\n5.  如果收款团队接手,需要具备基本的税务和开票知识\n6.  VAT团队的专业判断包括:确认是否符合税务要求、正确的税收编码等\n7.  工作量从一个团队转移到另一个团队,整体效率提升有限",
                      "fte":  "-",
                      "cost":  null,
                      "status":  "取消",
                      "type":  "CR",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "VAT",
                      "changePoint":  "产品名称与官网同步",
                      "remark":  "1. 药监局开票品名必须和备案过的品名一致\n2. 中英文维护在中文字段\n3. 有需要去掉英文的特殊需求\n4. VAT一定要有中文名称\n5. 官网有只有英文的情况（需要看一下具体的比例）\n6. 经过数据验证，官网SKU纯中文和混合  是有中文品名能用的  加起来有 18009个物料号，占总计需要中文品名物料号（107529）的16.7%",
                      "fte":  null,
                      "cost":  null,
                      "status":  "取消",
                      "type":  "CR",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "VAT",
                      "changePoint":  "发票行项目顺序调整",
                      "remark":  "1. 需要评估客户需求的必要性和频率\n2. 票一通系统支持此功能\n3. 还要考虑匠领系统的变更",
                      "fte":  null,
                      "cost":  "100000",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "Credit",
                      "changePoint":  "Credit端增加银行水单抓取能力",
                      "remark":  "1.  一天多次定时同步\n2.  Share folder 去取抓AR同事手工维护的表格，进入Credit\n    - 客户抬头\n    - 金额\n    - 日期\n    - 付款摘要（备注）\n3.  需要Credit和Collection拉齐需求的理解",
                      "fte":  null,
                      "cost":  null,
                      "status":  "评估中",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "Credit",
                      "changePoint":  "科研客户黑名单政策：从“默认解锁”评估调整为“默认锁定”",
                      "remark":  "1. Academia客户系统中有十万家,黑名单客户不到0.3%\n2. 维持默认解锁评估政策,不调整为默认锁定\n3. 从效率角度考虑,99.7%的客户都是良好客户,不应为极少数问题客户影响整体效率",
                      "fte":  null,
                      "cost":  null,
                      "status":  "取消",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "企业微信",
                      "changePoint":  "使用企业微信",
                      "remark":  "1. 第一层：效率提升\n减少首次催收和重复提醒的人工作业\n减少简单问题人工响应\n减少手工记录和系统更新时间\n2. 第二层：流程升级\n沟通留痕自动化\n人机协同分层处理\n从个人经验驱动转为规则驱动\n3. 第三层：管理与合规\n客户资产公司化\n过程透明\n离职交接风险降低\n数据可追踪，可分析，可审计",
                      "fte":  "1",
                      "cost":  null,
                      "status":  "评估中",
                      "type":  "New",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "企业微信",
                      "changePoint":  "企业微信 叠加AI自动化",
                      "remark":  "自动同步企业微信内容，对接相关系统",
                      "fte":  "2",
                      "cost":  null,
                      "status":  "评估中",
                      "type":  "AI",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "Credit",
                      "changePoint":  "补充customer层面付款习惯信息",
                      "remark":  "1.  在Credit系统中新增字段,从AR Portal同步客户层面付款习惯信息\n2.  将Billing维度和客户习惯信息分开显示在两个独立表格中,便于查看\n3.  数据已在AR Portal中存在,只需增加显示字段",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "Credit",
                      "changePoint":  "与Credit对齐收款团队跟进记录内容格式",
                      "remark":  "1.  增加结构化的记录格式,前面部分用下拉选项记录季度底付款预期(能付/不能付/部分支付)\n2. 后面保留详细跟进记录供收款团队使用\n3.  通过规范化格式减少团队间重复沟通,便于后续dashboard分析",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "Credit",
                      "changePoint":  "收款跟进记录实时更新至Credit解锁系统",
                      "remark":  "AR Portal与Credit系统同步**\n1.  当前Airport与Credit系统每天晚上同步一次前一天数据\n2.  收款团队更新**AR Portal**后,Credit团队要等到第二天才能看到相关信息\n3.  计划调查实现实时或按需同步的可能性,减少信息延迟导致的重复询问",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "LSG 唯一一笔（一对一/一对多）系统自动认款，无需核销员点击确认",
                      "remark":  "当系统只给出一个匹配方案(solution)时,准确率非常高,基本无误 。团队确认可以跳过人工确认环节,如果只有一个匹配建议且满足授权节点要求,系统可自动完成匹配 。技术上无问题,仅需确认授权流程 。",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "增加智能排序与优先级判断",
                      "remark":  "1.  为匹配建议添加优先级标记(HIGH/MIDDLE/LOW)\n2.  通过历史数据验证,如果HIGH优先级匹配准确率达到90-95%以上,可实现自动匹配\n3. 利用AI技术分析客户历史收款记录(半年内),总结收款逻辑并自动生成定制化匹配规则\n4.  系统可在闲暇时间(如周末)批量处理匹配逻辑生成,定期更新(每半年或2-3个月滚动更新)\n5. 优先从关键客户(经常无法一对一匹配的客户)开始实施",
                      "fte":  null,
                      "cost":  null,
                      "status":  "评估中",
                      "type":  "AI",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "核销专员未认款转给收款员并生成任务",
                      "remark":  "1.  在系统中增加任务模块,集中显示需要收款员处理的待办事项\n2.  支持核销员或收款员之间互相cue任务,明确标记任务分配对象\n3.  解决当前虽能看到所有未核销款项,但无法快速筛选被分配任务的问题\n4.  记录任务历史,避免信息丢失,方便后续追溯",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  "结构化填写催收跟进记录",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  "梳理电话催收内容并形成结构化模板/字段",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  "PIP留痕：新增邮箱需客户验证，确认邮箱被指定系统使用",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "03 对账与争议处理"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  "AR Portal发信功能/模板拓展优化",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  "全周期管理、自动生成对账单、跨系统取数并生成客户格式",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "三方平台",
                      "changePoint":  "客户平台订单状态返还至AR Portal",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "评估中",
                      "type":  "CR",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "三方平台",
                      "changePoint":  "锐竞平台电子章功能",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "三方平台",
                      "changePoint":  "RPA/自动化工具用于主要客户平台操作（金士烈/百望云/耀明康德/三生）",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "评估中",
                      "type":  "RPA",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "三方平台",
                      "changePoint":  "第三方客户平台供应商沟通API接口或RPA自动化方案（方圆/库巴扎/瑞金",
                      "remark":  "1. 方元 - 开发费2万\n2. 库巴扎 - 一次性对接费5万，日常数据服务费是销售额的0.5%。累计销售额满1000万后返2万对接费。\n3. 锐竞 - 一次性开发费\n4. 喀斯玛 - 一次性开发费",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待审批",
                      "type":  "API",
                      "step":  "02 开票与其他支持材料交付"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "三方代付申请完，自动流转到认款核销部分（LSG+CTC）",
                      "remark":  "当前三方代付审核通过后,还需要手动回到认款页面提交认款,希望实现审核通过后自动流转到认款完成   。三方代付申请时已包含所有必要信息(进账编号、金额等),系统应能自动触发认款流程 。类似功能在LSG系统也存在相同问题 。",
                      "fte":  "0.01",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "MDM",
                      "changePoint":  "MDM增加科研客户特征字段，实现自动判断",
                      "remark":  "1. 校验内容\n     收票邮箱地址 \n     收票人姓名\n     收票人地址\n     收票人手机号码\n2. 科研客户的判断标准： 财务黑名单 - 这个黑名单需要有更新的能力（不管是Collection自己做还是找业务owner）\n3.  校验的对象： E1的BT对象\n4.  财务会提供一个AP portal里的已有邮箱清单，在做收票邮箱地址的时候，也要检查这个清单。（这个清单也要可维护）\n5.  把校验结果放在现有的财务审批节点，如下图的黑名单客户判定区域，增加：\n    收票邮箱地址重复检验： Yes\n    收票人姓名重复检验：No\n    收票人地址重复校验：No\n    收票人手机号码重复检验：No",
                      "fte":  null,
                      "cost":  "33000",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "01 准备与客户主数据"
                  },
                  {
                      "system":  "New",
                      "changePoint":  "销售统一提交客户信息变更的界面/小程序",
                      "remark":  "1. 联系人信息变更（BT或SO层面）\n    - 联系人邮箱\n    - 联系人电话\n    - 联系人姓名\n    - 文件接收地址\n2. 开票规则变更\n    - 暂停开票\n    - 发票类型变化\n    - 特殊开票要求更新\n        - 拆分\n        - 合并\n        - 开票时间要求\n3. 退票需求\n4. 客户开票抬头的更名（现在是通过邮件，微信直接由销售联系财务同事）：\n    - 名字\n    - 地址\n    - 银行\n    - 电话\n    \n    保证税号不变的情况下，如果有变化走新客户MDM流程",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待评估",
                      "type":  "AI",
                      "step":  "01 准备与客户主数据"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  " HK  Collection整合",
                      "remark":  "方向1：AR Portal \n方向2：自动化Excel方式",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "AR Portal",
                      "changePoint":  "AB service 整合进AR Portal",
                      "remark":  "•\t收款计划管理\n•\t客户对账配置管理，对账文件要求，账单要求，对账要求，提醒设置等\n•\t客户对账单制作和发送,。目前，85%标准对账单(邮件发送平台) ，15%手工处理 非标对账单。未来系统根据客户的要求，自动按要求生成对账单。\n•\t对账文件管理\n•\t收款跟进状态管理(Billing维度)\n•\t对账客户认证和授权",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "04 催收与承诺管理"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "AD HOC和PCS的整合，以及退款和押金模块的改进",
                      "remark":  "目前：LSG的退款是在AD HOC上面走流程的，AR线下完成退款。没有系统tracking的记录。记录保存在E1，2年之后archive\n\tAIG的退款无法选择退回到这个流程的哪一层，需要可以选择退回哪一层。\n改进：copy AIG PCS，退款直接在PCS做申请和审批，这样也不需要申请人每次去E1截取收款凭证截图，直接从PCS选要退回的进账就可以了，也避免反复确认E1截图的准确性。同时可以保存记录和supporting。\n \t改进退回时候可选的功能。",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "押金认款和取消直接在PCS操作",
                      "remark":  "目前：LSG的押金是收款员在AD HOC 上做审批之后发邮件给 AR，AR在PCS做认款，然后手工Keep一个线下Excel记录。AIG有押金认款但是不能部分认款，需要有部分认款和部分转回功能。\n\n改进：copy AIG PCS，可以直接做押金认款。可以同步开发流程也可以直接把邮件作为附件上传，同时还可以保存押金协议。记录和附件都线上可查。增加部分认款。",
                      "fte":  "2.7777777777777779E-3",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "完善PCS 报表功能",
                      "remark":  "AIG+LSG的报表\n1.\tLSG本来就没有报表模块和DASH BOARD\n2.\tAIG的一些报告已经过时，需要更新：\n1.对于进账要有一个OPEN/CLOSE的标记，在一些报告里面需要按照这个标记来做筛选和导出，例如进账状态表，认款信息表，\n2.DP AR表增加客户名字的筛选，模糊和精确\n3.增加筛选框的多个信息输入，\n3.\t没有所有公司的FULL PICTURE，报表和DASHBOARD功能可以整合两个系统一起，有个门户展示，然后分别进入两个系统。",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "批量认款的争议和反核销需要有批量申请功能",
                      "remark":  "争议管理-批量争议,针对批量认款的争议和反核销需要有批量申请功能\n1.单笔认款-一笔进账对应多个BILLING 号生成多个认款编号，现在只能一条条去争议\n2. 批量认款\n3. 要考虑解决现在对冲的（CODO）找不到认款记录\n4.从RI 所在的BT 的维度考虑争议，需涉及到单笔认款和批量认款的途径",
                      "fte":  "3.0651340996168601E-3",
                      "cost":  "62500",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "批量认款模板加上Document item No.",
                      "remark":  "需要指定单据核销剩余固定金额，目前核销是根据一组核销相同单据号随机匹配金额",
                      "fte":  "3.0651340996168601E-3",
                      "cost":  "7500",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "PO认款功能和认款建议",
                      "remark":  "在待认款界面认款中可通过PO勾选认款/在认款建议中可根据PO给建议",
                      "fte":  "0.01",
                      "cost":  "7500",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "白名单，可供用户直接维护",
                      "remark":  "a. 在白名单上的客户在清账时可以豁免对于名称的校验\nb. 该页面涉及到的字段： ENTITY, 客户名称\nc. 需要引入生效时间，当设置的时间已经过期，此豁免无效\nA付款的是B的单子，如果做了映射那么A的打款只能核销B的单子，无法做双向映射，希望AB核销时不要校验",
                      "fte":  "0.01",
                      "cost":  "7500",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "OPEN 的VAT 报表(主要看目前哪些发票挂在账上还没付钱)",
                      "remark":  "报表-VAT报表中是目前是所有数据VAT，希望能筛选出来没付钱核销的VAT数据。在待认款-认款通过VAT发票池勾选未认款的发票，现在是全部都在无区分上面。",
                      "fte":  "0.01",
                      "cost":  "1500",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "DP差异报告",
                      "remark":  "报表中心-DP差异报告-COPY NON LSG，需要一个检验PCS和E1 数据一致不一致的报告",
                      "fte":  "0.02",
                      "cost":  "7500",
                      "status":  "待审批",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "前一天认款被清账后针对清账情况需要邮件通知认款操作员",
                      "remark":  "是否核销成功无提示，错误原因也无提示，只能通过查看第二天AR表判断或者等待AR同事邮件告知",
                      "fte":  "0.01",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "前一天核销跳票报表",
                      "remark":  "看认款建议唯一一笔情况下，按照DUEDATE 排序）开发时的前提：认款建议里要区分按PCS BILLING加入的ID 顺序是否连续\n主要看跳票，目前给出的认款建议是根据金额随机提供5条内，希望系统认款建议逻辑是按照单据日期顺序排，且若识别跳票给出提示",
                      "fte":  "0.23",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "多个SO 汇总金额，多个VAT汇总，多个PO 金额等于进账金额的情况也给建议",
                      "remark":  null,
                      "fte":  "0.04",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "所有页面带有复选框元素被勾选后需要显示具体勾选条数",
                      "remark":  null,
                      "fte":  "0.01",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "认款建议有一键展开功能",
                      "remark":  "认款建议增加全部勾选一键点开按钮",
                      "fte":  "0.01",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "已经认过的billing做标记",
                      "remark":  "待认款选择billing/SO/PO/VAT类型后出来的billing是所有未清账的，需要体现出已认款标记",
                      "fte":  "0.04",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "认款建议优化（排序）",
                      "remark":  "目前认款建议是凑单据数字给出建议，希望有一个抓取数字和单据日期从远到近的建议\n认款建议给连续性的核销建议，按照日期考前的依次核销",
                      "fte":  "0.03",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "RB+负数billing认款，可以认到SO，VAT和PO",
                      "remark":  "批量认款上传时候，只能RB对应SO/RB对应billingRB对应VAT，不能RB对应SO和billing",
                      "fte":  "0.01",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "待认款-凑数工具增强",
                      "remark":  "1）待认款-凑数工具里需要有用户在外部文件复制多行多列数据后可以直接在此板块粘贴后正确显示在当前 数据列表里单据号，金额，备注下的功能。\n2）要求做到再多的数据也只需粘贴一次。\n3）粘贴成功后显示在系统里的每行数据都可以进行编辑且每行在“备注”后需要有删除按钮\n4）需要有增加行的按钮\n5）需要有重置按钮可一键清除所有粘贴的内容",
                      "fte":  "0.02",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "负数billing 清账逻辑调整。",
                      "remark":  "目前DP清完以后，剩下如果有正负AR，就不会清账了。把正负提前在DP清完之前抓取做清账。",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "BAD Report 倒置，收到汇票日期从新到旧",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "外汇认款流程是否针对已拒绝，显示当时拒绝的理由",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "押金部分争议后，该笔进账的原始DP 时间不会更新",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "增加是否争议过的按钮",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "待认款页面在筛选过之后页面最下面增加汇总功能",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "RI重复认款时，后一位同事提交时，需要出现提示功能",
                      "remark":  null,
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "报错优化",
                      "remark":  "上传认款核销时候，一组中错误行不上传且提示错误，正确上传，现在只报错一条",
                      "fte":  "7.0000000000000007E-2",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "认款建议优化（数量）",
                      "remark":  "认款建议超过5条不给建议，改善认款建议20条",
                      "fte":  null,
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "争议过的记录显示",
                      "remark":  "我的认款和批量认款模块，认款记录需要加争议过的记录",
                      "fte":  "2.7777777777777779E-3",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  },
                  {
                      "system":  "PCS",
                      "changePoint":  "CODO在PCS上可操作可查询",
                      "remark":  null,
                      "fte":  "2.7777777777777779E-3",
                      "cost":  null,
                      "status":  "待报价",
                      "type":  "CR",
                      "step":  "05 到账与核销"
                  }
              ]
};
