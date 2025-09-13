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
            <CardTitle className="text-[#FF9F00] text-lg">การยินยอมให้ข้อมูลส่วนบุคคล</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea
              className="h-64 md:h-96 w-full border rounded p-4"
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
                <div className="space-y-3">
                  <p>
                    • ผู้ใช้บริการจะต้องรายงานข้อมูลที่เป็นความจริง 
                    พร้อมทั้งมีข้อมูลประกอบที่เพียงพอ โดยข้อมูลที่ถูกนำเข้าจะต้องเป็นของผู้ใช้
                    บริการหรือได้รับความยินยอมจากบุคคลที่
                    เกี่ยวข้องแล้วเท่านั้นทางแอพจะไม่รับผิดชอบต่อสิ่งที่ผู้ใช้บริการ
                    ละเมิดและสร้างความเสียหายใดๆ กับผู้อื่นใน ทุกกรณี โดยจะถือว่าเป็นความรับผิดชอบ ของผู้ใช้บริการนั้นๆแต่เพียงผู้เดียว
                  </p>
                  
                  <p>
                    • หากผู้ใช้บริการพบข้อมูลที่ไม่เหมาะสมหรือ
                    ไม่เป็นความจริงผู้ใช้บริการสามารถร้องเรียน
                    รายงานที่ไม่เหมาะสมได้
                  </p>
                  
                  <p className="bg-gray-100 p-3 rounded">
                    <strong className="text-foreground">การกดยอมรับ หมายถึงผู้ใช้ยินยอม
                    ตามนโยบาย พ.ร.บ.คุ้มครอง
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