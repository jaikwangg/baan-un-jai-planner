import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { AssessmentResult } from '../../types/assessment';
import { AppLogo } from '../AppLogo';

interface ResultScreenProps {
  result: AssessmentResult;
  onProceed: () => void;
  onGetAdvice: () => void;
}

export const ResultScreen = ({ result, onProceed, onGetAdvice }: ResultScreenProps) => {
  const passed = result.passed;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#FFA726] text-center">

      {/* Card */}
      <div className="bg-white rounded-t-2xl shadow-md w-[300px] mt-40 px-6 py-8">
        <h2 className="text-xl font-bold text-[#00796B] mb-4">
          ผลการประเมิน{passed ? '' : 'การขอสินเชื่อเบื้องต้น'}
        </h2>

        {!passed && (
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-[#FFA000]" />
          </div>
        )}

        <p className="text-base font-medium text-[#E65100]">
          {passed
            ? 'คุณผ่านเกณฑ์การประเมินเบื้องต้น'
            : 'การประเมินพบว่า\nคุณยังไม่ผ่านเกณฑ์การประเมินในตอนนี้'}
        </p>

        {!passed && (
          <>
            <p className="text-sm text-gray-700 mt-4">
              แต่ไม่ต้องห่วง<br />เราช่วยคุณวางแผนให้ผ่านได้!
            </p>

            <div className="flex gap-3 mt-6">
              <Button onClick={onProceed} variant="outline" className="flex-1 text-[#E65100] border-[#E65100]">
                ไม่ต้องการ
              </Button>
              <Button onClick={onGetAdvice} className="flex-1 bg-[#FF9800] hover:bg-[#FB8C00] text-white">
                ต้องการ
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
