import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Department from './src/models/Department.js';
import Doctor from './src/models/Doctor.js';
import Service from './src/models/Service.js';
import HealthPackage from './src/models/HealthPackage.js';
import Settings from './src/models/Settings.js';
import connectDB from './src/lib/db.js';

dotenv.config({ path: '.env.local' });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for Seeding');

    // Clear existing data
    await User.deleteMany();
    await Department.deleteMany();
    await Doctor.deleteMany();
    await Service.deleteMany();
    await HealthPackage.deleteMany();
    await Settings.deleteMany();

    // 1. Create Super Admin
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Super Admin',
      email: 'admin@hospital.com',
      password_hash,
      role: 'Super Admin',
    });

    // 2. Settings
    await Settings.create({
      hospital_name: 'CityCare Multispecialty Hospital',
      address: '123 Health Avenue, Medical District, NY 10001',
      phone: '+1 (555) 123-4567',
      emergency_phone: '+1 (555) 911-0000',
      email: 'info@citycare.com',
      opening_hours: '24/7 Hours',
    });

    // 3. Departments
    const depts = [
      { name: 'Cardiology', slug: 'cardiology', short_description: 'Heart care and surgery', image: '/images/cardiology.jpg' },
      { name: 'Neurology', slug: 'neurology', short_description: 'Brain and nervous system', image: '/images/neurology.jpg' },
      { name: 'Orthopedics', slug: 'orthopedics', short_description: 'Bone and joint care', image: '/images/orthopedics.jpg' },
      { name: 'Pediatrics', slug: 'pediatrics', short_description: 'Child healthcare', image: '/images/pediatrics.jpg' },
      { name: 'Emergency', slug: 'emergency', short_description: '24/7 Emergency care', image: '/images/emergency.jpg' },
    ];
    const createdDepts = await Department.insertMany(depts);

    // 4. Doctors
    const doctors = [
      {
        name: 'Dr. Sarah Jenkins',
        specialization: 'Senior Cardiologist',
        department_id: createdDepts[0]._id,
        qualification: 'MBBS, MD, DM (Cardiology)',
        experience: '15 Years',
        bio: 'Expert in interventional cardiology and heart failure management.',
        consultation_fee: 150,
        available_days: ['Monday', 'Wednesday', 'Friday'],
        time_slots: ['09:00 AM', '11:00 AM', '02:00 PM'],
      },
      {
        name: 'Dr. Michael Chen',
        specialization: 'Neurologist',
        department_id: createdDepts[1]._id,
        qualification: 'MBBS, MD (Neurology)',
        experience: '12 Years',
        bio: 'Specialist in stroke management and neurodegenerative disorders.',
        consultation_fee: 120,
        available_days: ['Tuesday', 'Thursday', 'Saturday'],
        time_slots: ['10:00 AM', '01:00 PM', '04:00 PM'],
      }
    ];
    await Doctor.insertMany(doctors);

    // 5. Services
    await Service.insertMany([
      { title: '24/7 Ambulance', slug: 'ambulance', short_description: 'Fully equipped life-support ambulances' },
      { title: 'Advanced ICU', slug: 'icu', short_description: 'State-of-the-art intensive care units' },
      { title: 'Diagnostic Lab', slug: 'lab', short_description: 'Comprehensive pathology and radiology' },
    ]);

    // 6. Packages
    await HealthPackage.insertMany([
      { name: 'Basic Health Checkup', price: 99, description: 'Essential tests for preventive care', included_tests: ['CBC', 'Blood Sugar', 'Lipid Profile'] },
      { name: 'Comprehensive Heart Check', price: 299, description: 'Complete cardiac evaluation', included_tests: ['ECG', 'ECHO', 'TMT', 'Lipid Profile'] },
    ]);

    console.log('Seed Data Inserted Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
