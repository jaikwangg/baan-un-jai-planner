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
                <h3 className="font-semibold text-foreground">การเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล</h3>
                <p>
                  บริษัทฯ จะเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์ในการประเมินความเสี่ยงทางการเงิน 
                  และให้คำแนะนำที่เหมาะสมกับสถานการณ์ทางการเงินของท่าน
                </p>
                
                <h3 className="font-semibold text-foreground">ข้อมูลที่เก็บรวบรวม</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>ข้อมูลรายได้และรายจ่าย</li>
                  <li>ข้อมูลหนี้สินและภาระผูกพัน</li>
                  <li>พฤติกรรมการออมและการใช้จ่าย</li>
                  <li>ข้อมูลส่วนบุคคลพื้นฐาน เช่น อายุ การศึกษา อาชีพ</li>
                  <li>เป้าหมายทางการเงิน</li>
                </ul>
                
                <h3 className="font-semibold text-foreground">การใช้ข้อมูล</h3>
                <p>
                  ข้อมูลของท่านจะถูกใช้เพื่อ:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>ประเมินความเสี่ยงและความพร้อมทางการเงิน</li>
                  <li>จัดทำแผนการเงินและคำแนะนำที่เหมาะสม</li>
                  <li>ปรับปรุงและพัฒนาบริการ</li>
                </ul>
                
                <h3 className="font-semibold text-foreground">การรักษาความปลอดภัย</h3>
                <p>
                  บริษัทฯ มีมาตรการรักษาความปลอดภัยของข้อมูลอย่างเข้มงวด และจะไม่เปิดเผยข้อมูลส่วนบุคคล
                  ของท่านแก่บุคคลที่สามโดยไม่ได้รับความยินยอมจากท่าน
                </p>
                
                <h3 className="font-semibold text-foreground">สิทธิของเจ้าของข้อมูล</h3>
                <p>
                  ท่านมีสิทธิในการขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่าน รวมถึงการถอนความยินยอม
                  ในการเก็บรวบรวมและใช้ข้อมูลได้ตลอดเวลา
                </p>
                
                <p className="text-center text-xs text-muted-foreground mt-8">
                  กรุณาเลื่อนลงเพื่ออ่านข้อกำหนดทั้งหมด
                </p>
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