'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { fetchProject, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';

type ProjectDetailPageProps = {
  slug: string;
  initialProject?: Project;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';
const detailCarouselVerticalGap = '24px';
const detailCarouselEdgeTolerance = 24;

type MockupTemplate = 'macbook' | 'macbookMobile' | 'mobiles';
type ScreenImageKey = 'desktop' | 'mobile' | 'mobile1' | 'mobile2' | 'mobile3';
type ScreenSlot = {
  key: ScreenImageKey;
  left: string;
  top: string;
  width: string;
  height: string;
  mask: string;
};
type CapabilityCard = {
  title: string;
  description: string;
};
type CapabilityDetailRow = {
  label: string;
  text: string;
};
type SystemPreviewCopy = {
  title: string;
  description: string;
  focus: string;
};
type SystemPreviewItem = SystemPreviewCopy & {
  imageUrl: string;
};

const mockupAssets: Record<MockupTemplate, string> = {
  macbook: '/project-detail-macbook.png',
  macbookMobile: '/project-detail-macbook-mobile.png',
  mobiles: '/project-detail-mobiles.png',
};

const screenSlots: Record<MockupTemplate, ScreenSlot[]> = {
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

const projectVisuals: Record<string, { accent: string; tint: string; template: MockupTemplate }> = {
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

const capabilityCardsBySlug: Record<string, CapabilityCard[]> = {
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

const systemPreviewCopyBySlug: Record<string, SystemPreviewCopy[]> = {
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

const defaultSystemPreviewCopy: SystemPreviewCopy[] = [
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

function getProjectVisual(project: Project) {
  return projectVisuals[project.slug] ?? {
    accent: palette.primaryPink,
    tint: '#FFF0F8',
    template: 'macbookMobile' as const,
  };
}

function useDetailCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({ canScrollPrev: false, canScrollNext: false });

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const nextState = {
      canScrollPrev: carousel.scrollLeft > detailCarouselEdgeTolerance,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - detailCarouselEdgeTolerance,
    };

    setCarouselState((current) => {
      if (
        current.canScrollPrev === nextState.canScrollPrev &&
        current.canScrollNext === nextState.canScrollNext
      ) {
        return current;
      }

      return nextState;
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    carousel.scrollLeft = 0;
    updateCarouselState();

    const handleScroll = () => updateCarouselState();
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateCarouselState]);

  const scrollCards = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (direction === -1 && !carouselState.canScrollPrev) return;
    if (direction === 1 && !carouselState.canScrollNext) return;

    carousel.scrollBy({ left: direction * 392, behavior: 'smooth' });
  };

  return { carouselRef, carouselState, scrollCards };
}

function carouselControlSx(enabled: boolean) {
  return {
    display: 'grid',
    placeItems: 'center',
    width: 48,
    height: 48,
    p: 0,
    border: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
    appearance: 'none',
    bgcolor: enabled ? '#E8E8ED' : '#F5F5F7',
    color: enabled ? '#6E6E73' : '#C7C7CC',
    cursor: enabled ? 'pointer' : 'default',
    transition: 'background-color 180ms ease, color 180ms ease',
    '&:hover': {
      bgcolor: enabled ? '#D2D2D7' : '#F5F5F7',
      color: enabled ? '#1D1D1F' : '#C7C7CC',
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  };
}

function getCapabilityCards(project: Project) {
  const cards = capabilityCardsBySlug[project.slug] ?? project.highlights.map((highlight) => ({
    title: highlight,
    description: `ออกแบบให้ทีมใช้ ${highlight} ได้จากระบบเดียว พร้อมเชื่อมข้อมูลจริงและต่อยอด workflow ได้ในระยะยาว`,
  }));

  const supportCards: CapabilityCard[] = [
    {
      title: 'เชื่อมต่อข้อมูลจริง',
      description: 'ต่อข้อมูลจาก API ฐานข้อมูล และระบบหลังบ้าน เพื่อให้สิ่งที่แสดงในหน้าใช้งานตรงกับข้อมูลจริง',
    },
    {
      title: 'ใช้งานได้ทุกอุปกรณ์',
      description: 'วาง responsive layout ให้เหมาะกับ desktop, tablet และ mobile เพื่อให้ทีมเข้าถึงงานได้สะดวก',
    },
    {
      title: 'ต่อยอดระบบได้',
      description: 'จัดโครงสร้างหน้าบ้าน หลังบ้าน และข้อมูลให้เพิ่มฟีเจอร์ใหม่ได้ง่ายเมื่อ workflow เติบโต',
    },
  ];

  const nextCards = [...cards];
  for (const supportCard of supportCards) {
    if (nextCards.length >= 5) break;
    if (!nextCards.some((card) => card.title === supportCard.title)) {
      nextCards.push(supportCard);
    }
  }

  return nextCards;
}

function getCapabilityDetailRows(project: Project, card: CapabilityCard): CapabilityDetailRow[] {
  const title = card.title;

  const patterns = [
    {
      test: /(รวม|ติดตาม|ดูสถานะ|KPI|performance)/i,
      problem: 'ข้อมูลสำคัญกระจายอยู่หลายจุด ทำให้ทีมเห็นภาพรวมช้า',
      outcome: 'เห็นสถานะล่าสุดในหน้าเดียว และรู้ทันทีว่าควรจัดการอะไรต่อ',
    },
    {
      test: /(วิเคราะห์|ตรวจจับ|ความเสี่ยง|anomaly|แนวโน้ม|พยากรณ์|เปรียบเทียบ)/i,
      problem: 'ทีมต้องอ่านข้อมูลจำนวนมากก่อนจะเห็นสัญญาณที่ควรระวัง',
      outcome: 'มองเห็นโอกาส ปัญหา และความเสี่ยงได้เร็วขึ้นก่อนกระทบงานจริง',
    },
    {
      test: /(จัดลำดับ|เร่งด่วน|แจ้งเตือน|follow-up|สต็อกต่ำ)/i,
      problem: 'งานสำคัญปะปนกับงานทั่วไป ทำให้ทีมเลือกงานก่อนหลังได้ยาก',
      outcome: 'ลดเวลาคัดกรองงาน และช่วยให้ทีมลงมือกับเรื่องสำคัญก่อน',
    },
    {
      test: /(เอกสาร|อ่าน|หมวดหมู่|คำขอ|OCR)/i,
      problem: 'เอกสารและคำขอต้องใช้เวลาคัดแยก อ่านซ้ำ และส่งต่อหลายรอบ',
      outcome: 'อ่านใจความสำคัญเร็วขึ้น ส่งต่องานถูกทีม และลดงานซ้ำของคนทำงาน',
    },
    {
      test: /(บริการ|คำตอบ|สนทนา|คุณภาพ)/i,
      problem: 'ทีมบริการต้องตอบให้เร็ว แต่ยังต้องรักษาคุณภาพและบริบทของแต่ละเคส',
      outcome: 'ตอบกลับได้เร็วขึ้น ติดตามเคสค้างได้ครบ และรักษามาตรฐานบริการ',
    },
    {
      test: /(จอง|เวลา|ตาราง|หลังบ้าน)/i,
      problem: 'การจองและการจัดตารางผิดพลาดง่ายเมื่อข้อมูลไม่ได้เชื่อมกัน',
      outcome: 'ลูกค้าจองง่ายขึ้น ทีมหลังบ้านเห็นข้อมูลตรงกัน และลดงานประสานซ้ำ',
    },
    {
      test: /(ลูกค้า|pipeline|ขาย|กลุ่ม)/i,
      problem: 'ข้อมูลลูกค้าและงานขายแยกกัน ทำให้ทีมเห็นบริบทไม่ครบก่อนติดต่อ',
      outcome: 'ทีมขายโฟกัสลูกค้าที่สำคัญ ติดตามงานต่อได้แม่น และปิดงานเป็นระบบ',
    },
    {
      test: /(สินค้า|คลัง|Barcode|ตรวจนับ)/i,
      problem: 'ข้อมูลสต็อกคลาดเคลื่อนง่ายเมื่อการตรวจนับและการอัปเดตไม่อยู่ในระบบเดียว',
      outcome: 'เห็นจำนวนล่าสุด ลดสินค้าขาด และทำงานคลังได้เป็นขั้นตอนมากขึ้น',
    },
    {
      test: /(API|ข้อมูลจริง|ต่อยอด|อุปกรณ์)/i,
      problem: 'ระบบต้องเชื่อมข้อมูลจริงและรองรับการใช้งานหลายรูปแบบตั้งแต่วันแรก',
      outcome: 'ใช้งานได้ต่อเนื่องบนอุปกรณ์หลัก และขยายฟีเจอร์เพิ่มได้ง่าย',
    },
  ];

  const matched = patterns.find((pattern) => pattern.test.test(title)) ?? {
    problem: `${project.title} ต้องทำให้ ${title} เข้าใจง่ายและใช้ได้จริง`,
    outcome: 'ทีมเห็นสิ่งที่ต้องทำต่อชัดเจนขึ้น และทำงานได้เร็วกว่าเดิม',
  };

  return [
    { label: 'โจทย์', text: matched.problem },
    { label: 'ระบบช่วย', text: card.description },
    { label: 'ผลลัพธ์', text: matched.outcome },
  ];
}

const techIcons: Record<string, { src?: string; label?: string; invert?: boolean }> = {
  React: { src: 'https://thesvg.org/icons/react/default.svg' },
  Vite: { src: 'https://thesvg.org/icons/vite/default.svg' },
  TypeScript: { src: 'https://thesvg.org/icons/typescript/default.svg' },
  MUI: { src: 'https://thesvg.org/icons/mui/default.svg' },
  Axios: { src: 'https://thesvg.org/icons/axios/default.svg' },
  Go: { src: 'https://thesvg.org/icons/go/dark.svg', invert: true },
  Gin: { label: 'Gin' },
  PostgreSQL: { src: 'https://thesvg.org/icons/postgresql/default.svg' },
  Redis: { src: 'https://thesvg.org/icons/redis/default.svg' },
  'REST API': { label: 'API' },
  SQL: { label: 'SQL' },
  OCR: { label: 'OCR' },
  'AI Workflow': { label: 'AI' },
  'Forecast Model': { label: 'ML' },
  'Document AI': { label: 'Doc' },
  'Chat Workflow': { label: 'Chat' },
  'AI Assistant': { label: 'AI' },
  Monitoring: { label: 'Mon' },
  'Barcode Workflow': { label: 'Code' },
  'Data Visualization': { label: 'Chart' },
};

function getTechReason(project: Project) {
  if (project.slug.startsWith('ai-')) {
    return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อให้หน้าจอทำงานเร็ว เชื่อมต่อ API และประมวลผลข้อมูล AI ได้เป็นระบบ ตั้งแต่การดึงข้อมูล วิเคราะห์ผล ไปจนถึงส่ง insight ให้ทีมใช้งานจริง`;
  }

  return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อสร้างเว็บแอปที่ดูแลง่าย เชื่อมต่อข้อมูลจริงได้ครบ และรองรับ workflow หลังบ้านที่ทีมต้องใช้งานต่อเนื่องทุกวัน`;
}

const descriptionHighlightTerms = [
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

function getDescriptionHighlightTerms(project: Project) {
  return Array.from(new Set([...project.highlights, ...descriptionHighlightTerms]))
    .filter((term) => project.description.includes(term))
    .sort((a, b) => b.length - a.length);
}

function renderHighlightedDescription(project: Project, accent: string) {
  const terms = getDescriptionHighlightTerms(project);
  const nodes = [];
  let remaining = project.description;
  let key = 0;

  while (remaining.length > 0) {
    const nextMatch = terms
      .map((term) => ({ term, index: remaining.indexOf(term) }))
      .filter((match) => match.index >= 0)
      .sort((a, b) => a.index - b.index || b.term.length - a.term.length)[0];

    if (!nextMatch) {
      nodes.push(remaining);
      break;
    }

    if (nextMatch.index > 0) {
      nodes.push(remaining.slice(0, nextMatch.index));
    }

    nodes.push(
      <Box
        key={`${nextMatch.term}-${key}`}
        component="span"
        sx={{
          color: accent,
          fontWeight: 700,
        }}
      >
        {nextMatch.term}
      </Box>,
    );

    remaining = remaining.slice(nextMatch.index + nextMatch.term.length);
    key += 1;
  }

  return nodes;
}

function getScreenImage(project: Project, key: ScreenImageKey, index: number) {
  const explicitImage = project.screenImageUrls?.[key];
  if (explicitImage) return explicitImage;

  if (key === 'mobile') {
    return project.screenImageUrls?.mobile1 ?? project.galleryImageUrls[1] ?? project.coverImageUrl;
  }

  const fallbackImages = Array.from(new Set([
    project.coverImageUrl,
    ...project.galleryImageUrls,
  ].filter(Boolean)));

  return fallbackImages[index % fallbackImages.length] ?? project.coverImageUrl;
}

function getSystemPreviewItems(project: Project): SystemPreviewItem[] {
  const copy = systemPreviewCopyBySlug[project.slug] ?? defaultSystemPreviewCopy;
  const previewImages = Array.from(new Set([
    ...(project.galleryImageUrls ?? []),
    getScreenImage(project, 'desktop', 0),
    getScreenImage(project, 'mobile', 1),
    getScreenImage(project, 'mobile1', 2),
    getScreenImage(project, 'mobile2', 3),
    getScreenImage(project, 'mobile3', 4),
    project.coverImageUrl,
  ].filter(Boolean)));

  return copy.map((item, index) => ({
    ...item,
    imageUrl: previewImages[index % previewImages.length] ?? project.coverImageUrl,
  }));
}

function ProjectDeviceShowcase({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const slots = screenSlots[visual.template];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 960, md: 1260, lg: 1440 },
        mx: 'auto',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={mockupAssets[visual.template]}
        alt={`${project.title} บนหน้าจออุปกรณ์`}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {slots.map((slot, index) => {
        const imageUrl = getScreenImage(project, slot.key, index);

        return (
          <Box
            key={`${slot.key}-${slot.mask}`}
            sx={{
              position: 'absolute',
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
              overflow: 'hidden',
              WebkitMaskImage: `url(${slot.mask})`,
              maskImage: `url(${slot.mask})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={`${project.title} ${slot.key}`}
              loading="lazy"
              decoding="async"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}

function ProjectPurposeSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Stack
      spacing={{ xs: 2.25, sm: 2.75, md: 3.25 }}
      alignItems="center"
      textAlign="center"
      sx={{
        width: '100%',
        maxWidth: 1180,
        mx: 'auto',
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: visual.accent,
          ...typeScale.display,
        }}
      >
        สร้างมาเพื่ออะไร
      </Typography>
      <Typography
        sx={{
          color: '#86868B',
          ...typeScale.intro,
          maxWidth: 1080,
          mx: 'auto',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {renderHighlightedDescription(project, visual.accent)}
      </Typography>
    </Stack>
  );
}

function SystemPreviewCard({
  item,
  accent,
  featured = false,
}: {
  item: SystemPreviewItem;
  accent: string;
  featured?: boolean;
}) {
  return (
    <Box
      component="article"
      sx={{
        minHeight: 0,
        overflow: 'hidden',
        borderRadius: { xs: '28px', md: '34px' },
        bgcolor: '#FFFFFF',
        boxShadow: '0 20px 54px rgba(17,24,39,0.08)',
        transition:
          'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        '&:hover': {
          transform: 'translate3d(0, -6px, 0)',
          boxShadow: '0 28px 72px rgba(17,24,39,0.12)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: featured ? { xs: '16 / 11', md: '16 / 10' } : '16 / 9',
          overflow: 'hidden',
          bgcolor: '#EEF0F4',
        }}
      >
        <Box
          component="img"
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          decoding="async"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.01)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,24,39,0.12) 0%, rgba(17,24,39,0) 48%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Stack
        spacing={{ xs: 1, md: 1.25 }}
        sx={{
          p: { xs: 2.5, sm: 3, md: featured ? 4 : 3.25 },
        }}
      >
        <Typography
          sx={{
            color: accent,
            fontSize: { xs: 15, md: 16 },
            lineHeight: 1.35,
            fontWeight: 700,
          }}
        >
          {item.focus}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: palette.text,
            fontSize: featured
              ? { xs: 31, sm: 36, md: 44, lg: 48 }
              : { xs: 26, sm: 28, md: 31 },
            lineHeight: 1.08,
            letterSpacing: 0,
            fontWeight: 700,
          }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            color: '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: featured ? 760 : '100%',
          }}
        >
          {item.description}
        </Typography>
      </Stack>
    </Box>
  );
}

function ProjectSystemPreviewSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const items = getSystemPreviewItems(project);
  const [featured, ...supportItems] = items;

  if (!featured) return null;

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#F7F8FA',
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: { xs: 6, sm: 7, md: 8 },
        overflow: 'visible',
      }}
    >
      <Stack
        spacing={{ xs: 1.25, md: 1.5 }}
        sx={{
          px: pageGutter,
          mb: { xs: 3, md: 4 },
          maxWidth: { xs: '100%', md: 960 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
          }}
        >
          พรีวิวหน้าจอระบบจริง
        </Typography>
        <Typography
          sx={{
            color: '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: 760,
          }}
        >
          ตัวอย่างหน้าจอสำคัญที่ลูกค้าจะได้เห็นในระบบจริง ตั้งแต่ภาพรวม รายละเอียดงาน ไปจนถึง workflow ที่ทีมใช้ต่อได้ทันที
        </Typography>
      </Stack>

      <Box
        sx={{
          px: pageGutter,
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)' },
            gap: { xs: 2, md: 2.5, lg: 3 },
            alignItems: 'stretch',
          }}
        >
          <SystemPreviewCard item={featured} accent={visual.accent} featured />
          <Stack spacing={{ xs: 2, md: 2.5, lg: 3 }}>
            {supportItems.map((item) => (
              <SystemPreviewCard key={item.title} item={item} accent={visual.accent} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function ProjectCapabilitySection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const cards = getCapabilityCards(project);
  const { carouselRef, carouselState, scrollCards } = useDetailCarousel();
  const fallbackImages = Array.from(new Set([project.coverImageUrl, ...project.galleryImageUrls].filter(Boolean)));

  return (
    <Box
      sx={{
        bgcolor: '#F7F8FA',
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: { xs: 6, sm: 7, md: 8 },
        overflow: 'visible',
      }}
    >
      <Stack
        spacing={1.25}
        sx={{
          px: pageGutter,
          maxWidth: { xs: '100%', md: 900, lg: 980 },
          alignItems: 'flex-start',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
            whiteSpace: { sm: 'nowrap' },
          }}
        >
          ระบบทำอะไรได้บ้าง
        </Typography>
      </Stack>

      <Box
        ref={carouselRef}
        aria-label={`รายละเอียดการทำงานของ ${project.title}`}
        sx={{
          mt: 0,
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          overscrollBehaviorX: 'contain',
          pr: pageGutter,
          pt: detailCarouselVerticalGap,
          pb: { xs: 7, md: 8 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flex: '0 0 auto',
            width: pageGutter,
          }}
        />
        {cards.map((card, index) => {
          const imageUrl = fallbackImages[index % fallbackImages.length] ?? project.coverImageUrl;
          const detailRows = getCapabilityDetailRows(project, card);

          return (
            <Box
              key={card.title}
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: { xs: 'calc(100vw - 64px)', sm: 372, md: 372 },
                height: { xs: 620, md: 680 },
                overflow: 'hidden',
                borderRadius: '28px',
                bgcolor: '#000',
                color: '#fff',
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
                display: 'block',
                boxShadow: 'none',
                zIndex: 1,
                transform: 'translate3d(0, 0, 0)',
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
                willChange: 'transform',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 18px 40px rgba(17,24,39,0.14)',
                  zIndex: 2,
                },
                '&:hover img': {
                  transform: 'scale(1.035)',
                },
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={card.title}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.04) contrast(1.02)',
                  transform: 'scale(1)',
                  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 30%, rgba(0,0,0,0.58) 58%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.24) 100%)',
                  zIndex: 1,
                }}
              />
              <Stack
                spacing={{ xs: 1.45, md: 2 }}
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  p: { xs: '28px', md: '32px' },
                  pr: { xs: '32px', md: '34px' },
                  m: { xs: '18px', md: '20px' },
                  borderRadius: '22px',
                  bgcolor: 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.68)',
                    fontSize: 17,
                    lineHeight: 1.353,
                    fontWeight: 700,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#fff',
                    ...typeScale.cardTitle,
                    maxWidth: 430,
                  }}
                >
                  {card.title}
                </Typography>
                <Stack
                  spacing={{ xs: 1.15, md: 1.25 }}
                  sx={{
                    pt: { xs: 0.35, md: 0.5 },
                  }}
                >
                  {detailRows.map((row) => (
                    <Box key={`${card.title}-${row.label}`}>
                      <Typography
                        sx={{
                          color: visual.accent,
                          fontSize: 13,
                          lineHeight: 1.231,
                          fontWeight: 700,
                          mb: 0.35,
                        }}
                      >
                        {row.label}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.78)',
                          fontSize: { xs: 15, md: 16 },
                          lineHeight: 1.38,
                          fontWeight: 500,
                        }}
                      >
                        {row.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  right: { xs: 22, md: 28 },
                  bottom: { xs: 22, md: 28 },
                  zIndex: 2,
                  display: 'grid',
                  placeItems: 'center',
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.94)',
                  color: visual.accent,
                  fontSize: { xs: 30, md: 36 },
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                +
              </Box>
            </Box>
          );
        })}
      </Box>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: { xs: -4, md: -5 }, px: pageGutter, position: 'relative', zIndex: 2 }}
      >
        <Box
          component="button"
          type="button"
          aria-label="เลื่อนรายละเอียดการทำงานไปทางซ้าย"
          disabled={!carouselState.canScrollPrev}
          onClick={() => scrollCards(-1)}
          sx={carouselControlSx(carouselState.canScrollPrev)}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              ml: 0.5,
              borderRight: '3px solid currentColor',
              borderBottom: '3px solid currentColor',
              transform: 'rotate(135deg)',
            }}
          />
        </Box>
        <Box
          component="button"
          type="button"
          aria-label="เลื่อนรายละเอียดการทำงานไปทางขวา"
          disabled={!carouselState.canScrollNext}
          onClick={() => scrollCards(1)}
          sx={carouselControlSx(carouselState.canScrollNext)}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              mr: 0.5,
              borderRight: '3px solid currentColor',
              borderBottom: '3px solid currentColor',
              transform: 'rotate(-45deg)',
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

function ProjectTechSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(360px, 0.85fr) minmax(420px, 1fr)' },
        alignItems: 'center',
        gap: { xs: 4, md: 7, lg: 9 },
        mt: { xs: 1, md: 2 },
      }}
    >
      <Stack spacing={{ xs: 1.75, md: 2.25 }} sx={{ maxWidth: 620, alignItems: 'flex-start', textAlign: 'left' }}>
        <Typography
          variant="h2"
          sx={{
            color: visual.accent,
            ...typeScale.display,
            fontWeight: 600,
          }}
        >
          เทคโนโลยีที่ใช้
        </Typography>
        <Typography
          sx={{
            maxWidth: 620,
            color: '#4B5563',
            ...typeScale.bodyLarge,
          }}
        >
          {getTechReason(project)}
        </Typography>
      </Stack>

      <Box
        aria-label={`เทคโนโลยีที่ใช้ใน ${project.title}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, minmax(0, 1fr))',
            sm: 'repeat(5, minmax(0, 1fr))',
          },
          gap: { xs: 1.25, sm: 1.5, md: 1.8 },
          justifySelf: { xs: 'stretch', md: 'end' },
          width: '100%',
          maxWidth: { xs: '100%', md: 520 },
        }}
      >
        {project.stack.map((item) => {
          const icon = techIcons[item] ?? { label: item.slice(0, 4) };

          return (
            <Box
              key={item}
              title={item}
              sx={{
                aspectRatio: '1 / 1',
                display: 'grid',
                placeItems: 'center',
                borderRadius: { xs: '18px', md: '20px' },
                bgcolor: '#F7F8FA',
                boxShadow: '0 16px 36px rgba(17,24,39,0.06)',
                transition:
                  'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 260ms ease, box-shadow 260ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -4px, 0)',
                  bgcolor: '#F3F4F6',
                  boxShadow: '0 20px 42px rgba(17,24,39,0.1)',
                },
              }}
            >
              {icon.src ? (
                <Box
                  component="img"
                  src={icon.src}
                  alt={item}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                  sx={{
                    width: { xs: 34, sm: 38, md: 44 },
                    height: { xs: 34, sm: 38, md: 44 },
                    objectFit: 'contain',
                    filter: icon.invert
                      ? 'invert(1) drop-shadow(0 10px 24px rgba(17,24,39,0.12))'
                      : 'drop-shadow(0 10px 24px rgba(17,24,39,0.12))',
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    color: visual.accent,
                    fontSize: { xs: 18, md: 21 },
                    lineHeight: 1,
                    fontWeight: 800,
                  }}
                >
                  {icon.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function ProjectDetailPage({ slug, initialProject }: ProjectDetailPageProps) {
  const fallback = useMemo(
    () => fallbackProjects.find((project) => project.slug === slug) ?? fallbackProjects[0],
    [slug],
  );
  const initial = initialProject ?? fallback;
  const [project, setProject] = useState<Project>(initial);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>(initialProject ? 'ready' : 'loading');

  useEffect(() => {
    let active = true;

    fetchProject(slug)
      .then((item) => {
        if (!active) return;
        setProject(item);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setProject(initialProject ?? fallback);
        setStatus(initialProject ? 'ready' : 'fallback');
      });

    return () => {
      active = false;
    };
  }, [fallback, initialProject, slug]);

  return (
    <Box component="main">
      <Box sx={{ px: pageGutter, pt: { xs: 8, sm: 9, md: 10, lg: 11 }, pb: { xs: 8, sm: 9, md: 11, lg: 12 } }}>
        <Stack spacing={{ xs: 5, md: 6 }}>
          <Stack
            spacing={{ xs: 1.25, sm: 1.5, md: 1.75 }}
            alignItems="center"
            textAlign="center"
            sx={{ width: '100%', mx: 'auto', maxWidth: 1060, alignSelf: 'center' }}
          >
            <Typography
              variant="h1"
              sx={{
                color: palette.text,
                ...typeScale.hero,
                width: '100%',
                textAlign: 'center',
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: getProjectVisual(project).accent,
                ...typeScale.intro,
                width: '100%',
                maxWidth: 880,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {project.subtitle}
            </Typography>
          </Stack>

          <ProjectDeviceShowcase project={project} />

          <Stack spacing={{ xs: 4, md: 5 }} sx={{ width: '100%' }}>
            <ProjectPurposeSection project={project} />
            <ProjectCapabilitySection project={project} />
            <ProjectTechSection project={project} />
            <ProjectSystemPreviewSection project={project} />
          </Stack>

          {status === 'fallback' && (
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: palette.accentYellow, fontWeight: 600 }}>
              กำลังแสดงเนื้อหาตัวอย่างในเครื่อง เพราะ API ยังไม่พร้อมใช้งาน
            </Box>
          )}

          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2}>
                <Typography variant="h4">
                  จุดเด่น
                </Typography>
                <Stack
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                    gap: 2,
                  }}
                >
                  {project.highlights.map((highlight) => (
                    <Box key={highlight} sx={{ p: 2.5, borderLeft: `4px solid ${palette.primaryPink}`, bgcolor: palette.softGray }}>
                      <Typography>{highlight}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
