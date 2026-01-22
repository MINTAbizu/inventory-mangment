import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";
// import AuthModal from "../components/AuthModal";
import homeimage from "../assets/home.jpg";
// import im2 from "../assets/dashboard1.jpg";
// import h from "../assets/dashboard3.jpg";
// import h3 from "../assets/dashboard2.jpg";
import h5 from "../assets/dashboard5.jpg";
import h6 from "../assets/dashboard6.jpg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";

const mockScreens = [
    homeimage,
    
    h5,
    h6

  
];

const chartData = [
  { name: "Jan", stock: 400 },
  { name: "Feb", stock: 300 },
  { name: "Mar", stock: 500 },
  { name: "Apr", stock: 450 },
  { name: "May", stock: 600 },
  { name: "Jun", stock: 520 },
];

const features = [
  {
    title: "Real-time Stock Monitoring",
    desc: "Track inventory in real time and get low-stock alerts instantly.",
    icon: "📦",
  },
  {
    title: "Supplier Management",
    desc: "Manage suppliers, orders, and delivery timelines.",
    icon: "🚚",
  },
  {
    title: "Sales Reports",
    desc: "Generate detailed sales reports and analytics in seconds.",
    icon: "📈",
  },
  {
    title: "Multi-Branch Support",
    desc: "Manage multiple warehouses and branches with ease.",
    icon: "🏢",
  },
];

const services = [
  {
    title: "Inventory Control",
    desc: "Automatic stock updates with barcode scanning support.",
    icon: "🧾",
  },
  {
    title: "Order Management",
    desc: "Create purchase orders and track delivery status.",
    icon: "🛒",
  },
  {
    title: "User Roles",
    desc: "Admin, Manager, and Staff roles with permissions.",
    icon: "🔐",
  },
  {
    title: "Alerts & Notifications",
    desc: "Get notified when stock is low or expired.",
    icon: "🔔",
  },
];

const pricing = [
  {
    plan: "Basic",
    price: "$29",
    features: ["Inventory Tracking", "Reports", "Email Support"],
  },
  {
    plan: "Pro",
    price: "$59",
    features: ["Everything in Basic", "Supplier Management", "Multi-Branch"],
  },
  {
    plan: "Enterprise",
    price: "Custom",
    features: ["All features", "Custom Integrations", "Dedicated Support"],
  },
];

const faqs = [
  {
    q: "Is this platform private?",
    a: "Yes. It is designed for private company use only.",
  },
  {
    q: "Can I manage multiple warehouses?",
    a: "Yes, it supports multi-branch inventory management.",
  },
  {
    q: "Do you provide reporting?",
    a: "Yes, detailed sales and stock reports are available.",
  },
];

const testimonials = [
  {
    name: "John Doe",
    company: "ABC Trading",
    msg: "This platform improved our stock control and reduced losses.",
  },
  {
    name: "Sara Lee",
    company: "XYZ Retail",
    msg: "Easy to use and the reports are very helpful.",
  },
];
const exportToExcel = () => {
    const formattedData = items.map(item => ({
        Name: item.name,
        Category: item.category,
        Unit: item.unit,
        Cost: item.cost,
        Quantity: item.quantity,
        Status: item.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

    XLSX.writeFile(workbook, "Inventory_Items.xlsx");
};

const HomePage = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [authType, setAuthType] = useState(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Navbar */}
      <Navbar/>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            Manage Inventory <span className="text-purple-600">Effortlessly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            A private inventory management platform for your company.
            Track stock, generate reports, and manage suppliers — all in one place.
          </motion.p>

          <div className="flex gap-4">
           <Link to={'/login'}>
            <button
              onClick={() => setAuthType("login")}
              className="px-8 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-700 font-medium"
            >
              Login
            </button>
           </Link>
            <Link to={'/register'}>
            <button
              onClick={() => setAuthType("register")}
              className="px-8 py-3 rounded-md text-purple-600 bg-white border border-purple-600 hover:bg-purple-50 font-medium"
            >
              Register
            </button>
            
            </Link>
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6"
        >
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">
              System Preview
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              Click arrows to change
            </div>
          </div>

          <div className="mt-4">
            <img
              src={mockScreens[activeScreen]}
              alt="Dashboard Preview"
              className="w-full rounded-xl"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setActiveScreen((prev) => (prev - 1 + mockScreens.length) % mockScreens.length)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              Prev
            </button>
            <button
              onClick={() => setActiveScreen((prev) => (prev + 1) % mockScreens.length)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              Next
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center">
            What This Platform Provides
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
            A full inventory management solution for private company use.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="text-3xl">{f.icon}</div>
                <div className="font-bold text-lg text-purple-600 mt-3">
                  {f.title}
                </div>
                <div className="text-gray-500 dark:text-gray-300 mt-2">
                  {f.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center">
            Services & Capabilities
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
            Everything your company needs for inventory management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg"
              >
                <div className="text-3xl">{s.icon}</div>
                <div className="font-bold text-lg text-purple-600 mt-3">
                  {s.title}
                </div>
                <div className="text-gray-500 dark:text-gray-300 mt-2">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Chart */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl">Stock Movement Preview</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              Demo Chart
            </div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stock" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center">
            Pricing (Demo)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
            Choose a plan that fits your company.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {pricing.map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="font-bold text-xl">{p.plan}</div>
                <div className="text-3xl font-extrabold text-purple-600 mt-2">
                  {p.price}
                </div>

                <div className="mt-4">
                  {p.features.map((f, i) => (
                    <div key={i} className="text-gray-500 dark:text-gray-300">
                      • {f}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setAuthType("register")}
                  className="mt-6 w-full py-3 rounded-lg bg-purple-600 text-white"
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center">
            FAQ
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
            Frequently asked questions
          </p>

          <div className="mt-10 space-y-4">
            {faqs.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                >
                  <div className="font-bold">{f.q}</div>
                  <div className="text-purple-600">
                    {faqOpen === idx ? "-" : "+"}
                  </div>
                </div>

                {faqOpen === idx && (
                  <div className="mt-3 text-gray-600 dark:text-gray-300">
                    {f.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center">
            Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
            What people say about InventoryPro
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="font-bold text-lg">{t.name}</div>
                <div className="text-gray-500 dark:text-gray-300">
                  {t.company}
                </div>
                <div className="mt-4 text-gray-600 dark:text-gray-300">
                  "{t.msg}"
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="font-bold">InventoryPro</div>
          <div className="text-gray-400 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {/* <AuthModal
        isOpen={authType !== null}
        type={authType}
        onClose={() => setAuthType(null)}
      /> */}
    </div>
  );
};

export default HomePage;
