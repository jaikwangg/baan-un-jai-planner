import { FormStep } from '../types/assessment';

export const formSteps: FormStep[] = [
  {
    title: 'รายรับ-รายจ่าย',
    subtitle: 'ของผู้ประเมิน',
    fields: [
      {
        name: 'mainIncome',
        label: 'รายได้ประจำต่อเดือน',
        type: 'number',
        required: true,
        placeholder: 'กรอกรายได้ประจำต่อเดือน (บาท)'
      },
      {
        name: 'additionalIncome',
        label: 'รายได้อื่นๆ',
        type: 'number',
        required: false,
        placeholder: 'กรอกรายได้อื่นๆ (บาท)'
      },
      {
        name: 'incomeFrequency',
        label: 'ความถี่ในการรับเงิน',
        type: 'select',
        required: true,
        options: ['รายวัน', 'รายสัปดาห์', 'รายเดือน', 'รายปี']
      },
      {
        name: 'livingCosts',
        label: 'ค่าครองชีพ (อาหาร ฯลฯ)',
        type: 'number',
        required: true,
        placeholder: 'กรอกค่าครองชีพรายเดือน (บาท)'
      },
      {
        name: 'otherDebts',
        label: 'ภาระผ่อนชำระอื่นๆ',
        type: 'number',
        required: false,
        placeholder: 'กรอกภาระผ่อนชำระ (บาท)'
      }
    ]
  },
  {
    title: 'ภาระหนี้สิน',
    subtitle: 'ของผู้ประเมิน',
    fields: [
      {
        name: 'existingLoans',
        label: 'สินเชื่อเดิมที่มีอยู่',
        type: 'select',
        required: true,
        options: ['ไม่มี', 'บ้าน/ที่ดิน', 'รถยนต์', 'บัตรเครดิต', 'สินเชื่อส่วนบุคคล', 'อื่นๆ']
      },
      {
        name: 'loanAmount',
        label: 'ยอดจำนวนเงินสินเชื่อ',
        type: 'number',
        required: false,
        placeholder: 'กรอกยอดหนี้คงเหลือ (บาท)'
      }
    ]
  },
  {
    title: 'พฤติกรรม',
    subtitle: 'การออมของผู้ประเมิน',
    fields: [
      {
        name: 'savingFrequency',
        label: 'รูปแบบการออม',
        type: 'radio',
        required: true,
        options: [
          'ออมประจำทุกวัน',
          'ออมประจำทุกสัปดาห์',
          'ออมประจำทุกเดือน',
          'ไม่มีการออมประจำ',
        ],
        subFields: {
          'ออมประจำทุกวัน': [
            {
              name: 'dailySavingAmount',
              label: 'จำนวนเงินที่ออมต่อวัน',
              type: 'number',
              placeholder: 'บาท',
            },
            {
              name: 'timesPerDay',
              label: 'ติดต่อกันมาแล้ว',
              type: 'number',
              placeholder: 'วัน',
            },
          ],
          'ออมประจำทุกสัปดาห์': [
            {
              name: 'weeklySavingAmount',
              label: 'จำนวนเงินที่ออมต่อวัน',
              type: 'number',
              placeholder: 'บาท',
            },
            {
              name: 'timesPerWeek',
              label: 'ติดต่อกันมาแล้ว',
              type: 'number',
              placeholder: 'สัปดาห์',
            },
          ],
          'ออมประจำทุกเดือน': [
            {
              name: 'monthlySavingAmount',
              label: 'จำนวนเงินที่ออมต่อเดือน',
              type: 'number',
              placeholder: 'บาท',
            },
            {
              name: 'timesPerMonth',
              label: 'ติดต่อกันมาแล้ว',
              type: 'number',
              placeholder: 'เดือน',
            },
          ],
        },
      },
      {
        name: 'savingAccount',
        label: 'บัญชีที่ใช้ในการออม',
        type: 'select',
        required: true,
        options: ['ไม่มี', 'บัญชีออมทรัพย์', 'บัญชีกระแสรายวัน', 'บัญชีประจำ', 'กองทุน'],
      },
      {
        name: 'numberOfAccounts',
        label: 'จำนวนบัญชีที่มี',
        type: 'select',
        required: true,
        options: ['ไม่มี', '1 บัญชี', '2-3 บัญชี', '4-5 บัญชี', 'มากกว่า 5 บัญชี'],
      },
    ],
  }
  ,
  {
    title: 'ข้อมูลส่วนบุคคล',
    subtitle: 'ของผู้ประเมิน',
    fields: [
      {
        name: 'age',
        label: 'อายุ',
        type: 'number',
        required: true,
        placeholder: 'กรอกอายุ (ปี)'
      },
      {
        name: 'education',
        label: 'การศึกษา',
        type: 'select',
        required: true,
        options: ['ประถมศึกษา', 'มัธยมศึกษา', 'ปวช./ปวส.', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก']
      },
      {
        name: 'occupation',
        label: 'อาชีพหลัก',
        type: 'text',
        required: true,
        placeholder: 'กรอกอาชีพ'
      },
      {
        name: 'coBorrower',
        label: 'ผู้ร่วมกู้ (ถ้ามี)',
        type: 'select',
        required: false,
        options: ['ไม่มี', 'คู่สมรส', 'บิดา/มารดา', 'พี่น้อง', 'อื่นๆ']
      }
    ]
  },
  {
    title: 'เป้าหมาย',
    subtitle: 'ของผู้ประเมิน',
    fields: [
      {
        name: 'targetAmount',
        label: 'จำนวนเงิน',
        type: 'number',
        required: true,
        placeholder: 'กรอกจำนวนเงินที่ต้องการ (บาท)'
      },
      {
        name: 'loanPeriod',
        label: 'ระยะเวลาผ่อนชำระ',
        type: 'number',
        required: true,
        placeholder: 'กรอกระยะเวลาผ่อนชำระ (เดือน)'
      },
      {
        name: 'interest',
        label: 'อัตราดอกเบี้ย',
        type: 'number',
        required: true,
        placeholder: 'กรอกอัตราดอกเบี้ย (ร้อยละต่อปี)'
      },
      {
        name: 'location',
        label: 'จังหวัดที่สนใจ',
        type: 'text',
        required: true,
        placeholder: 'กรอกจังหวัด'
      }
    ]
  }
];