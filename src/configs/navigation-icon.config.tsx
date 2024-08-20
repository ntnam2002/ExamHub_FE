import {
    HiOutlineChartSquareBar,
    HiOutlineUserGroup,
    HiOutlineTrendingUp,
    HiOutlineUserCircle,
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineShieldCheck,
    HiOutlineColorSwatch,
    HiOutlineChatAlt,
    HiOutlineDesktopComputer,
    HiOutlinePaperAirplane,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiOutlineKey,
    HiOutlineBan,
    HiOutlineHand,
    HiOutlineDocumentText,
    HiOutlineTemplate,
    HiOutlineLockClosed,
    HiOutlineDocumentDuplicate,
    HiOutlineViewGridAdd,
    HiOutlineShare,
    HiOutlineVariable,
    HiOutlineCode,
} from 'react-icons/hi'
import { TiHomeOutline } from 'react-icons/ti'
import { PiStudent, PiExam, PiChalkboardTeacher } from 'react-icons/pi'
import { FaBook } from 'react-icons/fa'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { FcStatistics } from 'react-icons/fc'
import { statistic } from 'antd/es/theme/internal'
import { TbReportSearch } from 'react-icons/tb'
import { MdClass, MdDomain, MdSubject } from 'react-icons/md'
import { RiAlarmWarningLine } from 'react-icons/ri'
import { BiUniversalAccess } from 'react-icons/bi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    apps: <HiOutlineViewGridAdd />,
    project: <HiOutlineChartSquareBar />,
    crm: <HiOutlineUserGroup />,
    sales: <HiOutlineTrendingUp />,
    crypto: <HiOutlineCurrencyDollar />,
    knowledgeBase: <HiOutlineBookOpen />,
    account: <HiOutlineUserCircle />,
    uiComponents: <HiOutlineTemplate />,
    common: <HiOutlineColorSwatch />,
    feedback: <HiOutlineChatAlt />,
    dataDisplay: <HiOutlineDesktopComputer />,
    forms: <HiOutlineDocumentText />,
    navigation: <HiOutlinePaperAirplane />,
    graph: <HiOutlineChartPie />,
    authentication: <HiOutlineLockClosed />,
    signIn: <HiOutlineShieldCheck />,
    signUp: <HiOutlineUserAdd />,
    forgotPassword: <HiOutlineLockClosed />,
    resetPassword: <HiOutlineKey />,
    pages: <HiOutlineDocumentDuplicate />,
    welcome: <HiOutlineHand />,
    accessDenied: <HiOutlineBan />,
    guide: <HiOutlineBookOpen />,
    documentation: <HiOutlineDocumentText />,
    sharedComponentDoc: <HiOutlineShare />,
    utilsDoc: <HiOutlineVariable />,
    changeLog: <HiOutlineCode />,
    home: <TiHomeOutline />,
    student: <PiStudent />,
    book: <FaBook />,
    question: <AiOutlineQuestionCircle />,
    examination: <PiExam />,
    statistics: <FcStatistics />,
    report: <TbReportSearch />,
    teacher: <PiChalkboardTeacher />,
    class: <MdClass />,
    department: <MdDomain />,
    subject: <MdSubject />,
    behavior: <RiAlarmWarningLine />,
    accesscontrol: <BiUniversalAccess />,
}

export default navigationIcon
