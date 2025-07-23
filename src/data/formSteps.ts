import { FormStep } from '../types/assessment';

export const formSteps: FormStep[] = [
  {
    title: 'รายรับ-รายจ่ายของผู้ประเมิน',
    fields: [
      {
        name: 'mainIncome',
        label: 'รายได้หลัก',
        type: 'number',
        required: true,
        placeholder: 'กรอกรายได้หลัก (บาท)'
      },
      {
        name: 'additionalIncome',
        label: 'รายได้เสริม',
        type: 'number',
        required: false,
        placeholder: 'กรอกรายได้เสริม (บาท)'
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
    title: 'ภาระหนี้สินของผู้ประเมิน',
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
    title: 'พฤติกรรมการออมของผู้ประเมิน',
    fields: [
      {
        name: 'savingFrequency',
        label: 'ความถี่การออมรายเดือน',
        type: 'select',
        required: true,
        options: ['ไม่ออม', 'ไม่แน่นอน', 'เดือนละครั้ง', 'หลายครั้งต่อเดือน']
      },
      {
        name: 'savingAmount',
        label: 'จำนวนการออมรายเดือน',
        type: 'number',
        required: false,
        placeholder: 'กรอกจำนวนเงินออม (บาท)'
      },
      {
        name: 'savingAccount',
        label: 'บัญชีที่ใช้ในการออม',
        type: 'select',
        required: true,
        options: ['ไม่มี', 'บัญชีออมทรัพย์', 'บัญชีกระแสรายวัน', 'บัญชีประจำ', 'กองทุน']
      },
      {
        name: 'numberOfAccounts',
        label: 'จำนวนบัญชีที่มี',
        type: 'select',
        required: true,
        options: ['ไม่มี', '1 บัญชี', '2-3 บัญชี', '4-5 บัญชี', 'มากกว่า 5 บัญชี']
      }
    ]
  },
  {
    title: 'ข้อมูลส่วนบุคคลของผู้ประเมิน',
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
    title: 'เป้าหมายของผู้ประเมิน',
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
        type: 'select',
        required: true,
        options: ['6 เดือน', '1 ปี', '2 ปี', '3 ปี', '5 ปี', '10 ปี', 'มากกว่า 10 ปี']
      },
      {
        name: 'purpose',
        label: 'วัตถุประสงค์',
        type: 'select',
        required: true,
        options: ['ซื้อบ้าน/ที่ดิน', 'ซื้อรถ', 'ศึกษาต่อ', 'ธุรกิจ', 'รักษาพยาบาล', 'อื่นๆ']
      },
      {
        name: 'location',
        label: 'ข้อมูลตำแหน่ง (ถ้ามี)',
        type: 'text',
        required: false,
        placeholder: 'กรอกจังหวัด/อำเภอ'
      }
    ]
  }
];