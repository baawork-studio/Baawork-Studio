import type { CapabilityCard, MockupTemplate, ScreenSlot, SystemPreviewCopy } from "./types";

export const pageGutter = "clamp(24px, 6.27vw, 127.5px)";
export const detailCarouselVerticalGap = "24px";
export const detailCarouselEdgeTolerance = 24;

export const mockupAssets: Record<MockupTemplate, string> = {
  macbook: '/project-detail-macbook.png',
  macbookMobile: '/project-detail-macbook-mobile.png',
  mobiles: '/project-detail-mobiles.png',
};

export const screenSlots: Record<MockupTemplate, ScreenSlot[]> = {
  macbook: [
    {
      key: 'desktop',
      left: '31.0417%',
      top: '19.4444%',
      width: '41.4062%',
      height: '46.8519%',
      mask: '/project-screen-masks/macbook-screen.png',
    },
  ],
  macbookMobile: [
    {
      key: 'desktop',
      left: '31.0417%',
      top: '19.4444%',
      width: '41.4062%',
      height: '46.8519%',
      mask: '/project-screen-masks/macbook-mobile-desktop.png',
    },
    {
      key: 'mobile',
      left: '70.4167%',
      top: '37.8704%',
      width: '11.3542%',
      height: '43.6111%',
      mask: '/project-screen-masks/macbook-mobile-phone.png',
    },
  ],
  mobiles: [
    {
      key: 'mobile1',
      left: '28.8021%',
      top: '26.7593%',
      width: '13.2812%',
      height: '53.6111%',
      mask: '/project-screen-masks/mobiles-left.png',
    },
    {
      key: 'mobile2',
      left: '42.0833%',
      top: '19.6296%',
      width: '15.8333%',
      height: '60.6481%',
      mask: '/project-screen-masks/mobiles-center.png',
    },
    {
      key: 'mobile3',
      left: '57.8646%',
      top: '26.7593%',
      width: '13.3333%',
      height: '53.6111%',
      mask: '/project-screen-masks/mobiles-right.png',
    },
  ],
};

export const projectVisuals: Record<string, { accent: string; tint: string; template: MockupTemplate }> = {
  'ai-command-center': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile' },
  'ai-sales-forecast': { accent: '#7C3AED', tint: '#F5F0FF', template: 'macbook' },
  'ai-document-review': { accent: '#0EA5E9', tint: '#EFF9FF', template: 'mobiles' },
  'ai-service-agent': { accent: '#10B981', tint: '#ECFDF5', template: 'macbookMobile' },
  'ai-api-monitor': { accent: '#F97316', tint: '#FFF7ED', template: 'macbook' },
  'operations-dashboard': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile' },
  'booking-platform': { accent: '#2563EB', tint: '#EFF6FF', template: 'macbook' },
  'crm-workspace': { accent: '#8B5CF6', tint: '#F5F3FF', template: 'macbookMobile' },
  'inventory-control': { accent: '#059669', tint: '#ECFDF5', template: 'mobiles' },
  'analytics-portal': { accent: '#DC2626', tint: '#FEF2F2', template: 'macbook' },
};

export const capabilityCardsBySlug: Record<string, CapabilityCard[]> = {
  'ai-command-center': [
    {
      title: 'รวมสถานะงาน',
      description: 'ดึงข้อมูลจากหลายทีมมาไว้ในหน้าจอเดียว เพื่อให้เห็นภาพรวมงานที่กำลังเดินอยู่แบบเรียลไทม์',
    },
    {
      title: 'วิเคราะห์ความเสี่ยง',
      description: 'สรุปเคสที่มีแนวโน้มล่าช้า ผิดปกติ หรือควรได้รับการดูแลก่อนจากสัญญาณสำคัญของระบบ',
    },
    {
      title: 'จัดลำดับเคสเร่งด่วน',
      description: 'ช่วยทีมเลือกงานที่ควรลงมือก่อน ลดเวลาค้นหาข้อมูล และทำให้การตัดสินใจแม่นยำขึ้น',
    },
    {
      title: 'สรุปสำหรับผู้บริหาร',
      description: 'เปลี่ยนข้อมูลปฏิบัติการให้เป็น insight ที่อ่านง่าย พร้อมนำไปใช้ประชุมหรือวางแผนต่อได้ทันที',
    },
  ],
  'ai-sales-forecast': [
    {
      title: 'พยากรณ์ยอดขาย',
      description: 'ประเมินแนวโน้มยอดขายจากข้อมูล pipeline และประวัติลูกค้า เพื่อช่วยวางแผนเป้าหมายล่วงหน้า',
    },
    {
      title: 'แยกกลุ่มลูกค้า',
      description: 'ช่วยระบุลูกค้าที่มีโอกาสปิดการขายสูง เพื่อให้ทีมขายโฟกัสกับงานที่มีผลต่อรายได้มากที่สุด',
    },
    {
      title: 'ติดตาม performance',
      description: 'แสดงตัวเลขสำคัญของทีมขายในหน้าเดียว พร้อมเทียบผลลัพธ์กับเป้าหมายของแต่ละช่วงเวลา',
    },
  ],
  'ai-document-review': [
    {
      title: 'อ่านเอกสารอัตโนมัติ',
      description: 'ช่วยสกัดข้อมูลสำคัญจากเอกสาร ลดงานอ่านซ้ำ และทำให้ทีมเห็นใจความสำคัญได้เร็วขึ้น',
    },
    {
      title: 'จัดหมวดหมู่คำขอ',
      description: 'แยกประเภทเอกสารและคำขอตามเงื่อนไขงานจริง เพื่อส่งต่อให้ทีมที่เกี่ยวข้องได้เป็นระบบ',
    },
    {
      title: 'ตรวจสถานะงานเอกสาร',
      description: 'ติดตามว่างานไหนอ่านแล้ว รอตรวจ หรือควรส่งต่อให้คนตรวจละเอียดต่อจากหน้าเดียว',
    },
  ],
  'ai-service-agent': [
    {
      title: 'แนะนำคำตอบ',
      description: 'อ่านบริบทบทสนทนาแล้วช่วยเสนอคำตอบที่เหมาะกับเคส เพื่อให้ทีมตอบกลับได้เร็วขึ้น',
    },
    {
      title: 'ติดตามงานค้าง',
      description: 'แสดงเคสที่ยังไม่ปิด งานที่รอการตอบกลับ และรายการที่ควรติดตามต่ออย่างชัดเจน',
    },
    {
      title: 'ควบคุมคุณภาพบริการ',
      description: 'สรุปคุณภาพการสื่อสารและจุดที่ควรปรับปรุง เพื่อรักษามาตรฐานของทีมบริการ',
    },
  ],
  'ai-api-monitor': [
    {
      title: 'ดูสุขภาพ API',
      description: 'ติดตาม latency, error rate และสถานะ service เพื่อให้ทีมเห็นปัญหาได้ก่อนกระทบผู้ใช้',
    },
    {
      title: 'ตรวจจับ anomaly',
      description: 'ระบุเหตุการณ์ผิดปกติจากข้อมูลระบบ และช่วยแยกเคสที่ควรตรวจสอบเร่งด่วน',
    },
    {
      title: 'แจ้งเตือนทีมดูแลระบบ',
      description: 'ส่งสัญญาณเตือนเมื่อ service มีแนวโน้มผิดปกติ เพื่อให้แก้ไขได้จากข้อมูลที่ชัดเจน',
    },
  ],
  'operations-dashboard': [
    {
      title: 'ติดตามคำขอ',
      description: 'รวมคำขอและสถานะงานจากทีมปฏิบัติการไว้ในที่เดียว เพื่อให้จัดลำดับงานประจำวันง่ายขึ้น',
    },
    {
      title: 'ดูสถานะส่งมอบ',
      description: 'แสดงงานที่กำลังดำเนินการ งานที่ติดขัด และงานที่พร้อมส่งมอบให้ตรวจสอบได้รวดเร็ว',
    },
    {
      title: 'กรองข้อมูลตามทีม',
      description: 'ช่วยให้ผู้ดูแลเลือกดูข้อมูลตามทีม ประเภทงาน หรือสถานะ เพื่อแก้ปัญหาได้ตรงจุด',
    },
  ],
  'booking-platform': [
    {
      title: 'เลือกบริการ',
      description: 'ให้ลูกค้าเลือกบริการและรายละเอียดที่ต้องการผ่านขั้นตอนที่สั้นและเข้าใจง่าย',
    },
    {
      title: 'ตรวจสอบเวลาว่าง',
      description: 'เชื่อมข้อมูลตารางจริงเพื่อให้เห็นช่วงเวลาที่จองได้ และลดการจองซ้ำหรือชนกัน',
    },
    {
      title: 'จัดการหลังบ้าน',
      description: 'ให้ทีมดูรายการจอง ปรับสถานะ และจัดการตารางบริการได้จากระบบเดียว',
    },
  ],
  'crm-workspace': [
    {
      title: 'รวมข้อมูลลูกค้า',
      description: 'รวมประวัติลูกค้า บทสนทนา และงานขายไว้ในหน้าเดียว เพื่อให้ทีมเห็นบริบทครบก่อนติดต่อ',
    },
    {
      title: 'ติดตาม follow-up',
      description: 'แจ้งเตือนงานติดตามและกิจกรรมถัดไป เพื่อให้ทีมขายไม่พลาดจังหวะสำคัญ',
    },
    {
      title: 'ดู pipeline งานขาย',
      description: 'แสดงสถานะดีลและขั้นตอนการขาย ช่วยให้ทีมวางแผนปิดงานได้เป็นระบบมากขึ้น',
    },
  ],
  'inventory-control': [
    {
      title: 'ตรวจนับสินค้า',
      description: 'ช่วยทีมตรวจนับและอัปเดตจำนวนสินค้าให้เป็นปัจจุบันจาก workflow ที่ใช้งานง่าย',
    },
    {
      title: 'แจ้งเตือนสต็อกต่ำ',
      description: 'แสดงรายการที่ควรเติมหรือควรตรวจสอบก่อน เพื่อป้องกันสินค้าขาดหรือข้อมูลคลาดเคลื่อน',
    },
    {
      title: 'เชื่อม Barcode Workflow',
      description: 'รองรับการทำงานกับรหัสสินค้าและกระบวนการตรวจนับที่ต้องใช้ข้อมูลจริงในคลัง',
    },
  ],
  'analytics-portal': [
    {
      title: 'รวม KPI สำคัญ',
      description: 'รวมตัวเลขหลักของธุรกิจไว้ในหน้ารายงานเดียว เพื่อให้ผู้บริหารเห็นภาพรวมได้เร็ว',
    },
    {
      title: 'เปรียบเทียบแนวโน้ม',
      description: 'แสดงกราฟและข้อมูลเปรียบเทียบตามช่วงเวลา เพื่อช่วยมองเห็นการเปลี่ยนแปลงที่สำคัญ',
    },
    {
      title: 'ต่อยอดรายงานใหม่',
      description: 'ออกแบบโครงสร้างข้อมูลให้เพิ่มรายงานหรือมุมมองใหม่ได้ง่ายเมื่อธุรกิจขยายต่อ',
    },
  ],
};

export const systemPreviewCopyBySlug: Record<string, SystemPreviewCopy[]> = {
  'ai-command-center': [
    {
      title: 'หน้ารวมสถานะงาน',
      description: 'รวมเคส งานค้าง สถานะล่าสุด และสัญญาณสำคัญไว้ในมุมมองเดียว เพื่อให้ทีมเห็นภาพรวมก่อนลงรายละเอียด',
      focus: 'ภาพรวมแบบเรียลไทม์',
    },
    {
      title: 'มุมมองเคสเร่งด่วน',
      description: 'แยกงานที่มีความเสี่ยงหรือควรจัดการก่อน พร้อมข้อมูลประกอบที่ช่วยให้ตัดสินใจได้เร็วขึ้น',
      focus: 'จัดลำดับงานสำคัญ',
    },
    {
      title: 'สรุปสำหรับหัวหน้าทีม',
      description: 'เปลี่ยนข้อมูลปฏิบัติการให้เป็น insight ที่อ่านง่าย เหมาะกับการประชุม ติดตามงาน และวางแผนต่อ',
      focus: 'อ่านง่ายสำหรับผู้บริหาร',
    },
  ],
  'ai-sales-forecast': [
    {
      title: 'แดชบอร์ดยอดขาย',
      description: 'แสดงยอดขาย เป้าหมาย และแนวโน้มสำคัญให้ทีมเห็นสถานะของ pipeline ได้เร็วจากหน้าจอเดียว',
      focus: 'มองเห็นแนวโน้มยอดขาย',
    },
    {
      title: 'คะแนนโอกาสปิดการขาย',
      description: 'ช่วยจัดลำดับลูกค้าที่ควรติดตามก่อนจากพฤติกรรมและข้อมูลย้อนหลัง เพื่อให้ทีมขายใช้เวลาได้คุ้มขึ้น',
      focus: 'โฟกัสลูกค้าที่มีโอกาสสูง',
    },
    {
      title: 'รายงานเปรียบเทียบทีม',
      description: 'ดูผลลัพธ์ตามช่วงเวลา ทีม หรือแคมเปญ เพื่อให้ผู้จัดการประเมินภาพรวมและปรับแผนได้ทัน',
      focus: 'รายงานพร้อมตัดสินใจ',
    },
  ],
  'ai-document-review': [
    {
      title: 'หน้าจออ่านเอกสาร',
      description: 'สกัดใจความสำคัญจากเอกสารและแสดงผลเป็นข้อมูลที่ตรวจทานต่อได้ง่าย ลดเวลาการอ่านซ้ำ',
      focus: 'อ่านเอกสารเร็วขึ้น',
    },
    {
      title: 'รายการเอกสารรอตรวจ',
      description: 'แสดงสถานะเอกสารแต่ละรายการว่าอ่านแล้ว รอตรวจ หรือควรส่งต่อให้ทีมที่เกี่ยวข้อง',
      focus: 'คุมสถานะเอกสาร',
    },
    {
      title: 'สรุปข้อมูลสำคัญ',
      description: 'รวมฟิลด์สำคัญ เงื่อนไข และประเด็นที่ควรตรวจสอบ เพื่อให้คนทำงานตัดสินใจต่อได้ทันที',
      focus: 'ลดงานคัดข้อมูล',
    },
  ],
  'ai-service-agent': [
    {
      title: 'กล่องข้อความบริการ',
      description: 'รวมบทสนทนา เคสค้าง และบริบทลูกค้าไว้ในหน้าจอเดียว เพื่อให้ทีมตอบกลับได้ต่อเนื่อง',
      focus: 'เห็นบริบทก่อนตอบ',
    },
    {
      title: 'คำตอบแนะนำจาก AI',
      description: 'เสนอคำตอบที่เหมาะกับสถานการณ์ พร้อมให้ทีมปรับแก้ก่อนส่งจริง เพื่อรักษาคุณภาพบริการ',
      focus: 'ตอบเร็วแต่ยังคุมคุณภาพ',
    },
    {
      title: 'มุมมองคุณภาพงานบริการ',
      description: 'สรุปเคสที่ควรติดตาม ระยะเวลาตอบกลับ และจุดที่ต้องดูแลต่อ เพื่อให้บริการไม่หลุดมาตรฐาน',
      focus: 'ติดตามงานบริการครบ',
    },
  ],
  'ai-api-monitor': [
    {
      title: 'สถานะ API แบบเรียลไทม์',
      description: 'ติดตาม latency, error rate และสุขภาพ service เพื่อให้ทีมเห็นปัญหาก่อนกระทบผู้ใช้จริง',
      focus: 'เฝ้าระวังระบบสำคัญ',
    },
    {
      title: 'เหตุการณ์ผิดปกติ',
      description: 'แยกเหตุการณ์ที่ควรตรวจสอบก่อน พร้อมระดับความรุนแรงและบริบทที่ช่วยให้แก้ไขได้เร็ว',
      focus: 'จับ anomaly ได้ไว',
    },
    {
      title: 'บันทึกการแจ้งเตือน',
      description: 'เก็บประวัติการแจ้งเตือนและการตอบสนองของทีม เพื่อใช้ติดตามคุณภาพการดูแล production',
      focus: 'ตรวจสอบย้อนหลังได้',
    },
  ],
  'operations-dashboard': [
    {
      title: 'ภาพรวมงานหลังบ้าน',
      description: 'รวมคำขอ งานที่กำลังทำ และสถานะส่งมอบไว้ในหน้าจอเดียว เพื่อให้ทีมจัดงานประจำวันได้ง่าย',
      focus: 'คุม workflow หลังบ้าน',
    },
    {
      title: 'สถานะคำขอ',
      description: 'แยกงานตามสถานะ ผู้รับผิดชอบ และความเร่งด่วน เพื่อให้เห็นงานที่ควรจัดการต่อทันที',
      focus: 'ติดตามคำขอชัดเจน',
    },
    {
      title: 'มุมมองส่งมอบงาน',
      description: 'ดูรายการที่พร้อมส่งมอบ งานที่ติดขัด และประวัติการอัปเดต เพื่อให้ประสานงานได้เป็นระบบ',
      focus: 'ลดงานตามข้อมูลซ้ำ',
    },
  ],
  'booking-platform': [
    {
      title: 'เลือกบริการและเวลา',
      description: 'ทำให้ลูกค้าเลือกบริการ กรอกรายละเอียด และตรวจสอบเวลาว่างได้จากขั้นตอนที่สั้นและชัดเจน',
      focus: 'จองง่ายบนทุกอุปกรณ์',
    },
    {
      title: 'รายการจองของทีม',
      description: 'ทีมหลังบ้านเห็นรายการจอง สถานะ และรายละเอียดลูกค้าในที่เดียว ลดการตรวจสอบหลายช่องทาง',
      focus: 'จัดการตารางบริการ',
    },
    {
      title: 'สถานะการยืนยัน',
      description: 'ติดตามรายการที่รอยืนยัน ยืนยันแล้ว หรือยกเลิก เพื่อให้ทีมตอบกลับลูกค้าได้รวดเร็ว',
      focus: 'ลดการจองซ้ำ',
    },
  ],
  'crm-workspace': [
    {
      title: 'โปรไฟล์ลูกค้า',
      description: 'รวมข้อมูลลูกค้า ประวัติการติดต่อ และบันทึกสำคัญ เพื่อให้ทีมเห็นบริบทก่อนเริ่มคุย',
      focus: 'เข้าใจลูกค้าเร็วขึ้น',
    },
    {
      title: 'Pipeline งานขาย',
      description: 'แสดงสถานะดีล ขั้นตอนถัดไป และความคืบหน้าของทีมขาย เพื่อช่วยวางแผนปิดงานได้ดีขึ้น',
      focus: 'คุมงานขายเป็นระบบ',
    },
    {
      title: 'งานติดตามถัดไป',
      description: 'จัดลำดับ follow-up และแจ้งเตือนจังหวะสำคัญ เพื่อให้ทีมไม่พลาดโอกาสในการดูแลลูกค้า',
      focus: 'ไม่พลาดงานสำคัญ',
    },
  ],
  'inventory-control': [
    {
      title: 'ภาพรวมสต็อก',
      description: 'แสดงจำนวนสินค้า สถานะคลัง และรายการเคลื่อนไหวล่าสุด เพื่อให้ทีมเห็นข้อมูลที่ต้องใช้ทันที',
      focus: 'เห็นจำนวนล่าสุด',
    },
    {
      title: 'รายการต้องเติมสินค้า',
      description: 'แยกสินค้าที่ใกล้หมดหรือควรตรวจสอบก่อน ช่วยลดความเสี่ยงของสินค้าขาดและข้อมูลคลาดเคลื่อน',
      focus: 'ป้องกันสต็อกขาด',
    },
    {
      title: 'สแกนและตรวจนับ',
      description: 'รองรับ workflow ตรวจนับด้วยรหัสสินค้า ให้ทีมอัปเดตข้อมูลได้เร็วและลดงานกรอกซ้ำ',
      focus: 'ทำงานคลังเร็วขึ้น',
    },
  ],
  'analytics-portal': [
    {
      title: 'ภาพรวมตัวชี้วัด',
      description: 'รวม KPI สำคัญของธุรกิจไว้ในแดชบอร์ดเดียว เพื่อให้ทีมผู้บริหารอ่านผลลัพธ์ได้เร็ว',
      focus: 'ดูภาพรวมธุรกิจ',
    },
    {
      title: 'รายงานเปรียบเทียบ',
      description: 'เปรียบเทียบข้อมูลตามช่วงเวลา ทีม หรือแหล่งข้อมูล เพื่อช่วยมองเห็นแนวโน้มที่ควรสนใจ',
      focus: 'เห็นแนวโน้มชัดขึ้น',
    },
    {
      title: 'Insight สำหรับตัดสินใจ',
      description: 'สรุปประเด็นสำคัญจากข้อมูลจำนวนมากให้เป็นข้อความและกราฟที่นำไปวางแผนต่อได้ง่าย',
      focus: 'เปลี่ยนข้อมูลเป็น insight',
    },
  ],
};

export const defaultSystemPreviewCopy: SystemPreviewCopy[] = [
  {
    title: 'ภาพรวมระบบ',
    description: 'จัดหน้าจอหลักให้เห็นข้อมูลสำคัญก่อน เพื่อให้ทีมเข้าใจสถานะงานและตัดสินใจต่อได้เร็ว',
    focus: 'อ่านภาพรวมได้ทันที',
  },
  {
    title: 'รายละเอียดงาน',
    description: 'แสดงข้อมูลเชิงลึกของแต่ละรายการอย่างเป็นระบบ ลดการค้นหาข้อมูลจากหลายแหล่ง',
    focus: 'ลงรายละเอียดได้ง่าย',
  },
  {
    title: 'มุมมองสำหรับทีม',
    description: 'ออกแบบ workflow ให้ทีมใช้ร่วมกันได้จริง ตั้งแต่ตรวจสอบ ติดตาม ไปจนถึงส่งมอบงาน',
    focus: 'ทำงานร่วมกันได้ดีขึ้น',
  },
];


export const techIcons: Record<string, { src?: string; label?: string; invert?: boolean }> = {
  'Next.js': { src: '/tools/nextdotjs.svg' },
  React: { src: '/tools/react.svg' },
  TypeScript: { src: '/tools/typescript.svg' },
  MUI: { src: '/tools/mui.svg' },
  OCR: { label: 'OCR' },
  'AI Workflow': { label: 'AI' },
  'Forecast Model': { label: 'ML' },
  'Document AI': { label: 'Doc' },
  'Chat Workflow': { label: 'Chat' },
  'AI Assistant': { label: 'AI' },
  Monitoring: { label: 'Mon' },
  Workflow: { label: 'Flow' },
  'Booking Flow': { label: 'Book' },
  'CRM Workflow': { label: 'CRM' },
  'Barcode Workflow': { label: 'Code' },
  'Data Visualization': { label: 'Chart' },
};

export const descriptionHighlightTerms = [
  'หน้าจอเดียว',
  'ความเสี่ยง',
  'เคสเร่งด่วน',
  'สัญญาณ',
  'การตัดสินใจเร็วและแม่นยำขึ้น',
  'คาดการณ์ยอดขาย',
  'พฤติกรรมลูกค้า',
  'โอกาสปิดการขาย',
  'สกัดข้อมูลสำคัญ',
  'จัดหมวดหมู่คำขอ',
  'แนะนำคำตอบ',
  'ติดตามงานค้าง',
  'error rate',
  'เหตุการณ์ผิดปกติ',
  'คำขอ',
  'สถานะส่งมอบ',
  'ตรวจสอบช่วงเวลาว่าง',
  'ยืนยันรายการ',
  'ประวัติการติดต่อ',
  'follow-up',
  'จำนวนสินค้า',
  'รายการที่ต้องเติม',
  'ตัวเลขสำคัญ',
  'insight',
];
