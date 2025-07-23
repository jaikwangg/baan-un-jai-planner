import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import { AppLogo } from '../AppLogo';

interface PDPAScreenProps {
  onConsent: (consented: boolean) => void;
}

export const PDPAScreen = ({ onConsent }: PDPAScreenProps) => {
  const [hasReadTerms, setHasReadTerms] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary p-4">
        <AppLogo />
      </div>
      
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ข้อกำหนดและเงื่อนไขการใช้งาน</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea 
              className="h-64 w-full border rounded p-4"
              onScroll={(e) => {
                const element = e.target as HTMLElement;
                const isNearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 20;
                console.log('Scroll detected:', { 
                  scrollHeight: element.scrollHeight, 
                  scrollTop: element.scrollTop, 
                  clientHeight: element.clientHeight,
                  isNearBottom 
                });
                if (isNearBottom) {
                  console.log('User has read terms, enabling consent button');
                  setHasReadTerms(true);
                }
              }}
            >
              <div className="space-y-4 text-sm text-muted-foreground">
                <h3 className="font-semibold text-foreground">การยินยอมให้ข้อมูลส่วนบุคคล</h3>
                
                <div className="space-y-3">
                  <p>
                    • ผู้ใช้บริการจะต้องรายงานข้อมูลที่เป็นความจริงลง
                    ใน system หากพบข้อมูลที่เพิ่มมือหรือ
                    ไม่ข้อมูลที่ถูกต้องเข้าจะต้องรีบแก้ไขให้ถูกต้อง
                    โดยไม่มีการค่ารักษารองความยิ่งยวดหรือผู้ใช้ใน
                    ทุกกรณี ไม่ว่าจะเป็นความเสียหายไม่ได้โดย ทันคุ้นใน
                    การทำเร้าใช้บริการแทรกซอรจในระบบ
                  </p>
                  
                  <p>
                    • หากผู้ใช้บริการพบข้อมูลที่ไม่หน้าสมหรือ
                    ไม่เป็นความจริงผู้ใช้บริการสามารถรองเรียน
                    รายงานที่ไม่เหมาะสมได้
                  </p>
                  
                  <p className="bg-gray-100 p-3 rounded">
                    <strong className="text-foreground">การเก็บข้อมูล หมายถึงใช้ยวนข้อม
                    ตามใจมาย พ.ร.บ.คุ้มครอง
                    ข้อมูลส่วนบุคคล(PDPA)</strong>
                  </p>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="terms"
                checked={hasReadTerms}
                onCheckedChange={(checked) => setHasReadTerms(!!checked)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขการใช้งานแล้ว
              </label>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onConsent(false)}
              >
                ไม่ยินยอม
              </Button>
              <Button 
                className="flex-1"
                onClick={() => onConsent(true)}
                disabled={!hasReadTerms}
              >
                ยินยอม
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};