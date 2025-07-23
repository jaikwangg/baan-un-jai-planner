import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AppLogo } from '../AppLogo';
import { ActionPlan } from '../../types/assessment';

interface ActionPlanScreenProps {
  actionPlan: ActionPlan;
  onBack: () => void;
  onRestart: () => void;
}

export const ActionPlanScreen = ({ actionPlan, onBack, onRestart }: ActionPlanScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <AppLogo showText={false} />
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground mb-2">
            บ้านอุ่นใจ ช่วยวางแผน
          </h1>
          <p className="text-sm text-muted-foreground">
            แผนการปรับปรุงสถานการณ์ทางการเงินของท่าน
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📋 แผนปรับพฤติกรรม
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {actionPlan.behaviorPlan.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-medium">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                💳 แผนจัดการหนี้
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {actionPlan.debtManagementPlan.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-medium">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-3">
          <Button onClick={onRestart} className="w-full">
            ประเมินใหม่
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            สามารถกลับมาประเมินใหม่ได้ทุกเมื่อเมื่อสถานการณ์ทางการเงินเปลี่ยนแปลง
          </p>
        </div>
      </div>
    </div>
  );
};