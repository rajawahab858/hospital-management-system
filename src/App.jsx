import React, { useState } from 'react';
import { 
  Users, UserPlus, Calendar, Activity, Moon, Sun, 
  CheckCircle, Stethoscope, Pill, DollarSign, Building2, HeartPulse, ShieldAlert, Award 
} from 'lucide-react';

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  const departments = [
    { id: 'cardio', name: 'Cardiology', icon: HeartPulse, head: 'Dr. Ali Ahmed', desc: 'Advanced heart care, ECG, and angioplasty services.', color: 'from-rose-500 to-red-600' },
    { id: 'neuro', name: 'Neurology', icon: Activity, head: 'Dr. Sara Khan', desc: 'Expert treatment for brain, spine, and nervous system disorders.', color: 'from-violet-500 to-purple-600' },
    { id: 'ortho', name: 'Orthopedics', icon: Stethoscope, head: 'Dr. Usman Tariq', desc: 'Joint replacement, bone fractures, and physical therapy.', color: 'from-blue-500 to-cyan-600' }
  ];

  const doctorsList = [
    { id: 1, name: 'Dr. Ali Ahmed', dept: 'Cardiology', qualification: 'MBBS, FCPS', timing: '9:00 AM - 2:00 PM', fee: 2500, rating: '4.9 ⭐' },
    { id: 2, name: 'Dr. Sara Khan', dept: 'Neurology', qualification: 'MBBS, MD', timing: '10:00 AM - 4:00 PM', fee: 3000, rating: '4.8 ⭐' },
    { id: 3, name: 'Dr. Usman Tariq', dept: 'Orthopedics', qualification: 'MBBS, MS', timing: '8:00 AM - 1:00 PM', fee: 2000, rating: '4.7 ⭐' }
  ];

  const [patients, setPatients] = useState([
    { id: 1, name: 'Ahmed Raza', age: 32, gender: 'Male', phone: '+92 300 1234567', disease: 'Chest Pain', dept: 'Cardiology', date: '2026-10-14' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Ahmed Raza', doctor: 'Dr. Ali Ahmed (Cardiology)', date: '2026-10-14', time: '10:00 AM', status: 'Confirmed' }
  ]);

  const [queue, setQueue] = useState([
    { token: 1, patient: 'Ahmed Raza', doctor: 'Dr. Ali Ahmed', status: 'In Consultation' }
  ]);

  const [medicines] = useState([
    { id: 1, name: 'Disprin 300mg', category: 'Cardio', stock: 150, price: 20 },
    { id: 2, name: 'Augmentin 1g', category: 'Antibiotic', stock: 60, price: 120 }
  ]);

  const [bills, setBills] = useState([
    { id: 1, patient: 'Ahmed Raza', doctorFee: 2500, medicineFee: 300, total: 2800, status: 'Paid' }
  ]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: 'Male', phone: '', disease: '', dept: 'Cardiology', date: '' });
  const [newAppt, setNewAppt] = useState({ patient: '', doctor: 'Dr. Ali Ahmed (Cardiology)', date: '', time: '10:00 AM' });
  const [newBill, setNewBill] = useState({ patient: '', doctorFee: 2500, medicineFee: 300 });

  const handleAddPatient = (e) => {
    e.preventDefault();
    setPatients([{ id: Date.now(), ...newPatient }, ...patients]);
    setNewPatient({ name: '', age: '', gender: 'Male', phone: '', disease: '', dept: 'Cardiology', date: '' });
    showNotification('Patient successfully registered!');
  };

  const handleBookAppt = (e) => {
    e.preventDefault();
    setAppointments([{ id: Date.now(), ...newAppt, status: 'Confirmed' }, ...appointments]);
    setQueue([...queue, { token: queue.length + 1, patient: newAppt.patient, doctor: newAppt.doctor, status: 'Waiting' }]);
    showNotification('Appointment booked successfully!');
  };

  const handleCreateBill = (e) => {
    e.preventDefault();
    const total = Number(newBill.doctorFee) + Number(newBill.medicineFee);
    setBills([{ id: Date.now(), ...newBill, total, status: 'Unpaid' }, ...bills]);
    setNewBill({ patient: '', doctorFee: 2500, medicineFee: 300 });
    showNotification('Invoice generated successfully!');
  };

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen p-6 font-sans`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-600 p-3.5 rounded-2xl text-white">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-indigo-600">MediCore Global Hospital</h1>
              <p className="text-xs font-semibold text-slate-400 uppercase">Excellence in Healthcare</p>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>
        </div>

        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
            <CheckCircle className="h-6 w-6" />
            <span className="font-bold text-sm">{notification}</span>
          </div>
        )}

        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'departments', label: 'Departments', icon: HeartPulse },
            { id: 'doctors', label: 'Doctors', icon: Stethoscope },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'patients', label: 'Patients', icon: UserPlus },
            { id: 'queue', label: 'Queue', icon: Users },
            { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
            { id: 'billing', label: 'Billing', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-4xl font-black">24/7</h3>
              <p className="font-bold mt-1">Emergency Care</p>
            </div>
            <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-4xl font-black">50+</h3>
              <p className="font-bold mt-1">Specialist Doctors</p>
            </div>
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-4xl font-black">100k+</h3>
              <p className="font-bold mt-1">Happy Patients</p>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((d) => (
              <div key={d.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-black">{d.name}</h3>
                <p className="text-xs font-bold text-indigo-600 mt-1">Head: {d.head}</p>
                <p className="text-xs text-slate-400 mt-3">{d.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctorsList.map(d => (
              <div key={d.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <h4 className="font-black text-lg">{d.name}</h4>
                <p className="text-xs font-bold text-indigo-600">{d.dept}</p>
                <p className="text-xs text-slate-400 mt-2">Timing: {d.timing}</p>
                <p className="text-xs text-slate-400">Fee: Rs. {d.fee}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-fit">
              <h3 className="text-lg font-black mb-4">Book Appointment</h3>
              <form onSubmit={handleBookAppt} className="space-y-4">
                <input type="text" required value={newAppt.patient} onChange={e => setNewAppt({...newAppt, patient: e.target.value})} placeholder="Patient Name" className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <select value={newAppt.doctor} onChange={e => setNewAppt({...newAppt, doctor: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm">
                  {doctorsList.map(d => <option key={d.id} value={`${d.name} (${d.dept})`}>{d.name} - {d.dept}</option>)}
                </select>
                <input type="date" required value={newAppt.date} onChange={e => setNewAppt({...newAppt, date: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg">Confirm Booking</button>
              </form>
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-lg font-black mb-4">Scheduled Appointments</h3>
              <div className="space-y-3">
                {appointments.map((a, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-800 bg-slate-800/50 flex justify-between items-center">
                    <div>
                      <h4 className="font-black">{a.patient}</h4>
                      <p className="text-xs text-slate-400">{a.doctor} • {a.date}</p>
                    </div>
                    <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-600 rounded-full font-black">{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-fit">
              <h3 className="text-lg font-black mb-4">Register Patient</h3>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <input type="text" required placeholder="Full Name" value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <input type="number" required placeholder="Age" value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <input type="text" required placeholder="Phone Number" value={newPatient.phone} onChange={e => setNewPatient({...newPatient, phone: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <input type="text" required placeholder="Disease" value={newPatient.disease} onChange={e => setNewPatient({...newPatient, disease: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <input type="date" required value={newPatient.date} onChange={e => setNewPatient({...newPatient, date: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg">Save Record</button>
              </form>
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-lg font-black mb-4">Patient Directory</h3>
              <div className="space-y-3">
                {patients.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-800/50 flex justify-between items-center">
                    <div>
                      <h4 className="font-black">{p.name}</h4>
                      <p className="text-xs text-slate-400">{p.age} yrs • {p.phone}</p>
                    </div>
                    <span className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full font-black">{p.disease}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-black mb-6">Live Queue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {queue.map((q, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-800/50 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-indigo-600">TOKEN #{q.token}</span>
                    <h4 className="font-black text-lg mt-1">{q.patient}</h4>
                  </div>
                  <span className="px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded-full font-black">{q.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pharmacy' && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-black mb-6">Pharmacy Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicines.map(m => (
                <div key={m.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-800/50 flex justify-between items-center">
                  <div>
                    <h4 className="font-black text-lg">{m.name}</h4>
                    <p className="text-xs text-slate-400">Price: Rs. {m.price}</p>
                  </div>
                  <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-black">Stock: {m.stock}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-fit">
              <h3 className="text-lg font-black mb-4">Generate Bill</h3>
              <form onSubmit={handleCreateBill} className="space-y-4">
                <input type="text" required placeholder="Patient Name" value={newBill.patient} onChange={e => setNewBill({...newBill, patient: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <input type="number" required placeholder="Doctor Fee" value={newBill.doctorFee} onChange={e => setNewBill({...newBill, doctorFee: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <input type="number" required placeholder="Medicine Fee" value={newBill.medicineFee} onChange={e => setNewBill({...newBill, medicineFee: e.target.value})} className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-800 text-sm" />
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg">Create Invoice</button>
              </form>
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-lg font-black mb-4">Invoices</h3>
              <div className="space-y-3">
                {bills.map(b => (
                  <div key={b.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-800/50 flex justify-between items-center">
                    <div>
                      <h4 className="font-black">{b.patient}</h4>
                      <p className="text-xs text-slate-400">Total: Rs. {b.total}</p>
                    </div>
                    <span className="px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded-full font-black">{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}