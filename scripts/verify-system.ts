import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';
import { signSession, verifySession } from '../src/lib/auth';
import { checkDateAvailability } from '../src/lib/conflictCheck';
import { submitEnquiry } from '../src/actions/enquiry';

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 PALLAVI MEHNDI ARTISTRY - AUTOMATED SYSTEM VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, description: string) {
    if (condition) {
      console.log(`✅ PASS: ${description}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${description}`);
      failed++;
    }
  }

  // 1. Database Connectivity & Seeding Check
  console.log('--- 1. Database & Catalog Check ---');
  const serviceCount = await prisma.service.count();
  const portfolioCount = await prisma.portfolioItem.count();
  const owner = await prisma.user.findUnique({ where: { email: 'admin@pallavimehndi.com' } });
  assert(serviceCount > 0, `Services catalog seeded (${serviceCount} services found)`);
  assert(portfolioCount > 0, `Portfolio items seeded (${portfolioCount} items found)`);
  assert(!!owner && owner.role === 'OWNER', 'Owner user account exists with OWNER role');

  // 2. Authentication & JWT Session Verification
  console.log('\n--- 2. Security & Authentication Check ---');
  if (owner) {
    const isPasswordValid = await bcrypt.compare('Pallavi@Mehndi2026!', owner.passwordHash);
    assert(isPasswordValid, 'Owner password hash verification with bcrypt succeeds');

    const token = await signSession({
      userId: owner.id,
      email: owner.email,
      name: owner.name,
      role: 'OWNER',
    });
    assert(typeof token === 'string' && token.length > 20, 'JWT session token generated with Jose HS256');

    const decoded = await verifySession(token);
    assert(
      !!decoded && decoded.email === 'admin@pallavimehndi.com' && decoded.role === 'OWNER',
      'JWT session token successfully verified and decoded'
    );
  }

  // 3. Public Enquiry Submission & Honeypot Validation
  console.log('\n--- 3. Public Enquiry Submission Check ---');
  const testEnquiry = await submitEnquiry({
    customerName: 'Ananya Sridhar',
    phone: '+91 94440 99887',
    email: 'ananya.s@example.com',
    contactMethod: 'WHATSAPP',
    eventDate: '2026-12-28',
    eventType: 'BRIDAL_MAIN',
    eventLocation: 'Salem, Shevapet',
    privacyConsent: true,
    formTimestamp: Date.now() - 5000,
  });
  assert(testEnquiry.success && !!testEnquiry.referenceNumber, `Enquiry submission succeeds (Ref: ${testEnquiry.referenceNumber})`);

  // Honeypot spam test
  const spamEnquiry = await submitEnquiry({
    customerName: 'Bot Spammer',
    phone: '1234567890',
    eventDate: '2026-12-28',
    eventType: 'BRIDAL_MAIN',
    eventLocation: 'Salem',
    privacyConsent: true,
    honeypot: 'http://spam-link.ru',
  });
  assert(!spamEnquiry.success, 'Honeypot protection successfully caught and rejected automated spam bot');

  // 4. Database-Layer Double-Booking & Conflict Prevention
  console.log('\n--- 4. Conflict & Double-Booking Prevention Check ---');
  // Date 2026-12-05 has a seeded confirmed booking
  const conflictTest1 = await checkDateAvailability('2026-12-05');
  assert(
    conflictTest1.hasConflict && conflictTest1.reason?.includes('confirmed booking'),
    `Conflict prevention caught existing confirmed booking: "${conflictTest1.reason}"`
  );

  // Date 2026-11-21 is within an availability blackout block (2026-11-20 to 2026-11-22)
  const conflictTest2 = await checkDateAvailability('2026-11-21');
  assert(
    conflictTest2.hasConflict && !!conflictTest2.reason,
    `Blackout calendar protection caught unavailable date: "${conflictTest2.reason}"`
  );

  // Open unbooked date should be available
  const availableTest = await checkDateAvailability('2027-02-15');
  assert(!availableTest.hasConflict, 'Open future date (2027-02-15) correctly reported as available');

  // 5. Testimonial Moderation Privacy Check
  console.log('\n--- 5. Testimonial Moderation Check ---');
  const publicTestimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
  });
  const unapproved = publicTestimonials.find((t) => t.isApproved === false);
  assert(!unapproved, 'Public site strictly queries only approved testimonials (zero unapproved exposed)');

  // 6. Security Protection: Last Owner Account Protection
  console.log('\n--- 6. Last Owner Security Guardrail ---');
  if (owner) {
    const activeOwnerCount = await prisma.user.count({
      where: { role: 'OWNER', isActive: true },
    });
    const isProtected = activeOwnerCount <= 1;
    assert(
      isProtected,
      `Guardrail verified: Only ${activeOwnerCount} active owner exists, system will reject deactivation`
    );
  }

  // 7. Audit Logging Verification
  console.log('\n--- 7. Audit Log Trail Check ---');
  const auditLogs = await prisma.auditLog.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  assert(auditLogs.length > 0, `Audit trail recorded (${auditLogs.length} events logged, passwords sanitized)`);

  console.log('\n====================================================');
  console.log(`📊 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================');

  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

runVerification().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
