interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  onBack: () => void;
  canGoBack: boolean;
}

export const ProgressHeader = ({
  currentStep,
  totalSteps,
  title,
  subtitle,
  onBack,
  canGoBack,
}: ProgressHeaderProps) => {
  const percentage = (currentStep / totalSteps) * 100;
  const dashArray = 282.6; // 2πr where r = 45

  return (
    <div className="relative bg-white pb-2">
      {/* 🔶 ครึ่งบนของ Card เป็นสีส้ม */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F78B1F] to-[#F8B563] z-0" />

      {/* Content ส่วนหน้า */}
      <div className="relative z-10 px-4 pt-4">

        {/* Page Title */}
        <div className="text-white mt-2">
          <h1 className="text-3xl font-bold leading-tight">ประเมินความเสี่ยง</h1>
          <h2 className="text-3xl font-bold -mt-1">การขอสินเชื่อ</h2>
        </div>

        {/* Info Box */}
        <div className="bg-[#FDD7A0] text-[#5C2F03] mt-4 px-4 py-3 rounded-xl flex items-start gap-2 shadow-sm">
          <img src="/writing.svg" className="w-8 h-8 mt-1" alt="icon" />
          <p className="text-sm leading-snug">
            โปรดระบุข้อมูลตามความจริง<br />
            เพื่อที่จะได้การประเมินที่ถูกต้องที่สุด
          </p>
        </div>

        {/* Floating Card */}
        <div className="bg-white mt-5 p-5 rounded-2xl shadow-md flex items-center h-[180px]">
          {/* Progress Circle */}
          <div className="relative w-28 h-28 ml-2">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ECECEC"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#F78B1F"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(percentage / 100) * dashArray} ${dashArray}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-black font-extrabold text-3xl">
              {currentStep}/{totalSteps}
            </div>
          </div>

          {/* Step Info */}
          <div className="ml-10">
            <div className="text-[#246D73] font-extrabold text-2xl leading-tight">
              {title}
            </div>
            <div className="text-[#246D73] font-extrabold text-2xl leading-tight">
              {subtitle}
            </div>
            <div className="text-[#4E9BA1] text-l mt-1">รายละเอียดเพิ่มเติม</div>
          </div>
        </div>
      </div>
    </div>
  );
};
