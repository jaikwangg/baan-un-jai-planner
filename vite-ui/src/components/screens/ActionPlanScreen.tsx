import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { AppLogo } from '../AppLogo';
import { ActionPlan } from '../../types/assessment';

interface ActionPlanScreenProps {
  actionPlan: ActionPlan;
  onBack: () => void;
  onRestart: () => void;
}

export const ActionPlanScreen = ({ actionPlan, onBack, onRestart }: ActionPlanScreenProps) => {
  return (
    <div className="relative bg-white pb-2">
    <div className="h-[350px] bg-[#FFA726] px-4 py-6 text-[#212121]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <AppLogo showText={false} />
        <div className="w-8" />
      </div>

      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        บ้านอุ่นใจ ช่วยวางแผน
      </h1>

      {/* ✅ แผนปรับพฤติกรรม */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="font-bold text-lg mb-4">แผนปรับพฤติกรรม</h2>
        <ul className="space-y-2 text-sm">
          {actionPlan.behaviorPlan.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ แผนแนะนำการผ่อนชำระ */}
      {actionPlan.debtPlans.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-bold mb-4">แผนแนะนำการผ่อนชำระ</h2>
          {actionPlan.debtPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-[#FFF3E0] rounded-xl p-4 shadow-sm"
            >
              <p className={`font-semibold mb-2 ${getPlanColor(plan.label)}`}>
                {plan.label} : {plan.description}
              </p>
              <ul className="space-y-1 text-sm">
                {plan.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gray-700 mt-1" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ปุ่มประเมินใหม่ */}
      <div className="mt-10">
        <Button
          className="w-full bg-[#FB8C00] hover:bg-[#F57C00] text-white rounded-full py-3 text-base font-semibold"
          onClick={onRestart}
        >
          ประเมินใหม่
        </Button>
        <p className="text-center text-sm mt-2 text-white">
          สามารถกลับมาประเมินใหม่ได้ทุกเมื่อเมื่อสถานการณ์ทางการเงินเปลี่ยนแปลง
        </p>
      </div>
    </div>
    </div>
  );
};

// Helper สำหรับเลือกสีแผน A/B/C
function getPlanColor(label: string) {
  if (label.includes('A')) return 'text-green-600';
  if (label.includes('B')) return 'text-orange-500';
  if (label.includes('C')) return 'text-red-500';
  return 'text-gray-800';
}
