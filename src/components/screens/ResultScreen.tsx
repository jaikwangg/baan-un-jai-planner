import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AppLogo } from '../AppLogo';
import { AssessmentResult } from '../../types/assessment';

interface ResultScreenProps {
  result: AssessmentResult;
  onProceed: () => void;
  onGetAdvice: () => void;
}

export const ResultScreen = ({ result, onProceed, onGetAdvice }: ResultScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary p-4">
        <AppLogo />
      </div>
      
      <div className="p-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {result.passed ? (
                <CheckCircle className="h-16 w-16 text-success" />
              ) : (
                <XCircle className="h-16 w-16 text-destructive" />
              )}
            </div>
            <CardTitle className="text-xl">
              {result.passed ? 'ผลการประเมิน: ผ่าน' : 'ผลการประเมิน: ไม่ผ่าน'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">คะแนนการประเมิน</p>
              <p className="text-2xl font-bold text-foreground">{result.score}/100</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                ระดับความเสี่ยง: 
                <span className={`ml-1 font-medium ${
                  result.riskLevel === 'low' ? 'text-success' :
                  result.riskLevel === 'medium' ? 'text-warning' : 'text-destructive'
                }`}>
                  {result.riskLevel === 'low' ? 'ต่ำ' : 
                   result.riskLevel === 'medium' ? 'ปานกลาง' : 'สูง'}
                </span>
              </p>
            </div>

            {result.passed ? (
              <div className="space-y-3">
                <p className="text-sm">
                  ยินดีด้วย! ท่านมีความพร้อมทางการเงินในระดับที่ดี
                </p>
                <Button onClick={onProceed} className="w-full">
                  ดูคำแนะนำ
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm">
                  ควรปรับปรุงสถานการณ์ทางการเงินก่อนสมัครสินเชื่อ
                </p>
                <div className="flex gap-2">
                  <Button onClick={onProceed} variant="outline" className="flex-1">
                    ไปจัดการหนี้
                  </Button>
                  <Button onClick={onGetAdvice} className="flex-1">
                    ขอคำแนะนำ
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};