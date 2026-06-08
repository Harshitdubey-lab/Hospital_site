import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    console.log('Starting Prisma Seed...');

    // Clear existing data (optional, but good for resetting)
    await prisma.appointment.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.department.deleteMany();
    await prisma.service.deleteMany();
    await prisma.healthPackage.deleteMany();
    await prisma.user.deleteMany();
    await prisma.settings.deleteMany();

    // 1. Create Super Admin
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('admin123', salt);
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@hospital.com',
        password_hash,
        role: 'Super Admin',
      }
    });

    // 2. Settings
    await prisma.settings.create({
      data: {
        hospital_name: 'Bansal Hospital Bhopal',
        address: 'Chuna Bhatti, Kolar Road, Bhopal, Madhya Pradesh 462016',
        phone: '+91 755 4086000',
        emergency_phone: '+91 755 4086099',
        email: 'info@bansalhospital.com',
        opening_hours: '24/7 Hours',
      }
    });

    // 3. Departments
    const dept1 = await prisma.department.create({
      data: { name: 'Cardiology', slug: 'cardiology', short_description: 'Heart care and surgery', image: '/images/cardiology.jpg' }
    });
    const dept2 = await prisma.department.create({
      data: { name: 'Neurology', slug: 'neurology', short_description: 'Brain and nervous system', image: '/images/neurology.jpg' }
    });
    const dept3 = await prisma.department.create({
      data: { name: 'Orthopedics', slug: 'orthopedics', short_description: 'Bone and joint care', image: '/images/orthopedics.jpg' }
    });
    const dept4 = await prisma.department.create({
      data: { name: 'Pediatrics', slug: 'pediatrics', short_description: 'Child healthcare', image: '/images/pediatrics.jpg' }
    });
    const dept5 = await prisma.department.create({
      data: { name: 'General Medicine', slug: 'general-medicine', short_description: 'Comprehensive adult medical care', image: '/images/medicine.jpg' }
    });

    // 4. Doctors
    await prisma.doctor.createMany({
      data: [
        {
          name: 'Dr. Sarah Jenkins',
          specialization: 'Senior Cardiologist',
          department_id: dept1.id,
          qualification: 'MBBS, MD, DM (Cardiology)',
          experience: '15 Years',
          bio: 'Expert in interventional cardiology and heart failure management.',
          consultation_fee: 150,
          available_days: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
          time_slots: JSON.stringify(['09:00 AM', '11:00 AM', '02:00 PM']),
        },
        {
          name: 'Dr. Michael Chen',
          specialization: 'Neurologist',
          department_id: dept2.id,
          qualification: 'MBBS, MD (Neurology)',
          experience: '12 Years',
          bio: 'Specialist in stroke management and neurodegenerative disorders.',
          consultation_fee: 120,
          available_days: JSON.stringify(['Tuesday', 'Thursday', 'Saturday']),
          time_slots: JSON.stringify(['10:00 AM', '01:00 PM', '04:00 PM']),
        },
        {
          name: 'Dr. Rajesh Kumar',
          specialization: 'Orthopedic Surgeon',
          department_id: dept3.id,
          qualification: 'MBBS, MS (Orthopedics)',
          experience: '18 Years',
          bio: 'Renowned for joint replacement surgeries and sports injuries.',
          consultation_fee: 180,
          available_days: JSON.stringify(['Monday', 'Tuesday', 'Friday']),
          time_slots: JSON.stringify(['09:00 AM', '12:00 PM', '03:00 PM']),
        },
        {
          name: 'Dr. Emily Parker',
          specialization: 'Pediatrician',
          department_id: dept4.id,
          qualification: 'MBBS, MD (Pediatrics)',
          experience: '10 Years',
          bio: 'Compassionate care for infants, children, and adolescents.',
          consultation_fee: 100,
          available_days: JSON.stringify(['Monday', 'Wednesday', 'Thursday', 'Saturday']),
          time_slots: JSON.stringify(['10:00 AM', '01:00 PM', '05:00 PM']),
        },
        {
          name: 'Dr. Amit Bansal',
          specialization: 'General Physician',
          department_id: dept5.id,
          qualification: 'MBBS, MD (Internal Medicine)',
          experience: '20 Years',
          bio: 'Comprehensive adult medical care and chronic disease management.',
          consultation_fee: 90,
          available_days: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
          time_slots: JSON.stringify(['09:00 AM', '02:00 PM', '06:00 PM']),
        },
        {
          name: 'Dr. Lisa Wong',
          specialization: 'Cardiothoracic Surgeon',
          department_id: dept1.id,
          qualification: 'MBBS, MS, MCh',
          experience: '14 Years',
          bio: 'Specializes in complex heart and lung surgeries.',
          consultation_fee: 200,
          available_days: JSON.stringify(['Tuesday', 'Thursday']),
          time_slots: JSON.stringify(['08:00 AM', '01:00 PM']),
        },
        {
          name: 'Dr. Samuel Jackson',
          specialization: 'Neurosurgeon',
          department_id: dept2.id,
          qualification: 'MBBS, MS, MCh (Neurosurgery)',
          experience: '16 Years',
          bio: 'Advanced surgical treatments for brain and spine disorders.',
          consultation_fee: 250,
          available_days: JSON.stringify(['Wednesday', 'Friday', 'Saturday']),
          time_slots: JSON.stringify(['11:00 AM', '03:00 PM']),
        },
        {
          name: 'Dr. Priya Sharma',
          specialization: 'Gynecologist',
          department_id: dept5.id,
          qualification: 'MBBS, MD (OBGYN)',
          experience: '11 Years',
          bio: 'Women\'s health specialist focusing on maternal care.',
          consultation_fee: 130,
          available_days: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
          time_slots: JSON.stringify(['10:00 AM', '02:00 PM']),
        }
      ]
    });

    // 5. Services
    await prisma.service.createMany({
      data: [
        { title: '24/7 Ambulance', slug: 'ambulance', short_description: 'Fully equipped life-support ambulances' },
        { title: 'Advanced ICU', slug: 'icu', short_description: 'State-of-the-art intensive care units' },
        { title: 'Diagnostic Lab', slug: 'lab', short_description: 'Comprehensive pathology and radiology' },
      ]
    });

    // 6. Packages
    await prisma.healthPackage.createMany({
      data: [
        { name: 'Basic Health Checkup', price: 99, description: 'Essential tests for preventive care', included_tests: JSON.stringify(['CBC', 'Blood Sugar', 'Lipid Profile']) },
        { name: 'Comprehensive Heart Check', price: 299, description: 'Complete cardiac evaluation', included_tests: JSON.stringify(['ECG', 'ECHO', 'TMT', 'Lipid Profile']) },
      ]
    });

    console.log('Prisma Seed Data Inserted Successfully!');
  } catch (error) {
    console.error('Seeding Error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
